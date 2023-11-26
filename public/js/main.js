$(document).ready(function() {
    console.log("jQuery");
    loadView("#navbar");
    loadView("#cover");
    loadView("#filters");
    loadView("#footer");
    fetchData(getUsersFromAPI("/api/users/all", "#users"));
})

function loadView(id) {
    $.ajax({
        url: "/views/" + id.replace("#", "") + ".html",
        type: "GET",
        success: function(data) {
            $(id).html(data);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.error("Error loading view:", error);
        }
    });
}

function getUsersFromAPI(api, id) {
    $.ajax({
        url: api,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            // console.log(JSON.stringify(data));
            console.log(typeof data)
            $(id).empty();

            data.forEach(user => {
                const userHtml = `
                <div class="user-card border border-1 rounded mb-2">
                <h3>${user.first_name} ${user.last_name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.telefon}</p>
                <p>Role: ${user.role}</p>
                <p>Address: ${user.street}, ${user.numbre}, ${user.city} ${user.zip}</p>
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
