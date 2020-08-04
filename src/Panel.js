import React, { useState } from "react";
import logo from "./sprout.png";
import "./App.css";
import getTokenId from "./Navigation";

function Panel({ scientificName, previewImage, familyName, genusName, id }) {
  const currFav =
    localStorage.getItem(`Sprout_favorited_${scientificName}`) === "true";
  const [isFavorited, setIsFavorited] = useState(currFav);
  const icon = previewImage ? previewImage : logo;

  function handleFavs() {
    const googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
    console.log(googleUser.isSignedIn());
    if (googleUser.isSignedIn()) {
      const token_id = getTokenId();
      if (isFavorited) {
        setIsFavorited(!isFavorited);
        loggedUnfav(token_id, scientificName);
      } else {
        setIsFavorited(!isFavorited);
        loggedFav(id_token, scientificName);
      }
    } else {
      setIsFavorited(!isFavorited);
      localStorage.setItem(
        `Sprout_favorited_${scientificName}`,
        String(!isFavorited)
      );
    }
  }

  function loggedFav(token_id, scientificName) {
    return fetch("http://localhost:3000/fav", {
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

  function loggedUnfav(token_id, scientificName) {
    return fetch("http://localhost:3000/unfav", {
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

  return (
    <div className="col-3">
      <header className="App-header">
        <img src={icon} alt="logo" />
        <div className="row">
          <div className="col-3">
            <button
              onClick={
                handleFavs()
                //   () => {
                //   setIsFavorited(!isFavorited);
                //   localStorage.setItem(
                //     `Sprout_favorited_${scientificName}`,
                //     String(!isFavorited)
                //   );
                // }
              }
            >
              I'm {isFavorited ? "favorited" : "not favorited"}!
            </button>
          </div>
          <div className="col-9">
            <ul>
              <li>Scientific name: {scientificName}</li>
              <li>Genus: {genusName}</li>
              <li>Family: {familyName}</li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Panel;
