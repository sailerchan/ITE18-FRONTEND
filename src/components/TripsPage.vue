<template>
  <div class="container">
    <div class="trips-inner">
      <!-- Header with Back Button -->
      <header class="page-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">My Trips</h1>
      </header>

      <!-- Tab Navigation -->
      <div class="trip-tabs">
        <button
          class="tab-button"
          @click="setActiveTab('upcoming')"
          :class="{ active: activeTab === 'upcoming' }"
        >
          Upcoming
          <span class="tab-badge" v-if="upcomingTrips.length > 0">{{ upcomingTrips.length }}</span>
        </button>
        <button
          class="tab-button"
          @click="setActiveTab('past')"
          :class="{ active: activeTab === 'past' }"
        >
          Past
          <span class="tab-badge" v-if="pastTrips.length > 0">{{ pastTrips.length }}</span>
        </button>
      </div>

      <!-- Main Content -->
      <main class="main-content">
        <div v-if="activeTab === 'upcoming'" class="tab-content">
          <div v-if="upcomingTrips.length === 0" class="no-trips-message">
            <div class="empty-icon">
              <i class="fas fa-suitcase-rolling"></i>
            </div>
            <h2>No Upcoming Trips</h2>
            <p>Your upcoming trips will appear here</p>
          </div>

          <!-- Upcoming Trips List -->
          <div v-else class="trips-list">
            <div
              v-for="trip in upcomingTrips"
              :key="trip.id"
              class="trip-card"
              @click="viewTripDetails(trip)"
            >
              <div class="trip-image">
                <img :src="getTripImage(trip)" :alt="trip.destinationName" @error="handleImageError">
                <div class="trip-status" :class="trip.status.toLowerCase()">{{ trip.status }}</div>
              </div>
              <div class="trip-content">
                <div class="trip-header">
                  <h4>{{ trip.destinationName }}</h4>
                  <div class="trip-price">₱{{ trip.totalPrice || '0.00' }}</div>
                </div>

                <div class="trip-details">
                  <div class="trip-destination">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ trip.destinationName }}
                  </div>
                  <div class="trip-location" v-if="trip.property?.location">
                    <i class="fas fa-building"></i>
                    {{ trip.property.location }}
                  </div>
                  <div class="trip-dates" v-if="trip.dates">
                    <i class="fas fa-calendar-alt"></i>
                    {{ trip.dates }}
                  </div>
                  <div class="trip-nights" v-if="trip.nights">
                    <i class="fas fa-moon"></i>
                    {{ trip.nights }} night{{ trip.nights > 1 ? 's' : '' }}
                  </div>
                </div>

                <div class="trip-footer">
                  <div class="trip-actions">
                    <button class="btn-view-details" @click.stop="viewTripDetails(trip)">
                      View Details
                    </button>
                    <button class="btn-cancel" @click.stop="cancelTrip(trip.id)">
                      Cancel
                    </button>
                  </div>
                  <div class="trip-meta">
                    <span class="booking-date">
                      Booked {{ formatDate(trip.bookingDate) }}
                    </span>
                    <span class="receipt-number" v-if="trip.receiptNumber">
                      Receipt: {{ trip.receiptNumber }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'past'" class="tab-content">
          <div v-if="pastTrips.length === 0" class="no-trips-message">
            <div class="empty-icon">
              <i class="fas fa-history"></i>
            </div>
            <h2>No Past Trips</h2>
            <p>Your completed trips will appear here</p>
          </div>

          <div v-else class="trips-list">
            <div
              v-for="trip in pastTrips"
              :key="trip.id"
              class="trip-card past"
              @click="viewTripDetails(trip)"
            >
              <div class="trip-image">
                <img :src="getTripImage(trip)" :alt="trip.destinationName" @error="handleImageError">
                <div class="trip-status completed">{{ trip.status }}</div>
              </div>
              <div class="trip-content">
                <div class="trip-header">
                  <h4>{{ trip.destinationName }}</h4>
                  <div class="trip-price">₱{{ trip.totalPrice || '0.00' }}</div>
                </div>

                <div class="trip-details">
                  <div class="trip-destination">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ trip.destinationName }}
                  </div>
                  <div class="trip-dates" v-if="trip.dates">
                    <i class="fas fa-calendar-alt"></i>
                    {{ trip.dates }}
                  </div>
                </div>

                <div class="trip-footer">
                  <div class="trip-actions">
                    <button class="btn-view-details" @click.stop="viewTripDetails(trip)">
                      View Details
                    </button>
                    <button class="btn-review" @click.stop="writeReview(trip)">
                      Write Review
                    </button>
                  </div>
                  <div class="trip-meta">
                    <span class="booking-date">
                      Completed {{ formatDate(trip.bookingDate) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom Navigation Bar - SAME AS HOMEPAGE -->
      <nav class="bottom-nav">
        <div class="nav-items-container">
          <button class="nav-item" @click="$emit('go-to-page', 'homepage')">
            <i class="fas fa-home"></i>
          </button>
          <button class="nav-item active">
            <i class="fas fa-route"></i>
          </button>
          <button class="nav-item" @click="$emit('go-to-page', 'notifications')">
            <i class="fas fa-bell"></i>
          </button>
          <button class="nav-item" @click="$emit('go-to-page', 'profile')">
            <i class="fas fa-user"></i>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useTripsStore } from '../stores/trips'

export default {
  name: 'TripsPage',
  emits: [
    'go-back',
    'plan-trip',
    'go-to-page'
  ],

  setup() {
    const tripsStore = useTripsStore()
    const activeTab = ref('upcoming')

    // Get trips data from store
    const upcomingTrips = computed(() => {
      console.log('🔄 Getting upcoming trips from store:', tripsStore.getUpcomingTrips)
      return tripsStore.getUpcomingTrips
    })

    const pastTrips = computed(() => {
      return tripsStore.getPastTrips
    })

    // Load trips when component mounts
    onMounted(() => {
      console.log('🚀 TripsPage mounted')
      tripsStore.loadFromLocalStorage()
      console.log('📋 Loaded trips:', {
        upcoming: upcomingTrips.value,
        past: pastTrips.value
      })
    })

    // Helper functions
    const getTripImage = (trip) => {
      console.log('🖼️ Getting image for trip:', trip)

      // Priority 1: Check if trip has a direct image property
      if (trip.image) {
        console.log('📍 Using trip.image:', trip.image)
        return trip.image
      }

      // Priority 2: Check if property has image
      if (trip.property?.image) {
        console.log('🏨 Using trip.property.image:', trip.property.image)
        return trip.property.image
      }

      // Priority 3: Check for destinationImage
      if (trip.destinationImage) {
        console.log('🗺️ Using trip.destinationImage:', trip.destinationImage)
        return trip.destinationImage
      }

      // Priority 4: Get image based on destination ID
      if (trip.destinationId) {
        // Map destination IDs to images from App.vue
        const destinationImages = {
          1: '/images/destinations/siargao.jpg',
          2: '/images/destinations/naked-island1.jpg',
          3: '/images/destinations/guyam1.jpg',
          4: '/images/destinations/cloud91.jpg'
        }
        const image = destinationImages[trip.destinationId] || '/images/destinations/siargao.jpg'
        console.log('📋 Using destination ID image:', image)
        return image
      }

      // Priority 5: Try to get from trips store
      const storeImage = tripsStore.getDestinationImage(trip.destinationId)
      if (storeImage) {
        console.log('🏪 Using store image:', storeImage)
        return storeImage
      }

      // Fallback to Siargao Island image
      console.log('⚠️ Using fallback image')
      return '/images/destinations/siargao.jpg'
    }

    const handleImageError = (event) => {
      console.log('❌ Image failed to load:', event.target.src)
      // Set a fallback image
      event.target.src = '/images/destinations/siargao.jpg'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'recently'

      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'recently'

      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return 'today'
      if (diffDays === 1) return 'yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }

    // Action functions
    const setActiveTab = (tab) => {
      activeTab.value = tab;
    }

    const viewTripDetails = (trip) => {
      console.log('Viewing trip details:', trip)
      alert(`Trip Details:\n\nDestination: ${trip.destinationName}\nAccommodation: ${trip.property?.title || 'Not specified'}\nDates: ${trip.dates || 'Not specified'}\nStatus: ${trip.status}\nTotal: ₱${trip.totalPrice}`)
    }

    const cancelTrip = (tripId) => {
      if (confirm('Are you sure you want to cancel this trip? This action cannot be undone.')) {
        tripsStore.cancelTrip(tripId)
      }
    }

    const writeReview = (trip) => {
      console.log('Writing review for trip:', trip)
      alert(`Write a review for your stay at ${trip.destinationName}`)
    }

    return {
      activeTab,
      upcomingTrips,
      pastTrips,
      setActiveTab,
      getTripImage,
      handleImageError,
      formatDate,
      viewTripDetails,
      cancelTrip,
      writeReview
    }
  }
}
</script>

<style scoped>
/* CSS Variables - SAME AS HOMEPAGE */
:root {
  --muted: #6c757d;
  --dark: #1a1a1a;
  --teal-1: #1f4f5a;
  --teal-2: #1f7a8c;
  --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Exact same container as homepage */
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

/* Same card styling as homepage */
.trips-inner {
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
  overflow-y: auto;
  padding-bottom: 90px; /* Added padding for fixed nav - SAME AS HOMEPAGE */
}

/* Header Styles */
.page-header {
  display: flex;
  align-items: center;
  padding: 36px 24px 20px;
  background: white;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--dark);
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(0,0,0,0.03);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--dark);
  margin: 0;
  margin-left: 15px;
  flex: 1;
}

/* Tab Navigation Styles */
.trip-tabs {
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  margin: 0 24px 24px;
  position: relative;
}

.tab-button {
  background: none;
  border: none;
  padding: 16px 0;
  margin-right: 32px;
  font-size: 16px;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-button:hover {
  color: var(--dark);
}

.tab-button.active {
  color: var(--teal-1);
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--teal-1);
  border-radius: 3px 3px 0 0;
}

.tab-badge {
  background: #dc3545;
  color: white;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.tab-content {
  flex: 1;
}

.no-trips-message {
  text-align: center;
  max-width: 280px;
  padding: 60px 20px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 48px;
  color: #e1e5e9;
  margin-bottom: 20px;
}

.no-trips-message h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--dark);
}

.no-trips-message p {
  font-size: 15px;
  margin: 0 0 24px;
  line-height: 1.5;
  color: var(--muted);
}

/* Trips List */
.trips-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
}

/* Trip Card */
.trip-card {
  background: #ffffff;
  border: 1px solid #e8ecef;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.trip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.trip-card.past {
  opacity: 0.9;
}

.trip-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.trip-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f0f0f0; /* Fallback background */
}

.trip-status {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--teal-1);
  border: 1px solid rgba(12, 52, 55, 0.2);
}

.trip-status.upcoming {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #c8e6c9;
}

.trip-status.completed {
  background: #f5f5f5;
  color: #666;
  border-color: #e0e0e0;
}

.trip-content {
  padding: 16px;
}

.trip-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.trip-header h4 {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
  flex: 1;
}

.trip-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--teal-1);
  white-space: nowrap;
  margin-left: 12px;
}

.trip-details {
  margin-bottom: 16px;
}

.trip-destination,
.trip-location,
.trip-dates,
.trip-nights {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
}

.trip-destination i {
  color: var(--teal-1);
}

.trip-location i {
  color: #666;
}

.trip-dates i {
  color: #1976d2;
}

.trip-nights i {
  color: #7b1fa2;
}

.trip-footer {
  padding-top: 16px;
  border-top: 1px solid #e8ecef;
}

.trip-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.btn-view-details {
  flex: 1;
  background: var(--teal-1);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-view-details:hover {
  background: var(--teal-2);
}

.btn-cancel {
  flex: 1;
  background: white;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #dc3545;
  color: white;
}

.btn-review {
  flex: 1;
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-review:hover {
  background: #1565c0;
}

.trip-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
}

.booking-date {
  display: flex;
  align-items: center;
  gap: 4px;
}

.receipt-number {
  font-family: monospace;
  font-size: 11px;
}

/* Bottom nav - EXACT SAME AS HOMEPAGE */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #e9ecef;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    z-index: 1000;
}
.nav-items-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 420px;
}
.nav-item {
    border: 0;
    background: transparent;
    font-size: 20px;
    color: #adb5bd;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
  justify-content: center;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
}
.nav-item.active {
  color: var(--teal-1);
  background: rgba(56,97,102,0.1);
}
.nav-item:hover {
  background: rgba(0,0,0,0.03);
}

/* ================= RESPONSIVE BREAKPOINTS - SAME AS HOMEPAGE ================= */

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .page-header {
    padding: 24px 16px 16px;
  }

  .trip-tabs {
    margin: 0 16px 20px;
  }

  .tab-button {
    padding: 14px 0;
    margin-right: 24px;
    font-size: 15px;
  }

  .main-content {
    padding: 0 16px;
  }

  .no-trips-message {
    max-width: 240px;
    padding: 40px 16px;
  }

  .no-trips-message h2 {
    font-size: 18px;
  }

  .no-trips-message p {
    font-size: 14px;
  }

  .trip-image {
    height: 160px;
  }

  .trip-header h4 {
    font-size: 16px;
  }

  .trip-price {
    font-size: 16px;
  }

  .trip-actions {
    flex-direction: column;
  }

  .trips-inner {
    padding-bottom: 80px;
  }

  .bottom-nav {
    padding: 12px 16px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    background: #f8f9fa;
    padding: 20px;
    max-width: 768px;
    margin: 0 auto;
  }

  .trips-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 100px;
  }

  .page-header {
    padding: 40px 32px 28px;
  }

  .trip-tabs {
    margin: 0 32px 32px;
  }

  .main-content {
    padding: 0 32px;
  }

  .no-trips-message {
    max-width: 320px;
  }

  .no-trips-message h2 {
    font-size: 22px;
  }

  .no-trips-message p {
    font-size: 16px;
  }

  .trip-card {
    display: grid;
    grid-template-columns: 300px 1fr;
  }

  .trip-image {
    height: auto;
  }

  .trip-content {
    display: flex;
    flex-direction: column;
  }

  .bottom-nav {
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    background: #f8f9fa;
    padding: 30px;
    max-width: 500px;
    margin: 0 auto;
  }

  .trips-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 105px;
  }

  .page-header {
    padding: 44px 36px 32px;
  }

  .trip-tabs {
    margin: 0 36px 36px;
  }

  .main-content {
    padding: 0 36px;
  }

  .bottom-nav {
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

/* Desktop (1367px and up) */
@media (min-width: 1367px) {
  .container {
    background: #f8f9fa;
    padding: 40px;
    max-width: 500px;
    margin: 0 auto;
  }

  .trips-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 110px;
  }

  .page-header {
    padding: 48px 40px 36px;
  }

  .trip-tabs {
    margin: 0 40px 40px;
  }

  .main-content {
    padding: 0 40px;
  }

  .bottom-nav {
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .page-header {
    padding: 20px 16px 12px;
  }

  .trip-tabs {
    margin: 0 16px 20px;
  }

  .tab-button {
    padding: 12px 0;
  }

  .main-content {
    padding: 0 16px;
  }

  .no-trips-message {
    padding: 40px 16px;
    max-width: 240px;
  }

  .no-trips-message h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .no-trips-message p {
    font-size: 14px;
  }

  .trip-image {
    height: 150px;
  }

  .trips-inner {
    padding-bottom: 70px;
  }

  .bottom-nav {
    padding: 10px 16px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .page-header {
    padding: 16px 12px 8px;
  }

  .trip-tabs {
    margin: 0 12px 16px;
  }

  .tab-button {
    padding: 10px 0;
    font-size: 14px;
  }

  .main-content {
    padding: 0 12px;
  }

  .no-trips-message {
    padding: 30px 12px;
    max-width: 200px;
  }

  .no-trips-message h2 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .no-trips-message p {
    font-size: 13px;
  }

  .trip-image {
    height: 120px;
  }

  .trip-content {
    padding: 12px;
  }

  .trip-header h4 {
    font-size: 16px;
  }

  .trip-price {
    font-size: 16px;
  }

  .trip-destination,
  .trip-location,
  .trip-dates,
  .trip-nights {
    font-size: 13px;
  }

  .trips-inner {
    padding-bottom: 60px;
  }

  .bottom-nav {
    padding: 8px 12px;
  }
}

/* Fix for iOS zoom on input focus */
@media screen and (max-width: 767px) {
  input, textarea {
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

  .trips-inner {
    border-radius: 24px 24px 0 0;
  }

  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }

  @media (min-width: 768px) {
    .trips-inner {
      border-radius: 24px;
    }
  }
}

/* Improve scrolling experience on mobile */
.scroll-wrapper {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

/* Fix for Android Chrome */
@media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  input, textarea {
    font-size: 16px !important;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .trip-card:hover {
    transform: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .trip-card:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
