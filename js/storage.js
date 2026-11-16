console.log('storage.js?v=2 loaded')

// Gives back the list of all saved entries
export function getEntries() {
    const saved = localStorage.getItem('healthEntries');

    // Account for nothing being saved
    if (!saved) {
        return [];
    }
    return JSON.parse(saved);
}

export function saveEntry(entry) {
    const entries = getEntries();
    entries.push(entry);

    // Save the whole list
    localStorage.setItem('healthEntries', JSON.stringify(entries));


}