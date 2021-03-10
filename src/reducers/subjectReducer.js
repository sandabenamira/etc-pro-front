import {
  DATA_LOADED_SUBJECT,
  GET_SUBJECT_BY_Establishment_AND_SCHOOLYEAR,
  DELETE_SUBJECT_SETTING,
  ARCHIVER_SUBJECT_SETTING,
  FETCH_CLASSES_SUBJECTS,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  EDIT_SUBJECT,
  ADD_SUBJECT_SETTING,
  EDIT_SUBJECT_SETTING,
  GET_SUBJECT_SETTING,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */


const initialState = {
  remoteSubjects: [],
  subjectsProf: [],
  subjects: [],
  archivedSubjects: [],
  establishmentData: [],
  classesSubjects: [],
};

export default function(state = initialState, action) {
  if (action.type === DATA_LOADED_SUBJECT) {
    return Object.assign({}, state, {
      remoteSubjects: action.payload,
    });
  }

  if (action.type === 'DATA_LOADED_SUBJECT_PROFESSOR') {
    return Object.assign({}, state, {
      subjectsProf: action.payload,
    });
  }

  if (action.type === ADD_SUBJECT) {
    return Object.assign({}, state, {
      remoteSubjects: state.remoteSubjects.concat(action.payload),
    });
  }

  if (action.type === DELETE_SUBJECT) {
    return Object.assign({}, state, {
      remoteSubjects: [
        ...state.remoteSubjects.filter((element) => element.id !== action.payload.id),
      ],
    });
  }

  if (action.type === EDIT_SUBJECT) {
    return Object.assign({}, state, {
      remoteSubjects: [
        ...state.remoteSubjects.filter((element) => element.id !== action.payload.id),
        action.payload,
      ],
    });
  }

  if (action.type === EDIT_SUBJECT_SETTING) {
    return Object.assign({}, state, {
      subjects: [
        ...state.subjects.filter((element) => element.id !== action.payload.id),
        action.payload,
      ],
    });
  }

  if (action.type === ADD_SUBJECT_SETTING) {
    return Object.assign({}, state, {
      subjects: state.subjects.concat(action.payload),
    });
  }

  if (action.type === GET_SUBJECT_SETTING) {
    return Object.assign({}, state, {
      subjects: [...action.payload.filter((element) => element.status === true)],
      archivedSubjects: [...action.payload.filter((element) => element.status === false)],
    });
  }

  if (action.type === ARCHIVER_SUBJECT_SETTING) {
    return Object.assign({}, state, {
      archivedSubjects: action.payload,
    });
  }

  if (action.type === DELETE_SUBJECT_SETTING) {
    return Object.assign({}, state, {
      subjects: [...state.subjects.filter((element) => element.id !== action.payload.id)],
      archivedSubjects: state.archivedSubjects.concat(action.payload),
    });
  }
  if (action.type === GET_SUBJECT_BY_Establishment_AND_SCHOOLYEAR) {
    return Object.assign({}, state, {
      establishmentData: [...action.payload.filter((element) => element.status === true)],
    });
  }
  if (action.type === FETCH_CLASSES_SUBJECTS) {
    return Object.assign({}, state, {
      classesSubjects: action.payload,
    });
  }

  return state;
}
