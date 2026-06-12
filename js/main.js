import { fetchComplianceData } from './modules/fetcher.js';
import { renderComplianceCards } from './modules/display.js';
import { initializeModal } from './modules/modal.js';
import { loadUserPreferences, saveUserPreferences } from './modules/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize Global Navigation & Hamburger Menu Functions
    setupResponsiveMenu();

    // 2. Fetch and render data on pages containing the resource framework matrix
    if (document.querySelector('.compliance-grid-container')) {
        const complianceData = await fetchComplianceData('./data/elements.json');
        renderComplianceCards('.compliance-grid-container', complianceData);
        initializeModal('#detailModal', '.view-details-btn', '#closeModalBtn');
    }
    
    // 3. Keep track of user session markers using local storage
    const state = loadUserPreferences();
    console.log("Welcome back. Tracked session state active:", state);
});

function setupResponsiveMenu() {
    const menuToggle = document.querySelector('#menuToggle');
    const primaryNav = document.querySelector('#primaryNav');
    
    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('nav-open');
        });
    }
}