import React, { Component } from 'react';
import axios from 'axios';

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
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange = (e) => {
    // this.setState({value: event.target.value});
    // const name = e.target.name;
    // const value = e.target.value;
    this.setState({value: e.target.value},
                  (value) => {
                    console.log(value);
                    let valid;
                    valid = value.match(/^(\d{5})?$/);
                    console.log(valid);
                        });
  }

  validateField(value) {
    console.log('validatefield reached');
    let fieldValidationErrors = this.state.zipError;
    let isZipValid = this.state.zipValid;

    isZipValid = value.match(/^(\d{5})?$/);
    console.log(isZipValid);
    fieldValidationErrors = isZipValid ? '' : 'Zip Code is invalid';

    this.setState({zipError: fieldValidationErrors,
                   zipValid: isZipValid}, this.validateForm);
  }

  validateForm() {
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
        <label>
        Zip Code:
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Zip Code" />
        </label>
        <input type="submit" value="Submit" disabled={!this.state.formValid} />
        <div className="panel panel-default">
          <p>{this.state.zipError}</p>
        </div>
      </form>
    );
  }
}

export default ZipForm2;
