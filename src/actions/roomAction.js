import { classService } from "../_services/class.service";
import baseUrl from "../config/config";
import axios from "axios";
import {
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  FETECHED_ALL_ROOMS,
  FETECHED_ALL_ROOMS_BY_ESTABLISHMENET_ID,
  ADD_ROOM,
  EDIT_ROOM,
  DELETE_ROOM
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */

export const getRooms = () => {
  return (dispatch) => {
    let apiEndpoint = `/rooms?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        dispatch({
          type: FETECHED_ALL_ROOMS,
          payload: response.data,
        });
      })
      .catch((err) => {});
  };
};

export function getRoomsByEstablshment(establishmentId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint =
      `/rooms?access_token=${localStorage.token}&filter[where][and][0][establishment_id]= ${establishmentId}&filter[where][and][1][fk_id_school_year]=` +
      schoolYearId;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const Room_list = response.data;
        const Rooms_list = Room_list.filter((element) => element.status);
        dispatch({
          type: FETECHED_ALL_ROOMS_BY_ESTABLISHMENET_ID,
          payload: Rooms_list,
        });
       })
      .catch((error) => {});
  };
}
export function addRoom(classroomData) {
  return (dispatch) => {
    let apiEndpoint = `/rooms?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, classroomData).then((response) => {
      if (response.data) {
        dispatch({
              type: ADD_ROOM,
              payload: response.data,
            });
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      } else {
         dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La création est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      }
    })
    };
}
export function editRoom(classroomData) {
  return (dispatch) => {
    let apiEndpoint =`/rooms/` + classroomData.id + `?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, classroomData).then((response) => {
      if(response){
        dispatch({
          type: EDIT_ROOM,
          payload: response.data,
        });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La modification est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      }
       else {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload:
              "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        } 
    });
  };
}

export function deleteRoom(itemId) {
  return (dispatch) => {
    axios
      .patch(
        `${baseUrl.baseUrl}/rooms/` +
          itemId +
          `?access_token=${localStorage.token}`,
        {
          status: false,
        }
      )
      .then((response) => {
        dispatch({
          type: DELETE_ROOM,
          payload: response.data,
        });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "L'archivage  est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch(function(error) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de l'archivage merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
       });
  };
}
