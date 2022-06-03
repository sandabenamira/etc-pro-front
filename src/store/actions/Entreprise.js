import {
  GET_ENTREPRISE,
  ADD_ENTREPRISE,
  } from "../../constants/ActionTypes";
import { service } from "../services/service";

export function addEntreprise(data) {
   return (dispatch) => {
    dispatch({ type: ADD_ENTREPRISE, payload: data });
  };
}
export function getEntreprises() {
  return (dispatch) => {
    let apiEndpoint = `/inscriptions`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_ENTREPRISE, payload: response.data.filter((e)=> e.status==='confirmé') });
      }
    });
  };
}
