import {
  FETECHED_ALL_SCHOOL_YEAR_ETAB,
  ADD_SCHOOL_YEAR_ETAB,
  EDIT_SCHOOL_YEAR_ETAB,
  DELETE_SCHOOL_YEAR_ETAB,
} from "../constants/ActionTypes";

const initialState = {
  remoteSchoolYearEtab: [],
  schoolYear:[]
};

export default function(state = initialState, action) {
  if (action.type === FETECHED_ALL_SCHOOL_YEAR_ETAB) {
    return Object.assign({}, state, {
      remoteSchoolYearEtab: action.payload,
      schoolYear:action.payload,
    });
  }

  if (action.type === ADD_SCHOOL_YEAR_ETAB) {
    return Object.assign({}, state, {
      remoteSchoolYearEtab: state.remoteSchoolYearEtab.concat(action.payload),
    });
  }

  if (action.type === DELETE_SCHOOL_YEAR_ETAB) {
    return Object.assign({}, state, {
      remoteSchoolYearEtab: [
        ...state.remoteSchoolYearEtab.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
    });
  }

  if (action.type === EDIT_SCHOOL_YEAR_ETAB) {
    return Object.assign({}, state, {
      remoteSchoolYearEtab: [
        ...state.remoteSchoolYearEtab.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  return state;
}
