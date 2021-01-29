import {
  ARCHIVED_GET_SCHOOL_LICENCE,
  GET_SCHOOL_LICENCE,
  EDIT_SCHOOL_LICENCE,
  ADD_SCHOOL_LICENCE,
  DELETE_SCHOOL_LICENCE,
} from "../constants/ActionTypes";
const initialState = {
  schoolLicences: [],
  archivedSchoolLicences: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_SCHOOL_LICENCE) {
    return Object.assign({}, state, {
      schoolLicences: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_SCHOOL_LICENCE) {
    return Object.assign({}, state, {
      archivedSchoolLicences: action.payload,
    });
  }

  if (action.type === ADD_SCHOOL_LICENCE) {
    return Object.assign({}, state, {
      schoolLicences: state.schoolLicences.concat(action.payload),
    });
  }

  if (action.type === EDIT_SCHOOL_LICENCE) {
    return Object.assign({}, state, {
      schoolLicences: [
        ...state.schoolLicences.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_SCHOOL_LICENCE) {
    return Object.assign({}, state, {
      schoolLicences: [
        ...state.schoolLicences.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
      archivedSchoolLicences: state.archivedSchoolLicences.concat(
        action.payload
      ),
    });
  }
  return state;
}
