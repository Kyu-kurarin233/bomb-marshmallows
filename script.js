const kit111Button = document.getElementById("kit111Button");
const kit107Button = document.getElementById("kit107Button");
const kit119Button = document.getElementById("kit119Button");

const courseTitle = document.getElementById("courseTitle");
const courseDescription = document.getElementById("courseDescription");
const courseInfo = document.getElementById("courseInfo");

kit111Button.addEventListener("click", function () {

    courseTitle.textContent = "KIT111";

    courseDescription.textContent =
        "Data Networks and Security";

    courseInfo.textContent =
        "Here I will record my notes and revision materials.";

});

kit107Button.addEventListener("click", function () {

    courseTitle.textContent = "KIT107";

    courseDescription.textContent =
        "Introduction to Programming";

    courseInfo.textContent =
        "Here I will record my programming notes.";

});

kit119Button.addEventListener("click", function () {

    courseTitle.textContent = "KIT119";

    courseDescription.textContent =
        "Database Fundamentals";

    courseInfo.textContent =
        "Here I will record my learning and revision materials.";

});