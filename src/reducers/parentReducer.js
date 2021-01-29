
import {
 GET_ALL_PARENT
   } from "../constants/ActionTypes";
  
   const initialState = {
    parents:[],
    remoteParents:[]
  };

export default function (state = initialState, action) {
    if (action.type === GET_ALL_PARENT) {
        return Object.assign({}, state, {
            remoteParents: action.payload
        });
    }
    return state;
  };