import React from "react";
import { Component } from "react";
import { Redirect } from "react-router-dom";
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const proxyUrl = "http://cors-anywhere.herokuapp.com/";
//use if supplied lat/long
export let getZip = async (latitude, longitude) => {
  fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      latitude.toString() +
      "," +
      longitude.toString() +
      "&key=" +
      GOOGLE_KEY
  )
    .then((response) => response.json())
    .then(
      (jsonResponse) => {
        let data = jsonResponse;
        let location = [""];
        location.concat(data.results[0].address_components[7].long_name);
        location.concat(latitude);
        location.concat(longitude);
        return location;
      },
      (error) => console.log(error)
    );
};

//use if user supplied zip
export let getLatLong = async (userZip) => {
  if (userZip === undefined) {
    return null;
  }
  return fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      userZip +
      "components=postal_code:" +
      userZip +
      "&key=" +
      GOOGLE_KEY,
    { mode: "cors" }
  )
    .then((response) => response.json())
    .then(
      (jsonResponse) => {
        console.log(jsonResponse);
        let data = jsonResponse;

        if (jsonResponse === undefined) {
          window.alert("Error when retrieving location data");
          return <Redirect to="/" />;
        }

        let location = [];
        location.push(userZip);
        location.push(data.results[0].geometry.location.lat);
        location.push(data.results[0].geometry.location.lng);
        return location;
      },
      (error) => {
        console.log("This!");
        console.log(error);
      }
    );
};

export let useCoordinates = async (position) => {
  return getZip(position.coords.latitude, position.coords.longitude);
};

export let useMyZip = async (userZip) => {
  let location = await getLatLong(userZip);
  return location;
};

export let error = () => {
  console.log("Failed to get coordinates");
};
