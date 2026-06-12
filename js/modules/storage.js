
const STORAGE_KEY = 'GTC_USER_PREFERENCES';

export function saveUserPreferences(preferencesObj) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferencesObj));
    } catch (e) {
        console.warn("Unable to save preferences to Local Storage:", e);
    }
}

export function loadUserPreferences() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { lastQuizAttempt: null, theme: 'default' };
}