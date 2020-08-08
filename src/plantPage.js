import React, { useState, useEffect } from "react";

import "./plantPage.css";
import { useParams } from "react-router-dom";
const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

function PlantPage() {
  const [values, setValues] = useState(null);
  const data = useParams();
  const proxyUrl = "http://cors-anywhere.herokuapp.com/";
  const plantId = data.id.toString();
  const url =
    proxyUrl + `https://trefle.io/api/v1/species/${plantId}?&token=${apiKey}`;

  useEffect(() => {
    fetch(url, { headers: { Origin: "localhost" } })
      .then((response) => response.json())
      .then(({ data }) => {
        setValues(data);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  }, [url]);

  return values ? (
    <div className="plantPage">
      <div className="row">
        <div className="col-12">
          <div className="container" id="dash">
            <div className="col-6">
              <ul>
                <li id="links">
                  <a href="#growth">Growth</a>
                </li>
                <li id="links">
                  <a href="#distribution">Distribution</a>
                </li>
                <li id="links">
                  <a href="#commonName">Common Names</a>
                </li>
                <li id="links">
                  <a href="#specifications">Specifications</a>
                </li>
                <li id="links">
                  <a href="#flower">Flower Info</a>
                </li>
                <li id="links">
                  <a href="#foliage">Foliage</a>
                </li>
                <li id="links">
                  <a href="#fruitOrSeed">Fruit or Seed Info</a>
                </li>
              </ul>
              <div id="links">Click the above links to see more info!</div>
            </div>
            <div className="col-6">
              <img src={values.image_url} alt={values.common_name}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="container">
            <div className="col-6" id="info">
              <ul>
                <li id="growth">
                  Growth
                  <ul>{mapList(values.growth)}</ul>
                </li>
                <br></br>
                <br></br>
                <li id="distribution">
                  Distribution
                  <ul>
                    {values.distribution.native.map((key) => {
                      return <li>{key}</li>;
                    })}
                  </ul>
                </li>
                <li id="commonName">
                  Common names
                  <ul>
                    <li>{values.common_name}</li>
                  </ul>
                </li>
                <li id="specifications">
                  Specifications
                  <ul>{mapList(values.specifications)}</ul>
                </li>
                <li id="flower">
                  Flower Info
                  <ul>{mapList(values.flower)}</ul>
                </li>
                <li id="foliage">
                  Foliage
                  <ul>{mapList(values.foliage)}</ul>
                </li>
                <li id="fruitOrSeed">
                  Fruit/Seed Info
                  <ul>{mapList(values.fruit_or_seed)}</ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

function mapList(field, key) {
  return (
    <ul>
      {key ? key : null}
      {Object.keys(field).map((key) => {
        return typeof field[key] === "object" && field[key] !== null
          ? mapList(field[key], key)
          : isNullField(key, field[key]);
      })}
    </ul>
  );
}

function isNullField(key, nonObj) {
  return (
    <li>
      {key}: {nonObj ? nonObj : "null"}
    </li>
  );
}
export default PlantPage;
