/* =========================================================
   Default Courses
   ========================================================= */

let courses = {

    KIT111: {
        description: "Data Networks and Security",

        weeks: {

            "Week 1": [
                {
                    title: "Introduction to Networking",
                    content:
                        "# Introduction to Networking\n\nNotes about the **Introduction to Networking**."
                },

                {
                    title: "TCP/IP Model",
                    content:
                        "# TCP/IP Model\n\nNotes about the **TCP/IP Model**."
                },

                {
                    title: "OSI Model",
                    content:
                        "# OSI Model\n\nNotes about the **OSI Model**."
                }
            ],


            "Week 2": [
                {
                    title: "Network Protocols",
                    content:
                        "# Network Protocols\n\nNotes about **Network Protocols**."
                },

                {
                    title: "Communication",
                    content:
                        "# Communication\n\nNotes about **Communication**."
                }
            ],


            "Week 3": [
                {
                    title: "IP Addresses",
                    content:
                        "# IP Addresses\n\nNotes about **IP Addresses**."
                },

                {
                    title: "Subnetting",
                    content:
                        "# Subnetting\n\nNotes about **Subnetting**."
                }
            ],


            "Exam Revision": [
                {
                    title: "Important Questions",
                    content:
                        "# Important Questions\n\nImportant exam questions."
                },

                {
                    title: "Network Summary",
                    content:
                        "# Network Summary\n\nNetwork revision summary."
                }
            ]

        }
    },


    KIT107: {
        description: "Programming",

        weeks: {

            "Week 1": [
                {
                    title: "Introduction to Programming",
                    content:
                        "# Introduction to Programming\n\nProgramming basics."
                }
            ],


            "Week 2": [
                {
                    title: "Variables",
                    content:
                        "# Variables\n\nVariables and data types."
                }
            ],


            "Week 3": [
                {
                    title: "Conditions and Loops",
                    content:
                        "# Conditions and Loops\n\nif statements and loops."
                }
            ],


            "Exam Revision": [
                {
                    title: "Programming Revision",
                    content:
                        "# Programming Revision\n\nProgramming revision notes."
                }
            ]

        }
    }

};



/* =========================================================
   Load Saved Courses
   ========================================================= */

courses = loadCourses();



/* =========================================================
   DOM Elements
   ========================================================= */

const courseList =
    document.getElementById("courseList");

const addCourseButton =
    document.getElementById("addCourseButton");

const weekSidebar =
    document.getElementById("weekSidebar");

const pageTitle =
    document.getElementById("pageTitle");

const pageDescription =
    document.getElementById("pageDescription");

const noteContent =
    document.getElementById("noteContent");

const importButton =
    document.getElementById("importButton");

const importFile =
    document.getElementById("importFile");



/* =========================================================
   Export Button
   ========================================================= */

let exportButton =
    document.getElementById("exportButton");


/*
    If the Export button does not exist
    in HTML, create it automatically.
*/

if (!exportButton) {

    exportButton =
        document.createElement("button");

    exportButton.id =
        "exportButton";

    exportButton.textContent =
        "💾 Export Backup";

    exportButton.classList.add(
        "data-button"
    );


    if (addCourseButton) {

        addCourseButton.parentNode.insertBefore(
            exportButton,
            addCourseButton.nextSibling
        );

    }

}



/* =========================================================
   Export Button Event
   ========================================================= */

if (exportButton) {

    exportButton.addEventListener(
        "click",
        exportCourses
    );

}



/* =========================================================
   Import Button Event
   ========================================================= */

if (importButton && importFile) {

    importButton.addEventListener(
        "click",
        function () {

            importFile.click();

        }
    );


    importFile.addEventListener(
        "change",
        importCourses
    );

}



/* =========================================================
   Add Course Button
   ========================================================= */

if (addCourseButton) {

    addCourseButton.addEventListener(
        "click",
        showAddCourseForm
    );

}



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



/* =========================================================
   Show Notes
   ========================================================= */

function showNotes(
    courseName,
    weekName
) {

    const notes =
        courses[courseName]
            .weeks[weekName];


    pageTitle.textContent =
        courseName + " - " + weekName;


    pageDescription.textContent =
        "Notes";


    noteContent.innerHTML = "";


    /* Notes */

    notes.forEach(
        function (note, index) {

            const noteButton =
                document.createElement("button");


            noteButton.textContent =
                note.title;


            noteButton.type =
                "button";


            noteButton.addEventListener(
                "click",
                function () {

                    showNote(
                        courseName,
                        weekName,
                        index
                    );

                }
            );


            noteContent.appendChild(
                noteButton
            );

        }
    );



    /* Add Note Button */

    const addNoteButton =
        document.createElement("button");


    addNoteButton.textContent =
        "➕ Add Note";


    addNoteButton.classList.add(
        "add-note-button"
    );


    addNoteButton.type =
        "button";


    addNoteButton.addEventListener(
        "click",
        function () {

            showAddNoteForm(
                courseName,
                weekName
            );

        }
    );


    noteContent.appendChild(
        addNoteButton
    );

}



/* =========================================================
   Show Single Note
   ========================================================= */

function showNote(
    courseName,
    weekName,
    noteIndex
) {

    const note =
        courses[courseName]
            .weeks[weekName][noteIndex];


    pageTitle.textContent =
        note.title;


    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML = "";


    const noteBody =
        document.createElement("div");

    noteBody.classList.add(
        "note-body"
    );


    if (
        typeof marked !== "undefined"
    ) {

        noteBody.innerHTML =
            marked.parse(
                note.content
            );

    } else {

        noteBody.textContent =
            note.content;

        console.error(
            "Marked.js did not load."
        );

    }


    noteContent.appendChild(
        noteBody
    );



    /* Edit Button */

    const editButton =
        document.createElement("button");

    editButton.textContent =
        "✏️ Edit Note";

    editButton.classList.add(
        "edit-note-button"
    );

    editButton.type =
        "button";


    editButton.addEventListener(
        "click",
        function () {

            showEditNoteForm(
                courseName,
                weekName,
                noteIndex
            );

        }
    );


    noteContent.appendChild(
        editButton
    );



    /* Delete Button */

    const deleteButton =
        document.createElement("button");

    deleteButton.textContent =
        "🗑️ Delete Note";

    deleteButton.classList.add(
        "delete-note-button"
    );

    deleteButton.type =
        "button";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteNote(
                courseName,
                weekName,
                noteIndex
            );

        }
    );


    noteContent.appendChild(
        deleteButton
    );

}



/* =========================================================
   Show Add Note Form
   ========================================================= */

function showAddNoteForm(
    courseName,
    weekName
) {

    pageTitle.textContent =
        "Add Note";


    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML = "";



    /* Title */

    const titleLabel =
        document.createElement("label");

    titleLabel.textContent =
        "Note Title";


    const titleInput =
        document.createElement("input");

    titleInput.type =
        "text";

    titleInput.placeholder =
        "Example: OSI Model";



    /* Editor Container */

    const editorContainer =
        document.createElement("div");

    editorContainer.classList.add(
        "editor-container"
    );



    /* Editor */

    const editorSide =
        document.createElement("div");

    editorSide.classList.add(
        "editor-side"
    );


    const editorTitle =
        document.createElement("h3");

    editorTitle.textContent =
        "Markdown Editor";


    const contentInput =
        document.createElement("textarea");

    contentInput.placeholder =
        "# Heading\n\nWrite your notes here...\n\n**Bold text**";


    editorSide.appendChild(
        editorTitle
    );

    editorSide.appendChild(
        contentInput
    );



    /* Preview */

    const previewSide =
        document.createElement("div");

    previewSide.classList.add(
        "preview-side"
    );


    const previewTitle =
        document.createElement("h3");

    previewTitle.textContent =
        "Preview";


    const preview =
        document.createElement("div");

    preview.classList.add(
        "markdown-preview"
    );


    preview.textContent =
        "Preview will appear here...";


    previewSide.appendChild(
        previewTitle
    );

    previewSide.appendChild(
        preview
    );



    editorContainer.appendChild(
        editorSide
    );

    editorContainer.appendChild(
        previewSide
    );



    /* Live Preview */

    contentInput.addEventListener(
        "input",
        function () {

            if (
                typeof marked !== "undefined"
            ) {

                preview.innerHTML =
                    marked.parse(
                        contentInput.value
                    );

            } else {

                preview.textContent =
                    contentInput.value;

            }

        }
    );



    /* Save Button */

    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "💾 Save Note";

    saveButton.type =
        "button";


    saveButton.addEventListener(
        "click",
        function () {

            addNote(
                courseName,
                weekName,
                titleInput.value,
                contentInput.value
            );

        }
    );



    /* Add everything */

    noteContent.appendChild(
        titleLabel
    );

    noteContent.appendChild(
        titleInput
    );

    noteContent.appendChild(
        editorContainer
    );

    noteContent.appendChild(
        saveButton
    );

}



/* =========================================================
   Add Note
   ========================================================= */

function addNote(
    courseName,
    weekName,
    title,
    content
) {

    title =
        title.trim();


    if (!title) {

        alert(
            "Please enter a note title."
        );

        return;

    }


    courses[courseName]
        .weeks[weekName]
        .push({

            title:
                title,

            content:
                content

        });


    saveCourses();


    const newIndex =
        courses[courseName]
            .weeks[weekName]
            .length - 1;


    showNote(
        courseName,
        weekName,
        newIndex
    );

}



/* =========================================================
   Delete Note
   ========================================================= */

function deleteNote(
    courseName,
    weekName,
    noteIndex
) {

    const note =
        courses[courseName]
            .weeks[weekName][noteIndex];


    const confirmed =
        confirm(
            'Delete "' +
            note.title +
            '"?'
        );


    if (!confirmed) {

        return;

    }


    courses[courseName]
        .weeks[weekName]
        .splice(
            noteIndex,
            1
        );


    saveCourses();


    showNotes(
        courseName,
        weekName
    );

}



/* =========================================================
   Show Edit Note Form
   ========================================================= */

function showEditNoteForm(
    courseName,
    weekName,
    noteIndex
) {

    const note =
        courses[courseName]
            .weeks[weekName][noteIndex];


    pageTitle.textContent =
        "Edit Note";


    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML = "";



    /* Title */

    const titleLabel =
        document.createElement("label");

    titleLabel.textContent =
        "Note Title";


    const titleInput =
        document.createElement("input");

    titleInput.type =
        "text";

    titleInput.value =
        note.title;



    /* Editor Container */

    const editorContainer =
        document.createElement("div");

    editorContainer.classList.add(
        "editor-container"
    );



    /* Editor */

    const editorSide =
        document.createElement("div");

    editorSide.classList.add(
        "editor-side"
    );


    const editorTitle =
        document.createElement("h3");

    editorTitle.textContent =
        "Markdown Editor";


    const contentInput =
        document.createElement("textarea");

    contentInput.value =
        note.content;


    editorSide.appendChild(
        editorTitle
    );

    editorSide.appendChild(
        contentInput
    );



    /* Preview */

    const previewSide =
        document.createElement("div");

    previewSide.classList.add(
        "preview-side"
    );


    const previewTitle =
        document.createElement("h3");

    previewTitle.textContent =
        "Preview";


    const preview =
        document.createElement("div");

    preview.classList.add(
        "markdown-preview"
    );


    if (
        typeof marked !== "undefined"
    ) {

        preview.innerHTML =
            marked.parse(
                contentInput.value
            );

    } else {

        preview.textContent =
            contentInput.value;

    }


    previewSide.appendChild(
        previewTitle
    );

    previewSide.appendChild(
        preview
    );



    editorContainer.appendChild(
        editorSide
    );

    editorContainer.appendChild(
        previewSide
    );



    /* Live Preview */

    contentInput.addEventListener(
        "input",
        function () {

            if (
                typeof marked !== "undefined"
            ) {

                preview.innerHTML =
                    marked.parse(
                        contentInput.value
                    );

            } else {

                preview.textContent =
                    contentInput.value;

            }

        }
    );



    /* Save Button */

    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "💾 Update Note";

    saveButton.type =
        "button";


    saveButton.addEventListener(
        "click",
        function () {

            updateNote(
                courseName,
                weekName,
                noteIndex,
                titleInput.value,
                contentInput.value
            );

        }
    );



    /* Add everything */

    noteContent.appendChild(
        titleLabel
    );

    noteContent.appendChild(
        titleInput
    );

    noteContent.appendChild(
        editorContainer
    );

    noteContent.appendChild(
        saveButton
    );

}



/* =========================================================
   Update Note
   ========================================================= */

function updateNote(
    courseName,
    weekName,
    noteIndex,
    title,
    content
) {

    title =
        title.trim();


    if (!title) {

        alert(
            "Please enter a note title."
        );

        return;

    }


    courses[courseName]
        .weeks[weekName][noteIndex]
        .title =
        title;


    courses[courseName]
        .weeks[weekName][noteIndex]
        .content =
        content;


    saveCourses();


    showNote(
        courseName,
        weekName,
        noteIndex
    );

}



/* =========================================================
   Save Courses to localStorage
   ========================================================= */

function saveCourses() {

    localStorage.setItem(
        "StudyCourses",
        JSON.stringify(courses)
    );

}



/* =========================================================
   Load Courses from localStorage
   ========================================================= */

function loadCourses() {

    const saved =
        localStorage.getItem(
            "StudyCourses"
        );


    if (!saved) {

        return courses;

    }


    try {

        const parsed =
            JSON.parse(saved);


        if (
            parsed &&
            typeof parsed === "object"
        ) {

            return parsed;

        }


        return courses;

    } catch (error) {

        console.error(
            "Could not load saved courses:",
            error
        );


        return courses;

    }

}



/* =========================================================
   Export Backup
   ========================================================= */

function exportCourses() {

    const data =
        JSON.stringify(
            courses,
            null,
            2
        );


    const blob =
        new Blob(
            [data],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "study-notes-backup.json";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );

}



/* =========================================================
   Import Backup
   ========================================================= */

function importCourses(event) {

    const file =
        event.target.files[0];


    if (!file) {

        return;

    }



    /* Check file type */

    if (
        !file.name
            .toLowerCase()
            .endsWith(".json")
    ) {

        alert(
            "Please select a JSON backup file."
        );


        importFile.value =
            "";


        return;

    }



    /* Read File */

    const reader =
        new FileReader();


    reader.onload =
        function () {

            try {

                const importedData =
                    JSON.parse(
                        reader.result
                    );



                /* Validate basic structure */

                if (
                    !importedData ||
                    typeof importedData !== "object" ||
                    Array.isArray(importedData)
                ) {

                    throw new Error(
                        "Invalid backup structure."
                    );

                }



                /*
                    Check whether the data
                    looks like our Course structure.
                */

                const courseNames =
                    Object.keys(
                        importedData
                    );


                for (
                    const courseName
                    of courseNames
                ) {

                    const course =
                        importedData[
                            courseName
                        ];


                    if (
                        !course ||
                        typeof course !== "object" ||
                        !course.weeks ||
                        typeof course.weeks !== "object"
                    ) {

                        throw new Error(
                            "Invalid course structure."
                        );

                    }


                    for (
                        const weekName
                        of Object.keys(
                            course.weeks
                        )
                    ) {

                        if (
                            !Array.isArray(
                                course.weeks[
                                    weekName
                                ]
                            )
                        ) {

                            throw new Error(
                                "Invalid week structure."
                            );

                        }


                        for (
                            const note
                            of course.weeks[
                                weekName
                            ]
                        ) {

                            if (
                                !note ||
                                typeof note !== "object" ||
                                typeof note.title !== "string" ||
                                typeof note.content !== "string"
                            ) {

                                throw new Error(
                                    "Invalid note structure."
                                );

                            }

                        }

                    }

                }



                /* Confirm before replacing data */

                const confirmed =
                    confirm(
                        "Importing this backup will replace your current notes.\n\nContinue?"
                    );


                if (!confirmed) {

                    importFile.value =
                        "";

                    return;

                }



                /*
                    Replace current courses
                    with imported courses.
                */

                courses =
                    importedData;


                saveCourses();


                /*
                    Refresh the website.
                */

                showCourses();


                pageTitle.textContent =
                    "Ciallo ～(∠・ω< )⌒★ !";


                pageDescription.textContent =
                    "Backup imported successfully.";


                noteContent.innerHTML =
                    "<p>Your backup has been restored.</p>";


                weekSidebar.innerHTML = `
                    <h3>Weeks</h3>
                    <p>Select a course first.</p>
                `;


                alert(
                    "Backup imported successfully!"
                );



            } catch (error) {

                console.error(
                    "Import failed:",
                    error
                );


                alert(
                    "Import failed.\n\n" +
                    "The selected file is not a valid Study Notes backup."
                );

            }



            /*
                Reset file input.

                This allows the user to select
                the same file again later.
            */

            importFile.value =
                "";

        };



    reader.onerror =
        function () {

            alert(
                "Could not read the backup file."
            );


            importFile.value =
                "";

        };


    reader.readAsText(
        file
    );

}


/* =========================================================
   Start Website
   ========================================================= */

showCourses();