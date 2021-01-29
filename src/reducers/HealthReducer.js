

  import {
    FETECHED_ALL_HEALTH,
    ADD_HEALTH,
    EDIT_HEALTH,
    DELETE_HEALTH,
    HANDLE_REQUEST_CLOSE,
    SHOW_ERROR_MESSAGE,
    HIDE_ERROR_MESSAGE
  } from '../constants/ActionTypes';
  
  const initialState = {
    remoteFicheMedical: []
  };
  
  export default function(state = initialState, action) {
    if (action.type === FETECHED_ALL_HEALTH) {
      return Object.assign({}, state, {
        remoteFicheMedical: action.payload
      });
    }
  
    if (action.type === ADD_HEALTH) {
      return Object.assign({}, state, {
        remoteFicheMedical: state.remoteFicheMedical.concat(action.payload)
      });
    }
  
    if (action.type === DELETE_HEALTH) {
      return Object.assign({}, state, {
        remoteFicheMedical: [
          ...state.remoteFicheMedical.filter(
            element => element.id !== action.payload.id
          )
        ]
      });
    }
  
    if (action.type === EDIT_HEALTH) {
      return Object.assign({}, state, {
        remoteFicheMedical: [
          ...state.remoteFicheMedical.filter(
            element => element.id !== action.payload.id
          ),
          action.payload
        ]
      });
    }
  
    return state;
  }
  