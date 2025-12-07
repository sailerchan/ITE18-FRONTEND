<template>
  <div class="container">
    <div class="trips-inner">
      <!-- Header with Back Button -->
      <header class="page-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Trips</h1>
      </header>

      <!-- Tab Navigation -->
      <div class="trip-tabs">
        <button
          class="tab-button"
          @click="setActiveTab('upcoming')"
          :class="{ active: activeTab === 'upcoming' }"
        >
          Upcoming
        </button>
        <button
          class="tab-button"
          @click="setActiveTab('past')"
          :class="{ active: activeTab === 'past' }"
        >
          Past
        </button>
      </div>

      <!-- Main Content -->
      <main class="main-content">
        <div v-if="activeTab === 'upcoming'" class="tab-content">
          <div class="no-trips-message">
            <h2>No Upcoming Trips</h2>
            <p>Plan your next adventure and it'll show up here!</p>
          </div>

          <!-- This would be populated when there are upcoming trips -->
          <div v-if="upcomingTrips.length > 0" class="trips-list">
            <div
              v-for="trip in upcomingTrips"
              :key="trip.id"
              class="trip-card"
            >
              <!-- Trip card content would go here -->
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'past'" class="tab-content">
          <div v-if="pastTrips.length === 0" class="no-trips-message">
            <h2>No Past Trips</h2>
            <p>Your past trips will appear here.</p>
          </div>

          <div v-else class="trips-list">
            <div
              v-for="trip in pastTrips"
              :key="trip.id"
              class="trip-card"
            >
              <!-- Trip card content would go here -->
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom Navigation Bar - SAME AS HOMEPAGE -->
      <nav class="bottom-nav">
        <div class="nav-items-container">
          <button class="nav-item" @click="$emit('go-to-page', 'homepage')">
            <i class="fas fa-home"></i>
          </button>
          <button class="nav-item active">
            <i class="fas fa-route"></i>
          </button>
          <button class="nav-item" @click="$emit('go-to-page', 'notifications')">
            <i class="fas fa-bell"></i>
          </button>
          <button class="nav-item" @click="$emit('go-to-page', 'profile')">
            <i class="fas fa-user"></i>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripsPage',
  data() {
    return {
      activeTab: 'upcoming',
      upcomingTrips: [],
      pastTrips: []
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  },
  emits: [
    'go-back',
    'plan-trip',
    'go-to-page'
  ]
}
</script>

<style scoped>
/* CSS Variables - SAME AS HOMEPAGE */
:root {
  --muted: #6c757d;
  --dark: #1a1a1a;
  --teal-1: #1f4f5a;
  --teal-2: #1f7a8c;
  --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Exact same container as homepage */
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

/* Same card styling as homepage */
.trips-inner {
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  padding: 0;
  margin-top: 0;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 90px; /* Added padding for fixed nav - SAME AS HOMEPAGE */
}

/* Header Styles */
.page-header {
  display: flex;
  align-items: center;
  padding: 36px 24px 20px;
  background: white;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--dark);
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(0,0,0,0.03);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--dark);
  margin: 0;
  margin-left: 15px;
  flex: 1;
}

/* Tab Navigation Styles - SAME STYLING AS HOMEPAGE COMPONENTS */
.trip-tabs {
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  margin: 0 24px 24px;
}

.tab-button {
  background: none;
  border: none;
  padding: 16px 0;
  margin-right: 32px;
  font-size: 16px;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.tab-button:hover {
  color: var(--dark);
}

.tab-button.active {
  color: var(--teal-1);
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--teal-1);
  border-radius: 3px 3px 0 0;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.tab-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-trips-message {
  text-align: center;
  max-width: 280px;
  padding: 20px;
}

.no-trips-message h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--dark);
}

.no-trips-message p {
  font-size: 15px;
  margin: 0;
  line-height: 1.5;
  color: var(--muted);
}

.trips-list {
  display: grid;
  gap: 16px;
  width: 100%;
}

.trip-card {
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  padding: 20px;
  background-color: #fafbfc;
}

/* Bottom nav - EXACT SAME AS HOMEPAGE */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #e9ecef;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    z-index: 1000;
}
.nav-items-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 420px;
}
.nav-item {
    border: 0;
    background: transparent;
    font-size: 20px;
    color: #adb5bd;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
  justify-content: center;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
}
.nav-item.active {
  color: var(--teal-1);
  background: rgba(56,97,102,0.1);
}
.nav-item:hover {
  background: rgba(0,0,0,0.03);
}

/* ================= RESPONSIVE BREAKPOINTS - SAME AS HOMEPAGE ================= */

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .page-header {
    padding: 24px 16px 16px;
  }

  .trip-tabs {
    margin: 0 16px 20px;
  }

  .tab-button {
    padding: 14px 0;
    margin-right: 24px;
    font-size: 15px;
  }

  .main-content {
    padding: 0 16px;
  }

  .no-trips-message {
    max-width: 240px;
    padding: 16px;
  }

  .no-trips-message h2 {
    font-size: 18px;
  }

  .no-trips-message p {
    font-size: 14px;
  }

  .trip-card {
    padding: 16px;
  }

  .trips-inner {
    padding-bottom: 80px;
  }

  .bottom-nav {
    padding: 12px 16px;
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .page-header {
    padding: 28px 18px 18px;
  }

  .trip-tabs {
    margin: 0 18px 22px;
  }

  .main-content {
    padding: 0 18px;
  }

  .trips-inner {
    padding-bottom: 85px;
  }
}

/* Medium Phones (375px - 414px) - Standard modern phones */
@media (min-width: 375px) and (max-width: 414px) {
  .page-header {
    padding: 32px 20px 20px;
  }

  .trip-tabs {
    margin: 0 20px 24px;
  }

  .main-content {
    padding: 0 20px;
  }

  .trips-inner {
    padding-bottom: 90px;
  }
}

/* Large Phones (415px - 767px) - Large phones like iPhone Plus/Pro Max */
@media (min-width: 415px) and (max-width: 767px) {
  .page-header {
    padding: 36px 24px 24px;
  }

  .trip-tabs {
    margin: 0 24px 28px;
  }

  .main-content {
    padding: 0 24px;
  }

  .trips-inner {
    padding-bottom: 95px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    background: #f8f9fa;
    padding: 20px;
    max-width: 768px;
    margin: 0 auto;
  }

  .trips-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 100px;
  }

  .page-header {
    padding: 40px 32px 28px;
  }

  .trip-tabs {
    margin: 0 32px 32px;
  }

  .main-content {
    padding: 0 32px;
  }

  .no-trips-message {
    max-width: 320px;
  }

  .no-trips-message h2 {
    font-size: 22px;
  }

  .no-trips-message p {
    font-size: 16px;
  }

  .bottom-nav {
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    background: #f8f9fa;
    padding: 30px;
    max-width: 500px;
    margin: 0 auto;
  }

  .trips-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 105px;
  }

  .page-header {
    padding: 44px 36px 32px;
  }

  .trip-tabs {
    margin: 0 36px 36px;
  }

  .main-content {
    padding: 0 36px;
  }

  .bottom-nav {
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

/* Desktop (1367px and up) */
@media (min-width: 1367px) {
  .container {
    background: #f8f9fa;
    padding: 40px;
    max-width: 500px;
    margin: 0 auto;
  }

  .trips-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 110px;
  }

  .page-header {
    padding: 48px 40px 36px;
  }

  .trip-tabs {
    margin: 0 40px 40px;
  }

  .main-content {
    padding: 0 40px;
  }

  .bottom-nav {
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .page-header {
    padding: 20px 16px 12px;
  }

  .trip-tabs {
    margin: 0 16px 20px;
  }

  .tab-button {
    padding: 12px 0;
  }

  .main-content {
    padding: 0 16px;
  }

  .no-trips-message {
    padding: 16px;
    max-width: 240px;
  }

  .no-trips-message h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .no-trips-message p {
    font-size: 14px;
  }

  .trips-inner {
    padding-bottom: 70px;
  }

  .bottom-nav {
    padding: 10px 16px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .page-header {
    padding: 16px 12px 8px;
  }

  .trip-tabs {
    margin: 0 12px 16px;
  }

  .tab-button {
    padding: 10px 0;
    font-size: 14px;
  }

  .main-content {
    padding: 0 12px;
  }

  .no-trips-message {
    padding: 12px;
    max-width: 200px;
  }

  .no-trips-message h2 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .no-trips-message p {
    font-size: 13px;
  }

  .trips-inner {
    padding-bottom: 60px;
  }

  .bottom-nav {
    padding: 8px 12px;
  }
}

/* Fix for iOS zoom on input focus */
@media screen and (max-width: 767px) {
  input, textarea {
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

  .trips-inner {
    border-radius: 24px 24px 0 0;
  }

  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }

  @media (min-width: 768px) {
    .trips-inner {
      border-radius: 24px;
    }
  }
}

/* Improve scrolling experience on mobile */
.scroll-wrapper {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

/* Fix for Android Chrome */
@media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  input, textarea {
    font-size: 16px !important;
  }
}
</style>
