import { service } from "../services/service";
import {
  GET_INSCRIPTION,
  ADD_INSCRIPTION,
  EDIT_INSCRIPTION,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE_INSC,
  SHOW_ERROR_MESSAGE,
  SHOW_MESSAGE_INSC,
  HIDE_ERROR_MESSAGE,
  SHOW_ERROR_MESSAGE_INSC,
  DELETE_INSCRIPTION,
} from "../../constants/ActionTypes";

export function getInscriptions() {
  return (dispatch) => {
    //Now, dispatch some actions -The store calls rootReducer(state, action)
    let apiEndpoint = `/inscriptions`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_INSCRIPTION, payload: response.data });
      }
    });
  };
}

export function addInscription(data) {
  return (dispatch) => {
    console.log(data);
    let apiEndpoint = `/inscriptions`;
    service
      .post(apiEndpoint, data)
      .then((response) => {
        dispatch({ type: ADD_INSCRIPTION, payload: data });
        dispatch({
          type: SHOW_MESSAGE_INSC,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE_INSC });
        }, 4000);
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
            : err.response.data.error.message === "Internal Server Error"
            ? "name duplicated"
            : err.response.data.error.message;
        dispatch({
          type: SHOW_ERROR_MESSAGE_INSC,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
}

export const editInscription = (data) => {
  console.log(data, "----------editInscription");
  return (dispatch) => {
    let apiEndpoint = `/inscriptions/` + data.id + "/status";

    service
      .patch(apiEndpoint, data)
      .then((res) => {
        dispatch({
          type: EDIT_INSCRIPTION,
          payload: data,
        });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La modification  est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE_INSC });
        }, 4000);
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
            : err.response.data.error.message === "Internal Server Error"
            ? "name duplicated"
            : err.response.data.error.message;
        dispatch({
          type: SHOW_ERROR_MESSAGE_INSC,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
};

export const deleteInscription = (id) => async (dispatch) => {
  try {
    let apiEndpoint = `/inscriptions/` + id;

    await service.del(apiEndpoint, id);
    dispatch({
      type: DELETE_INSCRIPTION,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
