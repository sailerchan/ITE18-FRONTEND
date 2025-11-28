<template>
  <div class="container">
    <div class="card change-password-card">
      <!-- I. Header Section -->
      <div class="header-section">
        <div class="nav-bar">
          <button class="back-button" @click="goBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 19l-7-7 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="screen-title">Change Password</h1>
        </div>
      </div>

      <!-- II. Main Content Area -->
      <div class="main-content">
        <div class="input-section">
          <form class="password-form" @submit.prevent="savePassword">
            <!-- Old Password Field -->
            <div class="input-group">
              <label class="input-label">Old Password</label>
              <div class="input-field">
                <input
                  :type="showOldPassword ? 'text' : 'password'"
                  v-model="form.oldPassword"
                  class="input-text"
                  placeholder="Enter your old password"
                />
                <button type="button" class="password-toggle" @click="togglePasswordVisibility('old')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path v-if="!showOldPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" stroke-width="2"/>
                    <circle v-if="!showOldPassword" cx="12" cy="12" r="3" stroke="#666" stroke-width="2"/>
                    <path v-if="showOldPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#666" stroke-width="2"/>
                    <line v-if="showOldPassword" x1="1" y1="1" x2="23" y2="23" stroke="#666" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- New Password Field -->
            <div class="input-group">
              <label class="input-label">New Password</label>
              <div class="input-field">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  v-model="form.newPassword"
                  class="input-text"
                  placeholder="Enter your new password"
                />
                <button type="button" class="password-toggle" @click="togglePasswordVisibility('new')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path v-if="!showNewPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" stroke-width="2"/>
                    <circle v-if="!showNewPassword" cx="12" cy="12" r="3" stroke="#666" stroke-width="2"/>
                    <path v-if="showNewPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#666" stroke-width="2"/>
                    <line v-if="showNewPassword" x1="1" y1="1" x2="23" y2="23" stroke="#666" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="input-group">
              <label class="input-label">Confirm Password</label>
              <div class="input-field">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  class="input-text"
                  placeholder="Confirm your new password"
                />
                <button type="button" class="password-toggle" @click="togglePasswordVisibility('confirm')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path v-if="!showConfirmPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" stroke-width="2"/>
                    <circle v-if="!showConfirmPassword" cx="12" cy="12" r="3" stroke="#666" stroke-width="2"/>
                    <path v-if="showConfirmPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#666" stroke-width="2"/>
                    <line v-if="showConfirmPassword" x1="1" y1="1" x2="23" y2="23" stroke="#666" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Save Button positioned above navigation -->
        <div class="save-button-container">
          <button type="submit" class="save-button" @click="savePassword">
            Save Password
          </button>
        </div>
      </div>

      <!-- III. Navigation Bar -->
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
          <button class="nav-item" :class="{ active: activeNav === 'profile' }" @click="goToPage('profile')">
            <i class="fas fa-user"></i>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      activeNav: 'profile',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  emits: ['go-to-page'],
  methods: {
    goBack() {
      this.$emit('go-to-page', 'profile')
    },

    goToPage(page) {
      this.activeNav = page === 'homepage' ? 'home' : 
                      page === 'trips' ? 'trips' : 
                      page === 'notifications' ? 'notifications' : 'profile';
      this.$emit('go-to-page', page)
    },
    
    togglePasswordVisibility(field) {
      if (field === 'old') {
        this.showOldPassword = !this.showOldPassword;
      } else if (field === 'new') {
        this.showNewPassword = !this.showNewPassword;
      } else if (field === 'confirm') {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
    
    savePassword() {
      // Handle password change logic here
      console.log('Password change attempted:', this.form);
      
      // Basic validation
      if (!this.form.oldPassword || !this.form.newPassword || !this.form.confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      if (this.form.newPassword !== this.form.confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }
      
      alert('Password changed successfully!')
      this.goBack()
    }
  }
}
</script>

<style scoped>
/* Exact same container structure as profile and personal info pages */
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

.change-password-card {
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
  margin-bottom: 0;
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
  flex: 1;
}

.password-form {
  width: 100%;
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
  display: flex;
  align-items: center;
  position: relative;
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
  color: #333;
  background: transparent;
  flex: 1;
}

.input-text::placeholder {
  color: #999;
}

.input-text:focus {
  color: #333;
}

.password-toggle {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  color: #666;
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.password-toggle:hover {
  color: #333;
}

.password-toggle:focus {
  outline: 2px solid #0C3437;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Save Button Container */
.save-button-container {
  padding: 0 15px;
  margin-top: auto;
  margin-bottom: 15px;
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
  transition: background-color 0.2s;
}

.save-button:hover {
  background: #0A2A2D;
}

.save-button:active {
  transform: translateY(1px);
}

/* III. Navigation Bar */
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

/* Exact same responsive breakpoints as other pages */

/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .header-section {
    padding: 40px 16px 20px;
    border-radius: 0 0 20px 20px;
  }

  .screen-title {
    font-size: 16px;
  }

  .main-content {
    padding: 20px 12px 12px;
    border-radius: 20px 20px 0 0;
  }

  .input-text {
    padding: 12px 0;
    font-size: 14px;
  }

  .save-button-container {
    padding: 0 12px;
    margin-bottom: 12px;
  }

  .save-button {
    padding: 12px;
  }

  .nav-item {
    padding: 8px 12px;
  }

  .nav-item i {
    font-size: 20px;
  }

  .password-toggle {
    padding: 2px;
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

  .change-password-card {
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

  .save-button-container {
    padding: 0 24px;
    margin-bottom: 20px;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  .change-password-card {
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

  .save-button-container {
    padding: 0 28px;
    margin-bottom: 20px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .header-section {
    padding: 30px 20px 15px;
  }

  .main-content {
    padding: 20px 12px 10px;
  }

  .input-text {
    padding: 12px 0;
  }

  .save-button-container {
    padding: 0 12px;
    margin-bottom: 10px;
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

  .main-content {
    padding: 16px 10px 8px;
  }

  .input-text {
    padding: 10px 0;
  }

  .save-button-container {
    padding: 0 10px;
    margin-bottom: 8px;
  }

  .save-button {
    padding: 10px;
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
.nav-item,
.password-toggle {
  transition: all 0.3s ease;
}

/* Focus states for accessibility */
.back-button:focus,
.save-button:focus,
.nav-item:focus {
  outline: 2px solid #0C3437;
  outline-offset: 2px;
}

.input-text:focus {
  outline: none;
}
</style>