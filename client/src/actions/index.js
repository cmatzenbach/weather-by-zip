import axios from 'axios';
import { FETCH_WEATHER } from './types.js';

export const fetchWeather = () => dispatch => {
    axios
      .get('/api/weather')
      .then(res => dispatch({ type: FETCH_WEATHER, payload: res.data }));
};

function submitZip(values) {
    axios
      .post('/api/weather', values)
      // .then(res => dispatch({ type: FETCH_WEATHER, payload: res.data }));
    .then(function(res) {
      console.log('SUBMITTED');
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    });
}

export default submitZip;
