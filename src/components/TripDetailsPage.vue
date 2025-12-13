<template>
  <div class="container">
    <div class="details-inner">
      <!-- Top colored header -->
      <header class="details-header">
        <button class="back-button" @click="$emit('go-back')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="details-header-text">
          <span class="details-label">Details</span>
          <!-- destination + dates placeholders -->
          <h1 class="trip-title">
            Trip to<br>
            <span class="trip-destination">Destination Name</span>
          </h1>
        </div>
        <div class="details-dates">
          <span class="dates-text">Nov 12 – 14, 2025</span>
        </div>
      </header>

      <!-- White content with three cards -->
      <main class="details-main">
        <!-- Accommodation card -->
        <section class="details-card">
          <h2 class="card-title">Accommodation</h2>
          <div class="card-divider"></div>
          
          <p class="card-heading">Property name here</p>
          <p class="card-text">Address / location line</p>
          <p class="card-text">Other accommodation details...</p>
        </section>

        <!-- Itinerary card -->
        <section class="details-card">
          <h2 class="card-title">Itinerary</h2>
          <div class="card-divider"></div>
          <p class="card-heading">Day 1</p>
          <ul class="card-list">
            <li>Morning activity</li>
            <li>Afternoon activity</li>
            <li>Evening activity</li>
          </ul>
        </section>

        <!-- Packlist card -->
        <section class="details-card">
          <h2 class="card-title">Packlist</h2>
          <div class="card-divider"></div>

          <p class="card-heading">Essentials</p>
          <ul class="checkbox-list">
            <li>
              <label>
                <input type="checkbox">
                <span>Item 1</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox">
                <span>Item 2</span>
              </label>
            </li>
          </ul>

          <p class="card-heading">Clothing</p>
          <ul class="checkbox-list">
            <li>
              <label>
                <input type="checkbox">
                <span>Clothing item 1</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox">
                <span>Clothing item 2</span>
              </label>
            </li>
          </ul>
        </section>
      </main>

      <!-- Bottom Edit button -->
      <div class="edit-bar">
        <button class="edit-button" @click="$emit('edit-trip')">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripDetailsPage',
  emits: ['go-back', 'edit-trip']
}
</script>

<style scoped>
:root {
  --muted: #6c757d;
  --dark: #111827;
  --teal-1: #0c3437;
}

/* CONTAINER */
.container {
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow-x: hidden;
}

.details-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* TOP HEADER AREA (dark teal) */
.details-header {
  background: #0c3437;
  color: #ffff;
  padding: 16px 16px 32px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  display: flex;
  align-items: flex-start;
  position: absolute;
  width: 100%;
  height:200px;
  z-index: 1;
  margin: 0;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #ffffff;
  padding: 8px;
  margin-right: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details-header-text {
  flex: 1;
  margin-left: 0;
}

.details-label {
  font-size: 16px;
  
}

.trip-title {
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  padding-top: 30px;
  margin-left:-30px;
  
}

.trip-destination {
  font-weight: 600;
}

.details-dates {
  margin-left: 8px;
  padding-top:80px;
  
}

.dates-text {
  font-size: 12px;
  opacity: 0.9;
  font-weight:200;
}

/* MAIN WHITE CONTENT */
.details-main {
  flex: 1;
  padding: 0 30px;
  background: #f8f9fa;
  flex-direction:column;
  gap: 12px;
  bottom: 2px;
}

/* CARD BASE (white rounded boxes) */
.details-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.075);
  padding: 20px;
  margin-bottom: 12px;
}

.details-main .details-card:first-child{
  margin-top: 150px;
  position:relative;
  z-index: 2;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 8px;
}

.card-divider {
  height: 1px;
  margin: 8px 0 10px;
  border-top: 1px dashed #e5e7eb;
  border-image: repeating-linear-gradient(
    to right, #e5e7eb 0 12px, 
    trasnparent 12px 18px) 1;
  
}

.card-heading {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px;
  color: var(--dark);
}

.card-text {
  font-size: 12px;
  color: var(--muted);
  margin: 0 0 4px;
  line-height: 1.4;
}

/* ITINERARY LIST */
.card-list {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
}

.card-list li {
  font-size: 12px;
  color: #374151;
  margin-bottom: 3px;
}

/* CHECKBOX LISTS */
.checkbox-list {
  list-style: none;
  padding: 0;
  margin: 4px 0 12px;
}

.checkbox-list li {
  margin-bottom: 6px;
}

.checkbox-list label {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #374151;
  cursor: pointer;
}

.checkbox-list input[type='checkbox'] {
  margin-right: 8px;
}
.details-card:last-child {
  margin-bottom: 4px;
}
/* EDIT BUTTON BAR */
.edit-bar {
  padding: 16px;
  background: #0c3437;
  margin: 20px;
  border-radius: 50px;
  
}

.edit-button {
  width: 100%;
  background: var(--teal-1);
  color: #ffffff;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family:'Poppins', sans-serif;
}

/* basic breakpoints */
@media (min-width: 768px) {
  .container {
    background: #f8f9fa;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
  }
  .details-inner {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
}
</style>
