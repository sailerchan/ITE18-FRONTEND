<template>
  <div class="itinerary-page">
    <!-- Dark Header Card -->
    <div class="trip-header">
      <!-- Navigation -->
      <div class="nav">
        <button class="back-arrow" @click="goBack"><i class="fas fa-arrow-left"></i></button>
        <div class="nav-title">Itinerary</div>
      </div>

      <!-- Trip Details -->
      <h1 class="trip-title">{{ tripTitle }}</h1>

      <div class="trip-details">
        <div class="detail-row">
          <span class="detail-icon"><i class="fa-solid fa-calendar"></i></span>
          <span class="detail-text">{{ tripDates }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon"><i class="fa-solid fa-bed"></i></span>
          <span class="detail-text">{{ accommodationName }}</span>
        </div>
      </div>
    </div>

    <!-- Day Navigation -->
    <div class="day-tabs-container">
      <div class="day-tabs">
        <div
          v-for="day in days"
          :key="day.id"
          class="day-tab"
          :class="{ active: activeDay === day.id }"
          @click="setActiveDay(day.id)"
        >
          {{ day.name }}
        </div>
      </div>
    </div>

    <!-- Activity Cards Container -->
    <div class="activities-container">
      <div
        v-for="activity in filteredActivities"
        :key="activity.id"
        class="activity-slot"
      >
        <div class="activity-header">
          <div class="time-label">
            <!-- Custom Time Selector Button -->
            <button
              class="time-select-btn"
              @click="openTimeModal(activity)"
            >
              <i class="far fa-clock"></i>
              <span>{{ getTimeLabel(activity.time) }}</span>
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>

        <div class="activity-content">
          <div class="activity-details">
            <!-- Notepad-style Textarea -->
            <textarea
              class="activity-textarea"
              placeholder="What do you want to do at this time?&#10;&#10;Write your plans, activities, or notes here..."
              v-model="activity.notes"
              @input="updateActivity(activity)"
              rows="6"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Button -->
    <div class="button-container">
      <button class="add-button" @click="addActivity">Add Activity</button>
    </div>

    <!-- Packlist Section -->
    <div class="packlist-container">
      <div class="packlist">
        <div class="packlist-header">
          <div class="packlist-title">Packlist</div>
          <!-- Beautiful Dropdown Icon -->
          <button
            class="packlist-toggle-btn"
            @click="togglePacklist"
            :class="{ expanded: packlistExpanded }"
          >
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>

        <div class="packlist-card" v-show="packlistExpanded">
          <div class="packlist-categories">
            <div
              v-for="category in categories"
              :key="category.id"
              class="packlist-category"
            >
              <div class="category-header">
                <input
                  type="text"
                  class="category-title"
                  placeholder="Category name (e.g., Essentials, Clothing, Electronics)"
                  v-model="category.title"
                  @input="updateCategory(category)"
                >
                <span
                  class="delete-category"
                  @click="deleteCategory(category.id)"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="packlist-items">
                <div
                  v-for="item in category.items"
                  :key="item.id"
                  class="packlist-item"
                >
                  <!-- Custom Styled Checkbox -->
                  <label class="custom-checkbox">
                    <input
                      type="checkbox"
                      :checked="item.checked"
                      @change="toggleItemCheck(category.id, item.id)"
                    >
                    <span class="checkmark"></span>
                  </label>
                  <div
                    class="packlist-text"
                    :class="{ checked: item.checked }"
                  >
                    {{ item.text }}
                  </div>
                  <span
                    class="delete-item"
                    @click="deleteItem(category.id, item.id)"
                  ><i class="fas fa-times"></i></span>
                </div>
              </div>
              <input
                type="text"
                class="packlist-input"
                placeholder="Add new item..."
                @keypress.enter="addItemToCategory(category.id, $event)"
              >
            </div>
          </div>

          <button class="add-category-btn" @click="addCategory">
            <i class="fas fa-plus"></i> Add New Category
          </button>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="button-container">
      <button class="save-button" @click="saveTrip">Save & Return</button>
    </div>

    <!-- Time Selection Modal -->
    <div v-if="showTimeModal" class="modal-overlay" @click.self="closeTimeModal">
      <div class="modal-content time-modal">
        <div class="modal-header">
          <h3 class="modal-title">Select Time</h3>
          <button class="modal-close" @click="closeTimeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="time-options">
          <div
            class="time-option"
            :class="{ selected: selectedTime === 'morning' }"
            @click="selectTime('morning')"
          >
            <i class="fas fa-sun"></i>
            <span>Morning</span>
          </div>
          <div
            class="time-option"
            :class="{ selected: selectedTime === 'afternoon' }"
            @click="selectTime('afternoon')"
          >
            <i class="fas fa-cloud-sun"></i>
            <span>Afternoon</span>
          </div>
          <div
            class="time-option"
            :class="{ selected: selectedTime === 'evening' }"
            @click="selectTime('evening')"
          >
            <i class="fas fa-moon"></i>
            <span>Evening</span>
          </div>
        </div>
        <div class="modal-actions">
          <button class="modal-btn cancel-btn" @click="closeTimeModal">
            Cancel
          </button>
          <button class="modal-btn confirm-btn" @click="confirmTimeSelection">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Unsaved Changes Modal -->
    <div v-if="showLeaveModal" class="modal-overlay" @click.self="showLeaveModal = false">
      <div class="modal-content">
        <div class="modal-icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <h3 class="modal-title">Unsaved Changes</h3>
        <p class="modal-message">
          You have unsaved changes. Your draft has been auto-saved and you can continue editing later.
        </p>
        <p class="modal-submessage">
          Are you sure you want to leave?
        </p>
        <div class="modal-actions">
          <button class="modal-btn cancel-btn" @click="showLeaveModal = false">
            Stay & Edit
          </button>
          <button class="modal-btn confirm-btn" @click="confirmLeave">
            Leave
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTripsStore } from '../stores/trips'

export default {
  name: 'ItineraryPage',
  data() {
    return {
      activeDay: 1,
      packlistExpanded: true,
      tripTitle: 'Trip to Siargao Island',
      tripDates: 'Nov 21 - Nov 25, 2025',
      accommodationName: 'Cloud 9 Surf Resort',
      totalPrice: '0.00',
      days: [
        { id: 1, name: 'Day 1' },
        { id: 2, name: 'Day 2' },
        { id: 3, name: 'Day 3' },
        { id: 4, name: 'Day 4' },
        { id: 5, name: 'Day 5' }
      ],
      activities: [],
      categories: [],
      nextActivityId: 1,
      nextCategoryId: 1,
      nextItemId: 1,
      hasUnsavedChanges: false,
      autoSaveTimer: null,
      showLeaveModal: false,
      showTimeModal: false,
      currentActivity: null,
      selectedTime: 'morning',
      currentTripId: null
    }
  },
  computed: {
    filteredActivities() {
      return this.activities.filter(activity => activity.day === this.activeDay)
    }
  },
  watch: {
    activities: {
      handler() {
        this.hasUnsavedChanges = true
        this.scheduleAutoSave()
      },
      deep: true
    },
    categories: {
      handler() {
        this.hasUnsavedChanges = true
        this.scheduleAutoSave()
      },
      deep: true
    }
  },
  mounted() {
    this.loadTripData()
    if (this.categories.length === 0) {
      this.addCategory()
    }
  },
  beforeUnmount() {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer)
    }
  },
  methods: {
    loadTripData() {
      const tripsStore = useTripsStore()

      // Get the editing trip ID from store
      this.currentTripId = tripsStore.editingTripId

      if (this.currentTripId) {
        // Load existing trip data
        this.loadExistingTripData(this.currentTripId)
      } else {
        // Load from booking data (for new trips)
        this.loadBookingData()
        this.loadDraft()
      }
    },

    loadExistingTripData(tripId) {
      const tripsStore = useTripsStore()
      const trip = tripsStore.getTripById(tripId)

      if (trip) {
        console.log('📖 Loading existing trip data:', trip)

        // Load trip details
        this.tripTitle = `Trip to ${trip.destinationName}`
        this.tripDates = trip.dates
        this.accommodationName = trip.accommodation?.title || 'Accommodation'
        this.totalPrice = trip.totalPrice

        // Load itinerary activities
        if (trip.itinerary?.activities && trip.itinerary.activities.length > 0) {
          this.activities = JSON.parse(JSON.stringify(trip.itinerary.activities))
          this.nextActivityId = Math.max(...this.activities.map(a => a.id), 0) + 1
        }

        // Load packlist
        if (trip.packlist?.categories && trip.packlist.categories.length > 0) {
          this.categories = JSON.parse(JSON.stringify(trip.packlist.categories))
          this.nextCategoryId = Math.max(...this.categories.map(c => c.id), 0) + 1
          const allItemIds = this.categories.flatMap(c => c.items.map(i => i.id))
          this.nextItemId = Math.max(...allItemIds, 0) + 1
        }

        this.hasUnsavedChanges = false
      }
    },

    loadBookingData() {
      const bookingData = localStorage.getItem('lastBooking')
      if (bookingData) {
        try {
          const data = JSON.parse(bookingData)
          console.log('Loaded booking data:', data)

          if (data.destination) {
            this.tripTitle = `Trip to ${data.destination}`
          }

          if (data.dates) {
            this.tripDates = data.dates
          }

          if (data.property && data.property.title) {
            this.accommodationName = data.property.title
          }

          if (data.totalPrice) {
            this.totalPrice = parseFloat(data.totalPrice).toFixed(2)
          }

          if (data.nights) {
            const numberOfDays = Math.min(data.nights + 1, 5)
            this.days = Array.from({ length: numberOfDays }, (_, i) => ({
              id: i + 1,
              name: `Day ${i + 1}`
            }))
          }
        } catch (error) {
          console.error('Error parsing booking data:', error)
        }
      }
    },

    loadDraft() {
      const draftActivities = localStorage.getItem('itineraryDraft_activities')
      const draftPacklist = localStorage.getItem('itineraryDraft_packlist')

      if (draftActivities) {
        try {
          const data = JSON.parse(draftActivities)
          this.activities = data.activities || []
          this.nextActivityId = data.nextActivityId || 1
          console.log('Draft activities loaded')
        } catch (error) {
          console.error('Error parsing draft activities:', error)
        }
      }

      if (draftPacklist) {
        try {
          const data = JSON.parse(draftPacklist)
          this.categories = data.categories || []
          this.nextCategoryId = data.nextCategoryId || 1
          this.nextItemId = data.nextItemId || 1
          console.log('Draft packlist loaded')
        } catch (error) {
          console.error('Error parsing draft packlist:', error)
        }
      }

      this.hasUnsavedChanges = false
    },

    scheduleAutoSave() {
      if (this.autoSaveTimer) {
        clearTimeout(this.autoSaveTimer)
      }

      this.autoSaveTimer = setTimeout(() => {
        this.autoSaveToTrip()
      }, 1000) // Auto-save after 1 second of inactivity
    },

    autoSaveToTrip() {
      if (!this.currentTripId) return

      const validActivities = this.activities.filter(activity =>
        activity.notes.trim() !== ''
      )

      const validCategories = this.categories.filter(category =>
        category.title.trim() !== '' || category.items.length > 0
      )

      const tripsStore = useTripsStore()

      // Update the trip in store
      const success = tripsStore.updateTripItinerary(this.currentTripId, {
        activities: validActivities,
        packlist: validCategories
      })

      if (success) {
        console.log('✅ Auto-saved trip changes')
        this.hasUnsavedChanges = false
      }
    },

    setActiveDay(dayId) {
      this.activeDay = dayId
    },

    togglePacklist() {
      this.packlistExpanded = !this.packlistExpanded
    },

    addActivity() {
      const newActivity = {
        id: this.nextActivityId++,
        day: this.activeDay,
        time: 'morning',
        notes: ''
      }
      this.activities.push(newActivity)
      this.scheduleAutoSave()
    },

    updateActivity(activity) {
      const index = this.activities.findIndex(a => a.id === activity.id)
      if (index !== -1) {
        this.activities.splice(index, 1, { ...activity })
        this.scheduleAutoSave()
      }
    },

    updateCategory(category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      if (index !== -1) {
        this.categories.splice(index, 1, { ...category })
        this.scheduleAutoSave()
      }
    },

    addCategory() {
      const newCategory = {
        id: this.nextCategoryId++,
        title: '',
        items: []
      }
      this.categories.push(newCategory)
      this.scheduleAutoSave()
    },

    deleteCategory(categoryId) {
      if (confirm('Delete this category and all its items?')) {
        this.categories = this.categories.filter(cat => cat.id !== categoryId)
        this.scheduleAutoSave()
      }
    },

    addItemToCategory(categoryId, event) {
      const input = event.target
      const text = input.value.trim()

      if (text) {
        const category = this.categories.find(cat => cat.id === categoryId)
        if (category) {
          category.items.push({
            id: this.nextItemId++,
            text: text,
            checked: false
          })
          input.value = ''
          this.updateCategory(category)
        }
      }
    },

    toggleItemCheck(categoryId, itemId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      if (category) {
        const item = category.items.find(i => i.id === itemId)
        if (item) {
          item.checked = !item.checked
          this.updateCategory(category)
        }
      }
    },

    deleteItem(categoryId, itemId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      if (category) {
        category.items = category.items.filter(item => item.id !== itemId)
        this.updateCategory(category)
      }
    },

    // Time Modal Methods
    openTimeModal(activity) {
      this.currentActivity = activity
      this.selectedTime = activity.time
      this.showTimeModal = true
    },

    closeTimeModal() {
      this.showTimeModal = false
      this.currentActivity = null
    },

    selectTime(time) {
      this.selectedTime = time
    },

    confirmTimeSelection() {
      if (this.currentActivity) {
        this.currentActivity.time = this.selectedTime
        this.updateActivity(this.currentActivity)
      }
      this.closeTimeModal()
    },

    getTimeLabel(time) {
      const labels = {
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening'
      }
      return labels[time] || 'Select Time'
    },

    saveTrip() {
      // Force auto-save before leaving
      this.autoSaveToTrip()

      // Show success message
      alert('Trip changes have been saved!')

      // Clear editing trip and go back
      const tripsStore = useTripsStore()
      tripsStore.clearEditingTrip()

      this.$emit('go-back')
    },

    goBack() {
      if (this.hasUnsavedChanges) {
        this.showLeaveModal = true
      } else {
        this.cleanupAndLeave()
      }
    },

    confirmLeave() {
      this.showLeaveModal = false
      this.cleanupAndLeave()
    },

    cleanupAndLeave() {
      // Auto-save before leaving
      this.autoSaveToTrip()

      // Clear editing trip from store
      const tripsStore = useTripsStore()
      tripsStore.clearEditingTrip()

      // Clear draft data
      localStorage.removeItem('itineraryDraft_activities')
      localStorage.removeItem('itineraryDraft_packlist')

      this.$emit('go-back')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.itinerary-page {
  background-color: #f8f9fa;
  color: #333333;
  line-height: 1.5;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;
}

/* Dark Header Card */
.trip-header {
  background-color: #0c3437;
  border-radius: 0 0 100px 100px;
  padding: 20px;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100vw;
  max-width: 100%;
  box-sizing: border-box;
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-arrow {
  font-size: 24px;
  color: white;
  margin-right: 16px;
  text-decoration: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: background-color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
}

.back-arrow:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
}

/* Trip Details */
.trip-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  word-break: break-word;
  overflow-wrap: break-word;
}

.trip-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  width: 100%;
}

.detail-icon {
  margin-right: 12px;
  font-size: 16px;
  min-width: 24px;
  flex-shrink: 0;
}

.detail-text {
  flex: 1;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Day Navigation */
.day-tabs-container {
  width: 100vw;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 0 16px 0;
  margin: 0 0 24px 0;
  position: relative;
}

.day-tabs-container::-webkit-scrollbar {
  display: none;
}

.day-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
  min-width: min-content;
  width: max-content;
}

.day-tab {
  padding: 12px 16px;
  font-weight: 500;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 80px;
  text-align: center;
}

.day-tab.active {
  color: #1f4f5a;
  font-weight: 600;
}

.day-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #0c3437;
  border-radius: 3px 3px 0 0;
}

/* Activity Cards */
.activities-container {
  padding: 0 20px;
  width: 100vw;
  max-width: 100%;
  box-sizing: border-box;
  flex: 1;
}

.activity-slot {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  width: 100%;
  box-sizing: border-box;
}

.activity-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  width: 100%;
}

.time-label {
  width: 100%;
}

/* Custom Time Select Button */
.time-select-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #0c3437;
  cursor: pointer;
  transition: all 0.2s;
  width: auto;
  min-width: 150px;
}

.time-select-btn:hover {
  background: #e8e9ea;
  border-color: #0c3437;
}

.time-select-btn i:first-child {
  font-size: 16px;
}

.time-select-btn i:last-child {
  margin-left: auto;
  font-size: 12px;
}

.activity-content {
  width: 100%;
  box-sizing: border-box;
}

.activity-details {
  width: 100%;
}

/* Notepad-style Textarea */
.activity-textarea {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  font-family: inherit;
  line-height: 1.6;
  color: #333;
  background: #fafafa;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.activity-textarea:focus {
  border-color: #0c3437;
  background: white;
  box-shadow: 0 0 0 3px rgba(12, 52, 55, 0.1);
}

.activity-textarea::placeholder {
  color: #999;
  line-height: 1.6;
}

/* Button Container */
.button-container {
  padding: 0 20px;
  width: 100vw;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 24px;
}

/* Add Button */
.add-button {
  width: 100%;
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 8px rgba(31, 79, 90, 0.2);
  display: block;
  box-sizing: border-box;
}

.add-button:hover {
  background-color: #164148;
}

/* Packlist Section */
.packlist-container {
  width: 100vw;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.packlist {
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 32px;
}

.packlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;
}

.packlist-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* Beautiful Dropdown Toggle Button */
.packlist-toggle-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #0c3437;
}

.packlist-toggle-btn:hover {
  background: #e8e9ea;
  border-color: #0c3437;
}

.packlist-toggle-btn i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.packlist-toggle-btn.expanded i {
  transform: rotate(180deg);
}

.packlist-card {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
}

.packlist-category {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
}

.packlist-category:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
  gap: 8px;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f4f5a;
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  padding: 4px 0;
  min-width: 0;
  box-sizing: border-box;
}

.category-title::placeholder {
  color: #888;
  font-style: italic;
}

.delete-category {
  color: #ff6b6b;
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
  user-select: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}

.delete-category:hover {
  background: #ffe5e5;
}

.packlist-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.packlist-input::placeholder {
  color: #888;
}

.packlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  width: 100%;
  gap: 10px;
}

/* Custom Checkbox Styling */
.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  cursor: pointer;
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: white;
  border: 2px solid #d0d0d0;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.custom-checkbox:hover .checkmark {
  border-color: #0c3437;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #0c3437;
  border-color: #0c3437;
}

.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.packlist-text {
  color: #666;
  flex: 1;
  transition: all 0.2s;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 14px;
  min-width: 0;
}

.packlist-text.checked {
  text-decoration: line-through;
  color: #999;
}

.delete-item {
  color: #ff6b6b;
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
  user-select: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}

.delete-item:hover {
  background: #ffe5e5;
}

.add-category-btn {
  width: 100%;
  background-color: transparent;
  color: #0c3437;
  border: 1px dashed #1f4f5a;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
}

.add-category-btn:hover {
  background-color: #f0f7f9;
}

/* Save Button */
.save-button {
  width: 100%;
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 8px rgba(31, 79, 90, 0.2);
  display: block;
  box-sizing: border-box;
}

.save-button:hover {
  background-color: #164148;
}

/* Time Selection Modal */
.time-modal {
  max-width: 400px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e8e9ea;
  color: #333;
}

.time-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.time-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.time-option:hover {
  background: #e8e9ea;
  border-color: #0c3437;
}

.time-option.selected {
  background: #e8f5f7;
  border-color: #0c3437;
  box-shadow: 0 0 0 3px rgba(12, 52, 55, 0.1);
}

.time-option i {
  font-size: 24px;
  color: #0c3437;
  width: 32px;
  text-align: center;
}

.time-option span {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* Modal Overlay & Content */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: slideUp 0.3s ease-out;
  position: relative;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-icon {
  width: 64px;
  height: 64px;
  background: #fff3cd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.modal-icon i {
  font-size: 32px;
  color: #f59e0b;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.modal-message {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.modal-submessage {
  font-size: 15px;
  color: #333;
  font-weight: 500;
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.modal-btn {
  flex: 1;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  outline: none;
}

.cancel-btn {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.cancel-btn:hover {
  background-color: #e5e7eb;
}

.cancel-btn:active {
  transform: scale(0.98);
}

.confirm-btn {
  background-color: #0c3437;
  color: white;
}

.confirm-btn:hover {
  background-color: #164148;
}

.confirm-btn:active {
  transform: scale(0.98);
}

/* Mobile optimizations */
@media (max-width: 479px) {
  .modal-overlay {
    padding: 16px;
  }

  .modal-content {
    padding: 28px 20px;
    max-width: 340px;
  }

  .modal-icon {
    width: 56px;
    height: 56px;
    margin-bottom: 16px;
  }

  .modal-icon i {
    font-size: 28px;
  }

  .modal-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .modal-message,
  .modal-submessage {
    font-size: 14px;
  }

  .modal-actions {
    flex-direction: column-reverse;
    gap: 10px;
  }

  .modal-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
  }

  .time-option {
    padding: 14px;
  }

  .time-option i {
    font-size: 20px;
    width: 28px;
  }

  .time-option span {
    font-size: 15px;
  }
}

/* Landscape mobile */
@media (max-width: 767px) and (orientation: landscape) {
  .modal-content {
    padding: 20px 16px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
  }

  .modal-icon i {
    font-size: 24px;
  }

  .modal-title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .modal-message,
  .modal-submessage {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .modal-actions {
    margin-top: 16px;
    gap: 8px;
  }

  .modal-btn {
    padding: 10px 16px;
    font-size: 14px;
  }
}

/* Prevent body scroll when modal is open */
body.modal-open {
  overflow: hidden;
}

/* Mobile-specific optimizations */
@media (max-width: 479px) {
  .trip-header {
    padding: 16px;
    border-radius: 0 0 20px 20px;
  }

  .nav {
    margin-bottom: 16px;
  }

  .back-arrow {
    width: 36px;
    height: 36px;
  }

  .nav-title {
    font-size: 18px;
  }

  .trip-title {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .detail-row {
    font-size: 13px;
  }

  .detail-icon {
    margin-right: 8px;
  }

  .day-tabs {
    padding: 0 16px;
  }

  .day-tab {
    padding: 10px 12px;
    font-size: 14px;
    min-width: 70px;
  }

  .button-container:last-of-type {
    margin-bottom: 100px;
    padding-bottom: 20px;
  }

  .activities-container,
  .button-container,
  .packlist {
    padding: 0 16px;
  }

  .activity-slot {
    padding: 12px;
  }

  .time-select-btn {
    font-size: 13px;
    padding: 8px 12px;
    min-width: 140px;
  }

  .activity-textarea {
    font-size: 14px;
    padding: 10px;
  }

  .add-button,
  .save-button {
    padding: 14px;
    font-size: 15px;
  }

  .packlist-header {
    margin-bottom: 12px;
  }

  .packlist-title {
    font-size: 16px;
  }

  .packlist-card {
    padding: 12px;
  }

  .category-title {
    font-size: 15px;
  }

  .packlist-input {
    font-size: 14px;
  }
}

/* Tablet and larger mobile */
@media (min-width: 480px) {
  .activity-header {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .time-label {
    margin-bottom: 0;
    width: auto;
  }
}

/* Tablet */
@media (min-width: 768px) {
  .itinerary-page {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  .trip-header {
    border-radius: 0 0 24px 24px;
    padding: 24px 40px;
    width: 100%;
  }

  .day-tabs-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 24px;
  }

  .day-tabs {
    width: 100%;
    justify-content: center;
  }

  .activities-container,
  .button-container,
  .packlist-container {
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 40px;
  }

  .packlist {
    padding: 0;
  }

  .add-button,
  .save-button {
    max-width: none;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .itinerary-page {
    max-width: 900px;
  }

  .trip-header {
    padding: 32px 48px;
    border-radius: 0 0 24px 24px;
  }

  .day-tabs-container {
    max-width: 900px;
  }

  .activities-container,
  .button-container,
  .packlist-container {
    max-width: 900px;
    padding: 0 48px;
  }

  .activity-slot {
    padding: 20px;
  }

  .packlist-card {
    padding: 24px;
  }
}

/* Large desktop */
@media (min-width: 1200px) {
  .itinerary-page {
    max-width: 1000px;
  }

  .day-tabs-container {
    max-width: 1000px;
  }

  .activities-container,
  .button-container,
  .packlist-container {
    max-width: 1000px;
  }
}

/* Extra large screens */
@media (min-width: 1400px) {
  .itinerary-page {
    max-width: 1200px;
  }

  .day-tabs-container {
    max-width: 1200px;
  }

  .activities-container,
  .button-container,
  .packlist-container {
    max-width: 1200px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .back-arrow,
  .day-tab,
  .add-button,
  .save-button,
  .delete-category,
  .delete-item,
  .add-category-btn,
  .custom-checkbox,
  .packlist-toggle-btn {
    min-height: 44px;
    min-width: 44px;
  }

  .back-arrow,
  .custom-checkbox,
  .delete-category,
  .delete-item,
  .packlist-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time-select-btn {
    padding: 12px 16px;
    font-size: 16px;
  }

  .activity-textarea {
    font-size: 16px;
    padding: 12px;
  }

  .day-tab {
    padding: 14px 16px;
  }
}

/* Landscape mobile */
@media (max-width: 767px) and (orientation: landscape) {
  .itinerary-page {
    padding-bottom: 16px;
  }

  .trip-header {
    padding: 12px 16px;
    border-radius: 0 0 16px 16px;
  }

  .nav {
    margin-bottom: 12px;
  }

  .trip-title {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .detail-row {
    font-size: 12px;
  }

  .day-tabs-container {
    margin-bottom: 16px;
  }

  .day-tabs {
    padding: 0 12px;
  }

  .day-tab {
    padding: 8px 12px;
    min-width: 60px;
    font-size: 13px;
  }

  .activities-container,
  .button-container,
  .packlist {
    padding: 0 12px;
  }

  .activity-slot {
    padding: 12px;
    margin-bottom: 12px;
  }

  .packlist-card {
    padding: 12px;
  }

  .add-button,
  .save-button {
    padding: 12px;
    font-size: 14px;
    margin-bottom: 16px;
  }
}

/* Safe area for notch phones */
@supports (padding: max(0px)) {
  .itinerary-page {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }

  .trip-header {
    padding-top: max(20px, env(safe-area-inset-top));
    padding-left: max(20px, env(safe-area-inset-left));
    padding-right: max(20px, env(safe-area-inset-right));
  }

  @media (max-width: 479px) {
    .trip-header {
      padding-top: max(16px, env(safe-area-inset-top));
      padding-left: max(16px, env(safe-area-inset-left));
      padding-right: max(16px, env(safe-area-inset-right));
    }
  }

  @media (max-width: 767px) and (orientation: landscape) {
    .trip-header {
      padding-top: max(12px, env(safe-area-inset-top));
      padding-left: max(12px, env(safe-area-inset-left));
      padding-right: max(12px, env(safe-area-inset-right));
    }
  }
}

/* Prevent horizontal scroll */
html, body {
  overflow-x: hidden;
  width: 100%;
  position: relative;
}
</style>
