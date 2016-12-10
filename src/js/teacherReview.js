$(document).ready(function () {

    //Fires on page-load
    SDK.LectureReview.getAll(function (err, data) {
        if (err) throw err;

        /* var decrypted = encryptDecrypt(data);
         decrypted = JSON.parse(decrypted);
         */

        var $reviewBody = $("#reviewBody");
        data.forEach(function (review) {


            $reviewBody.append(
                "<tr>" +
                "<td>" + review.rating + "</td>" +
                "<td>" + review.comment + "</td>" +
                "<td>" + "<button class='delete' data-review=" + review.id + "> Slet </button>" + "</td>" +
                "</tr>");


        });
    });


    $('#reviewBody').on("click",".delete",function () {
        var reviewId = $(this).data("review");
        var deleteReview = {
            reviewId: reviewId
        };

        SDK.DeleteReview.deleteReview(reviewId, function (err, reviewId) {
            location.reload();
            console.log("delete");
        });


    });


});


