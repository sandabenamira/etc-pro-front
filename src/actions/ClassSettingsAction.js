import { classService } from '../_services/class.service';
import {
  ADD_CLASS_SETTINGS,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_CLASS_SETTINGS,
  EDIT_CLASS_SETTINGS,
  DELETE_CLASS_SETTINGS,
  ARCHIVED_GET_CLASS_SETTINGS,
} from '../constants/ActionTypes';
export function addClassSetting(data) {
  return (dispatch) => {
    let apiEndpoint = `/class_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_CLASS_SETTINGS, payload: response.data });
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

export function editClassSettings(data, id) {
  return (dispatch) => {
    let apiEndpoint = `/class_v4/${id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_CLASS_SETTINGS, payload: response.data });
      }
    });
  };
}

export function getClassSettings(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/class_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${establishementId}&filter[where][and][1][fk_id_school_year]=${schoolYearId}&filter[include]=group`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;
        const SubjectModuleList = list.filter((element) => element.status);
        const ArchivedSubjectModuleList = list.filter(
          (element) => element.status == false
        );
        dispatch({ type: GET_CLASS_SETTINGS, payload: SubjectModuleList });
        dispatch({
          type: ARCHIVED_GET_CLASS_SETTINGS,
          payload: ArchivedSubjectModuleList,
        });
      }
    });
  };
}

export function deleteClassSettings(itemId) {
  return (dispatch) => {
    let apiEndpoint =
      `/class_v4/` +
      itemId.id +
      `?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${localStorage.establishment_id}&filter[where][and][1][fk_id_school_year]=${localStorage.school_year_id}`;
    classService.patch(apiEndpoint, { status: false }).then((response) => {
      if (response) {
        dispatch({ type: DELETE_CLASS_SETTINGS, payload: response.data });
      }
    });
  };
}
