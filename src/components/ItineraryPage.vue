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
          <span class="detail-text">{{ tripDates }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">🏨</span>
          <span class="detail-text">{{ accommodationName }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">💰</span>
          <span class="detail-text">Total: PHP {{ totalPrice }}</span>
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
    <div class="button-container">
      <button class="add-button" @click="addActivity">Add Activity</button>
    </div>

    <!-- Packlist Section -->
    <div class="packlist-container">
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
    </div>

    <!-- Save Button -->
    <div class="button-container">
      <button class="save-button" @click="saveTrip">Save Trip</button>
    </div>
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
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}

/* Dark Header Card */
.trip-header {
  background-color: #1f4f5a;
  border-radius: 0 0 24px 24px;
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
  background-color: #1f4f5a;
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
  flex-direction: column;
  width: 100%;
}

.time-label {
  font-size: 14px;
  font-weight: 600;
  color: #1f4f5a;
  margin-bottom: 12px;
  width: 100%;
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
  max-width: 200px;
  box-sizing: border-box;
}

.activity-content {
  display: flex;
  border-left: 1px solid #e8e8e8;
  padding-left: 16px;
  width: 100%;
  box-sizing: border-box;
}

.activity-details {
  width: 100%;
}

.activity-input {
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  padding: 4px 0;
  font-size: 16px;
  box-sizing: border-box;
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
  margin-bottom: 24px;
}

.packlist {
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
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

.packlist-arrow {
  font-size: 20px;
  color: #666;
  cursor: pointer;
  user-select: none;
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
  font-size: 16px;
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
  font-size: 14px;
  flex-shrink: 0;
  user-select: none;
}

.packlist-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
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
  gap: 8px;
}

.packlist-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  user-select: none;
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
  font-size: 14px;
  flex-shrink: 0;
  user-select: none;
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
  font-size: 16px;
  box-sizing: border-box;
}

.add-category-btn:hover {
  background-color: #f0f7f9;
}

/* Save Button */
.save-button {
  width: 100%;
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
  display: block;
  box-sizing: border-box;
}

.save-button:hover {
  background-color: #164148;
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

  .activities-container,
  .button-container,
  .packlist {
    padding: 0 16px;
  }

  .activity-slot {
    padding: 12px;
  }

  .time-label {
    font-size: 13px;
  }

  .time-select {
    padding: 6px 10px;
    font-size: 13px;
    max-width: 150px;
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
    font-size: 15px;
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
    min-width: 100px;
  }

  .time-select {
    width: auto;
  }

  .activity-content {
    flex: 1;
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
  .packlist-checkbox,
  .packlist-arrow {
    min-height: 44px;
    min-width: 44px;
  }

  .back-arrow,
  .packlist-checkbox,
  .delete-category,
  .delete-item,
  .packlist-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time-select {
    padding: 12px;
    font-size: 16px;
  }

  .activity-input {
    font-size: 16px;
    padding: 8px 0;
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
