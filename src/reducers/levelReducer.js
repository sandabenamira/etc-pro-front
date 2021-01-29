import {
  GET_LEVELS,
  ADD_LEVELS,
  EDIT_LEVELS,
  DELETE_LEVELS,
  ARCHIVED_GET_LEVELS,
} from "../constants/ActionTypes";

const initialState = {
  levels: [],
  archivedLevels: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_LEVELS) {
    return Object.assign({}, state, {
      levels: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_LEVELS) {
    return Object.assign({}, state, {
      archivedLevels: action.payload,
    });
  }

  if (action.type === ADD_LEVELS) {
    return Object.assign({}, state, {
      levels: state.levels.concat(action.payload),
    });
  }

  if (action.type === EDIT_LEVELS) {
    return Object.assign({}, state, {
      levels: [
        ...state.levels.filter((element) => element.id !== action.payload.id),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_LEVELS) {
    return Object.assign({}, state, {
      levels: [
        ...state.levels.filter((element) => element.id !== action.payload.id),
      ],
      archivedLevels: state.archivedLevels.concat(action.payload),
    });
  }

  return state;
}
