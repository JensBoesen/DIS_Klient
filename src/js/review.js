$(document).ready(function () {

    //Samme koncept som lectures
    SDK.UserReview.getAll(function (err, data) {
        if (err) throw err;


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

    //Knap til at slette det pågældende review. Gemmer id'et på det review man har valgt
    $('#reviewBody').on("click",".delete",function () {
        var reviewId = $(this).data("review");
        var deleteReview = {
            reviewId: reviewId
        };

        //Selve kaldet til SDK'en
        SDK.DeleteReview.deleteReview(reviewId, function (err, reviewId) {
            location.reload();
            console.log("delete");
        });


    });


});


