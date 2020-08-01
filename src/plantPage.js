import React, { useState, useEffect } from "react";
import "./App.css";
import "./plantPage.css";

function PlantPage({ url }) {
  const [values, setValues] = useState(null);

  useEffect(() => {
    fetch(url, { headers: { Origin: "localhost" } })
      .then((response) => response.json())
      .then(({ data }) => {
        setValues(data.main_species);
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }, [url]);

  return values ? (
    <div className="plantPage">
      <div className="row">
        <div className="col-12">
          <div className="container">
            <div className="col-6">
              <ul>
                <li>
                  <a href="#growth">Growth</a>
                </li>
                <li>
                  <a href="#distribution">Distribution</a>
                </li>
                <li>
                  <a href="#commonName">Common Names</a>
                </li>
                <li>
                  <a href="#specifications">Specifications</a>
                </li>
                <li>
                  <a href="#flower">Flower Info</a>
                </li>
                <li>
                  <a href="#foliage">Foliage</a>
                </li>
                <li>
                  <a href="#fruitOrSeed">Fruit or Seed Info</a>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <img src={values.image_url}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
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
        <div className="col-4"></div>
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
