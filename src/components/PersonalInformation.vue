<template>
  <div class="container">
    <div class="card personal-info-card">
      <!-- I. Header Section -->
      <div class="header-section">
        <div class="nav-bar">
          <button class="back-button" @click="goBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 19l-7-7 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="screen-title">Personal Information</h1>
        </div>
        
        <div class="avatar-section">
          <div class="avatar-container">
            <div class="avatar-image">
              <img src="/images/profilepicture.png" alt="Profile Picture" class="profile-picture">
            </div>
            <button class="edit-photo">Edit Photo</button>
          </div>
        </div>
      </div>

      <!-- II. Main Content Area -->
      <div class="main-content">
        <div class="input-section">
          <!-- First Name Field -->
          <div class="input-group">
            <label class="input-label">First Name</label>
            <div class="input-field">
              <input type="text" value="Juan" class="input-text" readonly>
            </div>
          </div>

          <!-- Last Name Field -->
          <div class="input-group">
            <label class="input-label">Last Name</label>
            <div class="input-field">
              <input type="text" value="Dela Cruz" class="input-text" readonly>
            </div>
          </div>

          <!-- Email Field -->
          <div class="input-group">
            <label class="input-label">Email</label>
            <div class="input-field">
              <input type="email" value="juandelacruz@ite18.com" class="input-text" readonly>
            </div>
          </div>

          <!-- Location Field -->
          <div class="input-group">
            <label class="input-label">Location</label>
            <div class="input-field">
              <input type="text" value="Butuan City, Agusan del Sur" class="input-text" readonly>
            </div>
          </div>

          <!-- Save Button -->
          <button class="save-button" @click="handleSave">
            Save
          </button>

          <!-- Additional Options -->
          <div class="options-section">
            <div class="divider"></div>
            
            <!-- Connect with Facebook -->
            <div class="option-item" @click="connectFacebook">
              <div class="option-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#1877F2"/>
                  <path d="M16 8h-3c-.55 0-1 .45-1 1v3h4l-.5 4h-3.5v7h-4v-7H7v-4h3V9c0-2.21 1.79-4 4-4h3v3z" fill="white"/>
                </svg>
              </div>
              <span class="option-text">Connect with Facebook</span>
            </div>

            <!-- Delete Account -->
            <div class="option-item delete-option" @click="deleteAccount">
              <div class="option-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#666" stroke-width="2"/>
                  <path d="M10 11v6" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                  <path d="M14 11v6" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <span class="option-text">Delete account</span>
            </div>
          </div>
        </div>

        <!-- III. Promotional Banner -->
        <div class="promotion-banner">
          <p class="promotion-text">Unlock all features and get access to real time<br>updates to make smart travel even easier!</p>
        </div>
      </div>

      <!-- IV. Navigation Bar (Same as Profile Page) -->
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
          <button class="nav-item" :class="{ active: activeNav === 'profile' }">
            <i class="fas fa-user"></i>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInformation',
  data() {
    return {
      activeNav: 'profile'
    }
  },
  emits: ['go-back', 'save-changes', 'connect-facebook', 'delete-account', 'go-to-page'],
  methods: {
    goBack() {
      this.$emit('go-back')
    },

    goToPage(page) {
      this.activeNav = page === 'homepage' ? 'home' : 
                      page === 'trips' ? 'trips' : 
                      page === 'notifications' ? 'notifications' : 'profile';
      this.$emit('go-to-page', page)
    },
    
    handleSave() {
      this.$emit('save-changes')
    },
    
    connectFacebook() {
      this.$emit('connect-facebook')
    },
    
    deleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        this.$emit('delete-account')
      }
    }
  }
}
</script>

<style scoped>
/* Exact same container structure as profile page */
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

.personal-info-card {
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

/* I. Header Section */
.header-section {
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

.nav-bar {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  flex: 1;
  text-align: center;
  margin-right: 40px;
}

.avatar-section {
  display: flex;
  justify-content: center;
}

.avatar-container {
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
  margin-bottom: 10px;
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

.edit-photo {
  background: none;
  border: none;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
}

.edit-photo:hover {
  text-decoration: underline;
}

/* II. Main Content Area */
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

.input-section {
  max-width: 100%;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  padding-left: 5px;
}

.input-field {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 0 16px;
  background: white;
  transition: border-color 0.2s;
}

.input-field:focus-within {
  border-color: #0C3437;
}

.input-text {
  width: 100%;
  border: none;
  outline: none;
  padding: 14px 0;
  font-size: 15px;
  color: #999;
  background: transparent;
}

.input-text:focus {
  color: #333;
}

.save-button {
  width: 100%;
  background: #0C3437;
  border: none;
  border-radius: 12px;
  padding: 14px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 25px;
  transition: background-color 0.2s;
}

.save-button:hover {
  background: #0A2A2D;
}

.save-button:active {
  transform: translateY(1px);
}

/* Additional Options */
.options-section {
  margin-top: 20px;
}

.divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 20px 0;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 8px;
  margin-bottom: 8px;
}

.option-item:hover {
  background-color: #f8f9fa;
}

.option-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.option-text {
  font-size: 15px;
  color: #666;
  font-weight: 500;
}

.delete-option .option-text {
  color: #666;
}

/* III. Promotional Banner with Linear Gradient */
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

/* IV. Navigation Bar (Same as Profile Page) */
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

/* Exact same responsive breakpoints as profile page */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .header-section {
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

  .main-content {
    padding: 20px 12px 12px;
    border-radius: 20px 20px 0 0;
  }

  .input-text {
    padding: 12px 0;
    font-size: 14px;
  }

  .save-button {
    padding: 12px;
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
  .header-section {
    padding: 45px 20px 25px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .header-section {
    padding: 45px 24px 25px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }

  .personal-info-card {
    max-width: 768px;
    margin: 0 auto;
    border-radius: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .header-section {
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

  .personal-info-card {
    max-width: 500px;
    margin: 40px auto;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .header-section {
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
  .header-section {
    padding: 30px 20px 15px;
  }

  .avatar-image {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }

  .main-content {
    padding: 20px 12px 10px;
  }

  .input-text {
    padding: 12px 0;
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
  .header-section {
    padding: 25px 16px 12px;
  }

  .avatar-image {
    width: 45px;
    height: 45px;
    margin-bottom: 8px;
  }

  .main-content {
    padding: 16px 10px 8px;
  }

  .input-text {
    padding: 10px 0;
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

/* Smooth transitions */
.header-section,
.input-field,
.save-button,
.option-item,
.nav-item {
  transition: all 0.3s ease;
}

/* Focus states for accessibility */
.back-button:focus,
.edit-photo:focus,
.save-button:focus,
.option-item:focus,
.nav-item:focus {
  outline: 2px solid #0C3437;
  outline-offset: 2px;
}

.input-text:focus {
  outline: none;
}
</style>