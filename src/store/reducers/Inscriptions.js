/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */

import {
  GET_INSCRIPTION,
  ADD_INSCRIPTION,
  EDIT_INSCRIPTION,
  DELETE_INSCRIPTION,
  SHOW_MESSAGE_INSC,
  HIDE_SUCCESS_MESSAGE_INSC,
  SHOW_ERROR_MESSAGE_INSC,
} from "../../constants/ActionTypes";

// Define an initial state value for the app
const initialState = {
  inscriptions: [],
  showMessage: false,
  alertMessage: "",
  success:"success"
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

    case ADD_INSCRIPTION: {
      return Object.assign({}, state, {
        inscriptions: [
          { ...action.payload, id: state.inscriptions.length + 1 },
        ].concat(state.inscriptions), //...state
      });
    }
    case SHOW_MESSAGE_INSC: {
      return {
        ...state,
        showMessage: true,
        alertMessage: "Le formulaire est envoyé avec succès! ",
        success:"success"
      };
    }
    case HIDE_SUCCESS_MESSAGE_INSC: {
      return {
        ...state,
        showMessage: false,
        alertMessage: "",
      };
    }

    case SHOW_ERROR_MESSAGE_INSC: {
      return {
        ...state,
        showMessage: true,
        alertMessage: action.payload,
        success:"warning"
      };
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
