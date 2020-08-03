import React, { useState } from "react";
import logo from "./sprout.png";
import "./App.css";

function Panel({ scientificName, previewImage, familyName, genusName, id }) {
  const currFav =
    localStorage.getItem(`Sprout_favorited_${scientificName}`) === "true";
  const [isFavorited, setIsFavorited] = useState(currFav);
  const icon = previewImage ? previewImage : logo;

  return (
    <div className="col-3">
      <header className="App-header">
        <img src={icon} alt="logo" />
        <div className="row">
          <div className="col-3">
            <button
              onClick={() => {
                setIsFavorited(!isFavorited);
                localStorage.setItem(
                  `Sprout_favorited_${scientificName}`,
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
