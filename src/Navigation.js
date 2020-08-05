import React from "react";
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
import GoogleLogin from "react-google-login";
import PanelDriver from "./PanelDriver";
import App from "./App";
import { Redirect } from "react-router-dom";
import { render } from "@testing-library/react";
import { Component } from "react";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
//testing method. delete upon deployment.
const responseGoogle = (response) => {
  console.log(response);
};

//This method is the navbar for the website. It is the only way to navigate between pages
//in Sprout.
export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }
  handleSearch = (event) => {
    window.localStorage.removeItem("searchField");
    let userSearch = document.getElementById("searchField").value;
    window.localStorage.setItem("userQuery", userSearch);
    if (event.key === "Enter") {
      this.setState({
        shouldRedirect: true,
      });

      return;
    }
  };

  render() {
    if (this.state.shouldRedirect === true) {
      return (
        <Router>
          <Route path="/nursery" component={(App, Navigation)} />
          <Redirect to="/nursery" />
        </Router>
      );
    } else {
      return (
        <Router>
          <Navbar expand="lg" fixed="top">
            <Navbar.Brand>
              <Link to="/garden">Sprout</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar" />
            <Navbar.Collapse id="basic-navbar">
              <Nav className="ml-auto">
                <GoogleLogin
                  id="GoogleLogin"
                  clientId={CLIENT_ID}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
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
              <Form inline>
                <label for="searchField" id="label">
                  Enter in the field the plant you are looking for.
                </label>
                <Form.Control
                  id="searchField"
                  type="text"
                  placeholder="Find a Plant"
                  className="mr-sm-2"
                  onKeyUp={this.handleSearch}
                />
                <Button
                  variant="outline-success"
                  onClick={
                    (this.handleSearch,
                    () =>
                      this.setState({
                        shouldRedirect: true,
                      }))
                  }
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Route path="/" exact component={LandingPage} />
          <Route path="/garden" component={Weather} />
          <Route path="/about" component={AboutUs} />
          <Route path="/nursery" component={App} />
        </Router>
      );
    }
  }
}
