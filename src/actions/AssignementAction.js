import { classService } from '../_services/class.service';
import {
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_ASSIGNEMENT_COURSE,
  ADD_ASSIGNEMENT_COURSE,
  DELETE_ASSIGNEMENT_COURSE,
  ARCHIVED_GET_ASSIGNEMENT_COURSE,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */

import _ from 'lodash';

export function addAssignementCourse(dataAssignementCourse) {
  return (dispatch) => {
    let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, dataAssignementCourse).then((response) => {
      if (response) {
        let mergeData = _.merge(response.data, dataAssignementCourse);

        dispatch({ type: ADD_ASSIGNEMENT_COURSE, payload: mergeData });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "L'affectation est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
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
          (element) => element.status && element.class.fk_id_establishment == establishementId && element.class.fk_id_school_year == schoolYearId
        );
        const ArchivedAssignementCourseList = response.data.filter(
          (element) =>
            element.status == false && element.class.fk_id_establishment == establishementId && element.class.fk_id_school_year == schoolYearId
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

export function deleteAssignementCourse(data) {
  return (dispatch) => {
    data.map((element) => {
      let apiEndpoint = `/assignment_class_subjects/${element.id}?access_token=${localStorage.token}`;
      classService.patch(apiEndpoint, element).then((response) => {
        if (response) {
          dispatch({ type: DELETE_ASSIGNEMENT_COURSE, payload: response.data });
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: "L'affectation est effectuée avec succès",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        } else {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }
      });
      return true;
    });
  };
}
