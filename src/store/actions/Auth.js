import axios from "axios";
import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  GET_USERSPROFILES,
} from "../../constants/ActionTypes"; /* eslint eqeqeq: "off" */
import cst from "../../config/config";

export const userSignIn = (user) => {
  return (dispatch) => {
    axios
      .post(`${cst.baseUrl}/auth/signin`, user)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
 
        // localStorage.setItem('rtvrx_tgfsaju_G0loik', response.data.userId);
        dispatch(userSignInSuccess(response.data.accessToken));

        return response.data;
      })
      .catch((err) =>
        dispatch(
          showAuthMessage("Veuillez vérifier votre login et mot de passe")
        )
      );
   
  };
 };
export const getUsersProfiles = () => {
  return (dispatch) => {
    var token = localStorage.getItem("token");
    let apiEndpoint = `${cst.baseUrl}/auth/me`;
    axios
      .get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response) {
          dispatch({
            type: GET_USERSPROFILES,
            payload: response.data,
          });
        }
      });
  };
};

export const userSignOut = () => {
  // axios.post(`${cst.baseUrl}/users/logout?access_token=${localStorage.token}`);
  localStorage.removeItem("token");
  // localStorage.clear();
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};

export const resetAccountPassword = (data) => {
  return function (dispatch) {
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

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
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
