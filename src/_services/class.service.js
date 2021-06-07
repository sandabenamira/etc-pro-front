import axios from "axios";
import config from "../config/config";
import { userSignOut } from "../store/actions/Auth";
import configureStore from "../store";
 export const classService = {
  get,
  post,
  patch,
  put,
  deleteDetail,
  getPhoto,
};
const store = configureStore();

function get(apiEndpoint) {
  return axios
    .get(config.baseUrl + apiEndpoint)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.dispatch(userSignOut());
      }
    });
}

function post(apiEndpoint, payload) {
  return axios
    .post(config.baseUrl + apiEndpoint, payload, {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": " X-Requested-With, Content-Type",
        "Access-Control-Allow-Methods": "POST, GET",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.dispatch(userSignOut());
      } else {
      }
    });
}

function patch(apiEndpoint, payload) {
  return axios
    .patch(config.baseUrl + apiEndpoint, payload)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.dispatch(userSignOut());
      } else {
      }
    });
}

function put(apiEndpoint, payload) {
  return axios
    .put(config.baseUrl + apiEndpoint, payload)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.dispatch(userSignOut());
      } else {
      }
    });
}

function deleteDetail(apiEndpoint) {
  return axios
    .delete(config.baseUrl + apiEndpoint)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.dispatch(userSignOut());
      } else {
      }
    });
}

function getPhoto(apiEndpoint) {
  return axios({
    url: config.baseUrl + apiEndpoint,
    method: "GET",
    responseType: "arraybuffer",
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.dispatch(userSignOut());
      } else {
      }
      // else {
      //   let errorMessage = getError(err.response.status);
      //   alert(errorMessage);
      // }
    });
}
