import { GET_GROUPS, ADD_GROUPS, EDIT_GROUPS, DELETE_GROUPS, ARCHIVED_GET_GROUPS } from '../constants/ActionTypes';

const initialState = {
  groupsList: [],
  archivedgroupsList: [],
};

export default function (state = initialState, action) {
  if (action.type === GET_GROUPS) {
    return Object.assign({}, state, {
      groupsList: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_GROUPS) {
    return Object.assign({}, state, {
      archivedgroupsList: action.payload,
    });
  }

  if (action.type === ADD_GROUPS) {
    let classItmem = state.groupsList.find((element) => element.id === action.payload.id);
    let newItem = {};
    if (classItmem === undefined) {
      newItem = action.payload;
    } else {
      newItem = { ...classItmem, group: classItmem.group.concat(action.payload.group) };
    }
    return Object.assign({}, state, {
      groupsList: [...state.groupsList.filter((element) => element.id !== newItem.id)].concat(newItem),
    });
  }

  if (action.type === EDIT_GROUPS) {
    return Object.assign({}, state, {
      groupsList: [...state.groupsList.filter((element) => element.id !== action.payload.id), action.payload],
    });
  }

  if (action.type === DELETE_GROUPS) {
    return Object.assign({}, state, {
      groupsList: [...state.groupsList.filter((element) => element.id !== action.payload.id)],
      archivedgroupsList: state.archivedgroupsList.concat(action.payload),
    });
  }

  return state;
}
