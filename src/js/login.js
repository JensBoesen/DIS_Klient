
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

            window.location.href="bruger.html";




            //Login OK!
          /*  if (data.type == admin) {
                $("#loginForm").find(".form-group").addClass("has-success");
                window.location.href = "admin.html";

            } if (data.type == student) {
                $("#loginForm").find(".form-group").addClass("has-success");
                window.location.href = "bruger.html";

            } else {
                $("#loginForm").find(".form-group").addClass("has-succes");
                window.location.href = "teacher.html";
            }*/

        });

    });
});