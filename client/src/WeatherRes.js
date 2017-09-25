import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherRes extends Component {
  render() {
    console.log(this.props);
    return (
        <div>WEATHER RESULTS HERE</div>
    );
  }
}

function mapStateToProps(state) {
  return { zip: state.zip };
}

export default connect(mapStateToProps)(WeatherRes);
