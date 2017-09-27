import React, { Component } from 'react';

const styles = {
  marginLeft: '1%'
}

class Home extends Component {
  render () {
    return (
      <div style={styles}>
        <p>
          Please enter your ZIP Code in the box below to see your local weather forecast
        </p>
      </div>
    );
  }
}

export default Home;
