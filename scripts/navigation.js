document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    hamburgerBtn.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        // Change the button symbol based on menu state
        hamburgerBtn.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
    
    // Close the menu when a link is clicked
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('open');
            hamburgerBtn.textContent = '☰';
        });
    });
    
    // Close the menu if window is resized to larger size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mainNav.classList.remove('open');
            hamburgerBtn.textContent = '☰';
        }
    });
});