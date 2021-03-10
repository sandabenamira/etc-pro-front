import {
  FETECHED_ALL_ROOMS,
  FETECHED_ALL_ROOMS_BY_ESTABLISHMENET_ID,
  ADD_ROOM,
  EDIT_ROOM,
  DELETE_ROOM
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */

  const initialState = {
    rooms: []
  };
  export default function (state = initialState, action) {
    if (action.type === FETECHED_ALL_ROOMS) {
      return Object.assign({}, state, {
        rooms: action.payload
      });
    }
  
    if (action.type === FETECHED_ALL_ROOMS_BY_ESTABLISHMENET_ID) {
      return Object.assign({}, state, {
        rooms: action.payload
      });
    }
    if (action.type === ADD_ROOM) {
      return Object.assign({}, state, {
         rooms: state.rooms.concat(action.payload),

      });
    }
    if (action.type === EDIT_ROOM) {
      return Object.assign({}, state, {
        rooms: [
          ...state.rooms.filter(
            (element) => element.id !== action.payload.id
          ),
          action.payload,
        ],
      });
    }
    if (action.type === DELETE_ROOM) {
      return Object.assign({}, state, {
        rooms: [
          ...state.rooms.filter(
            (element) => element.id !== action.payload.id
          ),
         ],
      });
    }
    return state;
  }
  