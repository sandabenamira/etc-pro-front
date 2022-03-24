import { service } from "../services/service";
import {
  GET_INSCRIPTION,
  ADD_INSCRIPTION,
  EDIT_INSCRIPTION,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  DELETE_INSCRIPTION,
} from "../../constants/ActionTypes";

export function getInscriptions() {
  return (dispatch) => {
    //// Now, dispatch some actions
    //The store calls rootReducer(state, action)
    let apiEndpoint = `/inscriptions`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_INSCRIPTION, payload: response.data });
      }
    });
  };
}

export function addInscription(data) {
  return (dispatch) => {
    console.log(data);
    let apiEndpoint = `/inscriptions`;
    service.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_INSCRIPTION, payload: response.data });
      }
    });
  };
}
// export function modifierInscription(id, params = {}) {
//   console.log(params);
//   return (dispatch, getState) => {
//     let apiEndpoint = `/inscriptions/{id}`;
//     const data = getDataById(getState().Inscriptions.inscriptions, id);
//     const updatdata = Object.assign({}, data, params); //(target,source) //return target            //copie params updated dans data
//     service.put(apiEndpoint, id, updatdata).then((response) => {
//       if (response) {
//         dispatch({ type: PUT_INSCRIPTION, payload: response.updatdata });
//       }
//     });
//   };
// }

function getDataById(data, id) {
  return data.find((data) => data.id === id);
}
// return (dispatch, getState) => {
//   const task = getDataById(getState().tasks.tasks, id);
//   const updatedTask = Object.assign({}, task, params);

//   api.editTask(id, updatedTask).then(resp => {
//     dispatch(editTaskSucceeded(resp.data));
//   });
// };
// }

export const editInscription = (data) => {
  console.log(data, "----------editInscription");
  return (dispatch) => {
    let apiEndpoint = `/inscriptions/` + data.id;

    service
      .patch(apiEndpoint, data)
      .then((res) => {
        dispatch({
          type: EDIT_INSCRIPTION,
          payload: data,
        });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La modification  est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch((err) => {
        let errorMsg =
          err.response === undefined
            ? "Merci  de réessayer ultérieurement , une erreur s'est produite de notre coté"
            : err.response.data.error.message === "Internal Server Error"
            ? "name duplicated"
            : err.response.data.error.message;
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: errorMsg,
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
};

export const deleteInscription = (id) => async (dispatch) => {
  try {
    let apiEndpoint = `/inscriptions/` + id;

    await service.del(apiEndpoint, id);
    dispatch({
      type: DELETE_INSCRIPTION,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};