import { classService } from "../_services/class.service";
import {
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_LEVELS,
  ADD_LEVELS,
  EDIT_LEVELS,
  DELETE_LEVELS,
  ARCHIVED_GET_LEVELS,
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


export function addlevel(data) {
  return (dispatch) => {
    let apiEndpoint = `/level_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_LEVELS, payload: response.data });
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

export function editLevel(data) {
  return (dispatch) => {
    let apiEndpoint = `/level_v4/${data.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_LEVELS, payload: response.data });
      }
    });
  };
}

export function getLevel(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/level_v4?access_token=${localStorage.token}&filter[where][fk_id_school_year]=${schoolYearId}&filter[include][educationType]`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
 
        let levelsListByEstab = [];
        response.data.forEach((element) => {
          if (element.educationType.fk_id_establishment===establishementId) {
            levelsListByEstab.push(element);
          }
        });
        const list = levelsListByEstab;
        const LevelList = list.filter((element) => element.status);
        const ArchivedLevelsList = list.filter(
          (element) => element.status===false
        );
         dispatch({ type: GET_LEVELS, payload: LevelList });
        dispatch({ type: ARCHIVED_GET_LEVELS, payload: ArchivedLevelsList });
      }
    });
  };
}

export function deletelevel(itemId) {
  return (dispatch) => {
    let apiEndpoint =
      `/level_v4/` +
      itemId.id +
      `?access_token=${localStorage.token}`;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        dispatch({ type: DELETE_LEVELS, payload: response.data });
      })
      .catch(function(error) {});
  };
}
