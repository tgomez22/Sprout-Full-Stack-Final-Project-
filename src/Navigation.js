import React from "react"
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./landing.css";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';



function Navigation(){
    return (
<Navbar expand="lg" fixed="top">
    <Navbar.Brand href="#">Sprout</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar" />
    <Navbar.Collapse id = "basic-navbar">
        <Nav className="ml-auto">
            <Nav.Link href="#">Nursery</Nav.Link>
            <Nav.Link href="#">My Garden</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Find a Plant" 
          className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
        </Form>
    </Navbar.Collapse>
</Navbar>
    );
}


export default Navigation;