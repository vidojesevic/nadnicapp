import { getRegistrationData } from "./registration.js";
import { getLoginData } from "./login.js";

$(document).ready(function() {
    console.log("This app is powered by jQuery!");
    // loading views
    loadView("#navbar", "");
    loadView("#cover", "");
    loadView("#filters", "");
    loadView("#footer", "");
    loadView("#about", "");
    // ajax calls and swaping content from div
    fetchData(getJobsFromAPI("/api/jobs/all", "#users"));
    filterList();
    searchByArea();
    displayCategory();

    // basic UI
    activeNav();
    setTimeout(function() {
        clearInterval(stickiFooter);
    }, 500);
    loginVsRegistrationUI();

    // login and registration
    loginRegistrationLoad("#login", "#main");
    loginRegistrationLoad("#register", "#main");

    // login.js && registration.js
    getRegistrationData();
    getLoginData();
});

/**
 * Loading views
 * @param {string} id - String value of id
 * @param {string} target - String value of target id for swapping content
 * @return {void}
 */
const loadView = (id, target) => {
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

const loginRegistrationLoad = (id, nav) => {
    $(document).on("click", id, function(event) {
        event.preventDefault();
        loadView(id, nav)
        return false;
    });
}

const getUsersFromAPI = (api, id) => {
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
                <div class="user-card border rounded rounded-2 mb-2">
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

const getJobsFromAPI = (api, id) => {
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

            data.forEach(job => {
                const startDate = new Date(job.date_start);
                const endDate = new Date(job.date_end);
                const current = new Date();
                const calculate = startDate - current;
                const daysLeft = Math.floor(calculate / (1000 * 60 * 60 * 24));

                const userHtml = `
                <div class="user-card border rounded rounded-2 mb-2">
                    <h3>${job.caption}  (${daysLeft} days left)</h3>
                    <p><span class="text-success"><i class="fa fa-list-alt" aria-hidden="true"></i> ${job.category}</span> - ${job.description}.</p>
                    <div class='row'>
                        <div class="col-6 text-start px-5">
                            <p><i class="fa fa-calendar text-success" aria-hidden="true"></i>&emsp;${startDate.toLocaleString().split(',')[0]}-${endDate.toLocaleString().split(',')[0]}</p>
                            <p><i class="fa-solid fa-clock text-success"></i>&emsp;${job.time_start} - ${job.time_end}</p>
                            <p><i class="fa-solid fa-money-bill-1-wave text-success"></i>&emsp;<span class='fw-bolder'>${job.price} RSD</span></p>
                        </div>
                        <div class='col-6 text-end px-5'>
                            <p><a class="user-a text-success fw-bolder" href="#"><i class="fa-solid fa-user text-success"></i>&emsp;${job.first_name} ${job.last_name}</a></p>
                            <p><i class="fas fa-location text-success"></i>&emsp;${job.street} ${job.numbre}</p>
                            <p><i class="fa-solid fa-city text-success"></i>&emsp;${job.zip} ${job.city}</p>
                        </div>
                    </div>
                    <form class="pb-3" action='' method='POST'>
                        <input type='submit' id='submitJob' class='btn btn-success' value='Apply' />
                    </form>
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

 const fetchData = async (func) => {
    try {
        await func;
    }
    catch (error) {
        console.log(error);
    }
}

const searchByArea = () => {
    $(document).on('submit', '#form', function(event){
        event.preventDefault();
        const city = $("#srcJob").val();
        const regex = /^[ a-zA-Z]+$/;
        if (city === "") {
            alert("You have to enter the city!")
            return;
        }
        if (!regex.test(city)) {
            alert("You have to enter letters only!")
            return;
        }
        const url = "/api/jobs/area?area=" + city;
        fetchData(getJobsFromAPI(url, "#users"));
    });
}

// Filter functions
const filterList = () => {
    $(document).on('click', "#filters a", function() {
        const url = $(this).data('url');
        switch(url) {
            case "/api/users/all":
                fetchData(getUsersFromAPI(url, "#users"));
                break;
            case "/api/jobs/all":
                fetchData(getJobsFromAPI(url, "#users"));
                break;
            case "/api/jobs/create":
                loadView("createJob", "#users");
                break;
            default: 
                break;
        }
    });
};

const printCategory = (api) => {
    $.ajax({
        url: api,
        type: "GET",
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function(data) {
            if (data.length === 0) {
                console.log("There is no categories to show!");
            }
            data.forEach(cat => {
                let content = "";
                content += `<li><a class="dropdown-item" href="#">${cat.category}</a></li>
                            <li><hr class="dropdown-divider"></li>`;
                $("#dropp").append(content);
            });

        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log("Error loading view:", error);
            $(id).html(`<h3 class="mt-3">Failed to fetch data from API!</h3>`);
        }
    });
};

const displayCategory = () => {
    // Here will fetch data from database
    printCategory("/api/jobs/categories");

    // Displaying filtered data
    $(document).on('click', '#dropp li a', function() {
        const value = $(this).text();
        const url = "/api/jobs/category?category=" + value;
        fetchData(getJobsFromAPI(url, "#users"));
    })
};

// UI functions
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

const loginVsRegistrationUI = () => {
    $(document).on('click', 'a#register', function() {
        $("#login").empty().html('Registration');
        // $("#jobsNav").attr('href', "index.html#main");  // cool idea, bad execution
    })
    $(document).on('click', "#navbar-js li a", function() {
        $("#login").empty().html('Login');
    })
}
