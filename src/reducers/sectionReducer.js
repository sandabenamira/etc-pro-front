import { DATA_LOADED_SECTIONS} from "../constants/ActionTypes";

const initialState = {
    remoteSections: []
};

export default function (state = initialState, action) {
    
    if (action.type === DATA_LOADED_SECTIONS) {
        return Object.assign({}, state, {
            remoteSections: action.payload
        });
    }

    return state;

};
