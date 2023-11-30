/**
 * getRegistrationData - Function responsiblke for getting and validating data on front end while login
 * @return {void}
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
        const numbre = Number(strNum.val());
        if (!regexNum.test(strNum.val())) {
            err++;
            throwError(strNum, `Street number should contain only numbers!`);
        } else {
            success(strNum);
        }

        const city = $("#city");
        const zipInput = city.val().split(" ")[0];
        const cityVal = city.val().replace(zipInput, "").trim();
        if (cityVal.length < 2 && !regexCity.test(city.val())) {
            err++;
            throwError(city, `City must be at least 2 characters use letters only!`);
        } else {
            success(city);
        }

        const zip = Number(zipInput)
        if (!regexNum.test(zip) && isNaN(zip)) {
            err++;
            throwError(city, `Zip code must be numbers only!`);
        } else {
            success(city);
        }
        // console.log("All data:\nStreet: "+typeof street.val()+"\nnumber: "+typeof numbre+"\ncity: "+typeof cityVal+"\nzip: "+typeof zip);
        // console.log("All data:\nStreet: "+street.val()+"\nnumber: "+numbre+"\ncity: "+ cityVal+"\nzip: "+ zip);

        if (err === 0) {
            const location = new FormData();
            location.append('street', street.val())
            location.append('numbre', numbre)
            location.append('city', cityVal)
            location.append('zip', zip)

            const user = new FormData();
            user.append('first_name', first_name.val())
            user.append('last_name', last_name.val())
            user.append('email', email.val());
            user.append('telefon', telefon.val())
            user.append('password', pass.val())
            user.append('username', username.val());

            sendData(location, '/api/location/create')

            getLastId('/api/location/last')
                .then(location_id => {
                    console.log(location_id);
                    user.append('location_id', location_id);
                    // insert into users
                })
                .catch(error => {
                    console.log(error);
                });

        }
    })
}

/**
 * throwError - Styling function for representing error while register
 * @param {object} div - DOM element of registration Form
 * @param {string} message - String value of error message
 * @return {void}
 */
function throwError(div, message) {
    div.parent().find('label').append("<span class='error text-danger' style='position: relative;'> * " + message + "</span>");
    div.addClass('border-danger')
}

/**
 * success - Styling function for good input data
 * @param {object} div - DOM element of registration Form
 * @return {void}
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
 * @return {void}
 */
function sendData(formData, url) {
    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: false,
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error: " + textStatus);
            console.log("Error Thrown: " + errorThrown);
            console.log("Server Response: ", jqXHR.responseText);
        }
    });
}

/**
 * getLastId - Ajax async function that returns last inserted location id
 * @param {string} url - String value of API endpoint
 * @return {void}
 */
function getLastId(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("AJAX Error: " + textStatus);
                console.log("Error Thrown: " + errorThrown);
                console.log("Server Response: ", jqXHR.responseText);
                reject(errorThrown);
            }
        });
    });
}
