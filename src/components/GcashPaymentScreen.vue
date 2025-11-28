<template>
  <div class="container">
    <div class="gcash-inner">
      <!-- Header -->
      <div class="header">
        <button class="back-btn" @click="$emit('go-back')">
          <span>←</span>
        </button>
        <h1>GCash Payment</h1>
      </div>

      <!-- GCash Logo -->
      <div class="gcash-logo-section">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M40 0C17.908 0 0 17.908 0 40C0 62.092 17.908 80 40 80C62.092 80 80 62.092 80 40C80 17.908 62.092 0 40 0Z" fill="url(#gcashGradient)"/>
          <path d="M25 35C25 29.477 29.477 25 35 25H45C50.523 25 55 29.477 55 35V45C55 50.523 50.523 55 45 55H35C29.477 55 25 50.523 25 45V35Z" fill="white"/>
          <path d="M35 30H45C48.314 30 51 32.686 51 36V44C51 47.314 48.314 50 45 50H35C31.686 50 29 47.314 29 44V36C29 32.686 31.686 30 35 30Z" fill="#007AFF"/>
          <defs>
            <linearGradient id="gcashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00A3FF"/>
              <stop offset="100%" stop-color="#00D4AA"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Payment Summary Card -->
      <div class="payment-summary-card">
        <div class="summary-row">
          <span class="label">Merchant:</span>
          <span class="value">Paradiso Hostel</span>
        </div>
        <div class="summary-row">
          <span class="label">Amount Due:</span>
          <span class="value">PHP {{ totalAmount.toFixed(2) }}</span>
        </div>
      </div>

      <!-- GCash Login Form -->
      <div class="gcash-form">
        <h2>Login to pay with GCash</h2>
        
        <form @submit.prevent="handleGcashLogin">
          <div class="form-group-inline">
            <div class="country-code">+63</div>
            <input 
              type="tel" 
              v-model="mobileNumber"
              placeholder="Mobile Number"
              maxlength="10"
              class="mobile-input"
              @input="formatMobileNumber"
            >
          </div>
          
          <button 
            type="submit" 
            class="next-button"
            :disabled="!isValidMobileNumber"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'GcashPaymentScreen',
  props: {
    totalAmount: {
      type: Number,
      default: 2100.00
    }
  },
  emits: ['go-back', 'payment-success'],
  setup(props, { emit }) {
    const mobileNumber = ref('')

    const isValidMobileNumber = computed(() => {
      return mobileNumber.value.replace(/\D/g, '').length === 10
    })

    const formatMobileNumber = (event) => {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length > 10) {
        value = value.substring(0, 10)
      }
      
      // Format as XXX-XXX-XXXX
      if (value.length > 6) {
        value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, 10)
      } else if (value.length > 3) {
        value = value.substring(0, 3) + '-' + value.substring(3, 6)
      }
      
      mobileNumber.value = value
    }

    const handleGcashLogin = () => {
      if (!isValidMobileNumber.value) {
        alert('Please enter a valid 10-digit mobile number')
        return
      }

      console.log('Processing GCash payment for:', mobileNumber.value)
      
      // Simulate GCash payment processing
      setTimeout(() => {
        emit('payment-success')
      }, 2000)
    }

    return {
      mobileNumber,
      isValidMobileNumber,
      formatMobileNumber,
      handleGcashLogin
    }
  }
}
</script>

<style scoped>
/* Exact same container as login page */
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

/* Same card styling as login page */
.gcash-inner {
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  padding: 36px 24px;
  margin-top: 0;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  margin-right: 15px;
  color: #333;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.back-btn:hover {
  background-color: #f5f5f5;
}

.header h1 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* GCash Logo Section */
.gcash-logo-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.gcash-logo-section svg {
  filter: drop-shadow(0 4px 12px rgba(0, 163, 255, 0.3));
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 4px 12px rgba(0, 163, 255, 0.3));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 16px rgba(0, 163, 255, 0.4));
  }
}

/* Payment Summary Card */
.payment-summary-card {
  background: linear-gradient(135deg, #1f4f5a, #2a6b7a);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 30px;
  color: white;
  box-shadow: 0 8px 24px rgba(31, 79, 90, 0.2);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.summary-row .label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.summary-row .value {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

/* GCash Form */
.gcash-form {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.gcash-form h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form-group-inline {
  display: flex;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  transition: border-color 0.3s;
}

.form-group-inline:focus-within {
  border-color: #1f4f5a;
}

.country-code {
  background: #f8f9fa;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  border-right: 2px solid #e0e0e0;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-input {
  flex: 1;
  border: none;
  padding: 16px;
  font-size: 16px;
  outline: none;
  background: white;
}

.mobile-input::placeholder {
  color: #999;
}

.next-button {
  width: 100%;
  background: #1f4f5a;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;
  -webkit-tap-highlight-color: transparent;
}

.next-button:hover:not(:disabled) {
  background: #173c45;
}

.next-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.next-button:active:not(:disabled) {
  transform: scale(0.98);
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .gcash-inner {
    padding: 32px 20px;
    border-radius: 20px 20px 0 0;
  }
  
  .header h1 {
    font-size: 16px;
  }
  
  .back-btn {
    font-size: 20px;
    width: 36px;
    height: 36px;
  }
  
  .payment-summary-card {
    padding: 20px;
  }
  
  .gcash-form {
    padding: 20px;
  }
  
  .country-code,
  .mobile-input {
    padding: 14px;
    font-size: 15px;
  }
  
  .next-button {
    padding: 14px;
    font-size: 15px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .gcash-inner {
    padding: 36px 24px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .gcash-inner {
    padding: 36px 28px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 20px 0;
  }
  
  .gcash-inner {
    max-width: 768px;
    margin: -50px auto 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 40px 0;
  }
  
  .gcash-inner {
    max-width: 500px;
    margin: -60px auto 0 auto;
    padding: 44px 36px;
  }
}

/* Desktop (1367px and up) */
@media (min-width: 1367px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 40px 0;
  }
  
  .gcash-inner {
    max-width: 500px;
    margin: 0 auto;
    padding: 48px 40px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .gcash-inner {
    padding: 24px 20px;
  }
  
  .header {
    padding: 0 0 16px 0;
    margin-bottom: 20px;
  }
  
  .gcash-logo-section {
    margin-bottom: 20px;
  }
  
  .payment-summary-card {
    margin-bottom: 20px;
    padding: 20px;
  }
  
  .gcash-form {
    padding: 20px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .gcash-inner {
    padding: 20px 16px;
  }
  
  .header {
    padding: 0 0 12px 0;
    margin-bottom: 16px;
  }
  
  .gcash-logo-section {
    margin-bottom: 16px;
  }
  
  .payment-summary-card {
    margin-bottom: 16px;
    padding: 16px;
  }
  
  .gcash-form {
    padding: 16px;
  }
  
  .country-code,
  .mobile-input {
    padding: 12px;
    font-size: 14px;
  }
  
  .next-button {
    padding: 12px;
    font-size: 14px;
  }
}

/* Prevent zoom on iOS */
@media screen and (max-width: 767px) {
  .mobile-input,
  .next-button {
    font-size: 16px;
  }
}

/* Safe area insets for notched devices */
@supports(padding: max(0px)) {
  .container {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>