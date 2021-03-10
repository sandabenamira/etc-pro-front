import axios from 'axios';
import config from '../config/config';
import { userSignOut } from "../actions/Auth";
import configureStore from "../store";
 
export const gradeService = {
    get,
    post,
    put
};

const store = configureStore();

function get(apiEndpoint){
    return axios.get(config.baseUrl+apiEndpoint).then((response)=>{
       return response;
    }).catch(err => {
        if (err.response.status === 401) {
          store.dispatch(userSignOut());
        } 
        // else {
        //   let errorMessage = getError(err.response.status);
        //   alert(errorMessage);
        // }
      });
}


function post(apiEndpoint, payload){
    return axios.post(config.baseUrl+apiEndpoint, payload).then((response)=>{
        return response;
    }).catch(err => {
        if (err.response.status === 401) {
          store.dispatch(userSignOut());
        } 
        // else {
        //   let errorMessage = getError(err.response.status);
        //   alert(errorMessage);
        // }
      });
}

function put(apiEndpoint, payload){
    return axios.put(config.baseUrl+apiEndpoint, payload).then((response)=>{
        return response;
    }).catch(err => {
        if (err.response.status === 401) {
          store.dispatch(userSignOut());
        } 
        // else {
        //   let errorMessage = getError(err.response.status);
        //   alert(errorMessage);
        // }
      });
}

