/**
 * getLoginData - Function responsiblke for getting and validating data on front end while login
 * @returns {void}
 */
export function getLoginData() {
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


