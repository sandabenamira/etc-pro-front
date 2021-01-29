import axios from 'axios';
import config from '../config/config';
import { userSignOut } from "../actions/Auth";
import configureStore from "../store";
import { getError } from "../Error/Error";

export const callService = {
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
        } else{  
        }   
  
      });
}


function post(apiEndpoint, payload){
    return axios.post(config.baseUrl+apiEndpoint, payload).then((response)=>{
        return response;
    }).catch(err => {
        if (err.response.status === 401) {
          store.dispatch(userSignOut());
        } else{  
         }    
  
      });
}

function put(apiEndpoint, payload){
    return axios.put(config.baseUrl+apiEndpoint, payload).then((response)=>{
        return response;
    }).catch(err => {
        if (err.response.status === 401) {
          store.dispatch(userSignOut());
        } 
        else{  
         }   
      });
}

