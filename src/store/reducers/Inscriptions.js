/* eslint-disable import/no-anonymous-default-export */

import {
  GET_INSCRIPTION,
  ADD_INSCRIPTION,
  EDIT_INSCRIPTION,
  DELETE_INSCRIPTION,
} from "../../constants/ActionTypes";

// Define an initial state value for the app
const initialState = {
  inscriptions: [],
};
//The reducer receives two arguments, the current state and an action object
// Create a "reducer" function that determines what the new state
// should be when something happens in the app
export default function (state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state

  switch (action.type) {
    case GET_INSCRIPTION: {
      return Object.assign({}, state, {
        inscriptions: action.payload,
      });
    }

    // case ADD_INSCRIPTION: {
    //   return Object.assign({}, state, {
    //     inscriptions: [action.payload].concat(state.inscriptions), //...state
    //   });
    // }

    case ADD_INSCRIPTION: {
      return Object.assign({}, state, {
        inscriptions: [
          { ...action.payload, id: state.inscriptions.length + 1 },
        ].concat(state.inscriptions), //...state
      });
    }
    case EDIT_INSCRIPTION: {
      return Object.assign({}, state, {
        inscriptions: [
          action.payload,
          ...state.inscriptions.filter((e) => e.id !== action.payload.id), ///The spread syntax will allow us to get all of the properties of the object then we will be able to update only the wanted parts:  //state modifier dans le premier lieu
        ],
      });
    }
    case DELETE_INSCRIPTION: {
      return Object.assign({}, state, {
        inscriptions: [
          ...state.inscriptions.filter(({ id }) => id !== action.payload),
        ],
      });
    }

    default:
      return state;
  }
}
