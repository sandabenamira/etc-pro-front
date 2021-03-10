import {
  GET_ALL_CallRegister,
  GET_CONTEXTUAL_EVENT,
  GET_STUDENTS_CLASS,
  GET_STUDENTS_ABSENT,
  GIVE_STUDENT_TICKET,
  GET_OBSERVATIONS,
  GET_ENCOURAGEMENTS,
  GET_SANCTION,
  GET_SETTING_CALL_REGISTER
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
  calls: [],
  contextualEvent: [],
  hasLesson: false,
  studentsClass: {},
  absentStudents: [],
  observations: [],
  encouragements: [],
  sanctions: [],
  settingCallRegister:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CallRegister:
      return Object.assign({}, state, {
        calls: action.payload,
      });
    case GET_CONTEXTUAL_EVENT:
      return Object.assign({}, state, {
        contextualEvent: action.payload.data,
        hasLesson: action.payload.notEmpty ? true : false,
      });
    case GET_STUDENTS_CLASS:
      return Object.assign({}, state, {
        studentsClass: action.payload,
      });
    case GET_STUDENTS_ABSENT:
      return Object.assign({}, state, {
        absentStudents: action.payload,
      });
    case GIVE_STUDENT_TICKET:
      return Object.assign({}, state, {
        absentStudents: [
          ...state.absentStudents.filter(
            (element) => element.id !== action.payload.id
          ),
        ],
      });
    case GET_OBSERVATIONS:
      return Object.assign({}, state, {
        observations: action.payload,
      });
    case GET_ENCOURAGEMENTS:
      return Object.assign({}, state, {
        encouragements: action.payload,
      });
    case GET_SANCTION:
      return Object.assign({}, state, {
        sanctions: action.payload,
      });
    case GET_SETTING_CALL_REGISTER:
      return Object.assign({}, state, {
        settingCallRegister: action.payload,
      });

    default:
      return state;
  }
}
