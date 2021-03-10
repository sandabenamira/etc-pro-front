import React from 'react';
import moment from 'moment';
import { classService } from '../_services';
import {
  ADD_EVENT,
  EDIT_EVENT,
  FETECHED_ALL_EVENTS,
  REMOVE_EVENT,
  UPDATE_EVENT,
  GET_EVENTS_CLASS,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  GET_EVENTS_call_REGISTER,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */

import baseUrl from '../config/config';
import IntlMessages from '../util/IntlMessages';

export const getProessorssByClass = (id) => {
  return (dispatch) => {
    let apiEndpoint =
      `/classes_professors/getProfessorByClassId/` + id + `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        dispatch({ type: 'GET_PROFESSORS_BY_CLASS', payload: response.data });
      })
      .catch((err) => {});
  };
};

const receiveEvents = (events) => ({
  type: FETECHED_ALL_EVENTS,
  payload: events,
});

export const addEvent = (itemEvent, itemSuplimentaire, notifMsg) => {
  let objMail = {};
  objMail.classId = itemSuplimentaire.classId;
  objMail.notifMsg = notifMsg;
  objMail.establishmentId = itemSuplimentaire.establishmentId;
  objMail.logoEstab = itemSuplimentaire.logoEstab;

  return (dispatch) => {
    let apiEndpoint = `/planning_events?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, itemEvent).then((response) => {
      if (response) {
        if (notifMsg !== undefined && notifMsg !== '') {
          let apiEndpoint1 = `/planning_events/planning-notif?access_token=${localStorage.token}`;
          classService.post(apiEndpoint1, objMail).then((response) => {
            //
          });
        }
        dispatch(
          getEventsByEstabAndSchoolYear(
            itemSuplimentaire.establishmentId,
            itemSuplimentaire.schoolYearId,
            itemSuplimentaire.classId
          )
        );
      }
    });
  };
};

export const PlanningAction = {
  addEvent,
};

export const getEventsByEstabAndSchoolYear = (establishementId, schoolYearId, classId) => {
  return (dispatch) => {
    let apiEndpoint = `/planning_events/fetchPlanningEvents/${establishementId}/${schoolYearId}/${classId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let listEvents = response.data.planningsEvents;

        let newListEvents = [];
        let newEvent = {};
        listEvents.forEach((event) => {
          newEvent = {
            id: event.id,
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            frequency: event.frequency,
            eventType: event.eventType,
            status: event.status,
            roomId: event.roomId,
            roomName: event.roomName,
            profId: event.profId,
            profName: event.profName,
            profSurname: event.profSurname,
            assignClassSubjectId: event.assignClassSubjectId,
            subjectId: event.subjectId,
            subjectColor: event.subjectColor,
            subjectName: event.subjectName,
            classId: event.classId,
            classeName: event.className,
            creatorName: event.creatorName,
            creatorSurname: event.creatorSurname,
            profGender: event.profGender,
            idRepetition: event.idRepetition,
            repetition: event.repetition,
          };
          newListEvents.push(newEvent);
        });

        dispatch({ type: GET_EVENTS_CLASS, payload: newListEvents });
      }
    });
  };
};

export const editEvent = (itemEvent, itemSuplimentaire, notifMsg) => {
  let objMail = {};
  objMail.classId = itemSuplimentaire.classId;
  objMail.notifMsg = notifMsg;
  objMail.establishmentId = itemSuplimentaire.establishmentId;
  objMail.logoEstab =  itemSuplimentaire.logoEstab;
  return (dispatch) => {
    let apiEndpoint = `/planning_events/` + itemEvent.id + `?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, itemEvent).then((response) => {
      if (response) {
        if (notifMsg != undefined && notifMsg != '') {
          let apiEndpoint1 = `/planning_events/planning-notif?access_token=${localStorage.token}`;
          classService.post(apiEndpoint1, objMail).then((response) => {});
        }

        dispatch(
          getEventsByEstabAndSchoolYear(
            itemSuplimentaire.establishmentId,
            itemSuplimentaire.schoolYearId,
            itemSuplimentaire.classId
          )
        );
      }
    });
  };
};

export const deleteEvent = (
  typeDelete,
  itemEvent,
  establishmentId,
  schoolYearId,
  classId,
  messageNotif,
  logoEstab
) => {
  let objMail = {};
  objMail.classId = classId;
  objMail.notifMsg = messageNotif;
  objMail.establishmentId = establishmentId;
  objMail.logoEstab = logoEstab;

  return (dispatch) => {
    let apiEndpoint =
      `/planning_events/` +
      itemEvent.id +
      `?access_token=${localStorage.token}&filter[include][callRegister]`;
    classService.get(apiEndpoint, itemEvent).then((response) => {
      let momentStartData = moment(itemEvent.start);

      if (response) {
        let canDelete = true;
        if (typeDelete == 'future') {
          let sameDateCallRegister = [];
          sameDateCallRegister = response.data.callRegister.filter((call) =>
            moment(call.start_date).isSameOrAfter(momentStartData)
          );
          canDelete = sameDateCallRegister.length == 0;
        } else if (typeDelete == 'uniq') {
          let sameDateCallRegister = [];
          sameDateCallRegister = response.data.callRegister.filter((call) =>
            moment(call.start_date).isSame(momentStartData)
          );
          canDelete = sameDateCallRegister.length == 0;
        } else if (typeDelete == 'all') {
          if (response.data.callRegister.length > 0) {
            canDelete = false;
          }
        }
        if (!canDelete) {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Cet évènement est attaché à un registre d'appel !",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 2500);
        } else {
          let newData = {};
          newData.id = itemEvent.id;
          newData.status = itemEvent.status;
          newData.repetition = itemEvent.repetition;

          let apiEndpoint =
            `/planning_events/` + newData.id + `?access_token=${localStorage.token}`;
          classService.patch(apiEndpoint, newData).then((response) => {
            if (response) {
              //*************notiif mail delete event */

              let apiEndpoint1 = `/planning_events/planning-notif?access_token=${localStorage.token}`;
              classService.post(apiEndpoint1, objMail).then((response) => {});
              dispatch({
                type: SHOW_SUCCESS_MESSAGE,
                payload: 'Cet évènement est supprimé avec succès',
              });
              setTimeout(() => {
                dispatch({ type: HIDE_SUCCESS_MESSAGE });
              }, 3000);

              dispatch(getEventsByEstabAndSchoolYear(establishmentId, schoolYearId, classId));
            }
          });
        }
      }
    });
  };
};

export const getEventsByEstabAndSchoolYearForProf = (establishementId, schoolYearId, profileId) => {
  return (dispatch) => {
    let apiEndpoint = `/planning_events/fetchScheduleProf/${establishementId}/${schoolYearId}/${profileId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let listEvents = response.data.profSchedule;
        let newListEvents = [];
        let newEvent = {};
        listEvents.forEach((event) => {
          newEvent = {
            id: event.id,
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            frequency: event.frequency,
            eventType: event.eventType,
            status: event.status,
            roomId: event.roomId,
            roomName: event.roomName,
            profId: event.profId,
            profName: event.profName,
            profSurname: event.profSurname,
            assignClassSubjectId: event.assignClassSubjectId,
            subjectId: event.subjectId,
            subjectColor: event.subjectColor,
            subjectName: event.subjectName,
            classId: event.classId,
            classeName: event.className,
            creatorName: event.creatorName,
            creatorSurname: event.creatorSurname,
            profGender: event.profGender,
          };
          newListEvents.push(newEvent);
        });

        dispatch({ type: GET_EVENTS_CLASS, payload: newListEvents });
      }
    });
  };
};

export const getEventCallRegisterForAdmin = (establishementId, schoolYearId, classId) => {
  return (dispatch) => {
    let apiEndpoint = `/planning_events/fetchPlanningEvents/${establishementId}/${schoolYearId}/${classId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let listEvents = response.data.planningsEvents;
        let newListEvents = [];
        let newEvent = {};
        listEvents.forEach((event) => {
          if (event.eventType === 'lesson' || event.eventType === 'exam') {
            newEvent = {
              id: event.id,
              start: new Date(event.start),
              end: new Date(event.end),
              title: event.title,
              frequency: event.frequency,
              eventType: event.eventType,
              status: event.status,
              roomId: event.roomId,
              roomName: event.roomName,
              profId: event.profId,
              profName: event.profName,
              profSurname: event.profSurname,
              assignClassSubjectId: event.assignClassSubjectId,
              subjectId: event.subjectId,
              subjectColor: event.subjectColor,
              subjectName: event.subjectName,
              classId: event.classId,
              classeName: event.className,
              creatorName: event.creatorName,
              creatorSurname: event.creatorSurname,
              profGender: event.profGender,
              tagCallRegister: event.tagCallRegister,
            };
            newListEvents.push(newEvent);
          }
        });

        dispatch({ type: GET_EVENTS_call_REGISTER, payload: newListEvents });
      }
    });
  };
};

export const getEventCallRegisterForProf = (establishementId, schoolYearId, profileId) => {
  return (dispatch) => {
    let apiEndpoint = `/planning_events/fetchScheduleProf/${establishementId}/${schoolYearId}/${profileId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let listEvents = response.data.profSchedule;
        let newListEvents = [];
        let newEvent = {};

        listEvents.forEach((event) => {
          if (event.eventType === 'lesson' || event.eventType === 'exam') {
            newEvent = {
              id: event.id,
              start: new Date(event.start),
              end: new Date(event.end),
              description: event.description,
              frequency: event.frequency,
              eventType: event.eventType,
              status: event.status,
              roomId: event.roomId,
              roomName: event.roomName,
              profId: event.profId,
              profName: event.profName,
              profSurname: event.profSurname,
              assignClassSubjectId: event.assignClassSubjectId,
              subjectId: event.subjectId,
              subjectColor: event.subjectColor,
              subjectName: event.subjectName,
              classId: event.classId,
              classeName: event.className,
              creatorName: event.creatorName,
              creatorSurname: event.creatorSurname,
              profGender: event.profGender,
              tagCallRegister: event.tagCallRegister,
            };
            newListEvents.push(newEvent);
          }
        });

        dispatch({ type: GET_EVENTS_call_REGISTER, payload: newListEvents });
      }
    });
  };
};
export const getEventCallRegisterForParent = (profileId) => {
  return (dispatch) => {
    let apiEndpoint = `/planning_events/fetchScheduleParent/${profileId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let listEvents = response.data.parentSchedule;
        let newListEvents = [];
        let newEvent = {};

        listEvents.forEach((event) => {
          newEvent = {
            id: event.id,
            start: new Date(event.start),
            end: new Date(event.end),
            status: event.status,
            tagCallRegister: event.tagCallRegister,
          };
          newListEvents.push(newEvent);
        });
        dispatch({ type: GET_EVENTS_call_REGISTER, payload: newListEvents });
      }
    });
  };
};
