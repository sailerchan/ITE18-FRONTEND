import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // Shared state
  const selectedDestinationId = ref(null)
  const selectedDestinationName = ref('')
  const selectedProperty = ref({})
  const selectedPayment = ref(null)
  const booking = ref({
    dates: '',
    nights: 0,
  })
  const receiptData = ref({
    amount: '2,250.00',
    paymentMethod: 'GCash',
    receiptNumber: '21345255633546',
    dateTime: 'Nov. 24, 2015 | 18:39 PM',
  })

  // Destination data (move from App.vue)
  const destinationData = {
    1: {
      id: 1,
      name: 'Siargao Island',
      location: 'Surigao del Norte',
      headerImage: '/images/destinations/siargao.jpg',
      // ... rest of destination data
    }
    // ... other destinations
  }

  // Computed properties
  const totalPrice = computed(() => {
    return (selectedProperty.value.price * booking.value.nights).toFixed(2)
  })

  // Methods
  const handlePaymentSuccess = (paymentData) => {
    // Your payment success logic
    console.log('Payment success:', paymentData)
  }

  return {
    selectedDestinationId,
    selectedDestinationName,
    selectedProperty,
    selectedPayment,
    booking,
    receiptData,
    destinationData,
    totalPrice,
    handlePaymentSuccess
  }
})
