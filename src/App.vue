<template>
  <div id="app">
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
      @update:firstName="signupForm.firstName = $event"
      @update:lastName="signupForm.lastName = $event"
      @update:email="signupForm.email = $event"
      @update:password="signupForm.password = $event"
      @update:confirmPassword="signupForm.confirmPassword = $event"
      @validate-password="validatePassword"
      @validate-confirm-password="validateConfirmPassword"
      @handle-signup="handleSignup"
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
    <ChangePassword v-else-if="currentPage === 'change-password'" @go-to-page="goToPage" />

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

    <!-- GCash Detail Component -->
    <GcashDetail
      v-else-if="currentPage === 'gcash-detail'"
  :total-amount="parseFloat(totalPrice)"
  :selected-destination-name="selectedDestinationName"
  :selected-accommodation="selectedProperty.title || 'Accommodation'"
  @go-back="goToPage('booking')"
  @payment-success="handleGcashPaymentSuccess"
    />

    <!-- GCash Payment Confirmation Component -->
    <GcashPaymentConfirm
      v-else-if="currentPage === 'gcash-confirm'"
  :total-amount="parseFloat(totalPrice) + 50"
  :selected-accommodation="selectedProperty.title || 'Paradiso Hostel'"
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
      @go-itinerary="goToPage('itinerary')"
    />

    <!-- Itinerary Page Component -->
    <ItineraryPage
      v-else-if="currentPage === 'itinerary'"
      @go-back="goToPage('homepage')"
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
import { ref, computed, watch } from 'vue'
import { useTripsStore } from './stores/trips'
import BottomNav from './components/bottomNav.vue'
import Login from './components/log_in.vue'
import Signup from './components/sign_up.vue'
import ForgotPassword from './components/forgotpassword_page.vue'
import Homepage from './components/home_page.vue'
import TripsPage from './components/TripsPage.vue'
import NotificationPage from './components/NotificationPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import PersonalInformation from './components/PersonalInformation.vue'
import ChangePassword from './components/changePassword.vue'
import DestinationDetails from './components/destination-details.vue'
import DatePicker from './components/datePicker.vue'
import Accommodation from './components/accomodation_page.vue'
import Booking from './components/booking-page.vue'
import MastercardDetails from './components/mastercard_details.vue'
import GcashDetail from './components/gcash_detail.vue'
import GcashPaymentConfirm from './components/GcashPaymentConfirm.vue'
import PaymentSuccess from './components/paymentsuccess.vue'
import ItineraryPage from './components/ItineraryPage.vue'

export default {
  name: 'App',
  components: {
    BottomNav,
    Login,
    Signup,
    ForgotPassword,
    Homepage,
    TripsPage,
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
    ItineraryPage,
  },
  setup() {
    // Initialize trips store
    const tripsStore = useTripsStore()

    // Navigation state
    const currentPage = ref('login')
    const currentBookingView = ref('listing')
    const showDebug = ref(true)
    const showNav = ref(false)
    const activeDestinationTab = ref('details')
    const currentDestination = ref(null)

    // User data
    const loginForm = ref({
      email: '',
      password: '',
    })

    const signupForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: '',
    })

    const userName = ref('')
    const currentLocation = ref('')
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
      nights: 0,
    })

    // Receipt data for payment success
    const receiptData = ref({
      amount: '2,250.00',
      paymentMethod: 'GCash',
      receiptNumber: '21345255633546',
      dateTime: 'Nov. 24, 2015 | 18:39 PM',
    })

    // Destination data for all destinations
    const destinationData = {
      // Siargao Island
      1: {
        id: 1,
        name: 'Siargao Island',
        location: 'Surigao del Norte',
        headerImage: '/images/destinations/siargao.jpg',
        distance: '114 km',
        description:
          'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific. Known as the "Surfing Capital of the Philippines", Siargao is mainly responsible for introducing surfing to the country. This tear-drop shaped island offers pristine beaches, crystal-clear waters, and world-class surfing spots like Cloud 9.',
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001692.7214812475!2d125.68288039999999!3d9.913874899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f9b2982d8c6f%3A0x7c10a1b5166f150f!2sSiargao%20Island%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
        googleMapsUrl:
          'https://www.google.com/maps/place/Siargao+Island,+Surigao+del+Norte/@9.9138749,125.6828804,10z/data=!3m1!4b1!4m6!3m5!1s0x3301f9b2982d8c6f:0x7c10a1b5166f150f!8m2!3d9.9138749!4d126.065213!16zL20vMDJ4c2Nf?entry=ttu',
        directionsUrl:
          'https://www.google.com/maps/dir//Siargao+Island,+Surigao+del+Norte/@9.9138749,125.6828804,10z/data=!4m6!4m5!1m0!1m3!2m2!1d126.065213!2d9.9138749?entry=ttu',
        averageRating: 4.9,
        totalTravelers: 237,
        reviews: [
          {
            id: 1,
            author: 'Anna M., Australia',
            rating: 5,
            date: '2024-01-15',
            text: 'Absolutely stunning! Siargao is a paradise for surfers and beach lovers. Cloud 9 was incredible, and the island vibes were so chill. The locals are friendly and the food is amazing.',
            helpfulCount: 42,
          },
          {
            id: 2,
            author: 'Carlos R., Spain',
            rating: 5,
            date: '2024-02-10',
            text: 'One of the most beautiful islands I have ever visited. The waves are perfect for surfing and the beaches are pristine. Highly recommend staying in General Luna.',
            helpfulCount: 28,
          },
          {
            id: 3,
            author: 'Sarah K., USA',
            rating: 5,
            date: '2024-03-05',
            text: 'Siargao exceeded all my expectations. The natural beauty is breathtaking and the surfing spots are world-class. The island-hopping tour was the highlight of my trip.',
            helpfulCount: 35,
          },
          {
            id: 4,
            author: 'James L., UK',
            rating: 4,
            date: '2024-03-20',
            text: 'Great destination for surfing beginners and experts alike. The only downside is it gets crowded during peak season. Book accommodation early!',
            helpfulCount: 19,
          },
          {
            id: 5,
            author: 'Maria S., Philippines',
            rating: 5,
            date: '2024-04-12',
            text: 'As a Filipino, I am so proud of Siargao. The island is well-maintained and the tourism facilities are excellent. The sunset at Cloud 9 pier is magical.',
            helpfulCount: 56,
          },
        ],
      },
      2: {
        id: 2,
        name: 'Naked Island',
        location: 'Siargao, Surigao del Norte',
        headerImage: '/images/destinations/naked-island1.jpg',
        distance: '5 km from General Luna',
        description:
          "Naked Island is a pure sandbar located in the middle of the ocean. The island gets its name from having absolutely no vegetation - just pristine white sand surrounded by crystal clear turquoise waters. It's the perfect spot for swimming and sunbathing, though visitors should bring sun protection as there is no natural shade.",
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125443.9238787154!2d125.9620524!3d9.8782066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f8e1a2d5a5a5%3A0x7c10a1b5166f150f!2sNaked%20Island%2C%20General%20Luna%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
        googleMapsUrl: 'https://goo.gl/maps/xxxx-naked-island',
        directionsUrl: 'https://goo.gl/maps/xxxx-naked-directions',
        averageRating: 4.8,
        totalTravelers: 189,
        reviews: [
          {
            id: 6,
            author: 'Maria L., Philippines',
            rating: 5,
            date: '2024-01-15',
            text: 'Absolutely breathtaking! The sandbar feels like a piece of paradise. The water is crystal clear and perfect for swimming. Bring lots of sunscreen!',
            helpfulCount: 24,
          },
          {
            id: 7,
            author: 'Tom B., Canada',
            rating: 4,
            date: '2024-02-10',
            text: 'Beautiful spot but gets very hot with no shade. Perfect for photos and a quick swim. Make sure to go with a tour that provides umbrella.',
            helpfulCount: 18,
          },
          {
            id: 8,
            author: 'Lisa M., Australia',
            rating: 5,
            date: '2024-03-05',
            text: 'Like walking on a postcard! The sand is pure white and the water colors are incredible. One of the highlights of our Siargao trip.',
            helpfulCount: 32,
          },
        ],
      },
      3: {
        id: 3,
        name: 'Guyam Island',
        location: 'Siargao, Surigao del Norte',
        headerImage: '/images/destinations/guyam1.jpg',
        distance: '7 km from General Luna',
        description:
          "Guyam Island is a small, picturesque island with coconut trees, white sand beaches, and clear blue waters. It's part of the famous 3-island tour in Siargao and offers stunning views perfect for photography. The island has some shaded areas under coconut trees and is great for a relaxing afternoon.",
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125443.9238787154!2d125.9620524!3d9.8782066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f8e1a2d5a5a5%3A0x7c10a1b5166f150f!2sGuyam%20Island%2C%20General%20Luna%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
        googleMapsUrl: 'https://goo.gl/maps/xxxx-guyam-island',
        directionsUrl: 'https://goo.gl/maps/xxxx-guyam-directions',
        averageRating: 4.7,
        totalTravelers: 156,
        reviews: [
          {
            id: 9,
            author: 'David K., USA',
            rating: 5,
            date: '2024-01-15',
            text: 'Perfect little island! The coconut trees provide nice shade and the water is amazing for swimming. Great for a picnic lunch.',
            helpfulCount: 22,
          },
          {
            id: 10,
            author: 'Sophie R., France',
            rating: 4,
            date: '2024-02-10',
            text: 'Beautiful island but can get crowded during peak hours. The snorkeling around the island is quite good. Bring your own snacks.',
            helpfulCount: 15,
          },
          {
            id: 11,
            author: 'Kenji T., Japan',
            rating: 5,
            date: '2024-03-05',
            text: 'The most photogenic island in Siargao! The contrast between the white sand, blue water, and green palms is stunning.',
            helpfulCount: 29,
          },
        ],
      },
      4: {
        id: 4,
        name: 'Cloud 9 Surfing Area',
        location: 'Siargao, Surigao del Norte',
        headerImage: '/images/destinations/cloud91.jpg',
        distance: '2 km from General Luna',
        description:
          "Cloud 9 is the most famous surfing spot in Siargao, known for its perfect tubular waves. The iconic wooden pier offers the best view of surfers riding the waves. Even if you're not a surfer, it's worth visiting for the breathtaking sunset views and the lively atmosphere around the area.",
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125443.9238787154!2d125.9620524!3d9.8782066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f8e1a2d5a5a5%3A0x7c10a1b5166f150f!2sCloud%209%2C%20General%20Luna%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
        googleMapsUrl: 'https://goo.gl/maps/xxxx-cloud9',
        directionsUrl: 'https://goo.gl/maps/xxxx-cloud9-directions',
        averageRating: 4.9,
        totalTravelers: 342,
        reviews: [
          {
            id: 12,
            author: 'Mark S., Australia',
            rating: 5,
            date: '2024-01-15',
            text: 'As a surfer, this is paradise! The waves are consistently good and the local surf community is welcoming. The pier view is amazing.',
            helpfulCount: 45,
          },
          {
            id: 13,
            author: 'Emma W., UK',
            rating: 5,
            date: '2024-02-10',
            text: "Even if you don't surf, the sunset from the pier is worth the visit. So many great cafes and restaurants nearby too.",
            helpfulCount: 38,
          },
          {
            id: 14,
            author: 'Alex C., Brazil',
            rating: 4,
            date: '2024-03-05',
            text: 'Great surfing spot but gets very crowded. Best to go early in the morning. The energy around Cloud 9 is fantastic though!',
            helpfulCount: 27,
          },
        ],
      },
    }

    // Sample data for destinations (for homepage display)
    const featuredDestination = ref({
      id: 1,
      name: 'Siargao Island',
      description:
        'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific.',
      image: '/images/destinations/siargao.jpg',
      rating: 4.9,
      tag: 'Featured'
    })

    const destinations = ref([
      {
        id: 2,
        name: 'Naked Island',
        description: 'A stunning sandbar surrounded by crystal-clear waters.',
        image: '/images/destinations/naked_island.jpg',
        rating: 4.9,
      },
      {
        id: 3,
        name: 'Guyam Island',
        description: 'A small, peaceful island ideal for relaxation and snorkeling.',
        image: '/images/destinations/guyam.jpg',
        rating: 4.7,
      },
      {
        id: 4,
        name: 'Cloud 9',
        description: 'World-famous surf spot known for its powerful waves.',
        image: '/images/destinations/cloud9.jpg',
        rating: 4.8,
      },
    ])

    // Property data
    const properties = ref({
      paradiso: {
        title: 'Paradiso Hostel Bunks',
        subtitle: 'Solo - 1 single bed',
        location: 'General Luna, Philippines',
        description: [
          'Paradiso Hostel is a traditional style building with 5 double occupancy, fully air-conditioned private rooms each with its own toilet and baths, spacious work desks and benches.',
          "The hostel has its own kitchen should you wish to just chill in your room or if you're just feeling lazy (or nursing a hangover).",
        ],
        price: 700.0,
        image: '/images/accommodations/paradiso.1.avif',
        confirmationImage: '/images/accommodations/paradiso.1.avif',
      },
      copacabana: {
        title: 'Copacabana Siargao',
        subtitle: 'Solo - 1 queen-sized bed',
        location: 'General Luna, Philippines',
        description: [
          'Copacabana Siargao rooms with air-conditioning, private bathrooms, bidets, work desks, free toiletries, showers, and wardrobes. Each room includes a terrace and free WiFi.',
          'Located just steps away from the famous Cloud 9 surf break, this hotel is perfect for surf enthusiasts and beach lovers alike.',
        ],
        price: 2950.0,
        image: '/images/accommodations/copacabana.1.jpg',
        confirmationImage: '/images/accommodations/copacabana.1.jpg',
      },
      casavia: {
        title: 'Casavia Siargao',
        subtitle: 'Solo - 1 bunked bed',
        location: 'General Luna, Philippines',
        description: [
          'Casavia Siargao in General Luna offers a garden, bar, and free WiFi. Guests can relax in the lounge or prepare meals in the shared kitchen. Additional amenities include air-conditioning, bidet, shower, and wardrobe.',
          'General Luna Beach is an 8-minute walk away. Nearby attractions include Guyam Island (4 km), Naked Island (14 km), and Magpupungko Rock Pools (38 km).',
        ],
        price: 890.0,
        image: '/images/accommodations/casavia.1.jpg',
        confirmationImage: '/images/accommodations/casavia.1.jpg',
      },
    })

    // Payment methods with logos
    const paymentMethods = ref([
      {
        id: 'mastercard',
        name: 'Mastercard',
        logo: '/images/mastercard.png',
      },
      {
        id: 'gcash',
        name: 'GCash',
        logo: '/images/gcash_logo.png',
      },
    ])

    // Computed properties
    const filteredDestinations = computed(() => {
      if (!searchQuery.value) {
        return destinations.value
      }
      const query = searchQuery.value.toLowerCase()
      return destinations.value.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) || dest.description.toLowerCase().includes(query),
      )
    })

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

    // Date picker computed properties
    const currentMonthYear = computed(() => {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
    })

    const fromDateDisplay = computed(() => {
      if (!selectedStart.value) return 'Select start date'
      const monthNamesShort = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
      ]
      return `${monthNamesShort[currentDate.value.getMonth()]} ${selectedStart.value}, ${currentDate.value.getFullYear()}`
    })

    const toDateDisplay = computed(() => {
      if (!selectedEnd.value) return 'Select end date'
      const monthNamesShort = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
      ]
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
        const monthNamesShort = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
        const startMonth = monthNamesShort[currentDate.value.getMonth()]
        const endMonth = monthNamesShort[currentDate.value.getMonth()]
        return `${startMonth} ${selectedStart.value} - ${endMonth} ${selectedEnd.value}, ${currentDate.value.getFullYear()}`
      }
      return 'Select dates'
    })

    // Update showNav when currentPage changes
    const updateShowNav = () => {
      showNav.value = ['homepage', 'trips', 'notifications', 'profile', 'itinerary'].includes(currentPage.value)
      console.log('Show nav updated:', showNav.value, 'for page:', currentPage.value)
    }

    // Watch for currentPage changes
    watch(currentPage, () => {
      updateShowNav()
    })

    // Methods
    const validatePassword = () => {
      const password = signupForm.value.password

      if (password.length < 8) {
        signupForm.value.passwordError = 'Password must be at least 8 characters long'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        signupForm.value.passwordError =
          'Password must contain both uppercase and lowercase letters'
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

      // Save to localStorage
      localStorage.setItem('userName', userName.value)
      localStorage.setItem('isAuthenticated', 'true')

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
        firstName: signupForm.value.firstName,
        lastName: signupForm.value.lastName,
        email: signupForm.value.email,
        password: signupForm.value.password,
      })

      if (signupForm.value.firstName) {
        userName.value = signupForm.value.firstName
      } else {
        const nameFromEmail = getNameFromEmail(signupForm.value.email)
        userName.value = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      }

      // Save to localStorage
      localStorage.setItem('userName', userName.value)
      localStorage.setItem('isAuthenticated', 'true')

      goToPage('homepage')
    }

    const handleResetPassword = (email) => {
      console.log('Password reset requested for:', email)
      alert(`Password reset instructions sent to ${email}`)
      goToPage('login')
    }

    const socialLogin = (provider) => {
      console.log(`Social login with ${provider}`)
      userName.value = 'User'
      localStorage.setItem('userName', userName.value)
      localStorage.setItem('isAuthenticated', 'true')
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

      // Update navigation visibility
      updateShowNav()
    }

    const handleNavClick = (page) => {
      goToPage(page)
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
        itinerary: 'homepage',
      }

      if (pageMap[currentPage.value]) {
        goToPage(pageMap[currentPage.value])
      } else if (['trips', 'notifications', 'profile'].includes(currentPage.value)) {
        goToPage('homepage')
      } else {
        goToPage('homepage')
      }
    }

    const viewDestination = (id) => {
      console.log('🎯 viewDestination called with ID:', id)

      // Reset to details tab when viewing a new destination
      activeDestinationTab.value = 'details'

      // Set the selected destination ID - THIS IS CRITICAL FOR TRIPS
      selectedDestinationId.value = id
      console.log('📍 selectedDestinationId set to:', selectedDestinationId.value)

      // Find destination in our data
      const destination = destinationData[id]

      if (!destination) {
        console.error('Destination not found for ID:', id)
        return
      }

      // Set the current destination
      currentDestination.value = destination

      // Set the destination name for date picker
      selectedDestinationName.value = destination.name
      console.log('📍 selectedDestinationName set to:', selectedDestinationName.value)

      // Navigate to destination details page
      goToPage('destination-details')
    }

    const handlePlanTrip = () => {
      console.log(
        'Planning trip for destination:',
        currentDestination.value?.name || 'Siargao Island',
      )

      // If we have a current destination from the details page, use it
      if (currentDestination.value) {
        selectedDestinationName.value = currentDestination.value.name
      } else {
        // Fallback to Siargao Island
        selectedDestinationName.value = 'Siargao Island'
        currentDestination.value = destinationData[1]
      }

      selectedStart.value = null
      selectedEnd.value = null
      goToPage('datepicker')
    }

    const handleWriteReview = (destinationId) => {
      console.log('Writing review for destination:', destinationId)
      alert(`Review form would open for ${currentDestination.value?.name || 'this destination'}`)
    }

    const toggleReviewHelpful = (reviewId) => {
      console.log('Toggling helpful for review:', reviewId)
      if (currentDestination.value && currentDestination.value.reviews) {
        const review = currentDestination.value.reviews.find((r) => r.id === reviewId)
        if (review) {
          review.helpfulCount = review.helpfulCount + 1
          console.log(`Review ${reviewId} marked as helpful. New count: ${review.helpfulCount}`)
        }
      }
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
      userName.value = ''
      loginForm.value = { email: '', password: '' }
      signupForm.value = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: '',
      }
      currentDestination.value = null
      selectedDestinationId.value = null
      selectedDestinationName.value = ''

      // Clear localStorage
      localStorage.removeItem('userName')
      localStorage.removeItem('isAuthenticated')

      goToPage('login')
    }

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
        1,
      )
      selectedStart.value = null
      selectedEnd.value = null
    }

    const nextMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1,
        1,
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
          ;[selectedStart.value, selectedEnd.value] = [selectedEnd.value, selectedStart.value]
        }
      }
    }

    const goToAccommodation = () => {
      if (selectedStart.value && selectedEnd.value) {
        console.log(
          `Date range selected for ${selectedDestinationName.value}: ${selectedStart.value} - ${selectedEnd.value} ${currentMonthYear.value}`,
        )
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
        alert(
          `Booking confirmed! Payment method: ${selectedPayment.value.name}\nTotal: ₱${totalPrice.value}`,
        )
        setTimeout(() => {
          goToPage('homepage')
        }, 2000)
      }
    }

    const handleGcashPaymentSuccess = (paymentData) => {
      console.log('GCash mobile number verified, proceeding to payment confirmation:', paymentData)
      goToPage('gcash-confirm')
    }

    const handlePaymentSuccess = (paymentData) => {
      console.log('🎯 Payment Success Event Received:', paymentData)
      console.log('📊 Current State:', {
        selectedDestinationId: selectedDestinationId.value,
        selectedDestinationName: selectedDestinationName.value,
        currentDestination: currentDestination.value,
        selectedProperty: selectedProperty.value,
        bookingNights: booking.value.nights,
        bookingDates: booking.value.dates,
        totalPrice: totalPrice.value,
      })
      // Generate receipt number
      const receiptNumber = generateReceiptNumber()

      // Update receipt data
      receiptData.value = {
        amount: paymentData?.amount ? paymentData.amount.toFixed(2) : totalPrice.value,
        paymentMethod: paymentData?.paymentMethod || selectedPayment.value?.name || 'GCash',
        receiptNumber: receiptNumber,
        dateTime: new Date()
          .toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          .replace(',', ' |'),
      }

      console.log('📋 Receipt Data:', receiptData.value)

      // **CRITICAL: Get destination ID**
      let destinationId
      let destinationName

      if (selectedDestinationId.value) {
        // User clicked from homepage or has selectedDestinationId set
        destinationId = selectedDestinationId.value
        destinationName = selectedDestinationName.value || 'Siargao Island'
        console.log('📍 Using selectedDestinationId:', destinationId, destinationName)
      } else if (currentDestination.value) {
        // User came from destination details page
        destinationId = currentDestination.value.id
        destinationName = currentDestination.value.name
        console.log('📍 Using currentDestination:', destinationId, destinationName)
      } else {
        // Fallback to Siargao
        destinationId = 1
        destinationName = 'Siargao Island'
        console.log('📍 Using fallback destination:', destinationId, destinationName)
      }

      // Ensure we have valid dates
      const tripDates =
        booking.value.dates ||
        `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`

      // Ensure we have valid nights
      const tripNights = booking.value.nights || 3

      // Create booking data object
      const bookingData = {
        destinationId: destinationId,
        destinationName: destinationName,
        dates: tripDates,
        nights: tripNights,
        totalPrice: totalPrice.value || '2,150.00',
        paymentMethod: selectedPayment.value?.name || 'GCash',
        receiptNumber: receiptNumber,
        property: {
          title: selectedProperty.value?.title || `${destinationName} Accommodation`,
          location: selectedProperty.value?.location || destinationName,
          image: selectedProperty.value?.image || `/images/destinations/siargao.jpg`,
        },
      }

      console.log('📦 Booking Data for Trip Store:', bookingData)

      // **ADD THE TRIP TO UPCOMING TRIPS**
      console.log('🔄 Calling tripsStore.addCompletedTrip...')
      const newTrip = tripsStore.addCompletedTrip(bookingData)

      if (newTrip) {
        console.log('✅ Trip successfully added:', newTrip)
        console.log('📋 Current trips in store:', tripsStore.upcomingTrips)
      } else {
        console.error('❌ Failed to add trip to store')
      }

      // Save to localStorage for persistence
      console.log('💾 Saving to localStorage...')
      saveBookingData()

      // Also force save the trips store
      tripsStore.saveToLocalStorage()

      // Verify localStorage
      const savedTrips = localStorage.getItem('userTrips')
      console.log('📁 localStorage userTrips:', savedTrips)

      // Navigate to payment success page
      console.log('🚀 Navigating to payment-success page')
      setTimeout(() => {
        goToPage('payment-success')
      }, 1000)
    }

    const generateReceiptNumber = () => {
      return Math.floor(100000000000000 + Math.random() * 900000000000000).toString()
    }

    const saveBookingData = () => {
      // Save booking information for the itinerary page
      const bookingData = {
        destination: selectedDestinationName.value || 'Siargao Island',
        property: selectedProperty.value,
        dates: booking.value.dates,
        nights: booking.value.nights,
        totalPrice: totalPrice.value,
        paymentMethod: selectedPayment.value?.name,
        receiptNumber: receiptData.value.receiptNumber,
        bookingDate: new Date().toISOString(),
      }

      localStorage.setItem('lastBooking', JSON.stringify(bookingData))
      console.log('💾 Booking data saved to localStorage:', bookingData)
    }

    const handleTripSaved = (tripData) => {
      console.log('Trip saved with data:', tripData)
    }

    const forceLogin = () => {
      userName.value = 'John Doe'
      localStorage.setItem('userName', userName.value)
      localStorage.setItem('isAuthenticated', 'true')
      goToPage('homepage')
    }

    // Initialize showNav
    updateShowNav()

    return {
      tripsStore,
      currentPage,
      currentBookingView,
      showDebug,
      showNav,
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
      currentDestination,
      activeDestinationTab,
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
      saveBookingData,
      handleTripSaved,
      handleNavClick,
      forceLogin,
    }
  },
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
}

#app {
  font-family: 'Poppins', sans-serif;
  background: #f0f0f0;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px; /* Space for bottom nav */
}

.debug-info {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
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
