import { getStatus } from "./indicators.js"

console.log('body.js loaded')

export function colorZones(indicators, readings) {
    const zones = document.querySelectorAll('.zone');
    // Find the worst status in the zone
    const rank = { ok: 0, warn: 1, alert: 2 };
    
    const dialog = document.getElementById('zone-dialog');
    const content = document.getElementById('zone-content');
    
    const labels = {
        ok: 'Normal',
        warn: 'Monitor',
        alert: 'Alert'
    };

    // Go over the circles
    for (const zoneBtn of zones) {
        // Determine the zone
        const zoneName = zoneBtn.dataset.zone;
        // Get the indicator it belonged to
        const inZone = indicators.filter(ind => ind.zone === zoneName);

        // Start the circle
        let worst = 'ok';
        // Go over the zone indicators
        for (const ind of inZone) {
         // Get the indicators reading
         const reading = readings[ind.id];
         // Skip for no reading
         if (!reading) {
            continue;
        }

         // Retrieve the status
         const status = getStatus(ind, reading);

        if (rank[status] > rank[worst]) { 
            worst = status;
        }
        }
        // Close button
        const closeBtn = document.getElementById('zone-close');
        closeBtn.addEventListener('click', () => dialog.close());

        zoneBtn.classList.add(`status-${worst}`)
        zoneBtn.addEventListener('click', () => {
            // clear the old content
            content.innerHTML = '';
            for (const ind of inZone) {
                const reading = readings[ind.id];
                if (!reading) continue;
                const status = getStatus(ind, reading);

                // Format the value
                let displayValue;
                if (ind.id === 'blood_pressure') {
                    displayValue = `${reading.systolic} / ${reading.diastolic}`;
                } else {
                    displayValue = reading.value;
                }

                const block = document.createElement('div');
                block.innerHTML = `
                    <h3>${ind.name}</h3>
                    <p>${displayValue} ${ind.unit} – ${labels[status]}</p>
                    <p><strong>Why it matters in space:</strong> ${ind.effect}</p>
                `;

                // Add advise only when it feels necessary
                if (status !== 'ok') {
                block.innerHTML += `<p><strong>What to do:</strong> ${ind.actions[status]}</p>`;
                }

                content.appendChild(block);
            }
            dialog.showModal();
        });   
    }
}