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
import Nursery from "./Nursery";
import PageButtons from "./pageButtons";
import { Redirect } from "react-router-dom";
import { render } from "@testing-library/react";
import { Component } from "react";
import PlantPage from "./plantPage";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//This method is the navbar for the website. It is the only way to navigate between pages
//in Sprout.
export function Navigation() {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // handleSearch = (event) => {
  //   if (event.type === "submit") {
  //     setShouldRedirect(true);
  //   }

  //   window.localStorage.removeItem("searchField");
  //   let userSearch = document.getElementById("searchField").value;
  //   window.localStorage.setItem("userQuery", userSearch);
  // };

  function handleSearch() {
    setShouldRedirect(true);

    window.localStorage.removeItem("searchField");
    let userSearch = document.getElementById("searchField").value;
    window.localStorage.setItem("userQuery", userSearch);
  }

  return shouldRedirect ? (
    <Router>
      <Route path="/nursery" component={(App, Navigation)} />
      <Redirect to="/nursery" />
    </Router>
  ) : (
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
            <Nav.Link>
              <Link to="/nursery">Nursery</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/garden">My Garden</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about">About Us</Link>
            </Nav.Link>
          </Nav>
          <Form inline onSubmit={() => handleSearch()}>
            <label for="searchField" id="label">
              Enter in the field the plant you are looking for.
            </label>
            <Form.Control
              id="searchField"
              type="text"
              placeholder="Find a Plant"
              className="mr-sm-2"
              onKeyUp={() => handleSearch()}
            />
            <Button
              variant="outline-success"
              onClick={
                /* (this.handleSearch,
                    () =>
                      this.setState({
                        shouldRedirect: true,
                      }))
                 */
                () => {
                  setShouldRedirect(true);
                  handleSearch();
                }
              }
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/" exact component={LandingPage} />
      <Route
        path="/garden"
        component={(props) => (
          <div>
            <div className="body">
              <App {...props} isGoogleLoaded={isGoogleLoaded} />
            </div>
            <div className="footer">
              <Weather />
            </div>
          </div>
        )}
      />

      <Route path="/nursery" component={Nursery} />
      <Route path="/about" component={AboutUs} />
      <Route path="/plant/:id" component={PlantPage} />
    </Router>
  );
}
export default Navigation;
