import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';
import WeatherRes from './WeatherRes';

class App extends Component {
  componentDidMount() {
    /* this.props.fetchWeather();*/
  }
  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" component={Home} />
          <Route exact path="/api/weather" component={WeatherRes} />
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions) (App);
