$(document).ready(function() {
    console.log("Hello form jQuery")
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
            console.error("Error loading view:", error);
        }
    });
}
