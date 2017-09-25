import React, { Component } from 'react';
import ZipForm from './ZipForm';

class Home extends Component {
  render () {
    return (
      <div>
        <p className="App-intro">
          Please enter your zip code in the box below to see local weather forecast
        </p>
        <ZipForm />
      </div>
    );
  }
}

export default Home;
