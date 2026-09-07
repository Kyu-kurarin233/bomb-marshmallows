// 1. Course Data
let courses = {

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

//load saved data
courses = 
    loadCourses();

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


    // Show existing notes
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


    // Add Note button
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


    noteContent.appendChild(addButton);

}


//点击图标显示真正内容
function showNote(courseName, weekName, noteIndex) {

    const course =
        courses[courseName];

    const notes =
        course.weeks[weekName];

    const note =
        notes[noteIndex];


    // Page title
    pageTitle.textContent =
        note.title;

    pageDescription.textContent =
        courseName + " - " + weekName;


    // Clear old content
    noteContent.innerHTML = "";


    // Show note content
    const content =
        document.createElement("p");

    content.textContent =
        note.content;

    noteContent.appendChild(content);


    // Edit button
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


    // Delete button
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

//添加笔记功能

function showAddNoteForm(courseName, weekName) {

    pageTitle.textContent =
        "Add New Note";

    pageDescription.textContent =
        courseName + " - " + weekName;


    noteContent.innerHTML = "";


    //标题
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


    //目录Content
    const contentLabel =
        document.createElement("label");

    contentLabel.textContent =
        "Note Content";


    const contentInput =
        document.createElement("textarea");

    contentInput.placeholder =
        "Write your notes here...";


    //保存键
    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "💾 Save Note";


    //取消保存
    const cancelButton =
        document.createElement("button");

    cancelButton.textContent =
        "Cancel";


    // Save Click Event
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


    // Cancel Click Event
    cancelButton.addEventListener(
        "click",
        function () {

            showNotes(
                courseName,
                weekName
            );

        }
    );


    // Put everything on page
    noteContent.appendChild(
        titleLabel
    );

    noteContent.appendChild(
        titleInput
    );

    noteContent.appendChild(
        contentLabel
    );

    noteContent.appendChild(
        contentInput
    );

    noteContent.appendChild(
        saveButton
    );

    noteContent.appendChild(
        cancelButton
    );

}

function addNote(
    courseName,
    weekName,
    title,
    content
) {

    // Remove extra spaces
    title =
        title.trim();

    content =
        content.trim();


    // Check empty title
    if (title === "") {

        alert(
            "Please enter a note title."
        );

        return;

    }


    // Check empty content
    if (content === "") {

        alert(
            "Please enter note content."
        );

        return;

    }


    // Create new note
    const newNote = {

        title: title,

        content: content

    };


    // Add to correct Week
    courses[courseName]
        .weeks[weekName]
        .push(newNote);

    //save changes
    saveCourses();


    // Return to Note List
    showNotes(
        courseName,
        weekName
    );

}

function deleteNote(
    courseName,
    weekName,
    noteIndex
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this note?"
        );


    // User clicked Cancel
    if (!confirmDelete) {

        return;

    }


    // Find notes
    const notes =
        courses[courseName]
            .weeks[weekName];


    // Remove note
    notes.splice(
        noteIndex,
        1
    );

    //save changes
    saveCourses();

    // Return to note list
    showNotes(
        courseName,
        weekName
    );

}

function showEditNoteForm(
    courseName,
    weekName,
    noteIndex
) {

    // Find current note
    const course =
        courses[courseName];

    const notes =
        course.weeks[weekName];

    const note =
        notes[noteIndex];


    // Page title
    pageTitle.textContent =
        "Edit Note";

    pageDescription.textContent =
        courseName + " - " + weekName;


    // Clear old content
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

    // Put old title into input
    titleInput.value =
        note.title;


    // Content
    const contentLabel =
        document.createElement("label");

    contentLabel.textContent =
        "Note Content";


    const contentInput =
        document.createElement("textarea");

    // Put old content into textarea
    contentInput.value =
        note.content;


    // Save Changes button
    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "💾 Save Changes";


    // Cancel button
    const cancelButton =
        document.createElement("button");

    cancelButton.textContent =
        "Cancel";


    // Save Click Event
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


    // Cancel Click Event
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


    // Put everything on page

    noteContent.appendChild(
        titleLabel
    );

    noteContent.appendChild(
        titleInput
    );

    noteContent.appendChild(
        contentLabel
    );

    noteContent.appendChild(
        contentInput
    );

    noteContent.appendChild(
        saveButton
    );

    noteContent.appendChild(
        cancelButton
    );

}

//更新
function updateNote(
    courseName,
    weekName,
    noteIndex,
    newTitle,
    newContent
) {

    // Remove extra spaces
    newTitle =
        newTitle.trim();

    newContent =
        newContent.trim();


    // Check empty title
    if (newTitle === "") {

        alert(
            "Please enter a note title."
        );

        return;

    }


    // Check empty content
    if (newContent === "") {

        alert(
            "Please enter note content."
        );

        return;

    }


    // Find note
    const note =
        courses[courseName]
            .weeks[weekName][noteIndex];


    // Update title
    note.title =
        newTitle;

    // Update content
    note.content =
        newContent;

    //save changes
    saveCourses();

    // Show updated note
    showNote(
        courseName,
        weekName,
        noteIndex
    );

}

//保存页面刷新后不会丢失数据
function saveCourses() {

    localStorage.setItem(
        "StudyCourses",
        JSON.stringify(courses)
    );

}

function loadCourses() {

    const savedCourses =
        localStorage.getItem(
            "StudyCourses"
        );


    if (savedCourses) {

        return JSON.parse(
            savedCourses
        );

    }


    return courses;

}