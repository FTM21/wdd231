// Company logo colors and backgrounds
const logoStyles = {
    "SNG": { background: "#1e4d72", color: "#ffffff" },
    "BAI": { background: "#c41e3a", color: "#ffffff" },
    "UTL": { background: "#ff6b35", color: "#ffffff" },
    "RFG": { background: "#2e8b57", color: "#ffffff" },
    "OMP": { background: "#8b4513", color: "#ffffff" },
    "LMC": { background: "#00ced1", color: "#ffffff" },
    "TAS": { background: "#4169e1", color: "#ffffff" }
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    updateFooterDates();
    loadWeather();
    loadSpotlights();
});

// Navigation functionality
function initializeNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('show');
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('show');
            }
        });

        // Close nav when window is resized to larger screen
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('show');
            }
        });
    }
}

// Update footer dates
function updateFooterDates() {
    const currentYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');
    
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}

// Weather functionality
async function loadWeather() {
    const weatherInfo = document.getElementById('weatherInfo');
    
    try {
        // Mock weather data for Luanda, Angola
        const mockWeatherData = {
            name: "Luanda",
            main: {
                temp: 26,
                temp_max: 28,
                temp_min: 24
            },
            weather: [{
                main: "Partly Cloudy",
                description: "partly cloudy",
                icon: "02d"
            }]
        };

        const mockForecast = [
            { day: "Today", high: 28, low: 24 },
            { day: "Tomorrow", high: 29, low: 25 },
            { day: "Sunday", high: 27, low: 23 }
        ];

        displayWeather(mockWeatherData, mockForecast);
        
    } catch (error) {
        console.error('Error loading weather:', error);
        weatherInfo.innerHTML = '<div class="error">Weather information temporarily unavailable</div>';
    }
}

function displayWeather(current, forecast) {
    const weatherInfo = document.getElementById('weatherInfo');
    
    const weatherHTML = `
        <div class="current-weather">
            <div class="weather-icon">🌤️</div>
            <div class="weather-details">
                <h4>${Math.round(current.main.temp)}°C</h4>
                <div class="weather-desc">${current.weather[0].description}</div>
            </div>
        </div>
        <div class="forecast">
            ${forecast.map(day => `
                <div class="forecast-day">
                    <h5>${day.day}</h5>
                    <div class="forecast-temp">${day.high}°/${day.low}°</div>
                </div>
            `).join('')}
        </div>
    `;
    
    weatherInfo.innerHTML = weatherHTML;
}

// Member spotlights functionality
async function loadSpotlights() {
    const spotlightsContainer = document.getElementById('spotlights');
    
    try {
        const response = await fetch('members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const chamberMembers = await response.json();
        displaySpotlights(chamberMembers.members);
    } catch (error) {
        console.error('Error loading member data:', error);
        spotlightsContainer.innerHTML = '<div class="error">Member information temporarily unavailable</div>';
    }
}

function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights');
    
    if (!members || members.length === 0) {
        spotlightsContainer.innerHTML = '<div class="error">No members found</div>';
        return;
    }

    // Filter for Gold and Silver members (membershipLevel: 2 or 3)
    const filteredMembers = members.filter(member => member.membershipLevel >= 2);
    // Randomly select up to 3
    const selectedMembers = [];
    while (selectedMembers.length < 3 && filteredMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredMembers.length);
        selectedMembers.push(...filteredMembers.splice(randomIndex, 1));
    }

    // Build the HTML for selected members
    let spotlightsHTML = selectedMembers.map(member => `
        <div class="spotlight-card ${member.membershipLevel === 3 ? 'gold' : member.membershipLevel === 2 ? 'silver' : ''}">
            <div class="company-logo" style="background: ${logoStyles[member.logo].background}; color: ${logoStyles[member.logo].color};">${member.logo}</div>
            <div class="company-info">
                <h4>${member.name}</h4>
                <p>${member.description}</p>
                <a href="${member.website}" class="company-website">Visit Website</a>
            </div>
        </div>
    `).join('');

    spotlightsContainer.innerHTML = spotlightsHTML;
}