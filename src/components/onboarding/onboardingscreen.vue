
<template>
  <div class="screen-container explore-screen">
    <div class="content">
      <header class="text-block">
        <h1 class="title">
          Plan trips.<br />
          Explore more.
        </h1>
        <p class="subtitle">
          Plan, organize, and enjoy every trip—<br/>effortlessly.
        </p>
      </header>

        <img
          src="/images/onboarding-beach.png"
          alt="Beach illustration"
          class="illustration"
        />

      <button class="primary-btn" @click="$emit('go-to-page', 'signup')">
        Get Started
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnboardingExplore',
  emits: 'go-to-page'
}
</script>

<style scoped>
.screen-container {
  height: 100vh;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.explore-screen {
  background: linear-gradient(180deg, #F7F5ED 0%, #075258 100%);
  color: black;
}

.content {
  flex: 1;
  padding: 48px px 32px;
  display: flex;
  flex-direction: column;
}

.text-block {
  margin-top: 75px;
  padding-left:80px;
}

.title {
  font-size: 32px;
  line-height: 1.2;
  font-weight: 600;
}

.subtitle {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.9;
  font-style: italic;
}


.illustration {
  margin-top: 30px;
  width: 130dvw;
  object-fit: contain;
  align-items: center;
}

.primary-btn {

width: 100%;
padding: 14px 90px;
border-radius: 50px;
border: none;
background: #d3d4d429;
color: white;
font-size: 16px;
font-weight: 600;
font-family: 'Poppins', sans-serif;
margin: 0px auto;  /* auto left/right centers it */
display: block;     /* makes button block-level so auto margins work */
width: fit-content;
}
</style>
