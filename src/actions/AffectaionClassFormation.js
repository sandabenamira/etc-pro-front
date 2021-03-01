import { classService } from '../_services/class.service';
import {
  ADD_CLASS_FORMATION,
  ADD_ASSIGNMENT_FORMATION,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  ADD_CLASS_SETTINGS,
  ADD_ASSIGNEMENT_COURSE,
} from '../constants/ActionTypes';
export function addClassFormation(data, subjectSelected) {
  return (dispatch) => {
    let apiEndpoint = `/class_v4/affectClassFormation?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        let assignmentClassToFormation = {
          ...response.data.affectation.result[0].assignClassToFormation,
          class: response.data.affectation.result[0].classFormation,
          subject: subjectSelected,
          course: [response.data.affectation.result[0].assignFormationToProf],
        };
        if (response.data.affectation.affectation) {
          dispatch({
            type: ADD_CLASS_FORMATION,
            payload: response.data.affectation.result[0].classFormation.id,
          });
          dispatch({
            type: ADD_ASSIGNMENT_FORMATION,
            payload: response.data.affectation.result[0].assignClassToFormation.id,
          });
          dispatch({
            type: ADD_CLASS_SETTINGS,
            payload: { ...response.data.affectation.result[0].classFormation, group: [] },
          });
          dispatch({ type: ADD_ASSIGNEMENT_COURSE, payload: assignmentClassToFormation });
        }
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}
export function addCollaboratorFormation(data) {
  return (dispatch) => {
    let apiEndpoint = `/inscription_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        console.log(response.data, 'response addCollaboratorFormation');
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}
export function addPlanningFormation(data, objMail) {
  return (dispatch) => {
    let apiEndpoint = `/planning_events?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        if (objMail !== undefined) {
          let apiEndpoint1 = `/planning_events/planning-notif?access_token=${localStorage.token}`;
          classService.post(apiEndpoint1, objMail).then((response) => {
            //
          });
        }
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}
