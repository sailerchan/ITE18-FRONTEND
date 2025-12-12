<template>
  <div class="container">
    <div class="homepage-inner">
      <header class="header">
        <div class="greeting">{{ greeting }} <span class="user-name">{{ userName }}!</span></div>

        <div class="search-row">
          <div class="search-bar">
            <div class="location"><i class="fas fa-map-marker-alt"></i> {{ currentLocation }}</div>
            <div class="sep"></div>
            <div class="search-input">
              <input
                type="search"
                placeholder="Search destinations..."
                :value="searchQuery"
                @input="updateSearchQuery($event.target.value)"
              >
              <i class="fas fa-search"></i>
            </div>
          </div>
        </div>
      </header>

      <section class="hero-section">
        <div class="hero-card" @click="viewDestination(featuredDestination.id)">
          <img :src="featuredDestination.image" :alt="featuredDestination.name" class="hero-img">
          <div class="hero-tag">{{ featuredDestination.tag }}</div>
          <div class="hero-rating"><i class="fas fa-star"></i> {{ featuredDestination.rating }}</div>
          <div class="hero-gradient"></div>
          <div class="hero-text">
            <h3>{{ featuredDestination.name }}</h3>
            <p>{{ featuredDestination.description }}</p>
          </div>
        </div>
      </section>

      <section class="popular-destinations">
        <div class="section-header"><h4>Popular Destinations 🔥</h4></div>
        <div class="scroll-wrapper">
          <div
            class="destination-card"
            v-for="destination in filteredDestinations"
            :key="destination.id"
            @click="viewDestination(destination.id)"
          >
            <div class="thumb">
              <img :src="destination.image" :alt="destination.name">
              <div class="rating-pill"><i class="fas fa-star"></i> {{ destination.rating }}</div>
              <div class="details-overlay">
                <div class="destination-info">
                  <h5>{{ destination.name }}</h5>
                  <p>{{ destination.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    userName: {
      type: String,
      required: true
    },
    currentLocation: {
      type: String,
      required: true
    },
    searchQuery: {
      type: String,
      required: true
    },
    featuredDestination: {
      type: Object,
      required: true
    },
    destinations: {
      type: Array,
      required: true
    },
    filteredDestinations: {
      type: Array,
      required: true
    }
  },
  emits: ['update:search-query', 'view-destination'],
  data() {
    return {
      greeting: ''
    }
  },
  mounted() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = "Good morning,";
    else if (hour < 18) this.greeting = "Good afternoon,";
    else this.greeting = "Good evening,";
  },
  methods: {
    updateSearchQuery(value) {
      this.$emit('update:search-query', value);
    },
    viewDestination(id) {
      this.$emit('view-destination', id);
    }
  }
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --muted: #6c757d;
  --dark: #1a1a1a;
  --teal-1: #1f4f5a;
  --teal-2: #1f7a8c;
  --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

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
.homepage-inner {
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
  padding-bottom: 90px; /* Added padding for fixed nav */
}

/* Homepage Styles */
.header {
  padding: 36px 24px 12px;
  background: white;
}

.greeting {
  font-size: 20px;
  color: var(--muted);
  font-weight: 500;
}

.user-name {
  font-size: 26px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 10px;
}

.search-row {
  display: flex;
  align-items: center;
  padding: 0 24px 16px;
  background: white;
  margin-top: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #fff;
  border-radius: 30px;
  padding: 10px 16px;
  border: 1.5px solid #e9ecef;
  flex: 1;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all .3s ease;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 0px;
}

.search-bar:focus-within {
  border-color: var(--teal-1);
  box-shadow: 0 4px 16px rgba(56, 97, 102, 0.1);
}

.location {
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--teal-2);
  font-size: 12px;
  font-weight: 600;
}

.location i {
  color: var(--teal-2);
  font-size: 15px;
}

.sep {
  width: 1px;
  height: 28px;
  background: #e9ecef;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  color: #adb5bd;
  font-size: 12px;
}

.search-input input {
  border: 0;
  outline: 0;
  background: transparent;
  width: 100%;
  font-size: 12px;
  color: #495057;
}

.search-input input::placeholder {
  color: #adb5bd;
}

.search-input i {
  color: #ced4da;
  font-size: 15px;
}

/* Hero section */
.hero-section {
  padding: 16px 24px 12px;
  background: white;
}

/*Siargao Photo*/
.hero-card {
  width: 90%;
  margin: auto;
  height: 350px;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  background: #e9ecef;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: all .4s ease;
  -webkit-tap-highlight-color: transparent;
}

.hero-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--hover-shadow);
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.hero-tag {
  position: absolute;
  top: 16px;
  left: 20px;
  background: none;
  color: #fff;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.hero-rating {
  position: absolute;
  top: 16px;
  right: 20px;
  background: rgba(255, 255, 255, 0.279);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #fdfdfd;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0;
}

.hero-rating i {
  color: #ffc107;
  font-size: 13px;
}

.hero-gradient {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 65%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
}

.hero-text {
  position: absolute;
  left: 20px;
  bottom: 20px;
  color: #fff;
  right: 20px;
}

.hero-text h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
}

.hero-text p {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}

/* Popular destinations */
.popular-destinations {
  padding: 16px 24px 24px;
  background: white;
  flex: 1;
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-header h4 {
  font-size: 18px;
  font-weight: 800;
  color: var(--dark);
}

.scroll-wrapper {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.destination-card {
  min-width: 280px;
  width: 280px;
  height: 350px;
  background: #ffffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}

.destination-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--hover-shadow);
}

.thumb {
  position: relative;
  height: 100%;
  width: 100%;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.rating-pill {
  position: absolute;
  top: 16px;
  right: 20px;
  background: rgba(255, 255, 255, 0.279);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #fdfdfd;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0;
}

.rating-pill i {
  color: #ffc107;
}

.details-overlay {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: #847b7b4d;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.388);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.destination-card h5 {
  font-size: 15px;
  margin: 14px 14px 1px;
  margin-top: 5px;
  font-weight: 700;
  color: white;
}

.destination-card p {
  font-size: 12px;
  color: #ffffff;
  margin: 0 14px 5px;
}

/* Remove bottom-nav styles from here since it's now a separate component */

/* ================= RESPONSIVE BREAKPOINTS ================= */

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .header {
    padding: 24px 16px 8px;
  }

  .search-row {
    padding: 0 16px 12px;
  }

  .hero-section {
    padding: 12px 16px 8px;
  }

  .hero-card {
    width: 95%;
    height: 280px;
    border-radius: 20px;
  }

  .popular-destinations {
    padding: 12px 16px 20px;
  }

  .destination-card {
    min-width: 220px;
    height: 280px;
  }

  .greeting {
    font-size: 18px;
  }

  .user-name {
    font-size: 22px;
  }

  .hero-text h3 {
    font-size: 18px;
  }

  .hero-text p {
    font-size: 12px;
  }

  .section-header h4 {
    font-size: 16px;
  }

  .homepage-inner {
    padding-bottom: 80px; /* Adjusted for smaller screens */
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .header {
    padding: 28px 18px 10px;
  }

  .search-row {
    padding: 0 18px 14px;
  }

  .hero-section {
    padding: 14px 18px 10px;
  }

  .hero-card {
    width: 92%;
    height: 300px;
  }

  .popular-destinations {
    padding: 14px 18px 22px;
  }

  .destination-card {
    min-width: 240px;
    height: 300px;
  }

  .homepage-inner {
    padding-bottom: 85px;
  }
}

/* Medium Phones (375px - 414px) - Standard modern phones */
@media (min-width: 375px) and (max-width: 414px) {
  .header {
    padding: 32px 20px 12px;
  }

  .search-row {
    padding: 0 20px 16px;
  }

  .hero-section {
    padding: 16px 20px 12px;
  }

  .hero-card {
    width: 90%;
    height: 320px;
  }

  .popular-destinations {
    padding: 16px 20px 24px;
  }

  .destination-card {
    min-width: 260px;
    height: 320px;
  }

  .homepage-inner {
    padding-bottom: 90px;
  }
}

/* Large Phones (415px - 767px) - Large phones like iPhone Plus/Pro Max */
@media (min-width: 415px) and (max-width: 767px) {
  .header {
    padding: 36px 24px 14px;
  }

  .search-row {
    padding: 0 24px 18px;
  }

  .hero-section {
    padding: 18px 24px 14px;
  }

  .hero-card {
    width: 88%;
    height: 350px;
  }

  .popular-destinations {
    padding: 18px 24px 28px;
  }

  .destination-card {
    min-width: 280px;
    height: 350px;
  }

  .homepage-inner {
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

  .homepage-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 100px; /* Adjusted for tablet */
  }

  .header {
    padding: 40px 32px 16px;
  }

  .search-row {
    padding: 0 32px 20px;
  }

  .hero-section {
    padding: 20px 32px 16px;
  }

  .hero-card {
    width: 85%;
    height: 400px;
  }

  .popular-destinations {
    padding: 20px 32px 32px;
  }

  .destination-card {
    min-width: 300px;
    height: 380px;
  }

  .greeting {
    font-size: 22px;
  }

  .user-name {
    font-size: 28px;
  }

  .hero-text h3 {
    font-size: 24px;
  }

  .hero-text p {
    font-size: 14px;
  }

  .section-header h4 {
    font-size: 20px;
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

  .homepage-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 105px; /* Adjusted for larger tablet */
  }

  .header {
    padding: 44px 36px 18px;
  }

  .search-row {
    padding: 0 36px 22px;
  }

  .hero-section {
    padding: 22px 36px 18px;
  }

  .hero-card {
    width: 85%;
    height: 380px;
  }

  .popular-destinations {
    padding: 22px 36px 36px;
  }

  .destination-card {
    min-width: 280px;
    height: 360px;
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

  .homepage-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 110px; /* Adjusted for desktop */
  }

  .header {
    padding: 48px 40px 20px;
  }

  .hero-card {
    height: 400px;
  }

  .destination-card {
    min-width: 300px;
    height: 380px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .header {
    padding: 20px 16px 8px;
  }

  .search-row {
    padding: 0 16px 12px;
  }

  .hero-section {
    padding: 12px 16px 8px;
  }

  .hero-card {
    height: 280px;
  }

  .popular-destinations {
    padding: 12px 16px 20px;
  }

  .destination-card {
    min-width: 240px;
    height: 280px;
  }

  .greeting {
    font-size: 18px;
  }

  .user-name {
    font-size: 22px;
  }

  .homepage-inner {
    padding-bottom: 70px; /* Adjusted for landscape */
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .header {
    padding: 16px 12px 6px;
  }

  .hero-section {
    padding: 8px 12px 6px;
  }

  .hero-card {
    height: 240px;
  }

  .popular-destinations {
    padding: 8px 12px 16px;
  }

  .destination-card {
    min-width: 220px;
    height: 240px;
  }

  .greeting {
    font-size: 16px;
  }

  .user-name {
    font-size: 20px;
  }

  .hero-text h3 {
    font-size: 16px;
  }

  .hero-text p {
    font-size: 11px;
  }

  .homepage-inner {
    padding-bottom: 60px; /* Adjusted for very short screens */
  }
}

/* Fix for iOS zoom on input focus */
@media screen and (max-width: 767px) {
  .search-input input {
    font-size: 16px;
  }
}

/* Safe area insets for notched devices */
@supports (padding: max(0px)) {
  .container {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }

  .homepage-inner {
    border-radius: 24px 24px 0 0;
  }

  @media (min-width: 768px) {
    .homepage-inner {
      border-radius: 24px;
    }
  }
}

/* Ensure images don't overflow on very small screens */
img {
  max-width: 100%;
  height: auto;
}

/* Improve scrolling experience on mobile */
.scroll-wrapper {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

/* Fix for Android Chrome */
@media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .search-input input {
    font-size: 16px !important;
  }
}
</style>
