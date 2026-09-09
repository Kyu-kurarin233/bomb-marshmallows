// 1. Default Course Data

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

// 2. Load Saved Data

courses = loadCourses();

// 3. Find HTML Elements

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

// 4. Show Courses

function showCourses() {

courseList.innerHTML = "";


for (const courseName in courses) {

    const course =
        courses[courseName];


    const button =
        document.createElement("button");


    button.textContent =
        course.title;


    button.classList.add(
        "course-button"
    );


    button.addEventListener(
        "click",
        function () {

            showCourse(
                courseName
            );

        }
    );


    courseList.appendChild(
        button
    );

}

}

// 5. Add Course Button

addCourseButton.addEventListener(
"click",
function () {

    showAddCourseForm();

}

);

// 6. Show Add Course Form

function showAddCourseForm() {

pageTitle.textContent =
    "Add New Course";


pageDescription.textContent =
    "Create a new course for your study notes.";


noteContent.innerHTML = "";


// Course Code

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


// Course Name

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


// Create Button

const createButton =
    document.createElement("button");


createButton.textContent =
    "➕ Create Course";


// Cancel Button

const cancelButton =
    document.createElement("button");


cancelButton.textContent =
    "Cancel";


// Create Event

createButton.addEventListener(
    "click",
    function () {

        addCourse(
            codeInput.value,
            nameInput.value
        );

    }
);


// Cancel Event

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


// Add Elements

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

// 7. Create Course

function addCourse(
courseCode,
courseName
) {

courseCode =
    courseCode.trim().toUpperCase();


courseName =
    courseName.trim();


if (courseCode === "") {

    alert(
        "Please enter a course code."
    );

    return;

}


if (courseName === "") {

    alert(
        "Please enter a course name."
    );

    return;

}


if (courses[courseCode]) {

    alert(
        "This course already exists."
    );

    return;

}


courses[courseCode] = {

    title: courseCode,

    description: courseName,

    weeks: {}

};


saveCourses();


showCourses();


showCourse(
    courseCode
);

}

// 8. Show Course

function showCourse(courseName) {

const course =
    courses[courseName];


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

// 9. Show Weeks

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


    weekSidebar.appendChild(
        button
    );

}

}

// 10. Show Notes List

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
    "Select a note to study.";


noteContent.innerHTML = "";


// Show Notes

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


// Add Note Button

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

// 11. Show One Note

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


// Markdown Content

const content =
    document.createElement("div");


content.classList.add(
    "note-body"
);


if (typeof marked !== "undefined") {

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


// Edit Button

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


// Delete Button

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

// 12. Show Add Note Form

function showAddNoteForm(
courseName,
weekName
) {

pageTitle.textContent =
    "Add New Note";


pageDescription.textContent =
    courseName + " - " + weekName;


noteContent.innerHTML = "";


// Note Title

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


// Editor Container

const editorContainer =
    document.createElement("div");


editorContainer.classList.add(
    "editor-container"
);


// Editor Side

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


// Preview Side

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


preview.innerHTML =
    "<p>Preview will appear here...</p>";


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


// Live Preview

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


// Save Button

const saveButton =
    document.createElement("button");


saveButton.textContent =
    "💾 Save Note";


// Cancel Button

const cancelButton =
    document.createElement("button");


cancelButton.textContent =
    "Cancel";


// Save Event

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


// Cancel Event

cancelButton.addEventListener(
    "click",
    function () {

        showNotes(
            courseName,
            weekName
        );

    }
);


// Add to Page

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

// 13. Add Note

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


if (title === "") {

    alert(
        "Please enter a note title."
    );

    return;

}


if (content === "") {

    alert(
        "Please enter note content."
    );

    return;

}


const newNote = {

    title: title,

    content: content

};


courses[courseName]
    .weeks[weekName]
    .push(
        newNote
    );


saveCourses();


showNotes(
    courseName,
    weekName
);

}

// 14. Delete Note

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

// 15. Show Edit Note Form

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


// Title

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


// Editor Container

const editorContainer =
    document.createElement("div");


editorContainer.classList.add(
    "editor-container"
);


// Editor Side

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


// Preview Side

const previewSide =
    document.createElement("div");


previewSide.classList.add(
    "preview-side"
);


const previewTitle =
    document.createElement("h3");


previewTitle.textContent =
    " Preview";


const preview =
    document.createElement("div");


preview.classList.add(
    "markdown-preview"
);


// Initial Preview

if (typeof marked !== "undefined") {

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


editorContainer.appendChild(
    editorSide
);


editorContainer.appendChild(
    previewSide
);


// Live Preview

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


// Save Button

const saveButton =
    document.createElement("button");


saveButton.textContent =
    "💾 Save Changes";


// Cancel Button

const cancelButton =
    document.createElement("button");


cancelButton.textContent =
    "Cancel";


// Save Event

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


// Cancel Event

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


// Add to Page

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

// 16. Update Note

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


if (newTitle === "") {

    alert(
        "Please enter a note title."
    );

    return;

}


if (newContent === "") {

    alert(
        "Please enter note content."
    );

    return;

}


const note =
    courses[courseName]
        .weeks[weekName][noteIndex];


note.title =
    newTitle;


note.content =
    newContent;


saveCourses();


showNote(
    courseName,
    weekName,
    noteIndex
);

}

// 17. Save to localStorage

function saveCourses() {

localStorage.setItem(
    "StudyCourses",
    JSON.stringify(
        courses
    )
);

}

// 18. Load from localStorage

function loadCourses() {

const savedCourses =
    localStorage.getItem(
        "StudyCourses"
    );


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


return courses;

}

// 19. Start Website
showCourses();
