import axios from "axios";
import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
   SHOW_ERROR_MESSAGE_FORGOT,
  SHOW_MESSAGE_FORGOT,
  HIDE_MESSAGE_FORGOT, 
} from "../../constants/ActionTypes"; /* eslint eqeqeq: "off" */
import cst from "../../config/config";

export const userSignIn = (user) => {
  return (dispatch) => {
    axios
      .post(`${cst.baseUrl}/auth/signin`, user)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        dispatch(userSignInSuccess(response.data.accessToken));
        return response.data;
      })
      .catch((err) =>
        dispatch(
          showAuthMessage("Veuillez vérifier votre login ou mot de passe")
        )
      );
  };
};
 

export const verifMail = (mail) => {
  return (dispatch) => {
    axios
      .post(`${cst.baseUrl}/auth/verifmail`, mail)
      .then((response) => {
        dispatch({
          type: SHOW_MESSAGE_FORGOT,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_MESSAGE_FORGOT });
        }, 4000);
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Error: Request failed with status code 500"
            : "Internal Server Error";

        dispatch({
          type: SHOW_ERROR_MESSAGE_FORGOT,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_MESSAGE_FORGOT });
        }, 4000);
      });
  };
};
export const userSignOut = () => {
  // axios.post(`${cst.baseUrl}/users/logout?access_token=${localStorage.token}`);
  localStorage.removeItem("token");
   localStorage.clear();
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

//donner history location
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
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
