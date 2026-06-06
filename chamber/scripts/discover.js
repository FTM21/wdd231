import { places } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
  displayVisitMessage();
  renderDiscoverCards();
});

// ── LOCAL STORAGE VISITOR MESSAGE ──
function displayVisitMessage() {
  const messageEl = document.getElementById("visit-message");
  if (!messageEl) return;

  const lastVisit = localStorage.getItem("lastVisitDate");
  const now = Date.now();
  
  // Store the current timestamp for the user's next load
  localStorage.setItem("lastVisitDate", now);

  if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
    return;
  }

  // Calculate difference in milliseconds and convert to whole days
  const timeDiff = now - parseInt(lastVisit, 10);
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const daysBetween = Math.floor(timeDiff / oneDayInMs);

  if (timeDiff < oneDayInMs) {
    messageEl.textContent = "Back so soon! Awesome!";
  } else {
    if (daysBetween === 1) {
      messageEl.textContent = "You last visited 1 day ago.";
    } else {
      messageEl.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }
}

// ── RENDER DISCOVER CARDS ──
function renderDiscoverCards() {
  const gridContainer = document.getElementById("discover-grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = places.map((place, index) => {
    // Dynamically naming card areas card1, card2, etc. to link to CSS grid areas
    return `
      <article class="discover-card" style="grid-area: card${index + 1};">
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="Beautiful scenic view of ${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>📍 ${place.address}</address>
        <p>${place.description}</p>
        <button type="button" class="learn-more-btn">Learn More</button>
      </article>
    `;
  }).join('');
}