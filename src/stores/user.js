// stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const location = ref('Butuan City, PH')
  const avatar = ref('/images/profilepicture.png')
  const isAuthenticated = ref(false)

  // Login Form
  const loginForm = ref({
    email: '',
    password: ''
  })

  // Signup Form
  const signupForm = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordError: '',
    confirmPasswordError: '',
    isPasswordValid: false,
  isConfirmPasswordValid: false 
  })

  // Computed
  const displayName = computed(() => {
    if (firstName.value) {
      return `${firstName.value} ${lastName.value}`.trim()
    }
    if (email.value) {
      const name = email.value.split('@')[0]
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
    return 'User'
  })

  // User Profile - for Personal Information page
  const userProfile = computed({
    get: () => ({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      location: location.value,
      avatar: avatar.value
    }),
    set: (newProfile) => {
      if (newProfile.firstName !== undefined) firstName.value = newProfile.firstName
      if (newProfile.lastName !== undefined) lastName.value = newProfile.lastName
      if (newProfile.email !== undefined) email.value = newProfile.email
      if (newProfile.location !== undefined) location.value = newProfile.location
      if (newProfile.avatar !== undefined) avatar.value = newProfile.avatar
    }
  })

  const isSignupFormValid = computed(() => {
    return (
      signupForm.value.firstName &&
      signupForm.value.lastName &&
      signupForm.value.email &&
      signupForm.value.password &&
      signupForm.value.confirmPassword &&
      !signupForm.value.passwordError &&
      !signupForm.value.confirmPasswordError
    )
  })

  // Actions
  const updateSignupField = (field, value) => {
    signupForm.value[field] = value
  }

  const validatePassword = () => {
    const password = signupForm.value.password
    if (password.length < 8) {
      signupForm.value.passwordError = 'Password must be at least 8 characters long'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      signupForm.value.passwordError = 'Password must contain both uppercase and lowercase letters'
    } else if (!/(?=.*\d)/.test(password)) {
      signupForm.value.passwordError = 'Password must contain at least one number'
    } else {
      signupForm.value.passwordError = ''
    }
    if (signupForm.value.confirmPassword) {
      validateConfirmPassword()
    }
  }

  const validateConfirmPassword = () => {
    if (signupForm.value.password !== signupForm.value.confirmPassword) {
      signupForm.value.confirmPasswordError = 'Passwords do not match'
    } else {
      signupForm.value.confirmPasswordError = ''
    }
  }

  const login = (userEmail, userPassword) => {
    // For demo purposes, extract name from email
    // In production, this would come from your backend
    const nameFromEmail = userEmail.split('@')[0]
    const nameParts = nameFromEmail.split('.')

    if (nameParts.length > 1) {
      // If email is like john.doe@example.com
      firstName.value = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)
      lastName.value = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1)
    } else {
      // If email is like johndoe@example.com
      firstName.value = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      lastName.value = ''
    }

    email.value = userEmail
    isAuthenticated.value = true

    saveToLocalStorage()
  }

  const signup = () => {
    validatePassword()
    validateConfirmPassword()

    if (!isSignupFormValid.value) {
      return false
    }

    firstName.value = signupForm.value.firstName
    lastName.value = signupForm.value.lastName
    email.value = signupForm.value.email
    isAuthenticated.value = true

    saveToLocalStorage()
    return true
  }

  const updateFromSignup = (data) => {
    firstName.value = data.firstName
    lastName.value = data.lastName
    email.value = data.email
    isAuthenticated.value = true

    saveToLocalStorage()
  }

  const updateProfile = (profileData) => {
    if (profileData.firstName) firstName.value = profileData.firstName
    if (profileData.lastName) lastName.value = profileData.lastName
    if (profileData.email) email.value = profileData.email
    if (profileData.location) location.value = profileData.location
    if (profileData.avatar) avatar.value = profileData.avatar

    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('userFirstName', firstName.value)
    localStorage.setItem('userLastName', lastName.value)
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('userLocation', location.value)
    localStorage.setItem('userAvatar', avatar.value)
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = () => {
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    location.value = 'Butuan City, PH'
    avatar.value = '/images/profilepicture.png'
    isAuthenticated.value = false

    loginForm.value = { email: '', password: '' }
    signupForm.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: ''
    }

    localStorage.removeItem('userFirstName')
    localStorage.removeItem('userLastName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userLocation')
    localStorage.removeItem('userAvatar')
    localStorage.removeItem('isAuthenticated')
  }

  const loadFromLocalStorage = () => {
    const savedAuth = localStorage.getItem('isAuthenticated')

    if (savedAuth === 'true') {
      isAuthenticated.value = true
      firstName.value = localStorage.getItem('userFirstName') || ''
      lastName.value = localStorage.getItem('userLastName') || ''
      email.value = localStorage.getItem('userEmail') || ''
      location.value = localStorage.getItem('userLocation') || 'Butuan City, PH'
      avatar.value = localStorage.getItem('userAvatar') || '/images/profilepicture.png'
    }
  }

  const clearUserProfile = () => {
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    location.value = 'Butuan City, PH'
    avatar.value = '/images/profilepicture.png'
    saveToLocalStorage()
  }

  return {
    // State
    firstName,
    lastName,
    email,
    location,
    avatar,
    isAuthenticated,
    loginForm,
    signupForm,

    // Computed
    displayName,
    userProfile,
    isSignupFormValid,

    // Actions
    updateSignupField,
    validatePassword,
    validateConfirmPassword,
    login,
    signup,
    updateFromSignup,
    updateProfile,
    logout,
    loadFromLocalStorage,
    saveToLocalStorage,
    clearUserProfile
  }
})
