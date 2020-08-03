import React, { useState } from "react";
import logo from "./sprout.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function Panel({ scientificName, previewImage, familyName, genusName, id }) {
  const currFav = localStorage.getItem(`Sprout_${id}_favorited`) === "true";
  const [isFavorited, setIsFavorited] = useState(currFav);
  const icon = previewImage ? previewImage : logo;

  return (
    <div className="col-lg-3 col-md-4 col-sm-12">
      <header className="App-header">
        <img className="mx-auto" src={icon} alt="logo" />
        <div className="row">
          <div className="col-3 ">
            <button
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
