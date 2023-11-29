/**
 * getRegistrationData - Function responsiblke for getting and validating data on front end while login
 * @returns {void}
 */
export function getRegistrationData() {
    $(document).on('submit', '#registerForm', function(event) {
        event.preventDefault();

        let err = 0;
        const regexNum = /^[0-9]/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexStr = /^[a-zA-Z0-9]/;
        const regexTel = /^\+[0-9]+$/;
        const regexCity = /^[a-zA-Z]/;

        // User
        const email = $("#email")
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
        if (first_name.val().length < 3) {
            err++;
            throwError(first_name, `First name must be at least 3 character!`);
        } else {
            success(first_name);
        }

        const telefon = $("#telefon");
        if (!regexTel.test(telefon.val())) {
            err++;
            throwError(telefon, `First name must be at least 3 character!`);
        } else {
            success(telefon);
        }

        const last_name = $("#last_name");
        if (last_name.val().length < 4) {
            err++;
            throwError(last_name, `Last name must be at least 4 character!`);
        } else {
            success(last_name);
        }

        // location
        const street = $("#street");
        if (!regexStr.test(street.val())) {
            err++;
            throwError(street, `Street should contain only letters and numbers!`);
        } else {
            success(street);
        }

        const strNum = $("#strNum");
        const numbre = parseInt(strNum.val(), 10);
        if (!regexNum.test(strNum.val())) {
            err++;
            throwError(strNum, `Street number should contain only numbers!`);
        } else {
            success(strNum);
        }

        const city = $("#city");
        const zip = parseInt(city.val(), 10);
        const cityVal = city.val().replace(zip, "").trim();
        if (cityVal.length < 2 && !regexCity.test(city.val())) {
            err++;
            throwError(city, `City must be at least 2 characters use letters only!`);
        }
        if (cityVal.length < 1) {
            throwError(city, `City must be defined!`);
        } else {
            success(city);
        }
        if (!regexNum.test(zip) && !zip) {
            err++;
            throwError(city, `Zip code must be numbers only!`);
        } else {
            success(city);
        }

        if (err === 0) {
            const user = new FormData();
            user.append('first_name', first_name.val())
            user.append('last_name', last_name.val())
            user.append('email', email.val());
            user.append('telefon', telefon.val())
            user.append('password', pass.val())
            user.append('username', username.val());

            // console.log(`User's data:`)
            // for (const pair of user.entries()) {
            //     console.log(pair[0] + ": " + pair[1])
            // }
            // sendData(user, '/api/users/createUser');

            const location = new FormData();
            location.append('street', street.val())
            location.append('numbre', numbre)
            location.append('city', cityVal)
            location.append('zip', zip)
            // TODO: function for getting zip code for the city

            console.log(`Location data for user:`)
            for (const pair of location.entries()) {
                console.log(pair[0] + ": " + pair[1])
            }
            sendData(location, '/api/location/create');
        }

        // Sending FormData with ajax to server | some function
    })
}

/**
 * throwError - Styling function for representing error while register
 * @param {object} div - DOM element of registration Form
 * @param {string} message - String value of error message
 * @returns {void}
 */
function throwError(div, message) {
    div.parent().find('label').append("<span class='error text-danger' style='position: relative;'> * " + message + "</span>");
    div.addClass('border-danger')
}

/**
 * success - Styling function for good input data
 * @param {object} div - DOM element of registration Form
 * @returns {void}
 */
function success(div) {
    div.removeClass('border-danger')
    $('.error').remove()
    div.addClass('border-success')
}

/**
 * sendData - Ajax function for senmding data to server
 * @param {FormData} data - FormData from registration form
 * @param {string} url - String value of API endpoint url
 * @returns {void}
 */
function sendData(formData, url) {
    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: false,
        success: function(data) {
            console.log(data);
            alert('Your registration is finished!');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error: " + textStatus);
            console.log("Error Thrown: " + errorThrown);
            console.log("Server Response: ", jqXHR.responseText);
        }
    });
}
