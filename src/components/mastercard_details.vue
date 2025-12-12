<template>
  <div class="container">
    <div class="card payment-card">
      <!-- Header -->
      <div class="header">
        <button class="back-btn" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1>Mastercard Payment</h1>
      </div>

      <!-- Mastercard Logo -->
      <div class="mastercard-logo">
        <img src="/images/logos/mastercard.png" alt="Mastercard" class="logo-image">
      </div>

      <!-- Payment Form -->
      <div class="payment-form">
        <!-- Name on Card -->
        <div class="form-group">
          <label class="form-label">Name on Card</label>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter full name"
              v-model="paymentDetails.name"
              class="form-input"
            >
          </div>
        </div>

        <!-- Card Number -->
        <div class="form-group">
          <label class="form-label">Card Number</label>
          <div class="input-box card-input-container">
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              v-model="paymentDetails.cardNumber"
              class="form-input card-number"
              maxlength="19"
              @input="formatCardNumber"
            >
            <div class="card-icon">💳</div>
          </div>
        </div>

        <!-- Expiration and CVV -->
        <div class="row-inputs">
          <div class="form-group">
            <label class="form-label">Expiration</label>
            <div class="input-box">
              <input
                type="text"
                placeholder="MM/YY"
                v-model="paymentDetails.expiry"
                class="form-input"
                maxlength="5"
                @input="formatExpiry"
              >
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">CVV</label>
            <div class="input-box">
              <input
                type="text"
                placeholder="123"
                v-model="paymentDetails.cvv"
                class="form-input"
                maxlength="3"
                @input="formatCVV"
              >
            </div>
          </div>
        </div>

        <!-- Postal Code -->
        <div class="form-group">
          <label class="form-label">Postal Code</label>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter postal code"
              v-model="paymentDetails.postalCode"
              class="form-input"
              @input="formatPostalCode"
            >
          </div>
        </div>

        <!-- Save Card Option -->
        <div class="save-card">
          <label class="checkbox-container">
            <input type="checkbox" v-model="saveCard">
            <span class="checkmark"></span>
            Save credit card information
          </label>
        </div>
      </div>

      <!-- Payment Details -->
      <div class="payment-details">
        <h2>Payment Details</h2>

        <div class="amount-row">
          <span>Amount</span>
          <span>₱{{ totalAmount.toFixed(2) }}</span>
        </div>

        <div class="amount-row">
          <span>Additional fee</span>
          <span>₱{{ additionalFee.toFixed(2) }}</span>
        </div>

        <div class="divider"></div>

        <div class="total-row">
          <span>Total</span>
          <span class="total-amount">₱{{ (totalAmount + additionalFee).toFixed(2) }}</span>
        </div>
      </div>

      <!-- Pay Button -->
      <div class="pay-button-container">
        <button class="pay-button" @click="processPayment" :disabled="!isFormValid || isProcessing">
          {{ isProcessing ? 'Processing...' : `Pay ₱${(totalAmount + additionalFee).toFixed(2)}` }}
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
import { ref, computed } from 'vue'

export default {
  name: 'MastercardDetails',
  props: {
    totalAmount: {
      type: Number,
      default: 2950.00
    },
    additionalFee: {
      type: Number,
      default: 50.00
    }
  },
  emits: ['go-back', 'payment-success'],
  setup(props, { emit }) {
    const paymentDetails = ref({
      name: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      postalCode: ''
    })

    const saveCard = ref(false)
    const isProcessing = ref(false)

    const isFormValid = computed(() => {
      return paymentDetails.value.name &&
             paymentDetails.value.cardNumber.replace(/\s/g, '').length === 16 &&
             paymentDetails.value.expiry.length === 5 &&
             paymentDetails.value.cvv.length === 3 &&
             paymentDetails.value.postalCode
    })

    const formatCardNumber = (event) => {
      let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      const matches = value.match(/\d{4,16}/g)
      const match = matches ? matches[0] : ''
      const parts = []

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
      }

      if (parts.length) {
        paymentDetails.value.cardNumber = parts.join(' ')
      } else {
        paymentDetails.value.cardNumber = value
      }
    }

    const formatExpiry = (event) => {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4)
      }
      paymentDetails.value.expiry = value
    }

    const formatCVV = (event) => {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length > 3) {
        value = value.substring(0, 3)
      }
      paymentDetails.value.cvv = value
    }

    const formatPostalCode = (event) => {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length > 4) {
        value = value.substring(0, 4)
      }
      paymentDetails.value.postalCode = value
    }

    const processPayment = () => {
      if (!isFormValid.value) {
        alert('Please fill in all payment details correctly')
        return
      }

      // Show loading state
      isProcessing.value = true

      // Simulate Mastercard payment processing
      console.log('Processing Mastercard payment...', paymentDetails.value)

      // Simulate API call delay
      setTimeout(() => {
        isProcessing.value = false

        // Emit payment success with data
        emit('payment-success', {
          amount: props.totalAmount + props.additionalFee,
          paymentMethod: 'Mastercard',
          transactionId: 'MC' + Date.now(),
          cardLastFour: paymentDetails.value.cardNumber.replace(/\s/g, '').slice(-4),
          timestamp: new Date().toISOString()
        })
      }, 2000)
    }

    return {
      paymentDetails,
      saveCard,
      isProcessing,
      totalAmount: ref(props.totalAmount),
      additionalFee: ref(props.additionalFee),
      isFormValid,
      formatCardNumber,
      formatExpiry,
      formatCVV,
      formatPostalCode,
      processPayment
    }
  }
}
</script>

<style scoped>
/* Container structure without hero banner */
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

.payment-card {
  background: #ffffff;
  border-radius: 0;
  padding: 36px 24px;
  margin-top: 0;
  position: relative;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.header h1 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  margin-left: 15px;
}

/* Mastercard Logo */
.mastercard-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo-image {
  width: 80px;
  height: 50px;
  object-fit: contain;
}

/* Form Styles - Same as login page */
.payment-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 15px;
}

.input-box {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 16px;
  border: 1.5px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  background-color: #fafbfc;
  transition: all 0.3s ease;
  box-sizing: border-box;
  -webkit-appearance: none;
}

.form-input:focus {
  outline: none;
  border-color: #1f4f5a;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(31, 79, 90, 0.1);
}

.form-input::placeholder {
  color: #a0a4a8;
}

.card-input-container {
  position: relative;
}

.card-number {
  padding-right: 50px;
}

.card-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}

.row-inputs {
  display: flex;
  gap: 14px;
}

.row-inputs .form-group {
  flex: 1;
  margin-bottom: 0;
}

/* Save Card Checkbox */
.save-card {
  margin-top: 25px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.checkbox-container input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  margin-right: 12px;
  position: relative;
  transition: all 0.3s;
  background-color: #fafbfc;
}

.checkbox-container input:checked + .checkmark {
  background: #1f4f5a;
  border-color: #1f4f5a;
}

.checkbox-container input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 14px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Payment Details */
.payment-details {
  background: #f8f9fa;
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
}

.payment-details h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  color: #666;
}

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 16px 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.total-amount {
  color: #1f4f5a;
  font-size: 18px;
}

/* Pay Button - Same as login button */
.pay-button-container {
  padding-bottom: 20px;
}

.pay-button {
  width: 100%;
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 17px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
}

.pay-button:hover:not(:disabled) {
  background-color: #163a43;
}

.pay-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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

/* Responsive breakpoints adjusted for no hero banner */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .payment-card {
    padding: 32px 20px;
  }

  .logo-image {
    width: 70px;
    height: 45px;
  }

  .form-input {
    padding: 14px;
    font-size: 15px;
  }

  .row-inputs {
    gap: 12px;
  }

  .payment-details {
    padding: 20px;
  }

  .amount-row,
  .total-row {
    font-size: 14px;
  }

  .total-amount {
    font-size: 16px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .payment-card {
    padding: 36px 24px;
  }

  .logo-image {
    width: 75px;
    height: 47px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .payment-card {
    padding: 36px 28px;
  }

  .logo-image {
    width: 80px;
    height: 50px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }

  .payment-card {
    max-width: 768px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  .payment-card {
    max-width: 500px;
    margin: 40px auto;
    padding: 44px 36px;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .payment-card {
    padding: 24px 20px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .mastercard-logo {
    margin-bottom: 20px;
  }

  .logo-image {
    width: 60px;
    height: 40px;
  }

  .payment-form {
    margin-bottom: 20px;
  }

  .payment-details {
    margin-bottom: 20px;
    padding: 20px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .payment-card {
    padding: 20px 16px;
  }

  .mastercard-logo {
    margin-bottom: 15px;
  }

  .logo-image {
    width: 50px;
    height: 35px;
  }

  .form-input {
    padding: 12px;
  }

  .payment-details {
    padding: 16px;
    margin-bottom: 15px;
  }
}

/* Prevent zoom on iOS input focus */
@media screen and (max-width: 767px) {
  .form-input {
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
