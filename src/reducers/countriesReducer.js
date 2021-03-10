import { DATA_LOADED_COUNTRIES} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
    remoteCountries: []
};

export default function (state = initialState, action) {
    
    if (action.type === DATA_LOADED_COUNTRIES) {
        return Object.assign({}, state, {
            remoteCountries: action.payload
        });
    }

    return state;

};

