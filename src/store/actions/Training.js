import { service } from "../services/service";
import {ADD_TRAINING} from "../../constants/ActionTypes"
export function addTraining(data) {
  return (dispatch) => {
    let apiEndpoint = `/formations?access_token=${localStorage.token}`;
    service.post(apiEndpoint, data).then((response) => {
      if (response) {
          console.log('response',response.data);
        // dispatch({ type: ADD_TRAINING, payload: response.data });
      }
    });
  };
}