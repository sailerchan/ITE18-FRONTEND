// stores/notifications.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  // State
  const notifications = ref([])

  // Computed
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })

  const hasUnread = computed(() => {
    return unreadCount.value > 0
  })

  const sortedNotifications = computed(() => {
    return [...notifications.value].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp)
    })
  })

  // Actions
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    }
    notifications.value.unshift(newNotification)
    saveToLocalStorage()
  }

  const addTripSavedNotification = (tripData) => {
    addNotification({
      type: 'trip_saved',
      title: 'Trip Itinerary Saved!',
      message: `Your itinerary for ${tripData.destinationName} has been saved successfully.`,
      icon: 'fa-check-circle',
      iconColor: '#10b981'
    })
  }

  const addBookingConfirmationNotification = (bookingData) => {
    addNotification({
      type: 'booking_confirmed',
      title: 'Booking Confirmed!',
      message: `Your booking for ${bookingData.destinationName} has been confirmed. Check your trips for details.`,
      icon: 'fa-calendar-check',
      iconColor: '#0c3437'
    })
  }

  const addPaymentSuccessNotification = (paymentData) => {
    addNotification({
      type: 'payment_success',
      title: 'Payment Successful',
      message: `Payment of PHP ${paymentData.amount} via ${paymentData.paymentMethod} was successful.`,
      icon: 'fa-check-circle',
      iconColor: '#10b981'
    })
  }

  const addTripReminderNotification = (tripData) => {
    addNotification({
      type: 'trip_reminder',
      title: 'Upcoming Trip Reminder',
      message: `Your trip to ${tripData.destinationName} is coming up! Make sure you're all packed and ready.`,
      icon: 'fa-bell',
      iconColor: '#f59e0b'
    })
  }

  const markAsRead = (notificationId) => {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      saveToLocalStorage()
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => {
      n.read = true
    })
    saveToLocalStorage()
  }

  const deleteNotification = (notificationId) => {
    notifications.value = notifications.value.filter(n => n.id !== notificationId)
    saveToLocalStorage()
  }

  const clearAllNotifications = () => {
    notifications.value = []
    saveToLocalStorage()
  }

  // LocalStorage
  const saveToLocalStorage = () => {
    const notificationsData = {
      notifications: notifications.value,
      lastSaved: new Date().toISOString()
    }
    localStorage.setItem('userNotifications', JSON.stringify(notificationsData))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('userNotifications')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        notifications.value = data.notifications || []
      } catch (error) {
        console.error('Error loading notifications from localStorage:', error)
        notifications.value = []
      }
    }
  }

  return {
    // State
    notifications,

    // Computed
    unreadCount,
    hasUnread,
    sortedNotifications,

    // Actions
    addNotification,
    addTripSavedNotification,
    addBookingConfirmationNotification,
    addPaymentSuccessNotification,
    addTripReminderNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})
