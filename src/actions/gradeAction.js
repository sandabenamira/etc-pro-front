
import { gradeService } from '../_services/grade.service';
import { GET_ALL_GRADES, ADD_GRADE, UPDATE_GRADE } from "../constants/ActionTypes";

export const getGrades = () => {
  return dispatch => {
    let apiEndpoint = `/grades?access_token=${localStorage.token}`;
    gradeService.get(apiEndpoint).then(
      (response) => {
        dispatch({ type: GET_ALL_GRADES, payload: response.data })
      }).catch((err) => {
      })
  };
};


export const addGrade = (gradeItem) => {
  return (dispatch) => {
    let apiEndpoint = '/grades';
    gradeService.post(apiEndpoint, gradeItem)
      .then(response => {
        let data = response.data;
        dispatch({ type: ADD_GRADE, payload: data })
      })
      .catch(error => { throw (error) });
  };
};

export const updateGrade = (gradeItem) => {
  return (dispatch) => {
    let apiEndpoint = '/grades/' + gradeItem.id +`?access_token=${localStorage.token}`;
    let value = gradeItem.value;
    let comment = gradeItem.comment;
    const student_id = gradeItem.student_id;
    const class_id = gradeItem.class_id;
    const exam_id = gradeItem.exam_id;
    const data = { value, comment, student_id, class_id, exam_id };
    gradeService.put(apiEndpoint, data)
      .then(response => {
        dispatch({ type: UPDATE_GRADE, payload: response.data })
      }).catch(error => { throw (error) });
  };
};

export const gradeAction = {
  getGrades,
  addGrade,
  updateGrade
};