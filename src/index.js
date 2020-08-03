import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import "bootstrap/dist/css/bootstrap.css";

//testing
import { Navigation } from "./Navigation";
import Weather from "./Weather";
import LandingPage from "./landing";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
//replace Location with App when done
ReactDOM.render(
  <React.StrictMode>
    <html lang="en">
      <head>
        <meta name="google-signin-client_id" content={CLIENT_ID} />
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
      </head>
    </html>
    <Navigation />
  </React.StrictMode>,
  document.getElementById("root")
);
