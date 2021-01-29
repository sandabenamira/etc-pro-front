import {
  SHOW_LOADER,
  HIDE_LOADER,
  GET_FOLDERS_ARCHITECTURE,
  GET_MATERIAL_COURSE,
  GET_MATERIAL_COURSE_ARCHIVED,
  DELETE_MATERIAL_COURSE
} from '../constants/ActionTypes';

const initialState = {
  remoteFolderCourse: [],

  remoteMaterialCourse: [],
  archivedMaterialCourse: [],
  materialCourseLoading: false,
  remoteMaterialCourseArchived:[]
};

export default function(state = initialState, action) {
  if (action.type === GET_FOLDERS_ARCHITECTURE) {
    return Object.assign({}, state, {
      remoteFolderCourse: action.payload,
    });
  }
  if (action.type === GET_MATERIAL_COURSE) {
    return Object.assign({}, state, {
      remoteMaterialCourse: action.payload,
    });
  }
  if (action.type === GET_MATERIAL_COURSE_ARCHIVED) {
    return Object.assign({}, state, {
      remoteMaterialCourseArchived: action.payload,
    });
  }
  if (action.type === DELETE_MATERIAL_COURSE) {
    let itemDeleted = state.remoteMaterialCourse.find(
      (element) => element.id == action.payload
    );
 
    return Object.assign({}, state, {
      remoteMaterialCourse: [
        ...state.remoteMaterialCourse.filter((element) => element.id !== action.payload),
      ],
      remoteMaterialCourseArchived: state.remoteMaterialCourseArchived.concat(itemDeleted),
    });
  }
  return state;
}