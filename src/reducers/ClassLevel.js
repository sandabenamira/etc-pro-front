import { DATA_LOADED_LEVELS } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
  remoteLevels: []
};

export default function(state = initialState, action) {
  if (action.type === DATA_LOADED_LEVELS) {
    return Object.assign({}, state, {
      remoteLevels: action.payload
    });
  }

  return state;
}
