<template>
  <div class="container">
    <div class="hero-banner">
      <img src="/images/image.png" alt="Tourmate" class="hero-image">
    </div>

    <div class="card sign-in-card">
      <div class="welcome-text">Create your <span>tourmate</span> account</div>
      <h2 class="card-title">Sign Up</h2>

      <form @submit.prevent="$emit('handle-signup')">
        <div class="form-group">
          <label class="form-label" for="fullname">Full Name</label>
          <div class="input-box">
            <input type="text" id="fullname" class="form-input" 
                   placeholder="Enter your full name" 
                   :value="signupForm.fullName" 
                   @input="$emit('update:fullName', $event.target.value)"
                   required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email Address</label>
          <div class="input-box">
            <input type="email" id="email" class="form-input" 
                   placeholder="Enter your email" 
                   :value="signupForm.email" 
                   @input="$emit('update:email', $event.target.value)"
                   required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <div class="input-box">
            <input type="password" id="password" class="form-input" 
                   :class="{ 'error': signupForm.passwordError, 'success': signupForm.password && !signupForm.passwordError }"
                   placeholder="Create a password" 
                   :value="signupForm.password" 
                   @input="$emit('update:password', $event.target.value)"
                   @blur="$emit('validate-password')"
                   required>
            <span class="error-message" v-if="signupForm.passwordError">{{ signupForm.passwordError }}</span>
            <span class="success-message" v-if="signupForm.password && !signupForm.passwordError">Password looks good!</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="confirmPassword">Confirm Password</label>
          <div class="input-box">
            <input type="password" id="confirmPassword" class="form-input" 
                   :class="{ 'error': signupForm.confirmPasswordError, 'success': signupForm.confirmPassword && !signupForm.confirmPasswordError }"
                   placeholder="Confirm your password" 
                   :value="signupForm.confirmPassword" 
                   @input="$emit('update:confirmPassword', $event.target.value)"
                   @blur="$emit('validate-confirm-password')"
                   required>
            <span class="error-message" v-if="signupForm.confirmPasswordError">{{ signupForm.confirmPasswordError }}</span>
            <span class="success-message" v-if="signupForm.confirmPassword && !signupForm.confirmPasswordError">Passwords match!</span>
          </div>
        </div>

        <button type="submit" class="sign-in-btn" :disabled="!isSignupFormValid">
          Create Account
        </button>
      </form>

      <div class="sign-up-section">
        Already have an account? 
        <a href="#" class="sign-up-link" @click="$emit('go-to-page', 'login')">Sign In</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  props: {
    signupForm: {
      type: Object,
      required: true
    },
    isSignupFormValid: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'update:fullName',
    'update:email',
    'update:password',
    'update:confirmPassword',
    'validate-password',
    'validate-confirm-password',
    'handle-signup',
    'go-to-page'
  ]
}
</script>

<style scoped>
/* Base styles matching your login page design */
.container {
  min-height: 100vh;
  background: #ffffff;
}

.hero-banner {
  height: 220px;
  background: linear-gradient(180deg, #F7F5ED 0%, #075258 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 30px;
}

.hero-image {
  max-width: 120px;
  max-height: 120px;
  object-fit: contain;
}

.sign-in-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 36px 28px;
  margin-top: -40px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 40px);
  box-sizing: border-box;
}

.welcome-text {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
}

.welcome-text span {
  color: #c83232;
  font-weight: 700;
  font-size: 30px;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 15px;
}

.input-box {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 16px;
  border: 1.5px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  background-color: #fafbfc;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #1f4f5a;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(31, 79, 90, 0.1);
}

.form-input::placeholder {
  color: #a0a4a8;
}

.form-input.error {
  border-color: #dc3545;
  background-color: #fff5f5;
}

.form-input.success {
  border-color: #28a745;
  background-color: #f8fff9;
}

.error-message {
  display: block;
  color: #dc3545;
  font-size: 14px;
  margin-top: 6px;
  font-weight: 500;
}

.success-message {
  display: block;
  color: #28a745;
  font-size: 14px;
  margin-top: 6px;
  font-weight: 500;
}

.sign-in-btn {
  width: 100%;
  background-color: #1f4f5a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sign-in-btn:hover:not(:disabled) {
  background-color: #163a43;
}

.sign-in-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.sign-up-section {
  text-align: center;
  margin-top: 30px;
  font-size: 15px;
  color: #333;
}

.sign-up-link {
  color: #c83232;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

/* Responsive adjustments */
/* Extra Small Mobile (under 320px) */
@media (max-width: 320px) {
  .hero-banner {
    height: 180px;
    padding-bottom: 20px;
  }

  .hero-image {
    max-width: 90px;
    max-height: 90px;
  }

  .sign-in-card {
    padding: 28px 20px;
    margin-top: -30px;
    width: calc(100% - 30px);
    min-height: auto;
  }

  .welcome-text {
    font-size: 22px;
  }

  .welcome-text span {
    font-size: 26px;
  }

  .card-title {
    font-size: 16px;
  }

  .form-input {
    padding: 12px 14px;
    font-size: 15px;
  }

  .sign-in-btn {
    padding: 14px;
    font-size: 15px;
  }

  .error-message,
  .success-message {
    font-size: 13px;
  }
}

/* Small Mobile (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .hero-banner {
    height: 190px;
    padding-bottom: 22px;
  }

  .hero-image {
    max-width: 95px;
    max-height: 95px;
  }

  .sign-in-card {
    padding: 30px 22px;
    margin-top: -32px;
    width: calc(100% - 32px);
  }

  .welcome-text {
    font-size: 22px;
  }

  .welcome-text span {
    font-size: 26px;
  }

  .form-input {
    padding: 14px;
  }

  .sign-in-btn {
    padding: 15px;
  }
}

/* Medium Mobile (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .hero-banner {
    height: 200px;
    padding-bottom: 25px;
  }

  .hero-image {
    max-width: 100px;
    max-height: 100px;
  }

  .sign-in-card {
    padding: 32px 24px;
    margin-top: -35px;
    width: calc(100% - 36px);
  }
}

/* Large Mobile (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .hero-banner {
    height: 210px;
    padding-bottom: 28px;
  }

  .hero-image {
    max-width: 110px;
    max-height: 110px;
  }

  .sign-in-card {
    padding: 34px 26px;
    margin-top: -38px;
    width: calc(100% - 40px);
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) {
  .hero-banner {
    height: 240px;
    padding-bottom: 35px;
  }

  .hero-image {
    max-width: 140px;
    max-height: 140px;
  }

  .sign-in-card {
    max-width: 400px;
    margin: -32px auto 0 auto;
    padding: 38px 30px;
  }

  .welcome-text {
    font-size: 26px;
  }

  .welcome-text span {
    font-size: 30px;
  }

  .card-title {
    font-size: 18px;
  }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
  .hero-banner {
    height: 260px;
    padding-bottom: 40px;
  }

  .hero-image {
    max-width: 150px;
    max-height: 150px;
  }

  .sign-in-card {
    max-width: 420px;
    margin: -35px auto 0 auto;
    padding: 40px 32px;
  }
}

/* Large Desktop (1440px and up) */
@media (min-width: 1440px) {
  .hero-banner {
    height: 280px;
    padding-bottom: 45px;
  }

  .hero-image {
    max-width: 160px;
    max-height: 160px;
  }

  .sign-in-card {
    max-width: 440px;
    margin: -40px auto 0 auto;
    padding: 42px 34px;
  }
}

/* Landscape orientation for mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .hero-banner {
    height: 160px;
    padding-bottom: 15px;
  }
  
  .sign-in-card {
    padding: 24px 20px;
    margin-top: -25px;
    min-height: auto;
  }
  
  .hero-image {
    max-width: 80px;
    max-height: 80px;
  }
}

/* Prevent zoom on iOS input focus */
@media screen and (max-width: 767px) {
  .form-input {
    font-size: 16px;
  }
}
</style>