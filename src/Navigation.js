import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./landing.css";
//import 'bootstrap/js'

//import 'jquery/dist/jquery';
//import 'bootstrap/dist/js/bootstrap';

//import "https://code.jquery.com/jquery-3.3.1.slim.min.js" 
//import "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" 
//import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" 

function Navigation(){
    return(
<nav class="navbar navbar-expand-md navbar-light fixed-top">
    <a class="navbar-brand" href="./landing.html">Sprout</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
         data-target="#navbarText" aria-controls="navbarText"
         aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
    </button>    
    <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Nursery</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="#">My Garden</a>
            </li>
            <li>
                <form class="form-inline my-2 my-lg-0 ml-auto">
                    <input class="form-control mr-sm-2" type="search" placeholder="Find a plant"
                    aria-label="Find a plant" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </li>
        </ul>
    </div>
</nav>
);
}



export default Navigation;