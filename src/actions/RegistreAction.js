import { callService } from '../_services/call.service';
import { classService } from '../_services/class.service';
import { roleIdAdmin } from '../config/config';
import {
  GET_ALL_CallRegister,
  GET_CONTEXTUAL_EVENT,
  GET_STUDENTS_CLASS,
   GIVE_STUDENT_TICKET,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  GET_OBSERVATIONS,
  GET_ENCOURAGEMENTS,
  GET_SANCTION,
  GET_SETTING_CALL_REGISTER,
} from '../constants/ActionTypes';
import _ from 'lodash';
import {
  getEventCallRegisterForAdmin,
  getEventCallRegisterForProf,
  getEventCallRegisterForParent,
} from '../actions/planningActions';
import moment from 'moment';

export const getCallRegister = () => {
  return (dispatch) => {
    let apiEndpoint = `/call_registers?access_token=${localStorage.token}`;
    callService
      .get(apiEndpoint)
      .then((response) => {
        dispatch({ type: GET_ALL_CallRegister, payload: response.data });
      })
      .catch((err) => {});
  };
};
export const getContextualEventsByprofessor = (professorProfile) => {
  return (dispatch) => {
    let apiEndpoint =
      `/professors/getContextualEvent/` + professorProfile + `?access_token=${localStorage.token}`;
    callService
      .get(apiEndpoint)
      .then((response) => {
        let result = {
          notEmpty: !_.isEmpty(response.data.contextualEvent),
          data: response.data.contextualEvent,
        };

        dispatch({ type: GET_CONTEXTUAL_EVENT, payload: result });
      })
      .catch((err) => {});
  };
};

export const callRegisterAction = {
  getCallRegister,
  getContextualEventsByprofessor,
};

export const getStudentClass = (classId) => {
  return (dispatch) => {
    let apiEndpoint =
      `/students/fetchStudentsByClassID/` + classId + `?access_token=${localStorage.token}`;
    callService
      .get(apiEndpoint)
      .then((response) => {
        let result = response.data;

        dispatch({ type: GET_STUDENTS_CLASS, payload: result });
      })
      .catch((err) => {})
      .catch((err) => {});
  };
};

export const giveTicket = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/absent_pass/giveTicketToPass?access_token=${localStorage.token}`;
    callService.post(apiEndpoint, data).then((res) => {
      if (res) {
        dispatch({ type: GIVE_STUDENT_TICKET, payload: res.data.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'Le billet est affecté avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de l'affectation du billet merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};

export function addCallRegisterSetting(data) {
  return (dispatch) => {
    let apiEndpoint = `/call_register_settings?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "L'initialisation est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de l'initialisation merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}

export const getObservationList = () => {
  return (dispatch) => {
    let apiEndpoint = `/observations?access_token=${localStorage.token}`;
    callService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_OBSERVATIONS, payload: response.data });
      }
    });
  };
};

export const getEncouragementList = () => {
  return (dispatch) => {
    let apiEndpoint = `/encouragements?access_token=${localStorage.token}`;
    callService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_ENCOURAGEMENTS, payload: response.data });
      }
    });
  };
};

export const getSanctionList = () => {
  return (dispatch) => {
    let apiEndpoint = `/sanctions?access_token=${localStorage.token}`;
    callService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_SANCTION, payload: response.data });
      }
    });
  };
};
export const getCallRegisterSetting = (idEducationType) => {
  return (dispatch) => {
    let apiEndpoint = `/call_register_settings?access_token=${localStorage.token}&filter[where][fk_id_education_type]=${idEducationType}`;
    callService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: GET_SETTING_CALL_REGISTER, payload: response.data });
      }
    });
  };
};

export function editCallRegisterSetting(data) {
  return (dispatch) => {
    let apiEndpoint = `/call_register_settings/${data.id}?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'La réinitialisation est effectuée avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de l'initialisation merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}
export function saveCallRegisterParent(data, otherData) {
  return (dispatch) => {
    let apiEndpoint = `/call_registers/create-call-register?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch(getEventCallRegisterForParent(otherData.profileId));
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "L'enregistrement de l'appel est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de l'enregistrement merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}
export function saveCallRegister(data, otherData, mailInfo) {
  let objMail = {};
  objMail.classId = otherData.classId;
  objMail.notifMsg = 'messageNotif';
  objMail.establishmentId = otherData.establishementId;
  objMail.callRegister = data;
  objMail.callRegisterInfo = mailInfo.split('/');
  objMail.dateCallRegister = moment().format('LLLL');
  objMail.logoEstab =otherData.logoEstab;


  return (dispatch) => {
    let apiEndpoint = `/call_registers/create-call-register?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        let apiEndpoint1 = `/planning_events/planning-notif?access_token=${localStorage.token}`;
        classService.post(apiEndpoint1, objMail).then((response) => {});
        if (otherData.roleId === roleIdAdmin) {
          dispatch(
            getEventCallRegisterForAdmin(
              otherData.establishementId,
              otherData.schoolYearId,
              otherData.classId
            )
          );
        } else {
          dispatch(
            getEventCallRegisterForProf(
              otherData.establishementId,
              otherData.schoolYearId,
              otherData.profileId
            )
          );
        }
         dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "L'enregistrement de l'appel est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de l'enregistrement merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}