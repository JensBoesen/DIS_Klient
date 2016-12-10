
$(document).ready(function () {

    $("#logOut").on("click", function () {

        SDK.logOut();

        window.location.href = "login.html";

    });
});