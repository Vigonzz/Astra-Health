import { loadIndicators, getStatus } from './indicators.js'
import './body.js'
import './charts.js'
import './storage.js'
import { getEntries } from './storage.js'
import './spaceweather.js'
import './dashboard.js'
import './header.js'
import { renderCards } from './dashboard.js'


// Get the saved list made in form
const indicators = await loadIndicators();
console.log(indicators);

const entries = getEntries()

// Grab the newest entry
const latest = entries[entries.length - 1];



// Loading call
console.log('app.js loaded')

// Testing
console.log(getStatus(indicators[0], { value: 72 }));    // ok
console.log(getStatus(indicators[0], { value: 55 }));    // warn
console.log(getStatus(indicators[1], { systolic: 118, diastolic: 92 }));  // alert
console.log(getStatus(indicators[3], { value: 38.0 }));  // warn

// Temp sample readings
const sampleReadings = {
  heart_rate:     { value: 72 },
  blood_pressure: { systolic: 134, diastolic: 82 },
  blood_glucose:  { value: 95 },
  body_temp:      { value: 37.8 },
  sleep:          { value: 5.5 },
  mood:           { value: 4 },
};

// Call renderCards
if (latest) {
  renderCards(indicators, latest.readings)
} else {
  renderCards(indicators, sampleReadings)
}