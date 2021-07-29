import {ADD_TRAINING} from "../../constants/ActionTypes"

const initialState = {
    trainings: []
};

export default function (state = initialState, action) {
    if (action.type === ADD_TRAINING) {
        return Object.assign({}, state, {
            users: action.payload
        });
    }
 
    
    return state;
};