import { FETCH_WEATHER } from '../actions/types';

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
  case FETCH_WEATHER:
    return action.payload || false;
  default:
    return state;
  }
}
