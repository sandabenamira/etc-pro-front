import baseUrl from "../config/config";
import axios from "axios";
import { DATA_LOADED_STUPPUSER } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


export function getAllUsers(id) {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/profiles?access_token=${localStorage.token}&filter[include]=user`
      )
      .then(json => {
        dispatch({ type: DATA_LOADED_STUPPUSER, payload: json.data });
      });
  };
}

export function getAllUsersByEstablishmentId(establishment_id) {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/profiles?access_token=${localStorage.token}&filter[include]=user&filter[where][and][0][establishment_id]=` +
          establishment_id
      )
      .then(res => {
        dispatch({ type: DATA_LOADED_STUPPUSER, payload: res.data });
      });
  };
}
