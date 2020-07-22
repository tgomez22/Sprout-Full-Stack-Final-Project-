import React, { useState, useEffect } from "react";
import "./App.css";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

const proxyUrl = "http://cors-anywhere.herokuapp.com/"; //for testing pruposes only
const url = `https://trefle.io/api/v1/plants/103485?token=${apiKey}`;

function Panel() {
  const [waterNeeds, setWaterNeeds] = useState("-1");
  const [lightNeeds, setLightNeeds] = useState("-1");
  const [commonName, setCommonName] = useState("No common name");
  const [previewImage, setImage] = useState("null");
  const [isFavorited, setIsFavorited] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch(proxyUrl + url)
      .then((response) => response.json())
      .then(({ data }) => {
        setImage(data.main_species.image_url);
        setLightNeeds(data.main_species.growth.light);
        setWaterNeeds(data.main_species.growth.minimum_percipitation);
        setCommonName(data.main_species.common_name);
        setIsFavorited(
          localStorage.getItem(`Sprout_${data.id}_favorited`) === "true"
        );
        setId(data.id);
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }, []);

  return (
    <div className="col-3">
      <header className="App-header">
        <img
          src={previewImage}
          width="25%"
          height="33%"
          className="App-logo"
          alt="logo"
        />
        <div className="col-3 text-left">
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
            <li>Common name: {commonName}</li>
            <li>Water needs: {waterNeeds}</li>
            <li>Light needs: {lightNeeds}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
export default Panel;
