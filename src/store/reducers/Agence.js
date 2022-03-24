import {
  FETECHED_AGENCES,
  ADD_AGENCE,
  GET_AGENCE,
  EDIT_AGENCE,
  DELETE_AGENCE,
} from "../../constants/ActionTypes";

const initialState = {
  agences: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case FETECHED_AGENCES: {
      return Object.assign({}, state, {
        agences: action.payload,
      });
    }

    case ADD_AGENCE: {
      return Object.assign({}, state, {
        agences: [action.payload].concat(state.agences), //...state
      });
    }

    case GET_AGENCE: {
      return Object.assign({}, state, {
        agences: action.payload,
      });
    }
    case EDIT_AGENCE: {
      return Object.assign({}, state, {
        agences: [
          action.payload,
          ...state.agences.filter((e) => e.id !== action.payload.id),
        ],
      });
    }
    case DELETE_AGENCE: {
      return Object.assign({}, state, {
        agences: [
          action.payload,
          ...state.agences.filter(({ id }) => id !== action.payload.id),
        ],
      });
    }

    default:
      return state;
  }
}
