import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/log_in.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/sign_up.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/forgotpassword_page.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home_page.vue'),
    meta: { requiresAuth: true, showNav: true }
  },
  {
    path: '/trips',
    name: 'trips',
    component: () => import('../components/TripsPage.vue'),
    meta: { requiresAuth: true, showNav: true }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('../components/NotificationPage.vue'),
    meta: { requiresAuth: true, showNav: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/ProfilePage.vue'),
    meta: { requiresAuth: true, showNav: true }
  },
  {
    path: '/personal-information',
    name: 'personal-information',
    component: () => import('../components/PersonalInformation.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import('../components/changePassword.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/destination-details/:id?',
    name: 'destination-details',
    component: () => import('../components/destination-details.vue'),
    props: true,
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/datepicker',
    name: 'datepicker',
    component: () => import('../components/datePicker.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/accommodation',
    name: 'accommodation',
    component: () => import('../components/accomodation_page.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('../components/booking-page.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/mastercard-details',
    name: 'mastercard-details',
    component: () => import('../components/mastercard_details.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/gcash-detail',
    name: 'gcash-detail',
    component: () => import('../components/gcash_detail.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/gcash-confirm',
    name: 'gcash-confirm',
    component: () => import('../components/GcashPaymentConfirm.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/payment-success',
    name: 'payment-success',
    component: () => import('../components/paymentsuccess.vue'),
    meta: { requiresAuth: true, showNav: false } // No nav on this page
  },
  {
    path: '/itinerary',
    name: 'itinerary',
    component: () => import('../components/ItineraryPage.vue'),
    meta: { requiresAuth: true, showNav: true } // Show nav on itinerary
  },
  // Add a catch-all route for 404 errors
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Optional: Add scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Enhanced navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  // Set default meta values if not defined
  to.meta.requiresAuth = to.meta.requiresAuth ?? false
  to.meta.showNav = to.meta.showNav ?? false

  // Debug logging (remove in production)
  console.log(`Navigation: ${from.name || '/'} -> ${to.name || '/'}`)
  console.log('Auth required:', to.meta.requiresAuth, 'Authenticated:', isAuthenticated)

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Save the intended destination for redirect after login
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (!to.meta.requiresAuth && isAuthenticated && to.name === 'login') {
    // If already authenticated and trying to access login, redirect to home
    next('/home')
  } else {
    next()
  }
})

// Add navigation guard for bottom nav
router.afterEach((to) => {
  // Debug: Log which pages show nav
  console.log(`Page ${to.name} - Show Nav: ${to.meta.showNav}`)
})

export default router
