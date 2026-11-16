console.log('indicators.js?v=3 loaded')

export async function loadIndicators() {
    const response = await fetch('data/indicators.json?v=3');
    // Turn it into JS data
    const data = await response.json();
    return data.indicators;
}

export function getStatus(indicator, reading) {
    // Ranking so we can find the "worst" status
    const rank = { ok: 0, warn: 1, alert: 2 };

    // Starting at the best case
    let worst = 'ok';

    for (const part of indicator.parts) {
        // Get the parts num
        const value = reading[part.key];

        // Find the band it falls in
        const band = part.bands.find(b => 
            (b.min === null || value >= b.min) && 
            (b.max === null || value < b.max)
        );

        // Keep it if its worse
        if (rank[band.status] > rank[worst]) {
            worst = band.status;
        }
    }
    
    return worst;

}