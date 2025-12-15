<template>
  <div class="container">
    <div class="notification-inner">
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

      <!-- Bottom Navigation Bar - SAME AS HOMEPAGE -->
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
/* CSS Variables - SAME AS HOMEPAGE */
:root {
  --muted: #6c757d;
  --dark: #111827;
  --teal-1: #0c3437;
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
.notification-inner {
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

/* ===== HEADER ===== */
.page-header {
  display: flex;
  align-items: center;
  padding: 24px 20px 12px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--dark);
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
  color: var(--dark);
  margin: 0;
  margin-left: 8px;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
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
  max-width: 280px;
}

.notification-message h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--dark);
  line-height: 1.3;
}

.notification-message p {
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  color: var(--muted);
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

/* ================= RESPONSIVE BREAKPOINTS ================= */

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .page-header {
    padding: 20px 16px 10px;
  }

  .main-content {
    padding: 20px 16px;
  }

  .notification-image {
    width: 160px;
    height: 160px;
    filter: blur(1px) brightness(0.92);
    opacity: 0.8;
  }

  .notification-message {
    max-width: 260px;
  }

  .notification-message h2 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .notification-message p {
    font-size: 13px;
  }

  .notification-inner {
    padding-bottom: 80px;
  }

  .bottom-nav {
    padding: 12px 16px;
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .page-header {
    padding: 22px 18px 10px;
  }

  .main-content {
    padding: 20px 18px;
  }

  .notification-image {
    width: 170px;
    height: 170px;
  }

  .notification-message {
    max-width: 270px;
  }

  .notification-inner {
    padding-bottom: 85px;
  }
}

/* Medium Phones (375px - 414px) - Standard modern phones */
@media (min-width: 375px) and (max-width: 414px) {
  .page-header {
    padding: 24px 20px 12px;
  }

  .main-content {
    padding: 20px 20px;
  }

  .notification-image {
    width: 180px;
    height: 180px;
  }

  .notification-message {
    max-width: 280px;
  }

  .notification-inner {
    padding-bottom: 90px;
  }
}

/* Large Phones (415px - 767px) - Large phones like iPhone Plus/Pro Max */
@media (min-width: 415px) and (max-width: 767px) {
  .page-header {
    padding: 24px 24px 12px;
  }

  .main-content {
    padding: 20px 24px;
  }

  .notification-image {
    width: 200px;
    height: 200px;
  }

  .notification-message {
    max-width: 300px;
  }

  .notification-message h2 {
    font-size: 18px;
  }

  .notification-message p {
    font-size: 14px;
  }

  .notification-inner {
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

  .notification-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 100px;
  }

  .page-header {
    padding: 32px 32px 16px;
  }

  .main-content {
    padding: 20px 32px;
  }

  .notification-image {
    width: 220px;
    height: 220px;
    filter: blur(1.5px) brightness(0.97);
    opacity: 0.9;
  }

  .notification-message {
    max-width: 320px;
  }

  .notification-message h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .notification-message p {
    font-size: 15px;
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

  .notification-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 105px;
  }

  .page-header {
    padding: 36px 36px 18px;
  }

  .main-content {
    padding: 20px 36px;
  }

  .notification-image {
    width: 200px;
    height: 200px;
  }

  .notification-message {
    max-width: 320px;
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

  .notification-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 110px;
  }

  .page-header {
    padding: 40px 40px 20px;
  }

  .main-content {
    padding: 20px 40px;
  }

  .notification-image {
    width: 200px;
    height: 200px;
  }

  .notification-message {
    max-width: 320px;
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
    padding: 16px 16px 8px;
  }

  .main-content {
    padding: 16px 16px;
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

  .notification-message {
    max-width: 260px;
  }

  .notification-message h2 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .notification-message p {
    font-size: 13px;
  }

  .notification-inner {
    padding-bottom: 70px;
  }

  .bottom-nav {
    padding: 10px 16px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .page-header {
    padding: 12px 12px 6px;
  }

  .main-content {
    padding: 12px 12px;
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
    max-width: 240px;
  }

  .notification-message h2 {
    font-size: 15px;
    margin-bottom: 6px;
  }

  .notification-message p {
    font-size: 12px;
  }

  .notification-inner {
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

  .notification-inner {
    border-radius: 24px 24px 0 0;
  }

  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }

  @media (min-width: 768px) {
    .notification-inner {
      border-radius: 24px;
    }
  }
}

/* Fix for Android Chrome */
@media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  input, textarea {
    font-size: 16px !important;
  }
}
</style>
