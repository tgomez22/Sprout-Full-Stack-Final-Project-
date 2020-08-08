import React, { useState } from "react";
import logo from "./sprout.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation";
import PlantPage from "./plantPage";
import { Router, Route, Redirect, BrowserRouter, Link } from "react-router-dom";
import { render } from "@testing-library/react";
/*https://trefle.io/api/v1/plants/{id}?token=*/

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;
function Panel({ scientificName, previewImage, familyName, genusName, id }) {
  const currFav = localStorage.getItem(`Sprout_${id}_favorited`) === "true";
  const [isFavorited, setIsFavorited] = useState(currFav);
  const icon = previewImage ? previewImage : logo;
  const redirectUrl =
    "https://trefle.io/api/v1/plants/$" + id + "?" + "token=" + apiKey;
  //console.log(redirectUrl);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <header className="App-header">
        <img className="mx-auto" src={icon} alt="logo" id="plant" />
        <div className="row">
          <div className="col-3 ">
            <button
              className="btn btn-primary-success"
              onClick={() => {
                setIsFavorited(!isFavorited);
                localStorage.setItem(
                  `Sprout_${id}_favorited`,
                  String(!isFavorited)
                );
              }}
            >
              I'm {isFavorited ? "favorited" : "not favorited"}!
            </button>
          </div>
          <div className="col-9">
            <ul id="list">
              <li>Scientific name: {scientificName}</li>
              <li>Genus: {genusName}</li>
              <li>Family: {familyName}</li>
            </ul>
            <Link to={`/plant/${id}`}>See me!</Link>
          </div>
        </div>
      </header>
    </div>
  );
}
/*
render={(redirectUrl) => <PlantPage {...redirectUrl} />}
*/

export default Panel;
