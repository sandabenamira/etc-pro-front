import {
  ARCHIVED_GET_SCHOOL_SESSION,
  GET_SCHOOL_SESSION,
  EDIT_SCHOOL_SESSION,
  ADD_SCHOOL_SESSION,
  DELETE_SCHOOL_SESSION,
} from "../constants/ActionTypes";
const initialState = {
  schoolSessions: [],
  archivedSchoolSessions: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_SCHOOL_SESSION) {
    return Object.assign({}, state, {
      schoolSessions: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_SCHOOL_SESSION) {
    return Object.assign({}, state, {
      archivedSchoolSessions: action.payload,
    });
  }

  if (action.type === ADD_SCHOOL_SESSION) {
    return Object.assign({}, state, {
      schoolSessions: state.schoolSessions.concat(action.payload),
    });
  }

  if (action.type === EDIT_SCHOOL_SESSION) {
    return Object.assign({}, state, {
      schoolSessions: [
        ...state.schoolSessions.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_SCHOOL_SESSION) {
    return Object.assign({}, state, {
      schoolSessions: [
        ...state.schoolSessions.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
      archivedSchoolSessions: state.archivedSchoolSessions.concat(
        action.payload
      ),
    });
  }

  return state;
}
