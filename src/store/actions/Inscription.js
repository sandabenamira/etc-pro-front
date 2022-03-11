import {service} from '../services/service';
import {GET_INSCRIPTION,ADD_INSCRIPTION ,PUT_INSCRIPTION} from '../../constants/ActionTypes';

export function getInscriptions() {
  return (dispatch) => { //// Now, dispatch some actions
//The store calls rootReducer(state, action)
    let apiEndpoint = `/inscriptions`;
    service.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({type: GET_INSCRIPTION, payload: response.data});
      }
    });
  };
}

export function addInscription(data) {
  return (dispatch) => {
    console.log(data)
    let apiEndpoint = `/inscriptions`;
    service.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({type: ADD_INSCRIPTION, payload: response.data});
      }
    });
  };
}
export function modifierInscription(id, params = {}) {
  
  return (dispatch,getState) => {
    let apiEndpoint = `/inscriptions/{id}`;
    const data = getDataById(getState().Inscriptions.inscriptions, id);
    const updatdata=Object.assign({},data,params)

    service.put(apiEndpoint, id).then((response) => {
      if (response) {
        dispatch({type: PUT_INSCRIPTION, payload: response.data});
      }
    });
  };
}
function getDataById(data, id) {
  return data.find(data => data.id === id);
}
// return (dispatch, getState) => {
//   const task = getDataById(getState().tasks.tasks, id);
//   const updatedTask = Object.assign({}, task, params);

//   api.editTask(id, updatedTask).then(resp => {
//     dispatch(editTaskSucceeded(resp.data));
//   });
// };
// }

