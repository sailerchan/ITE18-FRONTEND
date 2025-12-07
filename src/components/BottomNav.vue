<template>
  <nav class="bottom-nav">
    <div class="nav-items-container">
      <button
        class="nav-item"
        :class="{ active: activeItem === 'home' }"
        @click="handleClick('home')"
      >
        <i class="fas fa-home"></i>
        <span class="nav-label" v-if="showLabels">Home</span>
      </button>
      <button
        class="nav-item"
        :class="{ active: activeItem === 'trips' }"
        @click="handleClick('trips')"
      >
        <i class="fas fa-route"></i>
        <span class="nav-label" v-if="showLabels">Trips</span>
      </button>
      <button
        class="nav-item"
        :class="{ active: activeItem === 'notifications' }"
        @click="handleClick('notifications')"
      >
        <i class="fas fa-bell"></i>
        <span class="nav-label" v-if="showLabels">Notifications</span>
      </button>
      <button
        class="nav-item"
        :class="{ active: activeItem === 'profile' }"
        @click="handleClick('profile')"
      >
        <i class="fas fa-user"></i>
        <span class="nav-label" v-if="showLabels">Profile</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    activeItem: {
      type: String,
      default: 'home'
    },
    showLabels: {
      type: Boolean,
      default: false
    }
  },
  emits: ['nav-click'],
  methods: {
    handleClick(item) {
      this.$emit('nav-click', item);
    }
  }
}
</script>

<style scoped>
/* Bottom nav - FIXED POSITION (won't move with scroll) */
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
    margin: 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
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
    width: auto;
    min-width: 48px;
    height: 48px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    padding: 8px 12px;
    gap: 4px;
}
.nav-item.active {
  color: var(--teal-1);
  background: rgba(56,97,102,0.1);
}
.nav-item:hover {
  background: rgba(0,0,0,0.03);
}

.nav-label {
  font-size: 10px;
  font-weight: 500;
  color: inherit;
  line-height: 1;
}

/* CSS Variables */
:root {
  --teal-1: #1f4f5a;
}

/* ================= RESPONSIVE BREAKPOINTS ================= */

/* Extra Small Phones (under 320px) */
@media (max-width: 320px) {
  .bottom-nav {
    padding: 12px 16px;
  }
  .nav-item {
    min-width: 44px;
    height: 44px;
    font-size: 18px;
    padding: 6px 8px;
  }
  .nav-label {
    font-size: 9px;
  }
}

/* Small Phones (321px - 374px) */
@media (min-width: 321px) and (max-width: 374px) {
  .bottom-nav {
    padding: 14px 18px;
  }
  .nav-item {
    min-width: 46px;
    height: 46px;
  }
}

/* Medium Phones (375px - 414px) - Standard modern phones */
@media (min-width: 375px) and (max-width: 414px) {
  .bottom-nav {
    padding: 16px 20px;
  }
}

/* Large Phones (415px - 767px) - Large phones like iPhone Plus/Pro Max */
@media (min-width: 415px) and (max-width: 767px) {
  .bottom-nav {
    padding: 16px 24px;
  }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Adjust bottom nav for tablets */
  .bottom-nav {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 768px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 12px 24px;
    border: 1px solid #e9ecef;
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  /* Adjust bottom nav for large tablets */
  .bottom-nav {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 60px);
    max-width: 500px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 12px 24px;
    border: 1px solid #e9ecef;
  }
}

/* Desktop (1367px and up) */
@media (min-width: 1367px) {
  /* Adjust bottom nav for desktop */
  .bottom-nav {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 80px);
    max-width: 500px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 12px 24px;
    border: 1px solid #e9ecef;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .bottom-nav {
    padding: 10px 16px;
  }
  .nav-item {
    min-width: 42px;
    height: 42px;
    font-size: 18px;
    flex-direction: row;
    gap: 6px;
  }
  .nav-label {
    font-size: 11px;
  }
}

/* Very short screens */
@media (max-height: 500px) {
  .bottom-nav {
    padding: 8px 12px;
  }
  .nav-item {
    min-width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

/* Safe area insets for notched devices */
@supports(padding: max(0px)) {
  .bottom-nav {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}

/* Ensure bottom nav stays on top of everything */
.bottom-nav {
  will-change: transform;
  backface-visibility: hidden;
}
</style>
