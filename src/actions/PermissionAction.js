import { callService } from '../_services/call.service';
 import {
  GET_PERMISSION_SETTING,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  GET_USER_PERMISSION,
  EDIT_PERMISSION_SETTING,
} from '../constants/ActionTypes';

export const getPermissionSetting = (estabId) => {
  let id = parseInt(estabId, 10);
  return (dispatch) => {
    let apiEndpoint = `/establishments/${id}/permission?access_token=${localStorage.token}`;

    callService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_PERMISSION_SETTING, payload: response.data.permissionList });
      }
    });
  };
};
export const getUserPermissions = (estabId, roleId) => {
  return (dispatch) => {
    let apiEndpoint =
      `/etab_role_permissions?access_token=${localStorage.token}&filter[where][and][0][fk_id_etab]=` +
      estabId +
      `&filter[where][and][1][fk_id_role]=` +
      roleId +
      `&filter[include]=permission`;

    callService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_USER_PERMISSION, payload: response.data });
      }
    });
  };
};
export const applyPermissionSetting = (data, dataForStore, establishmentId, roleId) => {
  let permissionList = { permissionRoleEtab: data };
  return (dispatch) => {
    let apiEndpoint = `/permissions/attributePermission?access_token=${localStorage.token}`;

    callService.put(apiEndpoint, permissionList).then((response) => {
      if (response) {
        dispatch({
          type: EDIT_PERMISSION_SETTING,
          payload: dataForStore,
        });

        dispatch(getUserPermissions(establishmentId, roleId));
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
          payload: "Une erreur est survenue lors de l'affectation merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};
