import {  FETECHED_ALL_EVENTS,EDIT_EVENT, GET_EVENTS_call_REGISTER,
   REMOVE_EVENT, UPDATE_EVENT, GET_EVENTS_CLASS,ADD_EVENT } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
  events: [],
  callRegisterEvents:[],
  alertMessage: '',
  showMessageEvent: false,
  professorsClass: [],
  test: false


};

export default function planningReducer(state = initialState, action) {
  switch (action.type) {
    case FETECHED_ALL_EVENTS:
      return Object.assign({}, state, {
        events: action.payload
      });
    case GET_EVENTS_call_REGISTER:
      {
        return Object.assign({}, state, {
          callRegisterEvents: action.payload
        });
      }
      case GET_EVENTS_CLASS:
        {
          return Object.assign({}, state, {
            events: action.payload
          });
        }
        case ADD_EVENT:{
        return Object.assign({}, state, {
          events: state.events.concat(action.payload),
        });
    }

    case REMOVE_EVENT:
      return state.filter((classe) => classe.id !== action.payload.id);

    case UPDATE_EVENT:
      return state.map((classItem) => {
        // const { id, professors, students, name, niveau, establishment, capacity, start_date, end_date, description } = action.payload;
        if (classItem.id === action.payload.id) {
          return {
            ...classItem,
            name: action.payload.name,
            level_class: action.payload.level_class,
            student_id: action.payload.student_id,
            professor_id: action.payload.professor_id,
            establishment_id: action.payload.establishment_id,
            capacity: action.payload.capacity,
            start_date: action.payload.start_date,
            end_date: action.payload.end_date,
            description: action.payload.description,
            students_number: action.payload.students_number,
          }
        } else return classItem;
      });
    case 'GET_PROFESSORS_BY_CLASS':
      return Object.assign({}, state, {
        professorsClass: action.payload
      });
    case 'GET_EVENTS_BY_STUDENT':
      return Object.assign({}, state, {
        events: action.payload
      });
    case 'ADD_EVENT_NOT_ALLOWED':
      return {
        ...state,
        showMessageEvent: true,
        alertMessage: action.payload
      }
    case 'HANDLE_EVENT_REQUEST_CLOSE':
      return {
        ...state,
        showMessageEvent: false,
      }
    case 'GET_EVENTS_STUDENT':
      return Object.assign({}, state, {
        events: action.payload
      });
    case 'GET_EVENTS_BY_CLASS':
      return Object.assign({}, state, {
        events: action.payload
      });

    case 'GET_EVENTS_PROFESSOR':
      return {
        ...state,
        events: action.payload,
      }

      case 'REMOVE_EVENTS_LIST':
      return {
        ...state,
        events: [],
      }
      
      case EDIT_EVENT:{
        return Object.assign({}, state, {
          events: [
            ...state.events.filter(
              (element) => element.id !== action.payload.id
            ),
            action.payload,
          ],
        });
    }

    default:
      return state
  }
}

