$(document).ready(function () {

    //Fires on page-load
    SDK.LectureReview.getAll(function (err, data) {
        if (err) throw err;

        /* var decrypted = encryptDecrypt(data);
         decrypted = JSON.parse(decrypted);
         */

        var $lectureReviewBody = $("#lectureReviewBody");
        data.forEach(function (review) {


            $lectureReviewBody.append(
                "<tr>" +
                "<td>" + review.rating + "</td>" +
                "<td>" + review.comment + "</td>" +

                "</tr>");
        });
    });
});


