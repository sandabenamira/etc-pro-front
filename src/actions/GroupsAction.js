import { classService } from '../_services/class.service';
import {
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_GROUPS,
  ADD_GROUPS,
  EDIT_GROUPS,
  DELETE_GROUPS,
  ARCHIVED_GET_GROUPS,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */

export function addGroup(data, dataClass) {
  return (dispatch) => {
    let apiEndpoint = `/groups?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        let dataStore = { ...dataClass, group: [response.data] };
        dispatch({ type: ADD_GROUPS, payload: dataStore });
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

export function editGroup(data) {
  return (dispatch) => {
    let apiEndpoint = `/group_v4/${data.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_GROUPS, payload: response.data });
      }
    });
  };
}

export function getGroup(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint =
      `/class_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=` +
      establishementId +
      `&filter[where][and][1][fk_id_school_year]=` +
      schoolYearId +
      `&filter[include]=group`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let groupList = [];
        let ArchivedGroupList = [];
        response.data.map((element) => {
          if (element.status && element.group.length > 0) {
            let listTrue = [];
            let listFalse = [];

            listTrue = element.group.filter((group) => group.status);
            listFalse = element.group.filter((group) => !group.status);
            groupList.push({ ...element, group: listTrue });
            if (listFalse.length > 0) {
              ArchivedGroupList.push({ ...element, group: listFalse });
            }
          }
          return true;
        });

        dispatch({ type: GET_GROUPS, payload: groupList });
        dispatch({ type: ARCHIVED_GET_GROUPS, payload: ArchivedGroupList });
      }
    });
  };
}

export function deleteGroup(itemId) {
  return (dispatch) => {
    let apiEndpoint = `/group_v4/` + itemId.id + `?access_token=${localStorage.token}`;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        dispatch({ type: DELETE_GROUPS, payload: response.data });
      })
      .catch(function (error) {});
  };
}
