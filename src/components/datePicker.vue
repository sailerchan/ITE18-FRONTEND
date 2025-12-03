<template>
  <div class="container">
    <div class="date-picker-inner">
      <!-- Header -->
      <div class="date-header">
        <div class="back-arrow" @click="$emit('go-to-page', 'destination-details')">←</div>
        <h1 class="header-title">Pick date for your trip to {{ selectedDestinationName }}</h1>
      </div>

      <!-- Manual Date Inputs -->
      <div class="manual-inputs">
        <div class="input-group">
          <label class="input-label">From Date</label>
          <div class="input-wrapper">
            <input
              type="date"
              v-model="manualStartDate"
              :min="todayFormatted"
              @change="handleManualStartDateChange"
              class="date-input-field"
            >
            <i class="fas fa-calendar-alt input-icon"></i>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">To Date</label>
          <div class="input-wrapper">
            <input
              type="date"
              v-model="manualEndDate"
              :min="manualStartDate || todayFormatted"
              @change="handleManualEndDateChange"
              class="date-input-field"
            >
            <i class="fas fa-calendar-alt input-icon"></i>
          </div>
        </div>
      </div>

      <!-- Calendar -->
      <div class="calendar-container">
        <div class="month-nav">
          <div class="nav-arrow" @click="handlePrevMonth" :class="{ disabled: isCurrentMonth }">‹</div>
          <div class="month-year">{{ currentMonthYear }}</div>
          <div class="nav-arrow" @click="$emit('next-month')">›</div>
        </div>

        <div class="day-headers">
          <div class="day-header">Sun</div>
          <div class="day-header">Mon</div>
          <div class="day-header">Tue</div>
          <div class="day-header">Wed</div>
          <div class="day-header">Thu</div>
          <div class="day-header">Fri</div>
          <div class="day-header">Sat</div>
        </div>

        <div class="date-grid">
          <div v-for="(day, index) in calendarDays" :key="index" class="date-cell">
            <div v-if="day"
                 class="date-pill"
                 :class="getDateClass(day)"
                 @click="handleDateClick(day)">
              {{ day }}
            </div>
          </div>
        </div>
      </div>

      <!-- Date Range Display -->
      <div class="date-inputs">
        <div class="date-label">Selected Dates</div>
        <div class="date-range-display">
          <div class="date-display-item">
            <div class="date-display-label">From</div>
            <div class="date-display-value">{{ fromDateDisplay }}</div>
          </div>
          <div class="date-display-separator">
            <i class="fas fa-arrow-right"></i>
          </div>
          <div class="date-display-item">
            <div class="date-display-label">To</div>
            <div class="date-display-value">{{ toDateDisplay }}</div>
          </div>
        </div>
      </div>

      <!-- Selected Dates Summary -->
      <div v-if="selectedStart && selectedEnd" class="date-summary">
        <div class="summary-header">
          <i class="fas fa-calendar-check"></i>
          <span>Trip Duration</span>
        </div>
        <div class="summary-details">
          <div class="summary-item">
            <span class="summary-label">Nights:</span>
            <span class="summary-value">{{ calculateNights() }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Days:</span>
            <span class="summary-value">{{ calculateNights() + 1 }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Period:</span>
            <span class="summary-value">{{ selectedStart }} - {{ selectedEnd }} {{ currentMonthYear.split(' ')[0] }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-cancel" @click="$emit('go-to-page', 'homepage')">Cancel</button>
        <button
          class="btn btn-next"
          @click="handleNextClick"
          :disabled="!selectedStart || !selectedEnd">
          {{ selectedStart && selectedEnd ? 'Next' : 'Select Dates' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    selectedDestinationName: {
      type: String,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    },
    selectedStart: {
      type: Number,
      default: null
    },
    selectedEnd: {
      type: Number,
      default: null
    },
    currentMonthYear: {
      type: String,
      required: true
    },
    fromDateDisplay: {
      type: String,
      required: true
    },
    toDateDisplay: {
      type: String,
      required: true
    },
    calendarDays: {
      type: Array,
      required: true
    }
  },
  emits: [
    'prev-month',
    'next-month',
    'select-date',
    'go-to-accommodation',
    'go-to-page',
    'update-selected-dates'
  ],
  data() {
    return {
      manualStartDate: '',
      manualEndDate: '',
      today: new Date()
    }
  },
  computed: {
    todayFormatted() {
      return this.formatDateForInput(this.today);
    },
    isCurrentMonth() {
      const now = new Date();
      return this.currentDate.getMonth() === now.getMonth() &&
             this.currentDate.getFullYear() === now.getFullYear();
    },
    todayDate() {
      const now = new Date();
      return now.getDate();
    },
    currentMonth() {
      return this.currentDate.getMonth();
    },
    currentYear() {
      return this.currentDate.getFullYear();
    }
  },
  methods: {
    getDateClass(day) {
      const classes = [];

      // Check if this is today's date
      if (this.isToday(day)) {
        classes.push('today');
      }

      // Check if date is in the past
      if (this.isPastDate(day)) {
        classes.push('past-date');
      }

      // Check selection range
      if (day === this.selectedStart) {
        classes.push('range-start');
      } else if (day === this.selectedEnd) {
        classes.push('range-end');
      } else if (this.selectedStart && this.selectedEnd &&
                 day > this.selectedStart && day < this.selectedEnd) {
        classes.push('range-mid');
      }

      return classes.join(' ');
    },

    isToday(day) {
      const now = new Date();
      return day === now.getDate() &&
             this.currentMonth === now.getMonth() &&
             this.currentYear === now.getFullYear();
    },

    isPastDate(day) {
      const now = new Date();
      const selectedDate = new Date(this.currentYear, this.currentMonth, day);
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      return selectedDate < today;
    },

    handleDateClick(day) {
      // Don't allow clicking on past dates
      if (this.isPastDate(day)) {
        return;
      }

      this.$emit('select-date', day);
    },

    handlePrevMonth() {
      // Don't allow going to past months from current month
      if (!this.isCurrentMonth) {
        this.$emit('prev-month');
      }
    },

    formatDateForInput(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    handleManualStartDateChange() {
      if (this.manualStartDate) {
        const date = new Date(this.manualStartDate);
        // Only emit if date is not in the past
        if (date >= new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())) {
          const day = date.getDate();
          this.$emit('select-date', day);

          // If end date is before start date, clear it
          if (this.manualEndDate && new Date(this.manualEndDate) < date) {
            this.manualEndDate = '';
          }
        } else {
          this.manualStartDate = '';
          alert('Cannot select past dates');
        }
      }
    },

    handleManualEndDateChange() {
      if (this.manualEndDate) {
        const date = new Date(this.manualEndDate);
        const startDate = this.manualStartDate ? new Date(this.manualStartDate) : null;

        // Check if end date is after start date and not in the past
        if (!startDate || date >= startDate) {
          if (date >= new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())) {
            const day = date.getDate();
            this.$emit('select-date', day);
          } else {
            this.manualEndDate = '';
            alert('Cannot select past dates');
          }
        } else {
          this.manualEndDate = '';
          alert('End date must be after start date');
        }
      }
    },

    calculateNights() {
      if (this.selectedStart && this.selectedEnd) {
        return this.selectedEnd - this.selectedStart;
      }
      return 0;
    },

    handleNextClick() {
      if (this.selectedStart && this.selectedEnd) {
        this.$emit('go-to-accommodation');
      } else {
        alert('Please select both start and end dates');
      }
    }
  },
  watch: {
    selectedStart(newVal) {
      if (newVal) {
        const date = new Date(this.currentYear, this.currentMonth, newVal);
        this.manualStartDate = this.formatDateForInput(date);
      } else {
        this.manualStartDate = '';
      }
    },
    selectedEnd(newVal) {
      if (newVal) {
        const date = new Date(this.currentYear, this.currentMonth, newVal);
        this.manualEndDate = this.formatDateForInput(date);
      } else {
        this.manualEndDate = '';
      }
    }
  }
}
</script>

<style scoped>
/* Reset and Base Styles */
* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

/* Main Container */
.date-picker-inner {
  background: #ffffff;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  margin-top: 0;
}

/* Header */
.date-header {
  background: #ffffff;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #e8ecef;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.back-arrow {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
  color: #333;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: left;
  margin: 0;
  padding-left: 40px;
  width: 100%;
  line-height: 1.3;
}

/* Manual Inputs */
.manual-inputs {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  width: 100%;
}

.input-group {
  flex: 1;
  min-width: 0;
}

.input-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.date-input-field {
  width: 100%;
  padding: 16px 16px 16px 45px;
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  color: #333;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.date-input-field:focus {
  outline: none;
  border-color: #0c3437;
  background: white;
  box-shadow: 0 0 0 3px rgba(12, 52, 55, 0.1);
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #0c3437;
  font-size: 16px;
}

/* Date Range Display */
.date-inputs {
  margin-bottom: 25px;
  width: 100%;
}

.date-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
  width: 100%;
}

.date-range-display {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f8f9fa;
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  padding: 15px;
  width: 100%;
}

.date-display-item {
  flex: 1;
  min-width: 0;
}

.date-display-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.date-display-value {
  font-size: 16px;
  font-weight: 600;
  color: #0c3437;
}

.date-display-separator {
  color: #0c3437;
  font-size: 14px;
  flex-shrink: 0;
}

/* Calendar Container */
.calendar-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e8ecef;
  width: 100%;
}

/* Month Navigation */
.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
  width: 100%;
}

.nav-arrow {
  font-size: 24px;
  color: #0c3437;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}

.nav-arrow:hover:not(.disabled) {
  background-color: #f0f0f0;
}

.nav-arrow.disabled {
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

.month-year {
  font-size: 18px;
  font-weight: 600;
  color: #0c3437;
  text-align: center;
  flex: 1;
  padding: 0 10px;
}

/* Day Headers */
.day-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 4px;
  width: 100%;
}

.day-header {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0c3437;
  padding: 8px 0;
}

/* Date Grid */
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 0 4px;
  width: 100%;
}

.date-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
}

.date-pill {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 800;
  color: #0c3437;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  background: #ededed61;
  padding: 2px;
  border-radius: 8px;
  position: relative;
}

.date-pill:hover:not(.past-date) {
  background-color: #f0f0f0;
}

/* Today's date styling */
.date-pill.today {
  border: 2px solid #0c3437;
  background: white;
  font-weight: bold;
}

/* Past date styling */
.date-pill.past-date {
  color: #ccc;
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Date selection styling */
.date-pill.range-start,
.date-pill.range-end {
  background-color: #0c3437;
  color: white;
  border-radius: 8px;
}

.date-pill.range-mid {
  background-color: #95bbb799;
  backdrop-filter: blur(10px);
  color: #0C3437;
  padding: 5px;
  border-radius: 8px;
}

/* Date Summary */
.date-summary {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1.5px solid #e1e5e9;
  width: 100%;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #0c3437;
  font-weight: 600;
  font-size: 16px;
}

.summary-header i {
  font-size: 18px;
}

.summary-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
}

.summary-item {
  text-align: center;
}

.summary-label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.summary-value {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #0c3437;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding: 10px 0 0 0;
  width: 100%;
}

.btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 28px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  min-width: 0;
}

.btn-cancel {
  background-color: #f8f9fa;
  color: #666;
  border: 1.5px solid #e1e5e9;
  border-radius: 28px;
}

.btn-cancel:hover {
  background-color: #e9ecef;
}

.btn-next {
  background-color: #0C3437;
  color: white;
}

.btn-next:hover:not(:disabled) {
  background-color: #0A2B2E;
}

.btn-next:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

/* ========== RESPONSIVE BREAKPOINTS ========== */

/* Small Mobile (up to 359px) */
@media (max-width: 359px) {
  .date-picker-inner {
    padding: 20px 16px;
  }

  .header-title {
    font-size: 16px;
    padding-left: 35px;
  }

  .back-arrow {
    font-size: 20px;
    width: 25px;
    height: 25px;
  }

  .manual-inputs {
    flex-direction: column;
    gap: 12px;
  }

  .date-range-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .date-display-separator {
    display: none;
  }

  .summary-details {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .calendar-container {
    padding: 16px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }
}

/* Mobile (360px - 767px) */
@media (min-width: 360px) and (max-width: 767px) {
  .date-picker-inner {
    padding: 24px 20px;
    max-width: 100%;
  }

  /* Stack manual inputs on very narrow mobile */
  @media (max-width: 400px) {
    .manual-inputs {
      flex-direction: column;
      gap: 12px;
    }
  }

  /* Adjust calendar for smaller mobile */
  @media (max-width: 420px) {
    .calendar-container {
      padding: 16px 12px;
    }

    .day-headers,
    .date-grid {
      gap: 4px;
    }

    .day-header {
      font-size: 13px;
      padding: 6px 0;
    }

    .date-pill {
      font-size: 13px;
    }
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #f8f9fa;
  }

  .date-picker-inner {
    max-width: 700px;
    width: 100%;
    border-radius: 24px;
    padding: 40px 32px;
    margin: 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .header-title {
    font-size: 20px;
  }

  .month-year {
    font-size: 20px;
  }

  .date-pill {
    font-size: 15px;
  }

  .action-buttons {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Desktop (1024px - 1439px) */
@media (min-width: 1024px) and (max-width: 1439px) {
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
    background: #f8f9fa;
  }

  .date-picker-inner {
    max-width: 800px;
    width: 100%;
    border-radius: 24px;
    padding: 44px 40px;
    margin: 0;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
  }

  .header-title {
    font-size: 22px;
  }

  .month-year {
    font-size: 22px;
  }

  .date-pill {
    font-size: 16px;
  }

  .manual-inputs {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .calendar-container {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .summary-details {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .action-buttons {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Large Desktop (1440px and above) */
@media (min-width: 1440px) {
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px;
    background: #f8f9fa;
  }

  .date-picker-inner {
    max-width: 900px;
    width: 100%;
    border-radius: 28px;
    padding: 48px 44px;
    margin: 0;
    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.1);
  }

  .header-title {
    font-size: 24px;
  }

  .month-year {
    font-size: 24px;
  }

  .date-pill {
    font-size: 17px;
  }

  .manual-inputs {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    gap: 30px;
  }

  .calendar-container {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 24px;
  }

  .date-grid {
    gap: 8px;
  }

  .summary-details {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .action-buttons {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Extra Large Screens (1920px and above) */
@media (min-width: 1920px) {
  .date-picker-inner {
    max-width: 1000px;
    padding: 56px 48px;
  }

  .header-title {
    font-size: 26px;
  }

  .month-year {
    font-size: 26px;
  }

  .manual-inputs {
    max-width: 800px;
  }

  .calendar-container {
    max-width: 900px;
  }

  .summary-details {
    max-width: 800px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .date-picker-inner {
    padding: 20px 16px;
  }

  .calendar-container {
    padding: 16px;
    margin-bottom: 20px;
  }

  .date-inputs,
  .date-summary {
    margin-bottom: 20px;
  }

  .action-buttons {
    padding-top: 15px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .date-picker-inner {
    padding: 16px 12px;
  }

  .date-header {
    margin-bottom: 15px;
    padding-bottom: 15px;
  }

  .calendar-container {
    padding: 12px;
    margin-bottom: 15px;
  }

  .date-inputs,
  .date-summary {
    margin-bottom: 15px;
  }

  .action-buttons {
    padding-top: 10px;
  }
}

/* Prevent zoom on iOS inputs */
@media screen and (max-width: 767px) {
  .date-input-field,
  .btn {
    font-size: 16px;
  }
}

/* Safe area insets for notched devices */
@supports(padding: max(0px)) {
  .container {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-top: max(0px, env(safe-area-inset-top));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
