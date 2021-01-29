import { classService } from "../_services/class.service";
import {
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_ASSIGNEMENT_COURSE,
  ADD_ASSIGNEMENT_COURSE,
  EDIT_ASSIGNEMENT_COURSE,
  DELETE_ASSIGNEMENT_COURSE,
  ARCHIVED_GET_ASSIGNEMENT_COURSE,
} from "../constants/ActionTypes";

export function addAssignementCourse(item) {
  return (dispatch) => {
    let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, item).then((response) => {
      if (response) {
        let newObject = {
          ...response.data,
          class: item.class,
        };
        dispatch({ type: ADD_ASSIGNEMENT_COURSE, payload: newObject });
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

export function getAssignementCourse(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}&filter[include]=class&filter[include]=subject&filter[include]=course`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const assignementCourseList = response.data.filter(
          (element) =>
            element.status &&
            element.class.fk_id_establishment == establishementId &&
            element.class.fk_id_school_year == schoolYearId
        );
        const ArchivedAssignementCourseList = response.data.filter(
          (element) =>
            element.status == false &&
            element.class.fk_id_establishment == establishementId &&
            element.class.fk_id_school_year == schoolYearId
        );
        dispatch({
          type: GET_ASSIGNEMENT_COURSE,
          payload: assignementCourseList,
        });
        dispatch({
          type: ARCHIVED_GET_ASSIGNEMENT_COURSE,
          payload: ArchivedAssignementCourseList,
        });
      }
    });
  };
}

export function deleteAssignementCourse(item) {
  return (dispatch) => {
    let apiEndpoint = `/assignment_class_subjects/${item.id}?access_token=${localStorage.token}`;

    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        if (response) {
          const list = response.data;

          dispatch({ type: DELETE_ASSIGNEMENT_COURSE, payload: response.data });
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: "La suppression est effectuée avec succès",
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
      })
      .catch(function(error) {});
  };
}

export function editAssignementCourse(data) {
  return (dispatch) => {
    let apiEndpoint = `/assignment_class_subjects/${data.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        if (response) {
          const list = response.data;

          dispatch({ type: EDIT_ASSIGNEMENT_COURSE, payload: response.data });
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: "La modification est effectuée avec succès",
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
      }
    });
  };
}
