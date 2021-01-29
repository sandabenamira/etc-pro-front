import { classService } from "../_services/class.service";
export function getPresence() {
    return dispatch => {
        let apiEndpoint = `/presences?access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
        .then(response => { 
            dispatch({ type: "GET_ALL_PRESENCE", payload: response.data });
        }).catch(error => {
        });
    };
};
