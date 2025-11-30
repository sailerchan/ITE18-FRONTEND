<template>
  <div class="container">
    <div class="hero-banner">
      <img src="/images/logos/girlvector.png" alt="Girl with luggage" class="hero-image">
    </div>

    <div class="card sign-in-card">
      <div class="welcome-text">Create an Account</div>
      <h2 class="card-title">Join now and start planning you trip.</h2>

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

           <div class="divider">
        <div class="divider-line"></div>
        <div class="divider-text">or continue with</div>
        <div class="divider-line"></div>
      </div>

      <div class="social-buttons">
        <button class="social-btn" @click="$emit('social-login', 'google')">
           <img src="/images/logos/icon-google.svg" alt="Google" class="social-icon">

        </button>
        <button class="social-btn" @click="$emit('social-login', 'apple')">
         <img src="/images/logos/icon-apple.webp" alt="Apple" class="social-icon">

        </button>
      </div>

      <div class="sign-up-section">
        Already have an account?
        <a href="#" class="sign-up-link" @click="$emit('go-to-page', 'login')">Sign In</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign_up',
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
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin:0;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;

}

.hero-banner {
  height: 30vh;
  min-height: 200px;
  max-height: 280px;
  background: linear-gradient(180deg, #F7F5ED 0%, #075258 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 30px;
  flex-shrink: 0;
  width: 100%;
}

.hero-image {
  width: 181.08px;
  height: 189px;
  object-fit: contain;
}

.sign-in-card {
  background: #ffffff;
  border-radius: 40px 40px 0 0;
  padding: 36px 24px;
  margin-top: -40px;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
}

.welcome-text {
  font-size: 30px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 8px;
  text-align: center;
  color: #0c3437;
}
.card-title {
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 40px;
  text-align: center;
  color: #545454;
}

.form-group {
  margin-bottom: 10px;
}

.form-label {
  display: block;
  margin-bottom: 2px;
  margin-bottom: 4px;
  color: #333333;
  font-size: 15px;
}

.input-box {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 17px;
  border: 1.5px solid #e1e5e9;
  border-radius: 24px;
  font-size: 14px;
  font-weight:300;
  background-color: #fafbfc;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0c3437;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(31, 79, 90, 0.1);
}

.form-input::placeholder {
  color: #b6b6b6;
;
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
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 17px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight */
}

.sign-in-btn:hover:not(:disabled) {
  background-color: #163a43;
}

.sign-in-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #ddd;
}

.divider-text {
  padding: 0 18px;
  color: #777;
  font-size: 14px;
  white-space: nowrap;
}

.social-buttons {
  display: flex;
  flex-direction: row;
  gap: 0;
}


.social-btn {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#fafbfc;
  border: 1px solid #fcfcfc;
  color: #0c3437;
  border-radius: 14px;
  box-sizing: border-box;
  padding: 15px;
  padding-left: 10px;
  padding-right:10px;
  margin-left: 30px;
  margin-right:30px;
  cursor: pointer;
  gap: 0;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
   flex: 1; /* Added this line */
}

/*.social-btn:hover {
  background-color: #163a43;
}*/

.social-icon {
  width: 20px; /* Adjust size as needed */
  height: 20px; /* Adjust size as needed */
  object-fit: contain;
}


.sign-up-section {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #333;

}

.sign-up-link {
  color: #c83232;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

/* Medium Phones (375px - 414px) */
@media (min-width: 375px) and (max-width: 414px) {
  .hero-banner {
    height: 30vh;
    min-height: 200px;
  }

  .hero-image {
    width: 180px;
    height: 189px;
  }

  .sign-in-card {
    padding: 36px 24px;
  }
}

/* Large Phones (415px - 767px) */
@media (min-width: 415px) and (max-width: 767px) {
  .hero-banner {
    height: 32vh;
    min-height: 220px;
  }

  .hero-image {
    width: 120px;
    height: 120px;
  }

  .sign-in-card {
    padding: 36px 28px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }

  .hero-banner {
    height: 35vh;
    min-height: 250px;
    max-height: 300px;
    border-radius: 0;
  }

  .hero-image {
    width: 140px;
    height: 140px;
  }

  .sign-in-card {
    max-width: 768px;
    margin: -50px auto 0 auto;
    border-radius: 24px;
    padding: 40px 32px;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  .hero-banner {
    height: 38vh;
    min-height: 280px;
    max-height: 350px;
  }

  .hero-image {
    width: 160px;
    height: 160px;
  }

  .sign-in-card {
    max-width: 500px;
    margin: -60px auto 0 auto;
    padding: 44px 36px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .hero-banner {
    height: 40vh;
    min-height: 160px;
    padding-bottom: 20px;
  }

  .hero-image {
    width: 80px;
    height: 80px;
  }

  .sign-in-card {
    padding: 24px 20px;
    margin-top: -30px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .divider {
    margin: 24px 0;
  }

  .sign-up-section {
    margin-top: 24px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .hero-banner {
    height: 35vh;
    min-height: 140px;
    padding-bottom: 15px;
  }

  .hero-image {
    width: 70px;
    height: 70px;
  }

  .sign-in-card {
    padding: 20px 16px;
    margin-top: -25px;
  }
}

/* Prevent zoom on iOS input focus */
@media screen and (max-width: 767px) {
  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
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
