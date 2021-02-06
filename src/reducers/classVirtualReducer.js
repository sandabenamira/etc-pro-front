import {
    FETECHED_ALL_VIRTUAL_CLASS,
    ADD_VIRTUAL_CLASS,
    EDIT_VIRTUAL_CLASS,
    DELETE_VIRTUAL_CLASS,
    ARCHIVED_VIRTUAL_CLASS,
  } from '../constants/ActionTypes';
  
  const initialState = {
    remoteClassVirtual: [],
    archivedVirtualClass: [],
  };
  
  export default function(state = initialState, action) {
    if (action.type === FETECHED_ALL_VIRTUAL_CLASS) {
       return Object.assign({}, state, {
        remoteClassVirtual: action.payload.reverse()
      });
    }
  
    if (action.type === ADD_VIRTUAL_CLASS) {
      return Object.assign({}, state, {
        remoteClassVirtual: [action.payload].concat(state.remoteClassVirtual)
      });
    }
    if (action.type === ARCHIVED_VIRTUAL_CLASS) {
       return Object.assign({}, state, {
        archivedVirtualClass: action.payload,
      });
    }
    if (action.type === DELETE_VIRTUAL_CLASS) {
      return Object.assign({}, state, {
        remoteClassVirtual: [
          ...state.remoteClassVirtual.filter(
            element => element.id !== action.payload.id
          ),],
        archivedVirtualClass: state.archivedVirtualClass.concat(
          action.payload
        ),
      });
    }

    if (action.type === EDIT_VIRTUAL_CLASS) {
      return Object.assign({}, state, {
        remoteClassVirtual: [
          ...state.remoteClassVirtual.filter(
            element => element.id !== action.payload.id
          ),
          action.payload
        ]
      });
    }
  
    return state;
  }
  