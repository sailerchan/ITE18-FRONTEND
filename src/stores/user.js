import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: 'Butuan City, Philippines',
    avatar: '/images/profilepicture.png',
    isAuthenticated: false
  }),

  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`.trim(),
    displayName: (state) => {
      if (state.firstName) return state.firstName
      if (state.email) return state.email.split('@')[0]
      return 'User'
    },
    userProfile: (state) => ({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber,
      location: state.location,
      avatar: state.avatar
    })
  },

  actions: {
    updateFromSignup(data) {
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.email = data.email
      this.isAuthenticated = true
      this.saveToLocalStorage()
    },

    updateProfile(data) {
      Object.assign(this, data)
      this.saveToLocalStorage()
    },

    login(email) {
      this.email = email
      if (!this.firstName) {
        this.firstName = email.split('@')[0]
      }
      this.isAuthenticated = true
      this.saveToLocalStorage()
    },

    logout() {
      this.$reset()
      localStorage.removeItem('userProfile')
      localStorage.removeItem('userName')
      localStorage.removeItem('isAuthenticated')
    },

    saveToLocalStorage() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        location: this.location,
        avatar: this.avatar,
        isAuthenticated: this.isAuthenticated
      }
      localStorage.setItem('userProfile', JSON.stringify(data))
      localStorage.setItem('userName', this.displayName)
      localStorage.setItem('isAuthenticated', 'true')
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('userProfile')
      if (saved) {
        try {
          const data = JSON.parse(saved)
          Object.assign(this, data)
        } catch (error) {
          console.error('Error loading user profile:', error)
        }
      }

      // Fallback to old localStorage keys
      const oldUserName = localStorage.getItem('userName')
      const oldAuth = localStorage.getItem('isAuthenticated')
      if (oldUserName && !this.firstName) {
        this.firstName = oldUserName
      }
      if (oldAuth === 'true') {
        this.isAuthenticated = true
      }
    },

    clearUserProfile() {
      this.$reset()
      localStorage.removeItem('userProfile')
      localStorage.removeItem('userName')
      localStorage.removeItem('isAuthenticated')
    }
  }
})
