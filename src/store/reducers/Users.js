import {FETECHED_USERS} from "../../constants/ActionTypes"

const initialState = {
    users: []
};

export default function (state = initialState, action) {
    if (action.type === FETECHED_USERS) {
        return Object.assign({}, state, {
            users: action.payload
        });
    }
 
    
    return state;
};