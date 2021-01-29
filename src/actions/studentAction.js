
import { classService } from "../_services/class.service";
import { GET_STUDENT_BY_ESTABLISHMENT, GET_STUDENT } from '../constants/ActionTypes';
export function getStudents() {
  return dispatch => {
    let apiEndpoint = `/students?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        dispatch({ type: "GET_ALL_STUDENT", payload: response.data });
      }).catch(error => {
      });
  };
};

export function fetchStudentByEstablishmentId(idEstablishment, idSchoolYear) {
  return dispatch => {
    let apiEndpoint = `/students/fetchStudentByEstablishmentId/${idEstablishment}/${idSchoolYear}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        dispatch({ type: GET_STUDENT_BY_ESTABLISHMENT, payload: res.data.students });
      }
    });
  };
}

export function getStudentsCallRegister(idClass, idSchoolYear) {
  return dispatch => {
    let apiEndpoint = `/inscription_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_class_v4]=${idClass}&filter[where][and][1][fk_id_school_year]=${idSchoolYear}&filter[include][student][profile][user]`;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        let callRegister = [];
        let item = {};
        res.data.forEach(element => {
          item = {
            "name": element.student.profile.user.name,
            "surname": element.student.profile.user.surname,
            "presence": true,
            "delay": false,
            "sanction": "",
            "description_sanction": "",
            "observation":"",
            "description_observation":"",
            "encouragement":"",
            "description_encouragement":"",
            "studentId": element.student.id,
            "photo":element.student.profile.user.photo
          }
          callRegister.push(item)
        });

        dispatch({ type: GET_STUDENT, payload: callRegister });
      }
    });
  };
}

