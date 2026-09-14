/* =========================================================
   Show Course
   ========================================================= */

function showCourse(courseName) {

    const course =
        courses[courseName];


    if (!course) {

        return;

    }


    pageTitle.textContent =
        courseName;


    pageDescription.textContent =
        course.description;


    noteContent.innerHTML =
        "<p>Select a week to view notes.</p>";


    showWeeks(courseName);

}



/* =========================================================
   Show Weeks
   ========================================================= */

function showWeeks(courseName) {

    const course =
        courses[courseName];


    weekSidebar.innerHTML = "";


    const title =
        document.createElement("h3");

    title.textContent =
        "Weeks";


    weekSidebar.appendChild(
        title
    );



    Object.keys(course.weeks).forEach(
        function (weekName) {

            const weekItem =
                document.createElement("div");

            weekItem.classList.add(
                "week-item"
            );



            /* Week Button */

            const weekButton =
                document.createElement("button");

            weekButton.textContent =
                weekName;

            weekButton.classList.add(
                "week-button"
            );

            weekButton.type =
                "button";


            weekButton.addEventListener(
                "click",
                function () {

                    showNotes(
                        courseName,
                        weekName
                    );

                }
            );



            /* Delete Week Button */

            const deleteWeekButton =
                document.createElement("button");

            deleteWeekButton.textContent =
                "🗑️";

            deleteWeekButton.classList.add(
                "delete-week-button"
            );

            deleteWeekButton.type =
                "button";

            deleteWeekButton.title =
                "Delete " + weekName;


            deleteWeekButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    deleteWeek(
                        courseName,
                        weekName
                    );

                }
            );



            weekItem.appendChild(
                weekButton
            );

            weekItem.appendChild(
                deleteWeekButton
            );


            weekSidebar.appendChild(
                weekItem
            );

        }
    );



    /* Add Week */

    const addWeekButton =
        document.createElement("button");

    addWeekButton.textContent =
        "➕ Add Week";

    addWeekButton.classList.add(
        "add-week-button"
    );

    addWeekButton.type =
        "button";


    addWeekButton.addEventListener(
        "click",
        function () {

            showAddWeekForm(courseName);

        }
    );


    weekSidebar.appendChild(
        addWeekButton
    );



    /* Delete Course */

    const deleteCourseButton =
        document.createElement("button");

    deleteCourseButton.textContent =
        "🗑️ Delete Course";

    deleteCourseButton.classList.add(
        "delete-course-button"
    );

    deleteCourseButton.type =
        "button";


    deleteCourseButton.addEventListener(
        "click",
        function () {

            deleteCourse(courseName);

        }
    );


    weekSidebar.appendChild(
        deleteCourseButton
    );

}



/* =========================================================
   Show Add Week Form
   ========================================================= */

function showAddWeekForm(courseName) {

    pageTitle.textContent =
        "Add Week";

    pageDescription.textContent =
        "Add a new week to " + courseName;

    noteContent.innerHTML = "";


    const label =
        document.createElement("label");

    label.textContent =
        "Week Name";


    const input =
        document.createElement("input");

    input.type =
        "text";

    input.placeholder =
        "Example: Week 4";



    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "💾 Save Week";

    saveButton.type =
        "button";


    saveButton.addEventListener(
        "click",
        function () {

            addWeek(
                courseName,
                input.value
            );

        }
    );


    noteContent.appendChild(
        label
    );

    noteContent.appendChild(
        input
    );

    noteContent.appendChild(
        saveButton
    );

}



/* =========================================================
   Add Week
   ========================================================= */

function addWeek(
    courseName,
    weekName
) {

    weekName =
        weekName.trim();


    if (!weekName) {

        alert(
            "Please enter a week name."
        );

        return;

    }


    const course =
        courses[courseName];


    if (course.weeks[weekName]) {

        alert(
            "This week already exists."
        );

        return;

    }


    course.weeks[weekName] = [];


    saveCourses();

    showWeeks(courseName);

    showNotes(
        courseName,
        weekName
    );

}



/* =========================================================
   Delete Week
   ========================================================= */

function deleteWeek(
    courseName,
    weekName
) {

    const confirmed =
        confirm(
            "Delete " +
            weekName +
            " and all notes inside it?"
        );


    if (!confirmed) {

        return;

    }


    delete courses[
        courseName
    ].weeks[
        weekName
    ];


    saveCourses();

    showWeeks(courseName);


    pageTitle.textContent =
        courseName;

    pageDescription.textContent =
        courses[courseName].description;

    noteContent.innerHTML =
        "<p>Select a week to view notes.</p>";

}


