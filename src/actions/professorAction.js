 import { classService } from '../_services/class.service';
import { roleIdProfessor } from '../config/config';
import { GET_PROFESSOR } from '../constants/ActionTypes';
export function professorBySubjectId(professors, subject_id) {
  let profList = professors.filter((element) => element.subject_id === subject_id);
  return profList;
}

export function getData() {
  return (dispatch) => {
    let apiEndpoint = `/professors?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        dispatch({ type: 'DATA_LOADED', payload: response.data });
      })
      .catch((error) => {});
  };
}

export function getProfesseurByEstablishmentId(establishment_id) {
  return function (dispatch) {
    let apiEndpoint = `/profile_establishments?access_token=${localStorage.token}&filter[include][profile]=user&filter[include][profile]=professors&filter[where][establishment_id]=${establishment_id}`;
    classService.get(apiEndpoint).then((res) => {
      const list = res.data;
      const professorsList = list.filter((element) => element.profile.user.status === true && element.profile.role_id === roleIdProfessor);
      dispatch({ type: GET_PROFESSOR, payload: professorsList });
    });
  };
}
