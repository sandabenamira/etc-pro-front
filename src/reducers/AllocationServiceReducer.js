import {
  FETECHED_ALL_ALLOCATION_SERVICE,
  ADD_ALLOCATION_SERVICE,
  EDIT_ALLOCATION_SERVICE,
  DELETE_ALLOCATION_SERVICE,
} from "../constants/ActionTypes";

const initialState = {
  remoteServices: [],
  allocationServiceList: [],
};

export default function(state = initialState, action) {
  if (action.type === FETECHED_ALL_ALLOCATION_SERVICE) {
    return Object.assign({}, state, {
      allocationServiceList: action.payload,
    });
  }

  if (action.type === ADD_ALLOCATION_SERVICE) {
    return Object.assign({}, state, {
      remoteServices: state.remoteServices.concat(action.payload),
    });
  }

  if (action.type === DELETE_ALLOCATION_SERVICE) {
    return Object.assign({}, state, {
      remoteServices: [
        ...state.remoteServices.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
    });
  }

  if (action.type === EDIT_ALLOCATION_SERVICE) {
    return Object.assign({}, state, {
      remoteServices: [
        ...state.remoteServices.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  return state;
}
