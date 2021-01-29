import {
  GET_ASSIGNEMENT_COURSE,
  ADD_ASSIGNEMENT_COURSE,
  EDIT_ASSIGNEMENT_COURSE,
  DELETE_ASSIGNEMENT_COURSE,
  ARCHIVED_GET_ASSIGNEMENT_COURSE
} from "../constants/ActionTypes";

const initialState = {
  courseAssignment: [],
  archivedCourseAssignment: [],

};

export default function (state = initialState, action) {
  if (action.type === GET_ASSIGNEMENT_COURSE) {
    return Object.assign({}, state, {
      courseAssignment: action.payload,

    });
  }
  if (action.type === ARCHIVED_GET_ASSIGNEMENT_COURSE) {
    return Object.assign({}, state, {
      archivedCourseAssignment: action.payload
    });
  }

  if (action.type === ADD_ASSIGNEMENT_COURSE) {
    return Object.assign({}, state, {
      courseAssignment: state.courseAssignment.concat(action.payload)
    });
  }


  if (action.type === EDIT_ASSIGNEMENT_COURSE) {
    return Object.assign({}, state, {
      courseAssignment: [...state.courseAssignment.filter(element => element.id !== action.payload.id), action.payload]
    });
  }

  if (action.type === DELETE_ASSIGNEMENT_COURSE) {
    return Object.assign({}, state, {
      courseAssignment: [
        ...state.courseAssignment.filter(
          element => element.id !== action.payload.id
        )
      ],
      archivedCourseAssignment: state.archivedCourseAssignment.concat(action.payload)


    });
  }


  return state;

};
