import React, { Component } from 'react';
import axios from 'axios';
import './ZipForm.css';

const styles = {
  marginLeft: '11%'
};

class ZipForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      zipError: '',
      zipValid: false,
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // on every input from the user, update state and validate
    this.setState({value: e.target.value});
    this.validateField(e.target.value);
    this.validateForm();
  }

  validateField(value) {
    let fieldValidationErrors = this.state.zipError;
    let isZipValid = this.state.zipValid;

    // use regex to test for valid zip and update the state on validity status
    isZipValid = value.match(/^(\d{5})?$/);
    fieldValidationErrors = isZipValid ? '' : 'Zip Code is invalid';

    // update validity values in state and call function to set form validation state
    this.setState({zipError: fieldValidationErrors,
                   zipValid: isZipValid}, this.validateForm);
  }

  validateForm() {
    // update form's validity in state (really this controls whether the user can submit or not)
    this.setState({formValid: this.state.zipValid});
  }

  handleSubmit(event) {
    // set state as waiting, which activates spinner
    this.props.onWait(true);
    // send out GET request, pass back data once done and turn waiting to false to deactivate spinner
    axios.get('/api/weather', { params: {data:this.state.value} }).then(res => { this.props.onDone(res.data); this.props.onWait(false); });
    this.setState({value: ''});
    // prevent page from refreshing
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={styles}>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="ZIP Code" />
        <input type="submit" value="Submit" disabled={!this.state.formValid} />
        <div className="error-field">
          <span>{this.state.zipError}</span>
        </div>
      </form>
    );
  }
}

export default ZipForm;
