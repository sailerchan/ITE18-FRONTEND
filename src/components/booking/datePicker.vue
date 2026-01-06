<template>
  <div class="container">
    <div class="date-picker-inner">
      <!-- Header with Back Button -->
      <header class="page-header">
        <button class="back-button" @click="$emit('go-to-page', 'destination-details')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Pick date</h1>
      </header>

      <!-- Manual Date Inputs -->
      <div class="manual-inputs">
        <div class="input-group">
          <label class="input-label">From Date</label>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="manualStartDate"
              placeholder="MM/DD/YYYY"
              @input="handleManualStartDateChange"
              @blur="validateStartDateFormat"
              class="date-input-field"
              maxlength="10"
            >
            <i class="fas fa-calendar-alt input-icon"></i>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">To Date</label>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="manualEndDate"
              placeholder="MM/DD/YYYY"
              @input="handleManualEndDateChange"
              @blur="validateEndDateFormat"
              class="date-input-field"
              maxlength="10"
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
          <div class="nav-arrow" @click="handleNextMonth" :class="{ disabled: isMaxMonth }">›</div>
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
import { useTripsStore } from '../../stores/trips'

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
      type: Date,
      default: null
    },
    selectedEnd: {
      type: Date,
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
    },
    maxMonthsAhead: {
      type: Number,
      default: 3
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
      today: new Date(),
      selectingStartDate: true,
      bookedDateRanges: [] // ✅ Store booked date ranges
    }
  },
  computed: {
    maxAllowedDate() {
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + this.maxMonthsAhead);
      return maxDate;
    },
    isCurrentMonth() {
      const now = new Date();
      return this.currentDate.getMonth() === now.getMonth() &&
             this.currentDate.getFullYear() === now.getFullYear();
    },
    isMaxMonth() {
      return this.currentDate.getMonth() === this.maxAllowedDate.getMonth() &&
             this.currentDate.getFullYear() === this.maxAllowedDate.getFullYear();
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
  mounted() {
    // ✅ Load booked dates when component mounts
    this.loadBookedDates()
  },
  methods: {
    // ✅ NEW: Load all booked date ranges from saved trips
    loadBookedDates() {
      const tripsStore = useTripsStore()
      const allTrips = [...tripsStore.upcomingTrips, ...tripsStore.pastTrips]

      this.bookedDateRanges = allTrips
        .filter(trip => trip.saved && trip.dates) // Only saved trips
        .map(trip => {
          try {
            const dateParts = trip.dates.split('-')
            const startStr = dateParts[0].trim()
            const endStr = dateParts[1].trim()

            // Parse year from end date
            const yearMatch = endStr.match(/\d{4}/)
            const year = yearMatch ? yearMatch[0] : new Date().getFullYear()

            // Create start and end dates
            const startDate = new Date(`${startStr}, ${year}`)
            const endDate = new Date(`${endStr}, ${year}`)

            return { startDate, endDate, tripId: trip.id }
          } catch (error) {
            console.error('Error parsing trip dates:', error)
            return null
          }
        })
        .filter(range => range !== null) // Remove invalid ranges
    },

    // ✅ NEW: Check if a date is booked
    isDateBooked(day) {
      const checkDate = new Date(this.currentYear, this.currentMonth, day)
      checkDate.setHours(0, 0, 0, 0)

      return this.bookedDateRanges.some(range => {
        const start = new Date(range.startDate)
        const end = new Date(range.endDate)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        return checkDate >= start && checkDate <= end
      })
    },

    // ✅ NEW: Check if manual date input is booked
    isManualDateBooked(dateString) {
      const date = this.parseDateString(dateString)
      if (!date) return false

      date.setHours(0, 0, 0, 0)

      return this.bookedDateRanges.some(range => {
        const start = new Date(range.startDate)
        const end = new Date(range.endDate)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        return date >= start && date <= end
      })
    },

    // ✅ NEW: Check if date range overlaps with booked dates
    isRangeOverlapping(startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      start.setHours(0, 0, 0, 0)
      end.setHours(0, 0, 0, 0)

      return this.bookedDateRanges.some(range => {
        const bookedStart = new Date(range.startDate)
        const bookedEnd = new Date(range.endDate)
        bookedStart.setHours(0, 0, 0, 0)
        bookedEnd.setHours(0, 0, 0, 0)

        // Check if ranges overlap
        return (start <= bookedEnd && end >= bookedStart)
      })
    },

    formatDateInput(value) {
      let cleaned = value.replace(/\D/g, '');

      if (cleaned.length >= 2) {
        cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
      }
      if (cleaned.length >= 5) {
        cleaned = cleaned.substring(0, 5) + '/' + cleaned.substring(5, 9);
      }

      return cleaned;
    },

    parseDateString(dateString) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1000) {
          const date = new Date(year, month - 1, day);
          if (date.getMonth() === month - 1 && date.getDate() === day) {
            return date;
          }
        }
      }
      return null;
    },

    isValidDate(dateString) {
      const date = this.parseDateString(dateString);
      if (!date || isNaN(date.getTime())) {
        return false;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) {
        return false;
      }

      if (date > this.maxAllowedDate) {
        return false;
      }

      // ✅ Check if date is booked
      if (this.isManualDateBooked(dateString)) {
        return false;
      }

      return true;
    },

    handleManualStartDateChange(event) {
      this.manualStartDate = this.formatDateInput(event.target.value);
    },

    handleManualEndDateChange(event) {
      this.manualEndDate = this.formatDateInput(event.target.value);
    },

    validateStartDateFormat() {
      if (this.manualStartDate.length === 10) {
        if (this.isManualDateBooked(this.manualStartDate)) {
          alert('This date is already booked for another trip. Please select a different date.');
          this.manualStartDate = '';
          return;
        }

        if (this.isValidDate(this.manualStartDate)) {
          const date = this.parseDateString(this.manualStartDate);
          this.$emit('select-date', date);

          if (this.manualEndDate) {
            const endDate = this.parseDateString(this.manualEndDate);
            if (endDate && endDate < date) {
              this.manualEndDate = '';
              this.$emit('select-date', null);
            }
          }
        } else {
          alert('Please enter a valid date in MM/DD/YYYY format within the allowed range');
          this.manualStartDate = '';
        }
      }
    },

    validateEndDateFormat() {
      if (this.manualEndDate.length === 10) {
        if (this.isManualDateBooked(this.manualEndDate)) {
          alert('This date is already booked for another trip. Please select a different date.');
          this.manualEndDate = '';
          return;
        }

        if (this.isValidDate(this.manualEndDate)) {
          const endDate = this.parseDateString(this.manualEndDate);
          const startDate = this.manualStartDate ? this.parseDateString(this.manualStartDate) : null;

          if (!startDate) {
            alert('Please select a start date first');
            this.manualEndDate = '';
            return;
          }

          if (endDate >= startDate) {
            // ✅ Check if the range overlaps with booked dates
            if (this.isRangeOverlapping(startDate, endDate)) {
              alert('This date range overlaps with an existing trip. Please select different dates.');
              this.manualEndDate = '';
              return;
            }
            this.$emit('select-date', endDate);
          } else {
            alert('End date must be after start date');
            this.manualEndDate = '';
          }
        } else {
          alert('Please enter a valid date in MM/DD/YYYY format within the allowed range');
          this.manualEndDate = '';
        }
      }
    },

    getDateClass(day) {
      const classes = [];
      const currentViewDate = new Date(this.currentYear, this.currentMonth, day);

      if (this.isToday(day)) {
        classes.push('today');
      }

      if (this.isPastDate(day)) {
        classes.push('past-date');
      }

      if (this.isBeyondMaxDate(day)) {
        classes.push('past-date');
      }

      // ✅ Add booked-date class
      if (this.isDateBooked(day)) {
        classes.push('booked-date');
      }

      if (this.selectedStart && this.isSameDate(currentViewDate, this.selectedStart)) {
        classes.push('range-start');
      } else if (this.selectedEnd && this.isSameDate(currentViewDate, this.selectedEnd)) {
        classes.push('range-end');
      } else if (this.selectedStart && this.selectedEnd &&
                 currentViewDate > this.selectedStart && currentViewDate < this.selectedEnd) {
        classes.push('range-mid');
      }

      return classes.join(' ');
    },

    isSameDate(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
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

    isBeyondMaxDate(day) {
      const selectedDate = new Date(this.currentYear, this.currentMonth, day);
      return selectedDate > this.maxAllowedDate;
    },

    handleDateClick(day) {
      // ✅ Prevent clicking on past, beyond max, or booked dates
      if (this.isPastDate(day) || this.isBeyondMaxDate(day) || this.isDateBooked(day)) {
        if (this.isDateBooked(day)) {
          alert('This date is already booked for another trip. Please select a different date.');
        }
        return;
      }

      const clickedDate = new Date(this.currentYear, this.currentMonth, day);

      // ✅ If selecting end date, check if range overlaps
      if (this.selectedStart && !this.selectedEnd) {
        if (this.isRangeOverlapping(this.selectedStart, clickedDate)) {
          alert('This date range overlaps with an existing trip. Please select different dates.');
          return;
        }
      }

      this.$emit('select-date', clickedDate);
    },

    handlePrevMonth() {
      if (!this.isCurrentMonth) {
        this.$emit('prev-month');
      }
    },

    handleNextMonth() {
      if (!this.isMaxMonth) {
        this.$emit('next-month');
      }
    },

    formatDateForDisplay(date) {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },

    calculateNights() {
      if (this.selectedStart && this.selectedEnd) {
        const timeDiff = this.selectedEnd.getTime() - this.selectedStart.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
      }
      return 0;
    },

    handleNextClick() {
      if (this.selectedStart && this.selectedEnd) {
        // ✅ Final check before proceeding
        if (this.isRangeOverlapping(this.selectedStart, this.selectedEnd)) {
          alert('This date range overlaps with an existing trip. Please select different dates.');
          return;
        }
        this.$emit('go-to-accommodation');
      } else {
        alert('Please select both start and end dates');
      }
    }
  },
  watch: {
    selectedStart(newVal) {
      if (newVal) {
        this.manualStartDate = this.formatDateForDisplay(newVal);
      } else {
        this.manualStartDate = '';
      }
    },
    selectedEnd(newVal) {
      if (newVal) {
        this.manualEndDate = this.formatDateForDisplay(newVal);
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

/* ===== HEADER ===== */
.page-header {
  display: flex;
  align-items: center;
  padding: 0 0 20px 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 20px;
  width: 100%;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #111827;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(0,0,0,0.03);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  margin-left: 8px;
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
.date-pill.booked-date {
  background: linear-gradient(135deg, #fca5a5 0%, #ef4444 100%);
  color: white;
  cursor: not-allowed;
  opacity: 0.7;
  position: relative;
}

.date-pill.booked-date::after {
  content: '✕';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.date-pill.booked-date:hover {
  background: linear-gradient(135deg, #fca5a5 0%, #ef4444 100%);
  opacity: 0.8;
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

  .page-header {
    padding: 0 0 15px 0;
    margin-bottom: 15px;
  }

  .page-title {
    font-size: 16px;
  }

  .manual-inputs {
    flex-direction: column;
    gap: 12px;
  }

  .input-group {
    width: 100%;
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

  .page-header {
    padding: 0 0 18px 0;
    margin-bottom: 18px;
  }

  .manual-inputs {
    gap: 12px;
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

  .page-header {
    padding: 0 0 20px 0;
    margin-bottom: 20px;
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

  .page-header {
    padding: 0 0 22px 0;
    margin-bottom: 22px;
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

  .page-header {
    padding: 0 0 24px 0;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 20px;
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

  .page-header {
    padding: 0 0 28px 0;
    margin-bottom: 28px;
  }

  .page-title {
    font-size: 22px;
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

  .page-header {
    padding: 0 0 32px 0;
    margin-bottom: 32px;
  }

  .page-title {
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

  .page-header {
    padding: 0 0 36px 0;
    margin-bottom: 36px;
  }

  .page-title {
    font-size: 26px;
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

  .page-header {
    padding: 0 0 40px 0;
    margin-bottom: 40px;
  }

  .page-title {
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

  .page-header {
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

  .action-buttons {
    padding-top: 15px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .date-picker-inner {
    padding: 12px 10px;
  }

  .page-header {
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

  .action-buttons {
    padding-top: 10px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .back-button,
  .nav-arrow,
  .date-pill,
  .btn {
    min-height: 44px;
    min-width: 44px;
  }

  .back-button,
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
  .date-grid {
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
