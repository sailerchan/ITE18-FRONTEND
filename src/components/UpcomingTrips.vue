<template>
  <div class="container">
    <div class="trips-inner">
      <!-- Header -->
      <header class="header">
        <div class="back-btn" @click="$emit('go-to-page', 'homepage')">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="title">My Trips</div>
        <div class="header-actions">
          <button class="add-trip-btn" @click="$emit('plan-trip')">
            <i class="fas fa-plus"></i>
            <span>Plan New Trip</span>
          </button>
        </div>
      </header>

      <!-- Tabs -->
      <div class="tabs">
        <div
          class="tab"
          :class="{ active: activeTab === 'upcoming' }"
          @click="activeTab = 'upcoming'"
        >
          Upcoming
          <span class="tab-badge" v-if="upcomingTrips.length > 0">{{ upcomingTrips.length }}</span>
        </div>
        <div
          class="tab"
          :class="{ active: activeTab === 'past' }"
          @click="activeTab = 'past'"
        >
          Past
          <span class="tab-badge" v-if="pastTrips.length > 0">{{ pastTrips.length }}</span>
        </div>
      </div>

      <!-- Upcoming Trips -->
      <div class="trips-section" v-if="activeTab === 'upcoming'">
        <div class="empty-state" v-if="upcomingTrips.length === 0">
          <div class="empty-icon">
            <i class="fas fa-suitcase-rolling"></i>
          </div>
          <h3>No upcoming trips</h3>
          <p>Book a trip to see it here!</p>
          <button class="plan-trip-btn" @click="$emit('plan-trip')">
            Plan a Trip
          </button>
        </div>

        <div class="trips-list" v-else>
          <div
            class="trip-card"
            v-for="trip in upcomingTrips"
            :key="trip.id"
            @click="viewTripDetails(trip)"
          >
            <div class="trip-image">
              <img :src="getTripImage(trip)" :alt="trip.accommodation?.title">
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
                <div class="trip-location">
                  <i class="fas fa-building"></i>
                  {{ trip.accommodation?.location || trip.destinationName }}
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

      <!-- Past Trips -->
      <div class="trips-section" v-if="activeTab === 'past'">
        <div class="empty-state" v-if="pastTrips.length === 0">
          <div class="empty-icon">
            <i class="fas fa-history"></i>
          </div>
          <h3>No past trips</h3>
          <p>Your completed trips will appear here</p>
        </div>

        <div class="trips-list" v-else>
          <div
            class="trip-card past"
            v-for="trip in pastTrips"
            :key="trip.id"
            @click="viewTripDetails(trip)"
          >
            <div class="trip-image">
              <img :src="getTripImage(trip)" :alt="trip.accommodation?.title">
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
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useTripsStore } from '../stores/trips'

export default {
  name: 'TripsPage',
  emits: ['go-to-page', 'go-back', 'plan-trip'],

  setup(props, { emit }) {
    const tripsStore = useTripsStore()
    const activeTab = ref('upcoming')

    // Get trips data from store
    const upcomingTrips = computed(() => tripsStore.getUpcomingTrips)
    const pastTrips = computed(() => tripsStore.getPastTrips)

    // Load trips when component mounts
    onMounted(() => {
      tripsStore.loadFromLocalStorage()
    })

    // Helper functions
    const getTripImage = (trip) => {
      // Try to get accommodation image, fallback to destination image
      if (trip.accommodation?.image) {
        return trip.accommodation.image
      }

      // Map destination IDs to images
      const destinationImages = {
        1: '/images/destinations/siargao.jpg',
        2: '/images/destinations/naked_island.jpg',
        3: '/images/destinations/guyam.jpg',
        4: '/images/destinations/cloud9.jpg'
      }

      return destinationImages[trip.destinationId] || '/images/default-trip.jpg'
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
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
    const planNewTrip = () => {
      emit('plan-trip')
    }

    const viewTripDetails = (trip) => {
      console.log('Viewing trip details:', trip)
      alert(`Trip Details:\n\nDestination: ${trip.destinationName}\nAccommodation: ${trip.accommodation?.title}\nDates: ${trip.dates || 'Not specified'}\nStatus: ${trip.status}\nTotal: ₱${trip.totalPrice}`)
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
      getTripImage,
      formatDate,
      planNewTrip,
      viewTripDetails,
      cancelTrip,
      writeReview
    }
  }
}
</script>

<style scoped>
/* Your existing CSS for TripsPage stays exactly the same */
/* Make sure it matches your original upcomingtrips.vue styling */
</style>
