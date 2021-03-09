
import { classService } from "../_services/class.service";
import {
  ADD,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET,
  EDIT,
  DELETE,
  ARCHIVED,
  PUBLISH,
} from "../constants/ActionTypes";

export function add(data) {
  return (dispatch) => {
    let apiEndpoint = `/ModelName?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD, payload: response.data });
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

export function edit(data) {
  return (dispatch) => {
    let apiEndpoint = `/ModelName/${data.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: EDIT, payload: response.data });
      }
    });
  };
}

export function get(establishment_id, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/ModelName?access_token=${localStorage.token}&filter[include][level]=educationType`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;

        const List = list.filter((element) => {
          return (
            element.status &&
            element.fk_id_school_year===schoolYearId &&
            element.level.educationType.fk_id_establishment===establishment_id
          );
        });
        const ArchivedList = list.filter(
          (element) =>
            element.status===false &&
            element.fk_id_school_year===schoolYearId &&
            element.level.educationType.fk_id_establishment===establishment_id
        );
        dispatch({ type: GET, payload: List });
        dispatch({
          type: ARCHIVED,
          payload: ArchivedList,
        });
      }
    });
  };
}

export function deleteItem(itemId) {
  return (dispatch) => {
    let apiEndpoint = `/ModelName/` + itemId.id;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        dispatch({ type: DELETE, payload: response.data });
      })
      .catch(function(error) {});
  };
}
export function publish(item) {
  return (dispatch) => {
    let apiEndpoint = `/ModelName/` + item.id;
    classService
      .patch(apiEndpoint, {
        status: true,
      })
      .then((response) => {
        dispatch({ type: PUBLISH, payload: response.data });
      })
      .catch(function(error) {});
  };
}


