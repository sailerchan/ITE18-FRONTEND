<template>
  <div class="container">
    <div class="card trips-card">
      <h1 class="page-title">Trips</h1>
      
      <div class="section-header">
        <strong class="section-active">Upcoming</strong>
        <span class="section-tab">Post</span>
      </div>
      
      <div class="divider"></div>
      
      <div class="empty-state">
        <h2>No Upcoming Trips</h2>
        <p>Plan your next adventure and it'll show up here!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoUpcomingTrips'
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
  border-radius: 0;
  padding: 36px 24px;
  margin-top: 0;
  position: relative;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #333;
  text-align: left;
}

.section-header {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}

.section-active {
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

.section-tab {
  font-size: 17px;
  color: #666;
  font-weight: 500;
}

.divider {
  height: 1px;
  background: #e1e5e9;
  margin: 0 0 32px 0;
}

.empty-state {
  text-align: left;
  padding: 20px 0;
}

.empty-state h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.empty-state p {
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .trips-card {
    padding: 32px 20px;
  }

  .page-title {
    font-size: 22px;
    margin-bottom: 24px;
  }

  .section-header {
    gap: 20px;
    margin-bottom: 14px;
  }

  .section-active,
  .section-tab {
    font-size: 16px;
  }

  .divider {
    margin-bottom: 28px;
  }

  .empty-state h2 {
    font-size: 17px;
  }

  .empty-state p {
    font-size: 14px;
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
  }

  .page-title {
    margin-bottom: 20px;
  }

  .section-header {
    margin-bottom: 12px;
  }

  .divider {
    margin-bottom: 24px;
  }

  .empty-state {
    padding: 16px 0;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .trips-card {
    padding: 20px 16px;
  }

  .page-title {
    margin-bottom: 16px;
    font-size: 20px;
  }

  .section-header {
    margin-bottom: 10px;
  }

  .divider {
    margin-bottom: 20px;
  }

  .empty-state {
    padding: 12px 0;
  }

  .empty-state h2 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .empty-state p {
    font-size: 14px;
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