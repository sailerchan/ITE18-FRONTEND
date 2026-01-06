<template>
  <div class="container">
    <div class="notification-inner">
      <!-- Header with Back Button -->
      <header class="page-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Notification</h1>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Show notifications if there are any -->
        <div v-if="hasNotifications" class="notifications-list">
          <!-- Upcoming Trips Notifications -->
          <div
            v-for="notification in upcomingTripNotifications"
            :key="notification.id"
            class="notification-card trip-notification"
            :class="{ unread: !notification.read }"
            @click="markAsRead(notification.id)"
          >
            <div class="notification-icon trip-icon">
              <i class="fas fa-plane-departure"></i>
            </div>
            <div class="notification-content">
              <h3 class="notification-title">{{ notification.title }}</h3>
              <p class="notification-message">{{ notification.message }}</p>
              <span class="notification-time">{{ notification.timeAgo }}</span>
            </div>
            <div v-if="!notification.read" class="unread-indicator"></div>
          </div>

          <!-- Other Notifications from Store -->
          <div
            v-for="notification in storeNotifications"
            :key="notification.id"
            class="notification-card"
            :class="{ unread: !notification.read }"
            @click="handleNotificationClick(notification)"
          >
            <div class="notification-icon" :class="notification.type">
              <i :class="notification.icon"></i>
            </div>
            <div class="notification-content">
              <h3 class="notification-title">{{ notification.title }}</h3>
              <p class="notification-message">{{ notification.message }}</p>
              <span class="notification-time">{{ formatTimestamp(notification.timestamp) }}</span>
            </div>
            <div v-if="!notification.read" class="unread-indicator"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="notification-graphic">
            <div class="image-container">
              <img src="/images/no_notif.jpg" alt="No Notifications" class="notification-image">
              <div class="image-overlay"></div>
            </div>
          </div>

          <div class="empty-message">
            <h2>You have no notifications</h2>
            <p>You don't have any trip updates or notifications right now. Start planning your next adventure to receive trip alerts and updates here!</p>
          </div>
        </div>
      </main>

      <!-- Bottom Navigation Bar -->
      <nav class="bottom-nav">
        <div class="nav-items-container">
          <button class="nav-item" @click="$emit('go-to-page', 'homepage')">
            <i class="fas fa-home"></i>
          </button>
          <button class="nav-item" @click="$emit('go-to-page', 'trips')">
            <i class="fas fa-route"></i>
          </button>
          <button class="nav-item active">
            <i class="fas fa-bell"></i>
            <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
          </button>
          <button class="nav-item" @click="$emit('go-to-page', 'profile')">
            <i class="fas fa-user"></i>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { useTripsStore } from '../../stores/trips'
import { useNotificationsStore } from '../../stores/notifications'


export default {
  name: 'NotificationPage',
  emits: ['go-back', 'go-to-page'],
  data() {
    return {
      upcomingTripNotifications: []
    }
  },
  computed: {
    storeNotifications() {
      const notificationsStore = useNotificationsStore()
      return notificationsStore.sortedNotifications || []
    },
    unreadCount() {
      const notificationsStore = useNotificationsStore()
      const storeUnread = notificationsStore.unreadCount || 0
      const tripUnread = this.upcomingTripNotifications.filter(n => !n.read).length
      return storeUnread + tripUnread
    },
    hasNotifications() {
      return this.upcomingTripNotifications.length > 0 || this.storeNotifications.length > 0
    }
  },
  mounted() {
    this.generateUpcomingTripNotifications()

    const notificationsStore = useNotificationsStore()
    notificationsStore.markAsViewed()
  },
  methods: {
    generateUpcomingTripNotifications() {
      const tripsStore = useTripsStore()
      const upcomingTrips = tripsStore.upcomingTrips || []
      const now = new Date()
      const notifications = []

      upcomingTrips.forEach(trip => {
        if (trip.dates) {
          try {
            const dateStr = trip.dates.split('-')[0].trim()
            const year = trip.dates.split(',')[1]?.trim() || new Date().getFullYear()
            const startDate = new Date(`${dateStr}, ${year}`)

            const daysUntil = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24))

            if (daysUntil >= 0 && daysUntil <= 7) {
              let title = ''
              let message = ''

              if (daysUntil === 0) {
                title = '✈️ Trip Today!'
                message = `Your trip to ${trip.destinationName} starts today! Have an amazing journey!`
              } else if (daysUntil === 1) {
                title = '🎉 Trip Tomorrow!'
                message = `Your trip to ${trip.destinationName} starts tomorrow! Make sure everything is packed and ready.`
              } else if (daysUntil <= 3) {
                title = `📅 Trip in ${daysUntil} Days`
                message = `Your trip to ${trip.destinationName} starts in ${daysUntil} days. Time to finalize your preparations!`
              } else {
                title = `📅 Upcoming Trip in ${daysUntil} Days`
                message = `Your trip to ${trip.destinationName} is coming up in ${daysUntil} days. Don't forget to check your itinerary!`
              }

              notifications.push({
                id: `trip-${trip.id}`,
                title: title,
                message: message,
                timeAgo: this.calculateTimeAgo(daysUntil),
                read: false,
                tripId: trip.id
              })
            }
          } catch (error) {
            console.error('Error parsing trip date:', error)
          }
        }
      })

      this.upcomingTripNotifications = notifications
    },

    calculateTimeAgo(daysUntil) {
      if (daysUntil === 0) return 'Today'
      if (daysUntil === 1) return 'Tomorrow'
      if (daysUntil <= 7) return `In ${daysUntil} days`
      return 'Upcoming'
    },

    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays}d ago`

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    },

    markAsRead(notificationId) {
      const index = this.upcomingTripNotifications.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        this.upcomingTripNotifications[index].read = true
      }
    },

    handleNotificationClick(notification) {
      const notificationsStore = useNotificationsStore()
      notificationsStore.markAsRead(notification.id)

      if (notification.type === 'booking' || notification.type === 'reminder') {
        this.$emit('go-to-page', 'trips')
      }
    }
  }
}
</script>

<style scoped>
/* Keep all your existing styles - they're fine */
/* Just changed .notification-message class to .empty-message to avoid conflict */

:root {
  --muted: #6c757d;
  --dark: #111827;
  --teal-1: #0c3437;
  --teal-2: #1f7a8c;
  --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.container {
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
}

.notification-inner {
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  padding: 0;
  margin-top: 0;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 90px;
}

.page-header {
  display: flex;
  align-items: center;
  padding: 24px 20px 12px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--dark);
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(0,0,0,0.03);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark);
  margin: 0;
  margin-left: 8px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.notifications-list {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.notification-card:hover {
  border-color: var(--teal-1);
  box-shadow: var(--card-shadow);
}

.notification-card.unread {
  background: #f0f9ff;
  border-color: var(--teal-2);
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
}

.notification-icon.trip-icon {
  background: linear-gradient(135deg, #0c3437 0%, #1f7a8c 100%);
  color: white;
}

.notification-icon.booking {
  background: #dcfce7;
  color: #16a34a;
}

.notification-icon.reminder {
  background: #dbeafe;
  color: #2563eb;
}

.notification-icon.promotion {
  background: #fed7aa;
  color: #ea580c;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--dark);
}

.notification-message {
  font-size: 13px;
  color: var(--muted);
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: #9ca3af;
}

.unread-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--teal-1);
  flex-shrink: 0;
  margin-top: 4px;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
}

.notification-graphic {
  margin-bottom: 32px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.notification-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 20px;
  filter: blur(1.2px) brightness(0.95);
  opacity: 0.85;
  transition: all 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.2) 100%
  );
  border-radius: 20px;
  pointer-events: none;
}

.empty-message {
  text-align: center;
  max-width: 280px;
}

.empty-message h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--dark);
  line-height: 1.3;
}

.empty-message p {
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  color: var(--muted);
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e9ecef;
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  z-index: 1000;
}

.nav-items-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 420px;
}

.nav-item {
  border: 0;
  background: transparent;
  font-size: 20px;
  color: #adb5bd;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

.nav-item.active {
  color: var(--teal-1);
  background: rgba(56,97,102,0.1);
}

.nav-item:hover {
  background: rgba(0,0,0,0.03);
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 10px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
