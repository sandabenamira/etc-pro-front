import {service} from '../services/service';
import {GET_INSCRIPTION, ADD_INSCRIPTION} from '../../constants/ActionTypes';

export function getInscriptions() {
  return (dispatch) => {
    let apiEndpoint = `/inscriptions`; //path
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
