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

