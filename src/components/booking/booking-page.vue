<template>
  <div class="container">
    <div class="booking-inner">

      <!-- List of Accommodation View -->
      <div v-if="currentBookingView === 'listing'">
        <!-- Dynamic Image Header -->
         <div class="header-container" >
        <div class="image-header" :style="{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(' + currentPropertyImage + ')' }">
          <button class="close-btn" @click="$emit('go-to-page', 'accommodation')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="details-card-wrapper">
          <div class="details-content">
            <h2 class="property-title">{{ selectedProperty.title }}</h2>
            <p class="property-subtitle">{{ selectedProperty.subtitle }}</p>

            <div class="location-info">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ selectedProperty.location }} - <button class="view-map" @click="$emit('handle-view-map')"> View Map</button>
            </span>
             </div>

            <div class="separator"></div>

            <div class="description">
              <p v-for="paragraph in selectedProperty.description" :key="paragraph">{{ paragraph }}</p>
            </div>
          </div>

          <div class="action-bar">
            <div class="price">₱{{ selectedProperty.price }}<span>/night</span></div>
            <button class="book-button" @click="$emit('show-confirmation-view')">Book Now</button>
          </div>
        </div>
        </div>
      </div>

      <!-- Confirmation View -->

      <div v-if="currentBookingView === 'confirmation'">
        <div class="header-container">
          <!-- Header with Back Button -->
          <header class="page-header">
            <button class="back-button" @click="$emit('show-listing-view')">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="page-title">Confirm Booking</h1>
          </header>

          <div class="booking-card">
            <div class="confirmation-image" :style="{ backgroundImage: 'url(' + currentConfirmationImage + ')' }"></div>

            <div class="booking-summary">
              <h2 class="property-title">{{ selectedProperty.title }}</h2>
              <p class="booking-dates"><i class="fa-solid fa-calendar"></i> {{ bookingDatesDisplay }}</p>

              <div class="price-row">
                <span>Price</span>
                <span>₱{{ selectedProperty.price }}</span>
              </div>
              <div class="price-row">
                <span>Nights</span>
                <span>{{ booking.nights }}</span>
              </div>
              <div class="price-row total">
                <span>Total</span>
                <span>₱{{ totalPrice }}</span>
              </div>
            </div>
          </div>
        </div>

          <div class="payment-section">
  <h3 class="payment-title">Select Payment Method</h3>

  <div v-for="method in paymentMethods"
       :key="method.id"
       class="payment-option"
       :class="{ selected: selectedPayment?.id === method.id }"
       @click="$emit('select-payment-method', method)">
    <div class="payment-method-content">
      <!-- Logo comes first (left side) -->
      <img
        :src="method.logo"
        :alt="method.name"
        class="payment-logo"
        @error="handleImageError"
      >

      <span class="payment-name">{{ method.name }}</span>
    </div>
    <!-- Radio check on right side -->
    <div class="radio-indicator">
      <i class="fas fa-check radio-check"></i>
    </div>
  </div>

  <button class="next-button"
          :disabled="!selectedPayment"
          @click="$emit('handle-next')">
    Next
  </button>
</div>


      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'booking-page',
  props: {
    currentBookingView: {
      type: String,
      required: true
    },
    selectedProperty: {
      type: Object,
      required: true
    },
    selectedPayment: {
      type: Object,
      default: null
    },
    booking: {
      type: Object,
      required: true
    },
    paymentMethods: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: String,
      required: true
    },
    currentPropertyImage: {
      type: String,
      required: true
    },
    currentConfirmationImage: {
      type: String,
      required: true
    },
    bookingDatesDisplay: {
      type: String,
      required: true
    }
  },
  emits: [
    'show-confirmation-view',
    'show-listing-view',
    'handle-view-map',
    'select-payment-method',
    'handle-next',
    'go-to-page'
  ],
  methods: {
    handleImageError(event) {
      console.log('Image failed to load:', event.target.src);
      event.target.style.display = 'none';
    }
  }
}
</script>

<style scoped>

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
.booking-inner {
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  padding: 0;
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
.header-container{
  background: #ffffff;
  padding-bottom: 20px;
}
/* ===== HEADER ===== */
.page-header {
  display: flex;
  align-items: center;
  padding: 24px 16px 12px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
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
  -webkit-tap-highlight-color: transparent;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(0,0,0,0.03);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  margin-left: 8px;
}

/* Header image */
.image-header {
    height: 70vh;
    background-size: cover;
    background-position: center;
    position: relative;

}

.close-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(209, 201, 201, 0.061);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.5);
}

.close-btn:hover {
    background-color: rgba(255, 255, 255, 1);
}

.close-btn i {
    color: #ffffff;
    font-size: 18px;
}

.details-card-wrapper {
    background-color: white;
    border-radius: 30px 30px 15px 15px;
    margin-top: -30px;
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.details-content {
    padding: 30px 25px 20px;
    flex: 1;
}

.property-title {
    font-size: 24px;
    font-weight: 700;
    margin-left: 8px;
    margin-bottom: 8px;
    color: #1a1a1a;
    line-height: 1.2;
}

.property-subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 16px;
    margin-left: 10px;
    line-height: 1.2;
}

.location-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 15px;
    color: #0c3437;
    margin-left: 10px;

}

.location-info i {
    color: #0c3437;
    margin-right: 8px;
    font-size: 15px;
}

.view-map {
    color: #0c3437;
    text-decoration: underline;
    font-weight: 500;
    margin-left: auto;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 13px;
    -webkit-tap-highlight-color: transparent;
}

.separator {
    height: 1px;
    background-color: #eaeaea;
    margin: 24px 0;
}

.description {
    color: #444;
    line-height: 1.6;
    font-size: 15px;
}

.description p {
    margin-bottom: 16px;
}

.action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    background-color: white;
    border-top: 1px solid #eaeaea;
    margin-top: auto;
}

.price {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
}

.price span {
    font-size: 16px;
    font-weight: 400;
    color: #666;
}

.book-button {
    background-color: #0c3437;
    color: white;
    border: none;
    padding: 14px 30px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
}

.book-button:hover {
    background-color: #173c45;
}

/* Confirmation section */
.booking-card{
  background: white;
  border-radius: 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(12, 6, 6, 0.464);
  margin-bottom: 10px;
}
.confirmation-image {
     width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;

}

.booking-summary {
    padding: 20px;
  background: white;
}
.booking-summary .property-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #1a1a1a;
}
.booking-dates {
     color: #666;
  margin-bottom: 20px;
  margin-top: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.price-row {
     display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
  color: #1a1a1a;
}

.price-row.total {
    border-top: 1px solid #e0e0e0;
  padding-top: 12px;
  margin-top: 12px;
  font-weight: 700;
  font-size: 16px;
}

.payment-section {
    padding: 24px;
    background: #ffffff;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin:15px;
}

.payment-title {
    font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.payment-option {
    display: flex;
    align-items: center;
    padding: 16px;
    border: 1px solid #a8a8a8;
    border-radius: 8px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
}


.payment-option:hover {
    border-color: #1f4f5a;
}

.payment-option.selected {
    border-color: #1f4f5a;
    background-color: #f0f7f9;
}

.radio-indicator {
     width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-option.selected .radio-indicator {
    border-color: #0c3437;
    background-color: #0c3437;
}

.radio-check {
    color: white;
    font-size: 12px;
    display: none;
}

.payment-option.selected .radio-check {
    display: block;
}

/* Payment Method Content with Logo */
.payment-method-content {
    display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.payment-logo {
    width: 40px;
    height: 25px;
    object-fit: contain;
    border-radius: 4px;
    background: transparent;
    padding: 2px;
    border: none;
    flex-shrink: 0;
}

/* Ensure payment names are visible even if images fail */
.payment-name {
    font-size: 15px;
    font-weight: 500;
    color: #333;
    flex: 1;
}

/* Fallback styling when images don't load */
.payment-option .payment-method-content:only-child .payment-name {
    margin-left: 0;
}

.next-button {
    width: 100%;
    background-color: #0c3437;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 28px;
    font-weight: 600;
    margin-top: 24px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 16px;
    -webkit-tap-highlight-color: transparent;
}

.next-button:hover {
    background-color: #173c45;
}

.next-button:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
}

/* Image error fallback styling */
.payment-logo[src=""],
.payment-logo:not([src]) {
    display: none;
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
    .booking-inner {
        border-radius: 20px 20px 0 0;
    }

    .page-header {
        padding: 20px 12px 10px;
    }

    .page-title {
        font-size: 16px;
    }

    .image-header {
        height: 45vh;
    }

    .details-content {
        padding: 20px 16px 16px;
    }

    .property-title {
        font-size: 20px;
    }

    .property-subtitle {
        font-size: 14px;
    }

    .action-bar {
        padding: 16px;
    }

    .price {
        font-size: 20px;
    }

    .book-button {
        padding: 12px 20px;
        font-size: 14px;
    }

    .confirmation-image {
        height: 180px;
    }

    .payment-logo {
        width: 35px;
        height: 22px;
    }

    .payment-name {
        font-size: 14px;
    }

    .payment-option {
        padding: 14px;
    }

    .booking-summary,
    .payment-section {
        padding: 12px;
    }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
    .booking-inner {
        border-radius: 24px 24px 0 0;
    }

    .page-header {
        padding: 24px 16px 12px;
    }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
    .booking-inner {
        border-radius: 24px 24px 0 0;
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

    .booking-inner {
        max-width: 768px;
        margin: -50px auto 0 auto;
        border-radius: 24px;
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

    .booking-inner {
        max-width: 500px;
        margin: -60px auto 0 auto;
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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

    .booking-inner {
        max-width: 500px;
        margin: 0 auto;
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
    .page-header {
        padding: 16px 12px 8px;
    }

    .image-header {
        height: 35vh;
    }

    .details-content {
        padding: 20px 16px 16px;
    }

    .booking-summary,
    .payment-section {
        padding: 12px;
    }

    .confirmation-image {
        height: 160px;
    }
}

/* Very short screens */
@media (max-height: 500px) {
    .page-header {
        padding: 12px 8px 6px;
    }

    .page-title {
        font-size: 16px;
    }

    .image-header {
        height: 30vh;
    }

    .details-content {
        padding: 16px 12px 12px;
    }

    .booking-summary,
    .payment-section {
        padding: 10px;
    }

    .confirmation-image {
        height: 140px;
    }

    .property-title {
        font-size: 18px;
    }

    .book-button,
    .next-button {
        padding: 12px 16px;
        font-size: 14px;
    }
}

/* Prevent zoom on iOS */
@media screen and (max-width: 767px) {
    .book-button,
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
