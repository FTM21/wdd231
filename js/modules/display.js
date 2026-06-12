
export function renderComplianceCards(containerSelector, items) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Clear any loading indicator elements safely
    container.innerHTML = "";

    // Iterate through items, satisfying the 4-property rendering condition
    items.forEach(item => {
        const cardHTML = `
            <div class="compliance-card" data-id="${item.id}">
                <h3>${item.market}</h3>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Requirement:</strong> ${item.requirement}</p>
                <span class="badge ${item.severity.toLowerCase().replace(' ', '-')}">${item.severity}</span>
                <button class="view-details-btn" type="button">Analyze Requirements</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}