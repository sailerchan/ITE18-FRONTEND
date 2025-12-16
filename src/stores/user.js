import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const userProfile = ref({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    avatar: '',
    password: '' // Store temporarily during signup, clear after
  })

  const isAuthenticated = ref(false)

  // Getters
  const fullName = computed(() => {
    return `${userProfile.value.firstName} ${userProfile.value.lastName}`.trim()
  })

  // Actions
  const setUserProfile = (data) => {
    userProfile.value = {
      ...userProfile.value,
      ...data
    }
    saveToLocalStorage()
  }

  const updateFromSignup = (signupData) => {
    userProfile.value.firstName = signupData.firstName || ''
    userProfile.value.lastName = signupData.lastName || ''
    userProfile.value.email = signupData.email || ''
    // Don't store password in profile for security
    isAuthenticated.value = true
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    try {
      // Don't save password to localStorage
      const { password, ...profileToSave } = userProfile.value
      localStorage.setItem('userProfile', JSON.stringify(profileToSave))
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value))
      console.log('✅ User profile saved to localStorage')
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const savedProfile = localStorage.getItem('userProfile')
      const savedAuth = localStorage.getItem('isAuthenticated')

      if (savedProfile) {
        userProfile.value = JSON.parse(savedProfile)
        console.log('✅ Loaded user profile from localStorage')
      }

      if (savedAuth) {
        isAuthenticated.value = JSON.parse(savedAuth)
      }
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error)
    }
  }

  const clearUserProfile = () => {
    userProfile.value = {
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      avatar: '',
      password: ''
    }
    isAuthenticated.value = false
    localStorage.removeItem('userProfile')
    localStorage.removeItem('isAuthenticated')
  }

  return {
    // State
    userProfile,
    isAuthenticated,

    // Getters
    fullName,

    // Actions
    setUserProfile,
    updateFromSignup,
    loadFromLocalStorage,
    saveToLocalStorage,
    clearUserProfile
  }
})
