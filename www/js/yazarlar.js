$.get( "https://cordova.adilyildiz.com.tr/api/?yazarlistesi", function( data ) {
    console.log( "Data Loaded: ", data );
    var tableBody = document.getElementById("userTableBody");
    data.forEach(function(user) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + user.id + "</td>" +
                      "<td><a href=\"yayinlar.html?yazar="+user.id+"\">" + user.first_name + "</a></td>" +
                      "<td>" + user.last_name + "</td>" +
                      "<td>" + user.email + "</td>" +
                      "<td>" + user.birthdate + "</td>" +
                      "<td>" + user.added + "</td>";
      tableBody.appendChild(row);
    });
  });