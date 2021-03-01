import axios from "axios";
import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  GET_USER_PROFILE,
  FETECHED_ALL_SCHOOL_YEAR_ETAB,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  GET_ESTABLISHMENT_INFORMATIONS,
  GET_PROFILE,
} from "../constants/ActionTypes";
import { isEmail } from "../constants/validationFunctions";
import cst from "../config/config";
import { getThemeColor, getAppLanguage, initOptions } from "./Setting";
import _ from "lodash";
import { roleIdAdmin, roleIdSuperAdmin } from "../config/config";
export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user,
  };
};

export const userSignIn = (user) => {
  var login = user.login;
  var password = user.password;
  if (isEmail(login)) {
    var User = {
      email: login,
      password: password,
    };
  } else {
    var User = {
      username: login,
      password: password,
    };
  }

  return (dispatch) => {
    axios
      .post(`${cst.baseUrl}/users/login`, User)
      .then((res) => {
        // let id = res.data.id;
        localStorage.setItem("token", res.data.id);
        localStorage.setItem("rtvrx_tgfsaju_G0loik", res.data.userId);
        dispatch(getProfile(res.data.id, res.data.userId));
      })
      .catch((err) =>
        dispatch(
          showAuthMessage("Veuillez vérifier votre login et mot de passe")
        )
      );
  };
};

export const getProfile = (token, userId) => {
  return function(dispatch) {
    axios
      .get(`${cst.baseUrl}/profiles/getprofile/${userId}?access_token=${token}`)
      .then((res) => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data.profile[0],
        });
        let result = res.data.profile[0];
        let status =
          result.establishments[0].establishment.licence[0].situation;
        let modules =
          result.establishments[0].establishment.licence[0].licenceModule;
        let user = result.user;
        let settings = result.setting;
        let dataOption = {
          startTime: result.setting.start_time_calendar,
          endTime: result.setting.end_time_calendar,
          appLang: result.setting.app_lang,
          conferenceTool: result.setting.conference_tool,
        };
        let establishmentInfomations = result.establishments[0].establishment;
        dispatch(
          chekLicence(
            status,
            modules,
            user,
            settings,
            dataOption,
            establishmentInfomations
          )
        );
      });
  };
};

const chekLicence = (
  status,
  modules,
  user,
  settings,
  dataOption,
  establishmentInfomations
) => {
  return (dispatch) => {
    if (status !== "Actif") {
      dispatch(userSignOut());
      dispatch(
        showLicenceMessage(
          "Votre licence a expiré, Merci de contacter le super admin Educap"
        )
      );
    } else {
      dispatch(getEstablishmentsModules(modules));
      dispatch(initSessionApp(settings, dataOption, establishmentInfomations));
      dispatch(userSignInSuccess(user));
    }
  };
};

const initSessionApp = (settings, dataOption, establishmentInfomations) => {
  return (dispatch) => {
    dispatch(getThemeColor(settings.theme_color));
    dispatch(getAppLanguage(settings.app_lang));
    dispatch(initOptions(dataOption));
    dispatch(getSchoolYear());
    dispatch(getEstablishmentsInformations(establishmentInfomations));
  };
};
export const getSchoolYear = () => {
  return (dispatch) => {
    axios
      .get(`${cst.baseUrl}/school_years/?access_token=${localStorage.token}`)
      .then((res) => {
        if (res) {
          dispatch({
            type: FETECHED_ALL_SCHOOL_YEAR_ETAB,
            payload: res.data,
          });
        }
      })
      .catch((err) => {});
  };
};

export const getEstablishmentsModules = (modules) => {
  return {
    type: "GET_ESTABLISHMENT_MODULE",
    payload: modules,
  };
};

export const getEstablishmentsInformations = (data) => {
  return {
    type: GET_ESTABLISHMENT_INFORMATIONS,
    payload: data,
  };
};

export const resetAccountPassword = (data) => {
  return function(dispatch) {
    var token = localStorage.getItem("token");
    axios
      .post(
        `${cst.baseUrl}/users/reset-initial-password?access_token=${token}`,
        data,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {})
      .catch((error) => {});
  };
};
export const userSignOut = () => {
  axios.post(`${cst.baseUrl}/users/logout?access_token=${localStorage.token}`);
  localStorage.removeItem("token");
  localStorage.removeItem("rtvrx_tgfsaju_G0loik");

  return {
    type: SIGNOUT_USER,
  };
};

export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser,
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser,
  };
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
};

export const showLicenceMessage = (message) => {
  return {
    type: SHOW_Licence_MESSAGE,
    payload: message,
  };
};
export const hideLicenceMessage = (message) => {
  return {
    type: HIDE_Licence_MESSAGE,
  };
};
export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER,
  };
};
export const userGoogleSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser,
  };
};
export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER,
  };
};
export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser,
  };
};
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};
export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER,
  };
};
export const userTwitterSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser,
  };
};
export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER,
  };
};
export const userGithubSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser,
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};
export const hideModalSelectEstablishment = () => {
  return {
    type: "HIDE_MODAL_SELECT_ESTABLISHMENT",
  };
};
