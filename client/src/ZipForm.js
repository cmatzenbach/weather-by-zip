import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submitZip from './actions';

const required = value => value ? undefined : 'Required';
const zipValid = value =>
      value && /^(\d{5})?$/.test(value) ?
      undefined : 'Invalid zip code';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
);

let ZipForm = (props) => {
  const { handleSubmit } = props;

  return (
      <form onSubmit={handleSubmit}>
        <Field name="zip" type="text"
      component={renderField} label="Zip Code"
      validate={[ required, zipValid ]}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
);
}

/* function mapStateToProps(state) {
 *   return { formValues: state.zip };
 *   /* console.log(state);*/

/* ZipForm = connect(
 *   mapStateToProps,
 *   actions
 * )(ZipForm);*/

export default reduxForm({
  form: 'ZipForm',
  onSubmit: submitZip
})(ZipForm);
