/* eslint-disable import/no-anonymous-default-export */

import {GET_INSCRIPTION, ADD_INSCRIPTION,PUT_INSCRIPTION} from '../../constants/ActionTypes';

const initialState = {
  inscriptions: [],

};

export default function (state = initialState, action) {
  if (action.type === GET_INSCRIPTION) {
    return Object.assign({}, state, {
      inscriptions: action.payload,
    });
  }

  if (action.type === ADD_INSCRIPTION) {
    return Object.assign({}, state, {
      inscriptions: [action.payload].concat(state.inscriptions), //...state
    });
  }
  if (action.type === PUT_INSCRIPTION) {
    return Object.assign({}, state, {
      inscriptions: [action.payload].concat(state.inscriptions.filter((e)=>e.id !==action.payload.id)), //...state
    });
  }
  // if (action.type === PUT_INSCRIPTION) {
  //   return  inscriptions: state.inscriptions.map(insc => {
  //           if (insc.id === payload.id) {
  //             return Object.assign({}, insc, payload.params);
  //           }
  //           return inscription;
  //               }),
  //             };
            




  //console.log("hello reducer",action.payload.params)

  return state;
}
