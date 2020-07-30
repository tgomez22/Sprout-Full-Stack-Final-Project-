import React from 'react';
import {Component} from 'react';
import { Card } from 'react-bootstrap';
import "./Weather.css";
import {useMyZip} from './Location.js';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;



export default class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            dates: [],
            highs: [],
            lows: [],
            weatherDescription: [],
            key: API_KEY,
            icon: [],
            error: null,
            isLoaded: false,
        }
    }

    render(){
       
        if(this.error === null || this.error === true){
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
    <div className="row justify-content-center fixed-bottom" id="box">
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Img id="weatherIcon" src={this.state.icon[0]}/>
                <Card.Title>{this.state.dates[0]}</Card.Title>
                    <Card.Text>
                            {this.state.weatherDescription[0]}
                        <br />
                        High: {this.state.highs[0]}&#8457;
                        <br />
                        Low: {this.state.lows[0]}&#8457;
                    </Card.Text>
            </Card>
        </div> 
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Img id="weatherIcon" src={this.state.icon[1]}/>
                <Card.Title>{this.state.dates[1]}</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[1]}
                        <br />
                        High: {this.state.highs[1]}&#8457;
                        <br />
                        Low: {this.state.lows[1]}&#8457;
                    </Card.Text>
            </Card>
        </div> 
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Img id="weatherIcon" src={this.state.icon[2]}/>
                <Card.Title>{this.state.dates[2]}</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[2]}
                        <br />
                        High: {this.state.highs[2]}&#8457;
                        <br />
                        Low: {this.state.lows[2]}&#8457;
                    </Card.Text>
            </Card>
        </div> 
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Img id="weatherIcon" src={this.state.icon[3]}/>
                <Card.Title >{this.state.dates[3]}</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[3]}
                        <br />
                        High: {this.state.highs[3]}&#8457;
                        <br />
                        Low: {this.state.lows[3]}&#8457;
                    </Card.Text>
            </Card>
        </div> 
         <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Img id="weatherIcon" src={this.state.icon[4]}/>
                    <Card.Title>{this.state.dates[4]}</Card.Title>
                    <Card.Text>
                        {this.state.weatherDescription[4]}
                        <br />
                        High: {this.state.highs[4]}&#8457;
                        <br />
                        Low: {this.state.lows[4]}&#8457;
                    </Card.Text>
            </Card>
        </div> 
    </div>
    

            );
        }
    }

    convertTime(toUse){
    
    let tempArray = [];
    let int;
    
    for(let i = 0; i < 5; ++i){
        int = (toUse[i] * 1000);
        let dateObj = new Date(int);
        tempArray.push(dateObj.toLocaleDateString("en-us"));
    }
    return tempArray;

}

    componentDidMount(){
        if(localStorage.getItem('latitude') === undefined && localStorage.getItem('longitude') === undefined){
            return(
                <div className="row justify-content-center fixed-bottom" id="box">
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Title>Date</Card.Title>
                    <Card.Text>
                        Description:
                        <br />
                        High: &#8457;
                        <br />
                        Low: &#8457;
                    </Card.Text>
            </Card>
        </div> 
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Title>Date</Card.Title>
                    <Card.Text>
                        Description:
                        <br />
                        High: &#8457;
                        <br />
                        Low: &#8457;
                    </Card.Text>
            </Card>
        </div> 
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                
                <Card.Title>Date</Card.Title>
                    <Card.Text>
                        Description:
                        <br />
                        High: &#8457;
                        <br />
                        Low: &#8457;
                    </Card.Text>
            </Card>
        </div> 
        <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Title>Date</Card.Title>
                    <Card.Text>
                        Description
                        <br />
                        High: &#8457;
                        <br />
                        Low: &#8457;
                    </Card.Text>
            </Card>
        </div> 
         <div className="d-flex" id="panel">
            <Card style={{width:'80%'}}>
                <Card.Img id="weatherIcon" src={this.state.icon[4]}/>
                    <Card.Title>Date</Card.Title>
                    <Card.Text>
                        Description
                        <br />
                        High: &#8457;
                        <br />
                        Low: &#8457;
                    </Card.Text>
            </Card>
        </div> 
    </div>
    
            );   
        }
        
       fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + localStorage.getItem('latitude') + "&lon=" + localStorage.getItem('longitude') + "&units=imperial&exclude=minutely,hourly&appid=" + API_KEY)
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
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[0].weather[0].icon + "@2x.png");
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[1].weather[0].icon + "@2x.png"); 
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[2].weather[0].icon + "@2x.png"); 
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[3].weather[0].icon + "@2x.png");
            icons.push("http://openweathermap.org/img/wn/" + jsonResponse.daily[4].weather[0].icon + "@2x.png");

            let descriptions = [];
            descriptions.push(jsonResponse.daily[0].weather[0].description);
            descriptions.push(jsonResponse.daily[1].weather[0].description);
            descriptions.push(jsonResponse.daily[2].weather[0].description);
            descriptions.push(jsonResponse.daily[3].weather[0].description);
            descriptions.push(jsonResponse.daily[4].weather[0].description);

            let highTemps = [];
            highTemps.push(jsonResponse.daily[0].temp.max);
            highTemps.push(jsonResponse.daily[1].temp.max);
            highTemps.push(jsonResponse.daily[2].temp.max);
            highTemps.push(jsonResponse.daily[3].temp.max);
            highTemps.push(jsonResponse.daily[4].temp.max);

            let lowTemps = [];
            lowTemps.push(jsonResponse.daily[0].temp.min);
            lowTemps.push(jsonResponse.daily[1].temp.min);
            lowTemps.push(jsonResponse.daily[2].temp.min);
            lowTemps.push(jsonResponse.daily[3].temp.min);
            lowTemps.push(jsonResponse.daily[4].temp.min);

            let times = [];
            times.push(jsonResponse.daily[0].dt);
            times.push(jsonResponse.daily[1].dt);
            times.push(jsonResponse.daily[2].dt);
            times.push(jsonResponse.daily[3].dt);
            times.push(jsonResponse.daily[4].dt);

            times = this.convertTime(times);

                this.setState({
                    dates: times,
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


