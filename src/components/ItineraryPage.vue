<template>
  <div class="itinerary-page">
    <!-- Dark Header Card -->
    <div class="trip-header">
      <!-- Navigation -->
      <div class="nav">
        <button class="back-arrow" @click="goBack">←</button>
        <div class="nav-title">Itinerary</div>
      </div>

      <!-- Trip Details -->
      <h1 class="trip-title">{{ tripTitle }}</h1>

      <div class="trip-details">
        <div class="detail-row">
          <span class="detail-icon">📅</span>
          <span>{{ tripDates }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">🏨</span>
          <span>{{ accommodationName }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">💰</span>
          <span>Total: PHP {{ totalPrice }}</span>
        </div>
      </div>
    </div>

    <!-- Day Navigation -->
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

    <!-- Activity Cards Container -->
    <div class="activities-container">
      <div
        v-for="activity in filteredActivities"
        :key="activity.id"
        class="activity-slot"
      >
        <div class="activity-header">
          <div class="time-label">
            <select
              class="time-select"
              v-model="activity.time"
              @change="updateActivity(activity)"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <div class="activity-content">
            <div class="activity-details">
              <input
                type="text"
                class="activity-input title-input"
                placeholder="Activity title..."
                v-model="activity.title"
                @input="updateActivity(activity)"
              >
              <input
                type="text"
                class="activity-input desc-input"
                placeholder="Add description..."
                v-model="activity.description"
                @input="updateActivity(activity)"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Button -->
    <button class="add-button" @click="addActivity">Add Activity</button>

    <!-- Packlist Section -->
    <div class="packlist">
      <div class="packlist-header">
        <div class="packlist-title">Packlist</div>
        <div
          class="packlist-arrow"
          @click="togglePacklist"
        >
          {{ packlistExpanded ? '⌄' : '›' }}
        </div>
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
              >✕</span>
            </div>
            <div class="packlist-items">
              <div
                v-for="item in category.items"
                :key="item.id"
                class="packlist-item"
              >
                <div
                  class="packlist-checkbox"
                  :class="{ checked: item.checked }"
                  @click="toggleItemCheck(category.id, item.id)"
                >
                  {{ item.checked ? '✓' : '' }}
                </div>
                <div
                  class="packlist-text"
                  :class="{ checked: item.checked }"
                >
                  {{ item.text }}
                </div>
                <span
                  class="delete-item"
                  @click="deleteItem(category.id, item.id)"
                >✕</span>
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

        <button class="add-category-btn" @click="addCategory">+ Add New Category</button>
      </div>
    </div>

    <!-- Save Button -->
    <button class="save-button" @click="saveTrip">Save Trip</button>
  </div>
</template>

<script>
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
      nextItemId: 1
    }
  },
  computed: {
    filteredActivities() {
      return this.activities.filter(activity => activity.day === this.activeDay)
    }
  },
  mounted() {
    this.loadBookingData()
    this.loadTripDates()
    this.loadSavedData()
    // Create first category by default
    if (this.categories.length === 0) {
      this.addCategory()
    }
  },
  methods: {
    loadBookingData() {
      // Load booking data from localStorage
      const bookingData = localStorage.getItem('lastBooking')
      if (bookingData) {
        try {
          const data = JSON.parse(bookingData)
          console.log('Loaded booking data:', data)

          // Update trip details with booking information
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

          // Calculate number of days for itinerary
          if (data.nights) {
            const numberOfDays = Math.min(data.nights + 1, 5) // Max 5 days
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

    loadTripDates() {
      // Try to load dates from localStorage or props
      const savedDates = localStorage.getItem('tripDates')
      if (savedDates) {
        try {
          const tripData = JSON.parse(savedDates)
          const startDate = tripData.startDate
          const endDate = tripData.endDate
          this.tripDates = `${startDate.monthName} ${startDate.day} - ${endDate.monthName} ${endDate.day}, ${startDate.year}`
        } catch (error) {
          console.error('Error parsing saved dates:', error)
        }
      }
    },

    loadSavedData() {
      // Load saved activities and packlist from localStorage
      const savedActivities = localStorage.getItem('itineraryActivities')
      const savedPacklist = localStorage.getItem('itineraryPacklist')

      if (savedActivities) {
        try {
          this.activities = JSON.parse(savedActivities)
          this.nextActivityId = Math.max(...this.activities.map(a => a.id), 0) + 1
        } catch (error) {
          console.error('Error parsing saved activities:', error)
        }
      }

      if (savedPacklist) {
        try {
          this.categories = JSON.parse(savedPacklist)
          this.nextCategoryId = Math.max(...this.categories.map(c => c.id), 0) + 1
          this.nextItemId = Math.max(...this.categories.flatMap(c => c.items.map(i => i.id)), 0) + 1
        } catch (error) {
          console.error('Error parsing saved packlist:', error)
        }
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
        title: '',
        description: ''
      }
      this.activities.push(newActivity)
      this.saveToLocalStorage()
    },


    addCategory() {
      const newCategory = {
        id: this.nextCategoryId++,
        title: '',
        items: []
      }
      this.categories.push(newCategory)
      this.saveToLocalStorage()
    },

    deleteCategory(categoryId) {
      if (confirm('Delete this category and all its items?')) {
        this.categories = this.categories.filter(cat => cat.id !== categoryId)
        this.saveToLocalStorage()
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
          this.saveToLocalStorage()
        }
      }
    },

    toggleItemCheck(categoryId, itemId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      if (category) {
        const item = category.items.find(i => i.id === itemId)
        if (item) {
          item.checked = !item.checked
          this.saveToLocalStorage()
        }
      }
    },

    deleteItem(categoryId, itemId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      if (category) {
        category.items = category.items.filter(item => item.id !== itemId)
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('itineraryActivities', JSON.stringify(this.activities))
      localStorage.setItem('itineraryPacklist', JSON.stringify(this.categories))
    },

    saveTrip() {
      // Filter out empty activities
      const validActivities = this.activities.filter(activity =>
        activity.title.trim() !== '' || activity.description.trim() !== ''
      )

      // Filter out empty categories
      const validCategories = this.categories.filter(category =>
        category.title.trim() !== '' || category.items.length > 0
      )

      console.log('Activities to save:', validActivities)
      console.log('Packlist to save:', validCategories)

      // Save to localStorage
      localStorage.setItem('itineraryActivities', JSON.stringify(validActivities))
      localStorage.setItem('itineraryPacklist', JSON.stringify(validCategories))

      alert('Trip saved successfully!')

      // Emit event to parent component
      this.$emit('trip-saved', {
        activities: validActivities,
        packlist: validCategories
      })
    },

    goBack() {
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.itinerary-page {
  background-color: #f8f9fa;
  color: #333333;
  line-height: 1.5;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Dark Header Card */
.trip-header {
  background-color: #1f4f5a;
  border-radius: 0 0 24px 24px;
  padding: 20px;
  margin: 0 0 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
}

.trip-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.detail-icon {
  margin-right: 12px;
  font-size: 16px;
  min-width: 24px;
}

/* Day Navigation */
.day-tabs {
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
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
  background-color: #1f4f5a;
  border-radius: 3px 3px 0 0;
}

/* Activity Cards */
.activities-container {
  padding: 0 20px;
}

.activity-slot {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.activity-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-direction: column;
}

.time-label {
  font-size: 14px;
  font-weight: 600;
  color: #1f4f5a;
  min-width: 80px;
  margin-bottom: 12px;
}

.time-select {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  background: white;
  color: #333;
  cursor: pointer;
  outline: none;
  width: 100%;
  max-width: 150px;
}

.activity-content {
  display: flex;
  border-left: 1px solid #e8e8e8;
  padding-left: 16px;
  flex: 1;
  width: 100%;
}

.activity-details {
  flex: 1;
  width: 100%;
}

.activity-input {
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  padding: 4px 0;
}

.title-input {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 16px;
}

.desc-input {
  font-size: 14px;
  color: #666;
}

/* Add Button */
.add-button {
  width: calc(100% - 40px);
  margin: 0 20px 24px 20px;
  background-color: #1f4f5a;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 8px rgba(31, 79, 90, 0.2);
  max-width: 500px;
}

.add-button:hover {
  background-color: #164148;
}

/* Packlist Section */
.packlist {
  margin-bottom: 24px;
  padding: 0 20px;
}

.packlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.packlist-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.packlist-arrow {
  font-size: 20px;
  color: #666;
  cursor: pointer;
}

.packlist-card {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  margin: 0 auto;
}

.packlist-category {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
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
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f4f5a;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 4px 0;
}

.category-title::placeholder {
  color: #888;
  font-style: italic;
}

.delete-category {
  color: #ff6b6b;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  flex-shrink: 0;
}

.packlist-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  margin-top: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.packlist-input::placeholder {
  color: #888;
}

.packlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.packlist-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.packlist-checkbox.checked {
  background-color: #1f4f5a;
  color: white;
  border-color: #1f4f5a;
}

.packlist-text {
  color: #666;
  flex: 1;
  transition: all 0.2s;
  word-break: break-word;
}

.packlist-text.checked {
  text-decoration: line-through;
  color: #999;
}

.delete-item {
  color: #ff6b6b;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  flex-shrink: 0;
}

.add-category-btn {
  width: 100%;
  background-color: transparent;
  color: #1f4f5a;
  border: 1px dashed #1f4f5a;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
}

.add-category-btn:hover {
  background-color: #f0f7f9;
}

/* Save Button */
.save-button {
  width: calc(100% - 40px);
  margin: 0 20px;
  background-color: #1f4f5a;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 8px rgba(31, 79, 90, 0.2);
  max-width: 500px;
}

.save-button:hover {
  background-color: #164148;
}

/* Responsive Design */
@media (min-width: 480px) {
  .activity-header {
    flex-direction: row;
    align-items: center;
  }

  .time-label {
    margin-bottom: 0;
  }

  .time-select {
    width: auto;
  }
}

@media (min-width: 768px) {
  .trip-header {
    padding: 24px 40px;
    margin: 0 auto 24px;
    max-width: 800px;
  }

  .day-tabs {
    padding: 0 40px;
    max-width: 800px;
    margin: 0 auto 24px;
  }

  .activities-container {
    padding: 0 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  .add-button {
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 800px;
    width: calc(100% - 80px);
  }

  .packlist {
    padding: 0 40px;
    max-width: 800px;
    margin: 0 auto 24px;
  }

  .save-button {
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 800px;
    width: calc(100% - 80px);
  }
}

@media (min-width: 1024px) {
  .trip-header {
    max-width: 900px;
    padding: 32px 48px;
  }

  .day-tabs {
    max-width: 900px;
    padding: 0 48px;
  }

  .activities-container {
    max-width: 900px;
    padding: 0 48px;
  }

  .add-button {
    max-width: 900px;
    width: calc(100% - 96px);
  }

  .packlist {
    max-width: 900px;
    padding: 0 48px;
  }

  .save-button {
    max-width: 900px;
    width: calc(100% - 96px);
  }

  .activity-slot {
    padding: 20px;
  }

  .packlist-card {
    padding: 24px;
  }
}

@media (min-width: 1200px) {
  .trip-header {
    max-width: 1000px;
  }

  .day-tabs {
    max-width: 1000px;
  }

  .activities-container {
    max-width: 1000px;
  }

  .add-button {
    max-width: 1000px;
  }

  .packlist {
    max-width: 1000px;
  }

  .save-button {
    max-width: 1000px;
  }
}

/* Center content on very large screens */
@media (min-width: 1400px) {
  .itinerary-page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .trip-header,
  .day-tabs,
  .activities-container,
  .add-button,
  .packlist,
  .save-button {
    width: 100%;
    max-width: 1200px;
  }

  .add-button,
  .save-button {
    width: calc(100% - 96px);
  }
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
  }

  .activities-container {
    padding: 0 16px;
  }

  .activity-slot {
    padding: 12px;
  }

  .time-label {
    font-size: 13px;
    min-width: 70px;
  }

  .time-select {
    padding: 6px 10px;
    font-size: 13px;
  }

  .activity-content {
    padding-left: 12px;
  }

  .title-input {
    font-size: 15px;
  }

  .desc-input {
    font-size: 13px;
  }

  .add-button,
  .save-button {
    width: calc(100% - 32px);
    margin-left: 16px;
    margin-right: 16px;
    padding: 14px;
    font-size: 15px;
  }

  .packlist {
    padding: 0 16px;
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
    font-size: 15px;
  }
}
</style>object
