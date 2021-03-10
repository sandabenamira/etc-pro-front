import { GET_ALL_LEVELS, ADD_LEVEL } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
    levels: [],
 };

export default function (state = initialState, action) {
 
    if (action.type === GET_ALL_LEVELS) {
        return Object.assign({}, state, {
            levels: action.payload
        });
    }
    
    if (action.type === ADD_LEVEL) {
        return Object.assign({}, state, {
            levels: state.levels.concat(action.payload)
          });
    }

    return state;

};

