<template>
  <div class="container">
    <div class="accommodation-inner">
      <!-- Header -->
      <div class="accommodation-header">
        <div class="accommodation-back-arrow" @click="$emit('go-to-page', 'datepicker')">←</div>
        <h1>Select accommodation</h1>
      </div>

      <!-- Section Title -->
      <h2 class="accommodation-section-title">Popular places to stay in</h2>
      <span class="accommodation-section-subtitle">{{ selectedDestinationName }}</span>

      <!-- Accommodation List -->
      <div class="accommodation-list">
        <!-- Property Card 1 -->
        <div class="property-card" @click="$emit('view-booking', 'paradiso')">
          <img src="/images/accommodations/paradiso.avif" alt="Paradiso Hotel Bunks" class="property-image">
          <div class="property-type">
            <span class="property-stars"><i class="fas fa-star"></i></span>4.9</div>
          <div class="details-overlay">
            <div class="property-info">
              <p>Paradiso Hotel Bunks</p>
              <div class="property-location">
                <span class="property-location-icon"><i class="fas fa-map-marker-alt"></i> General Luna, Philippines </span>
              </div>
              <div class="property-rating">
              </div>
            </div>
            <div class="price-tag">
              <div class="property-price">₱700.00</div>
                <span class="property-per-night">/ night</span>
            </div>
          </div>
        </div>

        <!-- Property Card 2 -->
        <div class="property-card" @click="$emit('view-booking', 'copacabana')">
          <img src="/images/accommodations/copacabana.jpg" alt="Copacabana Siargao" class="property-image">
          <div class="property-type">
            <span class="property-stars"><i class="fas fa-star"></i> </span>4.7</div>
          <div class="details-overlay">
            <div class="property-info">
              <p>Copacabana Siargao</p>
              <div class="property-location">
                <span class="property-location-icon"><i class="fas fa-map-marker-alt"></i> Generalal Luna, Philippines</span>
              </div>
              <div class="property-rating">

              </div>
            </div>
            <div class="price-tag">
              <div class="property-price">₱2,950.00</div>
              <div class="property-per-night">/ night</div>
            </div>
          </div>
        </div>

        <!-- Property Card 3 -->
        <div class="property-card" @click="$emit('view-booking', 'casavia')">
          <img src="/images/accommodations/casavia.jpg" alt="Paradiso Island Retreat" class="property-image">
          <div class="property-type">
                  <span class="property-stars"><i class="fas fa-star"></i> </span>4.9</div>
          <div class="details-overlay">
            <div class="property-info">
              <p>Casavia Siargao</p>
              <div class="property-location">
                <span class="property-location-icon"><i class="fas fa-map-marker-alt"></i> Generalal Luna, Philippines</span>
              </div>
              <div class="property-rating">

              </div>
            </div>
            <div class="price-tag">
              <div class="property-price">₱890.00</div>
              <div class="property-per-night">/ night</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accommodation_page',
  props: {
    selectedDestinationName: {
      type: String,
      required: true
    }
  },
  emits: [
    'view-booking',
    'go-to-page'
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
.accommodation-inner {
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

/* Header - same styling as login page */
.accommodation-header {
  background: #ffffff;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #e8ecef;
  position: relative;
  margin-bottom: 20px;
}

.accommodation-back-arrow {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
  color: #333;
  width: 30px;
  height:20px;
  display: flex;
  align-items: center;
  justify-content: left;
  -webkit-tap-highlight-color: transparent;
}

.accommodation-back-arrow:hover {
  background-color: #f5f5f5;
}

.accommodation-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: left;
  margin-top: 10px;
  margin-left: 0;
  padding: 0 50px;
  padding-top: 4px;
}

/* Section Titles - maintaining original design */
.accommodation-section-title {
  padding: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  color: #817d7d;
  margin: 0;
  text-align: left;
}

.accommodation-section-subtitle {
  padding: 0 0 16px 0;
  font-size: 22px;
  font-weight: 700;
  color: #0c3437;
  margin-top: -6px;
  margin-bottom: 0;
  text-align: left;
}

/* Accommodation List - maintaining original design */
.accommodation-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 0 24px 0;
  flex: 1;
}

/* Property Card - maintaining original design */
.property-card {
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background: #e9ecef;
  -webkit-tap-highlight-color: transparent;
}

.property-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.details-overlay {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background: #00000005;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.property-info {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #ffffff;
  margin: 0 0 0px 0;
  margin-left:0px;
}

.property-location {
  display: flex;
  font-size: 12px;
  color: #fff7f7e4;
  font-weight: 500;
  margin-bottom: 3px;
  margin-left: 0px;
}


.property-rating {
  display: flex;
  align-items: center;
  margin-top: 0px;
  margin-left: 0px;
  color: #fff7f7e4;
  font-weight: 400;
}

.property-stars {
  color: #FFC107;
  margin-right: 4px;
  font-size: 12px;
}

.property-rating-value {
  font-size: 10px;
  font-weight: 500;
  color: #ffffff;

}

.price-tag {
  text-align: right;
  display: inside;
}

.property-price {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-right: 0px;
}

.property-per-night {
  font-size: 12px;
  color: #ffffff;
    margin-right: 5px;
}

.property-type {
  position: absolute;
  top: 12px;
  right: 15px;
  background: rgba(255, 255, 255, 0.279);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #fdfdfd;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* ================= RESPONSIVE BREAKPOINTS ================= */

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .accommodation-inner {
    padding: 20px 16px;
  }

  .accommodation-header h1 {
    font-size: 18px;
    padding: 0 36px;
  }

  .accommodation-back-arrow {
    width: 24px;
    height: 24px;
    font-size: 18px;
  }

  .accommodation-section-title {
    font-size: 16px;
    padding: 0 0 2px 0;
  }

  .accommodation-section-subtitle {
    font-size: 18px;
    padding: 0 0 12px 0;
    margin-top: -4px;
  }

  .property-card {
    height: 280px;
    border-radius: 20px;
  }

  .details-overlay {
    bottom: 10px;
    left: 12px;
    right: 12px;
    padding: 8px;
    border-radius: 12px;
  }

  .property-info h3 {
    font-size: 16px;
    margin-left: 4px;
    margin-bottom: 2px;
  }

  .property-location {
    font-size: 11px;
    margin-left: 4px;
    margin-bottom: 2px;
  }

  .property-rating {
    margin-left: 4px;
  }

  .property-rating-value {
    font-size: 10px;
  }

  .property-price {
    font-size: 16px;
    margin-right: 8px;
  }

  .property-per-night {
    font-size: 10px;
    margin-right: 8px;
  }

  .property-type {
    top: 10px;
    right: 12px;
    padding: 3px 8px;
    font-size: 10px;
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .accommodation-inner {
    padding: 22px 18px;
  }

  .property-card {
    height: 300px;
    border-radius: 24px;
  }

  .property-info h3 {
    font-size: 17px;
  }

  .property-price {
    font-size: 17px;
  }
}

/* Medium Phones (375px - 414px) - Standard modern phones */
@media (min-width: 375px) and (max-width: 414px) {
  .accommodation-inner {
    padding: 24px 20px;
  }

  .property-card {
    height: 320px;
  }

  .property-info h3 {
    font-size: 18px;
  }
}

/* Large Phones (415px - 480px) */
@media (min-width: 415px) and (max-width: 480px) {
  .accommodation-inner {
    padding: 26px 22px;
  }

  .property-card {
    height: 340px;
  }
}

/* Large Phones (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  .accommodation-inner {
    padding: 28px 24px;
  }

  .property-card {
    height: 360px;
  }

  .details-overlay {
    bottom: 16px;
    left: 20px;
    right: 20px;
    padding: 12px;
  }

  .property-info h3 {
    font-size: 21px;
  }

  .property-price {
    font-size: 20px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    background: #f8f9fa;
    padding: 20px;
  }

  .accommodation-inner {
    max-width: 768px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .accommodation-header h1 {
    font-size: 26px;
    padding: 0 60px;
  }

  .accommodation-section-title {
    font-size: 20px;
    padding: 0 0 6px 0;
  }

  .accommodation-section-subtitle {
    font-size: 24px;
    padding: 0 0 20px 0;
    margin-top: -8px;
  }

  .accommodation-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .property-card {
    height: 320px;
  }

  .property-info h3 {
    font-size: 22px;
  }

  .property-price {
    font-size: 22px;
  }

  .property-type {
    top: 16px;
    right: 24px;
    padding: 6px 12px;
    font-size: 12px;
  }
}

/* Large Tablets (1024px - 1199px) */
@media (min-width: 1024px) and (max-width: 1199px) {
  .container {
    background: #f8f9fa;
    padding: 30px;
  }

  .accommodation-inner {
    max-width: 900px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 44px 36px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .accommodation-header h1 {
    font-size: 28px;
    padding: 0 70px;
  }

  .accommodation-section-title {
    font-size: 22px;
    padding: 0 0 8px 0;
  }

  .accommodation-section-subtitle {
    font-size: 26px;
    padding: 0 0 24px 0;
    margin-top: -10px;
  }

  .accommodation-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .property-card {
    height: 340px;
  }

  .details-overlay {
    bottom: 20px;
    left: 24px;
    right: 24px;
    padding: 14px;
  }

  .property-info h3 {
    font-size: 24px;
  }

  .property-location {
    font-size: 15px;
  }

  .property-price {
    font-size: 24px;
  }

  .property-per-night {
    font-size: 14px;
  }

  .property-type {
    top: 20px;
    right: 28px;
    padding: 8px 14px;
    font-size: 13px;
  }
}

/* Desktop (1200px and up) */
@media (min-width: 1200px) {
  .container {
    background: #f8f9fa;
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .accommodation-inner {
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 48px 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .accommodation-header h1 {
    font-size: 30px;
    padding: 0 80px;
  }

  .accommodation-section-title {
    font-size: 24px;
    padding: 0 0 10px 0;
  }

  .accommodation-section-subtitle {
    font-size: 28px;
    padding: 0 0 28px 0;
    margin-top: -12px;
  }

  .accommodation-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .property-card {
    height: 380px;
  }

  .details-overlay {
    bottom: 24px;
    left: 28px;
    right: 28px;
    padding: 16px;
  }

  .property-info h3 {
    font-size: 26px;
  }

  .property-location {
    font-size: 16px;
  }

  .property-rating-value {
    font-size: 14px;
  }

  .property-price {
    font-size: 26px;
    margin-right: 24px;
  }

  .property-per-night {
    font-size: 15px;
    margin-right: 14px;
  }

  .property-type {
    top: 24px;
    right: 32px;
    padding: 10px 16px;
    font-size: 14px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .accommodation-inner {
    padding: 20px 16px;
  }

  .accommodation-header {
    padding: 0 0 12px 0;
    margin-bottom: 12px;
  }

  .accommodation-section-title {
    padding: 0 0 2px 0;
  }

  .accommodation-section-subtitle {
    padding: 0 0 12px 0;
    margin-top: -4px;
  }

  .accommodation-list {
    gap: 12px;
  }

  .property-card {
    height: 200px;
  }

  .details-overlay {
    bottom: 8px;
    left: 12px;
    right: 12px;
    padding: 8px;
  }

  .property-info h3 {
    font-size: 16px;
    margin-left: 4px;
    margin-bottom: 2px;
  }

  .property-location {
    font-size: 11px;
    margin-left: 4px;
    margin-bottom: 1px;
  }

  .property-rating {
    margin-left: 4px;
  }

  .property-rating-value {
    font-size: 10px;
  }

  .property-price {
    font-size: 16px;
    margin-right: 8px;
  }

  .property-per-night {
    font-size: 10px;
    margin-right: 8px;
  }

  .property-type {
    top: 8px;
    right: 12px;
    padding: 3px 8px;
    font-size: 10px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .accommodation-inner {
    padding: 16px 12px;
  }

  .property-card {
    height: 180px;
  }

  .details-overlay {
    padding: 6px;
    bottom: 6px;
    left: 10px;
    right: 10px;
  }

  .property-info h3 {
    font-size: 14px;
  }

  .property-location,
  .property-rating-value,
  .property-per-night {
    font-size: 10px;
  }

  .property-price {
    font-size: 14px;
  }
}

/* Prevent zoom on iOS */
@media screen and (max-width: 767px) {
  .accommodation-header h1 {
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

/* Ensure images don't overflow on very small screens */
img {
  max-width: 100%;
  height: auto;
}

/* Improve scrolling experience on mobile */
.accommodation-list {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

/* Fix for Android Chrome */
@media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .accommodation-header h1 {
    font-size: 16px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .property-card:hover {
    transform: none;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  .property-card:active {
    transform: scale(0.98);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>
