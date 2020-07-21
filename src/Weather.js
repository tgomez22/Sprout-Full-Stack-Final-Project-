import React from 'react';
import {Component} from 'react';
import { Card } from 'react-bootstrap';
import "./Weather.css";
const url = 


export default class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            highs: [],
            lows: [],
            weatherDescription: [],
            key: url,
            icon: [],
            error: null,
            isLoaded: false,
            latitute: 45.521744, //placeholder for testing
            longitude: -122.689947, //placeholder for testing
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
                <Card.Img src={this.state.icon[0]}/>
                <Card.Title>Date Placeholder</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[0]}
                        It is currently: {this.state.highs[0]} degrees out.
                    </Card.Text>
            </Card>
        </div> 
        <div className="col-2 d-flex" >
            <Card style={{width:'80%'}}>
                <Card.Img src={this.state.icon[1]}/>
                <Card.Title>Date Placeholder</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[1]}
                        High: {this.state.highs[1]} degrees Fahrenheit.
                        Low: {this.state.lows[0]} degrees Fahrenheit.
                    </Card.Text>
            </Card>
        </div> 
        <div className="col-2 d-flex" >
            <Card style={{width:'80%'}}>
                <Card.Img src={this.state.icon[2]}/>
                <Card.Title>Date Placeholder</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[2]}
                        High: {this.state.highs[2]} degrees Fahrenheit.
                        Low: {this.state.lows[1]} degrees Fahrenheit.
                    </Card.Text>
            </Card>
        </div> 
        <div className="col-2 d-flex" >
            <Card style={{width:'80%'}}>
                <Card.Img src={this.state.icon[3]}/>
                <Card.Title>Date Placeholder</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[3]}
                        High: {this.state.highs[3]} degrees Fahrenheit.
                        Low: {this.state.lows[2]} degrees Fahrenheit.
                    </Card.Text>
            </Card>
        </div> 
         <div className="col-2 d-flex">
            <Card style={{width:'80%'}}>
                <Card.Img src={this.state.icon[4]}/>
                <Card.Title>Date Placeholder</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[4]}
                        High: {this.state.highs[4]} degrees Fahrenheit.
                        Low: {this.state.lows[3]} degrees Fahrenheit.
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
            let icons = [];

            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.current.weather[0].icon + "@2x.png");
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[0].weather[0].icon + "@2x.png"); 
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[1].weather[0].icon + "@2x.png"); 
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[2].weather[0].icon + "@2x.png");
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[3].weather[0].icon + "@2x.png");

            let descriptions = [];
            descriptions.push(jsonResponse.current.weather[0].description);
            descriptions.push(jsonResponse.daily[0].weather[0].description);
            descriptions.push(jsonResponse.daily[1].weather[0].description);
            descriptions.push(jsonResponse.daily[2].weather[0].description);
            descriptions.push(jsonResponse.daily[3].weather[0].description);

            let highTemps = [];
            highTemps.push(jsonResponse.current.temp);
            highTemps.push(jsonResponse.daily[0].temp.max);
            highTemps.push(jsonResponse.daily[1].temp.max);
            highTemps.push(jsonResponse.daily[2].temp.max);
            highTemps.push(jsonResponse.daily[3].temp.max);

            let lowTemps = [];
            lowTemps.push(jsonResponse.daily[0].temp.min);
            lowTemps.push(jsonResponse.daily[1].temp.min);
            lowTemps.push(jsonResponse.daily[2].temp.min);
            lowTemps.push(jsonResponse.daily[3].temp.min);
                this.setState({
                    highs: highTemps,
                    lows: lowTemps,
                    weatherDescription: descriptions,
                    isLoaded:true,
                    error: false,
                    icon: icons
                })
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

