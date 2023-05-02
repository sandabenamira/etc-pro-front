import { service } from "../services/service";
import {
  GET_AGENCE,
  ADD_AGENCE,
  EDIT_AGENCE,
  SET_AGENCE,
  EDIT_AGENCE_E,
  SHOW_ERROR_ALERTE_AGENCE,
  HIDE_ERROR_ALERTE_AGENCE,
  SHOW_ALERTE_AGENCE,
} from "../../constants/ActionTypes";

export function addAgence(data) {
  return (dispatch) => {
    console.log(data, "add AGENCE-------------------------------");
    let apiEndpoint = `/agences`;
    service
      .post(apiEndpoint, data)
      .then((response) => {
        dispatch({ type: ADD_AGENCE, payload: response.data });

        dispatch({
          type: SHOW_ALERTE_AGENCE,
          payload: "L'ajout est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_AGENCE });
        }, 2000);
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Erreur : Échec de la demande avec le code d'état 500"
            : "Erreur interne du serveur";

        dispatch({
          type: SHOW_ERROR_ALERTE_AGENCE,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_AGENCE });
        }, 2000);
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
            : err.response.data.error.message === "Erreur interne du serveur"
            ? "duplication de nom"
            : err.response.data.error.message;
        dispatch({
          type: SHOW_ERROR_ALERTE_AGENCE,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_ALERTE_AGENCE });
        }, 3000);
      });
  };
};

export const setCurrentAgence = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_AGENCE, payload: data });
  };
};
export const editAgence2 = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_AGENCE_E,
      payload: data,
    });

    dispatch({
      type: SHOW_ALERTE_AGENCE,
      payload: "La modification  est effectuée avec succès",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_ALERTE_AGENCE });
    }, 3000);
  };
};
