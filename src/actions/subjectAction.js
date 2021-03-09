import { getName } from "./countriesAction";
import { classService } from "../_services/class.service";
import _ from "lodash";
import {
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  ADD_SUBJECT_SETTING,
  EDIT_SUBJECT_SETTING,
  GET_SUBJECT_SETTING,
  DELETE_SUBJECT_SETTING,
  GET_SUBJECT_BY_Establishment_AND_SCHOOLYEAR,
  FETCH_CLASSES_SUBJECTS,
  ARCHIVER_SUBJECT_SETTING,
} from "../constants/ActionTypes";

function getSubjectName(subjects, subject_id) {
  let subjectName = subjects.find((element) => element.id === subject_id);
  return getName(subjectName);
}

function subjectsByEstabType(estab_type_id) {
  return (dispatch) => {
    let apiEndpoint =
      `/subjects?access_token=${localStorage.token}&filter[where][estab_type_id]=` +
      estab_type_id;
    classService
      .get(apiEndpoint)
      .then((response) => {
        let subjectsList = [];
        response.data.forEach((element) => {
          subjectsList.push({
            id: element.id,
            name: getName(element),
            name_FR: element.name_FR,
            name_AR: element.name_AR,
            name_EN: element.name_EN,
            coefficient: element.coefficient,
            level_id: element.level_id,
            section_id: element.section_id,
            horaires_officiels: element.horaires_officiels,
            horaires_supplementaires: element.horaires_supplementaires,
            hexa_color: element.hexa_color,
          });
        });
        dispatch({ type: "DATA_LOADED_SUBJECT", payload: subjectsList });
      })
      .catch((error) => {});
  };
}

function subjectsByLevelBySection(subjects, level_id, section_id) {
  let subjectList = [];
  if (section_id === 0 && level_id === 0) {
    subjectList = [];
  } else if (level_id === 0) {
    subjectList = subjects.filter(
      (element) => element.section_id === section_id
    );
  } else if (section_id === 0) {
    subjectList = subjects.filter((element) => element.level_id === level_id);
  } else {
    subjectList = subjects.filter(
      (element) =>
        element.level_id === level_id && element.section_id === section_id
    );
  }
  return subjectList;
}

function getSubject() {
  return (dispatch) => {
    let apiEndpoint = `/subjects?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        let subjectsList = [];
        response.data.forEach((element) => {
          subjectsList.push({
            id: element.id,
            name: getName(element),
            name_FR: element.name_FR,
            name_AR: element.name_AR,
            name_EN: element.name_EN,
            coefficient: element.coefficient,
            level_id: element.level_id,
            section_id: element.section_id,
            horaires_officiels: element.horaires_officiels,
            horaires_supplementaires: element.horaires_supplementaires,
            hexa_color: element.hexa_color,
          });
        });

        dispatch({ type: "DATA_LOADED_SUBJECT", payload: subjectsList });
      })
      .catch((err) => {});
  };
}

export {
  getSubject,
  getSubjectName,
  subjectsByEstabType,
  subjectsByLevelBySection,
};

export function addData(subject) {
  return (dispatch) => {
    let subjectData = {
      name: subject.name,
      description: subject.description,
      coefficient: subject.coefficient,
      status: true,
      establishment_id: subject.establishment_id,
    };
    let apiEndpoint = `/subjects?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, subjectData)
      .then((response) => {
        dispatch({ type: "ADD_SUBJECT", payload: response.data });
        alert("L'ajout est effectué avec succès");
      })
      .catch((error) => {});
  };
}

export function deleteData(idItem) {
  return (dispatch) => {
    let apiEndpoint =
      `/subjects/` + idItem + `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const dataSubject = response.data;
        let subjectData = {
          name: dataSubject.name,
          description: dataSubject.description,
          coefficient: dataSubject.coefficient,
          status: false,
          establishment_id: dataSubject.establishment_id,
          id: dataSubject.id,
        };
        let apiEndpoint2 =
          `/subjects/` + dataSubject.id + `?access_token=${localStorage.token}`;
        classService
          .put(apiEndpoint2, subjectData)

          .then((response) => {
            dispatch({ type: "DELETE_SUBJECT", payload: response.data });
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };
}

export function editData(data) {
  return (dispatch) => {
    let subjectData = {
      name: data.name,
      description: data.description,
      coefficient: data.coefficient,
      status: true,
      establishment_id: data.establishment_id,
      id: data.id,
    };
    let apiEndpoint =
      `/subjects/` + data.id + `?access_token=${localStorage.token}`;
    classService
      .put(apiEndpoint, subjectData)
      .then((response) => {
        dispatch({ type: "EDIT_SUBJECT", payload: response.data });
      })
      .catch((error) => {});
  };
}

export function getSubjectsByEstablishmentId(id) {
  let apiEndpoint = "";
  return (dispatch) => {
    apiEndpoint = `/establishments/${id}?access_token=${localStorage.token}`;

    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const establishmentType = response.data.estab_type_id;
        apiEndpoint =
          `/subjects?access_token=${localStorage.token}&filter[where][estab_type_id]=` +
          establishmentType;
        classService.get(apiEndpoint).then((response) => {
          if (response) {
            let subjectsList = [];
            response.data.forEach((element) => {
              subjectsList.push({
                id: element.id,
                name: getName(element),
                name_FR: element.name_FR,
                name_AR: element.name_AR,
                name_EN: element.name_EN,
                coefficient: element.coefficient,
                level_id: element.level_id,
                section_id: element.section_id,
                horaires_officiels: element.horaires_officiels,
                horaires_supplementaires: element.horaires_supplementaires,
                hexa_color: element.hexa_color,
              });
            });
            dispatch({ type: "DATA_LOADED_SUBJECT", payload: subjectsList });
          }
        });
      }
    });
  };
}
export function getSubjectsForProf(id) {
  return (dispatch) => {
    let apiEndpoint = `/professors?access_token=${localStorage.token}&filter[where][profile_id]=${id}&filter[include][profSubjects][subject]`;
    classService.get(apiEndpoint).then((res) => {
      let subjectsFiltred = _.map(res.data[0].profSubjects, "subject");
      dispatch({
        type: "DATA_LOADED_SUBJECT_PROFESSOR",
        payload: subjectsFiltred,
      });
    });
  };
}

export function addSubjectSetting(data) {
  return (dispatch) => {
    let apiEndpoint = `/subject_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: ADD_SUBJECT_SETTING, payload: response.data });
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
}

export function editSubjectSetting(data, idItem) {
  return (dispatch) => {
    let apiEndpoint = `/subject_v4/${idItem}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_SUBJECT_SETTING, payload: response.data });
      }
    });
  };
}

export function getSubjectSetting(establishementId, schoolYearId) {
  return (dispatch) => {
    let subjects = [];
    let apiEndpoint = `/subject_v4?access_token=${localStorage.token}&filter[where][fk_id_school_year]=${schoolYearId}&filter[include][subjectModule]`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        var establishmentid = parseInt(establishementId, 10);
        var FiltredList = response.data.filter((element) => {
          if (element.subjectModule.fk_id_establishment===establishmentid) {
            subjects.push(element);
          }
        });
        const list = subjects;
        const SubjectList = list.filter((element) => element.status);
        const ArchivedSubjectsList = list.filter(
          (element) => element.status===false
        );
        dispatch({ type: GET_SUBJECT_SETTING, payload: SubjectList });
        dispatch({
          type: ARCHIVER_SUBJECT_SETTING,
          payload: ArchivedSubjectsList,
        });
      }
    });
  };
}

export function deleteSubjectSetting(itemId) {
  return (dispatch) => {
    let apiEndpoint = `/subject_v4/${itemId.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, { status: false }).then((response) => {
      if (response) {
        dispatch({ type: DELETE_SUBJECT_SETTING, payload: response.data });
      }
    });
  };
}

 

export function getSubjectByEstablishmentAndSchoolYear(
  establishementId,
  schoolYearId
) {
  return (dispatch) => {
    let apiEndpoint = `/education_types/getSubjectByEstablishmentAndSchoolYear/${establishementId}/${schoolYearId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: GET_SUBJECT_BY_Establishment_AND_SCHOOLYEAR,
          payload: response.data.establishmentData,
        });
      }
    });
  };
}

export function fetchClassesSubjects(establishementId, schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/class_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${establishementId}&filter[where][and][1][fk_id_school_year]=${schoolYearId}&filter[include][assignementClassSubject][subject]`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({ type: FETCH_CLASSES_SUBJECTS, payload: response.data });
      }
    });
  };
}
