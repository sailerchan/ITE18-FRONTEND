<template>
  <div class="container">
    <div class="card notification-card">
      <!-- Header with Back Button -->
      <header class="page-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Notification</h1>
      </header>
      
      <!-- Main Content -->
      <main class="main-content">
        <div class="notification-graphic">
          <div class="image-container">
            <img src="/images/no_notif.png" alt="No Notifications" class="notification-image">
            <div class="image-overlay"></div>
          </div>
        </div>
        
        <div class="notification-message">
          <h2>You have no notifications</h2>
          <p>You don't have any trip updates or notifications right now. Start planning your next adventure to receive trip alerts and updates here!</p>
        </div>
      </main>

      <!-- Bottom Navigation Bar -->
      <nav class="bottom-nav">
        <div class="nav-items-container">
          <button class="nav-item" @click="$emit('go-to-page', 'homepage')">
            <i class="fas fa-home"></i>
          </button>
          <button class="nav-item" @click="$emit('go-to-page', 'trips')">
            <i class="fas fa-route"></i>
          </button>
          <button class="nav-item active">
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
  name: 'NotificationPage',
  emits: [
    'go-back',
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

.notification-card {
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
  margin-bottom: 40px;
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

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

/* Notification Graphic Styles */
.notification-graphic {
  margin-bottom: 32px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.notification-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 20px;
  /* Blur effect */
  filter: blur(1.2px) brightness(0.95);
  opacity: 0.85;
  transition: all 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.2) 100%
  );
  border-radius: 20px;
  pointer-events: none;
}

/* Hover effect for better interaction */
.image-container:hover .notification-image {
  filter: blur(0.8px) brightness(1);
  opacity: 0.9;
}

/* Notification Message Styles */
.notification-message {
  text-align: center;
  max-width: 320px;
}

.notification-message h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px;
  color: #333;
  line-height: 1.3;
}

.notification-message p {
  font-size: 15px;
  margin: 0;
  line-height: 1.5;
  color: #666;
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
  .notification-card {
    padding: 32px 20px;
    margin-top: 0;
    border-radius: 24px 24px 0 0;
  }

  .page-header {
    margin-bottom: 32px;
  }

  .page-title {
    font-size: 18px;
  }

  .notification-image {
    width: 160px;
    height: 160px;
    filter: blur(1px) brightness(0.92);
    opacity: 0.8;
  }

  .notification-message {
    max-width: 280px;
  }

  .notification-message h2 {
    font-size: 18px;
    margin-bottom: 14px;
  }

  .notification-message p {
    font-size: 14px;
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
  .notification-card {
    padding: 36px 24px;
  }

  .notification-image {
    width: 180px;
    height: 180px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .notification-card {
    padding: 36px 28px;
  }

  .notification-image {
    width: 200px;
    height: 200px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }

  .notification-card {
    max-width: 768px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .notification-image {
    width: 220px;
    height: 220px;
    filter: blur(1.5px) brightness(0.97);
    opacity: 0.9;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  .notification-card {
    max-width: 500px;
    margin: 40px auto;
    padding: 44px 36px;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .notification-image {
    width: 200px;
    height: 200px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .notification-card {
    padding: 24px 20px;
    margin-top: 0;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .main-content {
    padding: 16px 0;
  }

  .notification-graphic {
    margin-bottom: 24px;
  }

  .notification-image {
    width: 140px;
    height: 140px;
    filter: blur(0.8px) brightness(0.9);
    opacity: 0.8;
  }

  .notification-message h2 {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .notification-message p {
    font-size: 14px;
  }

  .bottom-nav {
    padding: 12px 0 6px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .notification-card {
    padding: 20px 16px;
    margin-top: 0;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .main-content {
    padding: 12px 0;
  }

  .notification-graphic {
    margin-bottom: 20px;
  }

  .notification-image {
    width: 120px;
    height: 120px;
    filter: blur(0.6px) brightness(0.88);
    opacity: 0.75;
  }

  .notification-message {
    max-width: 260px;
  }

  .notification-message h2 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .notification-message p {
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