import {
  ADD_SATIS_SURVEY,
  EDIT_SATIS_SURVEY,
  DELETE_SATIS_SURVEY,
  GET_SATIS_SURVEY_LIST
  } from '../constants/ActionTypes';
  
  const initialState = {
    satisfactionSurveyList: [],
    archivedsatisfactionSurveyList: [],
  };
  
  export default function(state = initialState, action) {
    if (action.type === GET_SATIS_SURVEY_LIST) {
      return Object.assign({}, state, {
        satisfactionSurveyList: action.payload,
      });
    }
    if (action.type === ARCHIVED_GET_GROUPS) {
      return Object.assign({}, state, {
        archivedsatisfactionSurveyList: action.payload,
      });
    }
  
    if (action.type === ADD_SATIS_SURVEY) {
      let classItmem = state.satisfactionSurveyList.find((element) => element.id===action.payload.id);
      let newItem = {};
      if (classItmem===undefined) {
        newItem = action.payload;
      } else {
        newItem = { ...classItmem, group: classItmem.group.concat(action.payload.group) };
      }
      return Object.assign({}, state, {
        satisfactionSurveyList: [...state.satisfactionSurveyList.filter((element) => element.id !== newItem.id)].concat(
          newItem
        ),
      });
    }
  
    if (action.type === EDIT_SATIS_SURVEY) {
      return Object.assign({}, state, {
        satisfactionSurveyList: [
          ...state.satisfactionSurveyList.filter((element) => element.id !== action.payload.id),
          action.payload,
        ],
      });
    }
  
    if (action.type === DELETE_SATIS_SURVEY) {
      return Object.assign({}, state, {
        satisfactionSurveyList: [...state.satisfactionSurveyList.filter((element) => element.id !== action.payload.id)],
        archivedsatisfactionSurveyList: state.archivedsatisfactionSurveyList.concat(action.payload),
      });
    }
  
    return state;
  }
  