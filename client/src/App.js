import React, { Component } from 'react';
/* import logo from './logo.svg';*/
import './App.css';
import Header from './Header';
import Home from './Home';
import ZipForm from './ZipForm';
import WeatherRes from './WeatherRes';

class App extends Component {

  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  handleDone = (data) => {
    this.setState({data});
  }

  render() {
    return (
      <div>
        <Header />
        <Home />
        <ZipForm onDone={this.handleDone} />
        <WeatherRes data={this.state.data} />
      </div>
    );
  }
}

export default App;
