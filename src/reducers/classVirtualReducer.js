import {
  FETECHED_ALL_VIRTUAL_CLASS,
  ADD_VIRTUAL_CLASS,
  EDIT_VIRTUAL_CLASS,
  DELETE_VIRTUAL_CLASS,
  ARCHIVED_VIRTUAL_CLASS,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */

const initialState = {
  remoteClassVirtual: [],
  archivedVirtualClass: [],
};

export default function (state = initialState, action) {
  if (action.type === FETECHED_ALL_VIRTUAL_CLASS) {
    return Object.assign({}, state, {
      remoteClassVirtual: action.payload.reverse(),
    });
  }

  if (action.type === ADD_VIRTUAL_CLASS) {
    return Object.assign({}, state, {
      remoteClassVirtual: [action.payload].concat(state.remoteClassVirtual),
    });
  }
  if (action.type === ARCHIVED_VIRTUAL_CLASS) {
    return Object.assign({}, state, {
      archivedVirtualClass: action.payload,
    });
  }
  if (action.type === DELETE_VIRTUAL_CLASS) {
    return Object.assign({}, state, {
      remoteClassVirtual: [...state.remoteClassVirtual.filter((element) => element.idCourseVirtualclass !== action.payload.idCourseVirtualclass)],
      archivedVirtualClass: [action.payload].concat(state.archivedVirtualClass),
    });
  }

  if (action.type === EDIT_VIRTUAL_CLASS) {
    let newList = state.remoteClassVirtual.map((element) =>
      element.id === parseInt(action.payload.id)
        ? {
            ...element,
            ...action.payload,
          }
        : element
    );
    return Object.assign({}, state, {
      remoteClassVirtual: newList,
    });
  }

  return state;
}
