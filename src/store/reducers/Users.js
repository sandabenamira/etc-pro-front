import {
  FETECHED_USERS,
  ADD_USER,
  GET_USER,
  EDIT_USER,
  DELETE_USER,
} from "../../constants/ActionTypes";

const initialState = {
  users: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case FETECHED_USERS: {
      return Object.assign({}, state, {
        users: action.payload,
      });
    }

    case ADD_USER: {
      return Object.assign({}, state, {
        users: [action.payload].concat(state.users), //...state
      });
    }

    case GET_USER: {
      return Object.assign({}, state, {
        users: action.payload,
      });
    }
    case EDIT_USER: {
      return Object.assign({}, state, {
        users: [
          action.payload,
          ...state.users.filter((e) => e.id !== action.payload.id),
        ],
      });
    }
    case DELETE_USER: {
      return Object.assign({}, state, {
        users: [
          action.payload,
          ...state.users.filter(({ id }) => id !== action.payload.id),
        ],
      });
    }

    default:
      return state;
  }
}
