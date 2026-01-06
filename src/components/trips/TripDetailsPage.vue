<template>
  <div class="container">
    <div class="details-inner">
      <!-- Top colored header -->
      <header class="details-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="details-header-text">
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

                  <div class="edit-itinerary-link">
            <button class="edit-link-btn" @click="goToItinerary">
              <i class="fas fa-edit"></i> Edit Itinerary
            </button>
          </div>
      </main>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref, onMounted } from 'vue'
import { useTripsStore } from '../../stores/trips'

export default {
  name: 'TripDetailsPage',
  props: {
    trip: {
      type: Object,
      required: true
    }
  },
  emits: ['go-back', 'edit-itinerary'],
  setup(props, { emit }) {
    const tripsStore = useTripsStore()
    const localTrip = ref(props.trip)
    const tripId = computed(() => props.trip?.id || localTrip.value?.id)

    // Watch for prop changes
    watch(() => props.trip, (newTrip) => {
      console.log('🔄 Trip prop updated:', newTrip)
      if (newTrip?.id) {
        // Get fresh data from store
        const freshTrip = tripsStore.getTripById(newTrip.id)
        if (freshTrip) {
          localTrip.value = freshTrip
          console.log('✅ Loaded fresh trip from store:', freshTrip)
        } else {
          localTrip.value = newTrip
        }
      } else {
        localTrip.value = newTrip
      }
    }, { immediate: true, deep: true })

    // Also watch for store updates
    onMounted(() => {
      // Check if we need to load from store
      if (tripId.value) {
        const freshTrip = tripsStore.getTripById(tripId.value)
        if (freshTrip && freshTrip !== localTrip.value) {
          localTrip.value = freshTrip
          console.log('📥 Loaded trip from store on mount:', freshTrip)
        }
      }

      // Debug: Print all trips
      console.log('🔍 All trips in store:', tripsStore.getAllTrips)
    })

    // Computed properties
    const tripDestination = computed(() =>
      localTrip.value?.destinationName || 'Unknown Destination'
    )

    const tripDates = computed(() =>
      localTrip.value?.dates || 'No dates selected'
    )

    const accommodationTitle = computed(() =>
      localTrip.value?.accommodation?.title || 'No accommodation booked'
    )

    const accommodationLocation = computed(() =>
      localTrip.value?.accommodation?.location || ''
    )

    const receiptNumber = computed(() =>
      localTrip.value?.receiptNumber || 'N/A'
    )

    const paymentMethod = computed(() =>
      localTrip.value?.paymentMethod || 'N/A'
    )

    const bookingDate = computed(() => {
      if (!localTrip.value?.bookingDate) return 'N/A'
      const date = new Date(localTrip.value.bookingDate)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    })

    // Itinerary data
    const activities = computed(() => {
      if (localTrip.value?.itinerary?.activities) {
        return localTrip.value.itinerary.activities
      } else if (localTrip.value?.activities) {
        return localTrip.value.activities
      } else {
        return []
      }
    })

    const hasItinerary = computed(() => {
      return activities.value.length > 0
    })

    const groupedActivities = computed(() => {
      const grouped = {}

      // Group activities by day
      activities.value.forEach(activity => {
        if (activity && typeof activity.day === 'number') {
          const day = activity.day
          if (!grouped[day]) {
            grouped[day] = []
          }
          grouped[day].push(activity)
        }
      })

      // Sort activities within each day by time
      Object.keys(grouped).forEach(day => {
        grouped[day].sort((a, b) => {
          const timeOrder = { morning: 1, afternoon: 2, evening: 3 }
          return (timeOrder[a.time] || 4) - (timeOrder[b.time] || 4)
        })
      })

      // Sort days numerically
      const sortedKeys = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b))
      const sortedGrouped = {}
      sortedKeys.forEach(key => {
        sortedGrouped[key] = grouped[key]
      })

      return sortedGrouped
    })

    // Packlist data
    const packlistCategories = computed(() => {
      if (localTrip.value?.packlist?.categories) {
        return localTrip.value.packlist.categories
      } else if (localTrip.value?.categories) {
        return localTrip.value.categories
      } else {
        return []
      }
    })

    const hasPacklist = computed(() => {
      return packlistCategories.value.length > 0
    })

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
          if (localTrip.value?.id) {
            tripsStore.updateTripItinerary(localTrip.value.id, {
              activities: activities.value,
              packlist: packlistCategories.value
            })

            // Refresh from store
            const updatedTrip = tripsStore.getTripById(localTrip.value.id)
            if (updatedTrip) {
              localTrip.value = updatedTrip
            }
          }
        }
      }
    }

    const goToItinerary = () => {
      if (localTrip.value?.id) {
        console.log('📍 Going to itinerary for trip ID:', localTrip.value.id)
        // Set the trip as editing in store
        tripsStore.setEditingTrip(localTrip.value.id)

        emit('edit-itinerary', localTrip.value)
      } else {
        console.error('❌ Cannot go to itinerary: No trip ID')
      }
    }

    // Force refresh function
    const forceRefreshTrip = () => {
      if (tripId.value) {
        const freshTrip = tripsStore.getTripById(tripId.value)
        if (freshTrip) {
          localTrip.value = freshTrip
          console.log('🔄 Force refreshed trip:', freshTrip)
        }
      }
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
      goToItinerary,
      forceRefreshTrip
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



.trip-title {
  margin: 4px 7px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  padding-top: 40px;
  margin-left: -30px;
}

.trip-destination {
  font-weight: 600;
}

.details-dates {
  margin-left: 8px;
  padding-top: 100px;
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
  padding-bottom: 40px;
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

/* Edit Itinerary Link Styles */
.edit-itinerary-link {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed #e5e7eb;
  text-align: center;
}

.edit-link-btn {
  background: transparent;
  border: none;
  color: #0c3437;
  padding: 4px 50px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-family:'Poppins', sans-serif;
}

.edit-link-btn:hover {
  background: var(--teal-1);
  color: white;
}

.edit-link-btn i {
  font-size: 12px;
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
