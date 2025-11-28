<template>
  <div class="container">
    <div class="accommodation-inner">
      <!-- Header -->
      <div class="accommodation-header">
        <div class="accommodation-back-arrow" @click="$emit('go-to-page', 'datepicker')">←</div>
        <h1>Select accommodation</h1>
      </div>

      <!-- Section Title -->
      <h2 class="accommodation-section-title">Popular Places To Stay</h2>
      <h2 class="accommodation-section-subtitle">In {{ selectedDestinationName }}</h2>

      <!-- Accommodation List -->
      <div class="accommodation-list">
        <!-- Property Card 1 -->
        <div class="property-card" @click="$emit('view-booking', 'paradiso')">
          <img src="/images/paradiso.avif" alt="Paradiso Hotel Bunks" class="property-image">
          <div class="property-type">HOSTEL</div>
          <div class="details-overlay">
            <div class="property-info">
              <h3>Paradiso Hotel Bunks</h3>
              <div class="property-location">
                <span class="property-location-icon">📍</span>General Luna, Philippines
              </div>
              <div class="property-rating">
                <div class="property-stars">★★★★☆</div>
                <div class="property-rating-value">4.5 (86 reviews)</div>
              </div>
            </div>
            <div class="price-tag">
              <div class="property-price">₱700.00</div>
              <div class="property-per-night">/night</div>
            </div>
          </div>
        </div>

        <!-- Property Card 2 -->
        <div class="property-card" @click="$emit('view-booking', 'copacabana')">
          <img src="/images/copacabana.jpg" alt="Copacabana Siargao" class="property-image">
          <div class="property-type">HOTEL</div>
          <div class="details-overlay">
            <div class="property-info">
              <h3>Copacabana Siargao</h3>
              <div class="property-location">
                <span class="property-location-icon">📍</span>General Luna, Philippines
              </div>
              <div class="property-rating">
                <div class="property-stars">★★★★☆</div>
                <div class="property-rating-value">4.7 (96 reviews)</div>
              </div>
            </div>
            <div class="price-tag">
              <div class="property-price">₱2,950.00</div>
              <div class="property-per-night">/night</div>
            </div>
          </div>
        </div>

        <!-- Property Card 3 -->
        <div class="property-card" @click="$emit('view-booking', 'retreat')">
          <img src="/images/paradiso.1.avif" alt="Paradiso Island Retreat" class="property-image">
          <div class="property-type">RETREAT</div>
          <div class="details-overlay">
            <div class="property-info">
              <h3>Paradiso Island Retreat</h3>
              <div class="property-location">
                <span class="property-location-icon">📍</span>General Luna, Philippines
              </div>
              <div class="property-rating">
                <div class="property-stars">★★★★★</div>
                <div class="property-rating-value">4.8 (142 reviews)</div>
              </div>
            </div>
            <div class="price-tag">
              <div class="property-price">₱4,200.00</div>
              <div class="property-per-night">/night</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accommodation',
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
  font-size: 24px;
  cursor: pointer;
  color: #333;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.accommodation-back-arrow:hover {
  background-color: #f5f5f5;
}

.accommodation-header h1 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 0;
  padding: 0 40px;
}

/* Section Titles - maintaining original design */
.accommodation-section-title {
  padding: 0 0 4px 0;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  text-align: center;
}

.accommodation-section-subtitle {
  padding: 0 0 16px 0;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: -6px;
  margin-bottom: 0;
  text-align: center;
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
  height: 230px;
  border-radius: 20px;
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
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.property-info h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #000;
  margin: 0 0 4px 0;
}

.property-location {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #333;
  font-weight: 500;
  margin-bottom: 6px;
}

.property-location-icon {
  margin-right: 4px;
  font-size: 14px;
}

.property-rating {
  display: flex;
  align-items: center;
  margin-top: 6px;
}

.property-stars {
  color: #FFC107;
  margin-right: 4px;
  font-size: 13px;
}

.property-rating-value {
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
}

.price-tag {
  text-align: right;
}

.property-price {
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.property-per-night {
  font-size: 12px;
  color: #555;
  margin: 0;
}

.property-type {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #4a5568;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .accommodation-inner {
    padding: 32px 20px;
  }

  .accommodation-header h1 {
    font-size: 16px;
    padding: 0 36px;
  }

  .accommodation-back-arrow {
    font-size: 20px;
    width: 28px;
    height: 28px;
  }

  .accommodation-section-title,
  .accommodation-section-subtitle {
    font-size: 20px;
  }

  .property-card {
    height: 200px;
  }

  .details-overlay {
    padding: 12px;
  }

  .property-info h3 {
    font-size: 15px;
  }

  .property-price {
    font-size: 16px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .accommodation-inner {
    padding: 36px 24px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .accommodation-inner {
    padding: 36px 28px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
    background: #f8f9fa;
  }

  .accommodation-inner {
    max-width: 768px;
    margin: -50px auto 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .accommodation-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .property-card {
    height: 250px;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
    background: #f8f9fa;
  }

  .accommodation-inner {
    max-width: 800px;
    margin: -60px auto 0 auto;
    padding: 44px 36px;
  }

  .accommodation-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .property-card {
    height: 280px;
  }
}

/* Desktop (1367px and up) */
@media (min-width: 1367px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    background: #f8f9fa;
  }

  .accommodation-inner {
    max-width: 900px;
    margin: -60px auto 0 auto;
    padding: 48px 40px;
  }

  .accommodation-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .property-card {
    height: 300px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .accommodation-inner {
    padding: 24px 20px;
  }

  .accommodation-header {
    padding: 0 0 16px 0;
    margin-bottom: 16px;
  }

  .accommodation-section-title {
    margin-bottom: 4px;
  }

  .accommodation-section-subtitle {
    margin-bottom: 20px;
  }

  .property-card {
    height: 180px;
  }

  .details-overlay {
    padding: 10px;
    bottom: 8px;
    left: 8px;
    right: 8px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .accommodation-inner {
    padding: 20px 16px;
  }

  .accommodation-header {
    padding: 0 0 12px 0;
    margin-bottom: 12px;
  }

  .accommodation-section-title {
    margin-bottom: 2px;
  }

  .accommodation-section-subtitle {
    margin-bottom: 16px;
  }

  .property-card {
    height: 160px;
  }

  .details-overlay {
    padding: 8px;
    bottom: 6px;
    left: 6px;
    right: 6px;
  }

  .property-info h3 {
    font-size: 14px;
  }

  .property-price {
    font-size: 15px;
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
</style>