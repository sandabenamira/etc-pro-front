import { GET_ALL_LESSON, ADD_LESSON, DELETE_LESSON, EDIT_LESSON } from '../constants/ActionTypes';

const initialState = {
  remoteLessons: []
};

export default function (state = initialState, action) {
  if (action.type === GET_ALL_LESSON) {
    return Object.assign({}, state, {
      remoteLessons: action.payload
    });
  }
  if (action.type === ADD_LESSON) {
    return Object.assign({}, state, {
      remoteLessons: state.remoteLessons.concat(action.payload)
    });
  }

  if (action.type === DELETE_LESSON) {
    return Object.assign({}, state, {
      remoteLessons: [
        ...state.remoteLessons.filter(
          element => element.id !== action.payload.id
        )
      ]
    });
  }

  if (action.type === EDIT_LESSON) {
    return Object.assign({}, state, {
      remoteLessons: [
        ...state.remoteLessons.filter(
          element => element.id !== action.payload.id
        ),
        action.payload
      ]
    });
  }


  return state;
}
