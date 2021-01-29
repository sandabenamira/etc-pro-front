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
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  GET_USER_PROFILE,
  THEME_COLOR,
  FETECHED_ALL_SCHOOL_YEAR_ETAB,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  GET_ESTABLISHMENT_INFORMATIONS
} from '../constants/ActionTypes';
import cst from '../config/config';
import { getError } from '../Error/Error';
import { getThemeColor, getAppLanguage, initCalendar } from './Setting';
import _ from 'lodash';
import { roleIdAdmin, roleIdSuperAdmin } from '../config/config';
export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user,
  };
};

export const userSignIn = (user) => {
  var email = user.email.toLowerCase().trim();
  var password = user.password;
  const User = {
    email,
    password,
  };
  return (dispatch) => {
    axios
      .post(`${cst.baseUrl}/users/login`, User)
      .then((res) => {
        // let id = res.data.id;
        localStorage.setItem('token', res.data.id);
        localStorage.setItem('user_id', res.data.userId);
        dispatch(getProfile(res.data.userId));
      })
      .catch((err) => dispatch(showAuthMessage('Veuillez vérifier votre login et mot de passe')));
  };
};

export const getProfile = (userId) => {
  let user = {};

  return function(dispatch) {
    var token = localStorage.getItem('token');
    axios
      .get(`${cst.baseUrl}/profiles/getprofile/${userId}?access_token=${token}`)
      .then((res) => {
        let result = res.data.profile[0];
        user = result.user;
        dispatch(getThemeColor(result.setting.theme_color));
        dispatch(getAppLanguage(result.setting.app_lang));
        dispatch(
          initCalendar(result.setting.start_time_calendar, result.setting.end_time_calendar)
        );
        localStorage.setItem('profileId', result.id);
        localStorage.setItem('roles_id', result.role_id);
        localStorage.setItem('appLang', result.app_lang);
        localStorage.setItem('first_connexion', JSON.stringify(result.user.first_connexion));
        // localStorage.setItem('user', JSON.stringify(result.user));
        dispatch(userSignInSuccess(result.user));
        if (result.establishments.length > 1) {
          dispatch({
            type: 'SOW_MODAL_SELECT_ESTABLISHMENT',
            payload: result,
          });
        } else {
          if (_.isEmpty(result.establishments[0].establishment.licence)) {
            dispatch(userSignOut());
            if (result.role_id === roleIdAdmin) {
              dispatch(
                showLicenceMessage(
                  'Votre licence a expiré, Merci de contacter le super admin Educap'
                )
              );
            } else if (result.role_id === roleIdSuperAdmin) {
              dispatch(showLicenceMessage('Votre licence a expiré'));
            } else {
              dispatch(
                showLicenceMessage(
                  "Vous avez un problème de paiement, merci de contacter l'administrateur de votre école"
                )
              );
            }
          } else {
            const userProfile = Object.assign({}, result, {
              establishment_id: result.establishments[0].establishment_id,
            });
            dispatch({
              type: GET_USER_PROFILE,
              payload: userProfile,
            });
            localStorage.setItem('establishment_id', result.establishments[0].establishment_id);
            localStorage.setItem(
              'school_year_id',
              result.establishments[0].establishment.fk_id_school_year_current
            );
           
            dispatch(
              getEstablishmentsModules(
                result.establishments[0].establishment.licence[0].licenceModule              )
            );
            dispatch(
              getEstablishmentsInformations(
                result.establishments[0].establishment            )
            );

          }
        }

        dispatch(getSchoolYear());
      })
      .catch((err) => {});
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
    type: 'GET_ESTABLISHMENT_MODULE',
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

export function getUserProfile(userId) {
  return function(dispatch) {
    axios
      .get(`${cst.baseUrl}/profiles/getprofile/${userId}?access_token=${localStorage.token}`)
      .then((res) => {
        const result = res.data.profile[0];
        let userProfileEstab = {
          ...result,
          establishment_id: localStorage.establishment_id,
          school_year_id: result.establishments[0].establishment.fk_id_school_year_current,
          current_school_year_id: result.establishments[0].establishment.fk_id_school_year_current,
          school_year_name: result.establishments[0].establishment.licence[0].schoolYear.name,
        };
        dispatch({
          type: GET_USER_PROFILE,
          payload: userProfileEstab,
        });
        /////
        axios
          .get(
            `${cst.baseUrl}/settings/${res.data.profile[0].setting_id}?access_token=${localStorage.token}`
          )
          .then((res) => {
            dispatch(getThemeColor(res.data.theme_color));
            dispatch(getAppLanguage(res.data.app_lang));
            dispatch(initCalendar(res.data.start_time_calendar, res.data.end_time_calendar));
          });
        /////////////
      })
      .catch((err) => {});
  };
}

function getprofile(userId, dispatch) {
  axios
    .get(
      `${cst.baseUrl}/profiles/findOne?access_token=${localStorage.token}&filter={"where":{"user_id":` +
        userId +
        `}}`
    )
    .then((res) => {
      const profiles = res.data;
      localStorage.setItem('profileId', profiles.id);
      localStorage.setItem('roles_id', profiles.role_id);
      localStorage.setItem('establishment_id', profiles.establishment_id);
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(userSignOut());
      }
    });
}

export const userSignOut = () => {
  axios.post(`${cst.baseUrl}/users/logout?access_token=${localStorage.token}`);
  localStorage.removeItem('token');
  localStorage.removeItem('profileId');
  localStorage.removeItem('roles_id');
  localStorage.removeItem('user_id');
  localStorage.removeItem('establishment_id');

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
    type: 'HIDE_MODAL_SELECT_ESTABLISHMENT',
  };
};
