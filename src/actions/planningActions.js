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
} from '../constants/ActionTypes';
import baseUrl from '../config/config';
import IntlMessages from '../util/IntlMessages';

export function getEventsBy2Filters(estab_id, prof_id) {
  let eventsFiltered = [];
  return function(dispatch) {
    return fetch(
      `${baseUrl.baseUrl}/generic_events?access_token=${localStorage.token}&filter[where][and][0][establishment_id]=` +
        estab_id +
        `&filter[where][and][1][professor_id]=` +
        prof_id
    )
      .then((response) => response.json())
      .then((json) => {
        eventsFiltered = json;
        dispatch({ type: 'FETECHED_ALL_EVENTS', payload: eventsFiltered });
      });
  };
}

export const getEvents = () => {
  return (dispatch) => {
    let apiEndpoint = `/generic_events?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        dispatch(receiveEvents(response.data));
      })
      .catch((err) => {});
  };
};
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

export const getEventsByClass = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const subjects = state.subject.remoteSubjects;
    let appLang = state.settings.locale.languageId;

    const rooms = state.rooms;
    let apiEndpoint = `/contextual_events/timetable/${id}?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        let genericEvents = response.data.timetable;
        let timeTableEvents = [];
        for (var i = 0; i < genericEvents.length; i++) {
          //  if(genericEvents[i].event_type==="Class Council"){
          //  }else{
          // if (genericEvents[i].room_id !== null && genericEvents[i].subject_id !== null) {
          //   lessonSubject = subjects.filter(element => element.id === genericEvents[i].subject_id);
          // }
          // lessonRooms = rooms.filter(element => element.id === genericEvents[i].room_id)
          genericEvents[i].contextualEvents.map((event) => {
            // lessonSubject = subjects.filter(element => element.id === event.subject_id);
            //  lessonRooms = rooms.filter(element => element.id === event.room_id)
            const container = {};
            // if (genericEvents[i].room_id !== null && genericEvents[i].subject_id !== null) {
            container['professor_profile'] = event.professor_id;
            container['hexa_color'] = event.subject.hexa_color;
            container['subject_id'] = event.subject.name_FR;
            // }
            container['room_id'] = event.room.name;
            container['idRoom'] = event.room.id;
            container['id_generic_event'] = genericEvents[i].id;
            container['start'] = new Date(event.start_lesson);
            container['end'] = new Date(event.end_lesson);
            container['title'] = genericEvents[i].title;
            container['event_type'] = event.event_type;
            container['class_id'] = genericEvents[i].class_id;
            container['frequency'] = genericEvents[i].frequency;
            container['id'] = event.id;
            container['tag_call'] = event.tag_call;
            container['appLang'] = appLang;
            timeTableEvents.push(container);
          });
        }

        dispatch({ type: GET_EVENTS_CLASS, payload: timeTableEvents });
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
  objMail.establishmentId = itemSuplimentaire.establishmentId

  console.log('------objMail----', objMail);
  return (dispatch) => {
    let apiEndpoint = `/planning_events?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, itemEvent).then((response) => {
      if (response) {
        if (notifMsg != undefined && notifMsg != '') {
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
export const archiverEvent = (classItem) => {
  return (dispatch) => {
    let apiEndpoint = `/generic_events/` + classItem.id + `?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      const item = response.data;
      classService
        .put(apiEndpoint, {
          name: item.name,
          level_class: item.level_class,
          student_id: item.students,
          professor_id: item.professors,
          establishment_id: item.establishment_id,
          capacity: item.capacity,
          start_date: item.start_date,
          end_date: item.end_date,
          description: item.description,
          students_number: item.students_number,
          status: false,
          id: classItem.id,
          event_type: classItem.event_type,
          subject_id: classItem.subject,
        })
        .then((response) => {
          dispatch({ type: REMOVE_EVENT, payload: classItem });
        })
        .catch(function(error) {
          alert('error');
        });
    });
  };
};

export const updateEvent = (item) => {
  return (dispatch) => {
    let apiEndpoint = `/generic_events/` + item.id + `?access_token=${localStorage.token}`;
    // const { name, level_class, establishment, capacity, start_date, end_date, description, students_number, student_id, professor_id } = item;

    classService
      .put(apiEndpoint, {
        title: item.title,
        level_class: item.level_class,
        student_id: item.student_id,
        professor_id: item.professor_id,
        establishment_id: item.establishment_id,
        capacity: item.capacity,
        start_date: item.start_date,
        end_date: item.end_date,
        description: item.description,
        students_number: item.students_number,
      })
      .then((response) => {
        dispatch({ type: UPDATE_EVENT, payload: response.data });
      })
      .catch((error) => {
        throw error;
      });
  };
};
export const handleEventRequestClose = () => {
  return {
    type: 'HANDLE_EVENT_REQUEST_CLOSE',
  };
};

export const PlanningAction = {
  getEvents,
  addEvent,
  archiverEvent,
  updateEvent,
  getEventsBy2Filters,
  handleEventRequestClose,
};

export const getClassTimeTable = (classId) => {
  return (dispatch, getState) => {
    const state = getState();
    const subjects = state.subject.remoteSubjects;
    const rooms = state.rooms;
    let apiEndpoint = `/contextual_events/timetable/${classId}?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        let genericEvents = response.data.timetable;
        let timeTableEvents = [];
        if (state.auth.userProfile.role_id == 3) {
          for (var i = 0; i < genericEvents.length; i++) {
            const lessonRooms = rooms.filter((element) => element.id === genericEvents[i].room_id);
            const lessonSubject = subjects.filter(
              (element) => element.id === genericEvents[i].subject_id
            );
            if (genericEvents[i].professor_id === state.auth.userProfile.id) {
              genericEvents[i].contextualEvents.map((event) => {
                const container = {};
                container['start'] = new Date(event.start_lesson);
                container['end'] = new Date(event.end_lesson);
                container['title'] = genericEvents[i].title;
                container['room_id'] = genericEvents[i].room_id;
                container['room_name'] = lessonRooms[0].name;
                container['class_id'] = genericEvents[i].class_id;
                container['subject_id'] = genericEvents[i].subject_id;
                container['subject_name'] = lessonSubject[0].name;
                container['frequency'] = genericEvents[i].frequency;
                container['id'] = event.id;
                container['hexa_color'] = lessonSubject[0].hexa_color;
                container['professor_profile'] = genericEvents[i].professor_id;
                timeTableEvents.push(container);
              });
            }
          }
        } else {
          for (var i = 0; i < genericEvents.length; i++) {
            const lessonRooms = rooms.filter((element) => element.id === genericEvents[i].room_id);
            const lessonSubject = subjects.filter(
              (element) => element.id === genericEvents[i].subject_id
            );
            genericEvents[i].contextualEvents.map((event) => {
              const container = {};
              container['start'] = new Date(event.start_lesson);
              container['end'] = new Date(event.end_lesson);
              container['title'] = genericEvents[i].title;
              container['room_id'] = genericEvents[i].room_id;
              container['room_name'] = lessonRooms[0].name;
              container['class_id'] = genericEvents[i].class_id;
              container['subject_id'] = genericEvents[i].subject_id;
              container['subject_name'] = lessonSubject[0].name;
              container['frequency'] = genericEvents[i].frequency;
              container['id'] = event.id;
              container['hexa_color'] = lessonSubject[0].hexa_color;
              container['professor_profile'] = genericEvents[i].professor_id;
              timeTableEvents.push(container);
            });
          }
        }
        dispatch({ type: 'GET_EVENTS_BY_CLASS', payload: timeTableEvents });
      })
      .catch((err) => {});
  };
};

export function getParentTimeTable(profileId) {
  return (dispatch, getState) => {
    const state = getState();
    const subjects = state.subject.remoteSubjects;
    let rooms = [];
    let apiEndpoint1 = `/rooms?access_token=${localStorage.token}&filter[where][establishment_id]=${state.auth.userProfile.establishment_id}`;
    classService.get(apiEndpoint1).then((response) => {
      rooms = response.data;
    });
    let token = localStorage.token;
    let apiEndpoint = `/contextual_events/timeTableForParents/${profileId}?access_token=${token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        let genericEvents = response.data.timeTableForParents;
        let timeTableEvents = [];
        for (var i = 0; i < genericEvents.length; i++) {
          const lessonRooms = rooms.filter((element) => element.id === genericEvents[i].room_id);
          const lessonSubject = subjects.filter(
            (element) => element.id === genericEvents[i].subject_id
          );
          genericEvents[i].contextualEvents.map((event) => {
            const container = {};
            container['start'] = new Date(event.start_lesson);
            container['end'] = new Date(event.end_lesson);
            container['title'] = genericEvents[i].title;
            container['room_id'] = genericEvents[i].room_id;
            container['room_name'] = lessonRooms[0].name;
            container['class_id'] = genericEvents[i].class_id;
            container['subject_id'] = genericEvents[i].subject_id;
            container['subject_name'] = lessonSubject[0].name;
            container['frequency'] = genericEvents[i].frequency;
            container['id'] = event.id;
            container['hexa_color'] = lessonSubject[0].hexa_color;
            container['professor_profile'] = genericEvents[i].professor_id;
            container['supplies'] = event.supplie;
            timeTableEvents.push(container);
          });
        }
        dispatch({ type: 'GET_EVENTS_STUDENT', payload: timeTableEvents });
      })
      .catch((err) => {});
  };
}

export const getStudentTimeTable = (profileId) => {
  return (dispatch, getState) => {
    const state = getState();
    const subjects = state.subject.remoteSubjects;
    let rooms = [];
    let apiEndpoint1 = `/rooms?access_token=${localStorage.token}&filter[where][establishment_id]=${state.auth.userProfile.establishment_id}`;
    classService.get(apiEndpoint1).then((response) => {
      rooms = response.data;
    });
    let token = localStorage.token;
    let apiEndpoint = `/contextual_events/classTimeTable/${profileId}?access_token=${token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        let genericEvents = response.data.classTimeTable;
        let timeTableEvents = [];
        for (var i = 0; i < genericEvents.length; i++) {
          const lessonRooms = rooms.filter((element) => element.id === genericEvents[i].room_id);
          const lessonSubject = subjects.filter(
            (element) => element.id === genericEvents[i].subject_id
          );
          genericEvents[i].contextualEvents.map((event) => {
            const container = {};

            container['event_type'] = genericEvents[i].event_type;
            container['start'] = new Date(event.start_lesson);
            container['end'] = new Date(event.end_lesson);
            container['title'] = genericEvents[i].title;
            container['room_id'] = genericEvents[i].room_id;
            container['room_name'] = lessonRooms[0].name;
            container['class_id'] = genericEvents[i].class_id;
            container['subject_id'] = genericEvents[i].subject_id;
            container['subject_name'] = lessonSubject[0].name;
            container['frequency'] = genericEvents[i].frequency;
            container['id'] = event.id;
            container['hexa_color'] = lessonSubject[0].hexa_color;
            container['professor_profile'] = genericEvents[i].professor_id;
            timeTableEvents.push(container);
          });
        }
        dispatch({ type: 'GET_EVENTS_STUDENT', payload: timeTableEvents });
      })
      .catch((err) => {});
  };
};
export const getProfessorTimeTable = (profileId) => {
  return (dispatch, getState) => {
    const state = getState();
    const subjects = state.subject.remoteSubjects;
    let rooms = [];
    let apiEndpoint1 = `/rooms?access_token=${localStorage.token}&filter[where][establishment_id]=${state.auth.userProfile.establishment_id}`;
    classService.get(apiEndpoint1).then((response) => {
      rooms = response.data;
    });
    let apiEndpoint = `/professors/get-professor-calendar/${profileId}?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((res) => {
        let genericEvents = res.data.calendar;
        let timeTableEvents = [];
        for (var i = 0; i < genericEvents.length; i++) {
          const lessonRooms = rooms.filter((element) => element.id === genericEvents[i].room_id);
          const lessonSubject = subjects.filter(
            (element) => element.id === genericEvents[i].subject_id
          );
          genericEvents[i].contextualEvents.map((event) => {
            const container = {};
            container['start'] = new Date(event.start_lesson);
            container['end'] = new Date(event.end_lesson);
            container['title'] = genericEvents[i].title;
            container['room_id'] = genericEvents[i].room_id;
            container['room_name'] = lessonRooms[0].name;
            container['class_id'] = genericEvents[i].class_id;
            container['subject_id'] = genericEvents[i].subject_id;
            container['subject_name'] = lessonSubject[0].name;
            container['frequency'] = genericEvents[i].frequency;
            container['id'] = event.id;
            container['hexa_color'] = lessonSubject[0].hexa_color;
            container['professor_profile'] = genericEvents[i].professor_id;
            timeTableEvents.push(container);
          });
        }
        dispatch({ type: 'GET_EVENTS_PROFESSOR', payload: timeTableEvents });
      })
      .catch((err) => {});
  };
};

export const removeEventList = () => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_EVENTS_LIST' });
  };
};
export const handleSubmitEdit = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/generic_events/updateGenricEvent?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getEventsByClass(data.classId));
        } else {
          dispatch({
            type: 'ADD_EVENT_NOT_ALLOWED',
            payload: <IntlMessages id="components.planning.event.message.notallowed" />,
          });
        }
      })
      .catch((error) => {});
  };
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
  objMail.establishmentId = itemSuplimentaire.establishmentId

  return (dispatch) => {
    let apiEndpoint = `/planning_events/` + itemEvent.id + `?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, itemEvent).then((response) => {
      if (response) {
        if (notifMsg != undefined && notifMsg != '') {
          let apiEndpoint1 = `/planning_events/planning-notif?access_token=${localStorage.token}`;
          classService.post(apiEndpoint1, objMail).then((response) => {
            // if (response.data.notificationData.length > 0) {
            //   console.log('--------response.data>0-------', response.data);
            // } else {
            //   console.log('--------response.data-------', response.data);
            // }
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

export const deleteEvent = (
  typeDelete,
  itemEvent,
  establishmentId,
  schoolYearId,
  classId,
  messageNotif
) => {
  let objMail = {};
  objMail.classId = classId;
  objMail.notifMsg = messageNotif;
  objMail.establishmentId = establishmentId

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
              classService.post(apiEndpoint1, objMail).then((response) => {
                // if (response.data.notificationData.length > 0) {
                //   console.log('--------response.data>0-------', response.data);
                // } else {
                //   console.log('--------response.data-------', response.data);
                // }
              });
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
