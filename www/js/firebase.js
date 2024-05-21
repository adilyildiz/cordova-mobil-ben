
$(document).on("deviceready",function(){ 
  console.log("firebase.js");


  function getUiConfig() {
    return {
      callbacks: {
        'signInSuccessUrl': '/',
        'callbacks': {
          'signInSuccess': function(user, credential, redirectUrl) {
            
            if (authResult.user) {
              handleSignedInUser(authResult.user);
            }
            if (authResult.additionalUserInfo) {
              document.getElementById("is-new-user").textContent = authResult
                .additionalUserInfo.isNewUser
                ? "New User"
                : "Existing User";
            }
            
            if (window.opener) {
              // The widget has been opened in a popup, so close the window
              // and return false to not redirect the opener.
              window.close();
              return false;
            } else {              
              // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
              return true;
            }
          }
        },
        // Called when the user has been successfully signed in.
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          if (authResult.user) {
            handleSignedInUser(authResult.user);
          }
          if (authResult.additionalUserInfo) {
            document.getElementById("is-new-user").textContent = authResult
              .additionalUserInfo.isNewUser
              ? "New User"
              : "Existing User";
          }
          // Do not redirect.
          return false;
        },
      },
      // Opens IDP Providers sign-in flow in a popup,redirect.
      signInFlow: "redirect",
      signInOptions: [
        // TODO(developer): Remove the providers you don't need for your app.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // Required to enable ID token credentials for this provider.
          clientId: CLIENT_ID,
        },
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes: ["public_profile", "email", "user_likes", "user_friends"],
        },
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // Whether the display name should be displayed in Sign Up page.
          requireDisplayName: true,
          signInMethod: "password",
          disableSignUp: {
            status: "false",
          },
        },
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: "normal",
          },
        },
        {
          provider: "microsoft.com",
          loginHintKey: "login_hint",
        },
        {
          provider: "apple.com",
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: "https://www.google.com",
      // Privacy policy url.
      privacyPolicyUrl: "https://www.google.com",
      credentialHelper:
        CLIENT_ID && CLIENT_ID != "YOUR_OAUTH_CLIENT_ID"
          ? firebaseui.auth.CredentialHelper.GOOGLE_YOLO
          : firebaseui.auth.CredentialHelper.NONE,
      adminRestrictedOperation: {
        status: false,
      },
    };
  }


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

  var handleSignedOutUser = function () {
    document.getElementById("user-signed-in").style.display = "none";
    document.getElementById("user-signed-out").style.display = "block";
    ui.start("#firebaseui-container", getUiConfig());
  };

  firebaseX.onAuthStateChanged(function (user) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("loaded").style.display = "block";
    user ? handleSignedInUser(user) : handleSignedOutUser();
  });

  /**
   * Deletes the user's account.
   */
  var deleteAccount = function () {
    firebaseX.currentUser.delete()
      .catch(function (error) {
        if (error.code == "auth/requires-recent-login") {
          // The user's credential is too old. She needs to sign in again.
          firebaseX
            .signOut()
            .then(function () {
              // The timeout allows the message to be displayed after the UI has
              // changed to the signed out state.
              setTimeout(function () {
                alert("Please sign in again to delete your account.");
              }, 1);
            });
        }
      });
  };

  document.getElementById("delete-account").addEventListener("click", function () {
      deleteAccount();
    });
});