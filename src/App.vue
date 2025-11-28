<template>
  <div id="app">
    <!-- Debug Info -->
    <div class="debug-info" v-if="showDebug">
      <p><strong>Current Page:</strong> {{ currentPage }}</p>
      <p><strong>Last Destination ID:</strong> {{ selectedDestinationId }}</p>
      <div class="debug-buttons">
        <button @click="goToPage('login')">Login</button>
        <button @click="goToPage('signup')">Signup</button>
        <button @click="goToPage('homepage')">Homepage</button>
        <button @click="goToPage('trips')">Trips</button>
        <button @click="goToPage('notifications')">Notifications</button>
        <button @click="goToPage('profile')">Profile</button>
        <button @click="goToPage('personal-information')">Personal Info</button>
        <button @click="goToPage('change-password')">Change Password</button>
        <button @click="goToPage('siargao-details')">Siargao Details</button>
        <button @click="goToPage('siargao-reviews')">Siargao Reviews</button>
        <button @click="goToPage('itinerary')">Itinerary</button>
        <button @click="goToPage('payment-success')">Payment Success</button>
        <button @click="goToPage('gcash-confirm')">GCash Confirm</button>
      </div>
    </div>

    <!-- Login Component -->
    <Login 
      v-if="currentPage === 'login'"
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
      @update:fullName="signupForm.fullName = $event"
      @update:email="signupForm.email = $event"
      @update:password="signupForm.password = $event"
      @update:confirmPassword="signupForm.confirmPassword = $event"
      @validate-password="validatePassword"
      @validate-confirm-password="validateConfirmPassword"
      @handle-signup="handleSignup"
      @go-to-page="goToPage"
    />
    
    <!-- Homepage Component -->
    <Homepage 
      v-else-if="currentPage === 'homepage'"
      :user-name="userName"
      :current-location="currentLocation"
      :search-query="searchQuery"
      :featured-destination="featuredDestination"
      :destinations="destinations"
      :filtered-destinations="filteredDestinations"
      @update:search-query="searchQuery = $event"
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
      :user-name="userName"
      :current-location="currentLocation"
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

    <!-- Siargao Details Component -->
    <SiargaoDetails 
      v-else-if="currentPage === 'siargao-details'"
      @plan-trip="handlePlanTrip"
      @go-back="goToPage('homepage')"
      @go-to-reviews="goToPage('siargao-reviews')"
    />

    <!-- Siargao Reviews Component -->
    <SiargaoReviewsPage 
      v-else-if="currentPage === 'siargao-reviews'"
      @plan-trip="handlePlanTrip"
      @go-back="goToPage('siargao-details')"
      @go-to-details="goToPage('siargao-details')"
    />
    
    <!-- DatePicker Component -->
    <DatePicker 
      v-else-if="currentPage === 'datepicker'"
      :selected-destination-name="selectedDestinationName"
      :current-date="currentDate"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      :current-month-year="currentMonthYear"
      :from-date-display="fromDateDisplay"
      :to-date-display="toDateDisplay"
      :calendar-days="calendarDays"
      @prev-month="prevMonth"
      @next-month="nextMonth"
      @select-date="selectDate"
      @go-to-accommodation="goToAccommodation"
      @go-to-page="goToPage"
    />
    
    <!-- Accommodation Component -->
    <Accommodation 
      v-else-if="currentPage === 'accommodation'"
      :selected-destination-name="selectedDestinationName"
      @view-booking="viewBooking"
      @go-to-page="goToPage"
    />
    
    <!-- Booking Component -->
    <Booking 
      v-else-if="currentPage === 'booking'"
      :current-booking-view="currentBookingView"
      :selected-property="selectedProperty"
      :selected-payment="selectedPayment"
      :booking="booking"
      :payment-methods="paymentMethods"
      :total-price="totalPrice"
      :current-property-image="currentPropertyImage"
      :current-confirmation-image="currentConfirmationImage"
      :booking-dates-display="bookingDatesDisplay"
      @show-confirmation-view="showConfirmationView"
      @show-listing-view="showListingView"
      @handle-view-map="handleViewMap"
      @select-payment-method="selectPaymentMethod"
      @handle-next="handleNext"
      @go-to-page="goToPage"
    />

    <!-- GCash Detail Component (Mobile Number Input) -->
    <GcashDetail 
      v-else-if="currentPage === 'gcash-detail'"
      :total-amount="parseFloat(totalPrice)"
      @go-back="goToPage('booking')"
      @payment-success="handleGcashPaymentSuccess"
    />

    <!-- GCash Payment Confirmation Component -->
    <GcashPaymentConfirm 
      v-else-if="currentPage === 'gcash-confirm'"
      :total-amount="parseFloat(totalPrice)"
      @go-back="goToPage('gcash-detail')"
      @payment-success="handlePaymentSuccess"
    />

    <!-- Mastercard Details Component -->
    <MastercardDetails 
      v-else-if="currentPage === 'mastercard-details'"
      :total-amount="parseFloat(totalPrice)"
      @go-back="goToPage('booking')"
      @payment-success="handlePaymentSuccess"
    />

    <!-- Payment Success Component -->
    <PaymentSuccess 
      v-else-if="currentPage === 'payment-success'"
      :receipt-data="receiptData"
      @go-back="goToPreviousPage"
      @go-home="goToPage('homepage')"
    />

    <!-- Itinerary Page Component -->
    <ItineraryPage 
      v-else-if="currentPage === 'itinerary'"
      @go-back="goToPage('homepage')"
      @trip-saved="handleTripSaved"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Login from './components/log_in.vue'
import Signup from './components/sign_up.vue'
import Homepage from './components/homepage.vue'
import TripsPage from './components/TripsPage.vue'
import NotificationPage from './components/NotificationPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import PersonalInformation from './components/PersonalInformation.vue'
import ChangePassword from './components/ChangePassword.vue'
import SiargaoDetails from './components/siargao_details.vue'
import SiargaoReviewsPage from './components/SiargaoReviewsPage.vue'
import DatePicker from './components/datePicker.vue'
import Accommodation from './components/accomodation.vue'
import Booking from './components/booking.vue'
import MastercardDetails from './components/mastercard_details.vue'
import GcashDetail from './components/gcash_detail.vue'
import GcashPaymentConfirm from './components/GcashPaymentConfirm.vue'
import PaymentSuccess from './components/PaymentSuccess.vue'
import ItineraryPage from './components/ItineraryPage.vue'

export default {
  name: 'App',
  components: {
    Login,
    Signup,
    Homepage,
    TripsPage,
    NotificationPage,
    ProfilePage,
    PersonalInformation,
    ChangePassword,
    SiargaoDetails,
    SiargaoReviewsPage,
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
    // Navigation state
    const currentPage = ref('login')
    const currentBookingView = ref('listing')
    const showDebug = ref(true)
    
    // User data
    const loginForm = ref({
      email: '',
      password: ''
    })
    
    const signupForm = ref({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: ''
    })
    
    const userName = ref('')
    const currentLocation = ref('Butuan City, Philippines')
    const searchQuery = ref('')
    const activeNav = ref('home')
    
    // Date picker data
    const currentDate = ref(new Date())
    const selectedStart = ref(null)
    const selectedEnd = ref(null)
    const selectedDestinationId = ref(null)
    const selectedDestinationName = ref('')
    
    // Booking data
    const selectedProperty = ref({})
    const selectedPayment = ref(null)
    const booking = ref({
      dates: '',
      nights: 0
    })

    // Receipt data for payment success
    const receiptData = ref({
      amount: '2,250.00',
      paymentMethod: 'GCash',
      receiptNumber: '21345255633546',
      dateTime: 'Nov. 24, 2015 | 18:39 PM'
    })

    // Sample data for destinations
    const featuredDestination = ref({
      id: 1,
      name: 'Siargao Island',
      description: 'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific.',
      image: '/images/siargao.jpg',
      tag: 'For you',
      rating: 4.9
    })
    
    const destinations = ref([
      {
        id: 2,
        name: 'Naked Island',
        description: 'A stunning sandbar surrounded by crystal-clear waters.',
        image: '/images/naked_island.jpg',
        rating: 4.9
      },
      {
        id: 3,
        name: 'Cloud 9',
        description: 'World-famous surf spot known for its powerful waves.',
        image: '/images/cloud.jpg',
        rating: 4.8
      },
      {
        id: 4,
        name: 'Guyam Island',
        description: 'A small, peaceful island ideal for relaxation and snorkeling.',
        image: '/images/guyam.jpg',
        rating: 4.7
      }
    ])

    // Property data
    const properties = ref({
      'paradiso': {
        title: 'Paradiso Hostel Bunks',
        subtitle: 'Solo - 1 single bed',
        location: 'General Luna, Philippines',
        description: [
          'Paradiso Hostel is a traditional style building with 5 double occupancy, fully air-conditioned private rooms each with its own toilet and baths, spacious work desks and benches.',
          'The hostel has its own kitchen should you wish to just chill in your room or if you\'re just feeling lazy (or nursing a hangover).'
        ],
        price: 700.00,
        image: '/images/paradiso.avif',
        confirmationImage: '/images/paradiso.1.avif'
      },
      'copacabana': {
        title: 'Copacabana Siargao',
        subtitle: 'Deluxe Room - 1 double bed',
        location: 'General Luna, Philippines',
        description: [
          'Copacabana Siargao offers comfortable accommodations with modern amenities and stunning ocean views.',
          'Located just steps away from the famous Cloud 9 surf break, this hotel is perfect for surf enthusiasts and beach lovers alike.'
        ],
        price: 2950.00,
        image: '/images/copacabana.jpg',
        confirmationImage: '/images/copacabana.jpg'
      },
      'retreat': {
        title: 'Paradiso Island Retreat',
        subtitle: 'Luxury Villa - 2 bedrooms',
        location: 'General Luna, Philippines',
        description: [
          'Experience luxury and tranquility at Paradiso Island Retreat, featuring private villas with panoramic ocean views.',
          'Each villa comes with a private pool, dedicated butler service, and access to our exclusive beachfront.'
        ],
        price: 4200.00,
        image: '/images/paradiso.1.avif',
        confirmationImage: '/images/paradiso.1.avif'
      }
    })

    // Payment methods with logos
    const paymentMethods = ref([
      { 
        id: 'mastercard', 
        name: 'Mastercard',
        logo: '/images/mastercard.png'
      },
      { 
        id: 'gcash', 
        name: 'GCash',
        logo: '/images/gcash_logo.png'
      }
    ])

    // Computed properties
    const filteredDestinations = computed(() => {
      if (!searchQuery.value) {
        return destinations.value
      }
      const query = searchQuery.value.toLowerCase()
      return destinations.value.filter(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.description.toLowerCase().includes(query)
      )
    })

    const isSignupFormValid = computed(() => {
      return signupForm.value.fullName && 
             signupForm.value.email && 
             signupForm.value.password && 
             signupForm.value.confirmPassword &&
             !signupForm.value.passwordError &&
             !signupForm.value.confirmPasswordError
    })

    // Date picker computed properties
    const currentMonthYear = computed(() => {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
      return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
    })

    const fromDateDisplay = computed(() => {
      if (!selectedStart.value) return 'Select start date'
      const monthNamesShort = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
      return `${monthNamesShort[currentDate.value.getMonth()]} ${selectedStart.value}, ${currentDate.value.getFullYear()}`
    })

    const toDateDisplay = computed(() => {
      if (!selectedEnd.value) return 'Select end date'
      const monthNamesShort = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
      return `${monthNamesShort[currentDate.value.getMonth()]} ${selectedEnd.value}, ${currentDate.value.getFullYear()}`
    })

    const calendarDays = computed(() => {
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth()
      const firstDay = new Date(year, month, 1).getDay()
      const lastDate = new Date(year, month + 1, 0).getDate()
      
      const days = []
      for (let i = 0; i < firstDay; i++) {
        days.push(null)
      }
      for (let d = 1; d <= lastDate; d++) {
        days.push(d)
      }
      return days
    })

    const totalPrice = computed(() => {
      return (selectedProperty.value.price * booking.value.nights).toFixed(2)
    })

    const currentPropertyImage = computed(() => {
      return selectedProperty.value.image || '/images/paradiso.1.avif'
    })

    const currentConfirmationImage = computed(() => {
      return selectedProperty.value.confirmationImage || '/images/paradiso.1.avif'
    })

    const bookingDatesDisplay = computed(() => {
      if (selectedStart.value && selectedEnd.value) {
        const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const startMonth = monthNamesShort[currentDate.value.getMonth()]
        const endMonth = monthNamesShort[currentDate.value.getMonth()]
        return `${startMonth} ${selectedStart.value} - ${endMonth} ${selectedEnd.value}, ${currentDate.value.getFullYear()}`
      }
      return 'Select dates'
    })
    
    // Methods
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

    const getNameFromEmail = (email) => {
      if (!email) return 'User'
      return email.split('@')[0]
    }
    
    const handleLogin = () => {
      console.log('Login attempt with:', loginForm.value)
      const nameFromEmail = getNameFromEmail(loginForm.value.email)
      userName.value = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      goToPage('homepage')
    }
    
    const handleSignup = () => {
      validatePassword()
      validateConfirmPassword()
      
      if (!isSignupFormValid.value) {
        alert('Please fix the form errors before submitting.')
        return
      }
      
      console.log('Signup attempt with:', {
        fullName: signupForm.value.fullName,
        email: signupForm.value.email,
        password: signupForm.value.password
      })
      
      if (signupForm.value.fullName) {
        userName.value = signupForm.value.fullName
      } else {
        // If no full name provided, use email name
        const nameFromEmail = getNameFromEmail(signupForm.value.email)
        userName.value = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      }
      
      goToPage('homepage')
    }
    
    const socialLogin = (provider) => {
      console.log(`Social login with ${provider}`)
      userName.value = 'User'
      goToPage('homepage')
    }
    
    const goToPage = (page) => {
      console.log('🚀 NAVIGATING TO:', page)
      currentPage.value = page
      if (page !== 'booking') {
        currentBookingView.value = 'listing'
      }
      if (page !== 'booking') {
        selectedPayment.value = null
      }
    }

    const goToPreviousPage = () => {
      if (currentPage.value === 'payment-success') {
        goToPage('booking')
      } else if (currentPage.value === 'gcash-confirm') {
        goToPage('gcash-detail')
      } else if (currentPage.value === 'gcash-detail' || currentPage.value === 'mastercard-details') {
        goToPage('booking')
      } else if (currentPage.value === 'personal-information') {
        goToPage('profile')
      } else if (currentPage.value === 'change-password') {
        goToPage('profile')
      } else if (currentPage.value === 'trips' || currentPage.value === 'notifications' || currentPage.value === 'profile') {
        goToPage('homepage')
      } else {
        goToPage('homepage')
      }
    }
    
    const viewDestination = (id) => {
      console.log('🎯 viewDestination called with ID:', id)
      
      let destination
      if (id === featuredDestination.value.id) {
        destination = featuredDestination.value
      } else {
        destination = destinations.value.find(dest => dest.id === id)
      }
      
      if (!destination) {
        console.error('Destination not found for ID:', id)
        return
      }
      
      selectedDestinationId.value = id
      selectedDestinationName.value = destination.name
      
      if (id === 1) {
        goToPage('siargao-details')
      } else {
        selectedStart.value = null
        selectedEnd.value = null
        goToPage('datepicker')
      }
    }

    const handlePlanTrip = () => {
      console.log('📅 Planning trip for Siargao Island')
      selectedStart.value = null
      selectedEnd.value = null
      selectedDestinationName.value = 'Siargao Island'
      goToPage('datepicker')
    }
    
    const setActiveNav = (navItem) => {
      activeNav.value = navItem
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

    const handleLogout = () => {
      console.log('User logged out')
      // Clear user data
      userName.value = ''
      loginForm.value = { email: '', password: '' }
      signupForm.value = { 
        fullName: '', 
        email: '', 
        password: '', 
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: ''
      }
      goToPage('login')
    }

    // Personal Information methods
    const handleSaveChanges = () => {
      console.log('Saving personal information changes')
      alert('Personal information saved successfully!')
      goToPage('profile')
    }

    const handleConnectFacebook = () => {
      console.log('Connecting with Facebook')
      alert('Facebook connection would be implemented here')
    }

    const handleDeleteAccount = () => {
      console.log('Deleting account')
      alert('Account deletion would be implemented here')
      goToPage('login')
    }

    const prevMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1,
        1
      )
      selectedStart.value = null
      selectedEnd.value = null
    }

    const nextMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1,
        1
      )
      selectedStart.value = null
      selectedEnd.value = null
    }

    const selectDate = (day) => {
      if (!selectedStart.value || (selectedStart.value && selectedEnd.value)) {
        selectedStart.value = day
        selectedEnd.value = null
      } else {
        selectedEnd.value = day
        if (selectedStart.value > selectedEnd.value) {
          [selectedStart.value, selectedEnd.value] = [selectedEnd.value, selectedStart.value]
        }
      }
    }

    const goToAccommodation = () => {
      if (selectedStart.value && selectedEnd.value) {
        console.log(`Date range selected for ${selectedDestinationName.value}: ${selectedStart.value} - ${selectedEnd.value} ${currentMonthYear.value}`)
        const nights = selectedEnd.value - selectedStart.value
        booking.value.nights = nights
        booking.value.dates = bookingDatesDisplay.value
        goToPage('accommodation')
      } else {
        alert('Please select a complete date range')
      }
    }

    const viewBooking = (propertyId) => {
      selectedProperty.value = properties.value[propertyId] || properties.value.paradiso
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

    const selectPaymentMethod = (method) => {
      console.log('Payment method selected:', method)
      selectedPayment.value = method
    }

    const handleNext = () => {
      console.log('handleNext called - selectedPayment:', selectedPayment.value)
      
      if (!selectedPayment.value) {
        alert('Please select a payment method first')
        return
      }

      console.log('Selected payment ID:', selectedPayment.value.id)
      
      if (selectedPayment.value.id === 'gcash') {
        goToPage('gcash-detail')
      } else if (selectedPayment.value.id === 'mastercard') {
        goToPage('mastercard-details')
      } else {
        alert(`Booking confirmed! Payment method: ${selectedPayment.value.name}\nTotal: ₱${totalPrice.value}`)
        setTimeout(() => {
          goToPage('homepage')
        }, 2000)
      }
    }

    // New method for GCash mobile number verification success
    const handleGcashPaymentSuccess = (paymentData) => {
      console.log('GCash mobile number verified, proceeding to payment confirmation:', paymentData)
      goToPage('gcash-confirm')
    }

    const handlePaymentSuccess = (paymentData) => {
      console.log('Payment completed successfully!', paymentData)
      
      if (paymentData) {
        receiptData.value = {
          amount: paymentData.amount ? paymentData.amount.toFixed(2) : totalPrice.value,
          paymentMethod: paymentData.paymentMethod || selectedPayment.value?.name || 'GCash',
          receiptNumber: generateReceiptNumber(),
          dateTime: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).replace(',', ' |')
        }
      }
      
      setTimeout(() => {
        goToPage('payment-success')
      }, 1000)
    }

    const generateReceiptNumber = () => {
      return Math.floor(100000000000000 + Math.random() * 900000000000000).toString()
    }

    const handleTripSaved = (tripData) => {
      console.log('Trip saved with data:', tripData)
    }

    return {
      currentPage,
      currentBookingView,
      showDebug,
      loginForm,
      signupForm,
      userName,
      currentLocation,
      searchQuery,
      activeNav,
      featuredDestination,
      destinations,
      filteredDestinations,
      isSignupFormValid,
      receiptData,
      validatePassword,
      validateConfirmPassword,
      handleLogin,
      handleSignup,
      socialLogin,
      goToPage,
      goToPreviousPage,
      viewDestination,
      handlePlanTrip,
      setActiveNav,
      handleLogout,
      handleSaveChanges,
      handleConnectFacebook,
      handleDeleteAccount,
      currentDate,
      selectedStart,
      selectedEnd,
      selectedDestinationId,
      selectedDestinationName,
      currentMonthYear,
      fromDateDisplay,
      toDateDisplay,
      calendarDays,
      prevMonth,
      nextMonth,
      selectDate,
      goToAccommodation,
      selectedProperty,
      selectedPayment,
      booking,
      paymentMethods,
      totalPrice,
      currentPropertyImage,
      currentConfirmationImage,
      bookingDatesDisplay,
      viewBooking,
      showConfirmationView,
      showListingView,
      handleViewMap,
      selectPaymentMethod,
      handleNext,
      handleGcashPaymentSuccess,
      handlePaymentSuccess,
      handleTripSaved
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

#app {
  font-family: 'Poppins', sans-serif;
  background: #f0f0f0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.debug-info {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-size: 12px;
  z-index: 1000;
  max-width: 300px;
}

.debug-info p {
  margin: 5px 0;
}

.debug-buttons {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.debug-buttons button {
  background: #667eea;
  color: white;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
}

.debug-buttons button:hover {
  background: #5a6fd8;
}
</style>