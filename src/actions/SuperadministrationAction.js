import { classService } from '../_services/class.service';
import {
  FETECHED_ALL_ADMINISTRATION,
  ADD_ADMINISTRATION,
  EDIT_ADMINISTRATION,
  DELETE_ADMINISTRATION,
  HANDLE_REQUEST_CLOSE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from '../constants/ActionTypes';
import baseUrl from '../config/config';
import axios from 'axios';
export const addAdministration = (itemClass) => {
  //1
   return (dispatch) => {
    let apiEndpoint = `/countries_v2?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, itemClass).then((response) => {
      if (response) {
         dispatch({ type: ADD_ADMINISTRATION, payload: response.data });
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
};

export const getCountries= () => {
  return (dispatch) => {
    let apiEndpoint = `/countries_v2?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
         const list = response.data;
        const ClassVirtualList = list.filter((element) => element.status);
        dispatch({
          type: FETECHED_ALL_ADMINISTRATION,
          payload: ClassVirtualList,
        });
      })
      .catch((err) => {});
  };
};

export const getAdministrationDataByEstablishmentId = (establishmentId) => {
  return (dispatch) => {
    let apiEndpoint =
      `/virtual_classes?access_token=${localStorage.token}&filter[where][establishment_id]=` +
      establishmentId;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const ClassVirtualList = list.filter((element) => element.status);

        dispatch({
          type: FETECHED_ALL_ADMINISTRATION,
          payload: ClassVirtualList,
        });
      })
      .catch((err) => {});
  };
};

export function deleteAdministrationData(itemId) {
  return (dispatch) => {
    axios
      .patch(
        `${baseUrl.baseUrl}/virtual_classes/` +
          itemId +
          `?access_token=${localStorage.token}`,
        {
          status: false,
        }
      )
      .then((response) => {
        dispatch({ type: DELETE_ADMINISTRATION, payload: response.data });
      })
      .catch(function(error) {
       });
  };
}

export function editAdministrationData(dataClassVirtual) {
  return (dispatch) => {
    let apiEndpoint =
      `/virtual_classes/` +
      dataClassVirtual.id +
      `?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, dataClassVirtual).then((response) => {
      dispatch({ type: EDIT_ADMINISTRATION, payload: response.data });
      dispatch({
        type: SHOW_SUCCESS_MESSAGE,
        payload: 'La modification est effectuée avec succès',
      });
      setTimeout(() => {
        dispatch({ type: HIDE_SUCCESS_MESSAGE });
      }, 4000);
    });
  };
}

export const serviceAction = {
    addAdministration,
    getCountries

};
