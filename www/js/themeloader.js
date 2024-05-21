
//$( "#menuheader" ).load("theme/menu.html"); 
var jqxhr = $.ajax( {
    type: "GET",
    url: "theme/menu.html",
    cache: false,
    async: false
})
.done(function(data) {
    $("#menuheader").html(data);
})