import { service } from "../services/service";
import {
  GET_AGENCE,
  ADD_AGENCE,
  EDIT_AGENCE,
  SHOW_MESSAGE_AGENCE,
  HIDE_MESSAGE_AGENCE,
  SHOW_ERROR_MESSAGE_AGENCE,SHOW_ERROR_ALERTE_AGENCE,HIDE_ERROR_ALERTE_AGENCE,SHOW_ALERTE_AGENCE
} from "../../constants/ActionTypes";
//import configureStore from "../index";
import configureStore from "./../../store";
const store = configureStore();
const data = store.auth;
console.log("data", data);

export function addAgence(data) {
  return (dispatch) => {
    console.log(data, "add AGENCE-------------------------------");
    let apiEndpoint = `/agences`;
    service
      .post(apiEndpoint, data)
      .then((response) => {
        dispatch({ type: ADD_AGENCE, payload: response.data });

        dispatch({
          type: SHOW_MESSAGE_AGENCE,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_MESSAGE_AGENCE });
        }, 4000);
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Error: Request failed with status code 500"
            : "Internal Server Error";

        dispatch({
          type: SHOW_ERROR_MESSAGE_AGENCE,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_MESSAGE_AGENCE });
        }, 3000);
      });
  };
}

export function getAgences() {
  return (dispatch) => {
    let apiEndpoint = `/agences`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: GET_AGENCE,
          payload: response.data,
        });
      }
    });
  };
}

export const editAgence = (data) => {
  console.log(data, "----------editAgence");
  return (dispatch) => {
    let apiEndpoint = `/agences/` + data.id + "/isArchived";
    service
      .patch(apiEndpoint, data)
      .then((res) => {
        dispatch({
          type: EDIT_AGENCE,
          payload: data,
        });
        dispatch({
          type: SHOW_ALERTE_AGENCE,
          payload: "La modification  est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_AGENCE });
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
          type: SHOW_ERROR_ALERTE_AGENCE,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_AGENCE });
        }, 4000);
      });
  };
};
