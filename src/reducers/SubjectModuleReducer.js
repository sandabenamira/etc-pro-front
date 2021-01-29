import {
  ARCHIVED_GET_SUBJECT_MODULES,
  GET_SUBJECT_MODULES,
  EDIT_SUBJECT_MODULE,
  ADD_SUBJECT_MODULE,
  DELETE_SUBJECT_MODULES,
} from "../constants/ActionTypes";
const initialState = {
  subjectModules: [],
  archivedsubjectModules: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_SUBJECT_MODULES) {
    return Object.assign({}, state, {
      subjectModules: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_SUBJECT_MODULES) {
    return Object.assign({}, state, {
      archivedsubjectModules: action.payload,
    });
  }

  if (action.type === ADD_SUBJECT_MODULE) {
    return Object.assign({}, state, {
      subjectModules: state.subjectModules.concat(action.payload),
    });
  }

  if (action.type === EDIT_SUBJECT_MODULE) {
    return Object.assign({}, state, {
      subjectModules: [
        ...state.subjectModules.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_SUBJECT_MODULES) {
    return Object.assign({}, state, {
      subjectModules: [
        ...state.subjectModules.filter((element) => element.id !== action.payload.id),],
      archivedsubjectModules: state.archivedsubjectModules.concat(
        action.payload
      ),
    });
  }

  return state;
}
