$(document).ready(function () {

    //Fires on page-load
    SDK.Review.getAll(function (err, data) {
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

                "</tr>");
        });
    });
});


