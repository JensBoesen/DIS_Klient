
    function getAllReviews() {
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
    }

    function createReview() {
        var review = {
            comment: $("#comment").val(),
            rating: $("#rating").val(),
            userId: SDK.Storage.load("tokenId"),
            lectureId: SDK.Storage.load("lectureId"),

        };

        SDK.LectureReview.create(review, function (err, data) {
            console.log(review);
            location.reload();

            $("#createReviewButton").modal("hide");
        });

    }


