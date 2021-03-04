import { classService } from '../_services/class.service';
import {
  ADD_SCHOOL_SESSION,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_SCHOOL_SESSION,
  EDIT_SCHOOL_SESSION,
  DELETE_SCHOOL_SESSION,
  ARCHIVED_GET_SCHOOL_SESSION,
} from '../constants/ActionTypes';
export function addSchoolSession(data) {
  let newObj = {
    name: data.name,
    start_date: data.start_date,
    end_date: data.end_date,
    fk_id_school_year: data.fk_id_school_year,
    fk_id_education_type_v4: data.fk_id_education_type_v4,
    status: true,
  };
  return (dispatch) => {
    let apiEndpoint = `/school_session_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, newObj).then((response) => {
      if (response) {
        let object = {
          ...response.data,
          educationType: data.educationType,
        };

        dispatch({ type: ADD_SCHOOL_SESSION, payload: object });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'La création est effectuée avec succès',
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

export function editSchoolSession(data) {
  return (dispatch) => {
    let apiEndpoint = `/school_session_v4/${data.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        let object = {
          ...response.data,
          educationType: data.educationType,
        };
        dispatch({ type: EDIT_SCHOOL_SESSION, payload: object });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'La modification est effectuée avec succès',
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

export function getSchoolSession(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/school_session_v4?access_token=${localStorage.token}&filter[include][educationType]`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;
        const SchoolSessionList = list.filter(
          (element) =>
            element.status && element.educationType.fk_id_establishment === establishementId && element.educationType.fk_id_school_year === schoolYearId
        );

        const ArchivedSchoolSessionListList = list.filter(
          (element) =>
            element.status === false &&
            element.educationType.fk_id_establishment === establishementId &&
            element.educationType.fk_id_school_year === schoolYearId
        );

        dispatch({ type: GET_SCHOOL_SESSION, payload: SchoolSessionList });
        dispatch({
          type: ARCHIVED_GET_SCHOOL_SESSION,
          payload: ArchivedSchoolSessionListList,
        });
      }
    });
  };
}

export function deleteSchoolSession(itemId) {
  return (dispatch) => {
    let apiEndpoint = `/school_session_v4/` + itemId.id + `?access_token=${localStorage.token}`;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        dispatch({ type: DELETE_SCHOOL_SESSION, payload: response.data });
      })
      .catch(function(error) {});
  };
}
