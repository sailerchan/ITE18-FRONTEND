// stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const location = ref('Butuan City, PH')
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
    confirmPasswordError: ''
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

  const login = (userEmail) => {
    const nameFromEmail = userEmail.split('@')[0]
    email.value = userEmail
    firstName.value = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
    isAuthenticated.value = true

    localStorage.setItem('userName', displayName.value)
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('isAuthenticated', 'true')
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

    localStorage.setItem('userName', displayName.value)
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('isAuthenticated', 'true')

    return true
  }

  const updateFromSignup = (data) => {
    firstName.value = data.firstName
    lastName.value = data.lastName
    email.value = data.email
    isAuthenticated.value = true

    localStorage.setItem('userName', displayName.value)
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('isAuthenticated', 'true')
  }

  const updateProfile = (profileData) => {
    if (profileData.firstName) firstName.value = profileData.firstName
    if (profileData.lastName) lastName.value = profileData.lastName
    if (profileData.email) email.value = profileData.email
    if (profileData.location) location.value = profileData.location

    localStorage.setItem('userName', displayName.value)
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('userLocation', location.value)
  }

  const logout = () => {
    firstName.value = ''
    lastName.value = ''
    email.value = ''
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

    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('isAuthenticated')
  }

  const loadFromLocalStorage = () => {
    const savedAuth = localStorage.getItem('isAuthenticated')
    const savedEmail = localStorage.getItem('userEmail')
    const savedName = localStorage.getItem('userName')
    const savedLocation = localStorage.getItem('userLocation')

    if (savedAuth === 'true') {
      isAuthenticated.value = true
      email.value = savedEmail || ''
      if (savedName) {
        const names = savedName.split(' ')
        firstName.value = names[0] || ''
        lastName.value = names.slice(1).join(' ') || ''
      }
      if (savedLocation) {
        location.value = savedLocation
      }
    }
  }

  const clearUserProfile = () => {
    firstName.value = ''
    lastName.value = ''
    email.value = ''
  }

  return {
    // State
    firstName,
    lastName,
    email,
    location,
    isAuthenticated,
    loginForm,
    signupForm,

    // Computed
    displayName,
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
    clearUserProfile
  }
})
