import { classService } from "../_services/class.service";
import _ from "lodash";
import {
  FETECHED_ALL_VIRTUAL_CLASS,
  ADD_VIRTUAL_CLASS,
  EDIT_VIRTUAL_CLASS,
  DELETE_VIRTUAL_CLASS,
  HANDLE_REQUEST_CLOSE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  ARCHIVED_VIRTUAL_CLASS,
} from "../constants/ActionTypes";
import baseUrl from "../config/config";
import axios from "axios";

export const addClassVirtual = (itemClass) => {
  return (dispatch) => {
    const classId = itemClass.classId;
    const subjectId = itemClass.subjectId;
    const profId = itemClass.professorId;
    const courseId = itemClass.courseId;

    let dataVirtualClass = {
      date_virtual_class: itemClass.dateVirtualClass,
      status: true,
      virtual_class_name: itemClass.virtualClassName,
      class_url: itemClass.classUrl,
      password: itemClass.password,
      start_time_class: itemClass.startTimeClass,
      end_time_class: itemClass.endTimeClass,
      virtual_class_status: "programée",
      accessibility: itemClass.accessibility,
      fk_id_course_v4: courseId,
      publish: itemClass.publish,
      description: itemClass.description,
    };

    let apiEndpoint = `/virtual_class_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, dataVirtualClass).then((response) => {
      if (response) {
        let newObject = {
          ...response.data,
          classeId: classId,
          subjectId: subjectId,
          profId: profId,
          profName: itemClass.profName,
          profSurname: itemClass.profSurname,
          subjectName: itemClass.subjectName,
          classeName: itemClass.classeName,
          subjectColor: itemClass.subjectColor,
        };
        dispatch({ type: ADD_VIRTUAL_CLASS, payload: newObject });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La création est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};

export function getClassesVirtual(
  establishmentId,
  schoolYearId,
  roleId,
  roleUserId
) {
  return (dispatch) => {
    let apiEndpoint = `/virtual_class_v4/fetchVirtualClassByRole/${establishmentId}/${schoolYearId}/${roleId}/${roleUserId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let ClassesVirtualList = response.data.virtualClassData;
        let ArchivedClassVirtualsList = [];
        let VirtualClassUnarchived = [];

        ClassesVirtualList.map((elementItem) => {
          if (elementItem.status === false) {
            ArchivedClassVirtualsList.push(elementItem);
          } else {
            VirtualClassUnarchived.push(elementItem);
          }
        });

        dispatch({
          type: FETECHED_ALL_VIRTUAL_CLASS,
          payload: VirtualClassUnarchived,
        });
        dispatch({
          type: ARCHIVED_VIRTUAL_CLASS,
          payload: ArchivedClassVirtualsList,
        });
      }
    });
  };
}

 

export function getClassVirtualByEstablishmentId(establishmentId) {
  return (dispatch) => {
    let apiEndpoint =
      `/virtual_classes?access_token=${localStorage.token}&filter[where][establishment_id]=` +
      establishmentId;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        // const ClassVirtualList = list.filter((element) => element.status);

        // dispatch({
        //   type: FETECHED_ALL_VIRTUAL_CLASS,
        //   payload: ClassVirtualList,
        // });
      })
      .catch((err) => {});
  };
}

export function deleteClassVirtual(item) {
  return (dispatch) => {
    axios
      .patch(
        `${baseUrl.baseUrl}/virtual_class_v4/` +
          item.id +
          `?access_token=${localStorage.token}`,
        {
          status: false,
        }
      )
      .then((response) => {
        let newObject = {
          ...response.data,
          classeId: item.classId,
          subjectId: item.subjectId,
          profId: item.profId,
          profName: item.profName,
          profSurname: item.profSurname,
          subjectName: item.subjectName,
          classeName: item.classeName,
          subjectColor: item.subjectColor,
        };
        dispatch({ type: DELETE_VIRTUAL_CLASS, payload: newObject });
      })
      .catch(function(error) {});
  };
}

export function editClassVirtual(itemClass) {
  return (dispatch) => {
    const classId = itemClass.classId;
    const subjectId = itemClass.subjectId;
    const profId = itemClass.professorId;
    const courseId = itemClass.courseId;

    let dataVirtualClass = {
      date_virtual_class: itemClass.dateVirtualClass,
      status: true,
      virtual_class_name: itemClass.virtualClassName,
      class_url: itemClass.classUrl,
      password: itemClass.password,
      start_time_class: itemClass.startTimeClass,
      end_time_class: itemClass.endTimeClass,
      virtual_class_status: "programée",
      accessibility: itemClass.accessibility,
      id: itemClass.id,
      fk_id_course_v4: courseId,
      publish: itemClass.publish,
      description: itemClass.description,
    };

    let apiEndpoint = `/virtual_class_v4/${itemClass.id}?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, dataVirtualClass).then((response) => {
      if (response) {
        let newObject = {
          ...response.data,
          classeId: classId,
          subjectId: subjectId,
          profId: profId,
          profName: itemClass.profName,
          profSurname: itemClass.profSurname,
          subjectName: itemClass.subjectName,
          classeName: itemClass.classeName,
          subjectColor: itemClass.subjectColor,
        };
        dispatch({ type: EDIT_VIRTUAL_CLASS, payload: newObject });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La modification est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}

export const serviceAction = {
  addClassVirtual,
  getClassesVirtual,
  deleteClassVirtual,
  editClassVirtual,
  getClassVirtualByEstablishmentId,
};
