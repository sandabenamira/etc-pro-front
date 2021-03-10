import {
  ARCHIVED_GET_SECTIONS,
  GET_SECTIONS,
  EDIT_SECTION,
  ADD_SECTION,
  DELETE_SECTIONS,
  PUBLISH_SECTIONS,
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
  Section: [],
  archivedSection: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_SECTIONS) {
    return Object.assign({}, state, {
      Section: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_SECTIONS) {
    return Object.assign({}, state, {
      archivedSection: action.payload,
    });
  }

  if (action.type === ADD_SECTION) {
    return Object.assign({}, state, {
      Section: state.Section.concat(action.payload),
    });
  }

  if (action.type === EDIT_SECTION) {
    return Object.assign({}, state, {
      Section: [
        ...state.Section.filter((element) => element.id !== action.payload.id),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_SECTIONS) {
    return Object.assign({}, state, {
      Section: [
        ...state.Section.filter((element) => element.id !== action.payload.id),
      ],
      archivedSection: state.archivedSection.concat(action.payload),
    });
  }
  if (action.type === PUBLISH_SECTIONS) {
    return Object.assign({}, state, {
      archivedSection: [
        ...state.archivedSection.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
      Section: state.Section.concat(action.payload),
    });
  }
  return state;
}
