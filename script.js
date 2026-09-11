// ============================================================
// STUDY NOTES WEBSITE
// ============================================================


// ============================================================
// 1. DEFAULT COURSE DATA
// ============================================================

let courses = {

    KIT111: {
        title: "KIT111",
        description: "Data Networks and Security",

        weeks: {

            "Week 1": [
                {
                    title: "Introduction to Networking",
                    content: "# Introduction to Networking\n\nNotes about the **Introduction to Networking**."
                },

                {
                    title: "TCP/IP Model",
                    content: "# TCP/IP Model\n\nNotes about the TCP/IP network model."
                },

                {
                    title: "OSI Model",
                    content: "# OSI Model\n\nNotes about the OSI network model."
                }
            ],

            "Week 2": [
                {
                    title: "Network Protocols",
                    content: "# Network Protocols\n\nNotes about network protocols."
                },

                {
                    title: "Communication",
                    content: "# Communication\n\nNotes about communication in networks."
                }
            ],

            "Week 3": [
                {
                    title: "IP Addresses",
                    content: "# IP Addresses\n\nNotes about IP addresses."
                },

                {
                    title: "Subnetting",
                    content: "# Subnetting\n\nNotes about subnetting."
                }
            ],

            "Exam Revision": [
                {
                    title: "Important Questions",
                    content: "# Important Questions\n\nImportant questions for exam revision."
                },

                {
                    title: "Network Summary",
                    content: "# Network Summary\n\nSummary of important networking concepts."
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
                    content: "# Introduction to Programming\n\nBasic programming concepts."
                }
            ],

            "Week 2": [
                {
                    title: "Variables",
                    content: "# Variables\n\nNotes about variables and data types."
                }
            ],

            "Week 3": [
                {
                    title: "Conditions and Loops",
                    content: "# Conditions and Loops\n\nNotes about if statements and loops."
                }
            ],

            "Exam Revision": [
                {
                    title: "Programming Revision",
                    content: "# Programming Revision\n\nImportant programming concepts."
                }
            ]

        }
    }

};


// ============================================================
// 2. LOAD SAVED DATA
// ============================================================

courses = loadCourses();


// ============================================================
// 3. FIND HTML ELEMENTS
// ============================================================

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


// ============================================================
// 4. CREATE EXPORT BUTTON
// ============================================================

// Try to find Export button in HTML
let exportButton =
    document.getElementById("exportButton");


// If HTML does not have Export button,
// create one automatically.
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

    // Put button under Add Course
    if (addCourseButton) {

        addCourseButton.parentNode.insertBefore(
            exportButton,
            addCourseButton.nextSibling
        );

    }

}


// Export button event
exportButton.addEventListener(
    "click",
    exportCourses
);


// ============================================================
// 5. SHOW COURSES
// ============================================================

function showCourses() {

    // Clear old course buttons
    courseList.innerHTML = "";


    // Loop through courses
    for (const courseName in courses) {

        const course =
            courses[courseName];


        // Create button
        const button =
            document.createElement("button");


        // Button text
        button.textContent =
            course.title;


        // CSS class
        button.classList.add(
            "course-button"
        );


        // Click event
        button.addEventListener(
            "click",
            function () {

                showCourse(
                    courseName
                );

            }
        );


        // Add button to page
        courseList.appendChild(
            button
        );

    }

}


// ============================================================
// 6. ADD COURSE BUTTON
// ============================================================

addCourseButton.addEventListener(
    "click",
    function () {

        showAddCourseForm();

    }
);


// ============================================================
// 7. SHOW ADD COURSE FORM
// ============================================================

function showAddCourseForm() {

    pageTitle.textContent =
        "Add New Course";


    pageDescription.textContent =
        "Create a new course for your study notes.";


    noteContent.innerHTML = "";


    // -------------------------
    // Course Code
    // -------------------------

    const codeLabel =
        document.createElement("label");

    codeLabel.textContent =
        "Course Code";


    const codeInput =
        document.createElement("input");

    codeInput.type =
        "text";

    codeInput.placeholder =
        "Example: KIT119";


    // -------------------------
    // Course Name
    // -------------------------

    const nameLabel =
        document.createElement("label");

    nameLabel.textContent =
        "Course Name";


    const nameInput =
        document.createElement("input");

    nameInput.type =
        "text";

    nameInput.placeholder =
        "Example: Programming Fundamentals";


    // -------------------------
    // Create Button
    // -------------------------

    const createButton =
        document.createElement("button");

    createButton.textContent =
        "➕ Create Course";


    // -------------------------
    // Cancel Button
    // -------------------------

    const cancelButton =
        document.createElement("button");

    cancelButton.textContent =
        "Cancel";


    // -------------------------
    // Create Event
    // -------------------------

    createButton.addEventListener(
        "click",
        function () {

            addCourse(
                codeInput.value,
                nameInput.value
            );

        }
    );


    // -------------------------
    // Cancel Event
    // -------------------------

    cancelButton.addEventListener(
        "click",
        function () {

            pageTitle.textContent =
                "Study Notes";

            pageDescription.textContent =
                "Select a course and week to start studying.";

            noteContent.innerHTML =
                "<p>Select a course to start studying.</p>";

        }
    );


    // -------------------------
    // Add Elements
    // -------------------------

    noteContent.appendChild(
        codeLabel
    );

    noteContent.appendChild(
        codeInput
    );

    noteContent.appendChild(
        nameLabel
    );

    noteContent.appendChild(
        nameInput
    );

    noteContent.appendChild(
        createButton
    );

    noteContent.appendChild(
        cancelButton
    );

}


// ============================================================
// 8. ADD COURSE
// ============================================================

function addCourse(
    courseCode,
    courseName
) {

    // Remove spaces
    courseCode =
        courseCode.trim().toUpperCase();

    courseName =
        courseName.trim();


    // Empty course code
    if (courseCode === "") {

        alert(
            "Please enter a course code."
        );

        return;
    }


    // Empty course name
    if (courseName === "") {

        alert(
            "Please enter a course name."
        );

        return;
    }


    // Course already exists
    if (courses[courseCode]) {

        alert(
            "This course already exists."
        );

        return;
    }


    // Create course
    courses[courseCode] = {

        title: courseCode,

        description: courseName,

        weeks: {}

    };


    // Save
    saveCourses();


    // Refresh courses
    showCourses();


    // Open new course
    showCourse(
        courseCode
    );

}


// ============================================================
// 9. DELETE COURSE
// ============================================================

function deleteCourse(
    courseName
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            courseName +
            "?\n\nThis will delete the course, all weeks, and all notes."
        );


    if (!confirmDelete) {

        return;

    }


    // Delete course
    delete courses[courseName];


    // Save
    saveCourses();


    // Reset page
    pageTitle.textContent =
        "Study Notes";


    pageDescription.textContent =
        "Select a course and week to start studying.";


    noteContent.innerHTML =
        "<p>Select a course to start studying.</p>";


    weekSidebar.innerHTML = `
        <h3>Weeks</h3>
        <p>Select a course first.</p>
    `;


    // Refresh courses
    showCourses();

}


// ============================================================
// 10. SHOW COURSE
// ============================================================

function showCourse(
    courseName
) {

    const course =
        courses[courseName];


    // Safety check
    if (!course) {

        return;

    }


    pageTitle.textContent =
        course.title;


    pageDescription.textContent =
        course.description;


    noteContent.innerHTML =
        "<p>Select a week from the left.</p>";


    showWeeks(
        courseName
    );

}


// ============================================================
// 11. SHOW WEEKS
// ============================================================

function showWeeks(
    courseName
) {

    const course =
        courses[courseName];


    if (!course) {

        return;

    }


    weekSidebar.innerHTML =
        "<h3>Weeks</h3>";


    // -------------------------
    // Show every week
    // -------------------------

    for (
        const weekName in course.weeks
    ) {

        // Container
        const weekItem =
            document.createElement("div");

        weekItem.classList.add(
            "week-item"
        );


        // Week button
        const weekButton =
            document.createElement("button");

        weekButton.textContent =
            weekName;

        weekButton.classList.add(
            "week-button"
        );


        weekButton.addEventListener(
            "click",
            function () {

                showNotes(
                    courseName,
                    weekName
                );

            }
        );


        // Delete week button
        const deleteWeekButton =
            document.createElement("button");

        deleteWeekButton.textContent =
            "🗑️";

        deleteWeekButton.classList.add(
            "delete-week-button"
        );

        deleteWeekButton.title =
            "Delete " + weekName;


        deleteWeekButton.addEventListener(
            "click",
            function (event) {

                // Prevent week button click
                event.stopPropagation();


                deleteWeek(
                    courseName,
                    weekName
                );

            }
        );


        // Put buttons inside container
        weekItem.appendChild(
            weekButton
        );

        weekItem.appendChild(
            deleteWeekButton
        );


        // Put container inside sidebar
        weekSidebar.appendChild(
            weekItem
        );

    }


    // ========================================================
    // ADD WEEK BUTTON
    // ========================================================

    const addWeekButton =
        document.createElement("button");

    addWeekButton.textContent =
        "➕ Add Week";

    addWeekButton.classList.add(
        "add-week-button"
    );


    addWeekButton.addEventListener(
        "click",
        function () {

            showAddWeekForm(
                courseName
            );

        }
    );


    weekSidebar.appendChild(
        addWeekButton
    );


    // ========================================================
    // DELETE COURSE BUTTON
    // ========================================================

    const deleteCourseButton =
        document.createElement("button");

    deleteCourseButton.textContent =
        "🗑️ Delete Course";

    deleteCourseButton.classList.add(
        "delete-course-button"
    );


    deleteCourseButton.addEventListener(
        "click",
        function () {

            deleteCourse(
                courseName
            );

        }
    );


    weekSidebar.appendChild(
        deleteCourseButton
    );

}


// ============================================================
// 12. SHOW ADD WEEK FORM
// ============================================================

function showAddWeekForm(
    courseName
) {

    pageTitle.textContent =
        "Add New Week";


    pageDescription.textContent =
        courseName;


    noteContent.innerHTML = "";


    // Label
    const label =
        document.createElement("label");

    label.textContent =
        "Week Name";


    // Input
    const input =
        document.createElement("input");

    input.type =
        "text";

    input.placeholder =
        "Example: Week 4";


    // Add button
    const addButton =
        document.createElement("button");

    addButton.textContent =
        "➕ Create Week";


    // Cancel button
    const cancelButton =
        document.createElement("button");

    cancelButton.textContent =
        "Cancel";


    // Add event
    addButton.addEventListener(
        "click",
        function () {

            addWeek(
                courseName,
                input.value
            );

        }
    );


    // Cancel event
    cancelButton.addEventListener(
        "click",
        function () {

            showCourse(
                courseName
            );

        }
    );


    // Add to page
    noteContent.appendChild(
        label
    );

    noteContent.appendChild(
        input
    );

    noteContent.appendChild(
        addButton
    );

    noteContent.appendChild(
        cancelButton
    );

}


// ============================================================
// 13. ADD WEEK
// ============================================================

function addWeek(
    courseName,
    weekName
) {

    weekName =
        weekName.trim();


    // Empty name
    if (weekName === "") {

        alert(
            "Please enter a week name."
        );

        return;
    }


    const course =
        courses[courseName];


    if (!course) {

        return;

    }


    // Week already exists
    if (course.weeks[weekName]) {

        alert(
            "This week already exists."
        );

        return;
    }


    // Create empty notes array
    course.weeks[weekName] =
        [];


    // Save
    saveCourses();


    // Refresh course
    showCourse(
        courseName
    );


    // Open new week
    showNotes(
        courseName,
        weekName
    );

}


// ============================================================
// 14. DELETE WEEK
// ============================================================

function deleteWeek(
    courseName,
    weekName
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            weekName +
            "?\n\nThis will also delete all notes inside this week."
        );


    if (!confirmDelete) {

        return;

    }


    // Delete week
    delete courses[courseName]
        .weeks[weekName];


    // Save
    saveCourses();


    // Refresh course
    showCourse(
        courseName
    );

}


// ============================================================
// 15. SHOW NOTES
// ============================================================

function showNotes(
    courseName,
    weekName
) {

    const course =
        courses[courseName];


    if (!course) {

        return;

    }


    const notes =
        course.weeks[weekName];


    if (!notes) {

        return;

    }


    pageTitle.textContent =
        courseName + " - " + weekName;


    pageDescription.textContent =
        "Select a note to study.";


    noteContent.innerHTML =
        "";


    // -------------------------
    // Show Notes
    // -------------------------

    for (
        let i = 0;
        i < notes.length;
        i++
    ) {

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


        noteContent.appendChild(
            button
        );

    }


    // -------------------------
    // Add Note Button
    // -------------------------

    const addButton =
        document.createElement("button");


    addButton.textContent =
        "➕ Add Note";


    addButton.classList.add(
        "add-note-button"
    );


    addButton.addEventListener(
        "click",
        function () {

            showAddNoteForm(
                courseName,
                weekName
            );

        }
    );


    noteContent.appendChild(
        addButton
    );

}


// ============================================================
// 16. SHOW ONE NOTE
// ============================================================

function showNote(
    courseName,
    weekName,
    noteIndex
) {

    const note =
        courses[courseName]
            .weeks[weekName][noteIndex];


    if (!note) {

        return;

    }


    pageTitle.textContent =
        note.title;


    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML =
        "";


    // -------------------------
    // Markdown content
    // -------------------------

    const content =
        document.createElement("div");


    content.classList.add(
        "note-body"
    );


    if (
        typeof marked !== "undefined"
    ) {

        content.innerHTML =
            marked.parse(
                note.content
            );

    } else {

        content.textContent =
            note.content;

        console.error(
            "Marked.js did not load."
        );

    }


    noteContent.appendChild(
        content
    );


    // ========================================================
    // EDIT BUTTON
    // ========================================================

    const editButton =
        document.createElement("button");


    editButton.textContent =
        "✏️ Edit Note";


    editButton.classList.add(
        "edit-note-button"
    );


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


    // ========================================================
    // DELETE BUTTON
    // ========================================================

    const deleteButton =
        document.createElement("button");


    deleteButton.textContent =
        "🗑️ Delete Note";


    deleteButton.classList.add(
        "delete-note-button"
    );


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


// ============================================================
// 17. SHOW ADD NOTE FORM
// ============================================================

function showAddNoteForm(
    courseName,
    weekName
) {

    pageTitle.textContent =
        "Add New Note";


    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML =
        "";


    // ========================================================
    // NOTE TITLE
    // ========================================================

    const titleLabel =
        document.createElement("label");

    titleLabel.textContent =
        "Note Title";


    const titleInput =
        document.createElement("input");

    titleInput.type =
        "text";

    titleInput.placeholder =
        "Enter note title...";


    // ========================================================
    // EDITOR CONTAINER
    // ========================================================

    const editorContainer =
        document.createElement("div");

    editorContainer.classList.add(
        "editor-container"
    );


    // ========================================================
    // LEFT: MARKDOWN EDITOR
    // ========================================================

    const editorSide =
        document.createElement("div");

    editorSide.classList.add(
        "editor-side"
    );


    const editorTitle =
        document.createElement("h3");

    editorTitle.textContent =
        "✏️ Markdown Editor";


    const contentInput =
        document.createElement("textarea");


    contentInput.placeholder =
        "# Heading\n\n## Subheading\n\nWrite your notes here...\n\n- Bullet point\n- Another point\n\n**Bold text**";


    editorSide.appendChild(
        editorTitle
    );

    editorSide.appendChild(
        contentInput
    );


    // ========================================================
    // RIGHT: PREVIEW
    // ========================================================

    const previewSide =
        document.createElement("div");

    previewSide.classList.add(
        "preview-side"
    );


    const previewTitle =
        document.createElement("h3");

    previewTitle.textContent =
        "👀 Preview";


    const preview =
        document.createElement("div");

    preview.classList.add(
        "markdown-preview"
    );


    preview.innerHTML =
        "<p>Preview will appear here...</p>";


    previewSide.appendChild(
        previewTitle
    );

    previewSide.appendChild(
        preview
    );


    // Add editor + preview
    editorContainer.appendChild(
        editorSide
    );

    editorContainer.appendChild(
        previewSide
    );


    // ========================================================
    // LIVE MARKDOWN PREVIEW
    // ========================================================

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


    // ========================================================
    // SAVE BUTTON
    // ========================================================

    const saveButton =
        document.createElement("button");


    saveButton.textContent =
        "💾 Save Note";


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


    // ========================================================
    // CANCEL BUTTON
    // ========================================================

    const cancelButton =
        document.createElement("button");


    cancelButton.textContent =
        "Cancel";


    cancelButton.addEventListener(
        "click",
        function () {

            showNotes(
                courseName,
                weekName
            );

        }
    );


    // ========================================================
    // ADD EVERYTHING TO PAGE
    // ========================================================

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

    noteContent.appendChild(
        cancelButton
    );

}


// ============================================================
// 18. ADD NOTE
// ============================================================

function addNote(
    courseName,
    weekName,
    title,
    content
) {

    title =
        title.trim();


    content =
        content.trim();


    // Empty title
    if (title === "") {

        alert(
            "Please enter a note title."
        );

        return;
    }


    // Empty content
    if (content === "") {

        alert(
            "Please enter note content."
        );

        return;
    }


    // Create note
    const newNote = {

        title: title,

        content: content

    };


    // Add note
    courses[courseName]
        .weeks[weekName]
        .push(
            newNote
        );


    // Save
    saveCourses();


    // Show notes
    showNotes(
        courseName,
        weekName
    );

}


// ============================================================
// 19. DELETE NOTE
// ============================================================

function deleteNote(
    courseName,
    weekName,
    noteIndex
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this note?"
        );


    if (!confirmDelete) {

        return;

    }


    const notes =
        courses[courseName]
            .weeks[weekName];


    notes.splice(
        noteIndex,
        1
    );


    // Save
    saveCourses();


    // Refresh
    showNotes(
        courseName,
        weekName
    );

}


// ============================================================
// 20. SHOW EDIT NOTE FORM
// ============================================================

function showEditNoteForm(
    courseName,
    weekName,
    noteIndex
) {

    const note =
        courses[courseName]
            .weeks[weekName][noteIndex];


    if (!note) {

        return;

    }


    pageTitle.textContent =
        "Edit Note";


    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML =
        "";


    // ========================================================
    // NOTE TITLE
    // ========================================================

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


    // ========================================================
    // EDITOR CONTAINER
    // ========================================================

    const editorContainer =
        document.createElement("div");


    editorContainer.classList.add(
        "editor-container"
    );


    // ========================================================
    // LEFT EDITOR
    // ========================================================

    const editorSide =
        document.createElement("div");


    editorSide.classList.add(
        "editor-side"
    );


    const editorTitle =
        document.createElement("h3");


    editorTitle.textContent =
        "✏️ Markdown Editor";


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


    // ========================================================
    // RIGHT PREVIEW
    // ========================================================

    const previewSide =
        document.createElement("div");


    previewSide.classList.add(
        "preview-side"
    );


    const previewTitle =
        document.createElement("h3");


    previewTitle.textContent =
        "👀 Preview";


    const preview =
        document.createElement("div");


    preview.classList.add(
        "markdown-preview"
    );


    // Initial preview
    if (
        typeof marked !== "undefined"
    ) {

        preview.innerHTML =
            marked.parse(
                note.content
            );

    } else {

        preview.textContent =
            note.content;

    }


    previewSide.appendChild(
        previewTitle
    );


    previewSide.appendChild(
        preview
    );


    // Add editor + preview
    editorContainer.appendChild(
        editorSide
    );


    editorContainer.appendChild(
        previewSide
    );


    // ========================================================
    // LIVE PREVIEW
    // ========================================================

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


    // ========================================================
    // SAVE CHANGES
    // ========================================================

    const saveButton =
        document.createElement("button");


    saveButton.textContent =
        "💾 Save Changes";


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


    // ========================================================
    // CANCEL
    // ========================================================

    const cancelButton =
        document.createElement("button");


    cancelButton.textContent =
        "Cancel";


    cancelButton.addEventListener(
        "click",
        function () {

            showNote(
                courseName,
                weekName,
                noteIndex
            );

        }
    );


    // ========================================================
    // ADD TO PAGE
    // ========================================================

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

    noteContent.appendChild(
        cancelButton
    );

}


// ============================================================
// 21. UPDATE NOTE
// ============================================================

function updateNote(
    courseName,
    weekName,
    noteIndex,
    newTitle,
    newContent
) {

    newTitle =
        newTitle.trim();


    newContent =
        newContent.trim();


    // Empty title
    if (newTitle === "") {

        alert(
            "Please enter a note title."
        );

        return;

    }


    // Empty content
    if (newContent === "") {

        alert(
            "Please enter note content."
        );

        return;

    }


    const note =
        courses[courseName]
            .weeks[weekName][noteIndex];


    // Update
    note.title =
        newTitle;


    note.content =
        newContent;


    // Save
    saveCourses();


    // Show updated note
    showNote(
        courseName,
        weekName,
        noteIndex
    );

}


// ============================================================
// 22. SAVE TO LOCALSTORAGE
// ============================================================

function saveCourses() {

    localStorage.setItem(
        "StudyCourses",
        JSON.stringify(
            courses
        )
    );

}


// ============================================================
// 23. LOAD FROM LOCALSTORAGE
// ============================================================

function loadCourses() {

    const savedCourses =
        localStorage.getItem(
            "StudyCourses"
        );


    // If saved data exists
    if (savedCourses) {

        try {

            return JSON.parse(
                savedCourses
            );

        } catch (error) {

            console.error(
                "Could not load saved courses:",
                error
            );

        }

    }


    // If nothing saved,
    // use default courses
    return courses;

}


// ============================================================
// 24. EXPORT BACKUP
// ============================================================

function exportCourses() {

    // Convert courses object to JSON
    const data =
        JSON.stringify(
            courses,
            null,
            2
        );


    // Create file data
    const blob =
        new Blob(
            [data],
            {
                type: "application/json"
            }
        );


    // Create temporary URL
    const url =
        URL.createObjectURL(
            blob
        );


    // Create download link
    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "study-notes-backup.json";


    // Start download
    link.click();


    // Remove temporary URL
    URL.revokeObjectURL(
        url
    );

}


// ============================================================
// 25. START WEBSITE
// ============================================================

showCourses();