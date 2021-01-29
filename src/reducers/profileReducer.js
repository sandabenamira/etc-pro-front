import {
  GET_ALL_PROFILES,
   } from "../constants/ActionTypes";
  
   const initialState = {
    remoteProfiles: []
  };
  
  export default function (state = initialState, action) {
    if (action.type === GET_ALL_PROFILES) {
        return Object.assign({}, state, {
          remoteProfiles: action.payload
        });
    }
    return state;
  };