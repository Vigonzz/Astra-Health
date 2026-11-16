import './header.js?v=2'
import { loadIndicators } from './indicators.js?v=2'
import { getEntries } from './storage.js?v=2';
import { saveEntry } from './storage.js?v=2';

console.log('form.js?v=2 loaded');

// Load the indicators
const indicators = await loadIndicators();

// Find the form
const form = document.getElementById('health-form');
// Grab the health btn
const submitBtn = document.getElementById('health-btn');

for (const indicator of indicators) {
    for (const part of indicator.parts) {
        // Building the label and the input
        const fieldId = `${indicator.id}-${part.key}`;

        // Create the input
        const input = document.createElement('input');
        input.type = 'number';
        input.id = fieldId;
        input.name = fieldId;
        input.step = 'any';
        input.required = true

        // Creating the label
        const label = document.createElement('label');
        label.textContent = `${indicator.name}: ${part.label} (${indicator.unit})`;
        label.htmlFor = fieldId
        // Put the elements on the page
        form.insertBefore(label, submitBtn);
        form.insertBefore(input, submitBtn);
    }
}

// Add event listener
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // The empty entry
    const entry = { 
    date: new Date().toISOString(),
    readings: {}
    };

    for (const indicator of indicators) {
        for (const part of indicator.parts) {
            // Rebuild the id
            const fieldId = `${indicator.id}-${part.key}`;
            const input = document.getElementById(fieldId);
            // convert the input to a num
            const value = Number(input.value);

            if (!entry.readings[indicator.id]) {
                entry.readings[indicator.id] = {};
            }
            entry.readings[indicator.id][part.key] = value;
        }
    }
    saveEntry(entry);
    window.location.href = 'dashboard.html';
});
