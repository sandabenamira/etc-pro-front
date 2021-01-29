import { GET_CLASSES_BY_ESTABLISHMENT_ID } from "../constants/ActionTypes";
const initialState = {
  classes: []
};

export default function classeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETECHED_ALL_CLASS':
      return action.classes;
    case 'ADD_CLASS':
      return [action.payload, ...state];
    case 'REMOVE_CLASS':
      return state.filter((classe) => classe.id !== action.payload.id);

    case 'UPDATE_CLASS':
      return state = [...state.filter(element => element.id !== action.payload.id), action.payload]

    case GET_CLASSES_BY_ESTABLISHMENT_ID:
      return action.payload;
    case 'GET_CLASSES_BY_USER_ID':
      return action.payload;
    default:
      return state
  }
}

