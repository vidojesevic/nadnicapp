$(document).ready(function() {
    console.log("jQuery");
    loadView("#navbar")
    loadView("#cover")
    getUsersFromAPI('/api/users', '#users')
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
    $.get(api, function (data) {
        console.log(data);
        $(id).html(data)
    })
        .fail(function(err) {
            console.log(err);
            $(id).html('<h3>Failed to fetch data from API!</h3>');
        });
}
