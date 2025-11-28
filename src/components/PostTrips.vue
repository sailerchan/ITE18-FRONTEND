<template>
  <div class="container">
    <div class="card trips-card">
      <!-- Header -->
      <div class="header">
        <button class="back-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Trips</h1>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <button class="upcoming-btn" @click="goToUpcomingTrips">
          Upcoming
        </button>
        <h2 class="section-title">Post</h2>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- No Trips State -->
      <div class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-camera"></i>
        </div>
        <h3 class="empty-title">No Post Trips</h3>
        <p class="empty-description">
          You haven't completed any trips yet. Your post adventure will appear here.
        </p>
        <button class="share-memories-btn" @click="shareMemories">
          Share Memories
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostTrips',
  data() {
    return {
      postTrips: []
    }
  },
  methods: {
    goBack() {
      this.$emit('go-back')
    },
    goToUpcomingTrips() {
      this.$emit('go-to-upcoming-trips')
    },
    shareMemories() {
      this.$emit('share-memories')
    }
  }
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
}

/* Header */
.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.back-btn {
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
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.upcoming-btn {
  background: none;
  border: 2px solid #1f4f5a;
  color: #1f4f5a;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.upcoming-btn:hover {
  background: #1f4f5a;
  color: white;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* Divider */
.divider {
  height: 1px;
  background: #e1e5e9;
  margin: 0 0 32px 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border: 1.5px solid #e1e5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.empty-icon i {
  font-size: 32px;
  color: #666;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.empty-description {
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 32px 0;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

.share-memories-btn {
  width: 100%;
  max-width: 280px;
  background-color: #1f4f5a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 17px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
}

.share-memories-btn:hover {
  background-color: #163a43;
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .trips-card {
    padding: 32px 20px;
    margin-top: 0;
    border-radius: 24px 24px 0 0;
  }

  .page-title {
    font-size: 18px;
  }

  .section-title {
    font-size: 16px;
  }

  .upcoming-btn {
    padding: 8px 16px;
    font-size: 14px;
  }

  .divider {
    margin-bottom: 28px;
  }

  .empty-state {
    padding: 32px 16px;
  }

  .empty-icon {
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
  }

  .empty-icon i {
    font-size: 28px;
  }

  .empty-title {
    font-size: 18px;
  }

  .empty-description {
    font-size: 14px;
    margin-bottom: 28px;
  }

  .share-memories-btn {
    padding: 16px;
    font-size: 16px;
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

  .header {
    margin-bottom: 20px;
  }

  .divider {
    margin-bottom: 24px;
  }

  .empty-state {
    padding: 20px 16px;
  }

  .empty-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 16px;
  }

  .empty-icon i {
    font-size: 24px;
  }

  .empty-title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .empty-description {
    font-size: 14px;
    margin-bottom: 24px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .trips-card {
    padding: 20px 16px;
    margin-top: 0;
  }

  .header {
    margin-bottom: 16px;
  }

  .empty-state {
    padding: 16px 12px;
  }

  .empty-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 12px;
  }

  .empty-icon i {
    font-size: 20px;
  }

  .empty-title {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .empty-description {
    font-size: 13px;
    margin-bottom: 20px;
  }

  .share-memories-btn {
    padding: 14px;
    font-size: 15px;
  }
}

/* Prevent zoom on iOS input focus */
@media screen and (max-width: 767px) {
  /* No form inputs here, but keeping for consistency */
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