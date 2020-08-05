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
const url = `https://trefle.io/api/v1/species?token=${apiKey}&limit=8&filter[scientific_name]=`;

function App() {
  const [finalURL, setFinalUrl] = useState([]);

  useEffect(() => {
    // const id_token = getIdToken();
    const googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
    console.log(googleUser.isSignedIn());
    googleUser.isSignedIn()
      ? getFavsLogged().then((res) => {
          setFinalUrl(res);
        })
      : setFinalUrl(getFavsLocal());
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
  const id_token = getIdToken();
  return fetch("http://localhost:3000/getLoggedFavs", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id_token }),
  })
    .then((res) => {
      debugger;
      return res.json();
    })
    .then((res) => {
      debugger;
      // console.log("Response: " + res);
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
