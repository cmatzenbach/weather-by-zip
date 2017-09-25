import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';
import ZipForm2 from './ZipForm2';
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
        <ZipForm2 onDone={this.handleDone} />
        <WeatherRes data={this.state.data} />
        {/* <BrowserRouter>
            <div>
            <Header />
            <Route path="/" component={Home} />
            <Route exact path="/api/weather" component={WeatherRes} />
            </div>
            </BrowserRouter> */}
      </div>
    );
  }
}

/* export default connect(null, actions) (App);*/
export default App;
