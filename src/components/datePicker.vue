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
}

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

.date-picker-inner {
 background: #ffffff;
  padding: 36px 24px;
  margin-top: 0;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
  display: flex;
  flex-direction: column;
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
}

/* Calendar Container */
.calendar-container {
  background: hwb(0 0% 100% / 0.017);
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  border: 1px solid #e8ecef;
  width: 95%;
  box-sizing: border-box;
  align-items: center;
  margin:auto;
  position:relative;
}

/* Month Navigation */
.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
  gap: 8px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Day Headers */
.day-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 12px;
  width: 100%;
}

.day-header {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #0c3437;
  padding: 8px 0;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Date Grid */
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  width: 100%;
}

.date-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.date-pill {
  width: 100%;
  height: 100%;
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
}

.summary-item {
  text-align: center;
  padding: 12px;
  background: none;
  border-radius: 8px;
  border: none;
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
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

.btn {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  min-width: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  }
  .header-subtitle {
    font-size: 20px;
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
    padding: 20px;
  }

  .date-picker-inner {
    max-width: 480px;
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .header-title {
    font-size: 17px;
  }

  .header-subtitle2 {
    font-size: 20px;
  }

  .calendar-container {
    padding: 20px;
  }

  .date-pill {
    font-size: 15px;
  }

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
  }

  .date-pill {
    font-size: 16px;
  }

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
    padding: 40px;
  }

  .date-picker-inner {
    max-width: 640px;
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }

  .header-title {
    font-size: 20px;
  }

  .header-subtitle {
    font-size: 16px;
  }

  .header-subtitle2 {
    font-size: 24px;
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
  .date-picker-inner {
    padding: 12px;
    gap: 12px;
  }

  .header-title {
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

/* Prevent zoom on iOS inputs */
@media screen and (max-width: 767px) {
  input,
  select,
  textarea,
  button {
    font-size: 16px;
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
}
</style>
