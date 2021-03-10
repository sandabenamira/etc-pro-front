import { DATA_LOADED_STUPPUSER, DATA_NEW_STUPPUSER } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */

import _ from 'lodash';

const initialState = {
  stuppUsers: [],
  remoteStuppUsers: [],
  showSuccessMessage: false,
  showErrorMessage: false,
  message: '',
  download:false
};

export default function (state = initialState, action) {
  if (action.type === DATA_LOADED_STUPPUSER) {
    return Object.assign({}, state, {
      remoteStuppUsers: action.payload
    });
  }
  if (action.type === DATA_NEW_STUPPUSER) {
    return Object.assign({}, state, {
      remoteStuppUsers: state.remoteStuppUsers.concat(action.payload),
      showSuccessMessage: true
    });
  }
  if (action.type === "ADD_STUPPUSER") {
    return Object.assign({}, state, {
      remoteStuppUsers: state.remoteStuppUsers.concat(action.payload),
      showSuccessMessage: true
    });
  }
  if (action.type === "EDIT_PASSWORD") {
    return Object.assign({}, state, {
      remoteStuppUsers: action.payload
    });
  }
  if(action.type=== "EDIT_PROFILE_SIGNATURE"){
    
    return Object.assign({}, state, {
       download:true     
    });
  }
  if (action.type === "DELETE_STUPPUSER") {

    return Object.assign({}, state, {
      remoteStuppUsers: [...state.remoteStuppUsers.filter(element => element.id !== action.payload.id)]
    });

  }
  if (action.type === "EDIT_STUPPUSER") {

    return Object.assign({}, state, {
      remoteStuppUsers: [
        ...state.remoteStuppUsers.filter(
          element => element.id !== action.payload.id
        ),
        action.payload
      ]
    });
  }
  if (action.type === "EDIT_STUPPUSER_COMMON_INFORMATION") {
    let data = state.remoteStuppUsers.filter(element => element.id === action.payload.id)
    let prevData = _.omit (data[0], [ 'index' , 'user' ])
    let newData = {
      ...prevData,
      "user": action.payload,
    }
    return Object.assign({}, state, {
      remoteStuppUsers: [
        ...state.remoteStuppUsers.filter(
          element => element.id !== action.payload.id
        ),
        newData
      ]
    });
  }

  if (action.type === "HIDE_SUCCESS_ALERT") {
    return Object.assign({}, state, {
      showSuccessMessage: false
    });
  }
  if (action.type === "HIDE_ERROR_ALERT") {
    return Object.assign({}, state, {
      showErrorMessage: false
    });
  } if (action.type === "DISPLAY_ERROR_ALERT") {
    return Object.assign({}, state, {
      showErrorMessage: true,
      message: action.payload
    });
  }
  return state;
}
