$(document).ready(function() {
    console.log("jQuery");
    loadView("#navbar");
    loadView("#cover");
    loadView("#filters");
    loadView("#footer");
    fetchData(getUsersFromAPI("/api/users/all", "#users"));
    // dinaClass("#dropp", "list-group-item");

    searchByArea();
});

// testing something
// function dinaClass(id, clas) {
//     $(id).click(function() {
//         $(this).addClass(clas);
//     })
// }

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

function getUsersFromAPI(api, id, area) {
    let apiUrl;
    if (!area) {
        apiUrl = api;
    } else {
        apiUrl = api + "?area=" + area
    }
    $.ajax({
        url: apiUrl,
        // url: `${api}?area=${encodeURIComponent(area)}`,
        type: "GET",
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function(data) {
            // console.log(typeof data)
            // console.log(data)
            $(id).empty();

            data.forEach(user => {
                const userHtml = `
                <div class="user-card border border-1 rounded mb-1">
                    <h3>${user.first_name} ${user.last_name}</h3>
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
        console.log(city)
        if (city === "") {
            alert("You have to enter the city!")
            return;
        }
        url = "/api/users/area?area=" + city;
        fetchData(getUsersFromAPI(url, "#users"));
    });
}
