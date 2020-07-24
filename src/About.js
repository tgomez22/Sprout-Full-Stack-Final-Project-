import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css'

function AboutUs(){
    return(
        <div className = "row d-flex align-content-center">
            <div className = "col-5 d-flex">
                <img src="./question_mark.jpg" className="mx-auto"></img>
                <h2>Tristan Gomez</h2>
                <div className="blurb">
                    Post-Bac Graduate Student at Portland State University,
                    pursuing a M.S. in Computer Science. 
                </div>
            </div>
            <div className = "col-5 d-flex">
                <img src="./question_mark.jpg" className="mx-auto"></img>
                <h2>Haley Siebert</h2>
                <div className="blurb">
                   This is placeholder text because something about a few hundred,
                   question marks in a row made this page break!
                </div>
            </div>
        </div>

    );
}

export default AboutUs;