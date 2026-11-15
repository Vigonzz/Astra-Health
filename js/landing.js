import './header.js'
console.log('landing.js loaded')

// Grabbing necessary elements
const callsign = document.getElementById('callsign');
const startForm = document.getElementById('start-form')
// Listen for the click
startForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Read the name
    const name = callsign.value.trim();

    // Stop if it is empty
    if (!name) {
        callsign.focus();
        return;
    }

    // Save the name
    localStorage.setItem('astronautName', name);

    window.location.href = 'form.html';
});
