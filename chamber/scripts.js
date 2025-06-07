// Chamber member data
const chamberMembers = {
    "members": [
        {
            "name": "Sonangol Group",
            "address": "Rua Rainha Ginga, Luanda, Angola",
            "phone": "+244 222 640 000",
            "website": "https://www.sonangol.co.ao",
            "image": "images/sonangol-logo.png",
            "membershipLevel": 3,
            "description": "National oil company and leading energy corporation in Angola",
            "founded": "1976",
            "employees": "5000+",
            "logo": "SNG"
        },
        {
            "name": "Banco Angolano de Investimentos",
            "address": "Rua Major Kanhangulo, Luanda, Angola",
            "phone": "+244 222 638 900",
            "website": "https://www.bancobai.ao",
            "image": "images/bai-logo.jpeg",
            "membershipLevel": 3,
            "description": "Leading private bank in Angola providing comprehensive financial services",
            "founded": "1997",
            "employees": "2500+",
            "logo": "BAI"
        },
        // Add more members as needed
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    loadSpotlights();
});

async function loadWeather() {
    const weatherInfo = document.getElementById('weatherInfo');
    // Weather API call logic will go here
}

function loadSpotlights() {
    const spotlightsContainer = document.getElementById('spotlights');
    chamberMembers.members.forEach(member => {
        if (member.membershipLevel === 3) {
            const spotlightCard = `
                <div class="spotlight-card gold">
                    <img src="${member.image}" alt="${member.name}">
                    <h4>${member.name}</h4>
                    <p>${member.description}</p>
                    <a href="${member.website}" class="company-website" target="_blank">Visit Website</a>
                </div>
            `;
            spotlightsContainer.innerHTML += spotlightCard;
        }
    });
}