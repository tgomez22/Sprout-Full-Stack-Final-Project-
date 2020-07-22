import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Panel from "./Panel";

function Row() {
  return (
    <div className="row">
      <Panel name="Haley" />
      {/* <Panel name="Tristan" /> */}
      {/* <Panel name="Fred" /> */}
      {/* <Panel name="Daphne" /> */}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <Row />
        {/* <Row /> */}
        {/* <Row /> */}
      </div>
    </div>
  );
}

export default App;
