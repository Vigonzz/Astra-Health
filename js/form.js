import './header.js'
import { loadIndicators } from './indicators.js'

console.log('form.js loaded')

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

        // Creating the label
        const label = document.createElement('label');
        label.textContent = `${indicator.name}: ${part.label} (${indicator.unit})`;
        label.htmlFor = fieldId
        // Put the elements on the page
        form.insertBefore(label, submitBtn);
        form.insertBefore(input, submitBtn);
    }
}