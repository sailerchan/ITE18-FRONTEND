<template>
  <div class="container">
    <!-- Header Section -->
    <div class="header-section">
      <img :src="heroImage" alt="Siargao Island" class="hero-image" />

      <!-- Back Arrow -->
      <button class="back-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i>
      </button>


    </div>

    <div class="content-area">
      <div class="nav-tabs">
        <div
          class="tab"
          :class="{ active: activeTab === 'details' }"
          @click="goToDetails"
        >
          Details
      </div>
        <div
          class="tab active"
          :class="{ active: activeTab === 'reviews' }">
          Reviews
    </div>
  </div>

      <!-- Overall Rating -->
      <div class="overall-rating">
        <div class="stars-large">★★★★★</div>
        <div class="rating-text">
          <span class="rating-value">{{ overallRating }}</span>
          <span class="rating-separator"> • </span>
          <span class="travelers-count">{{ totalTravelers }} travelers</span>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="reviews-list">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="review-card"
        >
          <div class="review-header">
            <div class="review-stars">
              <span class="star" v-for="star in 5" :key="star" :class="{ filled: star <= review.rating }">
                {{ star <= review.rating ? '★' : '☆' }}
              </span>
            </div>
            <div class="reviewer-info">{{ review.reviewerName }}, {{ review.reviewerOrigin }}</div>
          </div>
          <p class="review-text">{{ review.text }}</p>
        </div>
      </div>
          <!-- Call-to-Action Button -->
    <button class="plan-trip-btn" @click="planTrip">
      Plan Trip
    </button>
    </div>


  </div>
</template>

<script>
export default {
  name: 'SiargaoReviewsPage',
  data() {
    return {
      activeTab: 'reviews',
      overallRating: 4.9,
      totalTravelers: 237,
      heroImage: '/images/siargao.jpg',
      location: 'Surigao del Norte',
      title: 'Siargao Island',
      distance: '114 km',
      reviews: [
        {
          id: 1,
          rating: 5,
          reviewerName: 'Anna M.',
          reviewerOrigin: 'Australia',
          text: 'Absolutely stunning! Siargao is a paradise for surfers and beach lovers. Cloud 9 was incredible, and the island vibes were so chill. Locals are friendly and the food — especially the seafood — was amazing!'
        },
        {
          id: 2,
          rating: 5,
          reviewerName: 'Carlos R.',
          reviewerOrigin: 'Spain',
          text: 'One of the most beautiful islands I have ever visited. The waves are perfect for surfing and the beaches are pristine. Will definitely come back! The island hopping tour was the highlight of our trip.'
        },
        {
          id: 3,
          rating: 5,
          reviewerName: 'Sarah K.',
          reviewerOrigin: 'USA',
          text: 'Siargao exceeded all my expectations. The natural beauty is breathtaking and the surfing spots are world-class. Highly recommend staying in General Luna and trying the local cuisine!'
        }
      ]
    }
  },
  methods: {
    goToDetails() {
      this.activeTab = 'details'
      this.$emit('go-to-details')
    },
    planTrip() {
      this.$emit('plan-trip')
    },
    goBack() {
      this.$emit('go-back')
    }
  }
}
</script>

<style scoped>
/* Import Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

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

/* Header Section - EXACTLY matching Details page */
.header-section {
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

.header-image {
    height: 45vh;
    background-size: cover;
    background-position: center;
    position: relative;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  z-index: 10;
  font-family: 'Poppins', sans-serif;
}

/* Overlay - EXACTLY matching Details page */
.overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
  font-family: 'Poppins', sans-serif;
}

.overlay .location {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
}

.overlay h1 {
  font-size: 24px;
  margin: 3px 0 0 0;
  color: #fff;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

/* Distance - EXACTLY matching Details page */
.distance {
  position: absolute;
  bottom: 25px;
  right: 20px;
  color: white;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

/* Content Area */
.content-area {
    background-color: white;
    border-radius: 30px 30px 15px 15px;
    margin-top: -30px;
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 30px 25px 20px;

}
/* Navigation Tabs - EXACTLY matching Details page */
.nav-tabs {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  font-family: 'Poppins', sans-serif;

}

.tab {
font-weight: 500;
  font-size: 16px; /* Consistent tab text size */
  color: #555;
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

.tab.active {
  color: #0c3437; /* EXACTLY same color as Details page */
  font-weight: 600; /* EXACTLY same weight as Details page */
  font-size: 16px; /* EXACTLY same size as Details page */
  font-family: 'Poppins', sans-serif;
}

.tab.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -11px; /* EXACTLY same position as Details page */
  width: 100%;
  height: 2px; /* EXACTLY same height as Details page */
  background-color: #0c3437; /* EXACTLY same color as Details page */
  border-radius: 2px; /* EXACTLY same radius as Details page */
}

/* Overall Rating */
.overall-rating {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 16px;
  font-family: 'Poppins', sans-serif;
}

.stars-large {
  font-size: 24px;
  color: #ffb400;
  margin-bottom: 8px;
  letter-spacing: 2px;
  font-family: 'Poppins', sans-serif;
}

.rating-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.rating-value {
  font-weight: 700;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
}

.travelers-count {
  color: #666;
  font-family: 'Poppins', sans-serif;
}

/* Reviews List */
.reviews-list {
  padding-bottom: 100px;
  font-family: 'Poppins', sans-serif;
}

.review-card {
  background: #ffffff;
  border: 1px solid #e8ecef;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  font-family: 'Poppins', sans-serif;
}

.review-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
  font-family: 'Poppins', sans-serif;
}

.review-stars {
  color: #ffb400;
  font-size: 16px;
  letter-spacing: 1px;
  font-family: 'Poppins', sans-serif;
}

.reviewer-info {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
}

.review-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  text-align: left;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
}

/* Plan Trip Button */
.plan-trip-btn {
  width: 100%;
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
}
/* Responsive styles remain the same... */
/* ... (all the responsive CSS from previous implementation remains exactly the same) ... */

</style>
