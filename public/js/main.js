$(document).ready(function() {
    loadView("id","navbar.html")
})

function loadView(id, views) {
    const div = $(id)
    div.html(views)
}
