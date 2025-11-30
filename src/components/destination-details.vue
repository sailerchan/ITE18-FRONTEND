<template>
  <div class="container">
    <div class="booking-inner">
      <!-- Listing View -->
      <div v-if="currentDestinationView === 'listing'">
        <!-- Dynamic Image Header -->
        <div class="image-header" :style="{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(' + currentDestinationImage + ')' }">
          <button class="close-btn" @click="$emit('go-to-page', 'home')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="details-card-wrapper">
          <div class="details-content">
            <h2 class="property-title">{{ selectedDestination.name }}</h2>
            <p class="property-subtitle">{{ selectedDestination.address }}</p>

            <div class="location-info">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ selectedDestination.address }}</span>
              <button class="view-map" @click="$emit('handle-view-map')">View Map</button>
            </div>

            <div class="separator"></div>

            <div class="description">
              <p v-for="paragraph in selectedDestination.description" :key="paragraph">{{ paragraph }}</p>
            </div>
          </div>

          <div class="action-bar">
            <div class="price">₱{{ selectedDestination.price }}<span>/person</span></div>
            <button class="book-button" @click="$emit('show-confirmation-view')">Book Tour</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Your destination data
const destination_properties = ref({
  'naked_island': {
    name: 'Naked Island',
    description: [
      'It is a popular stop on island-hopping tours and is known for its powdery white sand and clear, warm waters, making it ideal for activities like sunbathing, swimming, and taking pictures. Due to the lack of shade, it is best to visit for a short time and bring sun protection.'
    ],
    address: 'General Luna, Siargao Island, Surigao del Norte, Philippines',
    image: '/images/destinations/naked-island1.jpg',
    price: 1200.00
  },
  'guyam_island': {
    name: 'Guyam Island',
    description: [
      'Guyam Island is relatively small surrounded by a crystal clear beach filled with palm trees. It is known for its picturesque scenery, white sandy beaches and vibrant coral reefs. Visitors to Guyam Island can enjoy various activities such as swimming, snorkeling, and relaxing on its pristine beaches.'
    ],
    address: 'General Luna, Siargao Island, Surigao del Norte, Philippines',
    image: '/images/destinations/guyam1.jpg',
    price: 1200.00
  },
  'cloud_9': {
    name: 'Cloud 9 Surfing Area',
    description: [
      'Whether you dip your toes in, snorkel with fish, or paddle across the reef, Cloud9 makes the water part of the experience.'
    ],
    address: 'General Luna, Siargao Island, Surigao del Norte, Philippines',
    image: '/images/destinations/cloud91.jpg',
    price: 800.00
  }
})

// Props and computed properties (you would pass these from parent)
const props = defineProps({
  selectedDestinationKey: {
    type: String,
    default: 'naked_island'
  },
  currentDestinationView: {
    type: String,
    default: 'listing'
  }
})

const selectedDestination = computed(() => {
  return destination_properties.value[props.selectedDestinationKey]
})

const currentDestinationImage = computed(() => {
  return selectedDestination.value.image
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
}

/* Same card styling as booking page */
.booking-inner {
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  padding: 0;
  margin-top: 0;
  position: relative;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: auto;
  display: flex;
  flex-direction: column;
}

/* Header image */
.image-header {
    height: 45vh;
    background-size: cover;
    background-position: center;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
}

.close-btn:hover {
    background-color: rgba(255, 255, 255, 1);
}

.close-btn i {
    color: #333;
    font-size: 18px;
}

.details-card-wrapper {
    background-color: white;
    border-radius: 30px 30px 15px 15px;
    margin-top: -30px;
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.details-content {
    padding: 30px 25px 20px;
    flex: 1;
}

.property-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1a1a1a;
    line-height: 1.2;
}

.property-subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 16px;
    line-height: 1.2;
}

.location-info {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    font-size: 15px;
    color: #666;
}

.location-info i {
    color: #1f4f5a;
    margin-right: 8px;
    font-size: 16px;
}

.view-map {
    color: #1f7a8c;
    text-decoration: underline;
    font-weight: 500;
    margin-left: auto;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 15px;
    -webkit-tap-highlight-color: transparent;
}

.separator {
    height: 1px;
    background-color: #eaeaea;
    margin: 24px 0;
}

.description {
    color: #444;
    line-height: 1.6;
    font-size: 15px;
}

.description p {
    margin-bottom: 16px;
}

.action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    background-color: white;
    border-top: 1px solid #eaeaea;
    margin-top: auto;
}

.price {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
}

.price span {
    font-size: 16px;
    font-weight: 400;
    color: #666;
}

.book-button {
    background-color: #0c3437;
    color: white;
    border: none;
    padding: 14px 30px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
}

.book-button:hover {
    background-color: #173c45;
}
</style>
