import { classService } from "../_services/class.service";
import {
  ADD_AGENCE,
  GET_AGENCE,
  DELETE_AGENCE,
  ARCHIVED_GET_AGENCE,
  EDIT_AGENCE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */

export function addAgence(data) {
  return (dispatch) => {
    let apiEndpoint = `/agencies?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_AGENCE, payload: response.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La création est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}
export function getAgence(establishmentId) {
  return (dispatch) => {
    let apiEndpoint =
      `/agencies?access_token=${localStorage.token}&filter[where][fk_id_establishment]=` +
      establishmentId;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let listAgence = response.data.filter((element) => element.status);
        let listAgenceArchived = response.data.filter(
          (element) => !element.status
        );
        dispatch({ type: GET_AGENCE, payload: listAgence });
        dispatch({ type: ARCHIVED_GET_AGENCE, payload: listAgenceArchived });
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}

export function editAgence(data, id) {
  return (dispatch) => {
    let apiEndpoint = `/agencies/${id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_AGENCE, payload: response.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La modification d'agence est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "Une erreur est survenue lors de la modification",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      }
    });
  };
}

export function deleteAgence(itemId) {
  return (dispatch) => {
    let apiEndpoint =
      `/agencies/` + itemId.id + `?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, { status: false }).then((response) => {
      if (response) {
        dispatch({ type: DELETE_AGENCE, payload: response.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La suppression d'agence est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      }
    });
  };
}
