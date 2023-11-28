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

        let err = 0;
        const email = $("#email")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.val())) {
            err++;
            throwError(email, `Your mail ${email.val()} is not valid!`)
        } else {
            success(email)
        }

        const username = $("#username")
        if (username.val().length < 8) {
            err++;
            throwError(username, `Your username ${username.val()} must be at least 8 character!`)
        } else {
            success(username)
        }

        const pass = $("#pass");
        if (pass.val().length < 8) {
            err++;
            throwError(pass, "Your password must be at least 8 characters!")
        } else {
            success(pass)
        }

        const passRep = $("#passRep");
        if (pass.val() != passRep.val()) {
            err++;
            throwError(passRep, "Your passwords doesn't match!")
        } else {
            success(passRep)
        }

        const first_name = $("#first_name");
        if (first_name.val().length <= 3) {
            err++;
            throwError(first_name, `Your first name '${first_name.val()}' must be at least 3 character!`)
        } else {
            success(first_name)
        }

        $("#roleDrop a").click(function() {
            const value = $(this).data('value');
            console.log(value);
        })

        if (err == 0) {
            const data = new FormData();
            data.append('email', email.val());
            data.append('username', username.val());
            data.append('password', pass.val())
            data.append('first_name', first_name.val())
            for (const pair of data.entries()) {
                console.log(pair[0] + ": " + pair[1])
            }
        }

        // ajax post to server
    })
}

function throwError(div, message) {
    div.parent().append("<p class='error'>" + message + "</p>");
    div.addClass('border-danger')
}

function success(div) {
    div.removeClass('border-danger')
    $('.error').remove()
    div.addClass('border-success')
}
