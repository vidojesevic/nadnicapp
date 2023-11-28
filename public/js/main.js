$(document).ready(function() {
    console.log("jQuery");
    loadView("#navbar", "");
    loadView("#cover", "");
    loadView("#filters", "");
    loadView("#footer", "");
    loadView("#about", "");
    fetchData(getUsersFromAPI("/api/users/all", "#users"));
    searchByArea();

    // $("#loginForm").submit(false);
    // $("#registerForm").submit(false);

    loginRegistrationLoad("#login", "#main");
    loginRegistrationLoad("#register", "#main");

    //login.js
    getRegistrationData();
    // getLoginData();
});

function loadView(id, target) {
    if (target === "") {
        target = id
    }
    $.ajax({
        url: "/views/" + id.replace("#", "") + ".html",
        type: "GET",
        success: function(data) {
            $(target).empty();
            $(target).html(data);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.error("Error loading view:", error);
        }
    });
}

function loginRegistrationLoad(id, nav) {
    $(document).on("click", id, function(event) {
        event.preventDefault();
        loadView(id, nav)
        return false;
    });
}

function getUsersFromAPI(api, id) {
    $.ajax({
        url: api,
        type: "GET",
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function(data) {
            $(id).empty();

            data.forEach(user => {
                const userHtml = `
                <div class="user-card border rounded mb-2">
                    <h3>${user.first_name} ${user.last_name} (${user.username})</h3>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${user.telefon}</p>
                    <p>Role: ${user.role}</p>
                    <p>Address: ${user.street} ${user.numbre}, ${user.city} ${user.zip}</p>
                </div>`;

                $(id).append(userHtml);
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log("Error loading view:", error);
            $(id).html(`<h3 class="mt-3">Failed to fetch data from API!</h3>`);
        }
    });
}

async function fetchData(func) {
    try {
        await func;
    }
    catch (error) {
        console.log(error);
    }
}

function searchByArea() {
    $(document).on('submit', '#form', function(event){
        event.preventDefault();
        const city = $("#srcJob").val();
        if (city === "") {
            alert("You have to enter the city!")
            return;
        }
        url = "/api/users/area?area=" + city;
        fetchData(getUsersFromAPI(url, "#users"));
    });
}
