<template>
  <div class="container">
    <div class="header">
      <img :src="destination.headerImage" :alt="destination.name" class="header-image" />
      <div class="overlay">
         <h1>{{ destination.name }}</h1>
        <div class="location"><i class="fas fa-map-marker-alt"></i>  {{ destination.location }}</div>

      </div>
     <!-- <div class="distance">{{ destination.distance }}</div>-->

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
          @click="setActiveTab('details')">
          Details
        </div>
        <div
          class="tab"
          :class="{ active: activeTab === 'reviews' }"
          @click="setActiveTab('reviews')">
          Reviews
        </div>
      </div>

      <div class="tab-content">
        <!-- Details Tab Content -->
        <div v-if="activeTab === 'details'" class="details-content">
          <div class="description">
            {{ destination.description }}
          </div>
          <div class="map-section">
            <h3>Explore {{ destination.name }}</h3>
            <div class="map">
              <iframe
                :src="destination.mapEmbedUrl"
                width="100%"
                height="100%"
                style="border:0; border-radius: 6px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :title="`${destination.name} Map`"
              ></iframe>
            </div>
            <div class="map-actions">

              <button class="map-action-btn" @click="getDirections">
                <i class="fas fa-directions"></i>
                Get Directions
              </button>
            </div>
          </div>
          <!-- Plan Trip Button -->
          <div class="plan-trip-section">
            <button class="plan-trip-btn" @click="planTrip">
              Start Planning
            </button>
          </div>
        </div>

        <!-- Reviews Tab Content -->
        <div v-if="activeTab === 'reviews'" class="reviews-content">
          <div class="reviews-header">
            <div class="rating-summary">
              <div class="stars">{{ getStarRating(destination.averageRating) }}</div>
              <div class="rating-text">
                <strong>{{ formatRating(destination.averageRating) }}</strong> · {{ destination.totalTravelers }} travelers
              </div>
            </div>
            <div class="rating-breakdown">
              <div class="breakdown-item" v-for="rating in ratingBreakdown" :key="rating.stars">
                <div class="breakdown-stars">{{ rating.stars }}</div>
                <div class="breakdown-bar">
                  <div class="breakdown-fill" :style="{ width: `${rating.percentage}%` }"></div>
                </div>
                <div class="breakdown-percentage">{{ rating.percentage }}%</div>
              </div>
            </div>
          </div>

          <!-- Filter Reviews -->
          <div class="reviews-filter">
            <select v-model="selectedRating" class="filter-select">
              <option value="all">All Ratings</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
          </div>

          <!-- Full Reviews List -->
          <div class="reviews-list">
            <div
              v-for="review in filteredReviews"
              :key="review.id"
              class="review-card"
            >
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="reviewer-avatar">
                    {{ getInitials(review.author) }}
                  </div>
                  <div>
                    <div class="reviewer-name">{{ review.author }}</div>
                    <div class="review-date">{{ formatDate(review.date) }}</div>
                  </div>
                </div>
                <div class="review-stars">{{ getStarRating(review.rating) }}</div>
              </div>
              <p class="review-text">{{ review.text }}</p>
              <div class="review-helpful">
                <button class="helpful-btn" @click="toggleHelpful(review.id)">
                  <i class="fas fa-thumbs-up"></i> Helpful ({{ review.helpfulCount || 0 }})
                </button>
              </div>
            </div>
          </div>

          <!-- Load More Button -->
          <div v-if="hasMoreReviews" class="load-more-section">
            <button class="load-more-btn" @click="loadMoreReviews">
              Load More Reviews
            </button>
          </div>

<!-- Plan Trip Button -->
          <div class="plan-trip-section">
            <button class="plan-trip-btn" @click="planTrip">
              Start Planning
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DestinationDetails',
  props: {
    destination: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        name: '',
        location: '',
        headerImage: '',
        distance: '',
        description: '',
        mapEmbedUrl: '',
        googleMapsUrl: '',
        directionsUrl: '',
        averageRating: 0,
        totalTravelers: 0,
        reviews: []
      })
    },
    initialTab: {
      type: String,
      default: 'details',
      validator: (value) => ['details', 'reviews'].includes(value)
    }
  },
  data() {
    return {
      activeTab: this.initialTab,
      selectedRating: 'all',
      visibleReviews: 5
    };
  },
  computed: {
    filteredReviews() {
      // Check if reviews exist and is an array
      if (!this.destination.reviews || !Array.isArray(this.destination.reviews)) {
        return [];
      }

      let reviews = [...this.destination.reviews];

      if (this.selectedRating !== 'all') {
        reviews = reviews.filter(review => review.rating === parseInt(this.selectedRating));
      }

      return reviews.slice(0, this.visibleReviews);
    },
    hasMoreReviews() {
      if (!this.destination.reviews || !Array.isArray(this.destination.reviews)) {
        return false;
      }

      let reviews = this.destination.reviews;

      if (this.selectedRating !== 'all') {
        reviews = reviews.filter(review => review.rating === parseInt(this.selectedRating));
      }

      return this.visibleReviews < reviews.length;
    },
    ratingBreakdown() {
      // Check if reviews exist
      if (!this.destination.reviews || !Array.isArray(this.destination.reviews)) {
        return [];
      }

      const total = this.destination.reviews.length;
      const breakdown = {
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
      };

      this.destination.reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
          breakdown[review.rating]++;
        }
      });

      return [5, 4, 3, 2, 1].map(stars => ({
        stars: '★'.repeat(stars) + '☆'.repeat(5 - stars),
        count: breakdown[stars],
        percentage: total > 0 ? Math.round((breakdown[stars] / total) * 100) : 0
      }));
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    goBack() {
      this.$emit('go-back');
    },
    planTrip() {
      this.$emit('plan-trip', this.destination.id);
    },
    getStarRating(rating) {
      const numRating = parseFloat(rating) || 0;
      const fullStars = Math.floor(numRating);
      const halfStar = numRating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

      let stars = '★'.repeat(fullStars);
      if (halfStar) stars += '½';
      stars += '☆'.repeat(emptyStars);
      return stars;
    },
    formatRating(rating) {
      const numRating = parseFloat(rating) || 0;
      return numRating.toFixed(1);
    },
    openGoogleMaps() {
      if (this.destination.googleMapsUrl) {
        window.open(this.destination.googleMapsUrl, '_blank');
      } else {
        alert('Google Maps URL not available');
      }
    },
    getDirections() {
      if (this.destination.directionsUrl) {
        window.open(this.destination.directionsUrl, '_blank');
      } else {
        alert('Directions URL not available');
      }
    },
    writeReview() {
      this.$emit('write-review', this.destination.id);
    },
    getInitials(name) {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    formatDate(dateString) {
      if (!dateString) return 'Date not available';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch {
        // Removed the unused 'e' parameter
        return 'Invalid date';
      }
    },
    toggleHelpful(reviewId) {
      this.$emit('toggle-helpful', reviewId);
    },
    loadMoreReviews() {
      this.visibleReviews += 5;
    }
  },
  mounted() {
    console.log('DestinationDetails mounted with destination:', this.destination);
    console.log('Destination reviews:', this.destination.reviews);
  }
};
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
}

.header {
  position: relative;
  height: 55vh; /* Changed from 45vh to 55vh for longer header */
  min-height: 350px; /* Increased from 300px to 350px */
  max-height: 600px; /* Increased from 500px to 600px */
  overflow: hidden;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.11);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
  bottom: 45px; /* Increased from 20px to 25px */
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
  bottom: 45px;
}

.overlay h1 {
  font-size: 28px; /* Increased from 24px to 28px */
  margin: 5px 0 0 0; /* Increased margin-top from 3px to 5px */
  color: #fff;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.distance {
  position: absolute;
  bottom: 45px; /* Increased from 25px to 30px */
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
  background-color: white;
  border-radius: 30px 30px 0 0;
  margin-top: -35px; /* Increased from 20px to 25px */
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px 25px 20px;
}

.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  font-family: 'Poppins', sans-serif;
}

.tab {
  font-weight: 500;
  font-size: 16px;
  color: #555;
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

.tab.active {
  color: #0c3437;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.tab.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -11px;
  width: 100%;
  height: 2px;
  background-color: #0c3437;
  border-radius: 2px;
}

.description {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-top: 15px;
  text-align: left;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  padding:10px;
}

.map-section {
  margin-top: 10px;
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
  height: 250px;
  overflow: hidden;
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
  background: none;
  color: #0c3437;
  border: 0px solid #0c34371e;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 8px;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
  flex: 1;
  min-width: 140px;
}

.plan-trip-section {
  margin-top: 10px;
  padding: 20px 0;
  font-family: 'Poppins', sans-serif;
}

.plan-trip-btn {
  width: 100%;
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 28px;
  padding: 14px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
}

.plan-trip-btn:hover {
  background-color: #0a2a2d;
}

/* Reviews Content Styles */
.reviews-content {
  padding: 10px 0;
  font-family: 'Poppins', sans-serif;
}

.reviews-header {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 16px;
  font-family: 'Poppins', sans-serif;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.rating-summary .stars {
  color: #ffb400;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
}

.rating-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.rating-text strong {
  font-size: 28px;
  font-weight: 700;
  color: #0c3437;
  font-family: 'Poppins', sans-serif;
}

.rating-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.breakdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.breakdown-stars {
  color: #ffb400;
  font-size: 14px;
  min-width: 60px;
}

.breakdown-bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.breakdown-fill {
  height: 100%;
  background: #0c3437;
  border-radius: 4px;
}

.breakdown-percentage {
  min-width: 40px;
  font-size: 14px;
  color: #666;
  text-align: right;
}

.reviews-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-select {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  background: white;
  min-width: 150px;
}

.write-review-btn {
  padding: 10px 16px;
  background: #0c3437;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  background: #fff;
  border: 1px solid #e8ecef;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-family: 'Poppins', sans-serif;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.reviewer-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.reviewer-avatar {
  width: 40px;
  height: 40px;
  background: #0c3437;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.reviewer-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.review-date {
  font-size: 12px;
  color: #888;
}

.review-stars {
  color: #ffb400;
  font-size: 16px;
}

.review-text {
  margin: 0;
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  font-weight: 400;
}

.review-helpful {
  margin-top: 12px;
}

.helpful-btn {
  background: none;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
}

.helpful-btn:hover {
  border-color: #0c3437;
  color: #0c3437;
}

.load-more-section {
  text-align: center;
  margin-top: 30px;
}

.load-more-btn {
  padding: 12px 32px;
  background: white;
  color: #0c3437;
  border: 2px solid #0c3437;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
}

.load-more-btn:hover {
  background: #0c3437;
  color: white;
}

/* Responsive Styles */
@media (max-width: 480px) {
  .header {
    height: 50vh; /* Changed from 40vh to 50vh for mobile */
  }

  .overlay h1 {
    font-size: 24px; /* Increased from 20px to 24px for mobile */
  }

  .distance {
    font-size: 12px;
    padding: 4px 8px;
  }

  .content {
    padding: 25px 20px 15px;
  }

  .map {
    height: 300px;
  }

  .rating-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .rating-text strong {
    font-size: 24px;
  }

  .reviews-filter {
    flex-direction: column;
  }

  .filter-select,
  .write-review-btn {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
    padding: 20px;
    background: #f8f9fa;
  }

  .header {
    border-radius: 24px;
    overflow: hidden;
    height: 60vh; /* Even taller for tablets */
  }

  .content {
    border-radius: 24px;
    padding: 30px;
  }

  .map {
    height: 300px;
  }

  .reviews-header {
    display: flex;
    gap: 40px;
  }

  .rating-summary {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    min-width: 120px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 800px;
  }

  .header {
    height: 65vh; /* Tallest for desktop */
  }
}

/* Additional styles for even longer header if desired */
@media (max-height: 700px) {
  .header {
    height: 60vh; /* Even taller on shorter screens */
    min-height: 400px;
  }
}

/* Landscape mode */
@media (orientation: landscape) {
  .header {
    height: 75vh; /* Very tall in landscape mode */
    min-height: 400px;
  }

  .content {
    margin-top: 30px;
  }
}
</style>
