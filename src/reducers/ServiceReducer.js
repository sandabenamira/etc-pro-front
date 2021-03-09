import {
  FETECHED_ALL_SERVICES,
  ADD_SERVICE,
  EDIT_SERVICE,
  DELETE_SERVICE,
  
  FETECHED_ALL_SERVICES_ARCHIVES,
  LIST_ALLOCATION_SERVICE,
  FETECHED_ALL_SERVICES_V2,
} from "../constants/ActionTypes";

const initialState = {
  remoteServices: [],
  archiveServices: [],
  allocationService: [],
  servicesV2: [],
};

export default function(state = initialState, action) {
  if (action.type === FETECHED_ALL_SERVICES) {
    return Object.assign({}, state, {
      remoteServices: action.payload,
    });
  }
  if (action.type === FETECHED_ALL_SERVICES_V2) {
    return Object.assign({}, state, {
      servicesV2: action.payload,
    });
  }
  if (action.type === FETECHED_ALL_SERVICES_ARCHIVES) {
    return Object.assign({}, state, {
      archiveServices: action.payload,
    });
  }

  if (action.type === ADD_SERVICE) {
    return Object.assign({}, state, {
      remoteServices: state.remoteServices.concat(action.payload),
    });
  }

  if (action.type === DELETE_SERVICE) {
    return Object.assign({}, state, {
      remoteServices: [
        ...state.remoteServices.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
    });
  }

  if (action.type === EDIT_SERVICE) {
    return Object.assign({}, state, {
      remoteServices: [
        ...state.remoteServices.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }
  if (action.type === LIST_ALLOCATION_SERVICE) {
    return Object.assign({}, state, {
      allocationService: action.payload,
    });
  }

  return state;
}
