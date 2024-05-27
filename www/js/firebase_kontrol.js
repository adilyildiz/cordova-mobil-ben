var ui;
var CLIENT_ID = "222896488227-o7i0kmtf9sp8vlafcmv72943r5mc81to.apps.googleusercontent.com";
var config = {
  apiKey: "AIzaSyAS95wBeBzLLexbFLaTCWo5eYF-l6dCU90",
  authDomain: "cordova-7163c.firebaseapp.com",
  projectId: "cordova-7163c",
  /*databaseURL: "https://your-app.firebaseio.com",
  storageBucket: "your-app.appspot.com",*/
};
var firebaseX;
$(function(){


});

$(document).on("deviceready",function(){
  console.log("firebase_kontrol.js");
/*
  if (cordova.platformId == "browser") {
    firebase.initializeApp(config);
    firebaseX=firebase.auth();
  }else{
    firebaseX=cordova.plugins.firebase.auth;
  }
  */
  firebase.initializeApp(config);
  firebaseX=firebase.auth();

  ui = new firebaseui.auth.AuthUI(firebaseX);
  // Disable auto-sign in.
  ui.disableAutoSignIn();



  var handleSignedInUser = function (user) {
    $(".menu_user-signed-in").hide();
    $(".menu_user-signed-out").show();
    $("#menu_name").html(user.displayName);
    $("#menu_email").html(user.email);
    $("#menu_phone").html(user.phoneNumber);
    if (user.photoURL) {
      var photoURL = user.photoURL;
      // Append size to the photo URL for Google hosted images to avoid requesting
      // the image with its original resolution (using more bandwidth than needed)
      // when it is going to be presented in smaller size.
      if (
        photoURL.indexOf("googleusercontent.com") != -1 ||
        photoURL.indexOf("ggpht.com") != -1
      ) {
        //photoURL =
          //photoURL + "?sz=" + document.getElementById("photo").clientHeight;
      }
      
      $("#menu_photo").attr("src",photoURL);
    } 
  };
  
  /**
   * Displays the UI for a signed out user.
   */
  var handleSignedOutUser = function () {
    $(".menu_user-signed-in").show();
    $(".menu_user-signed-out").hide();
    
    $("#menu_name").html("Giriş Yap");
    $("#menu_photo").attr("src","img/logo.jpeg");
    //ui.start("#firebaseui-container", getUiConfig());
  };
  
  // Listen to change in auth state so it displays the correct UI for when
  // the user is signed in or not.
  firebaseX.onAuthStateChanged(function (user) {
    //document.getElementById("loading").style.display = "none";
    //document.getElementById("loaded").style.display = "block";
    user ? handleSignedInUser(user) : handleSignedOutUser();
  });
  
  document.getElementById("sign-out").addEventListener("click", function () {
    firebaseX.signOut();
  });

  });
  