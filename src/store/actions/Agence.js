import { service } from "../services/service";
import {
  GET_AGENCE,
  ADD_AGENCE,
  EDIT_AGENCE,
  DELETE_AGENCE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../../constants/ActionTypes";

export function addAgence(data) {
  return (dispatch) => {
    console.log(data, "add AGENCE-------------------------------");
     let apiEndpoint = `/agences`;
    service.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_AGENCE, payload: response.data });
      }
    });
  };
}

export function getAgences() {
  return (dispatch) => {
    let apiEndpoint = `/agences?entrepriseId=1`;
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
    // let apiEndpoint = `/agences/` + data.id;
    // service
    //   .patch(apiEndpoint, data)
    //   .then((res) => {
    dispatch({
      type: EDIT_AGENCE,
      payload: data,
    });
    //       dispatch({
    //         type: SHOW_SUCCESS_MESSAGE,
    //         payload: "La modification  est effectuée avec succès",
    //       });
    //       setTimeout(() => {
    //         dispatch({ type: HIDE_SUCCESS_MESSAGE });
    //       }, 4000);
    //     })
    //     .catch((err) => {
    //       let errorMsg =
    //         err.response === undefined
    //           ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
    //           : err.response.data.error.message === "Internal Server Error"
    //           ? "name duplicated"
    //           : err.response.data.error.message;
    //       dispatch({
    //         type: SHOW_ERROR_MESSAGE,
    //         payload: errorMsg,
    //       });
    //       setTimeout(() => {
    //         dispatch({ type: HIDE_ERROR_MESSAGE });
    //       }, 4000);
    //     });
  };
};
export const deleteAgence = (id) => async (dispatch) => {
  try {

    dispatch({
      type: DELETE_AGENCE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
