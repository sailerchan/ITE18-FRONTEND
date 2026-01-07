<template>
  <div class="container">
    <div class="profile-inner">

      <!-- I. Header and User Identity Section -->
<header class="page-header">
  <button class="back-button" @click="$emit('go-to-page', 'homepage')">
    <i class="fas fa-arrow-left"></i>
  </button>
  <h1 class="page-title">Profile</h1>
</header>

<div class="profile-header">
  <div class="user-info">
    <div class="avatar">
      <div class="avatar-image">
        <img src="/images/profilepicture.png" alt="Profile Picture" class="profile-picture">
      </div>
    </div>
    <h2 class="user-name">{{ userName }}</h2>
    <p class="user-location">{{ currentLocation }}</p>
  </div>
</div>

      <!-- II. Account Settings List -->
      <div class="main-content">
        <div class="section">
          <h3 class="section-title">Account Settings</h3>
          <div class="settings-list">
            <div class="setting-item" @click="handlePersonalInfo">
              <div class="icon-wrapper">
                <i class="fa-solid fa-pen-to-square"></i>
              </div>
              <span class="setting-text">Personal Information</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>

            <div class="setting-item" @click="handleChangePassword">
              <div class="icon-wrapper">
                <i class="fa-solid fa-lock"></i>
              </div>
              <span class="setting-text">Change Password</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- III. General Information and Feedback List -->
        <div class="section">
          <h3 class="section-title">Others</h3>
          <div class="settings-list">
            <div class="setting-item" @click="handleFAQ">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#333" stroke-width="2"/>
                  <text x="12" y="16" text-anchor="middle" fill="#333" font-size="12" font-weight="bold">?</text>
                </svg>
              </div>
              <span class="setting-text">FAQ</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>

            <div class="setting-item" @click="handleTerms">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#333" stroke-width="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="#333" stroke-width="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="#333" stroke-width="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="#333" stroke-width="2"/>
                  <polyline points="10,9 9,9 8,9" stroke="#333" stroke-width="2"/>
                </svg>
              </div>
              <span class="setting-text">Terms of Service</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>

            <div class="setting-item" @click="handleRateUs">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 15,9 22,9 16,14 19,21 12,17 5,21 8,14 2,9 9,9" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
                </svg>
              </div>
              <span class="setting-text">Rate Us</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- IV. Session Management -->
        <div class="section">
          <h3 class="section-title">Session</h3>
          <div class="settings-list">
            <div class="setting-item logout" @click="handleLogout">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#DC2626" stroke-width="2"/>
                  <polyline points="16,17 21,12 16,7" stroke="#DC2626" stroke-width="2"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="#DC2626" stroke-width="2"/>
                </svg>
              </div>
              <span class="setting-text logout-text">Log out</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- V. Promotion Banner -->
        <div class="section">
          <div class="promotion-banner">
            <p class="promotion-text">
              Unlock all features and get access to real time<br>
              updates to make smart travel even easier!
            </p>
          </div>
        </div>
      </div>

      <!-- VI. Navigation Bar - SAME AS HOMEPAGE -->
      <nav class="bottom-nav">
        <div class="nav-items-container">
          <button class="nav-item" :class="{ active: activeNav === 'home' }" @click="goToPage('homepage')">
            <i class="fas fa-home"></i>
          </button>
          <button class="nav-item" :class="{ active: activeNav === 'trips' }" @click="goToPage('trips')">
            <i class="fas fa-route"></i>
          </button>
          <button class="nav-item" :class="{ active: activeNav === 'notifications' }" @click="goToPage('notifications')">
            <i class="fas fa-bell"></i>
          </button>
          <button class="nav-item active">
            <i class="fas fa-user"></i>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  props: {
    userName: {
      type: String,
      default: ''
    },
    currentLocation: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeNav: 'profile'
    }
  },
  emits: ['go-to-page', 'logout', 'personal-info', 'change-password'],
  methods: {
    goToPage(page) {
      this.activeNav = page === 'homepage' ? 'home' :
                      page === 'trips' ? 'trips' :
                      page === 'notifications' ? 'notifications' : 'profile';
      this.$emit('go-to-page', page);
    },

    handlePersonalInfo() {
      this.$emit('personal-info');
    },

    handleChangePassword() {
      this.$emit('change-password');
    },

    handleFAQ() {
      alert('FAQ would open here');
    },

    handleTerms() {
      alert('Terms of Service would open here');
    },

    handleRateUs() {
      alert('Rate Us would open app store or rating dialog');
    },

    handleLogout() {
      if (confirm('Are you sure you want to log out?')) {
        this.$emit('logout');
        this.$emit('go-to-page', 'login');
      }
    }
  }
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

/* Base styles */
* {
  max-width: 100%;
  box-sizing: border-box;
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
.profile-inner {
  background: #ffffff;
  border-radius: 0;
  padding: 0;
  margin-top: 0;
  position: relative;
  box-shadow: none;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 90px; /* Added padding for fixed nav - SAME AS HOMEPAGE */
}

/* I. Header and User Identity Section - FIXED TO BE AT THE TOP */
.profile-header {
  background: none;
  padding: 25px 20px 25px;
  color: black;
  text-align: center;
  position: relative;
  z-index: 10;
  margin: 0;
  width: 100%;
  min-height: 160px; /* Added to ensure consistent height */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers content vertically */
}
.page-header {
  display: flex;
  align-items: center;
  padding: 24px 20px 12px; /* same as Trips */
  background: white;
  border-bottom: 1px solid #e5e7eb; /* separator line */
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
  margin-right: 8px;
}

.back-button:hover {
  background: rgba(0,0,0,0.03);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.profile-header {
  background: none;
  padding: 16px 20px 20px; /* no big top padding now */
  text-align: center;
  border-radius: 0 0 25px 25px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.avatar-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 1px solid black;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.profile-picture {
  width: 85%;
  height: 90%;
  object-fit: cover;
  border-radius: 50%;
}

.user-name {
  font-size: 20px;
  font-weight: 400;
  margin: 0 0 6px 0;
  letter-spacing: 0.3px;
}

.user-location {
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
  font-weight: 500;
}

/* II. Account Settings List & III. General Information */
.main-content {
  padding: 20px 15px 15px; /* Reduced top padding from 25px to 20px */
  background: white;
  margin-top: -10px; /* RESTORED negative margin to overlap the rounded corner */
  border-radius: 25px 25px 0 0; /* RESTORED rounded top corners */
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
}

.section {
  margin-bottom: 20px;
  width: 100%;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 12px;
  padding-left: 8px;
}

.settings-list {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid #e1e5e9;
  width: 100%;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  box-sizing: border-box;
}

.setting-item:hover {
  background-color: #f8f9fa;
}

.setting-item:active {
  background-color: #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.icon-wrapper {
  width: 22px;
  height: 22px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.setting-text {
  flex: 1;
  font-size: 15px;
  color: #333;
  font-weight: 500;
  word-wrap: break-word;
}

.chevron {
  flex-shrink: 0;
  margin-left: 8px;
}

/* IV. Session Management */
.logout .setting-text {
  color: #DC2626;
  font-weight: 600;
}

.logout-text {
  color: #DC2626 !important;
}

/* Premium Feature Banner with Linear Gradient */
.promotion-banner {
  background: linear-gradient(135deg, #0C3437 0%, #208991 17%, #186A70 35%, #18777E 66%, #208991 82%, #0C3437 100%);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 0;
  text-align: center;
  border: 1.5px solid #e1e5e9;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.promotion-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  white-space: normal;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
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

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .profile-header {
    padding: 20px 16px 20px;
    border-radius: 0 0 20px 20px; /* RESTORED rounded bottom */
  }

  .screen-title {
    font-size: 16px;
    margin-bottom: 15px;
  }

  .avatar-image {
    width: 60px;
    height: 60px;
    margin-bottom: 12px;
  }

  .user-name {
    font-size: 18px;
  }

  .user-location {
    font-size: 12px;
  }

  .main-content {
    padding: 16px 12px 12px;
    border-radius: 20px 20px 0 0; /* RESTORED rounded top */
    margin-top: -8px; /* Adjusted for smaller radius */
  }

  .setting-item {
    padding: 14px;
  }

  .setting-text {
    font-size: 14px;
  }

  .section-title {
    font-size: 14px;
  }

  .promotion-banner {
    padding: 14px 16px;
    margin: 0;
  }

  .promotion-text {
    font-size: 13px;
    line-height: 1.3;
  }

  .profile-inner {
    padding-bottom: 80px;
  }

  .bottom-nav {
    padding: 12px 16px;
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .profile-header {
    padding: 22px 20px 22px;
    border-radius: 0 0 22px 22px; /* Added rounded corners */
  }

  .profile-inner {
    padding-bottom: 85px;
  }

  .main-content {
    margin-top: -8px; /* Adjusted for proper overlap */
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .profile-header {
    padding: 25px 20px 25px;
    border-radius: 0 0 24px 24px; /* Added rounded corners */
  }

  .profile-inner {
    padding-bottom: 90px;
  }

  .main-content {
    margin-top: -10px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .profile-header {
    padding: 25px 24px 25px;
    border-radius: 0 0 25px 25px;
  }

  .profile-inner {
    padding-bottom: 95px;
  }

  .main-content {
    margin-top: -10px;
  }

  .promotion-banner {
    padding: 16px 20px;
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

  .profile-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 100px;
  }

  .profile-header {
    border-radius: 24px 24px 0 0;
    padding: 25px 32px 25px;
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 25px 24px 20px;
    margin-top: 0; /* No negative margin needed on tablets */
  }

  .promotion-banner {
    padding: 18px 24px;
    margin: 0;
  }

  .promotion-text {
    font-size: 15px;
    line-height: 1.4;
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

  .profile-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 105px;
  }

  .profile-header {
    border-radius: 24px 24px 0 0;
    padding: 25px 36px 25px;
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 25px 28px 20px;
    margin-top: 0;
  }

  .promotion-banner {
    padding: 18px 24px;
    margin: 0;
  }

  .promotion-text {
    font-size: 15px;
    line-height: 1.4;
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

  .profile-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 110px;
  }

  .profile-header {
    border-radius: 24px 24px 0 0;
    padding: 25px 40px 25px;
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 25px 32px 20px;
    margin-top: 0;
  }

  .promotion-banner {
    padding: 18px 24px;
    margin: 0;
  }

  .promotion-text {
    font-size: 15px;
    line-height: 1.4;
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
  .profile-header {
    padding: 20px 20px 15px;
    min-height: 140px;
    border-radius: 0 0 20px 20px;
  }

  .avatar-image {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }

  .user-name {
    font-size: 18px;
  }

  .user-location {
    font-size: 12px;
  }

  .main-content {
    padding: 16px 12px 10px;
    border-radius: 20px 20px 0 0;
    margin-top: -8px;
  }

  .setting-item {
    padding: 12px;
  }

  .promotion-banner {
    padding: 12px 16px;
    margin: 0;
  }

  .promotion-text {
    font-size: 13px;
    line-height: 1.3;
  }

  .profile-inner {
    padding-bottom: 70px;
  }

  .bottom-nav {
    padding: 10px 16px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .profile-header {
    padding: 15px 16px 12px;
    min-height: 120px;
    border-radius: 0 0 16px 16px;
  }

  .avatar-image {
    width: 45px;
    height: 45px;
    margin-bottom: 8px;
  }

  .user-name {
    font-size: 16px;
  }

  .main-content {
    padding: 12px 10px 8px;
    border-radius: 16px 16px 0 0;
    margin-top: -6px;
  }

  .setting-item {
    padding: 10px;
  }

  .setting-text {
    font-size: 14px;
  }

  .promotion-banner {
    padding: 10px 12px;
    margin: 0;
  }

  .promotion-text {
    font-size: 12px;
    line-height: 1.2;
  }

  .profile-inner {
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

  .profile-inner {
    border-radius: 0;
  }

  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }

  @media (min-width: 768px) {
    .profile-inner {
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

/* Ensure no horizontal scroll */
body, html {
  overflow-x: hidden;
}
</style>
