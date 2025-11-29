<template>
  <div class="container">
    <div class="homepage-inner">
      <header class="header">
        <div class="greeting">{{ greeting }} </div>
        <div class="user-name">{{ userName }}!</div>

        <div class="search-row">
          <div class="search-bar">
            <div class="location"><i class="fas fa-map-marker-alt"></i> {{ currentLocation }}</div>
            <div class="sep"></div>
            <div class="search-input">
              <input type="search" placeholder="Search destinations..."
                     :value="searchQuery"
                     @input="$emit('update:search-query', $event.target.value)">
              <i class="fas fa-search"></i>
            </div>
          </div>
        </div>
      </header>

      <section class="hero-section">
        <div class="hero-card" @click="$emit('view-destination', featuredDestination.id)">
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
          <div class="destination-card" v-for="destination in filteredDestinations" :key="destination.id" @click="$emit('view-destination', destination.id)">
            <div class="thumb">
              <img :src="destination.image" :alt="destination.name">
                <div class="rating-pill"><i class="fas fa-star"></i> {{ destination.rating }}
                </div>
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

      <nav class="bottom-nav">
        <div class="nav-items-container">
          <button class="nav-item active" @click="handleNavClick('home')"><i class="fas fa-home"></i></button>
          <button class="nav-item" @click="handleNavClick('trips')"><i class="fas fa-route"></i></button>
          <button class="nav-item" @click="handleNavClick('notifications')"><i class="fas fa-bell"></i></button>
          <button class="nav-item" @click="handleNavClick('profile')"><i class="fas fa-user"></i></button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home_page',
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
  emits: [
    'update:search-query',
    'view-destination',
    'set-active-nav',
    'go-to-page'
  ],
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
    handleNavClick(navItem) {
      // Emit the set-active-nav event for the parent component
      this.$emit('set-active-nav', navItem);

      // If it's the trips nav item, also emit go-to-page event
      if (navItem === 'trips') {
        this.$emit('go-to-page', 'trips');
      }
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
}

/* Homepage Styles */
.header {
  padding: 36px 24px 12px;
  background: white;
}

.greeting {
  font-size: 15px;
  color: var(--muted);
  font-weight: 500;
}

.user-name {
  font-size: 26px;
  font-weight: 800;
  color: var(--dark);
}

.search-row {
    display: flex;
    align-items: center;
    padding: 0 24px 16px;
    background: white;
}
.search-bar {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #fff;
    border-radius: 30px;
    padding: 14px 16px;
    border: 1.5px solid #e9ecef;
    flex: 1;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: all .3s ease;
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 0px;
}
.search-bar:focus-within {
    border-color: var(--teal-1);
    box-shadow: 0 4px 16px rgba(56,97,102,0.1);
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
    margin:auto;
    height: 350px;
    border-radius: 40px;
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
    left: 16px;
    background: rgb(1, 41, 37);
    color: #fff;
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
}
.hero-rating {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #ffffff5f;
    padding: 8px 14px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: #2d3436;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
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
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
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
  color: rgba(255,255,255,0.9);
}

/* Popular destinations */
.popular-destinations {
  padding: 16px 24px 0px;
  background: white;
  flex: 1;
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
    padding-top: 20px;
    padding-bottom: 20px;
    scroll-behavior: smooth;
}
.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.destination-card {
    width: 8%;
    min-width: 300px;
    height: 350px;
    background: #ffffff33;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    flex: 1;
    cursor: pointer;
    transition: all .3s ease;
    -webkit-tap-highlight-color: transparent;
}
.destination-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--hover-shadow);
}
.thumb {
  position: relative;
  height: 350px;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-position: center;
}
.rating-pill {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ffffff5f;
    padding: 6px 10px;
    border-radius: 20px;
    font-weight: 700;
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 12px;
    margin-right: 10px;
    margin-top: 8px;
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

/* Bottom nav */
.bottom-nav {
    position: sticky;
    bottom: 0;
    background: white;
    border-top: 1px solid #e9ecef;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    margin-top: auto;
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

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .homepage-inner {
    border-radius: 20px 20px 0 0;
  }

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
    height: 420px;
  }

  .popular-destinations {
    padding: 20px 20px 100px;
  }

  .thumb {
    height: 200px;
  }

  .destination-card {
    min-width: 160px;
  }

  .bottom-nav {
    padding: 16px 20px;
  }

  .user-name {
    font-size: 24px;
  }

  .hero-text h3 {
    font-size: 20px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .homepage-inner {
    border-radius: 24px 24px 0 0;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .homepage-inner {
    border-radius: 24px 24px 0 0;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 20px 0;
  }

  .homepage-inner {
    max-width: 768px;
    margin: -50px auto 0 auto;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .hero-card {
    height: 480px;
  }

  .destination-card {
    min-width: 200px;
  }

  .thumb {
    height: 220px;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 40px 0;
  }

  .homepage-inner {
    max-width: 500px;
    margin: -60px auto 0 auto;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .hero-card {
    height: 450px;
  }

  .destination-card {
    min-width: 180px;
  }
}

/* Desktop (1367px and up) */
@media (min-width: 1367px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 40px 0;
  }

  .homepage-inner {
    max-width: 500px;
    margin: 0 auto;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .hero-card {
    height: 380px;
  }

  .thumb {
    height: 180px;
  }

  .header {
    padding: 24px 20px 12px;
  }

  .popular-destinations {
    padding: 16px 20px 80px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .hero-card {
    height: 320px;
  }

  .thumb {
    height: 160px;
  }

  .header {
    padding: 20px 16px 12px;
  }

  .popular-destinations {
    padding: 12px 16px 60px;
  }

  .user-name {
    font-size: 22px;
  }

  .hero-text h3 {
    font-size: 18px;
  }
}

/* Prevent zoom on iOS */
@media screen and (max-width: 767px) {
  .search-input input {
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

  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}
</style>
