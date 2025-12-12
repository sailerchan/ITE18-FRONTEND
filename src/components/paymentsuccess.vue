<template>
  <div class="payment-success-page">
    <!-- Header -->
    <header class="page-header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
      </button>
    </header>

    <!-- Success Content -->
    <main class="success-content">
      <!-- Success Indicator -->
      <div class="success-indicator">
        <div class="success-circle">
          <i class="fas fa-check"></i>
        </div>
      </div>

      <!-- Success Message -->
      <h1 class="success-message">Payment Successful!</h1>

      <!-- Electronic Receipt -->
      <div class="receipt-container">
        <!-- Title with dashed lines -->
        <div class="receipt-header">
          <div class="dashed-line"></div>
          <h2 class="receipt-title">ELECTRONIC RECEIPT</h2>
          <div class="dashed-line"></div>
        </div>

        <!-- Transaction Details -->
        <div class="receipt-details">
          <div class="receipt-item">
            <span class="label">Amount Paid</span>
            <span class="value amount">PHP {{ receiptData.amount }}</span>
          </div>
          <div class="receipt-item">
            <span class="label">Payment Method</span>
            <span class="value method">{{ receiptData.paymentMethod }}</span>
          </div>
        </div>

        <!-- Receipt Information -->
        <div class="receipt-info">
          <div class="receipt-item">
            <span class="label">Receipt No.</span>
            <span class="value receipt-number">{{ receiptData.receiptNumber }}</span>
          </div>
          <div class="receipt-item">
            <span class="label">Date and Time</span>
            <span class="value datetime">{{ receiptData.dateTime }}</span>
          </div>
        </div>
      </div>

      <!-- Download Option -->
      <button class="download-link" @click="downloadReceipt">
        Download
      </button>

      <!-- Action Button - Changed to "Go to Itinerary" -->
      <button class="okay-button" @click="goToItinerary">
        Go to Itinerary
      </button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess',
  props: {
    receiptData: {
      type: Object,
      default: () => ({
        amount: '',
        paymentMethod: 'GCash',
        receiptNumber: '',
        dateTime: ''
      })
    }
  },
  methods: {
    goBack() {
      this.$emit('go-back')
    },
    goToItinerary() {
      this.$emit('go-itinerary') 
    },
    downloadReceipt() {
      console.log('Downloading receipt...')
      // Implement download functionality
      alert('Receipt download started!')
    }
  },
  emits: [
    'go-back',
    'go-itinerary'
  ]
}
</script>

<style scoped>
.payment-success-page {
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

/* Header Styles */
.page-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  flex-shrink: 0;
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
  -webkit-tap-highlight-color: transparent;
}

/* Success Content */
.success-content {
  flex: 1;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

/* Success Indicator */
.success-indicator {
  margin-bottom: 32px;
}

.success-circle {
  width: 120px;
  height: 120px;
  border: 8px solid #32bd37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  animation: scaleIn 0.6s ease-out;
}

.success-circle i {
  color: #32bd37;
  font-size: 48px;
  font-weight: bold;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Success Message */
.success-message {
  font-size: 24px;
  font-weight: 700;
  color: #32bd37;
  margin: 0 0 40px 0;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Receipt Container */
.receipt-container {
  background: white;
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.6s ease-out 0.4s both;
  background-color: #fafbfc;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Receipt Header */
.receipt-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.dashed-line {
  flex: 1;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #ccc 0px,
    #ccc 4px,
    transparent 4px,
    transparent 8px
  );
}

.receipt-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  white-space: nowrap;
}

/* Receipt Details */
.receipt-details {
  margin-bottom: 20px;
}

.receipt-info {
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}

.receipt-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.receipt-item:last-child {
  margin-bottom: 0;
}

.label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.value.amount {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.value.method {
  color: #0070ba;
  font-weight: 600;
}

.value.receipt-number {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #333;
}

.value.datetime {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

/* Download Link */
.download-link {
  background: none;
  border: none;
  color: #1f4f5a;
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 40px;
  padding: 8px 16px;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.download-link:hover {
  color: #163a43;
}

/* Okay Button */
.okay-button {
  width: 100%;
  max-width: 400px;
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
  box-shadow: 0 4px 12px rgba(31, 79, 90, 0.2);
}

.okay-button:hover {
  background-color: #163a43;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(31, 79, 90, 0.3);
}

.okay-button:active {
  transform: translateY(0);
}

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .success-content {
    padding: 32px 20px;
  }

  .success-circle {
    width: 100px;
    height: 100px;
    border-width: 6px;
  }

  .success-circle i {
    font-size: 40px;
  }

  .success-message {
    font-size: 20px;
    margin-bottom: 32px;
  }

  .receipt-container {
    padding: 20px;
    max-width: 280px;
  }

  .receipt-title {
    font-size: 13px;
  }

  .label,
  .value {
    font-size: 13px;
  }

  .value.amount {
    font-size: 16px;
  }

  .value.datetime {
    font-size: 11px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .success-content {
    padding: 36px 24px;
  }

  .success-circle {
    width: 110px;
    height: 110px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .success-content {
    padding: 36px 28px;
  }

  .success-circle {
    width: 120px;
    height: 120px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .payment-success-page {
    max-width: 768px;
    margin: 0 auto;
  }

  .success-content {
    padding: 40px 32px;
    max-width: 768px;
    margin: 0 auto;
  }

  .receipt-container {
    max-width: 500px;
  }

  .okay-button {
    max-width: 500px;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .payment-success-page {
    max-width: 1024px;
    margin: 0 auto;
  }

  .success-content {
    padding: 44px 36px;
    max-width: 500px;
    margin: 0 auto;
  }

  .receipt-container {
    max-width: 400px;
  }

  .okay-button {
    max-width: 400px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .success-content {
    padding: 24px 20px;
  }

  .success-circle {
    width: 80px;
    height: 80px;
    border-width: 5px;
  }

  .success-circle i {
    font-size: 32px;
  }

  .success-message {
    font-size: 20px;
    margin-bottom: 24px;
  }

  .receipt-container {
    padding: 20px;
    margin-bottom: 24px;
    max-width: 320px;
  }

  .download-link {
    margin-bottom: 24px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .success-content {
    padding: 20px 16px;
  }

  .success-circle {
    width: 70px;
    height: 70px;
    border-width: 4px;
  }

  .success-circle i {
    font-size: 28px;
  }

  .success-message {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .receipt-container {
    padding: 16px;
    margin-bottom: 20px;
    max-width: 280px;
  }

  .download-link {
    margin-bottom: 20px;
  }
}

/* Safe area insets for notched devices */
@supports(padding: max(0px)) {
  .payment-success-page {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
