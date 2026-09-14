/* =========================================================
   Show Courses
   ========================================================= */

function showCourses() {

    courseList.innerHTML = "";


    Object.keys(courses).forEach(
        function (courseName) {

            const courseButton =
                document.createElement("button");


            courseButton.textContent =
                courseName;


            courseButton.classList.add(
                "course-button"
            );


            courseButton.type =
                "button";


            courseButton.addEventListener(
                "click",
                function () {

                    showCourse(courseName);

                }
            );


            courseList.appendChild(
                courseButton
            );

        }
    );

}



/* =========================================================
   Show Add Course Form
   ========================================================= */

function showAddCourseForm() {

    pageTitle.textContent =
        "Add Course";

    pageDescription.textContent =
        "Create a new course.";

    noteContent.innerHTML = "";


    const nameLabel =
        document.createElement("label");

    nameLabel.textContent =
        "Course Name";


    const nameInput =
        document.createElement("input");

    nameInput.type =
        "text";

    nameInput.placeholder =
        "Example: KIT123";



    const descriptionLabel =
        document.createElement("label");

    descriptionLabel.textContent =
        "Course Description";


    const descriptionInput =
        document.createElement("input");

    descriptionInput.type =
        "text";

    descriptionInput.placeholder =
        "Example: Web Development";



    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "💾 Save Course";

    saveButton.type =
        "button";



    saveButton.addEventListener(
        "click",
        function () {

            addCourse(
                nameInput.value,
                descriptionInput.value
            );

        }
    );


    noteContent.appendChild(
        nameLabel
    );

    noteContent.appendChild(
        nameInput
    );

    noteContent.appendChild(
        descriptionLabel
    );

    noteContent.appendChild(
        descriptionInput
    );

    noteContent.appendChild(
        saveButton
    );

}



/* =========================================================
   Add Course
   ========================================================= */

function addCourse(
    courseName,
    description
) {

    courseName =
        courseName.trim();

    description =
        description.trim();


    if (!courseName) {

        alert(
            "Please enter a course name."
        );

        return;

    }


    if (courses[courseName]) {

        alert(
            "This course already exists."
        );

        return;

    }


    courses[courseName] = {

        description:
            description || "No description.",

        weeks: {}

    };


    saveCourses();

    showCourses();

    showCourse(courseName);

}



/* =========================================================
   Delete Course
   ========================================================= */

function deleteCourse(courseName) {

    const confirmed =
        confirm(
            "Delete " +
            courseName +
            " and all its notes?"
        );


    if (!confirmed) {

        return;

    }


    delete courses[courseName];


    saveCourses();

    showCourses();


    pageTitle.textContent =
        "Ciallo ～(∠・ω< )⌒★ !";

    pageDescription.textContent =
        "Select a course and week to start studying.";

    noteContent.innerHTML =
        "<p>Notes will appear here.</p>";


    weekSidebar.innerHTML = `
        <h3>Weeks</h3>
        <p>Select a course first.</p>
    `;

}


