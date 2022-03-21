/* eslint-disable import/no-anonymous-default-export */

import {
  GET_ENTREPRISE,
  ADD_ENTREPRISE,
  EDIT_ENTREPRISE,
  DELETE_ENTREPRISE,
} from "../../constants/ActionTypes";

const initialState = {
  entreprises: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ENTREPRISE: {
      return Object.assign({}, state, {
        entreprises: action.payload,
      });
    }
    case ADD_ENTREPRISE: {
      return Object.assign({}, state, {
        entreprises: [action.payload].concat(state.entreprises),
      });
    }
    case EDIT_ENTREPRISE: {
      return Object.assign({}, state, {
        inscriptions: [
          action.payload,
          ...state.entreprises.filter((e) => e.id !== action.payload.id),
        ],
      });
    }
    case DELETE_ENTREPRISE: {
      return Object.assign({}, state, {
        inscriptions: [
          action.payload,
          ...state.entreprises.filter(({ id }) => id !== action.payload.id),
        ],
      });
    }

    default:
      return state;
  }
}
