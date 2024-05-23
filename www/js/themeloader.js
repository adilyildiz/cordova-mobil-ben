console.log("head yükleniyor");
var jqxhr = $.ajax( {
    type: "GET",
    url: "theme/head.html",
    cache: false,
    async: false
})
.done(function(data) {
    $("headicerik").replaceWith(data);
    console.log("head yüklendi");
})
console.log("menü yükleniyor");
var jqxhr = $.ajax( {
    type: "GET",
    url: "theme/menu.html",
    cache: false,
    async: false
})
.done(function(data) {
    $("ustmenu").replaceWith(data);
    console.log("menu yüklendi");
})

console.log("foot yükleniyor");
var jqxhr = $.ajax( {
    type: "GET",
    url: "theme/footer.html",
    cache: false,
    async: false
})
.done(function(data) {    
    $("altfoot").replaceWith(data);
    console.log("foot yüklendi");
})