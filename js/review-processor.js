document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const displayContainer = document.querySelector('#formReviewContainer');

    if (!displayContainer) return;

    // Map parameterized array records to form dynamic lists cleanly
    let confirmationHTML = '<ul>';
    for (const [key, value] of urlParams.entries()) {
        confirmationHTML += `<li><strong>${cleanKeyName(key)}:</strong> ${escapeHTML(value)}</li>`;
    }
    confirmationHTML += '</ul>';

    displayContainer.innerHTML = confirmationHTML;
});

function cleanKeyName(str) {
    return str.replace(/[-_]/g, ' ').toUpperCase();
}

function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}