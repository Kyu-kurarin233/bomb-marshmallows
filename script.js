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
   Start Website
   ========================================================= */

