<template>
  <div class="container">
    <div class="date-picker-inner">
      <!-- Header -->
      <div class="date-header">
        <div class="back-arrow" @click="$emit('go-to-page', 'destination-details')"><i class="fas fa-arrow-left"></i></div>
        <h1 class="header-title">Pick date</h1>
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
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.container {
  width: 100vw;
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  position: relative;
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
  box-sizing: border-box;
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
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Manual Inputs */
.manual-inputs {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  width: 100%;
  flex-wrap: wrap;
}

.input-group {
  flex: 1;
  min-width: 140px;
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
  box-sizing: border-box;
  -webkit-appearance: none;
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


/* Calendar Container */
.calendar-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-top: 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e8ecef;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Month Navigation */
.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
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
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 0 5px;
  min-width: 0;
  word-break: break-word;
}

/* Day Headers */
.day-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 4px;
  width: 100%;
  box-sizing: border-box;
}

.day-header {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0c3437;
  padding: 8px 0;
  min-width: 0;
  word-break: break-word;
}

/* Date Grid */
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
}

.date-cell {

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  min-width: 0;
}

.date-pill {
  width: 100%;
  height: 100%;
  max-width: 44px;
  max-height: 44px;
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
  box-sizing: border-box;
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



/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding: 10px 0 0 0;
  width: 100%;
  box-sizing: border-box;
}

.btn {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  min-width: 0;
  min-height: 56px;
  box-sizing: border-box;
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

/* Extra Small Mobile (up to 320px) */
@media (max-width: 320px) {
  .date-picker-inner {
    padding: 16px 12px;
  }

  .header-title {
    font-size: 15px;
    padding-left: 32px;
    line-height: 1.2;
  }

  .back-arrow {
    font-size: 20px;
    width: 28px;
    height: 28px;
  }

  .manual-inputs {
    flex-direction: column;
    gap: 12px;
  }

  .input-group {
    width: 100%;
  }

  .date-range-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .date-display-separator {
    display: none;
  }

  .calendar-container {
    padding: 12px 8px;
  }

  .day-header {
    font-size: 12px;
    padding: 6px 0;
  }

  .date-pill {
    font-size: 12px;
    max-width: 36px;
    max-height: 36px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    padding: 14px;
    min-height: 48px;
  }
}

/* Small Mobile (321px - 375px) */
@media (min-width: 321px) and (max-width: 375px) {
  .date-picker-inner {
    padding: 18px 14px;
  }

  .header-title {
    font-size: 16px;
    padding-left: 36px;
  }

  .back-arrow {
    font-size: 22px;
    width: 30px;
    height: 30px;
  }

  .manual-inputs {
    gap: 12px;
  }

  .date-range-display {
    padding: 12px;
  }

  .calendar-container {
    padding: 16px 12px;
  }
  .date-grid{
    padding:0 8px;
  }
  .date-pill {

    font-size: 13px;
  }

  .btn {
    padding: 15px;
    min-height: 52px;
  }
}

/* Medium Mobile (376px - 424px) */
@media (min-width: 376px) and (max-width: 424px) {
  .date-picker-inner {
    padding: 20px 16px;
  }

  .header-title {
    font-size: 17px;
  }

  .calendar-container {
    padding: 18px 14px;
  }

  .date-pill {
    max-width: 42px;
    max-height: 42px;
    font-size: 14px;
  }
}

/* Large Mobile (425px - 767px) */
@media (min-width: 425px) and (max-width: 767px) {
  .date-picker-inner {
    padding: 22px 18px;
  }

  .header-title {
    font-size: 18px;
  }

  .manual-inputs {
    gap: 20px;
  }

  .calendar-container {
    padding: 20px 16px;
  }

  .date-pill {
    max-width: 44px;
    max-height: 44px;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    background: #f8f9fa;
    padding: 20px;
  }

  .date-picker-inner {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    border-radius: 20px;
    padding: 32px 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .header-title {
    font-size: 20px;
    padding-left: 45px;
  }

  .back-arrow {
    font-size: 26px;
    width: 35px;
    height: 35px;
  }

  .manual-inputs {
    gap: 25px;
  }

  .month-year {
    font-size: 20px;
  }

  .day-headers {
    gap: 8px;
  }

  .date-grid {
    gap: 6px;
  }

  .date-pill {
    max-width: 50px;
    max-height: 50px;
    font-size: 16px;
  }

  .date-range-display {
    padding: 18px;
  }

  .date-summary {
    padding: 24px;
  }

  .summary-details {
    gap: 20px;
  }

  .action-buttons {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Desktop (1024px - 1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
  .container {
    background: #f8f9fa;
    padding: 40px;
  }

  .date-picker-inner {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
    border-radius: 24px;
    padding: 40px 36px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
  }

  .header-title {
    font-size: 22px;
    padding-left: 50px;
  }

  .back-arrow {
    font-size: 28px;
    width: 40px;
    height: 40px;
  }

  .manual-inputs {
    gap: 30px;
  }

  .month-year {
    font-size: 22px;
  }

  .date-grid {
    gap: 8px;
  }

  .date-pill {
    max-width: 56px;
    max-height: 56px;
    font-size: 17px;
  }

  .date-range-display {
    padding: 20px;
  }

  .date-summary {
    padding: 28px;
  }

  .summary-details {
    gap: 25px;
  }

  .action-buttons {
    max-width: 550px;
  }

  .btn {
    padding: 18px;
    font-size: 17px;
    min-height: 60px;
  }
}

/* Large Desktop (1280px - 1439px) */
@media (min-width: 1280px) and (max-width: 1439px) {
  .container {
    padding: 50px;
  }

  .date-picker-inner {
    max-width: 800px;
    padding: 44px 40px;
  }

  .header-title {
    font-size: 24px;
  }

  .month-year {
    font-size: 24px;
  }

  .date-pill {
    max-width: 60px;
    max-height: 60px;
    font-size: 18px;
  }

  .action-buttons {
    max-width: 600px;
  }
}

/* Extra Large Desktop (1440px and above) */
@media (min-width: 1440px) {
  .container {
    padding: 60px;
  }

  .date-picker-inner {
    max-width: 900px;
    padding: 48px 44px;
    border-radius: 28px;
  }

  .header-title {
    font-size: 26px;
    padding-left: 55px;
  }

  .back-arrow {
    font-size: 30px;
    width: 45px;
    height: 45px;
  }

  .manual-inputs {
    gap: 35px;
  }

  .month-year {
    font-size: 26px;
  }

  .date-grid {
    gap: 10px;
  }

  .date-pill {
    max-width: 64px;
    max-height: 64px;
    font-size: 19px;
  }

  .action-buttons {
    max-width: 650px;
  }

  .btn {
    padding: 20px;
    font-size: 18px;
    min-height: 64px;
  }
}

/* Ultra Wide (1920px and above) */
@media (min-width: 1920px) {
  .date-picker-inner {
    max-width: 1000px;
    padding: 56px 48px;
  }

  .header-title {
    font-size: 28px;
  }

  .month-year {
    font-size: 28px;
  }

  .date-pill {
    max-width: 70px;
    max-height: 70px;
    font-size: 20px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .date-picker-inner {
    padding: 16px 12px;
  }

  .date-header {
    margin-bottom: 15px;
    padding-bottom: 15px;
  }

  .manual-inputs {
    margin-bottom: 15px;
  }

  .calendar-container {
    padding: 16px 12px;
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
    padding: 12px 10px;
  }

  .date-header {
    margin-bottom: 12px;
    padding-bottom: 12px;
  }

  .manual-inputs {
    margin-bottom: 12px;
  }

  .calendar-container {
    padding: 12px 8px;
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

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .back-arrow,
  .nav-arrow,
  .date-pill,
  .btn {
    min-height: 44px;
    min-width: 44px;
  }

  .back-arrow,
  .nav-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date-input-field,
  .btn {
    font-size: 16px;
  }

  .date-pill {
    max-width: 44px;
    max-height: 44px;
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

  .date-picker-inner {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
  }
}

/* Prevent horizontal scroll on all devices */
html, body, .container, .date-picker-inner {
  max-width: 100vw;
  overflow-x: hidden;
}

/* Ensure calendar fits on smallest screens */
@media (max-width: 320px) {
date-grid {
    gap: 4px;
    padding: 0;  
  }

  .day-header {
    font-size: 11px;
  }

  .date-pill {
    max-width: 32px;
    max-height: 32px;
    font-size: 11px;
  }
}

/* Fix for iOS date input zoom */
@media screen and (max-width: 767px) {
  .date-input-field {
    font-size: 16px;
  }
}
</style>
