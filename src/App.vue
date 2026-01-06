<template>
  <div id="app">
    <!-- Onboarding Screens -->
    <OnboardingLogo v-if="screen === 'splash'" />
    <OnboardingExplore
      v-else-if="screen === 'onboarding'"
      @go-to-page="handleOnboardingComplete"
    />

    <!-- Login Component -->
    <Login
  v-else-if="currentPage === 'login'"
  :login-form="loginForm"
  @update:email="loginForm.email = $event"
  @update:password="loginForm.password = $event"
  @handle-login="handleLogin"
  @social-login="socialLogin"
  @go-to-page="goToPage"
/>

    <!-- Signup Component -->
    <Signup
      v-else-if="currentPage === 'signup'"
      :signup-form="signupForm"
      :is-signup-form-valid="isSignupFormValid"
      @update:firstName="updateSignupField('firstName', $event)"
      @update:lastName="updateSignupField('lastName', $event)"
      @update:email="updateSignupField('email', $event)"
      @update:password="updateSignupField('password', $event)"
      @update:confirmPassword="updateSignupField('confirmPassword', $event)"
      @validate-password="validatePassword"
      @validate-confirm-password="validateConfirmPassword"
      @handle-signup="handleSignup"
      @social-login="socialLogin"
      @go-to-page="goToPage"
    />

    <!-- Forgot Password Component -->
    <ForgotPassword
      v-else-if="currentPage === 'forgot-password'"
      @reset-password="handleResetPassword"
      @social-login="socialLogin"
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
      @go-back="handleTripDetailsBack"
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
      @select-date="selectDate"
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
      @show-confirmation-view="showConfirmationView"
      @show-listing-view="showListingView"
      @handle-view-map="handleViewMap"
      @select-payment-method="bookingStore.selectPaymentMethod"
      @handle-next="handleNext"
      @go-to-page="goToPage"
    />

    <!-- GCash Detail Component -->
    <GcashDetail
      v-else-if="currentPage === 'gcash-detail'"
      :total-amount="parseFloat(bookingStore.totalPrice)"
      :selected-destination-name="bookingStore.selectedDestinationName"
      :selected-accommodation="bookingStore.selectedProperty.title || 'Accommodation'"
      @go-back="goToPage('booking')"
      @payment-success="handleGcashPaymentSuccess"
    />

    <!-- GCash Payment Confirmation Component -->
    <GcashPaymentConfirm
      v-else-if="currentPage === 'gcash-confirm'"
      :total-amount="parseFloat(bookingStore.totalPrice) + 50"
      :selected-accommodation="bookingStore.selectedProperty.title || 'Paradiso Hostel'"
      @go-back="goToPage('gcash-detail')"
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
      :receipt-data="receiptData"
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
      @navigate="handleNavClick"
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
import GcashDetail from './components/booking/gcash_detail.vue'
import GcashPaymentConfirm from './components/booking/GcashPaymentConfirm.vue'
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
    GcashDetail,
    GcashPaymentConfirm,
    PaymentSuccess,
    ItineraryPage
  },

  setup() {
    // Initialize stores
    const onboardingStore = useOnboardingStore()
    const tripsStore = useTripsStore()
    const userStore = useUserStore()
    const destinationsStore = useDestinationsStore()
    const bookingStore = useBookingStore()
    const notificationsStore = useNotificationsStore()

    // Initialize user data and trips from localStorage
    onMounted(() => {
      onboardingStore.init()
      userStore.loadFromLocalStorage()
      tripsStore.loadFromLocalStorage()
      tripsStore.checkAndUpdateTripStatuses()
    })

    // Onboarding screen state
    const screen = computed(() => onboardingStore.currentScreen)

    // Navigation state
    const currentPage = ref('login')
    const currentBookingView = ref('listing')
    const showNav = ref(false)
    const activeDestinationTab = ref('details')
    const currentDestination = ref(null)
    const selectedTrip = ref(null)

    // Login and Signup forms
    const loginForm = ref({
      email: '',
      password: ''
    })

    const signupForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: ''
    })

    // Receipt data for payment success
    const receiptData = ref({
      amount: '2,250.00',
      paymentMethod: 'GCash',
      receiptNumber: '21345255633546',
      dateTime: 'Nov. 24, 2015 18:39 PM'
    })

    // Computed properties
    const isSignupFormValid = computed(() => {
      return (
        signupForm.value.firstName &&
        signupForm.value.lastName &&
        signupForm.value.email &&
        signupForm.value.password &&
        signupForm.value.confirmPassword &&
        !signupForm.value.passwordError &&
        !signupForm.value.confirmPasswordError
      )
    })

    const fromDateDisplay = computed(() => {
      if (!bookingStore.selectedStart) return 'Select start date'
      const monthNamesShort = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      return `${monthNamesShort[bookingStore.selectedStart.getMonth()]} ${bookingStore.selectedStart.getDate()}, ${bookingStore.selectedStart.getFullYear()}`
    })

    const toDateDisplay = computed(() => {
      if (!bookingStore.selectedEnd) return 'Select end date'
      const monthNamesShort = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      return `${monthNamesShort[bookingStore.selectedEnd.getMonth()]} ${bookingStore.selectedEnd.getDate()}, ${bookingStore.selectedEnd.getFullYear()}`
    })

    const currentPropertyImage = computed(() => {
      return bookingStore.selectedProperty.image || '/images/paradiso.1.avif'
    })

    const currentConfirmationImage = computed(() => {
      return bookingStore.selectedProperty.confirmationImage || '/images/paradiso.1.avif'
    })

    // Update showNav when currentPage changes
    const updateShowNav = () => {
      showNav.value = ['homepage', 'trips', 'notifications', 'profile', 'itinerary', 'trip-details'].includes(currentPage.value)
    }

    watch(currentPage, updateShowNav)

    // Method handlers
    const handleOnboardingComplete = (page) => {
      onboardingStore.finishOnboarding()
      goToPage(page)
    }

    const updateSignupField = (field, value) => {
      signupForm.value[field] = value
    }

    const validatePassword = () => {
      const password = signupForm.value.password
      if (password.length < 8) {
        signupForm.value.passwordError = 'Password must be at least 8 characters long'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        signupForm.value.passwordError = 'Password must contain both uppercase and lowercase letters'
      } else if (!/(?=.*\d)/.test(password)) {
        signupForm.value.passwordError = 'Password must contain at least one number'
      } else {
        signupForm.value.passwordError = ''
      }
      if (signupForm.value.confirmPassword) {
        validateConfirmPassword()
      }
    }

    const validateConfirmPassword = () => {
      if (signupForm.value.password !== signupForm.value.confirmPassword) {
        signupForm.value.confirmPasswordError = 'Passwords do not match'
      } else {
        signupForm.value.confirmPasswordError = ''
      }
    }

    const handleLogin = () => {
      userStore.login(loginForm.value.email)
      goToPage('homepage')
    }

    const handleSignup = () => {
      validatePassword()
      validateConfirmPassword()
      if (!isSignupFormValid.value) {
        alert('Please fix the form errors before submitting.')
        return
      }

      userStore.updateFromSignup({
        firstName: signupForm.value.firstName,
        lastName: signupForm.value.lastName,
        email: signupForm.value.email
      })

      goToPage('homepage')
    }

    const handleResetPassword = (email) => {
      console.log('Password reset requested for', email)
      alert('Password reset instructions sent to ' + email)
      goToPage('login')
    }

    const socialLogin = (provider) => {
      console.log('Social login with ' + provider)
      userStore.login('user@example.com')
      goToPage('homepage')
    }

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
        'gcash-confirm': 'gcash-detail',
        'gcash-detail': 'booking',
        'mastercard-details': 'booking',
        'personal-information': 'profile',
        'change-password': 'profile',
        'forgot-password': 'login',
        'destination-details': 'homepage',
        'itinerary': 'homepage',
        'trip-details': 'trips'
      }

      if (pageMap[currentPage.value]) {
        goToPage(pageMap[currentPage.value])
      } else {
        goToPage('homepage')
      }
    }

    const handleNavClick = (page) => {
      goToPage(page)
    }

    const setActiveNav = (navItem) => {
      if (navItem === 'trips') {
        goToPage('trips')
      } else if (navItem === 'notifications') {
        goToPage('notifications')
      } else if (navItem === 'home') {
        goToPage('homepage')
      } else if (navItem === 'profile') {
        goToPage('profile')
      }
    }

    const viewDestination = (id) => {
      activeDestinationTab.value = 'details'
      bookingStore.setDestination(id, destinationsStore.getDestinationById(id)?.name || 'Destination')

      const destination = destinationsStore.getDestinationById(id)
      if (destination) {
        currentDestination.value = destination
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
      console.log('Toggling helpful for review', reviewId)
    }

    const handleLogout = () => {
      userStore.logout()
      loginForm.value = { email: '', password: '' }
      signupForm.value = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: ''
      }
      currentDestination.value = null
      goToPage('login')
    }

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

    const selectDate = (date) => {
      bookingStore.selectDate(date)
    }

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

    const showConfirmationView = () => {
      currentBookingView.value = 'confirmation'
    }

    const showListingView = () => {
      currentBookingView.value = 'listing'
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

    const handleGcashPaymentSuccess = (paymentData) => {
      goToPage('gcash-confirm')
    }

    const handlePaymentSuccess = (paymentData) => {
      const receiptNumber = Math.floor(100000000000000 + Math.random() * 900000000000000).toString()

      receiptData.value = {
        amount: paymentData?.amount ? paymentData.amount.toFixed(2) : bookingStore.totalPrice,
        paymentMethod: paymentData?.paymentMethod || bookingStore.selectedPayment?.name || 'GCash',
        receiptNumber: receiptNumber,
        dateTime: new Date().toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(',', '')
      }

      const bookingData = {
        destinationId: bookingStore.selectedDestinationId || 1,
        destinationName: bookingStore.selectedDestinationName || 'Siargao Island',
        dates: bookingStore.booking.dates,
        nights: bookingStore.booking.nights,
        totalPrice: bookingStore.totalPrice,
        paymentMethod: bookingStore.selectedPayment?.name || 'GCash',
        receiptNumber: receiptNumber,
        property: {
          title: bookingStore.selectedProperty?.title || 'Accommodation',
          location: bookingStore.selectedProperty?.location || '',
          image: bookingStore.selectedProperty?.image || ''
        }
      }

      const newTrip = tripsStore.addCompletedTrip(bookingData)
      if (newTrip) {
        selectedTrip.value = newTrip
      }

      goToPage('payment-success')
    }

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

    const handleTripDetailsBack = () => {
      goToPage('trips')
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

    // Initialize showNav
    updateShowNav()

    return {
      // Stores
      onboardingStore,
      tripsStore,
      userStore,
      destinationsStore,
      bookingStore,
      notificationsStore,

      // State
      screen,
      currentPage,
      currentBookingView,
      showNav,
      loginForm,
      signupForm,
      receiptData,
      currentDestination,
      activeDestinationTab,
      selectedTrip,

      // Computed
      isSignupFormValid,
      fromDateDisplay,
      toDateDisplay,
      currentPropertyImage,
      currentConfirmationImage,

      // Methods
      handleOnboardingComplete,
      updateSignupField,
      validatePassword,
      validateConfirmPassword,
      handleLogin,
      handleSignup,
      handleResetPassword,
      socialLogin,
      goToPage,
      goToPreviousPage,
      viewDestination,
      handlePlanTrip,
      handleWriteReview,
      toggleReviewHelpful,
      setActiveNav,
      handleLogout,
      handleSaveChanges,
      handleConnectFacebook,
      handleDeleteAccount,
      selectDate,
      goToAccommodation,
      viewBooking,
      showConfirmationView,
      showListingView,
      handleViewMap,
      handleNext,
      handleGcashPaymentSuccess,
      handlePaymentSuccess,
      handleTripSaved,
      handleNavClick,
      selectedTrip,
      openTripDetails,
      handleEditItinerary,
      goToItineraryBack,
      handleTripDetailsBack,
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
