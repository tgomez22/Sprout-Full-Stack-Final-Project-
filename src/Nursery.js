import React, { useState, useEffect } from "react";
import "./App.css";
import PanelDriver from "./PanelDriver";
import PageButtons from "./pageButtons";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

const proxyUrl = "http://cors-anywhere.herokuapp.com/"; //for testing purposes only
const url = `https://trefle.io/api/v1/species/search?q=basil&limit=8&token=${apiKey}&page=`;
// const url = `https://trefle.io/api/v1/plants/111119?q=basil&limit=8&token=${apiKey}`;
// const url = `https://trefle.io/api/v1/species?token=${apiKey}&limit=8&filter[scientific_name]=`;

function Nursery() {
  const [finalURL, setFinalUrl] = useState(null);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => setFinalUrl(proxyUrl + url + currPage));

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
            <PanelDriver url={finalURL} />
            {/* <PanelDriver url={proxyUrl + url} /> */}
            {/* <PlantPage url={proxyUrl + url} /> */}
            <PageButtons currPage={currPage} setCurrPage={setCurrPage} />
          </div>
        </div>
      </div>
    )
  ) : (
    <h1>Loading...</h1>
    // <pageButtons />
  );
}

export default Nursery;
