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
            throwError(email, `Email is not valid!`);
        } else {
            success(email);
        }

        const username = $("#username")
        if (username.val().length < 8) {
            err++;
            throwError(username, `Username must be at least 8 character!`);
        } else {
            success(username);
        }

        const pass = $("#pass");
        if (pass.val().length < 8) {
            err++;
            throwError(pass, "Your password must be at least 8 characters!");
        } else {
            success(pass);
        }

        const passRep = $("#passRep");
        if (pass.val() != passRep.val()) {
            err++;
            throwError(passRep, "Your passwords doesn't match!");
        } else {
            success(passRep);
        }

        const first_name = $("#first_name");
        if (first_name.val().length <= 3) {
            err++;
            throwError(first_name, `First name must be at least 3 character!`);
        } else {
            success(first_name);
        }

        $("#roleDrop a").click(function() {
            const value = $(this).data('value');
            console.log(value);
        })

        const last_name = $("#last_name");
        if (last_name.val().length <= 4) {
            err++;
            throwError(last_name, `Last name must be at least 4 character!`);
        } else {
            success(last_name);
        }

        const street = $("#street");
        regexStr = /^[a-zA-Z0-9]/;
        if (!regexStr.test(street.val())) {
            err++;
            throwError(street, `Street should contain only letters and numbers!`);
        } else {
            success(street);
        }

        const strNum = $("#strNum");
        regexStrNum = /^[0-9]/;
        if (!regexStrNum.test(strNum.val())) {
            err++;
            throwError(strNum, `Street number should contain only numbers!`);
        } else {
            success(strNum);
        }

        const city = $("#city");
        regexCity = /^[a-zA-Z]/;
        if (city.val().length <= 2 && !regexCity.test(city.val())) {
            err++;
            throwError(city, `City must be at least 2 characters use letters only!`);
        } else {
            success(city);
        }

        if (err === 0) {
            const data = new FormData();
            data.append('email', email.val());
            data.append('username', username.val());
            data.append('password', pass.val())
            data.append('first_name', first_name.val())
            data.append('last_name', last_name.val())

            console.log(`User's data:`)
            for (const pair of data.entries()) {
                console.log(pair[0] + ": " + pair[1])
            }

            const location = new FormData();
            location.append('street', street.val())
            location.append('street number', strNum.val())
            location.append('city', city.val())
            // TODO: function for getting zip code for the city

            console.log(`Location data for user:`)
            for (const pair of location.entries()) {
                console.log(pair[0] + ": " + pair[1])
            }
        }

        // Sending FormData with ajax to server | some function
    })
}

function throwError(div, message) {
    div.parent().find('label').append("<span class='error text-danger' style='position: relative;'> * " + message + "</span>");
    div.addClass('border-danger')
}

function success(div) {
    div.removeClass('border-danger')
    $('.error').remove()
    div.addClass('border-success')
}
