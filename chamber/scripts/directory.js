/* ===== directory.js — Chamber Directory Page Functionality ===== */

// ----- DOM References -----
const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-view-btn');
const listBtn = document.getElementById('list-view-btn');
const hamburgerBtn = document.getElementById('hamburger-btn');
const primaryNav = document.getElementById('primary-nav');
const copyrightSpan = document.getElementById('copyright-year');
const lastModifiedSpan = document.getElementById('last-modified');

// ----- Footer: Copyright Year -----
copyrightSpan.textContent = new Date().getFullYear();

// ----- Footer: Last Modified Date -----
lastModifiedSpan.textContent = document.lastModified;

// ----- Hamburger Menu Toggle -----
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    primaryNav.classList.toggle('open');
});

// Close nav when a link is clicked (for mobile)
primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        primaryNav.classList.remove('open');
    });
});

// ----- Utility: Get membership label -----
function getMembershipLabel(level) {
    switch (level) {
        case 1: return { text: 'Member', class: 'member' };
        case 2: return { text: 'Silver', class: 'silver' };
        case 3: return { text: 'Gold', class: 'gold' };
        default: return { text: 'Member', class: 'member' };
    }
}

// ----- Render Members -----
function renderMembers(members, viewMode = 'grid') {
    membersContainer.className = viewMode === 'grid' ? 'grid-view' : 'list-view';
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const badge = getMembershipLabel(member.membershipLevel);
        const card = document.createElement('div');
        card.classList.add('member-card');

        if (viewMode === 'grid') {
            // Grid card layout
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
                <h3>${member.name}</h3>
                <span class="membership-badge ${badge.class}">${badge.text}</span>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p class="description">${member.description}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            `;
        } else {
            // List view layout
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="60" height="60">
                <div class="card-info">
                    <h3>${member.name}</h3>
                    <span class="membership-badge ${badge.class}">${badge.text}</span>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer">Website</a>
                </div>
            `;
        }

        membersContainer.appendChild(card);
    });
}

// ----- Fetch Members from JSON -----
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.companies;
    } catch (error) {
        console.error('Error fetching member data:', error);
        membersContainer.innerHTML = `<p class="error-message">Unable to load member data. Please try again later.</p>`;
        return [];
    }
}

// ----- View Toggle -----
let currentView = 'grid';
let membersData = [];

gridBtn.addEventListener('click', () => {
    if (currentView === 'grid') return;
    currentView = 'grid';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    renderMembers(membersData, 'grid');
});

listBtn.addEventListener('click', () => {
    if (currentView === 'list') return;
    currentView = 'list';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    renderMembers(membersData, 'list');
});

// ----- Initialize -----
(async function init() {
    membersData = await fetchMembers();
    if (membersData.length > 0) {
        renderMembers(membersData, 'grid');
    }
})();
