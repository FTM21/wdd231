import { locations } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    renderVisitorMessage();
    renderDiscoverCards();
});

function renderVisitorMessage() {
    const messageElement = document.querySelector(".visit-message");
    if (!messageElement) return;

    const lastVisit = localStorage.getItem("lastChamberVisit");
    const currentTimestamp = Date.now();

    localStorage.setItem("lastChamberVisit", currentTimestamp);

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
        return;
    }

    const timeDifference = currentTimestamp - parseInt(lastVisit, 10);
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysBetween = Math.floor(timeDifference / msPerDay);

    if (timeDifference < msPerDay) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else {
        const dayWord = daysBetween === 1 ? "day" : "days";
        messageElement.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
    }
}

function renderDiscoverCards() {
    const gridContainer = document.querySelector(".discover-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = ""; // Clear placeholder text if any

    locations.forEach(place => {
        const card = document.createElement("section");
        card.className = "discover-card";
        
        card.style.gridArea = place.id; 

        card.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img src="${place.image}" 
                     alt="Scenic view of ${place.title}" 
                     loading="lazy" 
                     width="300" 
                     height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more-btn" type="button">Learn More</button>
        `;
        gridContainer.appendChild(card);
    });
}