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

  // Current editing trip ID
  const editingTripId = ref(null)

  // Getter for upcoming trips
  const getUpcomingTrips = computed(() => {
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

  // Get trip by ID (for viewing details) - FIXED VERSION
  const getTripById = (tripId) => {
    // Convert tripId to number if it's a string
    const numericTripId = typeof tripId === 'string' ? parseInt(tripId, 10) : tripId

    if (isNaN(numericTripId)) {
      console.error('❌ Invalid trip ID:', tripId)
      return null
    }

    // Try to find in upcoming trips
    const upcoming = upcomingTrips.value.find(trip => trip.id === numericTripId)

    if (upcoming) {
      console.log('✅ Found trip in upcoming:', { id: upcoming.id, name: upcoming.destinationName })
      return upcoming
    }

    // Try to find in past trips
    const past = pastTrips.value.find(trip => trip.id === numericTripId)

    if (past) {
      console.log('✅ Found trip in past:', { id: past.id, name: past.destinationName })
      return past
    }

    console.log('❌ Trip not found with ID:', numericTripId)
    console.log('📊 Upcoming trip IDs:', upcomingTrips.value.map(t => t.id))
    console.log('📊 Past trip IDs:', pastTrips.value.map(t => t.id))
    return null
  }

  // Set current editing trip
  const setEditingTrip = (tripId) => {
    console.log('✏️ Setting editing trip ID:', tripId)
    editingTripId.value = tripId
    localStorage.setItem('editingTripId', tripId.toString())
  }

  // Clear editing trip
  const clearEditingTrip = () => {
    console.log('🗑️ Clearing editing trip')
    editingTripId.value = null
    localStorage.removeItem('editingTripId')
  }

  // Get current editing trip
  const getEditingTrip = computed(() => {
    if (editingTripId.value) {
      const trip = getTripById(editingTripId.value)
      console.log('📋 Current editing trip:', trip)
      return trip
    }
    return null
  })

  // Parse end date from dates string (e.g., "Dec 20 - Dec 25, 2025")
  const parseEndDate = (datesString) => {
    if (!datesString || datesString === 'Select dates') return null

    try {
      // Try to extract the end date from the dates string
      // Format: "Dec 20 - Dec 25, 2025" or "Dec 20-25, 2025"
      const parts = datesString.split('-')
      if (parts.length < 2) return null

      const endPart = parts[1].trim() // "Dec 25, 2025"

      // Parse the date string
      const endDate = new Date(endPart)

      // Validate the date
      if (isNaN(endDate.getTime())) {
        console.warn('⚠️ Could not parse end date from:', datesString)
        return null
      }

      return endDate
    } catch (error) {
      console.error('❌ Error parsing end date:', error)
      return null
    }
  }

  // Check and update trip statuses (move past trips automatically)
  const checkAndUpdateTripStatuses = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to midnight for accurate date comparison

    const tripsToMove = []

    upcomingTrips.value.forEach((trip, index) => {
      let tripEndDate = null

      // First check if trip has explicit endDate property
      if (trip.endDate) {
        tripEndDate = new Date(trip.endDate)
      }
      // Otherwise, try to parse from dates string
      else if (trip.dates) {
        tripEndDate = parseEndDate(trip.dates)
      }

      if (tripEndDate) {
        tripEndDate.setHours(0, 0, 0, 0)

        // If trip end date has passed, mark for moving to past trips
        if (tripEndDate < today) {
          tripsToMove.push(index)
        }
      }
    })

    // Move trips from upcoming to past (reverse order to avoid index issues)
    tripsToMove.reverse().forEach(index => {
      const trip = upcomingTrips.value[index]
      trip.status = 'Past'
      trip.completedDate = new Date().toISOString()
      pastTrips.value.unshift(trip) // Add to beginning of past trips
      upcomingTrips.value.splice(index, 1)
    })

    if (tripsToMove.length > 0) {
      saveToLocalStorage()
      console.log(`✅ Moved ${tripsToMove.length} trip(s) to past trips`)
    }
  }

  // Add a COMPLETED trip (after booking/payment)
  const addCompletedTrip = (bookingData) => {
    console.log('🎨 addCompletedTrip called with:', bookingData)

    const { destinationId, destinationName, dates, nights, totalPrice, paymentMethod, receiptNumber, property, endDate } = bookingData

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
      id: Date.now(), // Use timestamp as unique ID
      destinationId: destinationId,
      destinationName: destinationName || destination.name,
      bookingDate: new Date().toISOString(),
      status: 'Upcoming',
      dates: dates || 'Select dates',
      endDate: endDate || null, // Store explicit end date if provided
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
      itinerary: {
        activities: [],
        notes: ''
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

  // Update trip itinerary and packlist - FIXED VERSION
  const updateTripItinerary = (tripId, itineraryData) => {
    console.log('🔄 Updating trip itinerary for ID:', tripId)
    console.log('📝 Itinerary data:', itineraryData)

    const numericTripId = typeof tripId === 'string' ? parseInt(tripId, 10) : tripId
    const trip = getTripById(numericTripId)

    if (!trip) {
      console.error('❌ Trip not found for update:', numericTripId)
      console.log('📊 Available trips:', upcomingTrips.value)
      return false
    }

    console.log('✅ Found trip to update:', { id: trip.id, name: trip.destinationName })

    // Ensure trip has proper structure
    if (!trip.itinerary) trip.itinerary = { activities: [], notes: '' }
    if (!trip.packlist) trip.packlist = { categories: [] }

    // Update itinerary activities
    if (itineraryData.activities) {
      trip.itinerary.activities = [...itineraryData.activities]
      console.log('📅 Updated activities:', trip.itinerary.activities)
    } else {
      console.log('⚠️ No activities data provided')
    }

    // Update packlist categories
    if (itineraryData.packlist) {
      trip.packlist.categories = [...itineraryData.packlist]
      console.log('🎒 Updated packlist categories:', trip.packlist.categories)
    } else {
      console.log('⚠️ No packlist data provided')
    }

    // Mark trip as updated
    trip.lastUpdated = new Date().toISOString()

    // Save to localStorage
    saveToLocalStorage()

    console.log('✅ Trip itinerary updated successfully:', {
      id: trip.id,
      destination: trip.destinationName,
      activitiesCount: trip.itinerary?.activities?.length || 0,
      categoriesCount: trip.packlist?.categories?.length || 0
    })

    return true
  }

  // Save trips to localStorage
  const saveToLocalStorage = () => {
    const tripsData = {
      upcomingTrips: upcomingTrips.value,
      pastTrips: pastTrips.value,
      editingTripId: editingTripId.value,
      lastSaved: new Date().toISOString()
    }
    localStorage.setItem('userTrips', JSON.stringify(tripsData))
    console.log('💾 Trips saved to localStorage at:', tripsData.lastSaved)
  }

  // Load trips from localStorage - FIXED VERSION
  const loadFromLocalStorage = () => {
    const savedTrips = localStorage.getItem('userTrips')

    if (savedTrips) {
      try {
        const tripsData = JSON.parse(savedTrips)

        // Ensure proper data structure for each trip
        upcomingTrips.value = (tripsData.upcomingTrips || []).map(trip => {
          return {
            ...trip,
            itinerary: trip.itinerary || { activities: [], notes: '' },
            packlist: trip.packlist || { categories: [] }
          }
        })

        pastTrips.value = (tripsData.pastTrips || []).map(trip => {
          return {
            ...trip,
            itinerary: trip.itinerary || { activities: [], notes: '' },
            packlist: trip.packlist || { categories: [] }
          }
        })

        editingTripId.value = tripsData.editingTripId || null

        console.log('🔥 Loaded trips from localStorage:', {
          upcomingCount: upcomingTrips.value.length,
          pastCount: pastTrips.value.length,
          editingTripId: editingTripId.value
        })

        // After loading, check if any trips should be moved to past
        checkAndUpdateTripStatuses()

      } catch (error) {
        console.error('❌ Error loading trips from localStorage:', error)
        // Initialize with empty arrays on error
        upcomingTrips.value = []
        pastTrips.value = []
        editingTripId.value = null
      }
    } else {
      console.log('🔭 No trips found in localStorage, initializing empty arrays')
      upcomingTrips.value = []
      pastTrips.value = []
      editingTripId.value = null
    }
  }

  // Get all trips (for debugging)
  const getAllTrips = computed(() => {
    return [...upcomingTrips.value, ...pastTrips.value]
  })

  // Debug function to print all trips
  const debugPrintAllTrips = () => {
    console.log('=== ALL TRIPS DEBUG INFO ===')
    console.log('Upcoming trips:', upcomingTrips.value)
    console.log('Past trips:', pastTrips.value)
    console.log('Editing trip ID:', editingTripId.value)

    upcomingTrips.value.forEach((trip, index) => {
      console.log(`Upcoming Trip ${index + 1}:`, {
        id: trip.id,
        name: trip.destinationName,
        activities: trip.itinerary?.activities?.length || 0,
        categories: trip.packlist?.categories?.length || 0
      })
    })

    console.log('=== END DEBUG INFO ===')
  }

  // Cancel a trip
  const cancelTrip = (tripId) => {
    const numericTripId = typeof tripId === 'string' ? parseInt(tripId, 10) : tripId
    upcomingTrips.value = upcomingTrips.value.filter(trip => trip.id !== numericTripId)
    saveToLocalStorage()
    console.log('❌ Trip cancelled:', numericTripId)
  }

  // Complete a trip (move from upcoming to past)
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
      console.log('✅ Trip completed:', numericTripId)
    }
  }

  // Clear all trips (for debugging)
  const clearTrips = () => {
    upcomingTrips.value = []
    pastTrips.value = []
    editingTripId.value = null
    localStorage.removeItem('userTrips')
    console.log('🗑️ All trips cleared')
  }

  // Force refresh from localStorage
  const refreshFromStorage = () => {
    loadFromLocalStorage()
    console.log('🔄 Force refreshed trips from storage')
  }

  // Initialize from localStorage
  loadFromLocalStorage()

  return {
    destinations,
    upcomingTrips,
    pastTrips,
    editingTripId,
    getUpcomingTrips,
    getPastTrips,
    getDestinationById,
    getDestinationImage,
    getTripById,
    setEditingTrip,
    clearEditingTrip,
    getEditingTrip,
    addCompletedTrip,
    updateTripItinerary,
    loadFromLocalStorage,
    cancelTrip,
    completeTrip,
    saveToLocalStorage,
    clearTrips,
    getAllTrips,
    debugPrintAllTrips,
    refreshFromStorage,
    checkAndUpdateTripStatuses // Export the new function
  }
})
