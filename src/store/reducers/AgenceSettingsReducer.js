import {
  ADD_AGENCE,
  GET_AGENCE,
  DELETE_AGENCE,
  ARCHIVED_GET_AGENCE,
  EDIT_AGENCE,
} from '../../constants/ActionTypes'; /* eslint eqeqeq: "off" */


const initialState = {
  agenceSettings: [],
  archivedAgenceSettings: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_AGENCE) {
    return Object.assign({}, state, {
      archivedAgenceSettings: action.payload,
    });
  }

  if (action.type === ADD_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: state.agenceSettings.concat(action.payload),
    });
  }

  if (action.type === EDIT_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: [
        ...state.agenceSettings.filter((element) => element.id !== action.payload.id),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: [
        ...state.agenceSettings.filter((element) => element.id !== action.payload.id),
      ],
      archivedAgenceSettings: state.archivedAgenceSettings.concat(action.payload),
    });
  }

  return state;
}
