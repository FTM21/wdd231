
export function initializeModal(modalSelector, openTriggerSelector, closeTriggerSelector) {
    const modal = document.querySelector(modalSelector);
    const closeBtn = document.querySelector(closeTriggerSelector);

    if (!modal) return;

    // Delegate click listening loops to modern page layout frameworks
    document.addEventListener('click', (event) => {
        if (event.target.matches(openTriggerSelector)) {
            // Logic to populate internal modal content based on selected card info
            modal.setAttribute('aria-hidden', 'false');
            modal.style.display = 'block';
            closeBtn.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
    });
}