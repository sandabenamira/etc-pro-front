import { classService } from "../_services/class.service";
import {
   SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  ADD_EXAM_TYPE,
  GET_EXAM_TYPE,
  EDIT_EXAM_TYPE,
  DELETE_EXAM_TYPES,
  ARCHIVED_GET_EXAM_TYPES,
} from "../constants/ActionTypes";
export function addExamType(data) {
  return (dispatch) => {
    let apiEndpoint = `/exam_type?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_EXAM_TYPE, payload: response.data });
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

export function editExamType(data) {
  return (dispatch) => {
    let apiEndpoint = `/exam_type/${data.id}?access_token=${localStorage.token}`;
    classService.put(apiEndpoint,data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_EXAM_TYPE, payload: data });
      }
    });
  };
}

export function getExamType(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/exam_type?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${establishementId}&filter[where][and][1][fk_id_school_year]=${schoolYearId}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;
        const ExamTypeList = list.filter((element) => element.status);
        const ArchivedExamTypeList = list.filter(
          (element) => element.status == false
        );
        dispatch({ type: GET_EXAM_TYPE, payload: ExamTypeList });
        dispatch({type: ARCHIVED_GET_EXAM_TYPES,payload: ArchivedExamTypeList,
        });
      }
    });
  };
}

export function deleteExamType(itemId) {
  return (dispatch) => {
    let apiEndpoint =
      `/exam_type/` +
      itemId.id +
      `?access_token=${localStorage.token}`;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        dispatch({ type: DELETE_EXAM_TYPES, payload: response.data });
      })
      .catch(function(error) {});
  };
}
