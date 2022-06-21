import {
  FETECHED_USERS,
  ADD_USER,
  SHOW_ALERTE_USER,
  GET_USER,
  HIDE_ERROR_ALERTE_USER,
  EDIT_USER,
  SHOW_ERROR_ALERTE_USER,
  SHOW_MESSAGE_USER,
  SHOW_ERROR_MESSAGE_USER,
  HIDE_MESSAGE_USER,
} from "../../constants/ActionTypes";

const initialState = {
  users: [],
  showMessage: false,
  alertMessageUser: "",
  successUser: "success",
  showAlerteNavUser: false,
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
    case SHOW_MESSAGE_USER: {
      return {
        ...state,
        showMessage: true,
        alertMessageUser: "Le formulaire est envoyé avec succès! ",
        successUser: "success",
      };
    }
    case HIDE_MESSAGE_USER: {
      return {
        ...state,
        showMessage: false,
        alertMessageUser: "",
      };
    }

    case SHOW_ERROR_MESSAGE_USER: {
      return {
        ...state,
        showMessage: true,
        alertMessageUser: action.payload,
        successUser: "warning",
      };
    }

    case GET_USER: {
      return Object.assign({}, state, {
        users: action.payload,
        //  ...state.users.filter((e) => e.archive === true),
      });
    }
    case EDIT_USER: {
      console.log(state.users,'state.users');
      console.log(action.payload,'action.payload');

      return Object.assign({}, state, {
        users: [
          action.payload,
           ...state.users.filter((e) => e.id !== action.payload.id),
        ],
      });
    }
    case SHOW_ALERTE_USER: {
      return {
        ...state,
        showAlerteNavUser: true,
        alertMessageUser: action.payload,
        successUser: "success",
      };
    }
    case HIDE_ERROR_ALERTE_USER: {
      return {
        ...state,
        showAlerteNavUser: false,
        alertMessageUser: "",
      };
    }

    case SHOW_ERROR_ALERTE_USER: {
      return {
        ...state,
        showAlerteNavUser: true,
        alertMessageUser: action.payload,
        successUser: "warning",
      };
    }

    default:
      return state;
  }
}
