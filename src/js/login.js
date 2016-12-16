
$(document).ready(function () {

    $("#loginButton").on("click", function(e) {
        e.preventDefault();

        var email = $("#inputEmail").val();
        var pw = $("#inputPassword").val();

        SDK.login(email, pw, function (err, data) {

            if (err) {
                return $("#loginForm").find(".form-group").addClass("has-error");
            }

            $("#loginForm").find(".form-group").addClass("has-succes");


            //Når informationerne er blevet valideret, bliver man sendt videre til enten student eller teacher.
            if (data.type == "student") {
                window.location.href = "user.html";

            } if (data.type == "teacher") {
                window.location.href = "teacher.html";

            }
        });

    });
});