import { moduleService } from '../_services/module.service';
import { GET_ALL_MODULE } from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */

export const getModules = () => {
  return (dispatch) => {
    let apiEndpoint = `/modules?access_token=${localStorage.token}`;
    moduleService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const moduleList = list.filter((element) => element.status);
        dispatch({ type: GET_ALL_MODULE, payload: moduleList });
      })
      .catch((err) => {});
  };
};

export const moduleAction = {
  getModules,
};
