import { getName } from './countriesAction';
import { classService } from "../_services/class.service";
import {
    ADD_TYPE_EDUCATION,
    EDIT_TYPE_EDUCATION,
    GET_EDUCATION_TYPES,
    DELETE_TYPE_EDUCATION,
    SHOW_SUCCESS_MESSAGE,
    HIDE_SUCCESS_MESSAGE,
    SHOW_ERROR_MESSAGE,
    HIDE_ERROR_MESSAGE
} from '../constants/ActionTypes'

function getEstabTypeByID(estabTypes, id) {
    let typeName = estabTypes.map(element => {
        if (element.id === id) { return element.name } else { return null }
    })
    return typeName
}

function getEstabTypes() {

    return dispatch => {
        let apiEndpoint = `/estab_types?access_token=${localStorage.token}`;
        classService
            .get(apiEndpoint)
            .then(response => {
                let estabTypes = [];
                response.data.forEach(element => {
                    estabTypes.push({ "id": element.id, "name": getName(element) })
                });
                dispatch({ type: "DATA_LOADED_ESTAB_TYPES", payload: estabTypes });
            }).catch(error => {
            });

    };
}

export function addEducationType(data) {
    return (dispatch) => {

        let apiEndpoint = `/education_type_v4?access_token=${localStorage.token}`;
        classService.post(apiEndpoint, data)
            .then((response) => {
                if (response) {
                    dispatch({ type: ADD_TYPE_EDUCATION, payload: response.data });
                    dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "La création est effectuée avec succès" })
                    setTimeout(() => {
                        dispatch({ type: HIDE_SUCCESS_MESSAGE });
                    }, 4000);
                } else {
                    dispatch({ type: SHOW_ERROR_MESSAGE, payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau" });
                    setTimeout(() => {
                        dispatch({ type: HIDE_ERROR_MESSAGE });
                    }, 4000);
                }
            })
    };
}

export function getEducationType(establishmentId,schoolYearId) {
    return dispatch => {
        let apiEndpoint = `/education_type_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${establishmentId}&filter[where][and][1][fk_id_school_year]=${schoolYearId}`;
        classService.get(apiEndpoint)
            .then(response => {
                if (response) {
                    dispatch({ type: GET_EDUCATION_TYPES, payload: response.data });
                }
            })
    };
}

export function editTypeEducation(data, idItem) {
    return (dispatch) => {
        let apiEndpoint = `/education_type_v4/${idItem}?access_token=${localStorage.token}`;
        classService.patch(apiEndpoint, data).then((response) => {
            if (response) {
                dispatch({ type: EDIT_TYPE_EDUCATION, payload: response.data });
            }
        });
    };
}

export function deleteEducationType(itemId) {
    return (dispatch) => {
        let apiEndpoint = `/education_type_v4/${itemId.id}?access_token=${localStorage.token}`;
        classService.patch(apiEndpoint, { status: false })
            .then((response) => {
                if (response) {
                    dispatch({ type: DELETE_TYPE_EDUCATION, payload: response.data });
                }
            })
    };
}

export { getEstabTypes, getEstabTypeByID }