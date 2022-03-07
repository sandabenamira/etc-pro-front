import {GET_INSCRIPTION, ADD_INSCRIPTION} from '../../constants/ActionTypes';

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
      inscriptions: [action.payload].concat(state.inscriptions),
    });
  }

  return state;
}
