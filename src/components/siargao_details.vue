<template>
  <div class="container">
    <div class="header">
      <img :src="headerImage" alt="Siargao Island" class="header-image" />
      <div class="overlay">
        <div class="location">{{ location }}</div>
        <h1>{{ title }}</h1>
      </div>
      <div class="distance">{{ distance }}</div>
      <!-- Back Button -->
      <button class="back-btn" @click="goBack">
        <i class="fas fa-arrow-left"></i>
      </button>
    </div>

    <div class="content">
      <div class="tabs">
        <div 
          class="tab" 
          :class="{ active: activeTab === 'details' }"
          @click="setActiveTab('details')"
        >
          Details
        </div>
        <div 
          class="tab" 
          :class="{ active: activeTab === 'reviews' }"
          @click="goToReviewsPage"
        >
          Reviews
        </div>
      </div>

      <div class="tab-content">
        <!-- Details Tab Content -->
        <div v-if="activeTab === 'details'" class="details-content">
          <div class="description">
            {{ description }}
          </div>
          <div class="map-section">
            <h3>Explore Siargao</h3>
            <div class="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001692.7214812475!2d125.68288039999999!3d9.913874899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f9b2982d8c6f%3A0x7c10a1b5166f150f!2sSiargao%20Island%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style="border:0; border-radius: 21px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Siargao Island Map"
              ></iframe>
            </div>
            <div class="map-actions">
              <button class="map-action-btn" @click="openGoogleMaps">
                <i class="fas fa-external-link-alt"></i>
                Open in Google Maps
              </button>
              <button class="map-action-btn" @click="getDirections">
                <i class="fas fa-directions"></i>
                Get Directions
              </button>
            </div>
          </div>

          <!-- Plan Trip Button -->
          <div class="plan-trip-section">
            <button class="plan-trip-btn" @click="planTrip">
              Plan My Trip
            </button>
          </div>
        </div>

        <!-- Reviews Preview Tab Content -->
        <div v-if="activeTab === 'reviews'" class="reviews-preview">
          <div class="reviews-preview-header">
            <div class="rating-summary">
              <div class="stars">★★★★★</div>
              <div class="rating-text">
                <strong>{{ averageRating }}</strong> · {{ totalTravelers }} travelers
              </div>
            </div>
            <button class="view-all-reviews-btn" @click="goToReviewsPage">
              View All Reviews →
            </button>
          </div>

          <!-- Sample Reviews Preview -->
          <div class="reviews-preview-list">
            <div 
              v-for="review in previewReviews" 
              :key="review.id" 
              class="review-preview-card"
              @click="goToReviewsPage"
            >
              <div class="review-preview-header">
                <div class="review-stars">{{ getStarRating(review.rating) }}</div>
                <div class="reviewer-name">{{ review.author }}</div>
              </div>
              <p class="review-preview-text">{{ review.previewText }}</p>
            </div>
          </div>

          <!-- View All Reviews Button -->
          <div class="view-all-section">
            <button class="view-all-btn" @click="goToReviewsPage">
              View All {{ totalTravelers }} Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiargaoDetails',
  data() {
    return {
      activeTab: 'details',
      headerImage: '/images/siargao.jpg',
      location: 'Surigao del Norte',
      title: 'Siargao Island',
      distance: '114 km',
      description: 'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific. Known as the "Surfing Capital of the Philippines", Siargao is mainly responsible for introducing surfing to the country. This tear-drop shaped island offers pristine beaches, crystal-clear waters, and world-class surfing spots like Cloud 9.',
      averageRating: 4.9,
      totalTravelers: 237,
      previewReviews: [
        {
          id: 1,
          author: 'Anna M., Australia',
          rating: 5,
          previewText: 'Absolutely stunning! Siargao is a paradise for surfers and beach lovers. Cloud 9 was incredible, and the island vibes were so chill...'
        },
        {
          id: 2,
          author: 'Carlos R., Spain',
          rating: 5,
          previewText: 'One of the most beautiful islands I have ever visited. The waves are perfect for surfing and the beaches are pristine...'
        },
        {
          id: 3,
          author: 'Sarah K., USA',
          rating: 5,
          previewText: 'Siargao exceeded all my expectations. The natural beauty is breathtaking and the surfing spots are world-class...'
        }
      ]
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
    goBack() {
      this.$emit('go-back')
    },
    planTrip() {
      this.$emit('plan-trip')
    },
    goToReviewsPage() {
      this.$emit('go-to-reviews')
    },
    getStarRating(rating) {
      return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
    },
    openGoogleMaps() {
      window.open('https://www.google.com/maps/place/Siargao+Island,+Surigao+del+Norte/@9.9138749,125.6828804,10z/data=!3m1!4b1!4m6!3m5!1s0x3301f9b2982d8c6f:0x7c10a1b5166f150f!8m2!3d9.9138749!4d126.065213!16zL20vMDJ4c2Nf?entry=ttu', '_blank')
    },
    getDirections() {
      window.open('https://www.google.com/maps/dir//Siargao+Island,+Surigao+del+Norte/@9.9138749,125.6828804,10z/data=!4m6!4m5!1m0!1m3!2m2!1d126.065213!2d9.9138749?entry=ttu', '_blank')
    }
  }
}
</script>

<style scoped>
/* Import Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Mobile-first base styles */
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
  font-family: 'Poppins', sans-serif;
}

.header {
  position: relative;
  height: 30vh;
  min-height: 200px;
  max-height: 280px;
  flex-shrink: 0;
  width: 100%;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #007EA7;
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

.content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.tabs {
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
  color: #00796b;
  font-weight: 600;
  font-size: 16px; /* Consistent tab text size */
  font-family: 'Poppins', sans-serif;
}

.tab.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -11px;
  width: 100%;
  height: 2px;
  background-color: #00796b;
  border-radius: 2px;
}

.description {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-top: 15px;
  text-align: justify;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
}

.map-section {
  margin-top: 25px;
  font-family: 'Poppins', sans-serif;
}

.map-section h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.map {
  width: 100%;
  height: 189px;
  background: #e0e0e0;
  border-radius: 21px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}

.map-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  font-family: 'Poppins', sans-serif;
}

.map-action-btn {
  background: #00796b;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
}

.plan-trip-section {
  margin-top: 30px;
  padding: 20px 0;
  font-family: 'Poppins', sans-serif;
}

.plan-trip-btn {
  width: 100%;
  background-color: #00312d;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
}

.reviews-preview {
  padding: 10px 0;
  font-family: 'Poppins', sans-serif;
}

.reviews-preview-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 16px;
  font-family: 'Poppins', sans-serif;
}

.rating-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
}

.rating-summary .stars {
  color: #ffb400;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
}

.rating-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.rating-text strong {
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.view-all-reviews-btn {
  background: none;
  border: 2px solid #00796b;
  color: #00796b;
  padding: 10px 16px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
}

.reviews-preview-list {
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

.review-preview-card {
  background: #fff;
  border: 1px solid #e8ecef;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
}

.review-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-family: 'Poppins', sans-serif;
}

.review-stars {
  color: #ffb400;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
}

.reviewer-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
}

.review-preview-text {
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
}

.view-all-section {
  text-align: center;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
}

.view-all-btn {
  width: 100%;
  background: #00796b;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 15px;
  font-family: 'Poppins', sans-serif;
}

/* Responsive styles remain the same... */
/* ... (all the responsive CSS from previous implementation remains exactly the same) ... */

</style>