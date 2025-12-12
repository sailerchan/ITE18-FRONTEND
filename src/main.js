import { createApp } from 'vue'
import { createPinia } from 'pinia'  // Import Pinia
import App from './App.vue'
import './styles/global.css'

// Create Pinia instance
const pinia = createPinia()

// Create app and use Pinia
const app = createApp(App)
app.use(pinia)
app.mount('#app')
