import { defineStore } from 'pinia'

export const useDestinationsStore = defineStore('destinations', {
  state: () => ({
    searchQuery: '',
    featuredDestination: {
      id: 1,
      name: 'Siargao Island',
      description: 'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific.',
      image: '/images/destinations/siargao.jpg',
      rating: 4.9,
      tag: 'Featured'
    },
    destinations: [
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
    ],
    destinationDetails: {
      1: {
        id: 1,
        name: 'Siargao Island',
        location: 'Surigao del Norte',
        headerImage: '/images/destinations/siargao.jpg',
        distance: '114 km',
        description: 'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific. Known as the "Surfing Capital of the Philippines", Siargao is mainly responsible for introducing surfing to the country. This tear-drop shaped island offers pristine beaches, crystal-clear waters, and world-class surfing spots like Cloud 9.',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001692.7214812475!2d125.68288039999999!3d9.913874899999999',
        googleMapsUrl: 'https://www.google.com/maps/place/Siargao+Island',
        directionsUrl: 'https://www.google.com/maps/dir//Siargao+Island',
        averageRating: 4.9,
        totalTravelers: 237,
        reviews: []
      },
      2: {
        id: 2,
        name: 'Naked Island',
        location: 'Siargao, Surigao del Norte',
        headerImage: '/images/destinations/naked-island1.jpg',
        distance: '5 km from General Luna',
        description: 'Naked Island is a pure sandbar located in the middle of the ocean. The island gets its name from having absolutely no vegetation.',
        averageRating: 4.8,
        totalTravelers: 189,
        reviews: []
      },
      3: {
        id: 3,
        name: 'Guyam Island',
        location: 'Siargao, Surigao del Norte',
        headerImage: '/images/destinations/guyam1.jpg',
        distance: '7 km from General Luna',
        description: 'Guyam Island is a small, picturesque island with coconut trees, white sand beaches, and clear blue waters.',
        averageRating: 4.7,
        totalTravelers: 156,
        reviews: []
      },
      4: {
        id: 4,
        name: 'Cloud 9 Surfing Area',
        location: 'Siargao, Surigao del Norte',
        headerImage: '/images/destinations/cloud91.jpg',
        distance: '2 km from General Luna',
        description: 'Cloud 9 is the most famous surfing spot in Siargao, known for its perfect tubular waves.',
        averageRating: 4.9,
        totalTravelers: 342,
        reviews: []
      }
    }
  }),

  getters: {
    filteredDestinations: (state) => {
      if (!state.searchQuery) {
        return state.destinations
      }
      const query = state.searchQuery.toLowerCase()
      return state.destinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query)
      )
    },

    getDestinationById: (state) => (id) => {
      return state.destinationDetails[id] || null
    }
  },

  actions: {
    updateSearchQuery(query) {
      this.searchQuery = query
    },

    clearSearch() {
      this.searchQuery = ''
    }
  }
})
