import { service } from "../services/service";
import {
  GET_USER,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../../constants/ActionTypes";
var token = localStorage.getItem("token");
export function addUser(data) {
  return (dispatch) => {
    console.log(data, "add User-------------------------------");
    dispatch({ type: ADD_USER, payload: data });
    let apiEndpoint = `/users`;
    service
      .post(
        apiEndpoint,
        { headers: { Authorization: `Bearer ${token}` } },
        data
      )
      .then((response) => {
        if (response) {
          dispatch({ type: ADD_USER, payload: response.data });
        }
      });
  };
}

export function getUsers() {
  return (dispatch) => {
    let apiEndpoint = `/users`;
    service
      .get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response) {
          dispatch({
            type: GET_USER,
            payload: response.data,
            //      .filter(  (e) =>
            // e.confirm === "confirmé" &&
            //  e.archive === true
            //   ),
          });
        }
      });
  };
}

export const editUser = (data) => {
  console.log(data, "----------editUser");
  return (dispatch) => {
    // let apiEndpoint = `/users/` + data.id;
    // service
    //   .patch(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } }, data)
    //   .then((res) => {
    dispatch({
      type: EDIT_USER,
      payload: data,
    });
    //       dispatch({
    //         type: SHOW_SUCCESS_MESSAGE,
    //         payload: "La modification  est effectuée avec succès",
    //       });
    //       setTimeout(() => {
    //         dispatch({ type: HIDE_SUCCESS_MESSAGE });
    //       }, 4000);
    //     })
    //     .catch((err) => {
    //       let errorMsg =
    //         err.response === undefined
    //           ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
    //           : err.response.data.error.message === "Internal Server Error"
    //           ? "name duplicated"
    //           : err.response.data.error.message;
    //       dispatch({
    //         type: SHOW_ERROR_MESSAGE,
    //         payload: errorMsg,
    //       });
    //       setTimeout(() => {
    //         dispatch({ type: HIDE_ERROR_MESSAGE });
    //       }, 4000);
    //     });
  };
};
