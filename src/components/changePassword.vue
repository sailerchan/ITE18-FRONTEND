<template>
  <div class="container">
    <div class="change-password-inner">
      <!-- I. Header Section - UPDATED TO MATCH PERSONAL INFO PAGE -->
      <div class="header-section">
        <div class="nav-bar">
          <button class="back-button" @click="goBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" />
              <path
                d="M12 19l-7-7 7-7"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
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
                <button
                  type="button"
                  class="password-toggle"
                  @click="togglePasswordVisibility('old')"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      v-if="!showOldPassword"
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <circle
                      v-if="!showOldPassword"
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <path
                      v-if="showOldPassword"
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <line
                      v-if="showOldPassword"
                      x1="1"
                      y1="1"
                      x2="23"
                      y2="23"
                      stroke="#666"
                      stroke-width="2"
                    />
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
                <button
                  type="button"
                  class="password-toggle"
                  @click="togglePasswordVisibility('new')"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      v-if="!showNewPassword"
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <circle
                      v-if="!showNewPassword"
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <path
                      v-if="showNewPassword"
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <line
                      v-if="showNewPassword"
                      x1="1"
                      y1="1"
                      x2="23"
                      y2="23"
                      stroke="#666"
                      stroke-width="2"
                    />
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
                <button
                  type="button"
                  class="password-toggle"
                  @click="togglePasswordVisibility('confirm')"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      v-if="!showConfirmPassword"
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <circle
                      v-if="!showConfirmPassword"
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <path
                      v-if="showConfirmPassword"
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      stroke="#666"
                      stroke-width="2"
                    />
                    <line
                      v-if="showConfirmPassword"
                      x1="1"
                      y1="1"
                      x2="23"
                      y2="23"
                      stroke="#666"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Save Button positioned above navigation -->
        <div class="save-button-container">
          <button type="submit" class="save-button" @click="savePassword">Save Password</button>
        </div>
      </div>

      <!-- III. Navigation Bar - SAME AS HOMEPAGE -->
      <nav class="bottom-nav">
        <div class="nav-items-container">
          <button
            class="nav-item"
            :class="{ active: activeNav === 'home' }"
            @click="goToPage('homepage')"
          >
            <i class="fas fa-home"></i>
          </button>
          <button
            class="nav-item"
            :class="{ active: activeNav === 'trips' }"
            @click="goToPage('trips')"
          >
            <i class="fas fa-route"></i>
          </button>
          <button
            class="nav-item"
            :class="{ active: activeNav === 'notifications' }"
            @click="goToPage('notifications')"
          >
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
        confirmPassword: '',
      },
    }
  },
  emits: ['go-to-page'],
  methods: {
    goBack() {
      this.$emit('go-to-page', 'profile')
    },

    goToPage(page) {
      this.activeNav =
        page === 'homepage'
          ? 'home'
          : page === 'trips'
            ? 'trips'
            : page === 'notifications'
              ? 'notifications'
              : 'profile'
      this.$emit('go-to-page', page)
    },

    togglePasswordVisibility(field) {
      if (field === 'old') {
        this.showOldPassword = !this.showOldPassword
      } else if (field === 'new') {
        this.showNewPassword = !this.showNewPassword
      } else if (field === 'confirm') {
        this.showConfirmPassword = !this.showConfirmPassword
      }
    },

    savePassword() {
      // Handle password change logic here
      console.log('Password change attempted:', this.form)

      // Basic validation
      if (!this.form.oldPassword || !this.form.newPassword || !this.form.confirmPassword) {
        alert('Please fill in all fields')
        return
      }

      if (this.form.newPassword !== this.form.confirmPassword) {
        alert('New password and confirm password do not match')
        return
      }

      alert('Password changed successfully!')
      this.goBack()
    },
  },
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
.change-password-inner {
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

/* I. Header Section - UPDATED TO MATCH PERSONAL INFO PAGE */
.header-section {
  background: #0c3437;
  border-radius: 0 0 25px 25px;
  padding: 25px 20px 25px; /* Reduced from 45px 20px 25px */
  color: white;
  text-align: center;
  position: relative;
  z-index: 10;
  margin: 0;
  width: 100%;
  min-height: 160px; /* CHANGED: Increased from 120px to 160px to match Personal Info page */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers content vertically */
}

.nav-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* ADDED: Added margin-bottom to match Personal Info page spacing */
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.1);
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
  padding: 20px 15px 15px; /* Reduced from 25px 15px 15px */
  background: white;
  margin-top: -10px; /* Keep negative margin for rounded corner overlap */
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
  color: var(--muted);
  margin-bottom: 8px;
  padding-left: 5px;
}

.input-field {
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  padding: 0 16px;
  background: white;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  position: relative;
}

.input-field:focus-within {
  border-color: var(--teal-1);
  box-shadow: 0 0 0 3px rgba(31, 79, 90, 0.1);
}

.input-text {
  width: 100%;
  border: none;
  outline: none;
  padding: 14px 0;
  font-size: 15px;
  color: var(--dark);
  background: transparent;
  flex: 1;
}

.input-text::placeholder {
  color: #adb5bd;
}

.input-text:focus {
  color: var(--dark);
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
  color: var(--muted);
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  border-radius: 4px;
}

.password-toggle:hover {
  color: var(--dark);
  background: rgba(0, 0, 0, 0.05);
}

/* Save Button Container */
.save-button-container {
  padding: 0 15px;
  margin-top: auto;
  margin-bottom: 15px;
}

.save-button {
  width: 100%;
  background: #0c3437;
  border: none;
  border-radius: 12px;
  padding: 14px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.save-button:hover {
  background: #0a2a2d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(12, 52, 55, 0.2);
}

.save-button:active {
  transform: translateY(0);
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
  background: rgba(56, 97, 102, 0.1);
}
.nav-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

/* ================= RESPONSIVE BREAKPOINTS - SAME AS HOMEPAGE ================= */

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .header-section {
    padding: 20px 16px 20px; /* Reduced from 40px 16px 20px */
    border-radius: 0 0 20px 20px;
    min-height: 140px; /* ADJUSTED: Changed from 100px to 140px */
  }

  .screen-title {
    font-size: 16px;
  }

  .main-content {
    padding: 16px 12px 12px; /* Reduced from 20px 12px 12px */
    border-radius: 20px 20px 0 0;
    margin-top: -8px; /* Adjusted for smaller radius */
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

  .change-password-inner {
    padding-bottom: 80px;
  }

  .bottom-nav {
    padding: 12px 16px;
  }

  .password-toggle {
    padding: 2px;
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .header-section {
    padding: 22px 20px 22px; /* Reduced from 45px 20px 25px */
    border-radius: 0 0 22px 22px;
    min-height: 150px; /* ADJUSTED: Changed from 110px to 150px */
  }

  .change-password-inner {
    padding-bottom: 85px;
  }

  .main-content {
    margin-top: -8px;
  }
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .header-section {
    padding: 25px 20px 25px; /* Reduced from 45px 20px 25px */
    border-radius: 0 0 24px 24px;
    min-height: 160px; /* ADJUSTED: Changed from 120px to 160px */
  }

  .change-password-inner {
    padding-bottom: 90px;
  }

  .main-content {
    margin-top: -10px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .header-section {
    padding: 25px 24px 25px; /* Reduced from 45px 24px 25px */
    border-radius: 0 0 25px 25px;
    min-height: 160px; /* ADJUSTED: Changed from 120px to 160px */
  }

  .change-password-inner {
    padding-bottom: 95px;
  }

  .main-content {
    margin-top: -10px;
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

  .change-password-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 100px;
  }

  .header-section {
    border-radius: 24px 24px 0 0;
    padding: 25px 32px 25px; /* Reduced from 50px 32px 30px */
    min-height: 160px; /* ADJUSTED: Changed from 120px to 160px */
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 25px 24px 20px; /* Reduced from 30px 24px 20px */
    margin-top: 0; /* No negative margin on tablets */
  }

  .save-button-container {
    padding: 0 24px;
    margin-bottom: 20px;
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

  .change-password-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 105px;
  }

  .header-section {
    border-radius: 24px 24px 0 0;
    padding: 25px 36px 25px; /* Reduced from 50px 36px 30px */
    min-height: 160px; /* ADJUSTED: Changed from 120px to 160px */
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 25px 28px 20px; /* Reduced from 30px 28px 20px */
    margin-top: 0;
  }

  .save-button-container {
    padding: 0 28px;
    margin-bottom: 20px;
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

  .change-password-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    padding-bottom: 110px;
  }

  .header-section {
    border-radius: 24px 24px 0 0;
    padding: 25px 40px 25px; /* Reduced from 50px 40px 30px */
    min-height: 160px; /* ADJUSTED: Changed from 120px to 160px */
  }

  .main-content {
    border-radius: 0 0 24px 24px;
    padding: 25px 32px 20px; /* Reduced from 30px 32px 20px */
    margin-top: 0;
  }

  .save-button-container {
    padding: 0 32px;
    margin-bottom: 20px;
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
  .header-section {
    padding: 20px 20px 15px; /* Reduced from 30px 20px 15px */
    min-height: 140px; /* ADJUSTED: Changed from 100px to 140px */
    border-radius: 0 0 20px 20px;
  }

  .main-content {
    padding: 16px 12px 10px; /* Reduced from 20px 12px 10px */
    border-radius: 20px 20px 0 0;
    margin-top: -8px;
  }

  .input-text {
    padding: 12px 0;
  }

  .save-button-container {
    padding: 0 12px;
    margin-bottom: 10px;
  }

  .change-password-inner {
    padding-bottom: 70px;
  }

  .bottom-nav {
    padding: 10px 16px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .header-section {
    padding: 15px 16px 12px; /* Reduced from 25px 16px 12px */
    min-height: 120px; /* ADJUSTED: Changed from 90px to 120px */
    border-radius: 0 0 16px 16px;
  }

  .main-content {
    padding: 12px 10px 8px; /* Reduced from 16px 10px 8px */
    border-radius: 16px 16px 0 0;
    margin-top: -6px;
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

  .change-password-inner {
    padding-bottom: 60px;
  }

  .bottom-nav {
    padding: 8px 12px;
  }

  .nav-item i {
    font-size: 18px;
  }
}

/* Fix for iOS zoom on input focus */
@media screen and (max-width: 767px) {
  .input-text {
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

  .change-password-inner {
    border-radius: 0;
  }

  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }

  @media (min-width: 768px) {
    .change-password-inner {
      border-radius: 24px;
    }
  }
}

/* Fix for Android Chrome */
@media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .input-text {
    font-size: 16px !important;
  }
}
</style>
