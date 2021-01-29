import { classService } from '../_services/class.service';
import baseUrl from '../config/config';
import {
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  GET_HOMEWORKS,
  ARCHIVED_GET_HOMEWORKS,
  ADD_NEW_HOMEWORK,
  DELETE_HOMEWORK,
  EDIT_HOMEWORK,
} from '../constants/ActionTypes';
import axios from 'axios';

export const addNewHomework = (data, homeworkFiles, classesData) => {
  let newhomework = [];
  let homeworkItem = {};
  return (dispatch) => {
    let apiEndpoint = `/homeworks_v4/addAndAssignHomework?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response && homeworkFiles.length > 0) {
        let homeworkId = response.data.homework.id;
        homeworkItem = response.data.homework;
        let formadata = new FormData();
        homeworkFiles.map((element, index) => {
          let homeworkFile = element;
          const fileExtension = homeworkFile.name.replace(/^.*\./, '');
          const fileName = 'Homework' + homeworkId + 'N' + index + '.' + fileExtension;

          var object = {};
          object.file = homeworkFile;
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
                  name: urlFile.name,
                  url_file: urlFile.providerResponse.location,
                  status: true,
                  assignement_date: new Date(),
                  update_date: new Date(),
                  fk_id_homework: homeworkId,
                };
              });
              let apiEndpointFiles = `/homeworks_files_v4?access_token=${localStorage.token}`;
              classService.post(apiEndpointFiles, filesURL).then((homeworksFiles) => {
                if (homeworksFiles) {
                  classesData.forEach((element) => {
                    let object = {};
                    object.classId = element.id;
                    object.className = element.label;
                    object.courseId = element.id;
                    object.homework = {
                      ...homeworkItem,
                      homeworkFiles: homeworksFiles.data,
                      subject: {
                        name: data.subjectName,
                        id: data.subjectId,
                        color: data.subjectColor,
                      },
                    };
                    newhomework.push(object);
                  });
                  dispatch({
                    type: ADD_NEW_HOMEWORK,
                    payload: newhomework,
                  });
                  dispatch({
                    type: SHOW_SUCCESS_MESSAGE,
                    payload: 'La création est effectuée avec succès',
                  });

                  setTimeout(() => {
                    dispatch({ type: HIDE_SUCCESS_MESSAGE });
                  }, 4000);
                  // this.dispatch(getHomework)
                } else {
                }
              });
            }
          })
          .catch((err) => {});
      } else if (!response) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      } else if (response && homeworkFiles.length == 0) {
        classesData.forEach((element) => {
          let object = {};
          object.classId = element.id;
          object.className = element.label;
          object.homework = {
            ...response.data.homework,
            homeworkFiles: [],
            subject: {
              name: data.subjectName,
              id: data.subjectId,
              color: data.subjectColor,
            },
          };
          newhomework.push(object);
        });
        dispatch({
          type: ADD_NEW_HOMEWORK,
          payload: newhomework,
        });

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

export const deleteHomework = (idHomework) => {
  return (dispatch) => {
    let apiEndpoint = `/homeworks_v4/` + idHomework + `?access_token=${localStorage.token}`;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        if (response) {
          dispatch({ type: DELETE_HOMEWORK, payload: response.data.id });

          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: "L'archivage est effectué avec succès",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        } else {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de l'archivage merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }
      });
  };
};

export function getHomework(establishmentId, schoolYearId, profileId, roleId) {
  return (dispatch) => {
    let apiEndpoint = `/homeworks_v4/getHomework/${establishmentId}/${schoolYearId}/${profileId}/${roleId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let homeworkList = response.data.homeworks;
        let archivedHomeworksList = [];
        let homeworkListUnarchived = [];

        homeworkList.map((elementItem) => {
          if (elementItem.homework.status === false) {
            archivedHomeworksList.push(elementItem);
          } else {
            homeworkListUnarchived.push(elementItem);
          }
        });

        dispatch({
          type: GET_HOMEWORKS,
          payload: homeworkListUnarchived,
        });
        dispatch({
          type: ARCHIVED_GET_HOMEWORKS,
          payload: archivedHomeworksList,
        });
      }
    });
  };
}

export const editHomework = (data, homeworkFiles, classesData, oldFiles) => {
  let newhomework = [];
  let homeworkItem = {};
  return (dispatch) => {
    let apiEndpoint = `/homeworks_v4/edit-homework?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, data).then((response) => {
      if (response) {
        if (response.data.editHomeworkData.editResponse && homeworkFiles.length > 0) {
          let homeworkId = response.data.editHomeworkData.homework.id;
          homeworkItem = response.data.editHomeworkData.homework;
          let formadata = new FormData();
          homeworkFiles.map((element, index) => {
            let homeworkFile = element;
            const fileExtension = homeworkFile.name.replace(/^.*\./, '');

            const fileName = 'HomeworkEdited' + homeworkId + 'N' + index + '.' + fileExtension;

            var object = {};
            object.file = homeworkFile;
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
                    name: urlFile.name,
                    url_file: urlFile.providerResponse.location,
                    status: true,
                    assignement_date: new Date(),
                    update_date: new Date(),
                    fk_id_homework: homeworkId,
                  };
                });
                let apiEndpointFiles = `/homeworks_files_v4?access_token=${localStorage.token}`;
                classService.post(apiEndpointFiles, filesURL).then((homeworksFiles) => {
                  if (homeworksFiles) {
                    classesData.forEach((element) => {
                      let object = {};
                      object.classId = element.id;
                      object.className = element.label;
                      object.courseId = element.id;

                      object.homework = {
                        ...homeworkItem,
                        homeworkFiles: oldFiles.concat(homeworksFiles.data),
                        subject: {
                          name: data.subjectName,
                          id: data.subjectId,
                          color: data.subjectColor,
                        },
                      };
                      newhomework.push(object);
                    });
                    dispatch({
                      type: EDIT_HOMEWORK,
                      payload: newhomework,
                    });
                    dispatch({
                      type: SHOW_SUCCESS_MESSAGE,
                      payload: 'La modification est effectuée avec succès',
                    });

                    setTimeout(() => {
                      dispatch({ type: HIDE_SUCCESS_MESSAGE });
                    }, 4000);
                    // this.dispatch(getHomework)
                  } else {
                  }
                });
              }
            })
            .catch((err) => {});
        } else if (!response.data.editHomeworkData.editResponse) {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        } else if (response.data.editHomeworkData.editResponse && homeworkFiles.length == 0) {
          classesData.forEach((element) => {
            let object = {};
            object.classId = element.id;
            object.className = element.label;
            object.courseId = element.id;

            object.homework = {
              ...response.data.editHomeworkData.homework,
              homeworkFiles: oldFiles,
              subject: {
                name: data.subjectName,
                id: data.subjectId,
                color: data.subjectColor,
              },
            };
            newhomework.push(object);
          });
          dispatch({
            type: EDIT_HOMEWORK,
            payload: newhomework,
          });

          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: 'La modification est effectuée avec succès',
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        }
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};
