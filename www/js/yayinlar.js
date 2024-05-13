$.get( "https://cordova.adilyildiz.com.tr/api/?yazaryayinlistesi="+(new URLSearchParams(window.location.search).get('yazar')), function( data ) {
    console.log( "Data Loaded: ", data );
    var tableBody = document.getElementById("userTableBody");
    data.forEach(function(post) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + post.id + "</td>" +
                      "<td><a href=\"yayin.html?yazar="+post.id+"\">" + post.author_id + "</a></td>" +
                      "<td>" + post.title + "</td>" +
                      "<td>" + post.description + "</td>" +
                      "<td>" + post.content + "</td>" +
                      "<td>" + post.date + "</td>";
      tableBody.appendChild(row);
    });
  });