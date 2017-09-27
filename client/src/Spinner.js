import React, { Component } from "react";
import MDSpinner from "react-md-spinner";

const styles = {
  marginLeft: '20%',
  marginTop: '5%'
};

class Spinner extends Component {
  render() {
    return (
        <div style={styles}>
          <MDSpinner />
        </div>
    );
  }
}

export default Spinner;
