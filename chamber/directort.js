// Directory JavaScript for Chamber of Commerce

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the page
    initializeNavigation();
    initializeViewControls();
    updateFooterDates();
    await loadMembers();
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

// View controls functionality
function initializeViewControls() {
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const membersContainer = document.getElementById('members-container');

    if (gridViewBtn && listViewBtn && membersContainer) {
        gridViewBtn.addEventListener('click', () => {
            setView