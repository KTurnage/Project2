$(function () {

    console.log("Signup.js has been loaded");

    $(".submit-signup").on("click", function (event) {
        event.preventDefault();

        console.log('Signup has been clicked')

        var userSignUp = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };

        console.log(userSignUp);

        $.ajax("/api/newuser", {
            type: "POST",
            data: userSignUp
        }).then(
            function () {

                console.log("Posted Successfully");
                window.location = "/home";
            }
        );
    });


    $(".submit-signin").on("click", function () {
        console.log('Signin Clicked');

        var userSignIn = {
            email: $("#signin-email").val().trim(),
            password: $("#signin-password").val().trim()
        };

        console.log(userSignIn);

        $.ajax("/api/usersignin", {
            type: "POST",
            data: userSignIn
        }).then(
            function () {

                console.log("Posted Successfully");
                window.location = "/home";
            }
        );
    });


}
)