<template>
  <div class="container">
    <div class="card trips-card">
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

      <!-- Bottom Navigation Bar -->
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
/* Exact same container structure as login page */
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

.trips-card {
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

/* Header Styles */
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  margin-left: 15px;
  flex: 1;
}

/* Tab Navigation Styles */
.trip-tabs {
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  margin-bottom: 24px;
}

.tab-button {
  background: none;
  border: none;
  padding: 16px 0;
  margin-right: 32px;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.tab-button:hover {
  color: #333;
}

.tab-button.active {
  color: #1f4f5a;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #1f4f5a;
  border-radius: 3px 3px 0 0;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
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
  color: #333;
}

.no-trips-message p {
  font-size: 15px;
  margin: 0;
  line-height: 1.5;
  color: #666;
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

/* Bottom Navigation Styles */
.bottom-nav {
  background-color: #ffffff;
  border-top: 1px solid #e1e5e9;
  padding: 16px 0 8px;
  margin-top: auto;
}

.nav-items-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-item {
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.nav-item i {
  font-size: 22px;
}

.nav-item.active {
  color: #1f4f5a;
}

.nav-item:hover {
  color: #333;
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .trips-card {
    padding: 32px 20px;
    margin-top: 0;
    border-radius: 24px 24px 0 0;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 18px;
  }

  .tab-button {
    margin-right: 24px;
    font-size: 15px;
    padding: 14px 0;
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

  .nav-item {
    padding: 8px 12px;
  }

  .nav-item i {
    font-size: 20px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .trips-card {
    padding: 36px 24px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .trips-card {
    padding: 36px 28px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }

  .trips-card {
    max-width: 768px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  .trips-card {
    max-width: 500px;
    margin: 40px auto;
    padding: 44px 36px;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .trips-card {
    padding: 24px 20px;
    margin-top: 0;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .trip-tabs {
    margin-bottom: 20px;
  }

  .tab-button {
    padding: 12px 0;
  }

  .no-trips-message {
    padding: 16px;
  }

  .no-trips-message h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .no-trips-message p {
    font-size: 14px;
  }

  .bottom-nav {
    padding: 12px 0 6px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .trips-card {
    padding: 20px 16px;
    margin-top: 0;
  }

  .page-header {
    margin-bottom: 16px;
  }

  .trip-tabs {
    margin-bottom: 16px;
  }

  .tab-button {
    padding: 10px 0;
    font-size: 14px;
  }

  .no-trips-message {
    padding: 12px;
  }

  .no-trips-message h2 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .no-trips-message p {
    font-size: 13px;
  }

  .bottom-nav {
    padding: 10px 0 4px;
  }

  .nav-item {
    padding: 6px 10px;
  }

  .nav-item i {
    font-size: 18px;
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