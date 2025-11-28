<template>
  <div class="container">
    <div class="card profile-card">
      <!-- I. Header and User Identity Section -->
      <div class="profile-header">
        <h1 class="screen-title">Profile</h1>
        
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#333" stroke-width="2"/>
                  <path d="M5 20v-2a7 7 0 0 1 14 0v2" stroke="#333" stroke-width="2"/>
                </svg>
              </div>
              <span class="setting-text">Personal Information</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>
            
            <div class="setting-item" @click="handleChangePassword">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <!-- Shield -->
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#333" stroke="#333" stroke-width="1"/>
                  <!-- Padlock -->
                  <rect x="9" y="11" width="6" height="7" rx="1" fill="white" stroke="white" stroke-width="0.5"/>
                  <path d="M11 11V9a1 1 0 0 1 2 0v2" stroke="white" stroke-width="1"/>
                </svg>
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

        <!-- IV. Session Management and Promotion -->
        <div class="section">
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
          
          <!-- Premium Feature Banner with Linear Gradient -->
          <div class="promotion-banner">
            <p class="promotion-text">
              Unlock all features and get access to real time<br>
              updates to make smart travel even easier!
            </p>
          </div>
        </div>
      </div>

      <!-- V. Navigation Bar -->
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
      default: 'Juan Dela Cruz'
    },
    currentLocation: {
      type: String,
      default: 'Butuan City, Philippines'
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

.profile-card {
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
}

/* I. Header and User Identity Section */
.profile-header {
  background: #0C3437;
  border-radius: 0 0 25px 25px;
  padding: 45px 20px 25px;
  color: white;
  text-align: center;
  position: relative;
  z-index: 10;
  margin: 0;
  width: 100%;
}

.screen-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 25px;
  letter-spacing: 0.5px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.user-name {
  font-size: 20px;
  font-weight: 700;
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
  padding: 25px 15px 15px;
  background: white;
  margin-top: -10px;
  border-radius: 25px 25px 0 0;
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.section {
  margin-bottom: 20px;
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
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
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
  margin-top: 15px;
  text-align: center;
  border: 1.5px solid #e1e5e9;
  position: relative;
  overflow: hidden;
}

.promotion-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(12, 52, 55, 0.9) 0%, 
    rgba(32, 137, 145, 0.9) 17%, 
    rgba(24, 106, 112, 0.9) 35%, 
    rgba(24, 119, 126, 0.9) 66%, 
    rgba(32, 137, 145, 0.9) 82%, 
    rgba(12, 52, 55, 0.9) 100%);
  z-index: 1;
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
}

/* V. Navigation Bar */
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

/* Enhanced avatar styling */
.avatar-image {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Exact same responsive breakpoints as login page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .profile-header {
    padding: 40px 16px 20px;
    border-radius: 0 0 20px 20px;
  }

  .screen-title {
    font-size: 16px;
    margin-bottom: 20px;
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
    padding: 20px 12px 12px;
    border-radius: 20px 20px 0 0;
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
  }

  .promotion-text {
    font-size: 13px;
    line-height: 1.3;
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
  .profile-header {
    padding: 45px 20px 25px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .profile-header {
    padding: 45px 24px 25px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }

  .profile-card {
    max-width: 768px;
    margin: 0 auto;
    border-radius: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    border-radius: 24px 24px 0 0;
    padding: 50px 32px 30px;
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 30px 24px 20px;
  }

  .promotion-banner {
    padding: 18px 24px;
  }

  .promotion-text {
    font-size: 15px;
    line-height: 1.4;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  .profile-card {
    max-width: 500px;
    margin: 40px auto;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    border-radius: 24px 24px 0 0;
    padding: 50px 36px 30px;
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 30px 28px 20px;
  }

  .promotion-banner {
    padding: 18px 24px;
  }

  .promotion-text {
    font-size: 15px;
    line-height: 1.4;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .profile-header {
    padding: 30px 20px 15px;
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
    padding: 20px 12px 10px;
  }

  .setting-item {
    padding: 12px;
  }

  .promotion-banner {
    padding: 12px 16px;
  }

  .promotion-text {
    font-size: 13px;
    line-height: 1.3;
  }

  .bottom-nav {
    padding: 12px 0 6px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .profile-header {
    padding: 25px 16px 12px;
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
    padding: 16px 10px 8px;
  }

  .setting-item {
    padding: 10px;
  }

  .setting-text {
    font-size: 14px;
  }

  .promotion-banner {
    padding: 10px 12px;
  }

  .promotion-text {
    font-size: 12px;
    line-height: 1.2;
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