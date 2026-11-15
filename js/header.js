// Get the astronaut name
const nameSpan = document.getElementById('astronaut-name');

// Read the saved name
const astroName = localStorage.getItem('astronautName');

// Checking to see if the span exist
if (nameSpan) {
    if (astroName) {
        nameSpan.textContent = astroName;
    } else {
        nameSpan.textContent = 'Astronaut';
    }
}

