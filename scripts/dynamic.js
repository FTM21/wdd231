document.addEventListener('DOMContentLoaded', () => {
  

  const courseButtons = {
    cse110: document.getElementById('cse110-btn'),
    wdd130: document.getElementById('wdd130-btn'),
    cse111: document.getElementById('cse111-btn'),
    cse210: document.getElementById('cse210-btn'),
    wdd131: document.getElementById('wdd131-btn'),
    wdd231: document.getElementById('wdd231-btn'),
  };

  const courseDetails = {
    cse110: 'CSE 110: Introduction to Computer Science. Focuses on fundamentals of programming.',
    wdd130: 'WDD 130: Web Design Basics. Covers HTML, CSS, and basic web concepts.',
    cse111: 'CSE 111: Programming Fundamentals. Continues with Java and Python.',
    cse210: 'CSE 210: Data Structures. Discusses arrays, linked lists, trees, and more.',
    wdd131: 'WDD 131: Advanced Web Development. Includes JavaScript and frameworks.',
    wdd231: 'WDD 231: Final Project. Integrates all web development skills.',
  };

  // Function to show course details
  function showCourseDetails(courseId) {
    alert(courseDetails[courseId]);
  }

  // Assign click events to course buttons
  for (const [key, btn] of Object.entries(courseButtons)) {
    if (btn) {
      btn.addEventListener('click', () => showCourseDetails(key));
    }
  }


  const lastModifiedElem = document.getElementById('lastModified');
  if (lastModifiedElem) {
    lastModifiedElem.textContent = 'Last Modified: ' + document.lastModified;
  }


  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');
  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // === Course Cards - For Completion and Credits ===

  // Select all course cards
  const courseCards = document.querySelectorAll('.course-card');

  // Set course completion statuses: true = completed, false = not completed
  const courseCompletionStatus = {
    cse110: true,   // Completed
    cse210: true,   // Completed
    wdd130: false,
    cse111: false,
    wdd131: false,
    wdd231: false,
  };

  // Initialize course card styles based on status
  courseCards.forEach(card => {
    const courseId = card.dataset.course;
    const isCompleted = courseCompletionStatus[courseId] || false;
    updateCourseCardStyle(card, isCompleted);
  });

  // Function to style course card based on completion
  function updateCourseCardStyle(card, isCompleted) {
    if (isCompleted) {
      card.style.backgroundColor = 'yellowgreen'; // ygreen for completed
    } else {
      card.style.backgroundColor = 'red'; // red for not completed
    }
  }

 
  function updateTotalCredits() {
    const visibleCourses = Array.from(document.querySelectorAll('.course-card'))
      .filter(c => c.offsetParent !== null);

    const totalCredits = visibleCourses.reduce((sum, card) => {
      const credits = parseInt(card.dataset.credits);
      return sum + credits;
    }, 0);

    const totalCreditsElem = document.getElementById('total-credits');
    if (totalCreditsElem) {
      totalCreditsElem.textContent = `Total Credits: ${totalCredits}`;
    }
  }

  // Initial total credits calculation
  updateTotalCredits();

});