import React from 'react';
import {Component} from 'react';
import { Card } from 'react-bootstrap';
import "./Weather.css";
/*const url = Placeholder! */



export default class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            WeatherDescription: "",
            key: url,
            icon: "",
            error: null,
            isLoaded: false,
        };
    }

    render(){
        if(this.error === true){
            return(
            <div className = "row">
                <div className ="col-4">
                    Nothing loaded yet!.
                </div>
            </div>
            );
        }

        else{
            return(
    <div className="row justify-content-center fixed-bottom">
        <div className="col-2 d-flex">
            <Card style={{width:'80%'}}>
                <Card.Img src={this.state.icon}/>
                <Card.Title>Date Placeholder</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription}
                    </Card.Text>
            </Card>
        </div> 
    </div>
            );
        }
    }

    componentDidMount(){
       fetch(url)
        .then(response => {
            if(response.status === 200){
                return response.json();
            }
            else{
                throw(response);
            }
        })
        .then(
            (jsonResponse) => 
        {
                this.setState({
                    weatherDescription:jsonResponse.weather[0].description,
                    isLoaded:true,
                    error: false,
                    icon: "http://openweathermap.org/img/wn/" + `${jsonResponse.weather[0].icon}` 
        + "@2x.png"})
        },
        (error) => {
            this.setState({
                error,
                isLoaded:false,
        });
        }
        )
    }
}

