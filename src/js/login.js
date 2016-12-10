
$(document).ready(function () {

    $("#loginButton").on("click", function(e) {
        e.preventDefault();

        var email = $("#inputEmail").val();
        var pw = $("#inputPassword").val();

        SDK.login(email, pw, function (err, data) {

            //On wrong credentials
            if (err) {
                return $("#loginForm").find(".form-group").addClass("has-error");
            }

            $("#loginForm").find(".form-group").addClass("has-succes");


            //Login OK!
            if (data.type == "student") {
                window.location.href = "user.html";

            } if (data.type == "teacher") {
                window.location.href = "teacher.html";

            }
        });

    });
});