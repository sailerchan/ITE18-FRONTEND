<template>
  <div class="container">
    <div class="date-picker-inner">
      <!-- Header -->
      <div class="date-header">
        <div class="back-arrow" @click="$emit('go-to-page', 'homepage')">←</div>
        <h1 class="header-title">Pick date for {{ selectedDestinationName }}</h1>
      </div>

      <!-- Date Range Input -->
      <div class="date-inputs">
        <div class="date-input">
          <div class="date-label">From date</div>
          <div class="date-value">{{ fromDateDisplay }}</div>
        </div>
        <div class="date-input">
          <div class="date-label">To date</div>
          <div class="date-value">{{ toDateDisplay }}</div>
        </div>
      </div>

      <!-- Calendar -->
      <div class="calendar-container">
        <div class="month-nav">
          <div class="nav-arrow" @click="$emit('prev-month')">‹</div>
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
                 @click="$emit('select-date', day)">
              {{ day }}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-cancel" @click="$emit('go-to-page', 'homepage')">Cancel</button>
        <button class="btn btn-next" @click="$emit('go-to-accommodation')">Next</button>
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
    'go-to-page'
  ],
  methods: {
    getDateClass(day) {
      if (day === this.selectedStart) {
        return 'range-start'
      } else if (day === this.selectedEnd) {
        return 'range-end'
      } else if (this.selectedStart && this.selectedEnd &&
                 day > this.selectedStart && day < this.selectedEnd) {
        return 'range-mid'
      }
      return ''
    }
  }
}
</script>

<style scoped>
/* Exact same container as login page */
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

/* Same card styling as login page */
.date-picker-inner {
  background: #ffffff;
  border-radius: 24px 24px 0 0;
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

/* Header - same styling */
.date-header {
  background: #ffffff;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #e8ecef;
  position: relative;
  margin-bottom: 20px;
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
  text-align: center;
  margin: 0;
  padding: 0 40px;
}

/* Date Inputs - same spacing as login form */
.date-inputs {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
}

.date-input {
  flex: 1;
  background: #f8f9fa;
  border: 1.5px solid #e1e5e9;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}

.date-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
  font-weight: 500;
}

.date-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* Calendar Container */
.calendar-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e8ecef;
}

/* Month Navigation - using #0C3437 */
.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.nav-arrow {
  font-size: 24px;
  color:#0c3437;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
}

.nav-arrow:hover {
  background-color: #f0f0f0;
}

.month-year {
  font-size: 18px;
  font-weight: 600;
  color: #0c3437;
}

/* Day Headers */
.day-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 4px;
}

.day-header {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0c3437;
  padding: 8px 0;
  gap: 5px;
}

/* Date Grid - using #0C3437 for selected dates */
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 0 px;
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
  background:#ededed61;
  padding:2px;
  border-radius: 8px;

}

.date-pill:hover {
  background-color: #f0f0f0;
}

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

/* Action Buttons - using #0C3437 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding: 20px 0 0 0;
}

.btn {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.btn-cancel {
  background-color: #f8f9fa;
  color: #666;
  border: 1.5px solid #e1e5e9;
    border-radius: 30px;
}

.btn-cancel:hover {
  background-color: #e9ecef;
}

.btn-next {
  background-color: #0C3437;
  color: white;
}

.btn-next:hover {
  background-color: #0A2B2E;
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .date-picker-inner {
    padding: 32px 20px;
  }

  .header-title {
    font-size: 16px;
    padding: 0 36px;
  }

  .back-arrow {
    font-size: 20px;
    width: 28px;
    height: 28px;
  }

  .date-inputs {
    gap: 8px;
    margin-bottom: 24px;
  }

  .date-input {
    padding: 14px;
  }

  .calendar-container {
    padding: 16px;
    margin-bottom: 25px;
  }

  .month-nav {
    margin-bottom: 16px;
  }

  .month-year {
    font-size: 16px;
  }

  .nav-arrow {
    font-size: 20px;
    padding: 6px 10px;
  }

  .action-buttons {
    gap: 8px;
  }

  .btn {
    padding: 14px 20px;
    font-size: 15px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .date-picker-inner {
    padding: 36px 24px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .date-picker-inner {
    padding: 36px 28px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
    background: #f8f9fa;
  }

  .date-picker-inner {
    max-width: 768px;
    margin: -50px auto 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
    background: #f8f9fa;
  }

  .date-picker-inner {
    max-width: 500px;
    margin: -60px auto 0 auto;
    padding: 44px 36px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .date-picker-inner {
    padding: 24px 20px;
  }

  .date-header {
    padding: 0 0 16px 0;
    margin-bottom: 16px;
  }

  .date-inputs {
    margin-bottom: 20px;
  }

  .calendar-container {
    margin-bottom: 20px;
    padding: 16px;
  }

  .action-buttons {
    padding: 16px 0 0 0;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .date-picker-inner {
    padding: 20px 16px;
  }

  .date-header {
    padding: 0 0 12px 0;
    margin-bottom: 12px;
  }

  .date-inputs {
    margin-bottom: 16px;
  }

  .calendar-container {
    margin-bottom: 16px;
    padding: 12px;
  }

  .action-buttons {
    padding: 12px 0 0 0;
  }

  .btn {
    padding: 12px 16px;
    font-size: 14px;
  }
}

/* Prevent zoom on iOS */
@media screen and (max-width: 767px) {
  .date-value,
  .btn {
    font-size: 16px;
  }
}

/* Safe area insets for notched devices */
@supports(padding: max(0px)) {
  .container {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
