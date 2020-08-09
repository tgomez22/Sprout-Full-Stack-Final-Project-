import React, { useState, useEffect } from "react";
import "./App.css";
import PanelDriver from "./PanelDriver";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

const proxyUrl = "https://cors-anywhere.herokuapp.com/"; //for testing purposes only
const url = `https://trefle.io/api/v1/species?token=${apiKey}&filter[scientific_name]=`;

function App({ isGoogleLoaded }) {
  const [finalURL, setFinalUrl] = useState(null);

  useEffect(() => {
    isGoogleLoaded
      ? getFavsLogged().then((res) => {
          setFinalUrl(res);
        })
      : setFinalUrl(getFavsLocal());
  }, [isGoogleLoaded]);

  return finalURL ? (
    finalURL === proxyUrl + url ? (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <h1>You don't have any favorites yet! Consider some of these...</h1>
            <PanelDriver url={finalURL} />
          </div>
        </div>
      </div>
    ) : (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <PanelDriver url={finalURL} />
          </div>
        </div>
      </div>
    )
  ) : (
    <h1>Loading...</h1>
  );
}

function getFavsLogged() {
  const id_token = window.gapi.auth2.getAuthInstance().currentUser.get()
    .googleId;
  return fetch("/getLoggedFavs", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id_token }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res) return proxyUrl + url + res;
      return proxyUrl + url;
    })
    .catch((error) => {
      console.error("Request failed", error);
    });
}

function getFavsLocal() {
  const favs = [];
  Object.keys(localStorage).forEach(function (key) {
    if (
      key.includes("Sprout_favorited") &&
      localStorage.getItem(key) === "true"
    ) {
      favs.push(key.replace("Sprout_favorited_", ""));
    }
  });
  return proxyUrl + url + favs.toString();
}

export default App;
