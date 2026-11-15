import { loadIndicators, getStatus } from './indicators.js'
import './body.js'
import './charts.js'
import './storage.js'
import './spaceweather.js'

const indicators = await loadIndicators();
console.log(indicators);

// Loading call
console.log('app.js loaded')

// Testing
console.log(getStatus(indicators[0], { value: 72 }));    // ok
console.log(getStatus(indicators[0], { value: 55 }));    // warn
console.log(getStatus(indicators[1], { systolic: 118, diastolic: 92 }));  // alert
console.log(getStatus(indicators[3], { value: 38.0 }));  // warn