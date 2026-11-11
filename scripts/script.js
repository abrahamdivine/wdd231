// ==========================================
// 1. COURSE DATA
// ==========================================

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];


// ==========================================
// 2. FOOTER: CURRENT YEAR AND LAST MODIFIED
// ==========================================

const currentYear = document.querySelector("#currentyear");

currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modification: ${document.lastModified}`;


// ==========================================
// 3. COURSE DISPLAY
// ==========================================

const courseContainer = document.querySelector("#courseContainer");

const totalCredits = document.querySelector("#totalCredits");

function displayCourses(courseList) {

    // Clear previous courses
    courseContainer.innerHTML = "";

    // Create a card for each course
    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        // Give completed courses a different style
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>

            <p>${course.title}</p>

            <p>${course.credits} Credits</p>

            <p class="completion-status">
                ${course.completed ? "✓ Completed" : "Not Completed"}
            </p>
        `;

        courseContainer.appendChild(card);

    });


    // ==========================================
    // 4. CALCULATE TOTAL CREDITS USING REDUCE
    // ==========================================

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent =
        `The total credits for courses listed above is ${credits}.`;
}


// Display all courses when the page loads
displayCourses(courses);


// ==========================================
// 5. COURSE FILTERING
// ==========================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        let filteredCourses;

        if (filter === "ALL") {

            filteredCourses = courses;

        } else {

            filteredCourses = courses.filter(
                course => course.subject === filter
            );

        }

        // Display filtered courses
        displayCourses(filteredCourses);


        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});

// ==========================================
// 6. RESPONSIVE HAMBURGER NAVIGATION
// ==========================================

const menuButton = document.querySelector("#menuButton");

const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";

});
