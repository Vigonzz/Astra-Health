import {getStatus} from './indicators.js'

console.log('dashboard.js loaded')

export function renderCards(indicators, readings) {

    // Find the associated container
    const dashboard = document.getElementById('dashboard')
    // Clear it
    dashboard.innerHTML = ''

    // Loop over the indicators 
    for (const indicator of indicators) {
        // Get the readings
        const reading = readings[indicator.id];

        // If the indicator has no reading just continue on
        if (!reading) {
            continue
        }

        // Get status 
        const status = getStatus(indicator, reading);

        let displayValue;

        // Fill in displayValue
        if (indicator.id === 'blood_pressure') {
            displayValue = `${reading.systolic} / ${reading.diastolic}`; 
        } else {
            displayValue = reading.value;
        }

        // Testing:
        console.log(indicator.name, status, displayValue);
    }

}

