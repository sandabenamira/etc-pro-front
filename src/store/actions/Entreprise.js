import {
  GET_ENTREPRISE,
  ADD_ENTREPRISE,
  EDIT_ENTREPRISE,
  DELETE_ENTREPRISE,
} from "../../constants/ActionTypes";
import { service } from "../services/service";

export function addEntreprise(data) {
  console.log(data, "addEntreprise");
  return (dispatch) => {
    dispatch({ type: ADD_ENTREPRISE, payload: data });
  };
}
export function getEntreprises() {
  return (dispatch) => {
    let apiEndpoint = `/inscriptions`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_ENTREPRISE, payload: response.data.filter((e)=> e.confirm==='confirmé') });
      }
    });
  };
}
