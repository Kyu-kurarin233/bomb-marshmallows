// 1. Course Data

const courses = {

    KIT111: {
        title: "KIT111",
        description: "Data Networks and Security",

        weeks: {
            "Week 1": "Introduction to computer networks.",
            "Week 2": "Network models and protocols.",
            "Week 3": "IP addresses and subnetting.",
            "Exam Revision": "KIT111 exam revision notes."
        }
    },


    KIT107: {
        title: "KIT107",
        description: "Programming",

        weeks: {
            "Week 1": "Introduction to programming.",
            "Week 2": "Variables and data types.",
            "Week 3": "Conditions and loops.",
            "Exam Revision": "KIT107 exam revision notes."
        }
    }

};


// 2. Find HTML Elements

const courseButtons =
    document.querySelectorAll(".course-button");

const weekSidebar =
    document.getElementById("weekSidebar");

const pageTitle =
    document.getElementById("pageTitle");

const pageDescription =
    document.getElementById("pageDescription");

const noteContent =
    document.getElementById("noteContent");


// 3. Course Button Click

courseButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const courseName =
            button.dataset.course;

        showCourse(courseName);

    });

});


// 4. Show Course

function showCourse(courseName) {

    const course =
        courses[courseName];


    pageTitle.textContent =
        course.title;

    pageDescription.textContent =
        course.description;


    noteContent.innerHTML =
        "<p>Select a week from the left.</p>";


    showWeeks(courseName);

}


// 5. Show Weeks

function showWeeks(courseName) {

    const course =
        courses[courseName];


    weekSidebar.innerHTML =
        "<h3>Weeks</h3>";


    for (const weekName in course.weeks) {

        const button =
            document.createElement("button");


        button.textContent =
            weekName;


        button.addEventListener(
            "click",
            function () {

                showNote(
                    courseName,
                    weekName
                );

            }
        );


        weekSidebar.appendChild(button);

    }

}


// 6. Show Note

function showNote(courseName, weekName) {

    const course =
        courses[courseName];


    const note =
        course.weeks[weekName];


    pageTitle.textContent =
        courseName + " - " + weekName;


    pageDescription.textContent =
        course.description;


    noteContent.innerHTML =
        "<p>" + note + "</p>";

}