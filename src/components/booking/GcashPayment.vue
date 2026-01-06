<template>
  <div class="container">
    <div class="gcash-inner">
      <!-- Step 1: Mobile Number Input -->
      <div v-if="currentStep === 'mobile'" class="step-container">
        <!-- Header with Back Button -->
        <header class="page-header">
          <button class="back-button" @click="goBack">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="page-title">GCash Payment</h1>
        </header>

        <!-- GCash Logo -->
        <div class="logo-container">
          <img src="/images/logos/gcash_logo.png" alt="GCash" class="gcash-logo-image">
        </div>

        <!-- Payment Card -->
        <div class="payment-card">
          <!-- Transaction Details Box -->
          <div class="transaction-details">
            <div class="details-grid">
              <div class="label">Merchant</div>
              <div class="value">{{ selectedAccommodation || 'Accommodation' }}</div>

              <div class="label">Amount Due</div>
              <div class="value amount">PHP {{ totalAmount.toFixed(2) }}</div>
            </div>
          </div>

          <!-- Login Form Area -->
          <div class="login-form">
            <h2 class="login-title">Login to pay with GCash</h2>

            <!-- Mobile Number Input -->
            <div class="input-container">
              <div class="input-group">
                <span class="country-code">+63</span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  class="mobile-input"
                  maxlength="10"
                  v-model="mobileNumber"
                  @input="validateMobileNumber"
                >
              </div>
              <div v-if="mobileError" class="error-message">{{ mobileError }}</div>
            </div>

            <!-- Next Button -->
            <button
              class="next-button"
              @click="goToConfirmation"
              :disabled="!isValidMobileNumber"
              :class="{ disabled: !isValidMobileNumber }"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Step 2: Payment Confirmation -->
      <div v-else-if="currentStep === 'confirm'" class="step-container">
        <!-- Header -->
        <div class="page-header">
          <button class="back-button" @click="currentStep = 'mobile'">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="page-title">Confirm Payment</h1>
        </div>

        <!-- Logo -->
        <div class="logo-container">
          <img src="/images/logos/gcash_logo.png" alt="GCash" class="gcash-logo-image">
        </div>

        <!-- Transaction Details Card -->
        <div class="transaction-card">
          <!-- Payee Header -->
          <div class="payee-header">
            <h2 class="payee-name">{{ selectedAccommodation || 'Accommodation' }}</h2>
          </div>

          <!-- Payment Summary -->
          <div class="payment-summary">
            <div class="summary-header">
              <h3>YOU ARE ABOUT TO PAY</h3>
            </div>

            <div class="amount-breakdown">
              <div class="amount-row">
                <span class="amount-label">Amount</span>
                <span class="amount-value">PHP {{ baseAmount.toFixed(2) }}</span>
              </div>
              <div class="amount-row">
                <span class="amount-label">Additional fee</span>
                <span class="amount-value">PHP {{ additionalFee.toFixed(2) }}</span>
              </div>
              <div class="divider"></div>
              <div class="amount-row total-row">
                <span class="total-label">Total</span>
                <span class="total-value">PHP {{ finalTotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pay Button -->
        <div class="pay-button-section">
          <button
            class="pay-button"
            @click="handlePayment"
            :disabled="isProcessing"
          >
            {{ isProcessing ? 'Processing...' : 'Pay' }}
          </button>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isProcessing" class="loading-overlay">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Processing payment,</p>
          <p>please wait...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GcashPayment',
  props: {
    totalAmount: {
      type: Number,
      required: true
    },
    selectedDestinationName: {
      type: String,
      required: true
    },
    selectedAccommodation: {
      type: String,
      default: 'Accommodation'
    }
  },
  data() {
    return {
      currentStep: 'mobile', // 'mobile' or 'confirm'
      mobileNumber: '',
      mobileError: '',
      isProcessing: false,
      additionalFee: 50.00
    }
  },
  computed: {
    isValidMobileNumber() {
      return this.mobileNumber.length === 10 && /^9\d{9}$/.test(this.mobileNumber)
    },
    baseAmount() {
      return this.totalAmount
    },
    finalTotal() {
      return this.baseAmount + this.additionalFee
    }
  },
  methods: {
    goBack() {
      if (this.currentStep === 'confirm') {
        this.currentStep = 'mobile'
      } else {
        this.$emit('go-back')
      }
    },

    validateMobileNumber() {
      this.mobileNumber = this.mobileNumber.replace(/\D/g, '')

      if (this.mobileNumber.length === 0) {
        this.mobileError = ''
      } else if (this.mobileNumber.length < 10) {
        this.mobileError = 'Mobile number must be 10 digits'
      } else if (!this.mobileNumber.startsWith('9')) {
        this.mobileError = 'Mobile number must start with 9'
      } else {
        this.mobileError = ''
      }
    },

    goToConfirmation() {
      if (!this.isValidMobileNumber) {
        alert('Please enter a valid 10-digit mobile number starting with 9')
        return
      }
      this.currentStep = 'confirm'
    },

    async handlePayment() {
      this.isProcessing = true

      try {
        console.log('Processing GCash payment...')

        await this.simulatePaymentProcessing()

        this.$emit('payment-success', {
          amount: this.finalTotal,
          paymentMethod: 'GCash',
          mobileNumber: '+63' + this.mobileNumber,
          transactionId: 'GC' + Date.now(),
          timestamp: new Date().toISOString()
        })

      } catch (error) {
        console.error('Payment processing failed:', error)
        alert('Payment failed. Please try again.')
      } finally {
        this.isProcessing = false
      }
    },

    simulatePaymentProcessing() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    }
  },
  emits: ['go-back', 'payment-success']
}
</script>

<style scoped>
/* ========== BASE STYLES ========== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

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
  display: flex;
  flex-direction: column;
}

.step-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ========== HEADER ========== */
.page-header {
  display: flex;
  align-items: center;
  padding: 0 0 20px 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 30px;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #111827;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.back-button:hover {
  background: rgba(0,0,0,0.03);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0 8px;
}

/* ========== LOGO ========== */
.logo-container {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gcash-logo-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

/* ========== STEP 1: PAYMENT CARD ========== */
.payment-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.transaction-details {
  background-color: #0c3437;
  color: white;
  padding: 24px;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: center;
}

.label {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.9;
}

.value {
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}

.value.amount {
  font-size: 20px;
  font-weight: 700;
}

.login-form {
  padding: 32px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.login-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 32px;
}

.input-container {
  margin-bottom: 32px;
}

.input-group {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 12px;
}

.country-code {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  padding-right: 12px;
  margin-right: 12px;
  border-right: 1px solid #d1d5db;
}

.mobile-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1a1a1a;
  background: transparent;
}

.mobile-input::placeholder {
  color: #9ca3af;
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  margin-top: 8px;
}

.next-button {
  width: 100%;
  padding: 16px;
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(31, 79, 90, 0.2);
  margin-top: auto;
  font-family: 'Poppins', sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.next-button:hover:not(.disabled) {
  background-color: #0a2b2e;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(31, 79, 90, 0.3);
}

.next-button.disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* ========== STEP 2: CONFIRMATION ========== */
.transaction-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
  flex: 1;
  max-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.payee-header {
  background: #0c3437;
  padding: 20px;
  text-align: center;
}

.payee-name {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.payment-summary {
  padding: 24px;
}

.summary-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  text-align: center;
  margin: 0 0 24px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.amount-breakdown {
  display: flex;
  flex-direction: column;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.amount-label {
  font-size: 16px;
  color: #666;
  font-weight: 400;
}

.amount-value {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.divider {
  height: 1px;
  background: #e5e5e5;
  margin: 20px 0;
}

.total-row {
  margin-bottom: 0;
}

.total-label {
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.total-value {
  font-size: 18px;
  color: #0c3437;
  font-weight: 700;
}

.pay-button-section {
  margin-top: auto;
  padding: 20px 0 0 0;
  max-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.pay-button {
  width: 100%;
  background: #0c3437;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 18px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(31, 79, 90, 0.3);
  font-family: 'Poppins', sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.pay-button:hover:not(:disabled) {
  background: #0a2b2e;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(31, 79, 90, 0.4);
}

.pay-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(31, 79, 90, 0.3);
}

.pay-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.7;
}

/* ========== LOADING OVERLAY ========== */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.loading-spinner {
  text-align: center;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0c3437;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner p {
  color: #0c3437;
  font-weight: 500;
  margin: 0;
}

/* ========== RESPONSIVE BREAKPOINTS ========== */

/* Extra Small Phones (up to 320px) */
@media (max-width: 320px) {
  .gcash-inner {
    padding: 28px 16px;
    border-radius: 20px 20px 0 0;
  }

  .page-header {
    padding: 0 0 16px 0;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 16px;
  }

  .back-button {
    font-size: 16px;
    width: 36px;
    height: 36px;
  }

  .logo-container {
    margin-bottom: 28px;
  }

  .gcash-logo-image {
    width: 90px;
    height: 90px;
  }

  .payment-card,
  .transaction-card {
    border-radius: 12px;
  }

  .transaction-details,
  .payee-header {
    padding: 18px;
  }

  .value.amount {
    font-size: 18px;
  }

  .payee-name {
    font-size: 16px;
  }

  .login-form,
  .payment-summary {
    padding: 24px 18px;
  }

  .login-title {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .input-container {
    margin-bottom: 24px;
  }

  .country-code,
  .mobile-input {
    font-size: 15px;
  }

  .next-button,
  .pay-button {
    padding: 14px;
    font-size: 15px;
  }

  .amount-label,
  .amount-value {
    font-size: 15px;
  }

  .total-label,
  .total-value {
    font-size: 17px;
  }

  .loading-spinner {
    padding: 24px;
  }

  .spinner {
    width: 32px;
    height: 32px;
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .gcash-inner {
    padding: 32px 20px;
  }

  .page-header {
    padding: 0 0 18px 0;
    margin-bottom: 28px;
  }

  .logo-container {
    margin-bottom: 32px;
  }

  .gcash-logo-image {
    width: 100px;
    height: 100px;
  }

  .transaction-details,
  .payee-header {
    padding: 20px;
  }

  .login-form,
  .payment-summary {
    padding: 28px 20px;
  }
}

/* Medium Phones (375px - 414px) - Standard */
@media (min-width: 375px) and (max-width: 414px) {
  .gcash-inner {
    padding: 36px 24px;
  }

  .page-header {
    padding: 0 0 20px 0;
    margin-bottom: 30px;
  }

  .logo-container {
    margin-bottom: 40px;
  }

  .gcash-logo-image {
    width: 120px;
    height: 120px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .gcash-inner {
    padding: 36px 28px;
  }

  .page-header {
    padding: 0 0 22px 0;
    margin-bottom: 32px;
  }

  .logo-container {
    margin-bottom: 42px;
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
    max-width: 600px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .page-header {
    padding: 0 0 24px 0;
    margin-bottom: 36px;
  }

  .page-title {
    font-size: 20px;
  }

  .back-button {
    font-size: 20px;
  }

  .logo-container {
    margin-bottom: 48px;
  }

  .gcash-logo-image {
    width: 140px;
    height: 140px;
  }

  .payment-card,
  .transaction-card {
    max-width: 500px;
  }

  .pay-button-section {
    max-width: 500px;
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
    max-width: 550px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 44px 36px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  .page-header {
    padding: 0 0 28px 0;
    margin-bottom: 40px;
  }

  .page-title {
    font-size: 22px;
  }

  .gcash-logo-image {
    width: 150px;
    height: 150px;
  }

  .payment-card,
  .transaction-card {
    max-width: 500px;
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
    max-width: 600px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 48px 40px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
  }

  .page-header {
    padding: 0 0 32px 0;
    margin-bottom: 44px;
  }

  .page-title {
    font-size: 24px;
  }

  .logo-container {
    margin-bottom: 52px;
  }

  .gcash-logo-image {
    width: 160px;
    height: 160px;
  }

  .payment-card,
  .transaction-card {
    max-width: 500px;
  }

  .pay-button-section {
    max-width: 500px;
  }
}

/* Landscape Mobile (short height) */
@media (max-height: 600px) and (orientation: landscape) {
  .gcash-inner {
    padding: 20px 16px;
  }

  .page-header {
    padding: 0 0 12px 0;
    margin-bottom: 20px;
  }

  .logo-container {
    margin-bottom: 20px;
  }

  .gcash-logo-image {
    width: 80px;
    height: 80px;
  }

  .transaction-details,
  .payee-header {
    padding: 16px;
  }

  .login-form,
  .payment-summary {
    padding: 20px 16px;
  }

  .login-title {
    margin-bottom: 20px;
  }

  .input-container {
    margin-bottom: 20px;
  }

  .next-button,
  .pay-button {
    padding: 14px;
    font-size: 15px;
  }

  .pay-button-section {
    padding: 16px 0 0 0;
  }

  .loading-spinner {
    padding: 24px;
  }
}

/* Very Short Screens */
@media (max-height: 500px) {
  .gcash-inner {
    padding: 16px 12px;
  }

  .page-header {
    padding: 0 0 10px 0;
    margin-bottom: 16px;
  }

  .logo-container {
    margin-bottom: 16px;
  }

  .gcash-logo-image {
    width: 60px;
    height: 60px;
  }

  .transaction-details,
  .payee-header {
    padding: 14px;
  }

  .login-form,
  .payment-summary {
    padding: 16px 12px;
  }

  .login-title {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .input-container {
    margin-bottom: 16px;
  }

  .amount-row {
    margin-bottom: 12px;
  }

  .next-button,
  .pay-button {
    padding: 12px;
    font-size: 14px;
  }

  .loading-spinner {
    padding: 20px;
  }

  .spinner {
    width: 32px;
    height: 32px;
  }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  .back-button {
    min-height: 44px;
    min-width: 44px;
  }

  .next-button,
  .pay-button {
    min-height: 48px;
  }
}

/* Prevent zoom on iOS */
@media screen and (max-width: 767px) {
  .mobile-input,
  .next-button,
  .pay-button {
    font-size: 16px;
  }
}

/* Safe Area Insets for Notched Devices */
@supports(padding: max(0px)) {
  .container {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }

  .gcash-inner {
    padding-left: max(24px, env(safe-area-inset-left));
    padding-right: max(24px, env(safe-area-inset-right));
  }
}

/* Prevent Horizontal Scroll */
html, body, .container, .gcash-inner {
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
