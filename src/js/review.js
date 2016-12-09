$(document).ready(function () {

    //Fires on page-load
    SDK.UserReview.getAll(function (err, data) {
        if (err) throw err;

        /* var decrypted = encryptDecrypt(data);
         decrypted = JSON.parse(decrypted);
         */

        var $reviewBody = $("#reviewBody");
        data.forEach(function (review) {


            $reviewBody.append(
                "<tr>" +
                "<td>" + review.lectureId + "</td>" +
                "<td>" + review.rating + "</td>" +
                "<td>" + review.comment + "</td>" +
                "<td>" + "<button class='delete' data-review=" + review.id + "> Slet </button>" + "</td>" +
                "</tr>");


        });
    });


    $('#reviewBody').on("click",".delete",function () {
        var reviewId = $(this).data("review");
        var deleteReview = {
            id: 10,
            userId: 8
        };

        SDK.DeleteLectures.delete(reviewId, function (err, reviewId) {
            if (err) throw err;
            console.log("delete");
        });


    });


});


