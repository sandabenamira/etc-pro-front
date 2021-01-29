import { classService } from "../_services/class.service";
export function getProfiles() {
    return dispatch => {
        let apiEndpoint = `/profiles?access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
        .then(response => { 
            dispatch({ type: "GET_ALL_PROFILES", payload: response.data });
        }).catch(error => {
        });
    };
};
