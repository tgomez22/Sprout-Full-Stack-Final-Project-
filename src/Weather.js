import testData from "./testData.json";
import React from "react";
import { Component } from "react";
import { Card } from "react-bootstrap";
import "./Weather.css";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

let data = testData;
window.localStorage.setItem("zip", data.set1.zip);
window.localStorage.setItem("latitude", data.set1.lat);
window.localStorage.setItem("longitude", data.set1.lng);

/*This component renders a 5 day weather forecast which is stuck to the bottom of the user's
screen. It uses the local storage location data to make an api call to get the weather forecast
for the user's location. If the data is successfully fetched and loaded, then the weather bar is loaded. 
If the weather data cannot be loaded, then the bar is rendered mostly empty, with some place holding test.
If the component is loaded with its own data, it skips calling the api and renders using its stored data.*/
export default class Weather extends Component {
  constructor(props) {
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
    };
  }

  render() {
    //If this component has weather data, then it will display it.
    if (this.state.isLoaded === true) {
      return (
        <div className="row justify-content-center fixed-bottom" id="box">
          <div className="d-flex" id="panel">
            <Card style={{ width: "80%" }}>
              <Card.Img
                id="weatherIcon"
                src={this.state.icon[0]}
                alt="Icon representing current weather."
              />
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
            <Card style={{ width: "80%" }}>
              <Card.Img
                id="weatherIcon"
                src={this.state.icon[1]}
                alt="Icon representing current weather."
              />
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
            <Card style={{ width: "80%" }}>
              <Card.Img
                id="weatherIcon"
                src={this.state.icon[2]}
                alt="Icon representing current weather."
              />
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
            <Card style={{ width: "80%" }}>
              <Card.Img
                id="weatherIcon"
                src={this.state.icon[3]}
                alt="Icon representing current weather."
              />
              <Card.Title>{this.state.dates[3]}</Card.Title>
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
            <Card style={{ width: "80%" }}>
              <Card.Img
                id="weatherIcon"
                src={this.state.icon[4]}
                alt="Icon representing current weather."
              />
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
    } else {
      return (
        <div className="row justify-content-center fixed-bottom" id="box">
          <div className="d-flex" id="panel">
            <Card style={{ width: "80%" }}>
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
            <Card style={{ width: "80%" }}>
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
            <Card style={{ width: "80%" }}>
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
            <Card style={{ width: "80%" }}>
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
            <Card style={{ width: "80%" }}>
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
  }

  //This method takes time data and converts it to a human
  //readable form. Data passed in should be UNIX time.
  convertTime(toUse) {
    let tempArray = [];
    let int;

    for (let i = 0; i < 5; ++i) {
      int = toUse[i] * 1000;
      let dateObj = new Date(int);
      tempArray.push(dateObj.toLocaleDateString("en-us"));
    }
    return tempArray;
  }

  async componentDidMount() {
    await this.getWeatherForecast();
    return (
      <div className="row justify-content-center fixed-bottom" id="box">
        <div className="d-flex" id="panel">
          <Card style={{ width: "80%" }}>
            <Card.Img
              id="weatherIcon"
              src={this.state.icon[0]}
              alt="Icon representing current weather."
            />
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
          <Card style={{ width: "80%" }}>
            <Card.Img
              id="weatherIcon"
              src={this.state.icon[1]}
              alt="Icon representing current weather."
            />
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
          <Card style={{ width: "80%" }}>
            <Card.Img
              id="weatherIcon"
              src={this.state.icon[2]}
              alt="Icon representing current weather."
            />
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
          <Card style={{ width: "80%" }}>
            <Card.Img
              id="weatherIcon"
              src={this.state.icon[3]}
              alt="Icon representing current weather."
            />
            <Card.Title>{this.state.dates[3]}</Card.Title>
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
          <Card style={{ width: "80%" }}>
            <Card.Img
              id="weatherIcon"
              src={this.state.icon[4]}
              alt="Icon representing current weather."
            />
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

  /*This method fetches weather data from the openweathermap api if location data exists in local storage. */
  getWeatherForecast = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        localStorage.getItem("latitude") +
        "&lon=" +
        localStorage.getItem("longitude") +
        "&units=imperial&exclude=minutely,hourly,current&appid=" +
        API_KEY
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(
        (jsonResponse) => {
          let icons = [];
          icons.push(
            "http://openweathermap.org/img/wn/" +
              jsonResponse.daily[0].weather[0].icon +
              "@2x.png"
          );
          icons.push(
            "http://openweathermap.org/img/wn/" +
              jsonResponse.daily[1].weather[0].icon +
              "@2x.png"
          );
          icons.push(
            "http://openweathermap.org/img/wn/" +
              jsonResponse.daily[2].weather[0].icon +
              "@2x.png"
          );
          icons.push(
            "http://openweathermap.org/img/wn/" +
              jsonResponse.daily[3].weather[0].icon +
              "@2x.png"
          );
          icons.push(
            "http://openweathermap.org/img/wn/" +
              jsonResponse.daily[4].weather[0].icon +
              "@2x.png"
          );

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
          let count = this.state.callCounter;
          count = count + 1;
          this.setState({
            dates: times,
            highs: highTemps,
            lows: lowTemps,
            callCounter: count,
            weatherDescription: descriptions,
            isLoaded: true,
            error: false,
            icon: icons,
          });
        },
        (error) => {
          this.setState({
            error,
            isLoaded: false,
          });
        }
      );
  };
}
