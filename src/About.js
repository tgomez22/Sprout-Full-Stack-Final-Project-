import React from "react";
import question_mark from "./question_mark.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import { Link } from "react-router-dom";
//returns an "About Us" page to be rendered. This page contains no links or reroutes.
//Navigation is handled by the Navbar components.
function AboutUs() {
  const id = "12345";
  return (
    <div className="row d-flex align-content-center my-auto">
      <div className="col-5 d-flex">
        <img
          src={question_mark}
          className="mx-auto"
          alt="Picture of a question mark as a placeholder"
        />
        <h2>Tristan Gomez</h2>
        <div className="blurb">
          Post-Bac Graduate Student at Portland State University, pursuing a
          M.S. in Computer Science.
        </div>
      </div>
      <div className="col-5 d-flex">
        <img
          src={question_mark}
          className="mx-auto"
          alt="Picture of a question mark as a placeholder"
        />
        <h2>Haley Siebert</h2>
        <div className="blurb">
          Post-Bac Computer Science Student at Portland State Univeristy, lover
          of plants.
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
