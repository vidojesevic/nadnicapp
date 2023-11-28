function hello() {
    console.log("Hello from login");
}

function getLoginData() {
    $(document).on('submit', '#loginForm', function(event) {
        event.preventDefault();

        const email = $("#loginMail")
        if (!email.val().includes("@gmail.com")) {
            console.log("Your email is not valid!")
        }

        const pass = $("#loginPass");
        if (pass.val().length < 8) {
            console.log("Your password must be at least 8 characters!")
        }

        const data = new FormData();
        data.append('email', email.val());
        data.append('password', pass.val());

        // $.ajax({
        //     url: 
        // });
    })
}

function getRegistrationData() {
    $(document).on('submit', '#registerForm', function(event) {
        event.preventDefault();

        const email = $("#email")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.val())) {
            email.parent().append(`<p>Your mail ${email.val()} is not walid</p>`);
            email.addClass('red');
        }

        const username = $("#username")
        if (username.val().length <= 8) {
            username.parent().append(`<p>Your username ${username.val()} must be at least 8 character!</p>`);
            username.addClass('red');
        }

        const pass = $("#pass");
        if (pass.val().length <= 8) {
            pass.parent().append("<p>Your password must be at least 8 characters!</p>");
            pass.addClass('red');
        }

        const passRep = $("#passRep");
        if (pass.val() != passRep.val()) {
            passRep.parent().append("<p>Your passwords doesn't match!</p>");
            passRep.addClass('red');
        }

        // polulate FormData with values from form
        // const data = new FormData();
        // data.append('email', email.val());
        // data.append('password', pass.val());

        // ajax post to server
    })
}
