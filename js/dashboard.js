import {getStatus} from './indicators.js?v=3'

console.log('dashboard.js?v=3 loaded')

export function renderCards(indicators, readings) {

    // Find the associated container
    const dashboard = document.getElementById('dashboard')
    // Clear it
    dashboard.innerHTML = ''

    // Label for each status
    const labels = {
        ok: 'Normal',
        warn: 'Monitor',
        alert: 'Alert',
    };

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

        // Creating the button element
        const card = document.createElement('button');

        // Give it classes
        card.className = `card status-${status}`;

        // Data-id a hidden name tag
        card.dataset.id = indicator.id
        // Render button cards
        card.innerHTML = `<span class="card-name">${indicator.name}</span><span class="card-value"> ${displayValue} ${indicator.unit}</span><span class="card-status"> ${labels[status]}</span>`;
;

        dashboard.appendChild(card);
    }

}

