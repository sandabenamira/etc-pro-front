import {
    GET_ALL_PRESENCE,
   } from "../constants/ActionTypes";
  
   const initialState = {
    presence: [],
    remotePresences: []
  };
  
  export default function (state = initialState, action) {
    if (action.type === GET_ALL_PRESENCE) {
        return Object.assign({}, state, {
            remotePresences: action.payload
        });
    }
    return state;
  };