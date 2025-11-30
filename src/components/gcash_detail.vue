<template>
  <div class="container">
    <div class="gcash-detail-inner">
      <!-- Header with Back Button -->
      <header class="page-header">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
      </header>

      <!-- Main Content -->
      <main class="main-content">
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
              <div class="value">Paradiso Hostel</div>

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
              @click="proceedToPayment"
              :disabled="!isValidMobileNumber"
              :class="{ disabled: !isValidMobileNumber }"
            >
              Next
            </button>
          </div>
        </div>
      </main>

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
  name: 'GcashDetail',
  props: {
    totalAmount: {
      type: Number,
      required: true,
      default: 2250.00
    }
  },
  data() {
    return {
      mobileNumber: '',
      mobileError: '',
      isProcessing: false
    }
  },
  computed: {
    isValidMobileNumber() {
      return this.mobileNumber.length === 10 && /^9\d{9}$/.test(this.mobileNumber);
    }
  },
  methods: {
    goBack() {
      this.$emit('go-back');
    },
    validateMobileNumber() {
      // Remove any non-digit characters
      this.mobileNumber = this.mobileNumber.replace(/\D/g, '');

      if (this.mobileNumber.length === 0) {
        this.mobileError = '';
      } else if (this.mobileNumber.length < 10) {
        this.mobileError = 'Mobile number must be 10 digits';
      } else if (!this.mobileNumber.startsWith('9')) {
        this.mobileError = 'Mobile number must start with 9';
      } else {
        this.mobileError = '';
      }
    },
    async proceedToPayment() {
      if (!this.isValidMobileNumber) {
        alert('Please enter a valid 10-digit mobile number starting with 9');
        return;
      }

      // Show loading state
      this.isProcessing = true;

      try {
        console.log('Processing payment with mobile number: +63' + this.mobileNumber);

        // Simulate API call or payment processing
        await this.simulatePaymentProcessing();

        // Emit payment success with receipt data
        this.$emit('payment-success', {
          amount: this.totalAmount,
          paymentMethod: 'GCash',
          mobileNumber: '+63' + this.mobileNumber,
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        console.error('Payment processing failed:', error);
        alert('Payment failed. Please try again.');
      } finally {
        this.isProcessing = false;
      }
    },

    simulatePaymentProcessing() {
      return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    }
  },
  emits: [
    'go-back',
    'payment-success'
  ]
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
.gcash-detail-inner {
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
.page-header {
  display: flex;
  align-items: center;
  padding: 0 0 20px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
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

.back-button:hover {
  background-color: #f5f5f5;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* GCash Logo Styles */
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

/* Payment Card Styles */
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
}

/* Transaction Details Box */
.transaction-details {
  background-color: #1f4f5a;
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

/* Login Form Styles */
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

/* Input Container */
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

/* Next Button */
.next-button {
  width: 100%;
  padding: 16px;
  background-color: #1f4f5a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(31, 79, 90, 0.2);
  margin-top: auto;
  -webkit-tap-highlight-color: transparent;
}

.next-button:hover:not(.disabled) {
  background-color: #173c45;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(31, 79, 90, 0.3);
}

.next-button.disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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
  border-top: 4px solid #1f4f5a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner p {
  color: #1f4f5a;
  font-weight: 500;
  margin: 0;
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .gcash-detail-inner {
    padding: 32px 20px;
    border-radius: 20px 20px 0 0;
  }

  .main-content {
    padding: 32px 0;
  }

  .payment-card {
    border-radius: 12px;
  }

  .transaction-details {
    padding: 20px;
  }

  .login-form {
    padding: 24px 20px;
  }

  .gcash-logo-image {
    width: 100px;
    height: 100px;
  }

  .logo-container {
    margin-bottom: 32px;
  }

  .back-button {
    font-size: 18px;
    width: 36px;
    height: 36px;
  }

  .value.amount {
    font-size: 18px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .gcash-detail-inner {
    padding: 36px 24px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .gcash-detail-inner {
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

  .gcash-detail-inner {
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

  .gcash-detail-inner {
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

  .gcash-detail-inner {
    max-width: 500px;
    margin: 0 auto;
    padding: 48px 40px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .gcash-detail-inner {
    padding: 24px 20px;
  }

  .main-content {
    padding: 24px 0;
  }

  .logo-container {
    margin-bottom: 24px;
  }

  .gcash-logo-image {
    width: 80px;
    height: 80px;
  }

  .login-form {
    padding: 20px;
  }

  .transaction-details {
    padding: 20px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .gcash-detail-inner {
    padding: 20px 16px;
  }

  .main-content {
    padding: 16px 0;
  }

  .logo-container {
    margin-bottom: 16px;
  }

  .gcash-logo-image {
    width: 60px;
    height: 60px;
  }

  .transaction-details {
    padding: 16px;
  }

  .login-form {
    padding: 16px;
  }

  .next-button {
    padding: 12px;
    font-size: 14px;
  }

  .value.amount {
    font-size: 16px;
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
