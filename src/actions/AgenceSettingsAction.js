import { classService } from '../_services/class.service';
import {
  ADD_AGENCE,
  GET_AGENCE,
  DELETE_AGENCE,
  ARCHIVED_GET_AGENCE,
  EDIT_AGENCE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
} from '../constants/ActionTypes';
export function addAgence(data) {
  // console.log('-----action data-----',data);
  return (dispatch) => {
    dispatch({ type: ADD_AGENCE, payload: data });

    // let apiEndpoint = `/agence?access_token=${localStorage.token}`;
    // classService.post(apiEndpoint, data).then((response) => {
    //   if (response) {
    //     dispatch({ type: ADD_AGENCE, payload: response.data });
    //     dispatch({
    //       type: SHOW_SUCCESS_MESSAGE,
    //       payload: 'La création est effectuée avec succès',
    //     });
    //     setTimeout(() => {
    //       dispatch({ type: HIDE_SUCCESS_MESSAGE });
    //     }, 4000);
    //   } else {
    //     dispatch({
    //       type: SHOW_ERROR_MESSAGE,
    //       payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
    //     });
    //     setTimeout(() => {
    //       dispatch({ type: HIDE_ERROR_MESSAGE });
    //     }, 4000);
    //   }
    // });
  };
}
