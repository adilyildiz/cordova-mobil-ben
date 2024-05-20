var config = {
    apiKey: "AIzaSyAS95wBeBzLLexbFLaTCWo5eYF-l6dCU90",
    authDomain: "cordova-7163c.firebaseapp.com",
    /*databaseURL: "https://your-app.firebaseio.com",
    storageBucket: "your-app.appspot.com",*/
  };
  firebase.initializeApp(config);
  
  // Google OAuth Client ID, needed to support One-tap sign-up.
  // Set to null if One-tap sign-up is not supported.
  var CLIENT_ID = "222896488227-o7i0kmtf9sp8vlafcmv72943r5mc81to.apps.googleusercontent.com";
  
  
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // Disable auto-sign in.
  ui.disableAutoSignIn();
  

  var handleSignedInUser = function (user) {
    document.getElementById("user-signed-in").style.display = "block";
    document.getElementById("user-signed-out").style.display = "none";
    document.getElementById("name").textContent = user.displayName;
    document.getElementById("email").textContent = user.email;
    document.getElementById("phone").textContent = user.phoneNumber;
    if (user.photoURL) {
      var photoURL = user.photoURL;
      // Append size to the photo URL for Google hosted images to avoid requesting
      // the image with its original resolution (using more bandwidth than needed)
      // when it is going to be presented in smaller size.
      if (
        photoURL.indexOf("googleusercontent.com") != -1 ||
        photoURL.indexOf("ggpht.com") != -1
      ) {
        photoURL =
          photoURL + "?sz=" + document.getElementById("photo").clientHeight;
      }
      document.getElementById("photo").src = photoURL;
      document.getElementById("photo").style.display = "block";
    } else {
      document.getElementById("photo").style.display = "none";
    }
  };
  
  /**
   * Displays the UI for a signed out user.
   */
  var handleSignedOutUser = function () {
    document.getElementById("user-signed-in").style.display = "none";
    document.getElementById("user-signed-out").style.display = "block";
    //ui.start("#firebaseui-container", getUiConfig());
  };
  
  // Listen to change in auth state so it displays the correct UI for when
  // the user is signed in or not.
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("loaded").style.display = "block";
    user ? handleSignedInUser(user) : handleSignedOutUser();
  });
  
  document.getElementById("sign-out").addEventListener("click", function () {
    firebase.auth().signOut();
  });
  