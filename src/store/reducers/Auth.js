import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  SWITCH_APP_LANGUAGE,
} from "../../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  authUser: localStorage.getItem("token"),
  multiple: false,
  profile: [],
  showLicenceMessage: false,
  alertLicenceMessage: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        initURL: "/app/home",
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: "/signin",
        loader: false,
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
    case SHOW_Licence_MESSAGE: {
      return {
        ...state,
        alertLicenceMessage: action.payload,
        showLicenceMessage: true,
      };
    }
    case HIDE_Licence_MESSAGE: {
      return {
        ...state,
        alertLicenceMessage: "",
        showLicenceMessage: false,
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

    case SIGNIN_GOOGLE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_FACEBOOK_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_TWITTER_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_GITHUB_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }


    case "SOW_MODAL_SELECT_ESTABLISHMENT": {
      return Object.assign({}, state, {
        multiple: true,
        profile: action.payload,
      });
    }
    case "HIDE_MODAL_SELECT_ESTABLISHMENT": {
      return Object.assign({}, state, {
        multiple: false,
      });
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
