// Course List Array
const courses = [
    {
        name: "Web Fundamentals",
        code: "WDD 130",
        credits: 3,
        category: "WDD",
        completed: true   // Change to true if you have completed this course
    },
    {
        name: "JavaScript Programming",
        code: "WDD 230",
        credits: 3,
        category: "WDD",
        completed: true   // Change to true if you have completed this course
    },
    {
        name: "Web Frontend Development I",
        code: "WDD 330",
        credits: 3,
        category: "WDD",
        completed: false  // Change to true if you have completed this course
    },
    {
        name: "Web Backend Development I",
        code: "WDD 430",
        credits: 3,
        category: "WDD",
        completed: false  // Change to true if you have completed this course
    },
    {
        name: "Programming Building Blocks",
        code: "CSE 110",
        credits: 3,
        category: "CSE",
        completed: true   // Change to true if you have completed this course
    },
    {
        name: "Programming with Functions",
        code: "CSE 111",
        credits: 3,
        category: "CSE",
        completed: true   // Change to true if you have completed this course
    },
    {
        name: "Programming with Classes",
        code: "CSE 121b",
        credits: 3,
        category: "CSE",
        completed: false  // Change to true if you have completed this course
    },
    {
        name: "Applied Programming",
        code: "CSE 210",
        credits: 3,
        category: "CSE",
        completed: false  // Change to true if you have completed this course
    }
];

// Initialize Course Display and Filtering
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const courseCardsContainer = document.getElementById('course-cards');
    const allBtn = document.getElementById('all-btn');
    const wddBtn = document.getElementById('wdd-btn');
    const cseBtn = document.getElementById('cse-btn');
    const creditSpan = document.getElementById('credits');
    
    if (!courseCardsContainer) return;
    
    // Initial display of all courses
    displayCourses(courses);
    
    // Add event listeners to filter buttons
    if (allBtn) {
        allBtn.addEventListener('click', function() {
            setActiveButton(this);
            displayCourses(courses);
        });
    }
    
    if (wddBtn) {
        wddBtn.addEventListener('click', function() {
            setActiveButton(this);
            const wddCourses = courses.filter(course => course.category === "WDD");
            displayCourses(wddCourses);
        });
    }
    
    if (cseBtn) {
        cseBtn.addEventListener('click', function() {
            setActiveButton(this);
            const cseCourses = courses.filter(course => course.category === "CSE");
            displayCourses(cseCourses);
        });
    }
    
    // Helper function to set active button
    function setActiveButton(activeButton) {
        const buttons = document.querySelectorAll('.filter-buttons button');
        buttons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }
    
    // Function to display courses and calculate total credits
    function displayCourses(coursesToDisplay) {
        // Clear the course container
        courseCardsContainer.innerHTML = '';
        
        // Display each course
        coursesToDisplay.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = `course-card ${course.completed ? 'completed' : 'uncompleted'}`;
            
            courseElement.innerHTML = `
                <div class="card-content">
                    <span class="course-code">${course.code}</span>
                    <h3>${course.name}</h3>
                    <div class="course-info">
                        <span class="course-credits">${course.credits} Credits</span>
                        <span class="course-status">${course.completed ? 'Completed' : 'Not Completed'}</span>
                    </div>
                </div>
            `;
            
            courseCardsContainer.appendChild(courseElement);
        });
        
        // Calculate and display total credits using reduce method
        if (creditSpan) {
            const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0);
            creditSpan.textContent = totalCredits;
        }
    }
});