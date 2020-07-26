import React from 'react';
import {Component} from 'react';
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

//supplied test zip
//const zipCode = "97206";
//
//The call used a supplied zip code for testing. 
//const CALL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode +"&key=" + GOOGLE_KEY;

//This call was used to turn lat/long into a zipcode.

const CALL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=45.48563720000001,-122.5946255&key=" + GOOGLE_KEY;


export default class Location extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null, 
            lat: 45.48563720000001, //preloaded coordinates
            long: -122.5946255, //preloaded coordinates.
            zip: null, 
        };
    }

    render(){
        if(this.state.error === null || this.state.error === true){
            return(
                <div className ='row'>
                    <div className = 'col-12'>
                        Nothing Loaded yet!
                    </div>
                </div>
            );
        } else {
            return(
                <div className = 'row'>
                    <div className = 'col-12'>
                       {this.state.zip}
                    </div>
                </div>
            );
        }
    }

    //use if supplied lat/long
    getZip(){
        fetch(CALL)
            .then(response => response.json())
            .then(jsonResponse => {
                let data = jsonResponse;
                console.log(data);
                
                this.setState({
                    isLoaded: true,
                    error: false,
                    zip: data.results[0].address_components[7].long_name,
                })
            },
            (error) => {
                this.setState({
                    error,
                    isLoaded: false,
                });
            })
    }




        //use if user supplied zip
        getLatLong(){
        fetch(CALL)
            .then(response => response.json())
            .then(jsonResponse => {
                let data = jsonResponse;

                //used for testing
                //console.log(data);


                this.setState({
                    isLoaded: true,
                    error: false,
                    lat: data.results[0].geometry.location.lat,
                    long: data.results[0].geometry.location.lng,

                    //this is a supplied test zip.
                    zip: data.results[0].address_components[0].long_name,
                })

            },
            (error) => {
                this.setState({
                    error,
                    isLoaded: false,
                });
            }
            )
    }


}