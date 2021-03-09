import {
  GET_HOMEWORKS,
  ARCHIVED_GET_HOMEWORKS,
  ADD_NEW_HOMEWORK,
  DELETE_HOMEWORK,
  EDIT_HOMEWORK,
} from '../constants/ActionTypes';

const initialState = {
  homeworks: [],
  archivedHomework: [],
};
export default function(state = initialState, action) {
  if (action.type === GET_HOMEWORKS) {
    return Object.assign({}, state, {
      homeworks: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_HOMEWORKS) {
    return Object.assign({}, state, {
      archivedHomework: action.payload,
    });
  }
  if (action.type === ADD_NEW_HOMEWORK) {
    return Object.assign({}, state, {
      homeworks: state.homeworks.concat(action.payload),
    });
  }
  if (action.type === EDIT_HOMEWORK) {
    return Object.assign({}, state, {
      homeworks: [
        ...state.homeworks.filter(
          (element) => element.homework.id !== action.payload[0].homework.id
        ),
      ].concat(action.payload),
    });
  }
  if (action.type === DELETE_HOMEWORK) {
    let itemDeleted = state.homeworks.find((element) => element.homework.id===action.payload);

    return Object.assign({}, state, {
      homeworks: [...state.homeworks.filter((element) => element.homework.id !== action.payload)],
      archivedHomework: state.archivedHomework.concat(itemDeleted),
    });
  }
  return state;
}
