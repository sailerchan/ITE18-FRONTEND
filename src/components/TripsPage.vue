<template>
  <div class="container">
    <div class="trips-inner">
      <!-- Header with Back Button -->
      <header class="page-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Trips</h1>
      </header>

      <!-- Tab Navigation -->
      <div class="trip-tabs">
        <button
          class="tab-button"
          @click="setActiveTab('upcoming')"
          :class="{ active: activeTab === 'upcoming' }"
        >
          Upcoming
        </button>
        <button
          class="tab-button"
          @click="setActiveTab('past')"
          :class="{ active: activeTab === 'past' }"
        >
          Past
        </button>
      </div>

      <!-- Main Content -->
      <main class="main-content">
        <!-- UPCOMING -->
        <div v-if="activeTab === 'upcoming'" class="tab-content">
          <div v-if="upcomingTrips.length === 0" class="no-trips-message">
            <div class="empty-icon">
              <i class="fas fa-suitcase-rolling"></i>
            </div>
            <h2>No Upcoming Trips</h2>
            <p>Your upcoming trips will appear here</p>
          </div>

          <div v-else class="trips-list">
            <div
              v-for="trip in upcomingTrips"
              :key="trip.id"
              class="trip-row"
            >
              <!-- left: destination thumbnail (instead of umbrella icon) -->
              <div class="trip-thumb">
                <img
                  :src="getTripImage(trip)"
                  :alt="trip.destinationName"
                  @error="handleImageError"
                >
              </div>

              <!-- center: text -->
              <div class="trip-info">
                <div class="trip-title">{{ trip.destinationName }}</div>
                <div class="trip-dates" v-if="trip.dates">
                  {{ trip.dates }}
                </div>
                <button
                  class="view-details-link"
                  @click.stop="viewTripDetails(trip)"
                >
                  View Details
                </button>
              </div>

              <!-- right: checkbox placeholder -->
              <div class="trip-checkbox">
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>

        <!-- PAST -->
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
              class="trip-row"
            >
              <div class="trip-thumb">
                <img
                  :src="getTripImage(trip)"
                  :alt="trip.destinationName"
                  @error="handleImageError"
                >
              </div>

              <div class="trip-info">
                <div class="trip-title">{{ trip.destinationName }}</div>
                <div class="trip-dates" v-if="trip.dates">
                  {{ trip.dates }}
                </div>
                <button
                  class="view-details-link"
                  @click.stop="viewTripDetails(trip)"
                >
                  View Details
                </button>
              </div>

              <div class="trip-checkbox">
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom Navigation Bar -->
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
    'go-to-page',
    'open-details'
  ],

  setup (props, { emit }) {
    const tripsStore = useTripsStore()
    const activeTab = ref('upcoming')

    const upcomingTrips = computed(() => tripsStore.getUpcomingTrips)
    const pastTrips = computed(() => tripsStore.getPastTrips)

    onMounted(() => {
      tripsStore.loadFromLocalStorage()
    })

    const getTripImage = (trip) => {
      if (trip.image) return trip.image
      if (trip.property?.image) return trip.property.image
      if (trip.destinationImage) return trip.destinationImage

      if (trip.destinationId) {
        const destinationImages = {
          1: '/images/destinations/siargao.jpg',
          2: '/images/destinations/naked-island1.jpg',
          3: '/images/destinations/guyam1.jpg',
          4: '/images/destinations/cloud91.jpg'
        }
        return destinationImages[trip.destinationId] || '/images/destinations/siargao.jpg'
      }

      const storeImage = tripsStore.getDestinationImage(trip.destinationId)
      if (storeImage) return storeImage

      return '/images/destinations/siargao.jpg'
    }

    const handleImageError = (event) => {
      event.target.src = '/images/destinations/siargao.jpg'
    }

    const setActiveTab = (tab) => {
      activeTab.value = tab
    }

    const viewTripDetails = (trip) => {  // ← Function name
  emit('open-details', trip)
}

    const cancelTrip = (tripId) => {
      if (confirm('Are you sure you want to cancel this trip? This action cannot be undone.')) {
        tripsStore.cancelTrip(tripId)
      }
    }

    const writeReview = (trip) => {
      alert(`Write a review for your stay at ${trip.destinationName}`)
    }

    return {
      activeTab,
      upcomingTrips,
      pastTrips,
      setActiveTab,
      getTripImage,
      handleImageError,
      viewTripDetails,
      cancelTrip,
      writeReview
    }
  }
}
</script>

<style scoped>
:root {
  --muted: #6c757d;
  --dark: #111827;
  --teal-1: #0c3437;
  --teal-2: #1f7a8c;
  --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* ===== MAIN CONTAINER ===== */
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
  padding-bottom: 90px;
}

/* ===== HEADER ===== */
.page-header {
  display: flex;
  align-items: center;
  padding: 24px 20px 12px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--dark);
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
  color: var(--dark);
  margin: 0;
  margin-left: 8px;
}

/* ===== TABS ===== */
.trip-tabs {
  display: flex;
  align-items: center;
  margin: 0 50px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  padding-top: 20px;
  flex: 1;
}

.tab-button {
  background: none;
  border: none;
  padding: 14px 0;
  margin-right: 32px;
  font-weight: 500;
  color: #d1d5db;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.tab-button.active {
  color: var(--teal-1);
}

.tab-button.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background-color: var(--teal-1);
}

/* ===== MAIN CONTENT ===== */
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
  padding: 40px 20px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 40px;
  color: #e1e5e9;
  margin-bottom: 16px;
}

.no-trips-message h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--dark);
}

.no-trips-message p {
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  color: var(--muted);
}

/* ===== TRIP LIST ROWS ===== */
.trips-list {
  display: flex;
  flex-direction: column;
  padding: 8px 0 0;
}

.trip-row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.trip-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.trip-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trip-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.trip-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.trip-dates {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 2px;
}

.view-details-link {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: var(--teal-1);
  text-decoration: underline;
  align-self: flex-start;
  cursor: pointer;
}

.trip-checkbox {
  margin-left: 12px;
}

/* ===== BOTTOM NAV ===== */
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

/* ===== RESPONSIVE BREAKPOINTS ===== */

@media (max-width: 320px) {
  .page-header {
    padding: 20px 16px 10px;
  }

  .trip-tabs {
    margin: 0 16px;
  }

  .tab-button {
    padding: 12px 0;
    margin-right: 24px;
    font-size: 13px;
  }

  .main-content {
    padding: 0 16px;
  }

  .trip-row {
    padding: 10px 0;
  }

  .trip-title {
    font-size: 13px;
  }

  .trip-dates,
  .view-details-link {
    font-size: 11px;
  }

  .bottom-nav {
    padding: 12px 16px;
  }
}

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
    padding: 32px 32px 16px;
  }

  .trip-tabs {
    margin: 0 32px;
  }

  .main-content {
    padding: 0 32px;
  }

  .bottom-nav {
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

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
    padding: 36px 36px 18px;
  }

  .trip-tabs {
    margin: 0 36px;
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
    padding: 40px 40px 20px;
  }

  .trip-tabs {
    margin: 0 40px;
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

@media (max-height: 600px) and (orientation: landscape) {
  .page-header {
    padding: 16px 16px 8px;
  }

  .trip-tabs {
    margin: 0 16px;
  }

  .main-content {
    padding: 0 16px;
  }

  .trip-row {
    padding: 8px 0;
  }

  .trips-inner {
    padding-bottom: 70px;
  }

  .bottom-nav {
    padding: 10px 16px;
  }
}

@media (max-height: 500px) {
  .page-header {
    padding: 12px 12px 6px;
  }

  .trip-tabs {
    margin: 0 12px;
  }

  .tab-button {
    padding: 10px 0;
    font-size: 13px;
  }

  .main-content {
    padding: 0 12px;
  }

  .trip-row {
    padding: 8px 0;
  }

  .trips-inner {
    padding-bottom: 60px;
  }

  .bottom-nav {
    padding: 8px 12px;
  }
}

@supports(padding: max(0px)) {
  .container {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }

  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}

@media screen and (max-width: 767px) {
  input, textarea {
    font-size: 16px;
  }
}
</style>
