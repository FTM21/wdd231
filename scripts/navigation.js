// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            
            // Change hamburger button text between ≡ and X
            if (mainNav.classList.contains('show')) {
                hamburgerBtn.innerHTML = '&#10005;'; // X
            } else {
                hamburgerBtn.innerHTML = '&#9776;'; // ≡
            }
        });
    }
    
    // Add active class to current page nav link
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('#main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split("/").pop();
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') || 
            (linkHref === 'index.html' && (currentPage === '' || currentPage === 'index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});