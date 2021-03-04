import { classService } from '../_services/class.service';
import {
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_FOLDERS_ARCHITECTURE,
  GET_MATERIAL_COURSE,
  GET_MATERIAL_COURSE_ARCHIVED,
  DELETE_MATERIAL_COURSE,
} from '../constants/ActionTypes';
import baseUrl from '../config/config';
import axios from 'axios';
export function getLevelClassSubjectData(establishmentId, schoolYearId, roleId, roleUserId) {
  return (dispatch) => {
    let apiEndpoint = `/level_v4/getLevelClassSubjectData/${establishmentId}/${schoolYearId}/${roleId}/${roleUserId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;
         dispatch({
          type: GET_FOLDERS_ARCHITECTURE,
          payload: response.data.SupportInfo,
        });
      }
    });
  };
}
export function getMaterialCourse(establishmentId, schoolYearId, roleId, roleUserId, assignmentId) {
  return (dispatch) => {
    let apiEndpoint = `/course_materials/fetchCourseMaterialsByRole/${roleId}/${assignmentId}/${establishmentId}/${schoolYearId}/${roleUserId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
         const list = response.data.courseMaterialsData.filter((element) => element.status);
        const listArchived = response.data.courseMaterialsData.filter((element) => !element.status);
        dispatch({
          type: GET_MATERIAL_COURSE,
          payload: list,
        });
        dispatch({
          type: GET_MATERIAL_COURSE_ARCHIVED,
          payload: listArchived,
        });
      }
    });
  };
}

export const addMaterialCourse = (materialCourseItem, establishmentId, schoolYearId, roleId, roleUserId, assignmentId) => {
  return (dispatch) => {
    let dataCoursematerials = {
      name: materialCourseItem.name, // nom support de cours
      urlCourse: materialCourseItem.url_course, // url accordé
      status: true,
      creation_date: materialCourseItem.creation_date, // date
      comment: materialCourseItem.comment, // comment
      fk_id_assign_class_subject: materialCourseItem.fk_id_assign_class_subject, // 'array des id des assignment class subject'
      fk_id_creator_profile: materialCourseItem.fk_id_creator_profile, // id profile creator
      homeworkAttached: [], // 'array des id des homework'
      virtualClassAttached: materialCourseItem.virtuelClassAttached, // 'array des id des classe virtuelles'
      moocsAttached: materialCourseItem.moocsAttached, // 'array des id des moocs'
      fk_id_professor: materialCourseItem.fk_id_professor, // id prof
      // fk_id_school_session: materialCourseItem.fk_id_school_session, // id session scolaire
    };
    let apiEndpoint = `/course_materials/create-course-materials?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, dataCoursematerials).then((response) => {
      if (response && materialCourseItem.files.length > 0) {
        let materialCourseId = response.data.courseMaterialsData.id;

        //  dispatch({ type: ADD_MATERIAL_COURSE, payload: response.data });
        let formadata = new FormData();
        materialCourseItem.files.map((element, index) => {
          let materailCourseFile = element;
          const fileExtension = materailCourseFile.name.replace(/^.*\./, '');
          const fileName = 'materialCourse' + materialCourseId + index + String(Date.now()).slice(-2) + '.' + fileExtension;
          var object = {};
          object.file = materailCourseFile;
          object.fileName = fileName;
          const myNewFile = new File([object.file], fileName, {
            type: object.file.type,
          });
          formadata.append('file', myNewFile);
        });

        let filesURL = [];

        const URLMaterailCourse = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
        axios({
          url: URLMaterailCourse,
          method: 'POST',
          data: formadata,
        })
          .then((response) => {
            if (response) {
              filesURL = response.data.result.files.file.map((urlFile, index) => {
                return {
                  url_course_materials_files: urlFile.providerResponse.location,
                  status: true,
                  creation_date: materialCourseItem.creation_date,
                  fk_id_course_materials: materialCourseId,
                };
              });
              let apiEndpointFiles = `/course_materials_files?access_token=${localStorage.token}`;
              classService.post(apiEndpointFiles, filesURL).then((response) => {
                if (response) {
                  dispatch(getMaterialCourse(establishmentId, schoolYearId, roleId, roleUserId, assignmentId));

                  dispatch({
                    type: SHOW_SUCCESS_MESSAGE,
                    payload: 'La création est effectuée avec succès',
                  });

                  setTimeout(() => {
                    dispatch({ type: HIDE_SUCCESS_MESSAGE });
                  }, 4000);
                } else {
                  console.log(response.data, 'course_materials_files errerur');
                }
              });
            }
          })
          .catch((err) => {});
      } else if (!response) {
        console.log('ereeeu', response);
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      } else if (response && materialCourseItem.files.length == 0) {
        dispatch(getMaterialCourse(establishmentId, schoolYearId, roleId, roleUserId, assignmentId));
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'La création est effectuée avec succès',
        });

        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      }
    });
  };
};

export const editMaterialCourse = (materialCourseItem, establishmentId, schoolYearId, roleId, roleUserId, assignmentId) => {
  return (dispatch) => {
    let dataCoursematerials = {
      id: materialCourseItem.id,
      name: materialCourseItem.name, // nom support de cours
      urlCourse: materialCourseItem.url_course, // url accordé
      status: true,
      creation_date: materialCourseItem.creation_date, // date
      comment: materialCourseItem.comment, // comment
      fk_id_assign_class_subject: materialCourseItem.fk_id_assign_class_subject, // 'array des id des assignment class subject'
      fk_id_creator_profile: materialCourseItem.fk_id_creator_profile, // id profile creator
      homeworkAttached: [], // 'array des id des homework'
      virtualClassAttached: materialCourseItem.virtuelClassAttached, // 'array des id des classe virtuelles'
      moocsAttached: materialCourseItem.moocsAttached, // 'array des id des moocs'
      fk_id_professor: materialCourseItem.fk_id_professor, // id prof
      // fk_id_school_session: materialCourseItem.fk_id_school_session, // id session scolaire
      files_deleted: materialCourseItem.filesDeleted,
    };
    axios
      .put(`${baseUrl.baseUrl}/course_materials/edit-course-materials?access_token=${localStorage.token}`, dataCoursematerials)
      .then((response) => {
        if (response && materialCourseItem.files.length > 0) {
          let materialCourseId = response.data.courseMaterialsData.id;

          //  dispatch({ type: ADD_MATERIAL_COURSE, payload: response.data });
          let formadata = new FormData();
          materialCourseItem.files.map((element, index) => {
            let materailCourseFile = element;
            const fileExtension = materailCourseFile.name.replace(/^.*\./, '');
            const fileName = 'materialCourseEdit' + materialCourseId + index + String(Date.now()).slice(-2) + '.' + fileExtension;
            var object = {};
            object.file = materailCourseFile;
            object.fileName = fileName;
            const myNewFile = new File([object.file], fileName, {
              type: object.file.type,
            });
            formadata.append('file', myNewFile);
          });

          let filesURL = [];

          const URLMaterailCourse = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
          axios({
            url: URLMaterailCourse,
            method: 'POST',
            data: formadata,
          })
            .then((response) => {
              if (response) {
                filesURL = response.data.result.files.file.map((urlFile, index) => {
                  return {
                    url_course_materials_files: urlFile.providerResponse.location,
                    status: true,
                    creation_date: materialCourseItem.creation_date,
                    fk_id_course_materials: materialCourseId,
                  };
                });
                let apiEndpointFiles = `/course_materials_files?access_token=${localStorage.token}`;
                classService.post(apiEndpointFiles, filesURL).then((response) => {
                  if (response) {
                    dispatch(getMaterialCourse(establishmentId, schoolYearId, roleId, roleUserId, assignmentId));

                    dispatch({
                      type: SHOW_SUCCESS_MESSAGE,
                      payload: 'La modification est effectuée avec succès',
                    });

                    setTimeout(() => {
                      dispatch({ type: HIDE_SUCCESS_MESSAGE });
                    }, 4000);
                  } else {
                    console.log(response.data, 'course_materials_files errerur');
                  }
                });
              }
            })
            .catch((err) => {});
        } else if (!response) {
          console.log('ereeeu', response);
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        } else if (response && materialCourseItem.files.length == 0) {
          dispatch(getMaterialCourse(establishmentId, schoolYearId, roleId, roleUserId, assignmentId));
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: 'La modification est effectuée avec succès',
          });

          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        }
      });
  };
};
export function deleteMaterialCourse(item) {
  return (dispatch) => {
    axios
      .patch(`${baseUrl.baseUrl}/course_materials/` + item.id + `?access_token=${localStorage.token}`, {
        status: false,
      })
      .then((response) => {
        if (response) {
          dispatch({ type: DELETE_MATERIAL_COURSE, payload: response.data.id });

          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: "L'archivage est effectuée avec succès",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        } else {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }
      })
      .catch(function(error) {});
  };
}
