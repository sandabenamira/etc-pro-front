import { classService } from "../_services/class.service";
import {
  FETECHED_ALL_SUPPORT_COURS,
  ADD_SUPPORT_COURS,
  EDIT_SUPPORT_COURS,
  DELETE_SUPPORT_COURS,
  HANDLE_REQUEST_CLOSE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  ARCHIVED_SUPPORT_COURS,
} from "../constants/ActionTypes";
import baseUrl from "../config/config";
import axios from "axios";
export const addSupportCours = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/course_support_folders?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_SUPPORT_COURS, payload: response.data });
      } else {
      }
    });
  };
};

export const addSupportCoursFile = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/course_support_files?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: "ADD_SUPPORT_COURS_FILE", payload: response.data });
      } else {
      }
    });
  };
};

export function getSupportCours() {
  return (dispatch) => {
    let apiEndpoint = `/course_support_folders?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: FETECHED_ALL_SUPPORT_COURS,
          payload: response.data,
        });
      }
    });
  };
}
export function deleteSupportCours(item) {
  console.log("delete", item);
  return (dispatch) => {
    axios
      .patch(
        `${baseUrl.baseUrl}/virtual_class_v4/` +
          item.id +
          `?access_token=${localStorage.token}`,
        {
          status: false,
        }
      )
      .then((response) => {
        console.log("deleteddddddddddddddddddddddv ", response.data);
        dispatch({ type: DELETE_SUPPORT_COURS, payload: response.data });
      })
      .catch(function (error) {});
  };
}

export function editSupportCours(dataSupportCours) {
  return (dispatch) => {
    let apiEndpoint =
      `/virtual_classes/` +
      dataSupportCours.id +
      `?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, dataSupportCours).then((response) => {
      dispatch({ type: EDIT_SUPPORT_COURS, payload: response.data });
      dispatch({
        type: SHOW_SUCCESS_MESSAGE,
        payload: "La modification est effectuée avec succès",
      });
      setTimeout(() => {
        dispatch({ type: HIDE_SUCCESS_MESSAGE });
      }, 4000);
    });
  };
}

export const serviceAction = {
  addSupportCours,
  getSupportCours,
  deleteSupportCours,
  editSupportCours,
 };
