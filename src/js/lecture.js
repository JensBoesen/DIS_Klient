$(document).ready(function () {

    //Her bliver alle fagene hentet ind via SDK
    SDK.Course.getById(function (err, courses) {
        if (err) throw err;

        //Drop down menu bliver fyldt ud
        var $dropdownCourse = $("#dropdownCourse");
        courses.forEach(function (course) {

            $dropdownCourse.append(
                "<button data-course=" + course.displaytext + ">" + "<li>" + course.code + "</li>" + "</button>");
            console.log(course);

        });

        //når man har valgt faget vil alle lektionerne blive hentet ind og sat ind i et table
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

                    //knap til at sende brugeren videre til anmeldelserne. Bemærk den gemmer det lecture ID man har valgt
                    $('button[id^="andmeldelse"]').click(function () {
                        SDK.Storage.persist("lectureId", lecture.id);
                        window.location.href = 'reviews.html';
                        andmeldelse.close("andmeldelse");
                    });



                });
            });

        });
    });
});
