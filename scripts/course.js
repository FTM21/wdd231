document.addEventListener('DOMContentLoaded', function() {
    // Course data - modified from the provided array
    const courses = [
        {
            code: "CSE 121b",
            name: "JavaScript Language",
            credits: 3,
            completed: true, // Change to true if you've completed this course
            courseType: "CSE"
        },
        {
            code: "CSE 111",
            name: "Programming with Functions",
            credits: 3,
            completed: true, // Change to true if you've completed this course
            courseType: "CSE"
        },
        {
            code: "WDD 130",
            name: "Web Fundamentals",
            credits: 3,
            completed: true, // Change to true if you've completed this course
            courseType: "WDD"
        },
        {
            code: "WDD 230",
            name: "Web Frontend Development I",
            credits: 3,
            completed: true, // Change to true if you've completed this course
            courseType: "WDD"
        },
        {
            code: "WDD 231",
            name: "Web Frontend Development II",
            credits: 3,
            completed: false, // Currently taking this course
            courseType: "WDD"
        },
        {
            code: "CSE 210",
            name: "Programming with Classes",
            credits: 3,
            completed: false, // Change to true if you've completed this course
            courseType: "CSE"
        },
        {
            code: "CSE 212",
            name: "Data Structures",
            credits: 3,
            completed: false, // Change to true if you've completed this course
            courseType: "CSE"
        },
        {
            code: "WDD 330",
            name: "Web Frontend Development III",
            credits: 3,
            completed: false, // Change to true if you've completed this course
            courseType: "WDD"
        },
        {
            code: "WDD 430",
            name: "Web Full-Stack Development",
            credits: 3,
            completed: false, // Change to true if you've completed this course
            courseType: "WDD"
        }
    ];

    // Get DOM elements
    const courseCards = document.getElementById('course-cards');
    const creditTotal = document.getElementById('credits');
    const allBtn = document.getElementById('all-btn');
    const wddBtn = document.getElementById('wdd-btn');
    const cseBtn = document.getElementById('cse-btn');

    // Function to display courses
    function displayCourses(coursesToDisplay) {
        // Clear previous content
        courseCards.innerHTML = '';
        
        // Calculate total credits
        const totalCredits = coursesToDisplay.reduce((sum, course) => sum + course.credits, 0);
        creditTotal.textContent = totalCredits;
        
        // Create course cards
        coursesToDisplay.forEach(course => {
            const card = document.createElement('div');
            card.className = `course-card ${course.completed ? 'completed' : 'uncompleted'}`;
            
            card.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <div class="course-info">
                    <span>${course.credits} Credits</span>
                    <span>${course.completed ? 'Completed' : 'Not Completed'}</span>
                </div>
            `;
            
            courseCards.appendChild(card);
        });
    }

    // Display all courses initially
    displayCourses(courses);

    // Event listeners for filter buttons
    allBtn.addEventListener('click', function() {
        setActiveButton(this);
        displayCourses(courses);
    });

    wddBtn.addEventListener('click', function() {
        setActiveButton(this);
        const wddCourses = courses.filter(course => course.courseType === 'WDD');
        displayCourses(wddCourses);
    });

    cseBtn.addEventListener('click', function() {
        setActiveButton(this);
        const cseCourses = courses.filter(course => course.courseType === 'CSE');
        displayCourses(cseCourses);
    });

    // Helper function to set active button
    function setActiveButton(activeButton) {
        // Remove active class from all buttons
        [allBtn, wddBtn, cseBtn].forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        activeButton.classList.add('active');
    }
});