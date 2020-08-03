import React from "react";
import "./App.css";
import PanelDriver from "./PanelDriver";
import PlantPage from "./plantPage";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

const proxyUrl = "http://cors-anywhere.herokuapp.com/"; //for testing purposes only
const url = `https://trefle.io/api/v1/species/search?q=basil&limit=8&token=${apiKey}`;
//const url = `https://trefle.io/api/v1/plants/111119?q=basil&limit=8&token=${apiKey}`;

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          {<PanelDriver url={proxyUrl + url} />}
          {/* <PlantPage url={proxyUrl + url} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
