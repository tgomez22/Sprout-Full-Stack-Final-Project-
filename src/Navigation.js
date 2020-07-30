import React from "react"
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./landing.css";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LandingPage from "./landing";
import Weather from './Weather';
import AboutUs from "./About";

export function Navigation(){
    return (
    <Router>
<Navbar expand="lg" fixed="top">
    <Navbar.Brand><Link to='/garden'>Sprout</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar" />
    <Navbar.Collapse id = "basic-navbar">
        <Nav className="ml-auto">
            <Nav.Link>Nursery</Nav.Link>
            <Nav.Link><Link to="/garden">My Garden</Link></Nav.Link>
            <Nav.Link><Link to="/about">About Us</Link></Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Find a Plant" 
          className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
        </Form>
    </Navbar.Collapse>
</Navbar>
<Route path='/' exact component={LandingPage} />
<Route path='/garden' component={Weather} />
<Route path='/about' component={AboutUs} />
</Router>
    );
}


