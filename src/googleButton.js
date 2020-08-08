import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
//testing method. delete upon deployment.
const responseGoogle = (response) => {
  console.log(response);
};

function GoogleButton({ isGoogleLoaded, setIsGoogleLoaded }) {
  function init() {
    setIsGoogleLoaded(true);
    const id_token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    fetch("/verify", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id_token }),
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        debugger;
        console.log("Signed in as:" + res);
        dbLogin(res);
        return res;
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  function logout() {
    setIsGoogleLoaded(false);
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  }

  return isGoogleLoaded ? (
    <GoogleLogout
      clientId={CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={logout}
    />
  ) : (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login"
      onSuccess={init}
      isSignedIn={true}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

function dbLogin(id_token) {
  fetch("/login", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id_token }),
  }).catch((error) => {
    console.log("Request failed", error);
  });
}

export default GoogleButton;
