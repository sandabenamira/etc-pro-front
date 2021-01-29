import { classService } from "../_services/class.service";
import {
  FETECHED_ALL_HEALTH,
  ADD_HEALTH,
  EDIT_HEALTH,
  DELETE_HEALTH,
  HANDLE_REQUEST_CLOSE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constants/ActionTypes";
import baseUrl from "../config/config";
import axios from "axios";
export const addFicheMedical = (data, file) => {
  return (dispatch) => {
    let apiEndpoint = `/suivi_medicals?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      console.log("Suivi saved object ", response.data);

      if (response) {
        var suiviObject = response.data;

        if (file !== null) {
          var formadata = new FormData();
          const fileExtension = file.name.replace(/^.*\./, "");
          const fileName =
            "fiche_medical_" + suiviObject.id + "." + fileExtension;
          var object = {};
          object.file = file;
          object.fileName = fileName;

          dispatch(uploadCourseMedia(object, suiviObject));
        } else {
        }
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

// export const addFicheMedical = (data, file) => {
//   return (dispatch) => {
//     let apiEndpoint = `/suivi_medicals?access_token=${localStorage.token}`;
//     classService.post(apiEndpoint, data).then((response) => {
//       if (response) {
//         var suiviObject = response.data;

//         if (file !== null) {
//           axios
//             .get(
//               `${baseUrl.baseUrl}/establishments/` +
//                 data.establishment_id +
//                 `?access_token=${localStorage.token}`
//             )
//             .then((res) => {
//               var establishmentName = res.data.name;
//               let arrayItemCourseFiles = [];
//               var formadata = new FormData();
//               const fileExtension = file.name.replace(/^.*\./, "");
//               const fileName =
//                 "fiche_medical_" + suiviObject.id + "." + fileExtension;

//               var object = {};
//               object.file = file;
//               object.fileName = fileName;
//               object.establishmentName = establishmentName;

//               axios
//                 .patch(
//                   `${baseUrl.baseUrl}/suivi_medicals/` +
//                     suiviObject.id +
//                     `?access_token=${localStorage.token}`,
//                   {
//                     files: fileName,
//                   }
//                 )
//                 .then((response) => {
//                   object.suiviObject = response.data;

//                   dispatch(uploadCourseMedia(object));
//                 })
//                 .catch(function(error) {
//                   console.log("error", error);
//                 });
//             });
//         } else {
//         }
//       } else {
//         dispatch({
//           type: SHOW_ERROR_MESSAGE,
//           payload:
//             "Une erreur est survenue lors de la création merci d'essayer à nouveau",
//         });
//         setTimeout(() => {
//           dispatch({ type: HIDE_ERROR_MESSAGE });
//         }, 4000);
//       }
//     });
//   };
// };

export function uploadCourseMedia(ObjetFile, ObjetSuiviMedical) {
  const fileName = ObjetFile.fileName;
  const myNewFile = new File([ObjetFile.file], fileName, {
    type: ObjetFile.file.type,
  });
  let formadata = new FormData();
  formadata.append("image", myNewFile);
  return function(dispatch) {
    const establishLogoUrl = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
    axios({
      url: establishLogoUrl,
      method: "POST",
      data: formadata,
    })
      .then((response) => {
        axios
          .patch(
            `${baseUrl.baseUrl}/suivi_medicals/` +
              ObjetSuiviMedical.id +
              `?access_token=${localStorage.token}`,
            {
              files:
                response.data.result.files.image[0].providerResponse.location,
            }
          )
          .then((response) => {
            console.log("updateddddddddddd ", response.data);
            // dispatch(uploadCourseMedia(object));
          })
          .catch(function(error) {
            console.log("error", error);
          });

        // dispatch({ type: ADD_HEALTH, payload: data.suiviObject });
        // dispatch({
        //   type: SHOW_SUCCESS_MESSAGE,
        //   payload: "La création est effectuée avec succès",
        // });
        // setTimeout(() => {
        //   dispatch({ type: HIDE_SUCCESS_MESSAGE });
        // }, 4000);
      })
      .catch((err) => {});
  };
}

// export function uploadCourseMedia(data) {
//   const fileName = data.fileName;
//   const myNewFile = new File([data.file], fileName, { type: data.file.type });
//   let formadata = new FormData();
//   formadata.append("image", myNewFile);
//   return function(dispatch) {
//     const establishLogoUrl =
//       `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
//     axios({
//       url: establishLogoUrl,
//       method: "POST",
//       data: formadata,
//     })
//       .then((response) => {
//         console.log('resssssssssssss ',response)
//         dispatch({ type: ADD_HEALTH, payload: data.suiviObject });
//         dispatch({
//           type: SHOW_SUCCESS_MESSAGE,
//           payload: "La création est effectuée avec succès",
//         });
//         setTimeout(() => {
//           dispatch({ type: HIDE_SUCCESS_MESSAGE });
//         }, 4000);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

export const getFicheMedical = () => {
  return (dispatch) => {
    let apiEndpoint = `/suivi_medicals?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const ficheList = list.filter((element) => element.status);
        dispatch({ type: FETECHED_ALL_HEALTH, payload: ficheList });
      })
      .catch((err) => {});
  };
};

export const getFicheMedicalByEstablishmentId = (establishmentId) => {
  return (dispatch) => {
    let apiEndpoint =
      `/suivi_medicals?access_token=${localStorage.token}&filter[where][establishment_id]=` +
      establishmentId;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const ficheList = list.filter((element) => element.status);

        dispatch({ type: FETECHED_ALL_HEALTH, payload: ficheList });
      })
      .catch((err) => {});
  };
};

export function deleteFicheMedical(itemId) {
  return (dispatch) => {
    axios
      .patch(
        `${baseUrl.baseUrl}/suivi_medicals/` +
          itemId +
          `?access_token=${localStorage.token}`,
        {
          status: false,
        }
      )
      .then((response) => {
        dispatch({ type: DELETE_HEALTH, payload: response.data });
      })
      .catch(function(error) {});
  };
}

export function editFicheMedical(data, file) {
  return (dispatch) => {
    if (file !== null) {
      if (data.files == "1.png") {
        axios
          .get(
            `${baseUrl.baseUrl}/establishments/` +
              data.establishment_id +
              `?access_token=${localStorage.token}`
          )
          .then((res) => {
            var establishmentName = res.data.name;
            const fileExtension = file.name.replace(/^.*\./, "");
            const fileName = "fiche_medical_" + data.id + "." + fileExtension;

            var object = {};
            object.file = file;
            object.fileName = fileName;
            object.establishmentName = establishmentName;
            data.files = fileName;

            axios
              .put(
                `${baseUrl.baseUrl}/suivi_medicals/` +
                  data.id +
                  `?access_token=${localStorage.token}`,
                {
                  establishment_id: data.establishment_id,
                  student_id: data.student_id,
                  class_id: data.class_id,
                  nom_doctor: data.nom_doctor,
                  prenom_doctor: this.state.prenom_doctor,
                  phone_doctor: data.phone_doctor,
                  blood_type: data.blood_type,
                  poids: data.poids,
                  hauteur: data.hauteur,
                  problems: data.problems,
                  remarque: data.remarque,
                  files: fileName,
                  status: true,
                  mail_doctor: data.mail_doctor,
                  id: data.id,
                }
              )
              .then((response) => {
                object.suiviObject = response.data;
                dispatch(uploadCourseMediaedit(object));
              })
              .catch(function(error) {});
          });
      } else {
        axios
          .get(
            `${baseUrl.baseUrl}/establishments/` +
              data.establishment_id +
              `?access_token=${localStorage.token}`
          )
          .then((res) => {
            var establishmentName = res.data.name;
            let formadata = new FormData();
            formadata.append("image", file);
            const establishLogoUrl =
              `${baseUrl.baseUrl}/containers/` +
              establishmentName +
              `/files/` +
              data.files +
              `?access_token=${localStorage.token}`;
            axios({
              url: establishLogoUrl,
              method: "DELETE",
              data: formadata,
            }).then((response) => {
              const fileExtension = file.name.replace(/^.*\./, "");
              const fileName = "fiche_medical_" + data.id + "." + fileExtension;

              var object = {};
              object.file = file;
              object.fileName = fileName;
              object.establishmentName = establishmentName;
              data.files = fileName;

              axios
                .put(
                  `${baseUrl.baseUrl}/suivi_medicals/` +
                    data.id +
                    `?access_token=${localStorage.token}`,
                  {
                    establishment_id: data.establishment_id,
                    student_id: data.student_id,
                    class_id: data.class_id,
                    nom_doctor: data.nom_doctor,
                    prenom_doctor: data.prenom_doctor,
                    phone_doctor: data.phone_doctor,
                    blood_type: data.blood_type,
                    poids: data.poids,
                    hauteur: data.hauteur,
                    problems: data.problems,
                    remarque: data.remarque,
                    files: fileName,
                    status: true,
                    mail_doctor: data.mail_doctor,
                    id: data.id,
                  }
                )
                .then((response) => {
                  object.suiviObject = response.data;
                  dispatch(uploadCourseMediaedit(object));
                })
                .catch(function(error) {});
            });
          });
      }
    } else {
      axios
        .put(
          `${baseUrl.baseUrl}/suivi_medicals/` +
            data.id +
            `?access_token=${localStorage.token}`,
          {
            establishment_id: data.establishment_id,
            student_id: data.student_id,
            class_id: data.class_id,
            nom_doctor: data.nom_doctor,
            prenom_doctor: data.prenom_doctor,
            phone_doctor: data.phone_doctor,
            blood_type: data.blood_type,
            poids: data.poids,
            hauteur: data.hauteur,
            problems: data.problems,
            remarque: data.remarque,
            files: data.files,
            status: true,
            mail_doctor: data.mail_doctor,
            id: data.id,
          }
        )
        .then((response) => {
          dispatch({ type: EDIT_HEALTH, payload: response.data });
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: "La modification est effectuée avec succès",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        })
        .catch(function(error) {});
    }
  };
}

export function uploadCourseMediaedit(data) {
  const fileName = data.fileName;
  const myNewFile = new File([data.file], fileName, { type: data.file.type });
  let formadata = new FormData();
  formadata.append("image", myNewFile);
  return function(dispatch) {
    const establishLogoUrl =
      `${baseUrl.baseUrl}/containers/` +
      data.establishmentName +
      `/upload?access_token=${localStorage.token}`;
    axios({
      url: establishLogoUrl,
      method: "POST",
      data: formadata,
    })
      .then((response) => {
        dispatch({ type: EDIT_HEALTH, payload: data.suiviObject });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La création est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch((err) => {});
  };
}

export function getBlodType(idBlood) {
  var blood_group = [
    {
      id: 1,
      type: "A+",
    },
    {
      id: 2,
      type: "A-",
    },
    {
      id: 3,
      type: "B+",
    },
    {
      id: 4,
      type: "B-",
    },
    {
      id: 5,
      type: "AB+",
    },
    {
      id: 6,
      type: "AB-",
    },
    {
      id: 7,
      type: "O+",
    },
    {
      id: 8,
      type: "O-",
    },
  ];
  var bloodType = blood_group.filter((element) => element.id === idBlood);
  return bloodType[0].type;
}

export const serviceAction = {
  addFicheMedical,
  getFicheMedical,
  deleteFicheMedical,
  getBlodType,
  getFicheMedicalByEstablishmentId,
};
