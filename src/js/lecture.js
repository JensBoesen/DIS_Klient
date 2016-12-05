$(document).ready(function () {

    //Fires on page-load
    SDK.Course.getById(function (err, courses) {
        if (err) throw err;

        /* var decrypted = encryptDecrypt(data);
         decrypted = JSON.parse(decrypted);
         */

        var $dropdownCourse = $("#dropdownCourse");
        courses.forEach(function (course) {

            $dropdownCourse.append(
                "<button data-course=" + course.displaytext + ">" + "<li>" + course.code + "</li>" + "</button>");
            console.log(course);

        });


        $dropdownCourse.on('click', "button", function () {
            var course = $(this).data("course");
            console.log(course);
            // console.log(event);
            SDK.Lectures.getById(course, function (err, data) {
                if (err) throw err;

                console.log(data);

                $("#lecturesTableBody").empty();

                var $lecturesTableBody = $("#lecturesTableBody");
                data.forEach(function (lecture) {



                    $lecturesTableBody.append(
                        "<tr>" +
                        "<td>" + lecture.id + "</td>" +
                        "<td>" + lecture.type + "</td>" +
                        "<td>" + lecture.description + "</td>" +
                        "<td>" + lecture.startDate + "</td>" +
                        "<td>" + lecture.endDate + "</td>" +
                        "<td>" + "<button id='andmeldelse'> Anmeldelser </button>" + "</td>" +
                        "</tr>");

                    $('button[id^="andmeldelse"]').click(function(){
                        SDK.Storage.persist(lecture.id);
                        window.location.href='andmeldelser.html';
                    });

                });


            });
        });

    });
});


