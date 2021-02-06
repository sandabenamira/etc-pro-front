import { classService } from "../_services/class.service";
import axios from "axios";
import baseUrl from "../config/config";

import {
  GET_ALL_LESSON,
  ADD_LESSON,
  DELETE_LESSON,
  EDIT_LESSON,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constants/ActionTypes";

export const getLessons = (establishmentId) => {
  return (dispatch) => {
    let apiEndpoint = `/courses?access_token=${localStorage.token}&filter[include][classProfSubject][class]`;
    classService.get(apiEndpoint).then((response) => {
      var filtredLessons = response.data.filter(
        (element) =>
          element.status === true &&
          element.classProfSubject.class.establishment_id == establishmentId
      );
      dispatch({ type: GET_ALL_LESSON, payload: filtredLessons });
    });
  };
};

export const getLessonByClassId = (classId) => {
  return (dispatch) => {
    let apiEndpoint = `/courses/getLessonsByClassId/${classId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      var filtredLessons = response.data.lessons.filter(
        (element) => element.status === true
      );

      dispatch({ type: GET_ALL_LESSON, payload: filtredLessons });
    });
  };
};
export const addLesson = (itemLesson, files, establishmentID) => {
  //1
  return (dispatch) => {
    let apiEndpoint = `/courses?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, itemLesson).then((response) => {


      if (response) {
        var course_id = response.data.id;
        const courseObject = response.data;
      
            let arrayItemCourseFiles = [];
            var formadata = new FormData();
            if (files.length > 0) {
              var i=0;
              for (const key of Object.keys(files)) {
                i++
                const fileExtension = files[key].name.replace(/^.*\./, "");
                const fileName =
                  "Course_" + courseObject.id + "." + key + "." + fileExtension;

                var itemCourseFiles = {};
                itemCourseFiles.file_name = fileName;
                itemCourseFiles.course_id = course_id;

                var object = {};
                object.file = files[key];
                object.fileName = fileName;
                object.courseObject = response.data;

                const finalfileName = fileName;

                const myNewFile = new File([files[key]], finalfileName, { type: files[key].type });
                let formadata = new FormData();
                formadata.append("image", myNewFile);

                  const establishLogoUrl =
                  `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;

                  axios({
                    url: establishLogoUrl,
                    method: "POST",
                    data: formadata,
                  })
                    .then((response2) => {
                  arrayItemCourseFiles.push(response2.data.result.files.image[0].providerResponse.location);

                    })
                    .catch((err) => {
                     });
            
              
              }
              if(i==files.length) {
            
              classService.post(
                `/course_files?access_token=${localStorage.token}`,
                arrayItemCourseFiles
              ).then((response3) => {
                dispatch({ type: ADD_LESSON, payload: courseObject });
                dispatch({
                  type: SHOW_SUCCESS_MESSAGE,
                  payload: "La création est effectuée avec succès",
                });
                setTimeout(() => {
                  dispatch({ type: HIDE_SUCCESS_MESSAGE });
                }, 4000);
                  })
                  .catch((err) => {
                   });
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
              if (course_id) {
                axios.delete(
                  `${baseUrl.baseUrl}/courses/` +
                  course_id +
                  `?access_token=${localStorage.token}`
                );
              }
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

export function uploadCourseMedia(data) {
  const fileName = data.fileName;
  const myNewFile = new File([data.file], fileName, { type: data.file.type });
  let formadata = new FormData();
  formadata.append("image", myNewFile);
  return function(dispatch) {
    const establishLogoUrl =
      `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
    axios({
      url: establishLogoUrl,
      method: "POST",
      data: formadata,
    })
      .then((response) => {
        // dispatch({ type: ADD_LESSON, payload: data.courseObject });
        // dispatch({
        //   type: SHOW_SUCCESS_MESSAGE,
        //   payload: 'La création est effectuée avec succès',
        // });
        // setTimeout(() => {
        //   dispatch({ type: HIDE_SUCCESS_MESSAGE });
        // }, 4000);
      })
      .catch((err) => {
       });
  };
}

export function deleteLesson(itemId) {
  return (dispatch) => {
    axios
      .patch(
        `${baseUrl.baseUrl}/courses/` +
        itemId +
        `?access_token=${localStorage.token}`,
        {
          status: false,
        }
      )
      .then((response) => {
         dispatch({ type: DELETE_LESSON, payload: response.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La suppression est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 3000);
      })
      .catch(function(error) {
         dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la suppression merci d'essayer à nouveau",
        });
      });
  };
}

export function editLesson(dataLesson) {
  return (dispatch) => {
    let apiEndpoint =
      `/courses/` + dataLesson.id + `?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, dataLesson).then((response) => {
      dispatch({ type: EDIT_LESSON, payload: response.data });
    });
  };
}
