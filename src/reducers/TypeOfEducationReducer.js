import { DATA_LOADED_ESTAB_TYPES,
    EDIT_TYPE_EDUCATION,
    ADD_TYPE_EDUCATION, 
    DELETE_TYPE_EDUCATION,
    GET_EDUCATION_TYPES } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
    remoteEstabTypes: [],
    educationTypes: [],
    archivedEducationTypes:[]
};

export default function (state = initialState, action) {

    if (action.type === DATA_LOADED_ESTAB_TYPES) {
        return Object.assign({}, state, {
            remoteEstabTypes: action.payload,
        });
    }

    if (action.type === GET_EDUCATION_TYPES) {
        return Object.assign({}, state, {
            educationTypes: [...action.payload.filter(element => element.status === true)],
            archivedEducationTypes:[...action.payload.filter(element => element.status === false)]

 });
    }
    
    if (action.type === ADD_TYPE_EDUCATION) {
        return Object.assign({}, state, {
            educationTypes: state.educationTypes.concat(action.payload)
          });
    }

    if (action.type === EDIT_TYPE_EDUCATION) {
        return Object.assign({}, state, {
            educationTypes: [...state.educationTypes.filter(element => element.id !== action.payload.id), action.payload]
        });
    }

    if (action.type === DELETE_TYPE_EDUCATION) {
        return Object.assign({}, state, {
            educationTypes: [...state.educationTypes.filter(element => element.id !== action.payload.id)],
            archivedEducationTypes: state.archivedEducationTypes.concat(action.payload)
          });

        }

    return state;

};

