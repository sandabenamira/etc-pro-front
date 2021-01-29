import { classService } from "../_services/class.service";
import {
  ADD_SECTION,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_SECTIONS,
  EDIT_SECTION,
  DELETE_SECTIONS,
  ARCHIVED_GET_SECTIONS,
  PUBLISH_SECTIONS,
} from "../constants/ActionTypes";

export function addSection(data) {
  return (dispatch) => {
    let apiEndpoint = `/section_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_SECTION, payload: response.data });
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

export function editSection(data) {
  return (dispatch) => {
    let apiEndpoint = `/section_v4/${data.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_SECTION, payload: response.data });
      }
    });
  };
}

export function getSection(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/section_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${establishementId}&filter[where][and][1][fk_id_school_year]=${schoolYearId}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;
        const SectionList = list.filter((element) => {
          return element.status;
        });
        const ArchivedSectionList = list.filter(
          (element) => element.status == false
        );
        dispatch({ type: GET_SECTIONS, payload: SectionList });
        dispatch({
          type: ARCHIVED_GET_SECTIONS,
          payload: ArchivedSectionList,
        });
      }
    });
  };
}

export function deleteSection(itemId) {
  return (dispatch) => {
    let apiEndpoint = `/section_v4/` + itemId.id;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        dispatch({ type: DELETE_SECTIONS, payload: response.data });
      })
      .catch(function(error) {});
  };
}
export function publishSection(item) {
  return (dispatch) => {
    let apiEndpoint = `/section_v4/` + item.id;
    classService
      .patch(apiEndpoint, {
        status: true,
      })
      .then((response) => {
        dispatch({ type: PUBLISH_SECTIONS, payload: response.data });
      })
      .catch(function(error) {});
  };
}

function getSectionsByLevel(sections, levelId) {
  let sectionList = [];
  sectionList = Array.from(sections).filter(
    (element) => element.fk_id_level_v4 === levelId
  );
  return sectionList;
}
export { getSectionsByLevel };
