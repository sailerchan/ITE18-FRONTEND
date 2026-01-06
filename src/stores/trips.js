// stores/trips.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTripsStore = defineStore('trips', () => {
  // State
  const upcomingTrips = ref([])
  const pastTrips = ref([])
  const editingTripId = ref(null)

  // Destinations data (moved from App.vue)
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
      image: '/images/destinations/nakedisland.jpg',
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

  // Computed
  const getUpcomingTrips = computed(() => upcomingTrips.value)
  const getPastTrips = computed(() => pastTrips.value)

  const getEditingTrip = computed(() => {
    if (editingTripId.value) {
      return getTripById(editingTripId.value)
    }
    return null
  })

  const getAllTrips = computed(() => {
    return [...upcomingTrips.value, ...pastTrips.value]
  })

  // Actions - Getters
  const getDestinationById = (id) => {
    return destinations.value.find(d => d.id === id)
  }

  const getDestinationImage = (id) => {
    const destination = getDestinationById(id)
    return destination ? destination.image : '/images/default-trip.jpg'
  }

  const getTripById = (tripId) => {
    const numericTripId = typeof tripId === 'string' ? parseInt(tripId, 10) : tripId

    if (isNaN(numericTripId)) {
      console.error('Invalid trip ID:', tripId)
      return null
    }

    const upcoming = upcomingTrips.value.find(trip => trip.id === numericTripId)
    if (upcoming) return upcoming

    const past = pastTrips.value.find(trip => trip.id === numericTripId)
    return past || null
  }

  // Actions - Trip Management
  const addCompletedTrip = (bookingData) => {
    const {
      destinationId,
      destinationName,
      dates,
      nights,
      totalPrice,
      paymentMethod,
      receiptNumber,
      property,
      endDate
    } = bookingData

    const destination = getDestinationById(destinationId)
    if (!destination) {
      console.error('Destination not found for ID:', destinationId)
      return null
    }

    const newTrip = {
      id: Date.now(),
      destinationId,
      destinationName: destinationName || destination.name,
      bookingDate: new Date().toISOString(),
      status: 'Upcoming',
      dates: dates || 'Select dates',
      endDate: endDate || null,
      nights: nights || 0,
      totalPrice: totalPrice || '0.00',
      receiptNumber: receiptNumber || `TRP-${Date.now().toString().slice(-8)}`,
      paymentMethod: paymentMethod || 'Unknown',
      accommodation: {
        title: property?.title || `${destination.name} Accommodation`,
        location: property?.location || destination.name,
        image: property?.image || destination.image
      },
      destinationImage: destination.image,
      itinerary: {
        activities: [],
        notes: ''
      },
      packlist: {
        categories: []
      }
    }

    upcomingTrips.value.push(newTrip)
    saveToLocalStorage()
    return newTrip
  }

  const updateTripItinerary = (tripId, itineraryData) => {
    const numericTripId = typeof tripId === 'string' ? parseInt(tripId, 10) : tripId
    const trip = getTripById(numericTripId)

    if (!trip) {
      console.error('Trip not found for update:', numericTripId)
      return false
    }

    if (!trip.itinerary) trip.itinerary = { activities: [], notes: '' }
    if (!trip.packlist) trip.packlist = { categories: [] }

    if (itineraryData.activities) {
      trip.itinerary.activities = [...itineraryData.activities]
    }

    if (itineraryData.packlist) {
      trip.packlist.categories = [...itineraryData.packlist]
    }

    trip.lastUpdated = new Date().toISOString()
    saveToLocalStorage()
    return true
  }

  const setEditingTrip = (tripId) => {
    editingTripId.value = tripId
    localStorage.setItem('editingTripId', tripId.toString())
  }

  const clearEditingTrip = () => {
    editingTripId.value = null
    localStorage.removeItem('editingTripId')
  }

  const cancelTrip = (tripId) => {
    const numericTripId = typeof tripId === 'string' ? parseInt(tripId, 10) : tripId
    upcomingTrips.value = upcomingTrips.value.filter(trip => trip.id !== numericTripId)
    saveToLocalStorage()
  }

  const completeTrip = (tripId) => {
    const numericTripId = typeof tripId === 'string' ? parseInt(tripId, 10) : tripId
    const tripIndex = upcomingTrips.value.findIndex(trip => trip.id === numericTripId)

    if (tripIndex !== -1) {
      const completedTrip = upcomingTrips.value[tripIndex]
      completedTrip.status = 'Completed'
      completedTrip.completedDate = new Date().toISOString()

      pastTrips.value.push(completedTrip)
      upcomingTrips.value.splice(tripIndex, 1)
      saveToLocalStorage()
    }
  }

  // Actions - Status Checking
  const checkAndUpdateTripStatuses = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tripsToMove = []

    upcomingTrips.value.forEach((trip, index) => {
      let tripEndDate = null

      if (trip.endDate) {
        tripEndDate = new Date(trip.endDate)
      } else if (trip.dates) {
        tripEndDate = parseEndDate(trip.dates)
      }

      if (tripEndDate) {
        tripEndDate.setHours(0, 0, 0, 0)
        if (tripEndDate < today) {
          tripsToMove.push(index)
        }
      }
    })

    tripsToMove.reverse().forEach(index => {
      const trip = upcomingTrips.value[index]
      trip.status = 'Past'
      trip.completedDate = new Date().toISOString()
      pastTrips.value.unshift(trip)
      upcomingTrips.value.splice(index, 1)
    })

    if (tripsToMove.length > 0) {
      saveToLocalStorage()
    }
  }

  const parseEndDate = (datesString) => {
    if (!datesString || datesString === 'Select dates') return null

    try {
      const parts = datesString.split('-')
      if (parts.length !== 2) return null

      const endPart = parts[1].trim()
      const endDate = new Date(endPart)

      if (isNaN(endDate.getTime())) {
        console.warn('Could not parse end date from:', datesString)
        return null
      }

      return endDate
    } catch (error) {
      console.error('Error parsing end date:', error)
      return null
    }
  }

  // Actions - LocalStorage
  const saveToLocalStorage = () => {
    const tripsData = {
      upcomingTrips: upcomingTrips.value,
      pastTrips: pastTrips.value,
      editingTripId: editingTripId.value,
      lastSaved: new Date().toISOString()
    }
    localStorage.setItem('userTrips', JSON.stringify(tripsData))
  }

  const loadFromLocalStorage = () => {
    const savedTrips = localStorage.getItem('userTrips')

    if (savedTrips) {
      try {
        const tripsData = JSON.parse(savedTrips)

        upcomingTrips.value = (tripsData.upcomingTrips || []).map(trip => ({
          ...trip,
          itinerary: trip.itinerary || { activities: [], notes: '' },
          packlist: trip.packlist || { categories: [] }
        }))

        pastTrips.value = (tripsData.pastTrips || []).map(trip => ({
          ...trip,
          itinerary: trip.itinerary || { activities: [], notes: '' },
          packlist: trip.packlist || { categories: [] }
        }))

        editingTripId.value = tripsData.editingTripId || null

        checkAndUpdateTripStatuses()
      } catch (error) {
        console.error('Error loading trips from localStorage:', error)
        upcomingTrips.value = []
        pastTrips.value = []
        editingTripId.value = null
      }
    }
  }

  const clearTrips = () => {
    upcomingTrips.value = []
    pastTrips.value = []
    editingTripId.value = null
    localStorage.removeItem('userTrips')
  }

  const refreshFromStorage = () => {
    loadFromLocalStorage()
  }

  return {
    // State
    destinations,
    upcomingTrips,
    pastTrips,
    editingTripId,

    // Computed
    getUpcomingTrips,
    getPastTrips,
    getEditingTrip,
    getAllTrips,

    // Actions
    getDestinationById,
    getDestinationImage,
    getTripById,
    addCompletedTrip,
    updateTripItinerary,
    setEditingTrip,
    clearEditingTrip,
    cancelTrip,
    completeTrip,
    checkAndUpdateTripStatuses,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearTrips,
    refreshFromStorage
  }
})
