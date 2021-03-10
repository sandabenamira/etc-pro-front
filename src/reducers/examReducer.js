import { DATA_LOADED_EXAM, ADD_EXAM, DELETE_EXAM, EDIT_EXAM } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
    remoteExams: []
};

export default function (state = initialState, action) {
    if (action.type === DATA_LOADED_EXAM) {
        return Object.assign({}, state, {
            remoteExams: action.payload
        });
    }
    if (action.type === ADD_EXAM) {
        return Object.assign({}, state, {
            remoteExams: state.remoteExams.concat(action.payload)
        });
    }

    if (action.type === DELETE_EXAM) {
        return Object.assign({}, state, {
            remoteExams: [...state.remoteExams.filter(element => element.id !== action.payload.id)]
        });
    }

    if (action.type === EDIT_EXAM) {
        return Object.assign({}, state, {
            remoteExams: [...state.remoteExams.filter(element => element.id !== action.payload.id), action.payload]
        });
    }
    return state;
};