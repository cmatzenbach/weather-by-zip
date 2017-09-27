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

    else if (this.props.data.error) {
      return (
        <div>
          <p>ZIP Code does not exist. Please enter a valid ZIP Code and re-submit.</p>
        </div>
      );
    }

    else return (
      <div>
        <div>{this.props.data.day1}</div>
        <div><img src={this.props.data.day1forecastimg} /> {this.props.data.day1forecast}</div>
        <br />
        <div>{this.props.data.day2}</div>
        <div><img src={this.props.data.day2forecastimg} /> {this.props.data.day2forecast}</div>
        <br />
        <div>{this.props.data.day3}</div>
        <div><img src={this.props.data.day3forecastimg} /> {this.props.data.day3forecast}</div>
      </div>
    );
  }
}

export default WeatherRes;
