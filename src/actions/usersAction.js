import baseUrl from '../config/config';
import axios from 'axios';
import {
  FETCH_ALL_ROLE,
  GET_ALL_USERS_FOR_ADMIN,
  GET_ALL_USERS_FOR_SUPER_ADMIN,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  SHOW_LOADER,
  HIDE_LOADER,
  EDIT_PROFILE,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */

import _ from 'lodash';
import { classService } from '../_services/class.service';

export function getAllRole() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/roles?access_token=${localStorage.token}`).then((res) => {
      dispatch({ type: FETCH_ALL_ROLE, payload: res.data });
    });
  };
}
export function getAllUsersForAdmin(establishmentId, schoolYearId) {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/users/${establishmentId}/${schoolYearId}?access_token=${localStorage.token}`).then((res) => {
      dispatch({ type: GET_ALL_USERS_FOR_ADMIN, payload: res.data.users });
    });
  };
}
export function getAllUsersForSuperAdministrator() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/users?access_token=${localStorage.token}`).then((res) => {
      dispatch({ type: GET_ALL_USERS_FOR_SUPER_ADMIN, payload: res.data });
    });
  };
}
export const addUsers = (data) => {
  return (dispatch) => {
    let dataUser = {
      name: data.name,
      surname: data.surname,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      phone: data.phone,
      cin: data.cin,
      zipCode: data.zipCode,
      country: data.userCountry,
      photo: data.photo,
      name_ar: data.name_ar,
      surname_ar: data.surname_ar,
      creation_date: new Date(),
      nationality: data.nationality,
      placeOfBirth: data.placeOfBirth,
      email: data.email,
      roleId: data.roleId,
      establishmentId: data.establishmentId,
      assignClassSubject: data.assignClassSubject,
      classId: data.studentClass,
      schoolYearId: data.schoolyearId,
      paperFiles: null,
      functionName: data.functionName,
      password: data.password,
      login: data.login,
      levelId: data.levelId,
      sectionId: data.sectionId,
      usefulInformation: data.usefulInformation,
      parentId: data.parentId,
      studentId: data.studentId,
      groupId: data.groupId,
      userIdentifier: data.userIdentifier,
      agencyId: data.agenceId,
      statusBelongTo: true,
      activityUserBelongAgency: true,

      // contratType:data.contratType
    };
    console.log('--------dataUser----------', dataUser);
    let apiEndpoint = `/users/createByRole?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, dataUser).then((response) => {
      if (!response) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La création d'utilisateur est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
        let userId = response.data.existe.userData.id;
        if (data.userPhoto.name != undefined) {
          let photoUser = data.userPhoto;
          const fileExtension = photoUser.name.replace(/^.*\./, '');

          var object = {};
          object.file = photoUser;

          object.fileName = data.name + '-' + data.surname + '-' + userId + '.' + fileExtension;
          const myNewFile = new File([object.file], object.fileName, {
            type: object.file.type,
          });
          let formadata = new FormData();
          formadata.append('file', myNewFile);
          dispatch({
            type: SHOW_LOADER,
            payload: true,
          });
          const photoUrl = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
          axios({
            url: photoUrl,
            method: 'POST',
            data: formadata,
          }).then((response) => {
            let urlPhotoUser = `${baseUrl.baseUrl}/users/` + userId + `?access_token=${localStorage.token}`;

            axios
              .patch(urlPhotoUser, {
                id: userId,
                photo: response.data.result.files.file[0].providerResponse.location,
              })
              .then((response) => {
                if (response) {
                  dispatch({
                    type: HIDE_LOADER,
                    payload: false,
                  });
                  if (data.userPapiersFiles.length === 0) {
                    dispatch(getAllUsersForAdmin(dataUser.establishmentId, dataUser.schoolYearId));
                  }
                } else {
                  console.log(response.data, 'photo not upload');
                }
              });
          });
        } else {
          if (data.userPapiersFiles.length === 0) {
            dispatch(getAllUsersForAdmin(dataUser.establishmentId, dataUser.schoolYearId));
          }
        }
        if (response && data.userPapiersFiles.length > 0) {
          let formadata = new FormData();
          data.userPapiersFiles.map((element, index) => {
            let userPapiersFile = element;
              const fileName = 'user' + userId + '-' + userPapiersFile.name;

            var object = {};
            object.file = userPapiersFile;
            object.fileName = fileName;
            const myNewFile = new File([object.file], fileName, {
              type: object.file.type,
            });
            formadata.append('file', myNewFile);
            return true;
          });

          let filesURL = [];
          dispatch({
            type: SHOW_LOADER,
            payload: true,
          });
          const URLUserPapiersFiles = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
          axios({
            url: URLUserPapiersFiles,
            method: 'POST',
            data: formadata,
          })
            .then((response) => {
              if (response) {
                filesURL = response.data.result.files.file.map((urlFile, index) => {
                  return urlFile.providerResponse.location;
                });
                let urlPhotoUser = `${baseUrl.baseUrl}/users/` + userId + `?access_token=${localStorage.token}`;

                axios
                  .patch(urlPhotoUser, {
                    id: userId,
                    paper_files: filesURL,
                  })
                  .then((response) => {
                    if (response) {
                      dispatch(getAllUsersForAdmin(dataUser.establishmentId, dataUser.schoolYearId));

                      dispatch({
                        type: HIDE_LOADER,
                        payload: false,
                      });
                      console.log('response photo', response);
                    } else {
                      console.log(response.data, 'photo not upload');
                    }
                  });
              }
            })
            .catch((err) => {});
        }
      }
    });
  };
};
export const editUser = (data, estabId, schoolYearId) => {
  return (dispatch) => {
    let dataUser = {
      name: data.name,
      surname: data.surname,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      phone: data.phone,
      cin: data.cin,
      zipCode: data.zipCode,
      country: data.country,
      name_ar: data.name_ar,
      surname_ar: data.surname_ar,
      nationality: data.nationality,
      placeOfBirth: data.placeOfBirth,
      email: data.email,
      functionName: data.functionName,
      usefulInformation: data.usefulInformation,
      uniqueIdentifier: data.uniqueIdentifier,
    };
    console.log('action data -----------------------', data);

    console.log('action data formated -----------------------', dataUser);

    let apiEndpoint = `/users/${data.id}/editUserInf?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, dataUser).then((response) => {
      if (!response) {
        console.log('------------------------response', response);
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      } else {
        console.log('----------error--------response', response);

        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La modification d'utilisateur est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
        let userId = data.id;

        if (data.userPhoto.name != undefined) {
          let photoUser = data.userPhoto;
          const fileExtension = photoUser.name.replace(/^.*\./, '');

          var object = {};
          object.file = photoUser;
          object.fileName = data.name + '-' + data.surname + '-' + userId + '.' + fileExtension;
          const myNewFile = new File([object.file], object.fileName, {
            type: object.file.type,
          });
          let formadata = new FormData();
          formadata.append('file', myNewFile);
          dispatch({
            type: SHOW_LOADER,
            payload: true,
          });
          const photoUrl = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
          axios({
            url: photoUrl,
            method: 'POST',
            data: formadata,
          }).then((response) => {
            let urlPhotoUser = `${baseUrl.baseUrl}/users/` + userId + `?access_token=${localStorage.token}`;

            axios
              .patch(urlPhotoUser, {
                id: userId,
                photo: response.data.result.files.file[0].providerResponse.location,
              })
              .then((response) => {
                if (response) {
                  dispatch({
                    type: HIDE_LOADER,
                    payload: false,
                  });
                  if (data.paperFiles.length === 0) {
                    dispatch(getAllUsersForAdmin(estabId, schoolYearId));
                  }
                } else {
                  console.log(response.data, 'photo not upload');
                }
              });
          });
        } else {
          if (data.paperFiles.length === 0) {
            dispatch(getAllUsersForAdmin(estabId, schoolYearId));
          }
        }
        if (response && data.paperFiles.length > 0) {
          let formadata = new FormData();
          data.paperFiles.map((element, index) => {
            let userPapiersFile = element;
             const fileName = 'user' + userId + '-' + userPapiersFile.name;

            var object = {};
            object.file = userPapiersFile;
            object.fileName = fileName;
            const myNewFile = new File([object.file], fileName, {
              type: object.file.type,
            });
            formadata.append('file', myNewFile);
          });

          let filesURL = data.oldPaperFiles;
          dispatch({
            type: SHOW_LOADER,
            payload: true,
          });
          const URLUserPapiersFiles = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
          axios({
            url: URLUserPapiersFiles,
            method: 'POST',
            data: formadata,
          })
            .then((response) => {
              if (response) {
                response.data.result.files.file.map((urlFile, index) => {
                  filesURL.push(urlFile.providerResponse.location);
                });
                let urlPhotoUser = `${baseUrl.baseUrl}/users/` + userId + `?access_token=${localStorage.token}`;

                axios
                  .patch(urlPhotoUser, {
                    id: userId,
                    paper_files: filesURL,
                  })
                  .then((response) => {
                    if (response) {
                      dispatch(getAllUsersForAdmin(estabId, schoolYearId));

                      dispatch({
                        type: HIDE_LOADER,
                        payload: false,
                      });
                      console.log('response photo', response);
                    } else {
                      console.log(response.data, 'photo not upload');
                    }
                  });
              }
            })
            .catch((err) => {});
        }
      }
    });
  };
};
function objectToCsv(data) {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + row[header]).replace(/"/g, '//"');
      return `"${escaped}"`;
    });

    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
}
function downLoadCsv(data, fileName) {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${fileName}` + '.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
export function exportCsv(csvList, classId, className) {
  const csvListFiltred = csvList.filter((element) => element.inforamtionsStudent.classInformation.classId === classId);
  if (!_.isEmpty(csvListFiltred)) {
    const csvListFormated = csvListFiltred.map((row) => ({
      nom: row.name,
      prénom: row.surname,
      'date de naissance': row.dateOfBirth.substring(0, 10),
      'lieu de naissance': row.placeOfBirth,
      email: row.email,
    }));
    const csvData = objectToCsv(csvListFormated);
    downLoadCsv(csvData, className);
    return 'sucess';
  } else {
    console.log('document est empty');
    return 'error';
  }
}
export function editProfile(data, photo) {
  return function (dispatch) {
    if (photo != '') {
      let photoUser = photo;
      var object = {};
      object.file = photoUser;
      object.fileName = 'user' + data.id + photoUser.name;
      const myNewFile = new File([object.file], object.fileName, {
        type: object.file.type,
      });
      let formadata = new FormData();
      formadata.append('file', myNewFile);
      dispatch({
        type: SHOW_LOADER,
        payload: true,
      });
      const photoUrl = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
      axios({
        url: photoUrl,
        method: 'POST',
        data: formadata,
      }).then((response) => {
        let urlPhotoUser = `${baseUrl.baseUrl}/users/` + data.id + `?access_token=${localStorage.token}`;

        axios
          .patch(urlPhotoUser, {
            id: data.id,
            photo: response.data.result.files.file[0].providerResponse.location,
            dateOfBirth: data.dateOfBirth,
            address: data.address,
            phone: data.phone,
            email: data.email,
          })
          .then((response) => {
            if (response) {
              dispatch({ type: EDIT_PROFILE, payload: response.data });
              dispatch({
                type: HIDE_LOADER,
                payload: false,
              });
            }
          });
      });
    } else {
      axios
        .patch(`${baseUrl.baseUrl}/users/` + data.id + `?access_token=${localStorage.token}`, data)
        .then((response) => {
          console.log('response', response);
          dispatch({ type: EDIT_PROFILE, payload: response.data });
        })
        .catch(function (error) {});
    }
  };
}
