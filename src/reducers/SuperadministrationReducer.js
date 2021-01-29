
import {
    FETECHED_ALL_ADMINISTRATION,
    ADD_ADMINISTRATION,
    EDIT_ADMINISTRATION,
    DELETE_ADMINISTRATION,
    HANDLE_REQUEST_CLOSE,
    SHOW_ERROR_MESSAGE,
    HIDE_ERROR_MESSAGE
  } from '../constants/ActionTypes';
  
  const initialState = {
    remoteAdministration: []
  };
  
  export default function(state = initialState, action) {
    if (action.type === FETECHED_ALL_ADMINISTRATION) {
      return Object.assign({}, state, {
        remoteAdministration: action.payload
      });
    }
  
    if (action.type === ADD_ADMINISTRATION) {
      return Object.assign({}, state, {
        remoteAdministration: state.remoteAdministration.concat(action.payload)
      });
    }
  
    if (action.type === DELETE_ADMINISTRATION) {
var x=state.remoteAdministration.filter(element => element.id !== action.payload.id)
 
      return Object.assign({}, state, {
        
        remoteAdministration: [
          ...state.remoteAdministration.filter(
            element => element.id !== action.payload.id
          )
        ]
      });
    }
  
    if (action.type === EDIT_ADMINISTRATION) {
      return Object.assign({}, state, {
        remoteAdministration: [
          ...state.remoteAdministration.filter(
            element => element.id !== action.payload.id
          ),
          action.payload
        ]
      });
    }
  
    return state;
  }
  