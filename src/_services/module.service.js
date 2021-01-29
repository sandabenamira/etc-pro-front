import axios from 'axios';
import config from '../config/config';
import { userSignOut } from "../actions/Auth";
import configureStore from "../store";
import { getError } from "../Error/Error";

export const moduleService = {
    post,
    get,
    put,
    archive
};


const store = configureStore();
function post(apiEndpoint, payload) {
    return axios.post(config.baseUrl + apiEndpoint, payload).then((response) => {
        return response;
    }).catch(err => {
        if (err.response.status === 401) {
          store.dispatch(userSignOut());
        } else {
          let errorMessage = getError(err.response.status);
          alert(errorMessage);
        }
      });
};

function get(apiEndpoint) {
    return axios.get(config.baseUrl + apiEndpoint).then((response) => {
        return response;
    }).catch(err => {
        if (err.response.status === 401) {
          store.dispatch(userSignOut());
        } else {
          let errorMessage = getError(err.response.status);
          alert(errorMessage);
        }
      });
};

function put(apiEndpoint, data) {
    return axios.put(config.baseUrl + apiEndpoint, {
        name: data.name,
        description: data.description,
        status: true,
        id: data.id,
    })
        .then((response) => {
            return response;
        }).catch(err => {
            if (err.response.status === 401) {
              store.dispatch(userSignOut());
            } else {
              let errorMessage = getError(err.response.status);
              alert(errorMessage);
            }
          });
};

function archive (apiEndpoint, data) {
    return axios.put(config.baseUrl + apiEndpoint, {
        name: data.name,
        description: data.description,
        status: false,
        id: data.id,
    })
        .then((response) => {
            return response;
        }).catch(err => {
            if (err.response.status === 401) {
              store.dispatch(userSignOut());
            } else {
              let errorMessage = getError(err.response.status);
              alert(errorMessage);
            }
          });
};
