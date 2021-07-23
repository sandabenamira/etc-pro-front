import axios from 'axios';
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
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
} from '../../constants/ActionTypes'; /* eslint eqeqeq: "off" */

import { isEmail } from '../../constants/validationFunctions';
import cst from '../../config/config';
import { getThemeColor, getAppLanguage, initOptions } from './Setting';
export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user,
  };
};

export const userSignIn = (user) => {
  var login = user.login;
  var password = user.password;
  var User = {};
  if (isEmail(login)) {
    User = {
      email: login,
      password: password,
    };
  } else {
    User = {
      username: login,
      password: password,
    };
  }

  return (dispatch) => {
    axios
      .post(`${cst.baseUrl}/users/login`, User)
      .then((res) => {
        localStorage.setItem('token', res.data);
        // localStorage.setItem('rtvrx_tgfsaju_G0loik', res.data.userId);
        dispatch(userSignInSuccess(user));
      })
      .catch((err) => dispatch(showAuthMessage('Veuillez vérifier votre login et mot de passe')));
  };
};


export const resetAccountPassword = (data) => {
  return function (dispatch) {
    var token = localStorage.getItem('token');
    axios
      .post(`${cst.baseUrl}/users/reset-initial-password?access_token=${token}`, data, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {})
      .catch((error) => {});
  };
};
export const userSignOut = () => {
  axios.post(`${cst.baseUrl}/users/logout?access_token=${localStorage.token}`);
  localStorage.removeItem('token');
  localStorage.removeItem('rtvrx_tgfsaju_G0loik');

  return {
    type: SIGNOUT_USER_SUCCESS,
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
