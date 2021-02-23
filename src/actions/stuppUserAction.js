import baseUrl from "../config/config";
import axios from "axios";
import {
  DATA_LOADED_STUPPUSER,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_WARNING_MESSAGE,
  SHOW_WARNING_MESSAGE,
  DATA_NEW_STUPPUSER,
} from "../constants/ActionTypes";
import _ from "lodash";
import { getError } from "../Error/Error";
import { classService } from "../_services/class.service";
import { roleIdStudent } from "../config/config";
function getUsersByRole(usersList, role_id, establishment_id) {
  let usersByRole = [];
  establishment_id
    ? (usersByRole = _.filter(usersList, function(user) {
        return _.some(user.profiles, {
          role_id: role_id,
          establishment_id: establishment_id,
        });
      }))
    : (usersByRole = _.filter(usersList, function(user) {
        return _.some(user.profiles, { role_id: role_id });
      }));
  return usersByRole;
}

function getUserFromProfileId(usersList, profile_id) {
  let userInfo = [];
  userInfo = _.filter(usersList, function(user) {
    return _.some(user.profiles, { id: profile_id });
  });
  return _.first(userInfo);
}
export function getAllUsers() {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/profiles?access_token=${localStorage.token}&filter[include]=user`
      )
      .then((res) => {
        dispatch({ type: DATA_LOADED_STUPPUSER, payload: res.data });
      });
  };
}

export function getAllUsersByEstablishmentId(establishment_id) {
   return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/profile_establishments?access_token=${localStorage.token}&filter[include][profile]=user&filter[include][profile]=professors&filter[include][profile]=students&filter[include][profile]=parents&filter[where][and][0][establishment_id]=` +
          establishment_id
      )
      .then((res) => {
        const list = res.data;
         const serviceList = list.filter(
          (element) => element.profile.user.status === true
        );
        const newList = _.map(serviceList, "profile");
        dispatch({ type: DATA_LOADED_STUPPUSER, payload: newList });
      });
  };
}

export function fetchAllUsers() {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/profiles?access_token=${localStorage.token}&filter[include]=user&filter[include]=professors&filter[include]=students`
      )

      .then((res) => {
        const list = res.data;
        const serviceList = list.filter(
          (element) => element.user.status === true
        );
        dispatch({ type: DATA_LOADED_STUPPUSER, payload: serviceList });
      });
  };
}

export function addStuppUser(stuppUser, userPhoto, parentStudentPhoto) {
  if (stuppUser.nameParent !== "") {
    return function(dispatch) {
      var fileExtension1 = "";
      var fileName1 = "";
      var fileExtension2 = "";
      var fileName2 = "";
      if (userPhoto !== null) {
        fileExtension1 = userPhoto.name.replace(/^.*\./, "");
        fileName1 =
          stuppUser.cin + stuppUser.establishment_Name + "." + fileExtension1;
      } else {
        fileName1 = null;
      }
      if (parentStudentPhoto !== null) {
        fileExtension2 = parentStudentPhoto.name.replace(/^.*\./, "");
        fileName2 =
          stuppUser.cinParent +
          stuppUser.establishment_Name +
          "." +
          fileExtension2;
      } else {
        fileName2 = null;
      }
      axios
        .post(
          `${baseUrl.baseUrl}/users/create?access_token=${localStorage.token}`,
          {
            name: stuppUser.name,
            surname: stuppUser.surname,
            gender: stuppUser.gender,
            date_of_birth: stuppUser.date_of_birth,
            address: stuppUser.address,
            phone: stuppUser.phone,
            status: true,
            cin: stuppUser.cin,
            zip_code: stuppUser.zip_code,
            realm: stuppUser.name,
            username: stuppUser.name + "." + stuppUser.surname,
            email: stuppUser.email,
            password: "123456",
            emailVerified: false,
            nameParent: stuppUser.nameParent,
            surnameParent: stuppUser.surnameParent,
            genderParent: stuppUser.genderParent,
            date_of_birthParent: stuppUser.date_of_birthParent,
            addressParent: stuppUser.addressParent,
            phoneParent: stuppUser.phoneParent,
            statusParent: true,
            cinParent: stuppUser.cinParent,
            zip_codeParent: stuppUser.zip_codeParent,
            realmParent: stuppUser.nameParent,
            usernameParent:
              stuppUser.nameParent + "." + stuppUser.surnameParent,
            emailParent: stuppUser.emailParent,
            passwordParent: "123456",
            emailVerifiedParent: false,
            date_start_contract: stuppUser.date_start_contract,
            date_end_contract: stuppUser.date_end_contract,
            establishment_id: stuppUser.establishment_id,
            role_id: stuppUser.role_id,
            listOfSubjects: stuppUser.listOfSubjects,
            class_id: stuppUser.class_id,
            service_id: stuppUser.service_id,
            photo: fileName1,
            parentStudentphoto: fileName2,
          }
        )
        .then((response) => {
          dispatch(
            uploadStudentParentFile(
              response.data,
              userPhoto,
              parentStudentPhoto,
              stuppUser.establishment_Name,
              fileName1,
              fileName2
            )
          );
        })
        .catch((error) => {
          alert("Merci de vérifier votre champ obligatoire");
        });
    };
  } else {
    return function(dispatch) {
      var fileExtension1 = "";
      var fileName1 = "";
      if (userPhoto !== null) {
        fileExtension1 = userPhoto.name.replace(/^.*\./, "");
        fileName1 =
          stuppUser.cin + stuppUser.establishment_Name + "." + fileExtension1;
      } else {
        fileName1 = null;
      }

      axios
        .post(
          `${baseUrl.baseUrl}/users/create?access_token=${localStorage.token}`,
          {
            name: stuppUser.name,
            surname: stuppUser.surname,
            gender: stuppUser.gender,
            date_of_birth: stuppUser.date_of_birth,
            address: stuppUser.address,
            phone: stuppUser.phone,
            status: true,
            cin: stuppUser.cin,
            zip_code: stuppUser.zip_code,
            realm: stuppUser.name,
            username: stuppUser.name + "." + stuppUser.surname,
            email: stuppUser.email,
            password: "123456",
            emailVerified: false,
            nameParent: stuppUser.nameParent,
            surnameParent: stuppUser.surnameParent,
            genderParent: stuppUser.genderParent,
            date_of_birthParent: stuppUser.date_of_birthParent,
            addressParent: stuppUser.addressParent,
            phoneParent: stuppUser.phoneParent,
            statusParent: true,
            cinParent: stuppUser.cinParent,
            zip_codeParent: stuppUser.zip_codeParent,
            realmParent: stuppUser.nameParent,
            usernameParent:
              stuppUser.nameParent + "." + stuppUser.surnameParent,
            emailParent: stuppUser.emailParent,
            passwordParent: "123456",
            emailVerifiedParent: false,
            date_start_contract: stuppUser.date_start_contract,
            date_end_contract: stuppUser.date_end_contract,
            establishment_id: stuppUser.establishment_id,
            role_id: stuppUser.role_id,
            listOfSubjects: stuppUser.listOfSubjects,
            class_id: stuppUser.class_id,
            service_id: stuppUser.service_id,
            photo: fileName1,
            parentStudentphoto: null,
          }
        )
        .then((response) => {
          dispatch(
            uploadFile(
              response.data.user,
              userPhoto,
              stuppUser.establishment_Name,
              fileName1
            )
          );
        })
        .catch((error) => {
          alert("Merci de vérifier votre champ obligatoire");
        });
    };
  }
}

export function uploadFile(payload, file, establishmentName, fileName) {
  if (fileName !== null) {
    return function(dispatch) {
      const myNewFile = new File([file], fileName, { type: file.type });
      let formadata = new FormData();
      formadata.append("image", myNewFile);
      const establishLogoUrl = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
      axios({
        url: establishLogoUrl,
        method: "POST",
        data: formadata,
      })
        .then((response) => {
          dispatch({ type: "ADD_STUPPUSER", payload: payload });
          alert("L'ajout est effectué avec succès");
        })
        .catch((err) => {});
    };
  } else {
    return function(dispatch) {
      dispatch({ type: "ADD_STUPPUSER", payload: payload });
      alert("L'ajout est effectué avec succès");
    };
  }
}

export function uploadStudentParentFile(
  payload,
  file,
  file2,
  establishmentName,
  fileName1,
  fileName2
) {
  if (fileName1 !== null && fileName2 !== null) {
    return function(dispatch) {
      const myNewFile = new File([file], fileName1, { type: file.type });
      let formadata = new FormData();
      formadata.append("image", myNewFile);
      const establishLogoUrl =
        `${baseUrl.baseUrl}/containers/` +
        "classebook.data.storage" +
        `/upload?access_token=${localStorage.token}`;
      axios({
        url: establishLogoUrl,
        method: "POST",
        data: formadata,
      })
        .then((response) => {
          const myNewFile2 = new File([file2], fileName2, { type: file2.type });
          let formadata2 = new FormData();
          formadata2.append("image", myNewFile2);
          const establishLogoUrl =
            `${baseUrl.baseUrl}/containers/` +
            "classebook.data.storage" +
            `/upload?access_token=${localStorage.token}`;
          axios({
            url: establishLogoUrl,
            method: "POST",
            data: formadata2,
          })
            .then((response) => {
              dispatch({ type: "ADD_STUPPUSER", payload: payload.user });
              alert("L'ajout est effectué avec succès");
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    };
  } else if (fileName1 !== null && fileName2 === null) {
    return function(dispatch) {
      const myNewFile = new File([file], fileName1, { type: file.type });
      let formadata = new FormData();
      formadata.append("image", myNewFile);
      const establishLogoUrl =
        `${baseUrl.baseUrl}/containers/` +
        "classebook.data.storage" +
        `/upload?access_token=${localStorage.token}`;
      axios({
        url: establishLogoUrl,
        method: "POST",
        data: formadata,
      })
        .then((response) => {
          dispatch({ type: "ADD_STUPPUSER", payload: payload.user });
          alert("L'ajout est effectué avec succès");
        })
        .catch((err) => {});
    };
  } else if (fileName1 === null && fileName2 !== null) {
    return function(dispatch) {
      const myNewFile = new File([file2], fileName2, { type: file2.type });
      let formadata = new FormData();
      formadata.append("image", myNewFile);
      const establishLogoUrl =
        `${baseUrl.baseUrl}/containers/` +
        "classebook.data.storage" +
        `/upload?access_token=${localStorage.token}`;
      axios({
        url: establishLogoUrl,
        method: "POST",
        data: formadata,
      })
        .then((response) => {
          dispatch({ type: "ADD_STUPPUSER", payload: payload.user });
          alert("L'ajout est effectué avec succès");
        })
        .catch((err) => {});
    };
  } else {
    return function(dispatch) {
      dispatch({ type: "ADD_STUPPUSER", payload: payload.user });
      alert("L'ajout est effectué avec succès");
    };
  }
}
export function editPassword(data) {
  return function(dispatch) {
    axios
      .post(
        `${baseUrl.baseUrl}/users/change-password?access_token=` +
          localStorage.token,
        {
          oldPassword: data.currentPass,
          newPassword: data.newPass,
        }
      )
      .then((response) => {
        dispatch({ type: "EDIT_PASSWORD", payload: response.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload:
            "Le changement de votre mot de passe est effectué avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch((error) => {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci de vérifier votre mot de passe",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
}
export function editStuppUser(stuppUser, file, establishmentName) {
  if (file !== null) {
    if (stuppUser.photo !== null) {
      return function(dispatch) {
        let formadata = new FormData();
        formadata.append("image", file);
        const establishLogoUrl =
          `${baseUrl.baseUrl}/containers/` +
          establishmentName +
          `/files/` +
          stuppUser.photo +
          `?access_token=${localStorage.token}`;
        axios({
          url: establishLogoUrl,
          method: "DELETE",
          data: formadata,
        })
          .then((response) => {
            dispatch(uploadUserPhoto(stuppUser, file, establishmentName));
          })
          .catch((err) => {});
      };
    } else {
      return function(dispatch) {
        dispatch(uploadUserPhoto(stuppUser, file, establishmentName));
      };
    }
  } else {
    return function(dispatch) {
      axios
        .patch(
          `${baseUrl.baseUrl}/users/` +
            stuppUser.id +
            `?access_token=${localStorage.token}`,
          {
            name: stuppUser.name,
            surname: stuppUser.surname,
            gender: stuppUser.gender,
            date_of_birth: stuppUser.date_of_birth,
            address: stuppUser.address,
            phone: stuppUser.phone,
            status: true,
            cin: stuppUser.cin,
            zip_code: stuppUser.zip_code,
            realm: stuppUser.name,
            username: stuppUser.name + "." + stuppUser.surname,
            email: stuppUser.email,
            photo: stuppUser.photo,
          }
        )
        .then((response) => {
          dispatch({ type: "EDIT_STUPPUSER", payload: response.data });
         })
        .catch(function(error) {});
    };
  }
}
export function editServices(stuppUser) {
  const serviceList = stuppUser.services;
  if (stuppUser.services.length > 0) {
    axios
      .get(
        `${baseUrl.baseUrl}/students/findOne?access_token=?access_token=${localStorage.token}&filter={"where":{"profile_id":` +
          stuppUser.profile_id +
          `}}`
      )
      .then((response) => {
        const student_id = response.data.id;
        axios
          .get(
            `${baseUrl.baseUrl}/students_services?access_token=${localStorage.token}&filter={"where":{"student_id":` +
              student_id +
              `}}`
          )
          .then((response) => {
            if (response.data.length === 0) {
              serviceList.map((service) => {
                axios
                  .post(
                    `${baseUrl.baseUrl}/students_services?access_token=${localStorage.token}`,
                    {
                      assignment_date: new Date(),
                      status: true,
                      student_id: student_id,
                      service_id: service,
                    }
                  )
                  .then((response) => {})
                  .catch((err) => {});
              });
            } else {
              let oldStudentService = response.data;
              let studentService = oldStudentService.map(
                (service) => service.service_id
              );
              const servicesID = studentService.concat(serviceList);
              const uniq = [...new Set(servicesID)];
              const NewServices = uniq.filter(
                (n) => !studentService.includes(n)
              );
              NewServices.map((service) => {
                axios
                  .post(
                    `${baseUrl.baseUrl}/students_services?access_token=${localStorage.token}`,
                    {
                      assignment_date: new Date(),
                      status: true,
                      student_id: student_id,
                      service_id: service,
                    }
                  )
                  .then((response) => {})
                  .catch((err) => {});
              });
            }
          });
        alert("La modification est effectué avec succès", response.data.id);
      })
      .catch((err) => {});
  } else {
    return function(dispatch) {
      alert("La modification est effectué avec succès");
    };
  }
}

export function updateUserDataPhoto(stuppUser, file, establishmentName) {
  return function(dispatch) {
    const fileExtension = file.name.replace(/^.*\./, "");
    const fileName = stuppUser.id + stuppUser.cin + "." + fileExtension;
    axios
      .patch(
        `${baseUrl.baseUrl}/users/` +
          stuppUser.id +
          `?access_token=${localStorage.token}`,
        {
          name: stuppUser.name,
          surname: stuppUser.surname,
          gender: stuppUser.gender,
          date_of_birth: stuppUser.date_of_birth,
          address: stuppUser.address,
          phone: stuppUser.phone,
          status: true,
          cin: stuppUser.cin,
          zip_code: stuppUser.zip_code,
          realm: stuppUser.name,
          username: stuppUser.name + "." + stuppUser.surname,
          email: stuppUser.email,
          photo: fileName,
        }
      )
      .then((response) => {
        dispatch({ type: "EDIT_STUPPUSER", payload: response.data });
        alert("La modification est effectué avec succès");
      })
      .catch(function(error) {});
  };
}

export function deleteUser(idItem) {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/users/` +
          idItem +
          `?access_token=${localStorage.token}`
      )
      .then((res) => {
        const datastuppUser = res.data;
        axios
          .patch(
            `${baseUrl.baseUrl}/users/` +
              datastuppUser.id +
              `?access_token=${localStorage.token}`,
            {
              status: false,
            }
          )
          .then((response) => {
            dispatch({ type: "DELETE_STUPPUSER", payload: response.data });
            dispatch({
              type: SHOW_SUCCESS_MESSAGE,
              payload: "La suppression a été effectuée avec succès",
            });

            setTimeout(() => {
              dispatch({ type: HIDE_SUCCESS_MESSAGE });
            }, 2000);
          })
          .catch(function(error) {});
      });
  };
}

export function deleteStuppUser(idItem) {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/users/` +
          idItem +
          `?access_token=${localStorage.token}`
      )
      .then((res) => {
        const datastuppUser = res.data;
        axios
          .put(
            `${baseUrl.baseUrl}/users/` +
              datastuppUser.id +
              `?access_token=${localStorage.token}`,
            {
              name: datastuppUser.name,
              surname: datastuppUser.surname,
              gender: datastuppUser.gender,
              date_of_birth: datastuppUser.date_of_birth,
              address: datastuppUser.address,
              phone: datastuppUser.phone,
              status: false,
              cin: datastuppUser.cin,
              zip_code: datastuppUser.zip_code,
              photo: datastuppUser.photo,
              realm: datastuppUser.realm,
              username: datastuppUser.username,
              email: datastuppUser.email,
              password: "123456",
              emailVerified: datastuppUser.emailVerified,
              id: datastuppUser.id,
            }
          )
          .then((response) => {
            dispatch({ type: "DELETE_STUPPUSER", payload: response.data });
          })
          .catch(function(error) {});
      });
  };
}

export function uploadUserPhoto(id, stuppUser) {
  return function(dispatch) {
    const fileExtension = stuppUser.photo.name.replace(/^.*\./, "");
    const fileName = "user" + id + "." + fileExtension;
    const myNewFile = new File([stuppUser.photo], fileName, {
      type: stuppUser.photo.type,
    });
    let formadata = new FormData();
    formadata.append("image", myNewFile);
    const establishLogoUrl =
      `${baseUrl.baseUrl}/containers/` +
      "classebook.data.storage" +
      `/upload?access_token=${localStorage.token}`;
    axios({
      url: establishLogoUrl,
      method: "POST",
      data: formadata,
    })
      .then((response) => {
        axios
          .patch(
            `${baseUrl.baseUrl}/users/` +
              id +
              `?access_token=${localStorage.token}`,
            { photo: fileName }
          )
          .then((res) => {});
      })
      .catch((err) => {});
  };
}

export function addUser(stuppUser, fileName1) {
  return function(dispatch) {
    axios
      .post(
        `${baseUrl.baseUrl}/users/create-user?access_token=${localStorage.token}`,
        { stuppUser }
      )
      .then((response) => {
        let newFormat = {
          ...response.data.user[1],
          user: response.data.user[0],
          professors: [response.data.user[2]],
          students: [response.data.user[2]],
          parents: [],
        };
        if (response.data.user.statusCode === undefined) {
          dispatch({ type: "ADD_STUPPUSER", payload: newFormat });
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: "La création est effectué avec succès",
          });
        } else {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: getError(response.data.user.statusCode),
          });
        }
        setTimeout(
          function() {
            if (response.data.user.statusCode === undefined) {
              dispatch({ type: HIDE_SUCCESS_MESSAGE });
              if (stuppUser.photo !== null) {
                dispatch(uploadUserPhoto(response.data.user[0].id, stuppUser));
              }
            } else {
              dispatch({ type: HIDE_ERROR_MESSAGE });
            }
          }.bind(this),
          3000
        );
      })
      .catch((err) => {});
  };
}
export function editUser(stuppUser) {
  return function(dispatch) {
    dispatch({ type: "EDIT_STUPPUSER_COMMON_INFORMATION", payload: stuppUser });
  };
}

export function addSignature(data) {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/users/` +
          data.idItem +
          `?access_token=${localStorage.token}`
      )
      .then((res) => {
        const datastuppUser = res.data;
        const fileExtension = data.file.name.replace(/^.*\./, "");
        const fileName =
          "Signature_" +
          datastuppUser.id +
          datastuppUser.cin +
          "." +
          fileExtension;
        const myNewFile = new File([data.file], fileName, {
          type: data.file.type,
        });
        let formadata = new FormData();
        formadata.append("image", myNewFile);
        axios
          .put(
            `${baseUrl.baseUrl}/users/` +
              datastuppUser.id +
              `?access_token=${localStorage.token}`,
            {
              name: datastuppUser.name,
              surname: datastuppUser.surname,
              gender: datastuppUser.gender,
              date_of_birth: datastuppUser.date_of_birth,
              address: datastuppUser.address,
              phone: datastuppUser.phone,
              status: false,
              cin: datastuppUser.cin,
              zip_code: datastuppUser.zip_code,
              photo: datastuppUser.photo,
              realm: datastuppUser.realm,
              username: datastuppUser.username,
              email: datastuppUser.email,
              password: "123456",
              emailVerified: datastuppUser.emailVerified,
              id: datastuppUser.id,
              user_signature: fileName,
            }
          )
          .then((response) => {
            var object = {};
            object.file = data.file;
            object.fileName = fileName;
            object.establishmentID = data.establishmentID;
            object.user = response.data;
            dispatch(updateSignaturePhoto(object));
          })
          .catch(function(error) {});
      });
  };
}

export function updateSignaturePhoto(data) {
  const fileName = data.fileName;
  const myNewFile = new File([data.file], data.fileName, {
    type: data.file.type,
  });
  let formadata = new FormData();
  formadata.append("image", myNewFile);
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/establishments/` +
          data.establishmentID +
          `?access_token=${localStorage.token}`
      )
      .then((res) => {
        const establishLogoUrl = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
        axios({
          url: establishLogoUrl,
          method: "POST",
          data: formadata,
        })
          .then((response) => {
            dispatch({ type: "EDIT_PROFILE_SIGNATURE", payload: data.user });
          })
          .catch((err) => {});
      })
      .catch(function(error) {});
  };
}

export function errorHandling() {
  return function(dispatch) {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload:
        "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_MESSAGE });
    }, 4000);
  };
}

export function successHandling() {
  return function(dispatch) {
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "La modification est effectuée avec succès",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_SUCCESS_MESSAGE });
    }, 4000);
  };
}
export function successAddUserHandling() {
  return function(dispatch) {
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "L'ajout est effectuée avec succès",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_SUCCESS_MESSAGE });
    }, 4000);
  };
}
export function successHandlingSteper() {
  return function(dispatch) {
    dispatch({
      type: "SHOW_SUCCESS_STEPER",
      payload:
        "La modification est effectuée avec succès pour l'étape précédente",
    });
    setTimeout(() => {
      dispatch({ type: "HIDE_SUCCESS_STEPER" });
    }, 4000);
  };
}
export function errorHandlingSteper() {
  return function(dispatch) {
    dispatch({
      type: "SHOW_ERROR_STEPER",
      payload:
        "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
    });
    setTimeout(() => {
      dispatch({ type: "HIDE_ERROR_STEPER" });
    }, 4000);
  };
}

export function uploadExcel(file, establishmentId) {
  let apiEndpoint = "";
  if (file !== null) {
    let dataEstablishment = {};
    return (dispatch) => {
      apiEndpoint =
        `/establishments/` +
        establishmentId +
        `?access_token=${localStorage.token}`;
      classService.get(apiEndpoint).then((response) => {
        dataEstablishment = {
          establishment_id: response.data.id,
          establishment_Name: response.data.name,
          file_name: file.name,
        };
        const data = new FormData();
        data.append("file", file);
        apiEndpoint =
          `/containers/` +
          response.data.name +
          `/upload?access_token=${localStorage.token}`;
        classService.post(apiEndpoint, data).then((response) => {
          let apiEndpoint = `/users/addUserByExcel?access_token=${localStorage.token}`;
          classService.post(apiEndpoint, dataEstablishment).then((response) => {
            if (response.data.users.statusCode === undefined) {
              dispatch({ type: "ADD_STUPPUSER", payload: response.data.users });
              if (!_.isEmpty(response.data.errorUser)) {
                let emails = _.join(
                  _.map(response.data.errorUser, "Email"),
                  " ,"
                );
                dispatch({
                  type: SHOW_WARNING_MESSAGE,
                  payload: `Une erreur est survenue lors de la création des utilisateurs suivants: ${emails} `,
                });
                dispatch(getAllUsersByEstablishmentId(establishmentId));
                setTimeout(() => {
                  dispatch({ type: HIDE_WARNING_MESSAGE });
                }, 6000);
              } else {
                dispatch(getAllUsersByEstablishmentId(establishmentId));
                dispatch({
                  type: SHOW_SUCCESS_MESSAGE,
                  payload: "La création est effectué avec succès",
                });
                setTimeout(() => {
                  dispatch({ type: HIDE_SUCCESS_MESSAGE });
                }, 4000);
              }
            } else {
              dispatch({
                type: SHOW_ERROR_MESSAGE,
                payload: getError(response.data.users.statusCode),
              });
              setTimeout(() => {
                dispatch({ type: HIDE_ERROR_MESSAGE });
              }, 4000);
            }
          });
        });
      });
    };
  } else {
    alert("erreur");
  }
}

export function getAllStudentByEstablishmentId(establishment_id) {
  return function(dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/profiles?access_token=${localStorage.token}&filter[include]=user&filter[include]=students&filter[where][and][0][establishment_id]=${establishment_id}&filter[where][and][1][role_id]=${roleIdStudent}`
      )
      .then((res) => {
        const list = res.data;
        const serviceList = list.filter(
          (element) => element.user.status === true
        );
        dispatch({ type: DATA_LOADED_STUPPUSER, payload: serviceList });
      });
  };
}

export function addNewUser(newUser) {
  return function(dispatch) {
    dispatch({ type: DATA_NEW_STUPPUSER, payload: newUser });
  };
}

export function uploadAdminPhoto(id, stuppUser, newUser) {
  return function(dispatch) {
    const fileExtension = stuppUser.photo.name.replace(/^.*\./, "");
    const fileName = "user" + id + "." + fileExtension;
    const myNewFile = new File([stuppUser.photo], fileName, {
      type: stuppUser.photo.type,
    });
    let formadata = new FormData();
    formadata.append("image", myNewFile);
    const establishLogoUrl =
      `${baseUrl.baseUrl}/containers/` +
      stuppUser.establishment_Name +
      `/upload?access_token=${localStorage.token}`;
    axios({
      url: establishLogoUrl,
      method: "POST",
      data: formadata,
    })
      .then((response) => {
        axios
          .patch(
            `${baseUrl.baseUrl}/users/` +
              id +
              `?access_token=${localStorage.token}`,
            { photo: fileName }
          )
          .then((res) => {
            let userInfo = {
              ...newUser,
              user: res.data,
            };
            dispatch(addNewUser(userInfo));
          });
      })
      .catch((err) => {});
  };
}

export function uploadProfAndStudentPhoto(id, stuppUser, fileName) {
  return function(dispatch) {
    const myNewFile = new File([stuppUser.photo], fileName, {
      type: stuppUser.photo.type,
    });
    let formadata = new FormData();
    formadata.append("image", myNewFile);
    const establishLogoUrl =
      `${baseUrl.baseUrl}/containers/` +
      stuppUser.establishment_Name +
      `/upload?access_token=${localStorage.token}`;
    axios({
      url: establishLogoUrl,
      method: "POST",
      data: formadata,
    })
      .then((response) => {
        axios
          .patch(
            `${baseUrl.baseUrl}/users/` +
              id +
              `?access_token=${localStorage.token}`,
            { photo: fileName }
          )
          .then((res) => {});
      })
      .catch((err) => {});
  };
}

export { getUsersByRole, getUserFromProfileId };
