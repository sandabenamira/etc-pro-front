
import { GET_ALL_STUDENT,GET_STUDENT, ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT, GET_STUDENT_BY_ESTABLISHMENT } from "../constants/ActionTypes";

const initialState = {
    remoteStudents: [],
};

export default function (state = initialState, action) {

    if (action.type === GET_ALL_STUDENT) {
        return Object.assign({}, state, {
            remoteStudents: action.payload
        });
    }

    if (action.type === ADD_STUDENT) {
        return Object.assign({}, state, {
            remoteStudents: state.remoteStudents.concat(action.payload)
        });
    }

    if (action.type === DELETE_STUDENT) {
        return Object.assign({}, state, {
            remoteStudents: [...state.remoteStudents.filter(element => element.id !== action.payload.id)]
        });

    }

    if (action.type === EDIT_STUDENT) {
        return Object.assign({}, state, {
            remoteStudents: [...state.remoteStudents.filter(element => element.id !== action.payload.id), action.payload]
        });
    }

    if (action.type === GET_STUDENT_BY_ESTABLISHMENT) {
        return Object.assign({}, state, {
            remoteStudents: action.payload
        });
    }
    if (action.type === GET_STUDENT) {
        return Object.assign({}, state, {
            remoteStudents: action.payload
        });
    }

    
    return state;

};

