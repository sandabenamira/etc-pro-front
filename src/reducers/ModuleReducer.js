import { ADD_MODULE, GET_ALL_MODULE, EDIT_MODULE, DELETE_MODULE } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
    modules: [],
    remoteModules: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case ADD_MODULE:
            return Object.assign({}, state, {
                remoteModules: state.remoteModules.concat(action.payload)
            });

        case GET_ALL_MODULE:
            return Object.assign({}, state, {
                remoteModules: action.payload
            });

        case EDIT_MODULE:
            return Object.assign({}, state, {
                remoteModules: [...state.remoteModules.filter(element => element.id !== action.payload.id), action.payload]
            });

        case DELETE_MODULE:
            return Object.assign({}, state, {
                remoteModules: [...state.remoteModules.filter(element => element.id !== action.payload.id)]
            });

        default:
            return state
    }
}


