import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTripsStore = defineStore('trips', () => {
  // Sample destinations data
  const destinations = ref([
    {
      id: 1,
      name: 'Siargao Island',
      description: 'Surfing capital of the Philippines',
      image: '/images/destinations/siargao.jpg',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Naked Island',
      description: 'A stunning sandbar surrounded by crystal-clear waters.',
      image: '/images/destinations/naked_island.jpg',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Guyam Island',
      description: 'A small, peaceful island ideal for relaxation and snorkeling.',
      image: '/images/destinations/guyam.jpg',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Cloud 9',
      description: 'World-famous surf spot known for its powerful waves.',
      image: '/images/destinations/cloud9.jpg',
      rating: 4.8
    }
  ])

  // Upcoming trips array
  const upcomingTrips = ref([])

  // Past trips array
  const pastTrips = ref([])

  // Getter for upcoming trips
  const getUpcomingTrips = computed(() => {
    console.log('📄 Getting upcoming trips:', upcomingTrips.value)
    return upcomingTrips.value
  })

  // Getter for past trips
  const getPastTrips = computed(() => pastTrips.value)

  // Get destination by ID
  const getDestinationById = (id) => {
    return destinations.value.find(d => d.id === id)
  }

  // Get destination image by ID
  const getDestinationImage = (id) => {
    const destination = getDestinationById(id)
    return destination ? destination.image : '/images/default-trip.jpg'
  }

  // Get trip by ID (for viewing details)
  const getTripById = (tripId) => {
    const upcoming = upcomingTrips.value.find(trip => trip.id === tripId)
    if (upcoming) return upcoming
    
    const past = pastTrips.value.find(trip => trip.id === tripId)
    return past
  }

  // Add a COMPLETED trip (after booking/payment)
  const addCompletedTrip = (bookingData) => {
    console.log('🎨 addCompletedTrip called with:', bookingData)

    const { destinationId, destinationName, dates, nights, totalPrice, paymentMethod, receiptNumber, property } = bookingData

    // Get destination from our data
    const destination = getDestinationById(destinationId)

    if (!destination) {
      console.error('❌ Destination not found for ID:', destinationId)
      console.log('📋 Available destinations:', destinations.value)
      return null
    }

    console.log('✅ Found destination:', destination)

    // Create a new trip object
    const newTrip = {
      id: Date.now(),
      destinationId: destinationId,
      destinationName: destinationName || destination.name,
      bookingDate: new Date().toISOString(),
      status: 'Upcoming',
      dates: dates || 'Select dates',
      nights: nights || 0,
      totalPrice: totalPrice || '0.00',
      receiptNumber: receiptNumber || 'TRP-' + Date.now().toString().slice(-8),
      paymentMethod: paymentMethod || 'Unknown',
      accommodation: property || {
        title: `${destination.name} Accommodation`,
        location: destination.name,
        image: destination.image
      },
      destinationImage: destination.image,
      // NEW: Itinerary and Packlist fields
      itinerary: {
        activities: []
      },
      packlist: {
        categories: []
      }
    }

    console.log('✈️ New trip created:', newTrip)

    // Add to upcoming trips
    upcomingTrips.value.push(newTrip)

    console.log('📊 Upcoming trips after push:', upcomingTrips.value)

    // Save to localStorage
    saveToLocalStorage()

    console.log('💾 Saved to localStorage')

    return newTrip
  }

  // Update trip itinerary and packlist
  const updateTripDetails = (tripId, itineraryData, packlistData) => {
    const trip = getTripById(tripId)
    
    if (!trip) {
      console.error('Trip not found:', tripId)
      return false
    }

    // Update itinerary
    if (itineraryData) {
      trip.itinerary = {
        activities: itineraryData.activities || []
      }
    }

    // Update packlist
    if (packlistData) {
      trip.packlist = {
        categories: packlistData.categories || []
      }
    }

    // Save to localStorage
    saveToLocalStorage()

    console.log('✅ Trip details updated:', trip)
    return true
  }

  // Save trips to localStorage
  const saveToLocalStorage = () => {
    const tripsData = {
      upcomingTrips: upcomingTrips.value,
      pastTrips: pastTrips.value
    }
    localStorage.setItem('userTrips', JSON.stringify(tripsData))
    console.log('💾 Trips saved to localStorage:', tripsData)
  }

  // Load trips from localStorage
  const loadFromLocalStorage = () => {
    const savedTrips = localStorage.getItem('userTrips')

    if (savedTrips) {
      try {
        const tripsData = JSON.parse(savedTrips)
        upcomingTrips.value = tripsData.upcomingTrips || []
        pastTrips.value = tripsData.pastTrips || []
        console.log('🔥 Loaded trips from localStorage:', tripsData)
      } catch (error) {
        console.error('Error loading trips from localStorage:', error)
      }
    } else {
      console.log('🔭 No trips found in localStorage')
    }
  }

  // Cancel a trip
  const cancelTrip = (tripId) => {
    upcomingTrips.value = upcomingTrips.value.filter(trip => trip.id !== tripId)
    saveToLocalStorage()
  }

  // Complete a trip (move from upcoming to past)
  const completeTrip = (tripId) => {
    const tripIndex = upcomingTrips.value.findIndex(trip => trip.id === tripId)

    if (tripIndex !== -1) {
      const completedTrip = upcomingTrips.value[tripIndex]
      completedTrip.status = 'Completed'
      completedTrip.bookingDate = new Date().toISOString()

      pastTrips.value.push(completedTrip)
      upcomingTrips.value.splice(tripIndex, 1)
      saveToLocalStorage()
    }
  }

  // Clear all trips (for debugging)
  const clearTrips = () => {
    upcomingTrips.value = []
    pastTrips.value = []
    localStorage.removeItem('userTrips')
    console.log('🗑️ All trips cleared')
  }

  // Initialize from localStorage
  loadFromLocalStorage()

  return {
    destinations,
    upcomingTrips,
    pastTrips,
    getUpcomingTrips,
    getPastTrips,
    getDestinationById,
    getDestinationImage,
    getTripById,
    addCompletedTrip,
    updateTripDetails,
    loadFromLocalStorage,
    cancelTrip,
    completeTrip,
    saveToLocalStorage,
    clearTrips
  }
})