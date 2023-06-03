/* eslint-disable import/no-anonymous-default-export */
import {
  FETECHED_USERS,
  ADD_USER,
  SHOW_ALERTE_USER,
  GET_USERR,
  HIDE_ERROR_ALERTE_USER,
  EDIT_USER,
  SHOW_ERROR_ALERTE_USER,
  GET_USERPROFILE,
  GET_USERSPROFILES,
  ADD_USERR,
} from "../../constants/ActionTypes";

const initialState = {
  users: [],
  showMessage: false,
  alertMessageUser: "",
  successUser: "success",
  showAlerteNavUser: false,
  profiles: [],
  profile: [],
  roleId: 1,
  entreprise: "ETC Pro",
};
console.log(initialState.users, "users reducer");
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
        ),
      });
    }

    case GET_USERR: {
      return Object.assign({}, state, {
        users: action.payload,
      });
    }
    case GET_USERPROFILE: {
      return Object.assign({}, state, {
        profile: action.payload,
        roleId: action.payload[0].profile.roleId,
        entreprise: action.payload[0].profile.entreprise.name,
        //  ...state.users.filter((e) => e.archive === true),
      });
    }
    case GET_USERSPROFILES: {
      return Object.assign({}, state, {
        profiles: action.payload,
        //  ...state.users.filter((e) => e.archive === true),
      });
    }
    case EDIT_USER: {
      return {
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
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
