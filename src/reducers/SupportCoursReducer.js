import {
    FETECHED_ALL_SUPPORT_COURS,
  ADD_SUPPORT_COURS,
  EDIT_SUPPORT_COURS,
  DELETE_SUPPORT_COURS,
  HANDLE_REQUEST_CLOSE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  ARCHIVED_SUPPORT_COURS,
  } from '../constants/ActionTypes';
   
  const initialState = {
    remoteSupportCours: [],
    archivedSupportCours: [],
  };
  
  export default function(state = initialState, action) {
    if (action.type === FETECHED_ALL_SUPPORT_COURS) {
       return Object.assign({}, state, {
        remoteSupportCours: action.payload
      });
    }
  
    if (action.type === ADD_SUPPORT_COURS) {
      return Object.assign({}, state, {
        remoteSupportCours: state.remoteSupportCours.concat(action.payload)
      });
    }
    if (action.type === ARCHIVED_SUPPORT_COURS) {
       return Object.assign({}, state, {
        archivedSupportCours: action.payload,
      });
    }
    if (action.type === DELETE_SUPPORT_COURS) {
       console.log(action.payload.id)
      return Object.assign({}, state, {
        remoteSupportCours: [
          ...state.remoteSupportCours.classeVirtual.virtualClassData.filter((element) => element.id !== action.payload[0].classeVirtual.id),],
        archivedSupportCours: state.archivedSupportCours.concat(
          action.payload
        ),
      });
    }

    if (action.type === EDIT_SUPPORT_COURS) {
      return Object.assign({}, state, {
        remoteSupportCours: [
          ...state.remoteSupportCours.filter(
            element => element.id !== action.payload.id
          ),
          action.payload
        ]
      });
    }
  
    return state;
  }
  