import { classService } from "../_services/class.service";
import {
  ADD_SUBJECT_MODULE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_SUBJECT_MODULES,
  EDIT_SUBJECT_MODULE,
  DELETE_SUBJECT_MODULES,
  ARCHIVED_GET_SUBJECT_MODULES,
} from "../constants/ActionTypes";
export function addSubjectModule(data) {
  return (dispatch) => {
    let apiEndpoint = `/subjects_module_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_SUBJECT_MODULE, payload: response.data });
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

export function editSubjectModules(data) {
  return (dispatch) => {
    let apiEndpoint = `/subjects_module_v4/${data.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, { name: data.name }).then((response) => {
      if (response) {
        dispatch({ type: EDIT_SUBJECT_MODULE, payload: response.data });
      }
    });
  };
}

export function getSubjectModules(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/subjects_module_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${establishementId}&filter[where][and][1][fk_id_school_year]=${schoolYearId}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;
        const SubjectModuleList = list.filter((element) => element.status);
        const ArchivedSubjectModuleList = list.filter(
          (element) => element.status == false
        );
        dispatch({ type: GET_SUBJECT_MODULES, payload: SubjectModuleList });
        dispatch({type: ARCHIVED_GET_SUBJECT_MODULES,payload: ArchivedSubjectModuleList,
        });
      }
    });
  };
}

export function deleteSubjectModules(itemId) {
  return (dispatch) => {
    let apiEndpoint =
      `/subjects_module_v4/` +
      itemId.id +
      `?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${localStorage.establishment_id}&filter[where][and][1][fk_id_school_year]=${localStorage.school_year_id}`;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        dispatch({ type: DELETE_SUBJECT_MODULES, payload: response.data });
      })
      .catch(function(error) {});
  };
}
