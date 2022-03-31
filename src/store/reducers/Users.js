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
        users: [{ ...action.payload, id: state.users.length + 1 }].concat(
          state.users
        ), //...state
      });
    }

    case GET_USER: {
      return Object.assign({}, state, {
        users: action.payload,
        //  ...state.users.filter((e) => e.archive === true),
      });
    }
    case EDIT_USER: {
      return Object.assign({}, state, {
        users: [
          action.payload,
          ...state.users.filter((e) => e.id !== action.payload.id), ///The spread syntax will allow us to get all of the properties of the object then we will be able to update only the wanted parts:  //state modifier dans le premier lieu
        ],
      });
    }

    default:
      return state;
  }
}
