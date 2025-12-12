<template>
  <nav class="bottom-nav">
    <div class="nav-items-container">
      <button
        @click="navigate('homepage')"
        class="nav-item"
        :class="{ active: activePage === 'homepage' }"
      >
        <i class="fas fa-home"></i>
      </button>

      <button
        @click="navigate('trips')"
        class="nav-item"
        :class="{ active: activePage === 'trips' }"
      >
        <i class="fas fa-route"></i>
      </button>

      <button
        @click="navigate('notifications')"
        class="nav-item"
        :class="{ active: activePage === 'notifications' }"
      >
        <i class="fas fa-bell"></i>
      </button>

      <button
        @click="navigate('profile')"
        class="nav-item"
        :class="{ active: activePage === 'profile' }"
      >
        <i class="fas fa-user"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    activePage: {
      type: String,
      default: 'homepage'
    }
  },
  emits: ['navigate'],
  methods: {
    navigate(page) {
      console.log('📱 BottomNav navigating to:', page)
      this.$emit('navigate', page)
    }
  }
}
</script>

<style scoped>
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
  color: var(--teal-1, #386166);
  background: rgba(56, 97, 102, 0.1);
}

.nav-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

/* Remove the nav-label styles since we're not using text anymore */
.nav-label {
  display: none;
}

/* Responsive styles */
@media (max-width: 320px) {
  .bottom-nav {
    padding: 12px 16px;
  }

  .nav-item {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
}

@media (min-width: 321px) and (max-width: 374px) {
  .bottom-nav {
    padding: 14px 18px;
  }

  .nav-item {
    width: 46px;
    height: 46px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .bottom-nav {
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

@media (min-width: 1024px) {
  .bottom-nav {
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px 24px 0 0;
  }
}

/* Safe area insets */
@supports (padding: max(0px)) {
  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}
</style>
