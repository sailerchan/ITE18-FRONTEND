import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    // Date selection
    currentDate: new Date(),
    selectedStart: null,
    selectedEnd: null,

    // Destination
    selectedDestinationId: null,
    selectedDestinationName: '',

    // Property/Accommodation
    selectedProperty: {},

    // Payment
    selectedPayment: null,

    // Booking details
    booking: {
      dates: '',
      nights: 0
    },

    // Available properties
    properties: {
      paradiso: {
        title: 'Paradiso Hostel Bunks',
        subtitle: 'Solo - 1 single bed',
        location: 'General Luna, Philippines',
        description: [
          'Paradiso Hostel is a traditional style building with 5 double occupancy, fully air-conditioned private rooms each with its own toilet and baths, spacious work desks and benches.',
          "The hostel has its own kitchen should you wish to just chill in your room or if you're just feeling lazy (or nursing a hangover)."
        ],
        price: 700.0,
        image: '/images/accommodations/paradiso.1.avif',
        confirmationImage: '/images/accommodations/paradiso.1.avif'
      },
      copacabana: {
        title: 'Copacabana Siargao',
        subtitle: 'Solo - 1 queen-sized bed',
        location: 'General Luna, Philippines',
        description: [
          'Copacabana Siargao rooms with air-conditioning, private bathrooms, bidets, work desks, free toiletries, showers, and wardrobes. Each room includes a terrace and free WiFi.',
          'Located just steps away from the famous Cloud 9 surf break, this hotel is perfect for surf enthusiasts and beach lovers alike.'
        ],
        price: 2950.0,
        image: '/images/accommodations/copacabana.1.jpg',
        confirmationImage: '/images/accommodations/copacabana.1.jpg'
      },
      casavia: {
        title: 'Casavia Siargao',
        subtitle: 'Solo - 1 bunked bed',
        location: 'General Luna, Philippines',
        description: [
          'Casavia Siargao in General Luna offers a garden, bar, and free WiFi. Guests can relax in the lounge or prepare meals in the shared kitchen. Additional amenities include air-conditioning, bidet, shower, and wardrobe.',
          'General Luna Beach is an 8-minute walk away. Nearby attractions include Guyam Island (4 km), Naked Island (14 km), and Magpupungko Rock Pools (38 km).'
        ],
        price: 890.0,
        image: '/images/accommodations/casavia.1.jpg',
        confirmationImage: '/images/accommodations/casavia.1.jpg'
      }
    },

    // Payment methods
    paymentMethods: [
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
    ]
  }),

  getters: {
    totalPrice: (state) => {
      return (state.selectedProperty.price * state.booking.nights).toFixed(2)
    },

    bookingDatesDisplay: (state) => {
      if (state.selectedStart && state.selectedEnd) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const startMonth = monthNames[state.selectedStart.getMonth()]
        const endMonth = monthNames[state.selectedEnd.getMonth()]
        return `${startMonth} ${state.selectedStart.getDate()} - ${endMonth} ${state.selectedEnd.getDate()}, ${state.selectedEnd.getFullYear()}`
      }
      return 'Select dates'
    },

    calendarDays: (state) => {
      const year = state.currentDate.getFullYear()
      const month = state.currentDate.getMonth()
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
    },

    currentMonthYear: (state) => {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return `${monthNames[state.currentDate.getMonth()]} ${state.currentDate.getFullYear()}`
    }
  },

  actions: {
    setDestination(id, name) {
      this.selectedDestinationId = id
      this.selectedDestinationName = name
    },

    selectDate(date) {
      if (!this.selectedStart || (this.selectedStart && this.selectedEnd)) {
        this.selectedStart = date
        this.selectedEnd = null
      } else {
        if (date >= this.selectedStart) {
          this.selectedEnd = date
        } else {
          this.selectedStart = date
          this.selectedEnd = null
        }
      }
    },

    calculateNights() {
      if (this.selectedStart && this.selectedEnd) {
        const timeDiff = this.selectedEnd.getTime() - this.selectedStart.getTime()
        this.booking.nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
        this.booking.dates = this.bookingDatesDisplay
      }
    },

    prevMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      )
    },

    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      )
    },

    selectProperty(propertyId) {
      this.selectedProperty = this.properties[propertyId] || this.properties.paradiso
    },

    selectPaymentMethod(method) {
      this.selectedPayment = method
    },

    resetBooking() {
      this.selectedStart = null
      this.selectedEnd = null
      this.selectedProperty = {}
      this.selectedPayment = null
      this.booking = { dates: '', nights: 0 }
    }
  }
})
