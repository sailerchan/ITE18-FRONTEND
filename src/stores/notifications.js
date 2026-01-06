import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [
      {
        id: 1,
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Your reservation at Paradiso Hotel has been confirmed',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        icon: 'fa-check-circle',
        color: 'text-green-600'
      },
      {
        id: 2,
        type: 'reminder',
        title: 'Trip Reminder',
        message: 'Your trip to Siargao starts in 3 days',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: false,
        icon: 'fa-calendar',
        color: 'text-blue-600'
      },
      {
        id: 3,
        type: 'promotion',
        title: 'Special Offer',
        message: 'Get 20% off on your next booking',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        icon: 'fa-tag',
        color: 'text-orange-600'
      }
    ]
  }),

  getters: {
    unreadCount: (state) => state.notifications.filter(n => !n.read).length,

    unreadNotifications: (state) => state.notifications.filter(n => !n.read),

    readNotifications: (state) => state.notifications.filter(n => n.read),

    sortedNotifications: (state) => {
      return [...state.notifications].sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      )
    }
  },

  actions: {
    markAsRead(id) {
      const notification = this.notifications.find(n => n.id === id)
      if (notification) {
        notification.read = true
      }
    },

    markAllAsRead() {
      this.notifications.forEach(n => n.read = true)
    },

    deleteNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    },

    addNotification(notification) {
      this.notifications.unshift({
        id: Date.now(),
        read: false,
        timestamp: new Date().toISOString(),
        ...notification
      })
    }
  }
})
