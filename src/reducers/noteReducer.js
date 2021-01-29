import {
  GET_ALL_GRADES,
  ADD_GRADE,
  UPDATE_GRADE,
} from '../constants/ActionTypes';

const initialState = {
  grades: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GRADES:
      return Object.assign({}, state, {
        grades: action.payload,
      });
    case ADD_GRADE:
      return Object.assign({}, state, {
        grades: state.grades.concat(action.payload),
      });
    case UPDATE_GRADE:
      return Object.assign({}, state, {
        grades: [
          ...state.grades.filter((element) => element.id !== action.payload.id),
          action.payload,
        ],
      });
    default:
      return state;
  }
}
