<template>
  <div class="container">
    <div class="hero-banner">
      <img src="/images/logos/girlvector.png" alt="Girl with luggage" class="hero-image">
    </div>

    <div class="card sign-in-card">
      <div class="welcome-text">Welcome back, traveler!</div>
      <p class="card-title">Let's continue your travel plans. Enter your details to sign in.</p>

      <form @submit.prevent="$emit('handle-login')">
        <div class="form-group floating-group">
          <div class="input-box">
            <input type="email" id="email" class="form-input"
                   placeholder=" "
                   :value="loginForm.email"
                   @input="$emit('update:email', $event.target.value)"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   required>
            <label for="email" class="floating-label">Email</label>
          </div>
        </div>

        <div class="form-group floating-group">
          <div class="input-box">
            <input type="password" id="password" class="form-input"
                   placeholder=" "
                   :value="loginForm.password"
                   @input="$emit('update:password', $event.target.value)"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   required>
            <label for="password" class="floating-label">Password</label>
          </div>
          <a href="#" class="forgot-password" @click="$emit('go-to-page', 'forgot-password')">Forgot Password?</a>
        </div>

        <button type="submit" class="sign-in-btn">Log In</button>
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
        New here? <a href="#" class="sign-up-link" @click="$emit('go-to-page', 'signup')">Sign Up</a> to begin your journey!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'log_in',
  props: {
    loginForm: {
      type: Object,
      required: true
    }
  },
  emits: [
    'update:email',
    'update:password',
    'handle-login',
    'social-login',
    'go-to-page'
  ],
  methods: {
    handleFocus() {
      // This method ensures the label moves up when input is focused
      // The CSS will handle the visual effect
    },
    handleBlur() {
      // This method ensures the label stays up if there's content
      // The CSS will handle the visual effect
    }
  }
}
</script>

<style scoped>
/* Mobile-first base styles */
.container {
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
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
  position: relative;
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
  margin-top: 5px;
  margin-bottom: 8px;
  text-align: center;
  color: #0c3437;
}
.card-title {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
  color: #545454;
}

/* Floating Label Styles */
.floating-group {
  position: relative;
  margin-bottom: 20px;
}

.input-box {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 16px 18px;
  border: 1.5px solid #e1e5e9;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 400;
  background-color: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.floating-label {
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
  color: #b6b6b6;
  font-size: 14px;
  font-weight: 400;
  pointer-events: none;
  transition: all 0.3s ease;
  background: #ffffff;
  padding: 0 4px;
}

/* Label moves up when input is focused or has value */
.form-input:focus ~ .floating-label,
.form-input:not(:placeholder-shown) ~ .floating-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  color: #0c3437;
  font-weight: 500;
  background: #ffffff;
}

.form-input:focus {
  outline: none;
  border-color: #0c3437;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(31, 79, 90, 0.1);
}

/* Hide the actual placeholder since we're using the label */
.form-input::placeholder {
  color: #ffffff;
}

/* Remove old form-label styles since we're using floating labels */
.form-label {
  display: none;
}

.forgot-password {
  display: block;
  text-align: right;
  color: #ff1509;
  text-decoration: none;
  font-size: 12px;
  margin-top: 5px;
  font-weight:500;
}

.sign-in-btn {
  width: 100%;
  background-color: #0c3437;
  color: white;
  border: none;
  border-radius: 28px;
  padding: 14px;
  font-size: 15px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight */
}

.sign-in-btn:hover {
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
  gap: 0px;
}

.social-btn {
  width: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:none;
  border: 1px solid #ffffff;
  color: #0c3437;
  border-radius: 14px;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
   flex: 1; /* Added this line */
}

.social-icon {
  width: 20px; /* Adjust size as needed */
  height: 20px; /* Adjust size as needed */
  object-fit: contain;
}

.sign-up-section {
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: #333;
}

.sign-up-link {
  color: #ff1509;
  text-decoration: none;
  font-size: 13px;
  cursor: pointer;
  font-weight:500;
}


/* Small Phones (320px - 374px) */
@media (max-width: 374px) {
  .hero-banner {
    height: 28vh;
    min-height: 200px;
    padding-bottom: 25px;
  }

  .hero-image {
    width: 180px;
    height: 189px;
  }

  .sign-in-card {
    padding: 32px 20px;
    margin-top: -35px;
  }

  .welcome-text {
    font-size: 22px;
  }

  .card-title {
    font-size: 14px;
  }

  .form-input {
    padding: 14px 16px;
    font-size: 16px;
  }

  .floating-label {
    left: 16px;
    font-size: 16px;
  }

  .form-input:focus ~ .floating-label,
  .form-input:not(:placeholder-shown) ~ .floating-label {
    transform: translateY(-50%) scale(0.8);
  }
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
    width: 180px;
    height: 180px;
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

  .floating-group {
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
    width: 100px;
    height:100px;
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
