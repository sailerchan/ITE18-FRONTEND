<template>
  <div class="container">
    <div class="date-picker-inner">
      <!-- Header -->
      <div class="date-header">
        <div class="back-arrow" @click="$emit('go-to-page', 'destination-details')">
          <i class="fas fa-arrow-left"></i>
          <h1>Plan Trip</h1>
        </div>
      </div>


      <h2 class="section-title">Popular places to stay in</h2>
      <span class="section-subtitle">{{ selectedDestinationName }}</span>

      <!-- Calendar -->
      <div class="calendar-container">
        <div class="month-nav">
          <div class="nav-arrow" @click="handlePrevMonth" :class="{ disabled: isCurrentMonth }">
            ‹
          </div>
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

      <!-- Trip Duration Summary -->
      <div class="date-summary">
        <div class="summary-header">
          <p>Trip Duration</p>
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
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-cancel" @click="$emit('go-to-page', 'homepage')">
          Cancel
        </button>
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

      if (this.isToday(day)) {
        classes.push('today');
      }

      if (this.isPastDate(day)) {
        classes.push('past-date');
      }

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
      if (this.isPastDate(day)) {
        return;
      }

      this.$emit('select-date', day);
    },

    handlePrevMonth() {
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
        if (date >= new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())) {
          const day = date.getDate();
          this.$emit('select-date', day);

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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
<<<<<<< HEAD
}

html, body {
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.container {
  width: 100vw;
=======
}

.container {
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
<<<<<<< HEAD
  overflow-x: hidden;
  position: relative;
=======
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

.date-picker-inner {
 background: #ffffff;
  padding: 36px 24px;
  margin-top: 0;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
<<<<<<< HEAD
  margin-top: 0;
  box-sizing: border-box;
=======
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
  display: flex;
  flex-direction: column;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

/* Header Styles */
.date-header {
  background: #ffffff;
  padding: 24px;
  border-bottom: 1px solid #e8ecef;
  position: relative;
  margin-bottom: 20px;
}

.back-arrow {
 position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
  color: #333;
  width: 30px;
  height:20px;
  display: flex;
  align-items: center;
  justify-content: left;
  -webkit-tap-highlight-color: transparent;
}


.back-arrow:active {
  background-color: #f0f0f0;
}

.date-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: left;
  margin-top: 10px;
  margin-left: 0;
  padding: 0 50px;
  padding-top: 4px;
}

.section-title{
  padding: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  color: #817d7d;
  margin: 0;
<<<<<<< HEAD
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

/* Date Range Display */
.date-inputs {
  margin-bottom: 25px;
  width: 100%;
  box-sizing: border-box;
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
  box-sizing: border-box;
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
  word-break: break-word;
}

.date-display-separator {
  color: #0c3437;
  font-size: 14px;
  flex-shrink: 0;
=======
  text-align: left;
}

.section-subtitle {
  padding: 0 0 16px 0;
  font-size: 22px;
  font-weight: 700;
  color: #0c3437;
  margin-top: -6px;
  margin-bottom: 0;
  text-align: left;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

/* Calendar Container */
.calendar-container {
  background: hwb(0 0% 100% / 0.017);
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  border: 1px solid #e8ecef;
<<<<<<< HEAD
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
=======
  width: 95%;
  box-sizing: border-box;
  align-items: center;
  margin:auto;
  position:relative;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

/* Month Navigation */
.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
<<<<<<< HEAD
  box-sizing: border-box;
=======
  gap: 8px;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

.nav-arrow {
  font-size: 20px;
  color: #0c3437;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
<<<<<<< HEAD
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
=======
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

.nav-arrow:active:not(.disabled) {
  background-color: #f0f0f0;
}

.nav-arrow.disabled {
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

.month-year {
  font-size: 14px;
  font-weight: 600;
  color: #0c3437;
  text-align: center;
  flex: 1;
<<<<<<< HEAD
  padding: 0 10px;
  min-width: 0;
  word-break: break-word;
=======
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

/* Day Headers */
.day-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
}

.day-header {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #0c3437;
  padding: 8px 0;
<<<<<<< HEAD
  min-width: 0;
  word-break: break-word;
=======
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

/* Date Grid */
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
<<<<<<< HEAD
  padding: 0 4px;
=======
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  width: 100%;
  box-sizing: border-box;
}

.date-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
<<<<<<< HEAD
  padding: 1px;
=======
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
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
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0c3437;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  background: #ededed40;
  border: none;
  padding: 0;
  position: relative;
  box-sizing: border-box;
}

.date-pill:active:not(.past-date) {
  background-color: #e0e0e0;
  transform: scale(0.95);
}

.date-pill.today {
  border: 2px solid #0c3437;
  background: white;
  font-weight: 700;
}

.date-pill.past-date {
  color: #bbb;
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.5;
}

.date-pill.range-start,
.date-pill.range-end {
  background-color: #0c3437;
  color: white;
  border-radius: 8px;
}

.date-pill.range-mid {
  background-color: #95bbb750;
  color: #0c3437;
  border-radius: 4px;
}

/* Date Summary */
.date-summary {
  background: none;
  width: 100%;
  box-sizing: border-box;
}

.summary-header {
  margin-bottom: 12px;
  color: #0c3437;
  font-weight: 600;
  font-size: 14px;
  padding:10px;
}

.summary-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

.summary-item {
  text-align: center;
<<<<<<< HEAD
  min-width: 0;
=======
  padding: 12px;
  background: none;
  border-radius: 8px;
  border: none;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

.summary-label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  font-weight: 500;
}

.summary-value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #0c3437;
  word-break: break-word;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 8px;
  width: 100%;
  box-sizing: border-box;
<<<<<<< HEAD
=======
  font-size: 16px;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

.btn {
  flex: 1;
  padding: 16px;
  border: none;
<<<<<<< HEAD
  border-radius: 28px;
=======
  border-radius: 24px;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  min-width: 0;
<<<<<<< HEAD
  min-height: 56px;
  box-sizing: border-box;
=======
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
}

.btn-cancel {
  background-color: #f8f9fa;
  color: #666;
  border: 1.5px solid #e1e5e9;
}

.btn-cancel:active {
  background-color: #e9ecef;
  transform: scale(0.98);
}

.btn-next {
  background-color: #0c3437;
  color: white;
}

.btn-next:active:not(:disabled) {
  background-color: #0a2b2e;
  transform: scale(0.98);
}

.btn-next:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

/* ========== RESPONSIVE BREAKPOINTS ========== */

<<<<<<< HEAD
/* Extra Small Mobile (up to 320px) */
@media (max-width: 320px) {
  .date-picker-inner {
    padding: 16px 12px;
  }

  .header-title {
    font-size: 15px;
    padding-left: 32px;
    line-height: 1.2;
=======
/* Extra Small Devices (320px - 374px) */
@media (max-width: 374px) {
  .date-picker-inner {
    padding: 16px 12px;
    gap: 16px;
  }

  .back-arrow{
    width: 24px;
    height: 24px;
    font-size: 18px;
  }

    .date-header h1 {
    font-size: 18px;
    padding: 0 36px;
  }
  .section-title {
    font-size: 16px;
    padding: 0 0 2px 0;
}
  .section-subtitle {
    font-size: 18px;
    padding: 0 0 12px 0;
    margin-top: -4px;
  }
  .back-arrow {
    width: 24px;
    height: 24px;
    font-size: 18px;
  }

  .calendar-container {
    border-radius: 10px;
  }

  .month-year {
    font-size: 14px;
  }

  .day-header {
    font-size: 11px;
    padding: 8px 0;
  }

  .date-pill {
    font-size: 13px;
    border-radius: 10px;
  }

  .btn {
    padding: 16px;
    font-size: 15px;
    height: 52px;
    border-radius: 26px;
  }

  .summary-item {
    padding: 14px;
  }

  .summary-value {
    font-size: 22px;
  }
}


/* Small Mobile (375px - 480px) */
@media (min-width: 375px) and (max-width: 480px) {
  .date-picker-inner {
    padding: 16px;
    gap: 16px;
  }

  .header-title {
    font-size: 16px;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  }
  .header-subtitle {
    font-size: 20px;
<<<<<<< HEAD
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

  .summary-details {
    grid-template-columns: 1fr;
    gap: 12px;
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

  .date-pill {
    max-width: 40px;
    max-height: 40px;
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
=======
    padding: 0 0 6px 0;
  }
  .header-subtitle2 {
    font-size: 24px;
    padding: 0 0 20px 0;
    margin-top: -20px;
  }

  .calendar-container {
    padding: 16px;
  }
}

/* Medium Mobile (481px - 600px) */
@media (min-width: 481px) and (max-width: 600px) {
  .container {
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
    padding: 20px;
  }

  .date-picker-inner {
<<<<<<< HEAD
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    border-radius: 20px;
    padding: 32px 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
=======
    max-width: 480px;
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  }

  .header-title {
    font-size: 17px;
  }

  .header-subtitle2 {
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

  .calendar-container {
    padding: 20px;
  }

  .day-headers {
    gap: 8px;
  }

<<<<<<< HEAD
  .date-grid {
    gap: 6px;
=======
  .btn {
    padding: 16px;
    height: 52px;
    font-size: 16px;
  }
}

/* Tablet Portrait (601px - 768px) */
@media (min-width: 601px) and (max-width: 768px) {
  .container {
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
  }

  .date-picker-inner {
    max-width: 560px;
    background: white;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  }

  .header-title {
    font-size: 18px;
  }

  .header-subtitle2 {
    font-size: 22px;
    margin-top: 4px;
  }

  .calendar-container {
    padding: 24px;
    margin-top: 16px;
  }

  .month-year {
    font-size: 16px;
  }

  .day-header {
    font-size: 13px;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  }

  .date-pill {
    max-width: 50px;
    max-height: 50px;
    font-size: 16px;
  }

<<<<<<< HEAD
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
=======
  .btn {
    padding: 16px 20px;
    height: 52px;
    font-size: 16px;
  }

  .summary-value {
    font-size: 18px;
  }
}

/* Tablet Landscape (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
    padding: 40px;
  }

  .date-picker-inner {
<<<<<<< HEAD
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
=======
    max-width: 640px;
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  }

  .header-title {
    font-size: 20px;
  }

  .header-subtitle {
    font-size: 16px;
  }

  .header-subtitle2 {
    font-size: 24px;
<<<<<<< HEAD
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
=======
    margin-top: 6px;
  }

  .calendar-container {
    padding: 28px;
    margin-top: 20px;
  }

  .date-grid {
    gap: 6px;
  }

  .date-pill {
    font-size: 16px;
    border-radius: 10px;
  }

  .btn {
    padding: 18px 24px;
    height: 56px;
    font-size: 17px;
    border-radius: 28px;
  }
}

/* Desktop (1025px and above) */
@media (min-width: 1025px) {
  .container {
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    min-height: 100vh;
  }

  .date-picker-inner {
    max-width: 720px;
    background: white;
    border-radius: 24px;
    padding: 48px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }

  .header-title {
    font-size: 22px;
  }

  .header-subtitle {
    font-size: 17px;
  }

  .header-subtitle2 {
    font-size: 28px;
    margin-top: 8px;
  }

  .calendar-container {
    padding: 32px;
    margin-top: 24px;
  }

  .month-year {
    font-size: 18px;
  }

  .day-header {
    font-size: 14px;
    padding: 10px 0;
  }

  .date-grid {
    gap: 8px;
  }

  .date-pill {
    font-size: 17px;
    border-radius: 12px;
  }

  .btn {
    height: 60px;
    font-size: 18px;
    border-radius: 30px;
    padding: 20px 28px;
  }

  .summary-header {
    font-size: 16px;
  }

  .summary-label {
    font-size: 13px;
  }

  .summary-value {
    font-size: 20px;
  }
}

/* Landscape orientation optimization */
@media (orientation: landscape) and (max-height: 600px) {
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  .date-picker-inner {
    padding: 12px;
    gap: 12px;
  }

  .header-title {
<<<<<<< HEAD
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
=======
    font-size: 15px;
    padding: 0 36px;
  }

  .header-subtitle,
  .header-subtitle2 {
    font-size: 14px;
  }

  .calendar-container {
    padding: 12px;
    margin-top: 4px;
  }

  .date-grid {
    gap: 3px;
  }

  .date-pill {
    font-size: 13px;
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
  }

  .date-summary {
    padding: 12px;
  }

  .summary-details {
    gap: 8px;
  }

  .summary-item {
    padding: 8px;
  }

  .btn {
    padding: 10px;
    height: 44px;
    font-size: 14px;
  }
}

/* Very small landscape screens */
@media (orientation: landscape) and (max-height: 400px) {
  .date-header {
    margin-bottom: 4px;
    padding-bottom: 8px;
  }

  .date-picker-inner {
    gap: 8px;
  }

  .calendar-container {
    margin: 0;
    padding: 8px;
  }

  .date-summary {
    display: none;
  }

  .btn {
    height: 40px;
    font-size: 13px;
  }
}

/* High-resolution devices */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .date-pill {
    border-width: 1.5px;
  }

  .btn-cancel {
    border-width: 1.5px;
  }
}

/* Safe area insets for notched devices */
@supports (padding: max(0px)) {
  .date-picker-inner {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
    padding-top: max(16px, env(safe-area-inset-top));
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }

  @media (max-width: 374px) {
    .date-picker-inner {
      padding-left: max(12px, env(safe-area-inset-left));
      padding-right: max(12px, env(safe-area-inset-right));
    }
  }
}

<<<<<<< HEAD
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
=======
/* Prevent zoom on iOS inputs */
@media screen and (max-width: 767px) {
  input,
  select,
  textarea,
  button {
>>>>>>> 5b57a8288f38df82c4159cd03d65c24a2037bc15
    font-size: 16px;
  }

  .date-pill {
    max-width: 44px;
    max-height: 44px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .date-pill,
  .nav-arrow,
  .back-arrow,
  .btn {
    min-height: 44px;
  }

  .date-pill {
    min-height: 40px;
  }
}

/* Print styles */
@media print {
  .container {
    background: white !important;
    box-shadow: none !important;
    padding: 0 !important;
  }

  .date-picker-inner {
    box-shadow: none !important;
    border: 1px solid #ddd !important;
  }

  .btn {
    display: none !important;
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
  .date-grid {
    gap: 2px;
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
