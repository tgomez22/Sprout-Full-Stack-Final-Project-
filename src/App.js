import React from "react";
import logo from "./logo.svg";
import "./App.css";

function Panel(props) {
  return (
    <div className="col-3">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and stuff.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          I'm a placeholder, {props.name}!;
        </a>
      </header>
    </div>
  );
}

function Row() {
  return (
    <div className="row">
      <Panel name="Haley" />
      <Panel name="Tristan" />
      <Panel name="Fred" />
      <Panel name="Daphne" />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}

export default App;
