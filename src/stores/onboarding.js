// stores/onboarding.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnboardingStore = defineStore('onboarding', () => {
  // State
  const currentScreen = ref('splash') // 'splash' | 'onboarding' | 'login'
  const hasSeenOnboarding = ref(false)

  // Actions
  const init = () => {
    const stored = localStorage.getItem('hasSeenOnboarding')

    if (stored === 'true') {
      hasSeenOnboarding.value = true
      currentScreen.value = 'login'
    } else {
      currentScreen.value = 'splash'

      // Auto-transition from splash to onboarding after 5 seconds
      setTimeout(() => {
        currentScreen.value = 'onboarding'
      }, 5000)
    }
  }

  const finishOnboarding = () => {
    hasSeenOnboarding.value = true
    localStorage.setItem('hasSeenOnboarding', 'true')
    currentScreen.value = 'login'
  }

  const resetOnboarding = () => {
    hasSeenOnboarding.value = false
    currentScreen.value = 'splash'
    localStorage.removeItem('hasSeenOnboarding')
  }

  return {
    // State
    currentScreen,
    hasSeenOnboarding,

    // Actions
    init,
    finishOnboarding,
    resetOnboarding
  }
})
