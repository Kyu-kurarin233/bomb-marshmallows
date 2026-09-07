// 1. Course Data

const courses = {

    KIT111: {
        title: "KIT111",
        description: "Data Networks and Security",

        weeks: {

            "Week 1": [
                {
                    title: "Network Basics",
                    content: "Notes about basic computer networks."
                },

                {
                    title: "TCP/IP Model",
                    content: "Notes about the TCP/IP network model."
                },

                {
                    title: "OSI Model",
                    content: "Notes about the OSI network model."
                }
            ],


            "Week 2": [
                {
                    title: "Network Protocols",
                    content: "Notes about network protocols."
                },

                {
                    title: "Communication",
                    content: "Notes about communication in networks."
                }
            ],


            "Week 3": [
                {
                    title: "IP Addresses",
                    content: "Notes about IP addresses."
                },

                {
                    title: "Subnetting",
                    content: "Notes about subnetting."
                }
            ],


            "Exam Revision": [
                {
                    title: "Important Questions",
                    content: "Important questions for exam revision."
                },

                {
                    title: "Network Summary",
                    content: "Summary of important networking concepts."
                }
            ]

        }
    },


    KIT107: {
        title: "KIT107",
        description: "Programming",

        weeks: {

            "Week 1": [
                {
                    title: "Introduction to Programming",
                    content: "Basic programming concepts."
                }
            ],


            "Week 2": [
                {
                    title: "Variables",
                    content: "Notes about variables and data types."
                }
            ],


            "Week 3": [
                {
                    title: "Conditions and Loops",
                    content: "Notes about if statements and loops."
                }
            ],


            "Exam Revision": [
                {
                    title: "Programming Revision",
                    content: "Important programming concepts."
                }
            ]

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

                showNotes(
                    courseName,
                    weekName
                );

            }
        );


        weekSidebar.appendChild(button);

    }

}


// 6. Show Note

function showNotes(courseName, weekName) {

    const course =
        courses[courseName];

    const notes =
        course.weeks[weekName];


    pageTitle.textContent =
        courseName + " - " + weekName;

    pageDescription.textContent =
        "Select a note to study.";


    noteContent.innerHTML = "";


    for (let i = 0; i < notes.length; i++) {

        const note =
            notes[i];


        const button =
            document.createElement("button");


        button.textContent =
            "📄 " + note.title;


        button.addEventListener(
            "click",
            function () {

                showNote(
                    courseName,
                    weekName,
                    i
                );

            }
        );


        noteContent.appendChild(button);

    }

}


//点击图标显示真正内容
function showNote(courseName, weekName, noteIndex) {

    const course =
        courses[courseName];


    const notes =
        course.weeks[weekName];


    const note =
        notes[noteIndex];


    pageTitle.textContent =
        note.title;


    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML =
        "<p>" + note.content + "</p>";

}