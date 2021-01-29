import {
  ADD_EXAM_TYPE,
  GET_EXAM_TYPE,
  EDIT_EXAM_TYPE,
  DELETE_EXAM_TYPES,
  ARCHIVED_GET_EXAM_TYPES,
} from "../constants/ActionTypes";
const initialState = {
  examTypes: [],
  archivedexamTypes: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_EXAM_TYPE) {
    return Object.assign({}, state, {
        examTypes: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_EXAM_TYPES) {
    return Object.assign({}, state, {
        archivedexamTypes: action.payload,
    });
  }

  if (action.type === ADD_EXAM_TYPE) {
    return Object.assign({}, state, {
      examTypes: state.examTypes.concat(action.payload),
    });
  }

  if (action.type === EDIT_EXAM_TYPE) {
    return Object.assign({}, state, {
      examTypes: [
        ...state.examTypes.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_EXAM_TYPES) {
    return Object.assign({}, state, {
        examTypes: [
        ...state.examTypes.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
      archivedexamTypes: state.archivedexamTypes.concat(
        action.payload
      ),
    });
  }

  return state;
}
