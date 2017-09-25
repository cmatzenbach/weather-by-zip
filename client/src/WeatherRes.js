import React, { Component } from 'react';

class WeatherRes extends Component {
  constructor(props) {
   super(props);
   this.state = {data: null};
  }
  render() {
    console.log('muh props');
    console.log(this.props);
    if (this.props.data === undefined) return null;
    else return (
      <div>
        <div>City: {this.props.data.city}</div>
        <div>State: {this.props.data.state}</div>
        <div>Weather: {this.props.data.weatherDesc}</div>
        <div>Current Temperature: {this.props.data.temp}</div>
        <div>Feels Liked: {this.props.data.feelsLike}</div>
      </div>
    );
  }
}

export default WeatherRes;
