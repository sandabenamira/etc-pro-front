import {
    ARCHIVED,
    GET,
    EDIT,
    ADD,
    DELETE,
    PUBLISH,
  } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */

  
  const initialState = {
    entity: [],
    archivedEntity: [],
  };
  
  export default function(state = initialState, action) {
    if (action.type === GET) {
      return Object.assign({}, state, {
        entity: action.payload,
      });
    }
    if (action.type === ARCHIVED) {
      return Object.assign({}, state, {
        archivedEntity: action.payload,
      });
    }
  
    if (action.type === ADD) {
      return Object.assign({}, state, {
        entity: state.entity.concat(action.payload),
      });
    }
  
    if (action.type === EDIT) {
      return Object.assign({}, state, {
        entity: [
          ...state.entity.filter((element) => element.id !== action.payload.id),
          action.payload,
        ],
      });
    }
  
    if (action.type === DELETE) {
      return Object.assign({}, state, {
        entity: [
          ...state.entity.filter((element) => element.id !== action.payload.id),
        ],
        archivedEntity: state.archivedEntity.concat(action.payload),
      });
    }
    if (action.type === PUBLISH) {
      return Object.assign({}, state, {
        archivedEntity: [
          ...state.archivedEntity.filter(
            (element) => element.id !== action.payload.id
          ),
        ],
        entity: state.entity.concat(action.payload),
      });
    }
    return state;
  }
  