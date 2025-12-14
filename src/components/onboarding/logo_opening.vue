<!-- src/components/OnboardingLogo.vue -->
<template>
  <div class="screen-container splash-screen">
    <img
      src="/images/tourmate-logo.png"
      alt="Tourmate logo"
      class="logo-image"
    />
  </div>
</template>

<script>
export default {
  name: 'OnboardingLogo'
}
</script>

<style scoped>
.screen-container {
  min-height: 100vh;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.splash-screen {
  background: #ffffff;
}

.logo-image {
  width: 400px;
  height: auto;
  object-fit: contain;
}
</style>
