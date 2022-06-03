/* eslint-disable import/no-anonymous-default-export */
import {
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SHOW_ERROR_MESSAGE_FORGOT,
  HIDE_MESSAGE_FORGOT,
  SHOW_MESSAGE_FORGOT,
  SWITCH_APP_LANGUAGE,
  GET_USERSPROFILES,
} from "../../constants/ActionTypes"; /* eslint eqeqeq: "off" */

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  authUser: localStorage.getItem("token"),
  multiple: false,
  profile: [],
  errorAlert: false,
  succedAlert: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        initURL: "/app/home",
      };
    }

    case GET_USERSPROFILES: {
      return Object.assign({}, state, {
        profile: action.payload,
      });
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: "/signin",
        loader: false,
      };
    }

    case SHOW_MESSAGE_FORGOT: {
      return {
        ...state,
        succedAlert: true,
      };
    }
    case HIDE_MESSAGE_FORGOT: {
      return {
        ...state,
        errorAlert: false,
      };
    }

    case SHOW_ERROR_MESSAGE_FORGOT: {
      return {
        ...state,
        errorAlert: true,
      };
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
      };
    }

    case SWITCH_APP_LANGUAGE: {
      return Object.assign({}, state, {
        userProfile: action.payload,
      });
    }

    default:
      return state;
  }
};
