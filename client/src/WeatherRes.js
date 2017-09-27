import React, { Component } from 'react';
import Spinner from './Spinner';

const styles = {
  marginTop: '3%',
  marginLeft: '1%'
}

class WeatherRes extends Component {
  constructor(props) {
   super(props);
    this.state = {
      data: null,
      load: false
    };
  }
  render() {

    // if no data and load is false, display nothing (nothing has happened)
    if (this.props.data === undefined && this.props.load === false) return null;

    // if load is true, display spinner
    else if (this.props.load === true) {
      return (
        <Spinner />
      );
    }

    // if error from data, display error message (invalid zip)
    else if (this.props.data.error) {
      return (
        <div style={styles}>
          <p>ZIP Code does not exist. Please enter a valid ZIP Code and re-submit.</p>
        </div>
      );
    }

    // if not, then we're all set - render forecast
    else return (
      <div style={styles}>
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
