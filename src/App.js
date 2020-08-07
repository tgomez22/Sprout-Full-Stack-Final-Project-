import React, { useState, useEffect } from "react";
import "./App.css";
import PanelDriver from "./PanelDriver";
import PageButtons from "./pageButtons";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

const proxyUrl = "http://cors-anywhere.herokuapp.com/"; //for testing purposes only
// const url = `https://trefle.io/api/v1/species/search?q=basil&limit=8&token=${apiKey}`;
// const url = `https://trefle.io/api/v1/plants/111119?q=basil&limit=8&token=${apiKey}`;
const url = `https://trefle.io/api/v1/species?token=${apiKey}&limit=8&filter[scientific_name]=`;

function App({ isGoogleLoaded }) {
  const [finalURL, setFinalUrl] = useState(null);

  useEffect(() => {
    isGoogleLoaded
      ? getFavsLogged().then((res) => {
          setFinalUrl(res);
        })
      : setFinalUrl(getFavsLocal());
  }, [isGoogleLoaded]);

  console.log("Final url: " + finalURL);
  return finalURL ? (
    finalURL === proxyUrl + url ? (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <h1>You don't have any favorites yet! Consider some of these...</h1>
            {/* <PanelDriver url={finalURL} /> */}
            {/* <PanelDriver url={proxyUrl + url} /> */}
            {/* <PlantPage url={proxyUrl + url} /> */}
          </div>
        </div>
      </div>
    ) : (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <PageButtons setFinalUrl={setFinalUrl} />
            {/* <PanelDriver url={finalURL} /> */}
            {/* <PanelDriver url={proxyUrl + url} /> */}
            {/* <PlantPage url={proxyUrl + url} /> */}
          </div>
        </div>
      </div>
    )
  ) : (
    <h1>Loading...</h1>
    // <pageButtons />
  );
}

function getFavsLogged() {
  const id_token = window.gapi.auth2.getAuthInstance().currentUser.get()
    .googleId;
  console.log("getting id token", id_token);
  return fetch("http://localhost:3000/getLoggedFavs", {
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
