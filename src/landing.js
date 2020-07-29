import React from 'react';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useCoordinates, useMyZip} from './Location';
import { render } from '@testing-library/react';
import {Redirect} from 'react-router-dom';
import Weather from './Weather';
import './landing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sprout from "./sprout.png";
//import sprout from 'src/sprout.png';
import {FormControl, Button} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';




export default class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zip: undefined,
            latitude: undefined,
            longitude: undefined,
            isLoaded: false
        }
    }

    handleUseMyLocation = async () => {
    if (window.navigator && window.navigator.geolocation) {
        let location = await navigator.geolocation.getCurrentPosition(useCoordinates);
        if(location === undefined){
            window.alert("Could not geolocate. Please enter your zip code.");
            return <Redirect to='/garden' />;
        } else {
            this.setState({
                latitude: location[1].toString(),
                longitude: location[2].toString(),
                zip: location[0].toString(),
                isLoaded: true
            })
            localStorage.setItem("zip", location[0].toString());
            localStorage.setItem("latitude", location[1].toString());
            localStorage.setItem("longitude", location[2].toString());
            return <Redirect to='/garden' />;
        }
        
    } else {
        window.alert("Geolocation is not supported. Please enter your zip code.")
    }
}


    handleUserZip = async () =>{
        let value = document.getElementById("input").value;
        if (value.length === 5){
            let test = value.toString();
            let result = test.match(/(\d{5})/);
            if(result === null){ 
                window.alert("Please enter a valid zip code");
                return <Redirect to='/' />;
            } else {
                let location = await useMyZip(value);
                this.setState({
                    latitude: location[1].toString(),
                    longitude: location[2].toString(),
                    zip: location[0].toString(),
                    isLoaded: true,
                    
                });
                localStorage.clear();
                localStorage.setItem("zip" , location[0].toString());
                localStorage.setItem("latitude" , location[1].toString());
                localStorage.setItem("longitude", location[2].toString());
                return <Redirect to="/garden" component={Weather} />;
            }
        } 

    }
    

    render(){
        return(
    <div className="container align-self-center d-flex">
        <div className="card img-fluid mx-auto d-flex align-items-center h-60">
             <div className="card-img-overlay justify-content-center d-flex">
                <h4 className="card-title justify-text-center">Welcome to Sprout!</h4>
            </div>
            <Image src={sprout} alt="Plant Sprouting" rounded id="pic"/>
            <div className="justify-content-center">
                <Row>
                    <Col>
                        <button className="btn btn-primary btn-block" onClick={this.handleUseMyLocation}>Use my location</button>
                    </Col>
                </Row>
                <Form.Group>
                        <FormControl className="col-8 mr-sm-2" type="text" placeholder="Enter a zipcode"
                        aria-label="Enter a zipcode" name="userZip" id="input"/>
                        <button className="col-4 btn-outline-success" type="submit" id="zip" onClick={this.handleUserZip}>Search</button>        
                </Form.Group>            
            </div>      
        </div>
    </div>
        );
    }
}


