var jqxhr = $.ajax( {
    type: "GET",
    url: "theme/head.html",
    cache: false,
    async: false
})
.done(function(data) {
    $("headicerik").replaceWith(data);
})

var jqxhr = $.ajax( {
    type: "GET",
    url: "theme/menu.html",
    cache: false,
    async: false
})
.done(function(data) {
    $("ustmenu").replaceWith(data);
})


var jqxhr = $.ajax( {
    type: "GET",
    url: "theme/footer.html",
    cache: false,
    async: false
})
.done(function(data) {    
    $("altfoot").replaceWith(data);
})