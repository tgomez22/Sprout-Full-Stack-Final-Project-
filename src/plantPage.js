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
      <div className="row" height="33vh" border="5px solid black">
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
          <img src={values.image_url} height="33%"></img>
        </div>
      </div>
      <div className="row" height="66vh">
        <div className="col-12">
          <ul>
            <li id="growth">
              Growth
              <ul>
                {mapList(values.growth)}
                {/* {Object.keys(values.growth).map((key) => {
                  debugger;
                  return (
                    <li>
                      {key}:
                      {typeof values.growth[key] === "object"
                      }  ? Object.keys(values.growth[key]).map((innerKey) => {
                            return (
                              <ul>
                                <li>
                                  {innerKey}: {values.growth[key][innerKey]}
                                </li>
                              </ul>
                            );
                          })
                        : Boolean(values.growth[key])
                        ? values.growth[key]
                        : "null"
                      {typeof values.growth[key]};
                    </li>
                  );
                })} */}
              </ul>
            </li>
            {/* <li id="distribution">Distribution</li>
            <li id="commonName">Common names</li>
            <li id="specifications">Specifications</li>
            <li id="flower">Flower Info</li>
            <li id="foliage">Foliage</li>
            <li id="fruitOrSeed ">Fruit/Seed Info</li> */}
          </ul>
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
