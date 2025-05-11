// scripts.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  
    // === Course Details Display ===
    const courseButtons = {
      cse110: document.getElementById('cse110-btn'),
      wdd130: document.getElementById('wdd130-btn'),
      cse111: document.getElementById('cse111-btn'),
      cse210: document.getElementById('cse210-btn'),
      wdd131: document.getElementById('wdd131-btn'),
      wdd231: document.getElementById('wdd231-btn'),
    };
  
    // Example data for each course
    const courseDetails = {
      cse110: 'CSE 110: Introduction to Computer Science. Focuses on fundamentals of programming.',
      wdd130: 'WDD 130: Web Design Basics. Covers HTML, CSS, and basic web concepts.',
      cse111: 'CSE 111: Programming Fundamentals. Continues with Java and Python.',
      cse210: 'CSE 210: Data Structures. Discusses arrays, linked lists, trees, and more.',
      wdd131: 'WDD 131: Advanced Web Development. Includes JavaScript and frameworks.',
      wdd231: 'WDD 231: Final Project. Integrates all web development skills.',
    };
  
    // Function to display course details
    function showCourseDetails(courseId) {
      alert(courseDetails[courseId]); // For simplicity, using alert. Could be shown in a modal or div.
    }
  
    // Assign click events to course buttons
    for (const [key, btn] of Object.entries(courseButtons)) {
      if (btn) {
        btn.addEventListener('click', () => showCourseDetails(key));
      }
    }
  
    // === Last Modified Date ===
    const lastModifiedElem = document.getElementById('lastModified');
    if (lastModifiedElem) {
      lastModifiedElem.textContent = 'Last Modified: ' + document.lastModified;
    }
  
    // === Navigation Toggle (Hamburger Menu) ===
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
  
    if (hamburgerBtn && mainNav) {
      hamburgerBtn.addEventListener('click', () => {
        mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
      });
    }
  
  });