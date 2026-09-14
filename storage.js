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


