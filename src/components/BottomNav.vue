<template>
  <nav class="bottom-nav">
    <div class="nav-items-container">
      <button
        class="nav-item"
        :class="{ active: activePage === 'homepage' }"
        @click="$emit('navigate', 'homepage')"
      >
        <i class="fas fa-home"></i>
      </button>

      <button
        class="nav-item"
        :class="{ active: activePage === 'trips' }"
        @click="$emit('navigate', 'trips')"
      >
        <i class="fas fa-route"></i>
      </button>

      <button
        class="nav-item"
        :class="{ active: activePage === 'notifications' }"
        @click="$emit('navigate', 'notifications')"
      >
        <i class="fas fa-bell"></i>
        <!-- ✅ Show total new notifications -->
        <span v-if="totalNewNotifications > 0" class="badge">{{ totalNewNotifications }}</span>
      </button>

      <button
        class="nav-item"
        :class="{ active: activePage === 'profile' }"
        @click="$emit('navigate', 'profile')"
      >
        <i class="fas fa-user"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { useNotificationsStore } from '../stores/notifications'
import { useTripsStore } from '../stores/trips'

export default {
  name: 'BottomNav',
  props: {
    activePage: {
      type: String,
      required: true
    }
  },
  emits: ['navigate'],
  computed: {
    totalNewNotifications() {
      const notificationsStore = useNotificationsStore()
      const tripsStore = useTripsStore()

      // Count new notifications from store
      const newStoreNotifications = notificationsStore.newNotificationsCount || 0

      // Count upcoming trip notifications (within 7 days) - these are always "new"
      const now = new Date()
      const upcomingTrips = tripsStore.getSavedTrips || []

      let tripNotifications = 0
      upcomingTrips.forEach(trip => {
        if (trip.dates) {
          try {
            const dateStr = trip.dates.split('-')[0].trim()
            const year = trip.dates.split(',')[1]?.trim() || new Date().getFullYear()
            const startDate = new Date(`${dateStr}, ${year}`)
            const daysUntil = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24))

            // Only count trips within 7 days as "new notifications"
            if (daysUntil >= 0 && daysUntil <= 7) {
              tripNotifications++
            }
          } catch (error) {
            // Skip invalid dates
          }
        }
      })

      return newStoreNotifications + tripNotifications
    }
  }
}
</script>

<style scoped>
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
  color: #0c3437;
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
  line-height: 1;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.badge {
  animation: pulse 2s infinite;
}
</style>
