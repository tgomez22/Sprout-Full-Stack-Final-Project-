import React from "react";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCoordinates, useMyZip } from "./Location";
import { render } from "@testing-library/react";
import { Redirect } from "react-router-dom";
import Weather from "./Weather";
import "./landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import sprout from "./sprout.png";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Landing page component. First time users will be routed to this page first when using Sprout.
export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    //This component will keep track of location data of the user, which assists in determining
    //if the user entered location data correctly and ensures the api call was made successfully
    //to get the user's position.
    this.state = {
      zip: undefined,
      latitude: undefined,
      longitude: undefined,
      isLoaded: false,
    };
  }

  //This method is called when the user clicks the "use my location" button on the landing
  //page. It is an async method that uses HTML5's navigator object to find a user's location.
  //If the location sucessfully is found, the location data will be loaded into the component's
  //state as well as local storage. If successful, the user will be rerouted to the "/garden" page.
  handleUseMyLocation = async () => {
    if (window.navigator && window.navigator.geolocation) {
      let location = await navigator.geolocation.getCurrentPosition(
        useCoordinates
      );
      if (location === undefined) {
        window.alert("Could not geolocate. Please enter your zip code.");
      } else {
        this.setState({
          latitude: location[1].toString(),
          longitude: location[2].toString(),
          zip: location[0].toString(),
          isLoaded: true,
        });
        localStorage.setItem("zip", location[0].toString());
        localStorage.setItem("latitude", location[1].toString());
        localStorage.setItem("longitude", location[2].toString());
        return;
      }
    } else {
      window.alert("Geolocation is not supported. Please enter your zip code.");
    }
  };

  /*This method is called when the user enters their zip code and submits it.
    If the user entered an erroneous zip code, a window alert will notify them.
    If the user enters a valid zip code, the location data will be fetched using the
    "useMyZip" method. If the location data is successfully retrieved, then it will be loaded
    into the component's state and local storage.*/
  handleUserZip = async () => {
    let value = document.getElementById("input").value.toString();
    console.log(value);
    if (value.length !== 5) {
      return console.log("Please enter a valid zip code.");
    }
    if (value.length === 5) {
      let test = value.toString();
      let result = test.match(/(\d{5})/);
      if (result === undefined) {
        window.alert("Please enter a valid zip code");
        return;
      } else {
        let location = await useMyZip(value);
        if (location === undefined) {
          return;
        } else {
          this.setState({
            latitude: location[1].toString(),
            longitude: location[2].toString(),
            zip: location[0].toString(),
            isLoaded: true,
          });
          localStorage.clear();
          localStorage.setItem("zip", location[0].toString());
          localStorage.setItem("latitude", location[1].toString());
          localStorage.setItem("longitude", location[2].toString());
        }
      }
    }
  };

  //Renders the landing page. If the user's location data is already saved/loaded(i.e. they are NOT
  //a first time user), then the user will be redirected to their personal "home page" the "/garden".
  render() {
    if (this.state.isLoaded === true) {
      return <Redirect to="/garden" />;
    } else {
      return (
        <Container className="my-auto col-12">
          <Container className="align-self-center d-flex justify-content-center col-lg-4 col-md-6 col-sm-10 d-flex flex-column">
            <Row>
              <h1 className="justify-text-center">Welcome to Sprout!</h1>
            </Row>
            <Image
              src={sprout}
              alt="Plant Sprouting"
              rounded
              id="pic"
              className="mx-auto"
            />
            <Row className="justify-content-center">
              <Col>
                <Button
                  className="btn btn-primary btn-block"
                  onClick={this.handleUseMyLocation}
                >
                  Use my location
                </Button>
              </Col>
            </Row>
            <Form>
              <Form.Row>
                <Col className="col-8">
                  <Form.Control
                    type="text"
                    placeholder="Enter a zipcode"
                    aria-label="Enter a zipcode"
                    name="userZip"
                    id="input"
                  />
                </Col>
                <Col className="col-4">
                  <Button
                    className="btn-outline-success"
                    type="submit"
                    id="zip"
                    onClick={this.handleUserZip}
                  >
                    Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Container>
        </Container>
      );
    }
  }
}
