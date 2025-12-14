// src/stores/onboarding.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', () => {
  const currentScreen = ref('splash') // 'splash' | 'onboarding' | 'login'
  const hasSeenOnboarding = ref(false)

  const init = () => {
    const stored = localStorage.getItem('hasSeenOnboarding')
    if (stored === 'true') {
      hasSeenOnboarding.value = true
      currentScreen.value = 'login'
    } else {
      currentScreen.value = 'splash'
      setTimeout(() => {
        currentScreen.value = 'onboarding'
      }, 5000) // 1.5 seconds logo
    }
  }

  const finishOnboarding = () => {
    hasSeenOnboarding.value = true
    localStorage.setItem('hasSeenOnboarding', 'true')
    currentScreen.value = 'login'
  }

  return {
    currentScreen,
    hasSeenOnboarding,
    init,
    finishOnboarding
  }
})
