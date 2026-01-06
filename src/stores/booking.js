// stores/booking.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  // State - Date Selection
  const currentDate = ref(new Date())
  const selectedStart = ref(null)
  const selectedEnd = ref(null)
  const selectedDestinationId = ref(null)
  const selectedDestinationName = ref('')

  // State - Property & Payment
  const selectedProperty = ref(null)
  const selectedPayment = ref(null)

  // State - Booking Details
  const booking = ref({
    dates: '',
    nights: 0
  })

  // State - Receipt Data
  const receiptData = ref({
    amount: '0.00',
    paymentMethod: 'GCash',
    receiptNumber: '',
    dateTime: ''
  })

  // Properties Data (accommodations) - ✅ FIXED DESCRIPTIONS
  const properties = ref({
    paradiso: {
      title: 'Paradiso Hostel Bunks',
      subtitle: 'Solo - 1 single bed',
      location: 'General Luna, Philippines',
      description: `Paradiso Hostel is a traditional style building with 5 double occupancy, fully air-conditioned private rooms each with its own toilet and baths, spacious work desks and benches. The hostel has its own kitchen should you wish to just chill in your room or if you're just feeling lazy or nursing a hangover.`,
      price: 700.0,
      image: '/images/accommodations/paradiso.1.avif',
      confirmationImage: '/images/accommodations/paradiso.1.avif'
    },
    copacabana: {
      title: 'Copacabana Siargao',
      subtitle: 'Solo - 1 queen-sized bed',
      location: 'General Luna, Philippines',
      description: `Copacabana Siargao rooms with air-conditioning, private bathrooms, bidets, work desks, free toiletries, showers, and wardrobes. Each room includes a terrace and free WiFi. Located just steps away from the famous Cloud 9 surf break, this hotel is perfect for surf enthusiasts and beach lovers alike.`,
      price: 2950.0,
      image: '/images/accommodations/copacabana.1.jpg',
      confirmationImage: '/images/accommodations/copacabana.1.jpg'
    },
    casavia: {
      title: 'Casavia Siargao',
      subtitle: 'Solo - 1 bunked bed',
      location: 'General Luna, Philippines',
      description: `Casavia Siargao in General Luna offers a garden, bar, and free WiFi. Guests can relax in the lounge or prepare meals in the shared kitchen. Additional amenities include air-conditioning, bidet, shower, and wardrobe. General Luna Beach is an 8-minute walk away. Nearby attractions include Guyam Island (4 km), Naked Island (14 km), and Magpupungko Rock Pools (38 km).`,
      price: 890.0,
      image: '/images/accommodations/casavia.1.jpg',
      confirmationImage: '/images/accommodations/casavia.1.jpg'
    }
  })

  // Payment Methods
  const paymentMethods = ref([
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: '/images/logos/mastercard.png'
    },
    {
      id: 'gcash',
      name: 'GCash',
      logo: '/images/logos/gcash_logo.png'
    }
  ])

  // Computed Properties
  const currentMonthYear = computed(() => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
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
    if (!selectedProperty.value || !booking.value.nights) return '0.00'
    return (selectedProperty.value.price * booking.value.nights).toFixed(2)
  })

  const bookingDatesDisplay = computed(() => {
    if (selectedStart.value && selectedEnd.value) {
      const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const startMonth = monthNamesShort[selectedStart.value.getMonth()]
      const endMonth = monthNamesShort[selectedEnd.value.getMonth()]
      return `${startMonth} ${selectedStart.value.getDate()} - ${endMonth} ${selectedEnd.value.getDate()}, ${selectedEnd.value.getFullYear()}`
    }
    return 'Select dates'
  })

  // Actions - Date Selection
  const prevMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  }

  const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  }

  const selectDate = (date) => {
    if (!selectedStart.value || selectedEnd.value) {
      selectedStart.value = date
      selectedEnd.value = null
    } else {
      if (date > selectedStart.value) {
        selectedEnd.value = date
      } else {
        selectedStart.value = date
        selectedEnd.value = null
      }
    }
  }

  const calculateNights = () => {
    if (selectedStart.value && selectedEnd.value) {
      const timeDiff = selectedEnd.value.getTime() - selectedStart.value.getTime()
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
      booking.value.nights = nights
      booking.value.dates = bookingDatesDisplay.value
    }
  }

  // Actions - Destination
  const setDestination = (id, name) => {
    selectedDestinationId.value = id
    selectedDestinationName.value = name
  }

  // Actions - Property & Payment
  const selectProperty = (propertyId) => {
    selectedProperty.value = properties.value[propertyId] || properties.value.paradiso
  }

  const selectPaymentMethod = (method) => {
    selectedPayment.value = method
  }

  // Actions - Payment Processing
  const generateReceiptNumber = () => {
    return Math.floor(100000000000000 + Math.random() * 900000000000000).toString()
  }

  const createBookingData = (paymentData) => {
    const receiptNumber = generateReceiptNumber()

    receiptData.value = {
      amount: paymentData?.amount ? paymentData.amount.toFixed(2) : totalPrice.value,
      paymentMethod: paymentData?.paymentMethod || selectedPayment.value?.name || 'GCash',
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

    return {
      destinationId: selectedDestinationId.value || 1,
      destinationName: selectedDestinationName.value || 'Siargao Island',
      dates: booking.value.dates,
      nights: booking.value.nights,
      totalPrice: totalPrice.value,
      paymentMethod: selectedPayment.value?.name || 'GCash',
      receiptNumber: receiptNumber,
      property: {
        title: selectedProperty.value?.title || 'Accommodation',
        location: selectedProperty.value?.location || '',
        image: selectedProperty.value?.image || ''
      }
    }
  }

  const completeBooking = (paymentData) => {
    return createBookingData(paymentData)
  }

  // Actions - Reset
  const resetBooking = () => {
    selectedProperty.value = null
    selectedPayment.value = null
    booking.value = {
      dates: '',
      nights: 0
    }
  }

  return {
    // State
    currentDate,
    selectedStart,
    selectedEnd,
    selectedDestinationId,
    selectedDestinationName,
    selectedProperty,
    selectedPayment,
    booking,
    receiptData,
    properties,
    paymentMethods,

    // Computed
    currentMonthYear,
    calendarDays,
    totalPrice,
    bookingDatesDisplay,

    // Actions
    prevMonth,
    nextMonth,
    selectDate,
    calculateNights,
    setDestination,
    selectProperty,
    selectPaymentMethod,
    generateReceiptNumber,
    createBookingData,
    completeBooking,
    resetBooking
  }
})
