import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import zipReducer from './zipReducer.js';

export default combineReducers({
  zip: zipReducer,
  form: reduxForm
});
