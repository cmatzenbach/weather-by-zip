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
      value: null,
      load: false
    };
  }

  handleDone = (d) => {
    this.setState({data: d});
  }

  showSpin = (l) => {
    this.setState({load: l});
  }

  render() {
    return (
      <div>
        <Header />
        <Home />
        <ZipForm onDone={this.handleDone} onWait={this.showSpin} />
        <WeatherRes data={this.state.data} load={this.state.load} />
      </div>
    );
  }
}

export default App;
