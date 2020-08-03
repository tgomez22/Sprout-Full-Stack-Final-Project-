import React, { useState, useEffect } from "react";
import "./App.css";
import PanelDriver from "./PanelDriver";
import PlantPage from "./plantPage";
import getIdToken from "./Navigation";
import GoogleLogin from "react-google-login";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

const proxyUrl = "http://cors-anywhere.herokuapp.com/"; //for testing purposes only
// const url = `https://trefle.io/api/v1/species/search?q=basil&limit=8&token=${apiKey}`;
// const url = `https://trefle.io/api/v1/plants/111119?q=basil&limit=8&token=${apiKey}`;
const url = `https://trefle.io/api/v1/species?token=${apiKey}&filter[scientific_name]=`;

function App() {
  const [finalURL, setFinalUrl] = useState([]);

  useEffect(() => {
    //if logged in
    // const id_token = getIdToken();
    // debugger;
    // console.log("Is signed in: " + window.gapi.auth2.isSignedIn.get());
    // const googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
    // googleUser.isSignedIn() ?
    // getFavsLogged().then((res) => {
    //   setFinalUrl(res);
    // }) :
    //if logged out
    setFinalUrl(getFavsLocal());
  }, []);

  console.log("Final url: " + finalURL);
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <PanelDriver url={finalURL} />
          {/* <PlantPage url={proxyUrl + url} /> */}
        </div>
      </div>
    </div>
  );
}

function getFavsLogged() {
  //if logged in
  // const id_token = getIdToken();
  return fetch("http://localhost:3000/getLoggedFavs", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    // body: JSON.stringify({ id_token }),
  })
    .then((res) => {
      debugger;
      return res.json();
    })
    .then((res) => {
      debugger;
      console.log("Response: " + res);
      // const ids = res.toString();
      // console.log("Ids: " + ids);
      console.log("URL: " + proxyUrl + url + res);
      return proxyUrl + url + res;
    })
    .catch((error) => {
      console.log("Request failed", error);
    });
}

function getFavsLocal() {
  const favs = [];
  Object.keys(localStorage).forEach(function (key) {
    if (key.includes("Sprout_favorited")) {
      favs.push(value);
    }
  });
  return proxyUrl + url + favs.toString();
}

export default App;
