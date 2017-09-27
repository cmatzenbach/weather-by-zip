import React, { Component } from 'react';
import axios from 'axios';
import './ZipForm.css';

class ZipForm2 extends Component {
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
    axios.post('/api/weather', {data:this.state.value}).then(res => { console.log(res.data); this.props.onDone(res.data); });
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="ZIP Code" />
        <input type="submit" value="Submit" disabled={!this.state.formValid} />
        <div className="error-field">
          <span>{this.state.zipError}</span>
        </div>
      </form>
    );
  }
}

export default ZipForm2;
