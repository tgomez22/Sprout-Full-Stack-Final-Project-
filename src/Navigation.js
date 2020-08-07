import React, { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navigation.css";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from "./landing";
import Weather from "./Weather";
import AboutUs from "./About";
import App from "./App";
import GoogleButton from "./googleButton";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//This method is the navbar for the website. It is the only way to navigate between pages
//in Sprout.
export function Navigation() {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // function init() {
  //   setIsGoogleLoaded(true);
  //   const id_token = window.gapi.auth2
  //     .getAuthInstance()
  //     .currentUser.get()
  //     .getAuthResponse().id_token;
  //   fetch("http://localhost:3000/verify", {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({ id_token }),
  //   })
  //     .then((res) => {
  //       return res.text();
  //     })
  //     .then((res) => {
  //       debugger;
  //       console.log("Signed in as:" + res);
  //       dbLogin(res);
  //       return res;
  //     })
  //     .catch((error) => {
  //       console.log("Request failed", error);
  //     });
  // }

  return (
    <Router>
      <Navbar expand="lg" fixed="top">
        <Navbar.Brand>
          <Link to="/garden">Sprout</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar" />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="ml-auto">
            <GoogleButton
              isGoogleLoaded={isGoogleLoaded}
              setIsGoogleLoaded={setIsGoogleLoaded}
            />
            <Nav.Link>Nursery</Nav.Link>
            <Nav.Link>
              <Link to="/garden">My Garden</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about">About Us</Link>
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Find a Plant"
              className="mr-sm-2"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/" exact component={LandingPage} />
      {/* <Route path="/garden" component={Weather} /> */}
      <Route
        path="/garden"
        component={(props) => (
          <App {...props} isGoogleLoaded={isGoogleLoaded} />
        )}
      />
      <Route path="/about" component={AboutUs} />
    </Router>
  );
}

// function dbLogin(id_token) {
//   fetch("http://localhost:3000/login", {
//     headers: {
//       "Content-type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify({ id_token }),
//   }).catch((error) => {
//     console.log("Request failed", error);
//   });
// }
