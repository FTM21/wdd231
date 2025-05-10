// Update copyright year and last modified date
document.addEventListener('DOMContentLoaded', function() {
    // Get the current year
    const currentYear = new Date().getFullYear();
    
    // Update the copyright year
    document.getElementById('currentYear').textContent = currentYear;
    
    // Update the last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});