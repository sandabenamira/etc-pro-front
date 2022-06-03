import axios from "axios";
import config from "../../config/config";
//import { userSignOut } from "../actions/Auth";

export const service = {
  get,
  post,
  patch,
  put,
  deleteDetail,
  del,
};

var token = localStorage.getItem("token");

function get(apiEndpoint) {
  return axios
    .get(config.baseUrl + apiEndpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("hello axios", response);
      return response;
    });
  // .catch((err) => {
  //   if (err.response.status === 401) {
  //     store.dispatch(userSignOut());
  //  }
  //});
}

function post(apiEndpoint, payload) {
  return axios
    .post(config.baseUrl + apiEndpoint, payload, {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": " X-Requested-With, Content-Type",
        "Access-Control-Allow-Methods": "POST, GET",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    });
  // .catch((err) => {
  //   if (err.response.status === 401) {
  //     store.dispatch(userSignOut());
  //   } else {
  //   }
  //  });
}

function patch(apiEndpoint, payload) {
  return axios
    .patch(config.baseUrl + apiEndpoint, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // if (err.response.status === 401) {
      //   store.dispatch(userSignOut());
      // } else {
      // }
    });
}

function put(apiEndpoint, payload) {
  return axios
    .put(
      config.baseUrl + apiEndpoint,
      { headers: { Authorization: `Bearer ${token}` } },

      payload
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // if (err.response.status === 401) {
      //   store.dispatch(userSignOut());
      // } else {
      // }
    });
}
function del(apiEndpoint, payload) {
  return axios
    .delete(
      config.baseUrl + apiEndpoint,
      { headers: { Authorization: `Bearer ${token}` } },
      payload
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // if (err.response.status === 401) {
      //   store.dispatch(userSignOut());
      // } else {
      // }
    });
}

function deleteDetail(apiEndpoint) {
  return axios
    .delete(config.baseUrl + apiEndpoint)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      //   if (err.response.status === 401) {
      //  //   store.dispatch(userSignOut());
      //   } else {
      //   }
    });
}
