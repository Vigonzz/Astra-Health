import { loadIndicators, getStatus } from './indicators.js?v=3'
import { colorZones } from './body.js?v=3'
import './body.js?v=3'
import './charts.js?v=3'
import './storage.js?v=3'
import { getEntries } from './storage.js?v=3'
import './spaceweather.js?v=3'
import './dashboard.js?v=3'
import './header.js?v=3'
import { renderCards } from './dashboard.js?v=3'


// Get the saved list made in form
const indicators = await loadIndicators();
console.log(indicators);

const entries = getEntries()

// Grab the newest entry
const latest = entries[entries.length - 1];



// Loading call
console.log('app.js?v=3 loaded')

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

const readings = latest ? latest.readings : sampleReadings;

renderCards(indicators, readings);
colorZones(indicators, readings)
