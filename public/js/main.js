$(document).ready(function() {
    console.log("jQuery");
    // loading views
    loadView("#navbar", "");
    loadView("#cover", "");
    loadView("#filters", "");
    loadView("#footer", "");
    loadView("#about", "");
    // ajax calls and swaping content from div
    fetchData(getUsersFromAPI("/api/users/all", "#users"));
    searchByArea();

    // basic UI
    activeNav();
    setTimeout(function() {
        clearInterval(stickiFooter);
    }, 500);

    // login and registration
    loginRegistrationLoad("#login", "#main");
    loginRegistrationLoad("#register", "#main");

    //login.js functions
    getRegistrationData();
    // getLoginData();
});

/**
 * Loading views
 * @param {string} id - String value of id
 * @param {string} target - String value of target id for swapping content
 */
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
            if (data.length === 0) {
                const city = $("#srcJob").val()
                $(id).append(`<h3>There is no data for ${city}!</h3>`);
            }

            data.forEach(user => {
                const userHtml = `
                <div class="user-card border rounded mb-2">
                    <h3>${user.first_name} ${user.last_name} - @${user.username}</h3>
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
        const regex = /^[a-zA-Z]+$/;
        if (city === "") {
            alert("You have to enter the city!")
            return;
        }
        if (!regex.test(city)) {
            alert("You have to enter letters only!")
            return;
        }
        url = "/api/users/area?area=" + city;
        fetchData(getUsersFromAPI(url, "#users"));
    });
}

const stickiFooter = setInterval(function() {
    const height = $('body').height();
    const win = $(window).height();
    const footer = $('#footer');
    if (win > height) {
        footer.css('position','fixed','bottom','0');
    } else {
        footer.css('position','static');
    }
}, 50);

const activeNav = () => {
    $(document).on('click', "#navbar-js li a", function () {
        const body = $(document).width();
        if (body > 992) {
            setTimeout(() => {
                $(this).parent().siblings().find('a').removeClass('activateNav text-dark');
                $(this).addClass('activateNav text-dark');
            }, 230);
        } else {
            setTimeout(() => {
                $(this).parent().siblings().find('a').removeClass('text-dark');
                $(this).addClass('text-dark');
            }, 230);
        }
    });
};
