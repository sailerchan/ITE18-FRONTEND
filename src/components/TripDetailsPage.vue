<template>
  <div class="container">
    <div class="details-inner">
      <!-- Top colored header -->
      <header class="details-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="details-header-text">
          <span class="details-label">Details</span>
          <h1 class="trip-title">
            Trip to<br>
            <span class="trip-destination">{{ tripDestination }}</span>
          </h1>
        </div>
        <div class="details-dates">
          <span class="dates-text">{{ tripDates }}</span>
        </div>
      </header>

      <!-- White content with three cards -->
      <main class="details-main">
        <!-- Accommodation card -->
        <section class="details-card">
          <h2 class="card-title">Accommodation</h2>
          <div class="card-divider"></div>

          <p class="card-heading">{{ accommodationTitle }}</p>
          <p class="card-text">{{ accommodationLocation }}</p>
          <p class="card-text">Receipt No: {{ receiptNumber }}</p>
          <p class="card-text">Payment: {{ paymentMethod }}</p>
          <p class="card-text">Booked on: {{ bookingDate }}</p>
        </section>

        <!-- Itinerary card -->
        <section class="details-card">
          <h2 class="card-title">Itinerary</h2>
          <div class="card-divider"></div>

          <div v-if="hasItinerary">
            <div v-for="(dayActivities, day) in groupedActivities" :key="day">
              <p class="card-heading">Day {{ day }}</p>
              <ul class="card-list">
                <li v-for="activity in dayActivities" :key="activity.id">
                  <strong>{{ formatTime(activity.time) }}:</strong> {{ activity.notes }}
                </li>
              </ul>
            </div>
          </div>

          <p v-else class="card-text empty-state">No itinerary added yet</p>
        </section>

        <!-- Packlist card -->
        <section class="details-card">
          <h2 class="card-title">Packlist</h2>
          <div class="card-divider"></div>

          <div v-if="hasPacklist">
            <div v-for="category in packlistCategories" :key="category.id" class="category-section">
              <p class="card-heading">{{ category.title }}</p>
              <ul class="checkbox-list">
                <li v-for="item in category.items" :key="item.id">
                  <label>
                    <input type="checkbox" :checked="item.checked" @change="togglePacklistItem(category.id, item.id)">
                    <span :class="{ 'checked-item': item.checked }">{{ item.text }}</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <p v-else class="card-text empty-state">No packlist added yet</p>
        </section>
      </main>

      <!-- Bottom Edit button -->
      <div class="edit-bar">
        <button class="edit-button" @click="handleEditTrip">
          Edit Itinerary
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useTripsStore } from '../stores/trips'

export default {
  name: 'TripDetailsPage',
  props: {
    trip: {
      type: Object,
      required: true
    }
  },
  emits: ['go-back', 'edit-trip'],
  setup(props, { emit }) {
    const tripsStore = useTripsStore()

    // Computed properties for display
    const tripDestination = computed(() => props.trip?.destinationName || 'Unknown Destination')

    const tripDates = computed(() => props.trip?.dates || 'No dates selected')

    const accommodationTitle = computed(() =>
      props.trip?.accommodation?.title || 'No accommodation booked'
    )

    const accommodationLocation = computed(() =>
      props.trip?.accommodation?.location || ''
    )

    const receiptNumber = computed(() =>
      props.trip?.receiptNumber || 'N/A'
    )

    const paymentMethod = computed(() =>
      props.trip?.paymentMethod || 'N/A'
    )

    const bookingDate = computed(() => {
      if (!props.trip?.bookingDate) return 'N/A'
      const date = new Date(props.trip.bookingDate)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    })

    // Itinerary data
    const activities = computed(() =>
      props.trip?.itinerary?.activities || []
    )

    const hasItinerary = computed(() =>
      activities.value.length > 0
    )

    const groupedActivities = computed(() => {
      const grouped = {}
      activities.value.forEach(activity => {
        if (!grouped[activity.day]) {
          grouped[activity.day] = []
        }
        grouped[activity.day].push(activity)
      })
      return grouped
    })

    // Packlist data
    const packlistCategories = computed(() =>
      props.trip?.packlist?.categories || []
    )

    const hasPacklist = computed(() =>
      packlistCategories.value.length > 0
    )

    // Methods
    const formatTime = (time) => {
      const timeMap = {
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening'
      }
      return timeMap[time] || time
    }

    const togglePacklistItem = (categoryId, itemId) => {
      const category = packlistCategories.value.find(c => c.id === categoryId)
      if (category) {
        const item = category.items.find(i => i.id === itemId)
        if (item) {
          item.checked = !item.checked
          // Save to store
          tripsStore.saveToLocalStorage()
        }
      }
    }

    const handleEditTrip = () => {
      console.log('Editing trip:', props.trip)
      // Store the trip ID in localStorage so ItineraryPage knows which trip to edit
      if (props.trip?.id) {
        localStorage.setItem('editingTripId', props.trip.id.toString())
      }
      emit('edit-trip', props.trip)
    }

    return {
      tripDestination,
      tripDates,
      accommodationTitle,
      accommodationLocation,
      receiptNumber,
      paymentMethod,
      bookingDate,
      activities,
      hasItinerary,
      groupedActivities,
      packlistCategories,
      hasPacklist,
      formatTime,
      togglePacklistItem,
      handleEditTrip
    }
  }
}
</script>

<style scoped>
:root {
  --muted: #6c757d;
  --dark: #111827;
  --teal-1: #0c3437;
}

.container {
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow-x: hidden;
}

.details-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.details-header {
  background: #0c3437;
  color: #ffff;
  padding: 16px 16px 32px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  display: flex;
  align-items: flex-start;
  position: absolute;
  width: 100%;
  height: 200px;
  z-index: 1;
  margin: 0;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #ffffff;
  padding: 8px;
  margin-right: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details-header-text {
  flex: 1;
  margin-left: 0;
}

.details-label {
  font-size: 16px;
}

.trip-title {
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  padding-top: 30px;
  margin-left: -30px;
}

.trip-destination {
  font-weight: 600;
}

.details-dates {
  margin-left: 8px;
  padding-top: 80px;
}

.dates-text {
  font-size: 12px;
  opacity: 0.9;
  font-weight: 200;
}

.details-main {
  flex: 1;
  padding: 0 30px;
  background: #f8f9fa;
  flex-direction: column;
  gap: 12px;
  bottom: 2px;
}

.details-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.075);
  padding: 20px;
  margin-bottom: 12px;
}

.details-main .details-card:first-child {
  margin-top: 150px;
  position: relative;
  z-index: 2;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 8px;
}

.card-divider {
  height: 1px;
  margin: 8px 0 10px;
  border-top: 1px dashed #e5e7eb;
}

.card-heading {
  font-size: 14px;
  font-weight: 600;
  margin: 12px 0 6px;
  color: var(--dark);
}

.category-section {
  margin-bottom: 16px;
}

.category-section:last-child {
  margin-bottom: 0;
}

.card-text {
  font-size: 12px;
  color: var(--muted);
  margin: 0 0 4px;
  line-height: 1.4;
}

.card-text.empty-state {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 12px 0;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
}

.card-list li {
  font-size: 12px;
  color: #374151;
  margin-bottom: 6px;
  line-height: 1.5;
}

.card-list li strong {
  color: var(--teal-1);
  font-weight: 600;
}

.checkbox-list {
  list-style: none;
  padding: 0;
  margin: 4px 0 8px;
}

.checkbox-list li {
  margin-bottom: 6px;
}

.checkbox-list label {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #374151;
  cursor: pointer;
}

.checkbox-list input[type='checkbox'] {
  margin-right: 8px;
}

.checked-item {
  text-decoration: line-through;
  color: #9ca3af;
}

.details-card:last-child {
  margin-bottom: 4px;
}

.edit-bar {
  padding: 16px;
  background: #0c3437;
  margin: 20px;
  border-radius: 50px;
}

.edit-button {
  width: 100%;
  background: var(--teal-1);
  color: #ffffff;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

@media (min-width: 768px) {
  .container {
    background: #f8f9fa;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
  }
  .details-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
}
</style> 
