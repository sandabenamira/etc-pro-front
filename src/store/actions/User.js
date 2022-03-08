import { service } from "../services/service";
import {FETECHED_USERS} from "../../constants/ActionTypes"




export function getUsers() {
  return (dispatch) => {
    let apiEndpoint = `/users?access_token=${localStorage.token}`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: FETECHED_USERS, payload: response.data });
      }
    });
  };
}
