import {
  ADD_MOOCS,
  GET_MOOCS,
  EDIT_MOOCS,
  DELETE_MOOCS,
  ARCHIVED_GET_MOOCS,
   SHOW_LOADER,
  HIDE_LOADER
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
  remoteMoocs: [],
  archivedMoocs: [],
  moocsLoading:false
};

export default function(state = initialState, action) {
  if (action.type === GET_MOOCS) {
    return Object.assign({}, state, {
      remoteMoocs: action.payload,
      moocsLoading:false
    });
  }

  if (action.type === ADD_MOOCS) {
    return Object.assign({}, state, {
      remoteMoocs: state.remoteMoocs.concat(action.payload)
      ,moocsLoading: false,
    });
  }
  if (action.type === HIDE_LOADER) {
    return Object.assign({}, state, {
      moocsLoading: false,
    });
  }
  if (action.type === SHOW_LOADER) {
    return Object.assign({}, state, {
      moocsLoading: true,
    });
  }
  if (action.type === ARCHIVED_GET_MOOCS) {
    return Object.assign({}, state, {
      archivedMoocs: action.payload,
    });
  }
  if (action.type === DELETE_MOOCS) {
    let itemDeleted = state.remoteMoocs.find(
      (element) => element.id===action.payload
    );
 
    return Object.assign({}, state, {
      remoteMoocs: [
        ...state.remoteMoocs.filter((element) => element.id !== action.payload),
      ],
      archivedMoocs: state.archivedMoocs.concat(itemDeleted),
    });
  }

  if (action.type === EDIT_MOOCS) {
    return Object.assign({}, state, {
      remoteMoocs: [
        ...state.remoteMoocs.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  return state;
}
