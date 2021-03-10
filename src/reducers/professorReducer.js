
import { DATA_LOADED, GET_PROFESSOR, ADD_PROFESSOR, DELETE_PROFESSOR, EDIT_PROFESSOR } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
  professors: [],
  remoteProfessors: []
};

export default function (state = initialState, action) {

  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteProfessors: action.payload
    });
  }

  if (action.type === ADD_PROFESSOR) {
    return Object.assign({}, state, {
      remoteProfessors: state.remoteProfessors.concat(action.payload)
    });
  }

  if (action.type === DELETE_PROFESSOR) {
    return Object.assign({}, state, {
      remoteProfessors: [...state.remoteProfessors.filter(element => element.id !== action.payload.id)]
    });
  }

  if (action.type === EDIT_PROFESSOR) {
    return Object.assign({}, state, {
      remoteProfessors: [...state.remoteProfessors.filter(element => element.id !== action.payload.id), action.payload]
    });
  }

  if (action.type === GET_PROFESSOR) {
    return Object.assign({}, state, {
      professors: action.payload
    });
  }
  return state;

};

