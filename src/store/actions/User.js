import { service } from "../services/service";
import {GET_USER,ADD_USER} from "../../constants/ActionTypes"


export function addUser(data) {
  return (dispatch) => {
    console.log(data);
    dispatch({ type: ADD_USER, payload:  data });
    // let apiEndpoint = `/users`;
    // service.post(apiEndpoint, data).then((response) => {
    //   if (response) {
    //     dispatch({ type: ADD_USER, payload: response.data });
    //   }
    // });
  };
}


export function getUsers() {
  return (dispatch) => {
    let apiEndpoint = `/inscriptions`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_USER, payload: response.data.filter((e)=> e.confirm==='confirmé') });
      }
    });
  };
}

