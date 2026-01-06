<template>
  <div id="app">
    <!-- Onboarding Screens -->
    <OnboardingLogo v-if="onboardingStore.currentScreen === 'splash'" />
    <OnboardingExplore
      v-else-if="onboardingStore.currentScreen === 'onboarding'"
      @go-to-page="handleOnboardingComplete"
    />

    <!-- Login Component -->
    <Login
      v-else-if="currentPage === 'login'"
      :login-form="userStore.loginForm"
      @update:email="userStore.loginForm.email = $event"
      @update:password="userStore.loginForm.password = $event"
      @handle-login="handleLogin"
      @social-login="handleSocialLogin"
      @go-to-page="goToPage"
    />

    <!-- Signup Component -->
    <Signup
      v-else-if="currentPage === 'signup'"
      :signup-form="userStore.signupForm"
      :is-signup-form-valid="userStore.isSignupFormValid"
      @update:firstName="userStore.updateSignupField('firstName', $event)"
      @update:lastName="userStore.updateSignupField('lastName', $event)"
      @update:email="userStore.updateSignupField('email', $event)"
      @update:password="userStore.updateSignupField('password', $event)"
      @update:confirmPassword="userStore.updateSignupField('confirmPassword', $event)"
      @validate-password="userStore.validatePassword"
      @validate-confirm-password="userStore.validateConfirmPassword"
      @handle-signup="handleSignup"
      @social-login="handleSocialLogin"
      @go-to-page="goToPage"
    />

    <!-- Forgot Password Component -->
    <ForgotPassword
      v-else-if="currentPage === 'forgot-password'"
      @reset-password="handleResetPassword"
      @social-login="handleSocialLogin"
      @go-to-page="goToPage"
    />

    <!-- Homepage Component -->
    <Homepage
      v-else-if="currentPage === 'homepage'"
      :user-name="userStore.displayName"
      :current-location="userStore.location"
      :search-query="destinationsStore.searchQuery"
      :featured-destination="destinationsStore.featuredDestination"
      :destinations="destinationsStore.destinations"
      :filtered-destinations="destinationsStore.filteredDestinations"
      @update:search-query="destinationsStore.updateSearchQuery($event)"
      @view-destination="viewDestination"
      @set-active-nav="setActiveNav"
      @go-to-page="goToPage"
    />

    <!-- Trips Component -->
    <TripsPage
      v-else-if="currentPage === 'trips'"
      @go-back="goToPage('homepage')"
      @plan-trip="handlePlanTrip"
      @go-to-page="goToPage"
      @open-details="openTripDetails"
    />

    <!-- Trip Details Component -->
    <TripDetailsPage
      v-else-if="currentPage === 'trip-details'"
      :trip="selectedTrip"
      @go-back="goToPage('trips')"
      @edit-itinerary="handleEditItinerary"
    />

    <!-- Notification Component -->
    <NotificationPage
      v-else-if="currentPage === 'notifications'"
      @go-back="goToPage('homepage')"
      @go-to-page="goToPage"
    />

    <!-- Profile Component -->
    <ProfilePage
      v-else-if="currentPage === 'profile'"
      :user-name="userStore.displayName"
      :current-location="userStore.location"
      @go-to-page="goToPage"
      @logout="handleLogout"
      @personal-info="goToPage('personal-information')"
      @change-password="goToPage('change-password')"
    />

    <!-- Personal Information Component -->
    <PersonalInformation
      v-else-if="currentPage === 'personal-information'"
      @go-back="goToPage('profile')"
      @save-changes="handleSaveChanges"
      @connect-facebook="handleConnectFacebook"
      @delete-account="handleDeleteAccount"
    />

    <!-- Change Password Component -->
    <ChangePassword
      v-else-if="currentPage === 'change-password'"
      @go-to-page="goToPage"
    />

    <!-- Destination Details Component -->
    <DestinationDetails
      v-else-if="currentPage === 'destination-details'"
      :destination="currentDestination"
      :initial-tab="activeDestinationTab"
      @go-back="goToPage('homepage')"
      @plan-trip="handlePlanTrip"
      @write-review="handleWriteReview"
      @toggle-helpful="toggleReviewHelpful"
    />

    <!-- DatePicker Component -->
    <DatePicker
      v-else-if="currentPage === 'datepicker'"
      :selected-destination-name="bookingStore.selectedDestinationName"
      :current-date="bookingStore.currentDate"
      :selected-start="bookingStore.selectedStart"
      :selected-end="bookingStore.selectedEnd"
      :current-month-year="bookingStore.currentMonthYear"
      :from-date-display="fromDateDisplay"
      :to-date-display="toDateDisplay"
      :calendar-days="bookingStore.calendarDays"
      @prev-month="bookingStore.prevMonth"
      @next-month="bookingStore.nextMonth"
      @select-date="bookingStore.selectDate"
      @go-to-accommodation="goToAccommodation"
      @go-to-page="goToPage"
    />

    <!-- Accommodation Component -->
    <Accommodation
      v-else-if="currentPage === 'accommodation'"
      :selected-destination-name="bookingStore.selectedDestinationName"
      @view-booking="viewBooking"
      @go-to-page="goToPage"
    />

    <!-- Booking Component -->
    <Booking
      v-else-if="currentPage === 'booking'"
      :current-booking-view="currentBookingView"
      :selected-property="bookingStore.selectedProperty"
      :selected-payment="bookingStore.selectedPayment"
      :booking="bookingStore.booking"
      :payment-methods="bookingStore.paymentMethods"
      :total-price="bookingStore.totalPrice"
      :current-property-image="currentPropertyImage"
      :current-confirmation-image="currentConfirmationImage"
      :booking-dates-display="bookingStore.bookingDatesDisplay"
      @show-confirmation-view="currentBookingView = 'confirmation'"
      @show-listing-view="currentBookingView = 'listing'"
      @handle-view-map="handleViewMap"
      @select-payment-method="bookingStore.selectPaymentMethod"
      @handle-next="handleNext"
      @go-to-page="goToPage"
    />

    <!-- GCash Payment Component (both steps) -->
    <GcashPayment
      v-else-if="currentPage === 'gcash-detail'"
      :total-amount="parseFloat(bookingStore.totalPrice)"
      :selected-destination-name="bookingStore.selectedDestinationName"
      :selected-accommodation="bookingStore.selectedProperty?.title || 'Accommodation'"
      @go-back="goToPage('booking')"
      @payment-success="handlePaymentSuccess"
    />

    <!-- Mastercard Details Component -->
    <MastercardDetails
      v-else-if="currentPage === 'mastercard-details'"
      :total-amount="parseFloat(bookingStore.totalPrice)"
      @go-back="goToPage('booking')"
      @payment-success="handlePaymentSuccess"
    />

    <!-- Payment Success Component -->
    <PaymentSuccess
      v-else-if="currentPage === 'payment-success'"
      :receipt-data="bookingStore.receiptData"
      @go-back="goToPreviousPage"
      @go-itinerary="goToItineraryFromSuccess"
    />

    <!-- Itinerary Page Component -->
    <ItineraryPage
      v-else-if="currentPage === 'itinerary'"
      @go-back="goToItineraryBack"
      @trip-saved="handleTripSaved"
    />

    <!-- Bottom Navigation -->
    <BottomNav
      v-if="showNav"
      :active-page="currentPage"
      @navigate="goToPage"
    />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useOnboardingStore } from './stores/onboarding'
import { useTripsStore } from './stores/trips'
import { useUserStore } from './stores/user'
import { useDestinationsStore } from './stores/destinations'
import { useBookingStore } from './stores/booking'
import { useNotificationsStore } from './stores/notifications'

import OnboardingLogo from './components/onboarding/logo_opening.vue'
import OnboardingExplore from './components/onboarding/onboardingscreen.vue'
import BottomNav from './components/BottomNav.vue'
import Login from './components/auth/log_in.vue'
import Signup from './components/auth/sign_up.vue'
import ForgotPassword from './components/auth/forgotpassword_page.vue'
import Homepage from './components/home/home_page.vue'
import TripsPage from './components/trips/TripsPage.vue'
import NotificationPage from './components/notification/NotificationPage.vue'
import ProfilePage from './components/profile/ProfilePage.vue'
import PersonalInformation from './components/profile/PersonalInformation.vue'
import ChangePassword from './components/profile/changePassword.vue'
import DestinationDetails from './components/home/destination-details.vue'
import DatePicker from './components/booking/datePicker.vue'
import Accommodation from './components/booking/accomodation_page.vue'
import Booking from './components/booking/booking-page.vue'
import MastercardDetails from './components/booking/mastercard_details.vue'
import GcashPayment from './components/booking/GcashPayment.vue'
import PaymentSuccess from './components/booking/paymentsuccess.vue'
import ItineraryPage from './components/trips/ItineraryPage.vue'
import TripDetailsPage from './components/trips/TripDetailsPage.vue'

export default {
  name: 'App',
  components: {
    OnboardingLogo,
    OnboardingExplore,
    BottomNav,
    Login,
    Signup,
    ForgotPassword,
    Homepage,
    TripsPage,
    TripDetailsPage,
    NotificationPage,
    ProfilePage,
    PersonalInformation,
    ChangePassword,
    DestinationDetails,
    DatePicker,
    Accommodation,
    Booking,
    MastercardDetails,
    GcashPayment,
    PaymentSuccess,
    ItineraryPage
  },

  setup() {
    // ========== STORES ==========
    const onboardingStore = useOnboardingStore()
    const tripsStore = useTripsStore()
    const userStore = useUserStore()
    const destinationsStore = useDestinationsStore()
    const bookingStore = useBookingStore()
    const notificationsStore = useNotificationsStore()

    // ========== LOCAL STATE (Navigation Only) ==========
    const currentPage = ref('login')
    const currentBookingView = ref('listing')
    const showNav = ref(false)
    const activeDestinationTab = ref('details')
    const currentDestination = ref(null)
    const selectedTrip = ref(null)

    // ========== COMPUTED ==========
    const fromDateDisplay = computed(() => {
      if (!bookingStore.selectedStart) return 'Select start date'
      const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      const date = bookingStore.selectedStart
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    })

    const toDateDisplay = computed(() => {
      if (!bookingStore.selectedEnd) return 'Select end date'
      const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      const date = bookingStore.selectedEnd
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    })

    const currentPropertyImage = computed(() => {
      return bookingStore.selectedProperty?.image || '/images/paradiso.1.avif'
    })

    const currentConfirmationImage = computed(() => {
      return bookingStore.selectedProperty?.confirmationImage || '/images/paradiso.1.avif'
    })

    // ========== INITIALIZE ==========
    onMounted(() => {
      onboardingStore.init()
      userStore.loadFromLocalStorage()
      tripsStore.loadFromLocalStorage()
      notificationsStore.loadFromLocalStorage()
      tripsStore.checkAndUpdateTripStatuses()
    })

    // ========== NAVIGATION ==========
    const updateShowNav = () => {
      showNav.value = ['homepage', 'trips', 'notifications', 'profile', 'trip-details'].includes(currentPage.value)
    }

    watch(currentPage, updateShowNav)

    const goToPage = (page) => {
      currentPage.value = page
      if (page !== 'booking') {
        currentBookingView.value = 'listing'
        bookingStore.selectedPayment = null
      }
      updateShowNav()
    }

    const goToPreviousPage = () => {
      const pageMap = {
        'payment-success': 'booking',
        'gcash-detail': 'booking',
        'mastercard-details': 'booking',
        'personal-information': 'profile',
        'change-password': 'profile',
        'forgot-password': 'login',
        'destination-details': 'homepage',
        'itinerary': 'homepage',
        'trip-details': 'trips'
      }
      goToPage(pageMap[currentPage.value] || 'homepage')
    }

    const setActiveNav = (navItem) => {
      const navMap = {
        'trips': 'trips',
        'notifications': 'notifications',
        'home': 'homepage',
        'profile': 'profile'
      }
      goToPage(navMap[navItem] || 'homepage')
    }

    // ========== ONBOARDING ==========
    const handleOnboardingComplete = (page) => {
      onboardingStore.finishOnboarding()
      goToPage(page)
    }

    // ========== AUTH ==========
    const handleLogin = () => {
      userStore.login(userStore.loginForm.email)
      goToPage('homepage')
    }

    const handleSignup = () => {
      const success = userStore.signup()
      if (success) {
        goToPage('homepage')
      } else {
        alert('Please fix the form errors before submitting.')
      }
    }

    const handleSocialLogin = (provider) => {
      console.log('Social login with ' + provider)
      userStore.login('user@example.com')
      goToPage('homepage')
    }

    const handleResetPassword = (email) => {
      console.log('Password reset requested for', email)
      alert('Password reset instructions sent to ' + email)
      goToPage('login')
    }

    const handleLogout = () => {
      userStore.logout()
      currentDestination.value = null
      goToPage('login')
    }

    // ========== PROFILE ==========
    const handleSaveChanges = (profileData) => {
      userStore.updateProfile(profileData)
      alert('Personal information saved successfully!')
      goToPage('profile')
    }

    const handleConnectFacebook = () => {
      alert('Facebook connection would be implemented here')
    }

    const handleDeleteAccount = () => {
      alert('Account deletion would be implemented here')
      goToPage('login')
    }

    // ========== DESTINATIONS ==========
    const viewDestination = (id) => {
      activeDestinationTab.value = 'details'
      const destination = destinationsStore.getDestinationById(id)

      if (destination) {
        currentDestination.value = destination
        bookingStore.setDestination(id, destination.name)
        goToPage('destination-details')
      }
    }

    const handlePlanTrip = () => {
      if (currentDestination.value) {
        bookingStore.setDestination(currentDestination.value.id, currentDestination.value.name)
      } else {
        bookingStore.setDestination(1, 'Siargao Island')
      }
      goToPage('datepicker')
    }

    const handleWriteReview = (destinationId) => {
      console.log('Writing review for destination', destinationId)
      alert('Review form would open for ' + currentDestination.value?.name)
    }

    const toggleReviewHelpful = (reviewId) => {
      if (currentDestination.value) {
        destinationsStore.toggleReviewHelpful(currentDestination.value.id, reviewId)
      }
    }

    // ========== BOOKING ==========
    const goToAccommodation = () => {
      if (bookingStore.selectedStart && bookingStore.selectedEnd) {
        bookingStore.calculateNights()
        goToPage('accommodation')
      } else {
        alert('Please select a complete date range')
      }
    }

    const viewBooking = (propertyId) => {
      bookingStore.selectProperty(propertyId)
      goToPage('booking')
    }

    const handleViewMap = () => {
      alert('Map would open here.')
    }

    const handleNext = () => {
      if (!bookingStore.selectedPayment) {
        alert('Please select a payment method first')
        return
      }

      if (bookingStore.selectedPayment.id === 'gcash') {
        goToPage('gcash-detail')
      } else if (bookingStore.selectedPayment.id === 'mastercard') {
        goToPage('mastercard-details')
      }
    }

    const handlePaymentSuccess = (paymentData) => {
      const bookingData = bookingStore.completeBooking(paymentData)
      const newTrip = tripsStore.addCompletedTrip(bookingData)

      if (newTrip) {
        selectedTrip.value = newTrip
        notificationsStore.addBookingConfirmationNotification(bookingData)
        notificationsStore.addPaymentSuccessNotification({
          amount: bookingStore.receiptData.amount,
          paymentMethod: bookingStore.receiptData.paymentMethod
        })
      }

      goToPage('payment-success')
    }

    // ========== TRIPS ==========
    const openTripDetails = (trip) => {
      if (trip?.id) {
        const freshTrip = tripsStore.getTripById(trip.id)
        if (freshTrip) {
          selectedTrip.value = freshTrip
          goToPage('trip-details')
        }
      }
    }

    const handleEditItinerary = (trip) => {
      if (trip?.id) {
        selectedTrip.value = trip
        tripsStore.setEditingTrip(trip.id)
        goToPage('itinerary')
      }
    }

    const handleTripSaved = (tripData) => {
      const editingTripId = tripsStore.editingTripId

      if (editingTripId) {
        const success = tripsStore.updateTripItinerary(editingTripId, tripData)

        if (success) {
          tripsStore.clearEditingTrip()
          const updatedTrip = tripsStore.getTripById(editingTripId)

          if (updatedTrip) {
            selectedTrip.value = updatedTrip
            notificationsStore.addTripSavedNotification({
              destinationName: updatedTrip.destinationName
            })
          }
        }
      }

      goToPage('trip-details')
    }

    const goToItineraryBack = () => {
      const editingTripId = tripsStore.editingTripId

      if (editingTripId) {
        const trip = tripsStore.getTripById(editingTripId)
        if (trip) {
          selectedTrip.value = trip
          goToPage('trip-details')
        } else {
          goToPage('trips')
        }
        tripsStore.clearEditingTrip()
      } else {
        goToPage('trips')
      }
    }

    const goToItineraryFromSuccess = () => {
      if (tripsStore.upcomingTrips.length > 0) {
        const latestTrip = tripsStore.upcomingTrips[tripsStore.upcomingTrips.length - 1]
        selectedTrip.value = latestTrip
        tripsStore.setEditingTrip(latestTrip.id)
        goToPage('itinerary')
      } else {
        goToPage('homepage')
      }
    }

    // Initialize
    updateShowNav()

    return {
      // Stores
      onboardingStore,
      tripsStore,
      userStore,
      destinationsStore,
      bookingStore,
      notificationsStore,

      // Local State
      currentPage,
      currentBookingView,
      showNav,
      currentDestination,
      activeDestinationTab,
      selectedTrip,

      // Computed
      fromDateDisplay,
      toDateDisplay,
      currentPropertyImage,
      currentConfirmationImage,

      // Navigation
      goToPage,
      goToPreviousPage,
      setActiveNav,

      // Onboarding
      handleOnboardingComplete,

      // Auth
      handleLogin,
      handleSignup,
      handleSocialLogin,
      handleResetPassword,
      handleLogout,

      // Profile
      handleSaveChanges,
      handleConnectFacebook,
      handleDeleteAccount,

      // Destinations
      viewDestination,
      handlePlanTrip,
      handleWriteReview,
      toggleReviewHelpful,

      // Booking
      goToAccommodation,
      viewBooking,
      handleViewMap,
      handleNext,
      handlePaymentSuccess,

      // Trips
      openTripDetails,
      handleEditItinerary,
      handleTripSaved,
      goToItineraryBack,
      goToItineraryFromSuccess
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #f0f0f0;
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  position: relative;
}

#app {
  font-family: 'Poppins', sans-serif;
  background: #f0f0f0;
  min-height: 100vh;
  position: relative;
  padding-bottom: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
