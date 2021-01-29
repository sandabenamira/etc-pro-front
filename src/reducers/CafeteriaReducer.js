import {
    FETECHED_ALL_MENUS,
    ADD_MENU,
    EDIT_MENU,
    DELETE_MENU,
    HANDLE_REQUEST_CLOSE,
    SHOW_ERROR_MESSAGE,
    HIDE_ERROR_MESSAGE
  } from '../constants/ActionTypes';
  
  const initialState = {
    remoteCafeteria: []
  };
  
  export default function(state = initialState, action) {
    if (action.type === FETECHED_ALL_MENUS) {
      return Object.assign({}, state, {
        remoteCafeteria: action.payload
      });
    }
  
    if (action.type === ADD_MENU) {
      return Object.assign({}, state, {
        remoteCafeteria: state.remoteCafeteria.concat(action.payload)
      });
    }
  
    if (action.type === DELETE_MENU) {
      return Object.assign({}, state, {
        remoteCafeteria: [
          ...state.remoteCafeteria.filter(
            element => element.id !== action.payload.id
          )
        ]
      });
    }
  
    if (action.type === EDIT_MENU) {
      return Object.assign({}, state, {
        remoteCafeteria: [
          ...state.remoteCafeteria.filter(
            element => element.id !== action.payload.id
          ),
          action.payload
        ]
      });
    }
  
    return state;
  }
  