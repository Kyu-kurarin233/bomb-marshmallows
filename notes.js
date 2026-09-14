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


