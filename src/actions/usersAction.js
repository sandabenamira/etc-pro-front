import baseUrl from "../config/config";
import axios from "axios";
import {
  FETCH_ALL_ROLE,
  ADD_USER,
  GET_ALL_USERS_FOR_ADMIN,
  GET_ALL_USERS_FOR_SUPER_ADMIN,
  EDIT_USER,
  DELETE_USER,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_WARNING_MESSAGE,
  SHOW_WARNING_MESSAGE,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../constants/ActionTypes";
import _ from "lodash";
import { getError } from "../Error/Error";
import { classService } from "../_services/class.service";
import { roleIdStudent } from "../config/config";

export function importUsersFromFile(ListUsers) {
  return function(dispatch) {
    ListUsers.map((data) => {
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
        photo: null,
        name_ar: data.name_ar,
        surname_ar: data.surname_ar,
        creation_date: new Date(),
        nationality: data.nationality,
        placeOfBirth: data.placeOfBirth,
        email: data.email,
        roleId: 5,
        establishmentId: data.establishmentId,
        assignClassSubject: null,
        classId: data.classID,
        schoolYearId: data.schoolYearId,
        paperFiles: null,
        functionName: null,
        password: 123456,
        login: "john walls",
        levelId: null,
        sectionId: null,
        usefulInformation: data.usefulInformation,
        parentId: null,
        studentId: null,
        groupId: data.groupeID,
        userIdentifier: data.userIdentifier,
      };
      console.log(dataUser, "dataUser apres action");
      let apiEndpoint = `/users/createByRole?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, dataUser)

        .then((response) => {
          console.log("EEEEEEEEEEEEEEEEE ", response);
        })

        .catch((err) => {
          console.log("EEEEEEEEEEEEEEEEE ", err.message);
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la création",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 1000);
        });
    });
  };
}

export function getAllRole() {
  return function(dispatch) {
    axios
      .get(`${baseUrl.baseUrl}/roles?access_token=${localStorage.token}`)
      .then((res) => {
        dispatch({ type: FETCH_ALL_ROLE, payload: res.data });
      });
  };
}
export function getAllUsersForAdmin(establishmentId, schoolYearId) {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/users/${establishmentId}/${schoolYearId}?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: GET_ALL_USERS_FOR_ADMIN, payload: res.data.users });
      });
  };
}
export function getAllUsersForSuperAdministrator() {
  return function(dispatch) {
    axios
      .get(`${baseUrl.baseUrl}/users?access_token=${localStorage.token}`)
      .then((res) => {
        dispatch({ type: GET_ALL_USERS_FOR_SUPER_ADMIN, payload: res.data });
      });
  };
}
export const addUsers = (data) => {
  console.log("data avant", data);
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
      creation_date: Date(),
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
    };
    console.log(dataUser, "dataUser apres action");
    let apiEndpoint = `/users/createByRole?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, dataUser).then((response) => {
      console.log("fffffffffffffffffffffffffffff", response);
      if (!response) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci d'essayer à nouveau",
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
          var object = {};
          object.file = photoUser;
          object.fileName = data.name + "-" + data.surname + "-" + userId;
          const myNewFile = new File([object.file], object.fileName, {
            type: object.file.type,
          });
          let formadata = new FormData();
          formadata.append("file", myNewFile);
          dispatch({
            type: SHOW_LOADER,
            payload: true,
          });
          const photoUrl = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
          axios({
            url: photoUrl,
            method: "POST",
            data: formadata,
          }).then((response) => {
            let urlPhotoUser =
              `${baseUrl.baseUrl}/users/` +
              userId +
              `?access_token=${localStorage.token}`;

            axios
              .patch(urlPhotoUser, {
                id: userId,
                photo:
                  response.data.result.files.file[0].providerResponse.location,
              })
              .then((response) => {
                if (response) {
                  dispatch({
                    type: HIDE_LOADER,
                    payload: false,
                  });
                  if (data.userPapiersFiles.length == 0) {
                    dispatch(
                      getAllUsersForAdmin(
                        dataUser.establishmentId,
                        dataUser.schoolYearId
                      )
                    );
                  }
                } else {
                  console.log(response.data, "photo not upload");
                }
              });
          });
        } else {
          if (data.userPapiersFiles.length == 0) {
            dispatch(
              getAllUsersForAdmin(
                dataUser.establishmentId,
                dataUser.schoolYearId
              )
            );
          }
        }
        if (response && data.userPapiersFiles.length > 0) {
          let formadata = new FormData();
          data.userPapiersFiles.map((element, index) => {
            let userPapiersFile = element;
            const fileExtension = userPapiersFile.name.replace(/^.*\./, "");
            // const fileName = 'userPapiersfile' + userId + index + '.' + fileExtension;
            const fileName = "user" + userId + userPapiersFile.name;

            var object = {};
            object.file = userPapiersFile;
            object.fileName = fileName;
            const myNewFile = new File([object.file], fileName, {
              type: object.file.type,
            });
            formadata.append("file", myNewFile);
          });

          let filesURL = [];
          dispatch({
            type: SHOW_LOADER,
            payload: true,
          });
          const URLUserPapiersFiles = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
          axios({
            url: URLUserPapiersFiles,
            method: "POST",
            data: formadata,
          })
            .then((response) => {
              if (response) {
                filesURL = response.data.result.files.file.map(
                  (urlFile, index) => {
                    return urlFile.providerResponse.location;
                  }
                );
                let urlPhotoUser =
                  `${baseUrl.baseUrl}/users/` +
                  userId +
                  `?access_token=${localStorage.token}`;

                axios
                  .patch(urlPhotoUser, {
                    id: userId,
                    paper_files: filesURL,
                  })
                  .then((response) => {
                    if (response) {
                      dispatch(
                        getAllUsersForAdmin(
                          dataUser.establishmentId,
                          dataUser.schoolYearId
                        )
                      );

                      dispatch({
                        type: HIDE_LOADER,
                        payload: false,
                      });
                      console.log("response photo", response);
                    } else {
                      console.log(response.data, "photo not upload");
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
