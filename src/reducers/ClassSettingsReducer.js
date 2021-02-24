import {
  GET_CLASS_SETTINGS,
  EDIT_CLASS_SETTINGS,
  DELETE_CLASS_SETTINGS,
  ARCHIVED_GET_CLASS_SETTINGS,
  ADD_CLASS_SETTINGS,
  ADD_CLASS_FORMATION
} from '../constants/ActionTypes';

const initialState = {
  classSettings: [],
  archivedClassSettings: [],
  classFormationId: null,
};

export default function(state = initialState, action) {
  if (action.type === ADD_CLASS_FORMATION) {
    return Object.assign({}, state, {
      classFormationId: action.payload,
    });
  }
  if (action.type === GET_CLASS_SETTINGS) {
    return Object.assign({}, state, {
      classSettings: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_CLASS_SETTINGS) {
    return Object.assign({}, state, {
      archivedClassSettings: action.payload,
    });
  }

  if (action.type === ADD_CLASS_SETTINGS) {
    return Object.assign({}, state, {
      classSettings: state.classSettings.concat(action.payload),
    });
  }

  if (action.type === EDIT_CLASS_SETTINGS) {
    return Object.assign({}, state, {
      classSettings: [
        ...state.classSettings.filter((element) => element.id !== action.payload.id),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_CLASS_SETTINGS) {
    return Object.assign({}, state, {
      classSettings: [...state.classSettings.filter((element) => element.id !== action.payload.id)],
      archivedClassSettings: state.archivedClassSettings.concat(action.payload),
    });
  }

  return state;
}
