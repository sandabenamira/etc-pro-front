import { service } from "../services/service";
import {
  GET_USER,
  ADD_USER,
  EDIT_USER,
  SHOW_MESSAGE_USER,
  SHOW_ERROR_MESSAGE_USER,HIDE_ERROR_ALERTE_USER,SHOW_ERROR_ALERTE_USER,
  HIDE_MESSAGE_USER,SHOW_ALERTE_USER
} from "../../constants/ActionTypes";

export function addUser(data) {
  return (dispatch) => {
    console.log(data, "add User-------------------------------");

    let apiEndpoint = `/users`;
    service
      .post(apiEndpoint, data)
      .then((response) => {
        if (response) {
          dispatch({ type: ADD_USER });
           dispatch({
            type: SHOW_MESSAGE_USER,
          });
          setTimeout(() => {
            dispatch({ type: HIDE_MESSAGE_USER });
          }, 4000);
        }
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Error: Request failed with status code 500"
            : "Internal Server Error";

        dispatch({
          type: SHOW_ERROR_MESSAGE_USER,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_MESSAGE_USER });
        }, 4000);
      });
  };
}

export function getUsers() {
  return (dispatch) => {
    let apiEndpoint = `/users`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: GET_USER,
          payload: response.data,
        });
      }
    });
  };
}

export const editUser = (data) => {
  console.log(data, "----------editUser");
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
            : err.response.data.error.message === "Internal Server Error"
            ? "name duplicated"
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
