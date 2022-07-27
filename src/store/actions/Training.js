//import { service } from "../services/service";
import { ADD_TRAINING, GET_TRAINING } from "../../constants/ActionTypes";

export function addTraining(data) {
  return (dispatch) => {
     let apiEndpoint = `/formations`;

   // service.post(apiEndpoint, data).then((response) => {
    dispatch({ type: ADD_TRAINING, payload: data });
    console.log("response333", data);

      // dispatch({
      //   type: SHOW_MESSAGE_AGENCE,
      // });
      // setTimeout(() => {
      //   dispatch({ type: HIDE_MESSAGE_AGENCE });
      // }, 4000);
      // });
  };
  //   });
  // };
}
export function getTrainings() {
  return (dispatch) => {
    // let apiEndpoint = `/training`;
    // service.get(apiEndpoint).then((response) => {
    //   if (response) {
    dispatch({
      type: GET_TRAINING,
      //       payload: response.data,
      //     });
      //   }
    });
  };
}
