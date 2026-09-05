const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming with functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming with classes.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on frontend Web development.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseList = document.querySelector('#course-list');

function displayCourses(courseArray) {
    courseList.innerHTML = '';

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    document.querySelector('#total-credits').textContent = totalCredits;

    courseArray.forEach(course => {
        const courseCard = document.createElement('div');

        courseCard.textContent = `${course.subject} ${course.number}`;

        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseList.appendChild(courseCard);
    });
}

displayCourses(courses);

const wddButton = document.querySelector('#wdd');
const cseButton = document.querySelector('#cse');
const allButton = document.querySelector('#all');

wddButton.addEventListener('click', () => {
    const wddCourses = courses.filter(
        course => course.subject === 'WDD'
    );

    displayCourses(wddCourses);
});

cseButton.addEventListener('click', () => {
    const cseCourses = courses.filter(
        course => course.subject === 'CSE'
    );

    displayCourses(cseCourses);
});

allButton.addEventListener('click', () => {
    displayCourses(courses);
});