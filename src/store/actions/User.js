import { service } from "../services/service";
import {
  GET_USERR,
  ADD_USER,
  EDIT_USER,
  HIDE_ERROR_ALERTE_USER,
  SHOW_ERROR_ALERTE_USER,
  GET_USERPROFILE,
  GET_USERSPROFILES,
  SHOW_ALERTE_USER,
} from "../../constants/ActionTypes";

export function addUser(data) {
  return (dispatch) => {
    console.log(data, "add User-------------------------------");

    let apiEndpoint = `/users`;
    service
      .post(apiEndpoint, data)
      .then((response) => {
        if (response) {
          dispatch({ type: ADD_USER, payload: response.data });
          console.log("dataaaaa.payload", response.data);
          dispatch({
            type: SHOW_ALERTE_USER,
            payload: "L'ajout est effectuée avec succès",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_ALERTE_USER });
          }, 2000);
        }
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Erreur : Échec de la demande avec le code d'état 500"
            : "Erreur interne du serveur";

        dispatch({
          type: SHOW_ERROR_ALERTE_USER,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_USER });
        }, 2000);
      });
  };
}

export function getUsers() {
  return (dispatch) => {
    let apiEndpoint = `/users`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: GET_USERR,
          payload: response.data,
        });
      }
    });
  };
}

export const editUserisArchived = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/users/` + data.id + "/isArchived";
    service
      .patch(apiEndpoint, data)
      .then((res) => {
        dispatch({
          type: EDIT_USER,
          payload: data,
        });
        dispatch({
          type: SHOW_ALERTE_USER,
          payload: "La modification  est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_USER });
        }, 3000);
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
            : err.response.data.error.message === "Erreur interne du serveur"
            ? "duplication de nom"
            : err.response.data.error.message;
        dispatch({
          type: SHOW_ERROR_ALERTE_USER,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_USER });
        }, 3000);
      });
  };
};

export function getUserProfile() {
  return (dispatch) => {
    let apiEndpoint = `/auth/me`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: GET_USERPROFILE,
          payload: response.data,
        });
      }
    });
  };
}
export function getUsersProfiles() {
  return (dispatch) => {
    let apiEndpoint = `/auth/all`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: GET_USERSPROFILES,
          payload: response.data,
        });
      }
    });
  };
}
export const editUser = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/users/` + data.id;
    // service
    //   .patch(apiEndpoint, data)
    //   .then((res) => {
        dispatch({
          type: EDIT_USER,
          payload: data,
        });
        dispatch({
          type: SHOW_ALERTE_USER,
          payload: "La modification  est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_USER });
        }, 3000);
      // })
      // .catch((err) => {
      //   let errorMsg =
      //     err.response === undefined
      //       ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
      //       : err.response.data.error.message === "Erreur interne du serveur"
      //       ? "duplication de nom"
      //       : err.response.data.error.message;
      //   dispatch({
      //     type: SHOW_ERROR_ALERTE_USER,
      //     payload: errorMsg,
      //   });
      //   setTimeout(() => {
      //     dispatch({ type: HIDE_ERROR_ALERTE_USER });
      //   }, 3000);
      // });
  };
};
