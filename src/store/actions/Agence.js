import { service } from "../services/service";
import {
  GET_AGENCE,
  ADD_AGENCE,
  EDIT_AGENCE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  DELETE_AGENCE,GET_ARCHIVE_AGENCE,
} from "../../constants/ActionTypes";

export function getAgences() {
  return (dispatch) => {
    //// Now, dispatch some actions
    //The store calls rootReducer(state, action)
    let apiEndpoint = `/agences`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_AGENCE, payload: response.data });
      }
    });
  };
}
// export function getArchiveAgences() {
//     return (dispatch) => {
//       let apiEndpoint = `/agences`;
//       service.get(apiEndpoint).then((response) => {
//         if (response) {
//           dispatch({
//             type: GET_ARCHIVE_AGENCE,
//             payload: response.data.filter((e) => e.archive === true),
//           });
//         }
//       });
//     };
//   }

export function addAgence(data) {
  return (dispatch) => {
    let apiEndpoint = `/agences`;
    service.post(apiEndpoint, data).then((response) => {
      console.log("HELLOOO ACTION",response,"dat",data)

      if (response) {

        dispatch({ type: ADD_AGENCE, payload: response.data });
      }
    });
  };
}

// export const editAgence = (data) => {
//   console.log(data, "----------editInscription");
//   return (dispatch) => {
//     let apiEndpoint = `/agences/` + data.id;

//     service
//       .patch(apiEndpoint, data)
//       .then((res) => {
//         dispatch({
//           type: EDIT_AGENCE,
//           payload: data,
//         });
//         dispatch({
//           type: SHOW_SUCCESS_MESSAGE,
//           payload: "La modification  est effectuée avec succès",
//         });
//         setTimeout(() => {
//           dispatch({ type: HIDE_SUCCESS_MESSAGE });
//         }, 4000);
//       })
//       .catch((err) => {
//         let errorMsg =
//           err.response === undefined
//             ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
//             : err.response.data.error.message === "Internal Server Error"
//             ? "name duplicated"
//             : err.response.data.error.message;
//         dispatch({
//           type: SHOW_ERROR_MESSAGE,
//           payload: errorMsg,
//         });
//         setTimeout(() => {
//           dispatch({ type: HIDE_ERROR_MESSAGE });
//         }, 4000);
//       });
//   };
// };

// export const deleteAgence = (id) => async (dispatch) => {
//   try {
//     let apiEndpoint = `/agences/` + id;

//     await service.del(apiEndpoint, id);
//     dispatch({
//       type: DELETE_AGENCE,
//       payload: id,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
