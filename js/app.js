import { loadIndicators, getStatus } from './indicators.js'
import './body.js'
import './charts.js'
import './storage.js'
import './spaceweather.js'
import './dashboard.js'
import { renderCards } from './dashboard.js'

const indicators = await loadIndicators();
console.log(indicators);

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
renderCards(indicators, sampleReadings)