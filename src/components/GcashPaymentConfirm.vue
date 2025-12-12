<template>
  <div class="container">
    <div class="gcash-confirm-inner">
      <!-- Navigation Header -->
      <div class="header">
        <button class="back-btn" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="header-title">Confirm Payment</h1>
      </div>

      <!-- Logo -->
      <div class="logo-container">
        <img src="/images/logos/gcash_logo.png" alt="GCash" class="gcash-logo">
      </div>

      <!-- Transaction Details Card -->
      <div class="transaction-card">
        <!-- Payee Header -->
        <div class="payee-header">
          <h2 class="payee-name">{{ selectedAccommodation || 'Paradiso Hostel' }}</h2>
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

      <!-- Loading Overlay -->
      <div v-if="isProcessing" class="loading-overlay">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Processing payment...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GcashPaymentConfirm',
  props: {
    totalAmount: {
      type: Number,
      default: 2150.00
    },
    selectedAccommodation: {
      type: String,
      default: 'Paradiso Hostel'
    }
  },
  data() {
    return {
      additionalFee: 50.00,
      isProcessing: false
    }
  },
  computed: {
    baseAmount() {
      return this.totalAmount - this.additionalFee
    },
    finalTotal() {
      return this.baseAmount + this.additionalFee
    }
  },
  emits: ['go-back', 'payment-success'],
  methods: {
    async handlePayment() {
      // Show loading state
      this.isProcessing = true

      try {
        console.log('Processing GCash payment...')

        // Simulate payment processing
        await this.simulatePaymentProcessing()

        // Emit payment success with receipt data
        this.$emit('payment-success', {
          amount: this.finalTotal,
          paymentMethod: 'GCash',
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
        // Simulate network delay (2 seconds)
        setTimeout(() => {
          resolve()
        }, 2000)
      })
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
.gcash-confirm-inner {
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

/* Header Styles */
.header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: black;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.back-btn:hover {
  background-color: #f5f5f5;
}

.header-title {
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  margin-left: 15px;
  flex: 1;
}

/* Logo Styles */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.gcash-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

/* Transaction Card */
.transaction-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
  flex: 1;
}

/* Payee Header */
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

/* Payment Summary */
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
  color: #1f4f5a;
  font-weight: 700;
}

/* Pay Button */
.pay-button-section {
  margin-top: auto;
  padding: 20px 0 0 0;
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
  -webkit-tap-highlight-color: transparent;
  font-family:'Poppins', sans-serif;
}

.pay-button:hover:not(:disabled) {
  background: #173c45;
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

/* Loading Overlay */
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

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .gcash-confirm-inner {
    padding: 32px 20px;
    border-radius: 20px 20px 0 0;
  }

  .header {
    margin-bottom: 30px;
  }

  .header-title {
    font-size: 16px;
  }

  .back-btn {
    font-size: 16px;
    width: 36px;
    height: 36px;
  }

  .gcash-logo {
    width: 100px;
    height: 100px;
  }

  .payee-header {
    padding: 18px;
  }

  .payee-name {
    font-size: 16px;
  }

  .payment-summary {
    padding: 20px;
  }

  .amount-label,
  .amount-value {
    font-size: 15px;
  }

  .total-label,
  .total-value {
    font-size: 17px;
  }

  .pay-button {
    padding: 16px;
    font-size: 16px;
  }

  .loading-spinner {
    padding: 24px;
  }

  .spinner {
    width: 32px;
    height: 32px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .gcash-confirm-inner {
    padding: 36px 24px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .gcash-confirm-inner {
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

  .gcash-confirm-inner {
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

  .gcash-confirm-inner {
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

  .gcash-confirm-inner {
    max-width: 500px;
    margin: 0 auto;
    padding: 48px 40px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .gcash-confirm-inner {
    padding: 24px 20px;
  }

  .header {
    margin-bottom: 24px;
  }

  .logo-container {
    margin-bottom: 24px;
  }

  .gcash-logo {
    width: 80px;
    height: 80px;
  }

  .payee-header {
    padding: 16px;
  }

  .payment-summary {
    padding: 20px;
  }

  .pay-button-section {
    padding: 16px 0 0 0;
  }

  .loading-spinner {
    padding: 24px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .gcash-confirm-inner {
    padding: 20px 16px;
  }

  .header {
    margin-bottom: 20px;
  }

  .logo-container {
    margin-bottom: 20px;
  }

  .gcash-logo {
    width: 60px;
    height: 60px;
  }

  .payee-header {
    padding: 14px;
  }

  .payment-summary {
    padding: 16px;
  }

  .amount-row {
    margin-bottom: 12px;
  }

  .pay-button {
    padding: 14px;
    font-size: 16px;
  }

  .loading-spinner {
    padding: 20px;
  }

  .spinner {
    width: 32px;
    height: 32px;
  }
}

/* Prevent zoom on iOS */
@media screen and (max-width: 767px) {
  .pay-button {
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
