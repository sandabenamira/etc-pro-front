
import { classService } from "../_services/class.service";

export function getParents() {
    return dispatch => {
        let apiEndpoint = `/parents?access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
        .then(response => { 
            dispatch({ type: "GET_ALL_PARENT", payload: response.data });
        }).catch(error => {
        });
    };
};
