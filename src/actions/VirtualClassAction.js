import { classService } from '../_services/class.service';
import {
  FETECHED_ALL_VIRTUAL_CLASS,
  ADD_VIRTUAL_CLASS,
  EDIT_VIRTUAL_CLASS,
  DELETE_VIRTUAL_CLASS,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  ARCHIVED_VIRTUAL_CLASS,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */

import baseUrl from '../config/config';
import axios from 'axios';
export const addClassVirtual = (virtuelClassData) => {
  return (dispatch) => {
    let apiEndpoint = `/virtual_class_v4/addVirtualClass?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, virtuelClassData).then((response) => {
      if (response) {
         response.data.virtualClass.forEach((virtualClass) => {
          dispatch({ type: ADD_VIRTUAL_CLASS, payload: virtualClass });
        });

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
};

export function getClassesVirtual(establishmentId, schoolYearId, roleId, roleUserId) {
  return (dispatch) => {
    let apiEndpoint = `/virtual_class_v4/fetchVirtualClassByRole/${establishmentId}/${schoolYearId}/${roleId}/${roleUserId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let ClassesVirtualList = response.data.virtualClassData;
        let ArchivedClassVirtualsList = [];
        let VirtualClassUnarchived = [];

        ClassesVirtualList.map((elementItem) => {
          if (elementItem.status === false) {
            ArchivedClassVirtualsList.push(elementItem);
          } else {
            VirtualClassUnarchived.push(elementItem);
          }
          return true;
        });

        dispatch({
          type: FETECHED_ALL_VIRTUAL_CLASS,
          payload: VirtualClassUnarchived,
        });
        dispatch({
          type: ARCHIVED_VIRTUAL_CLASS,
          payload: ArchivedClassVirtualsList,
        });
      }
    });
  };
}

export function deleteClassVirtual(item) {
  return (dispatch) => {
    axios
      .patch(`${baseUrl.baseUrl}/courses_virtuel_classes/` + item.idCourseVirtualclass + `?access_token=${localStorage.token}`, {
        status: false,
      })
      .then((response) => {
        if (response) {
          dispatch({ type: DELETE_VIRTUAL_CLASS, payload: item });
        }
      })
      .catch(function (error) {});
  };
}

export function editClassVirtual(itemClass) {
  return (dispatch) => {
    let dataVirtualClass = {
      date_virtual_class: itemClass.dateVirtualClass,
      virtual_class_name: itemClass.virtualClassName,
      class_url: itemClass.classUrl,
      password: itemClass.password,
      start_time_class: itemClass.startTimeClass,
      end_time_class: itemClass.endTimeClass,
      id: itemClass.id,
      description: itemClass.description,
    };

    let apiEndpoint = `/virtual_class_v4/${itemClass.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, dataVirtualClass).then((response) => {
      if (response) {
        dispatch({ type: EDIT_VIRTUAL_CLASS, payload: response.data });
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
          payload: "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}

export const serviceAction = {
  addClassVirtual,
  getClassesVirtual,
  deleteClassVirtual,
  editClassVirtual,
};
