import { moduleService } from '../_services/module.service';
import { ADD_MODULE, GET_ALL_MODULE, EDIT_MODULE, DELETE_MODULE } from "../constants/ActionTypes";

export const addModule = (itemModule) => {                                                      //1
    return (dispatch) => {
        let apiEndpoint = `/modules?access_token=${localStorage.token}`;
        moduleService.post(apiEndpoint, itemModule)
            .then(response => {
                let data = response.data;
                dispatch({ type: ADD_MODULE, payload: data })
                alert('L\'ajout est effectué avec succès')
            })
            .catch(error => { throw (error) });
    };
};

export const getModules = () => {
    return dispatch => {
        let apiEndpoint = `/modules?access_token=${localStorage.token}`;
        moduleService.get(apiEndpoint)
            .then((response) => {
                const list = response.data;
                const moduleList = list.filter(element => element.status);
                dispatch({ type: GET_ALL_MODULE, payload: moduleList });
            }).catch((err) => {
            })
    };
};

export const editModule = (moduleItem) => {                                                              
    return (dispatch) => {
        let apiEndpoint = '/modules/' + moduleItem.id +`?access_token=${localStorage.token}`;
        const name = moduleItem.name;
        const description = moduleItem.description;
        const status = true;
        const data = { name, description, status }
        moduleService.put(apiEndpoint, data)
            .then(response => {
                dispatch({ type: EDIT_MODULE, payload: response.data })
            }).catch(error => { throw (error) });
    };
};

export const deletemodule = (id) => {
    return (dispatch) => {
        let apiEndpoint = '/modules/' + id +`?access_token=${localStorage.token}`;
        moduleService.get(apiEndpoint)
            .then(response => {
                const item = response.data;
                const name = item.name;
                const description = item.description;
                const status = false;
                const id = item.id;
                const dataModule = { name, description, status, id }
                moduleService.archive(apiEndpoint, dataModule)
                    .then(response => {
                        dispatch({ type: DELETE_MODULE, payload: response.data })
                    }).catch(error => { throw (error) });

            })
    }
};

export const moduleAction = {
    addModule,
    getModules,
    deletemodule,
};
