$(document).ready(function() {
    loadView("#navbar")
    loadView("#cover")
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
