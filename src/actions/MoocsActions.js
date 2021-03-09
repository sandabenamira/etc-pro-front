import { classService } from "../_services/class.service";
import {
  ADD_MOOCS,
  GET_MOOCS,
  EDIT_MOOCS,
  DELETE_MOOCS,
  ARCHIVED_GET_MOOCS,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../constants/ActionTypes";
import baseUrl from "../config/config";
import axios from "axios";

export const addMoocs = (itemMoocs) => {
  return (dispatch) => {
    let moocsFile = itemMoocs.moocsFile;
    var object = {};
    object.file = moocsFile;
    object.fileName = moocsFile.name;
    const myNewFile = new File([object.file], moocsFile.name, {
      type: object.file.type,
    });
    let formadata = new FormData();
    formadata.append("video", myNewFile);
    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });
    let apiEndpoint = `/moocs/upload-moocs?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, formadata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response) {
          let dataMoocs = {
            moocsTopic: itemMoocs.topicMoocs,
            assignementId: itemMoocs.idAssignement,
            prerequiste: itemMoocs.prerequisite,
            educationalGoals: itemMoocs.educationalGoals,
            moocsSession: itemMoocs.SessionMoocs,
            moocsDuration: 30,
            status: true,
            moocsUrl: response.data.moocsURL,
            posterProfileId: itemMoocs.posteur,
          };
          let apiEndpoint = `/moocs/create-moocs?access_token=${localStorage.token}`;
          classService.post(apiEndpoint, dataMoocs).then((response) => {
            if (response) {
              let newObject = {
                dateOfCreation: response.data.moocsData.creation_date,
                educationalGoals: response.data.moocsData.educational_goals,
                id: response.data.moocsData.id,
                moocsAssignCourse: itemMoocs.assignmentRefresh,
                moocsDuration: response.data.moocsData.moocs_duration,
                moocsSession: response.data.moocsData.moocs_session,
                moocsStatus: response.data.moocsData.status,
                moocsTopic: response.data.moocsData.moocs_topic,
                moocsUrl: response.data.moocsData.moocs_url,
                poster: itemMoocs.userReresh,
                prerequiste: response.data.moocsData.prerequiste,
              };

              dispatch({ type: ADD_MOOCS, payload: newObject });
              dispatch({
                type: HIDE_LOADER,
                payload: false,
              });
              dispatch({
                type: SHOW_SUCCESS_MESSAGE,
                payload: "La création est effectuée avec succès",
              });
              setTimeout(() => {
                dispatch({ type: HIDE_SUCCESS_MESSAGE });
              }, 4000);
            } else {
              dispatch({
                type: HIDE_LOADER,
                payload: false,
              });
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
        } else {
          dispatch({
            type: HIDE_LOADER,
            payload: false,
          });
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

export function getMoocs(establishmentId, schoolYearId, roleId, roleUserId) {
  return (dispatch) => {
    let apiEndpoint = `/moocs/fetchMoocsByRole/${establishmentId}/${schoolYearId}/${roleId}/${roleUserId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        let moocsList = response.data.moocsData;
        let ArchivedMoocsList = [];
        let moocsListUnarchived = [];

        moocsList.map((elementItem) => {
          if (elementItem.moocsStatus === false) {
            ArchivedMoocsList.push(elementItem);
          } else {
            moocsListUnarchived.push(elementItem);
          }
        });

        dispatch({
          type: GET_MOOCS,
          payload: moocsListUnarchived,
        });
        dispatch({
          type: ARCHIVED_GET_MOOCS,
          payload: ArchivedMoocsList,
        });
      }
    });
  };
}
export function deleteMoocs(item) {
  return (dispatch) => {
    axios
      .patch(
        `${baseUrl.baseUrl}/moocs/` +
          item.id +
          `?access_token=${localStorage.token}`,
        {
          status: false,
        }
      )
      .then((response) => {
        if (response) {
          dispatch({ type: DELETE_MOOCS, payload: response.data.id });

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
            payload:
              "Une erreur est survenue lors de la création merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }
      })
      .catch(function(error) {});
  };
}

export function editMoocs(itemMoocs) {
  return (dispatch) => {
    if (itemMoocs.moocsFile===null) {
      let dataMoocs = {
        id: itemMoocs.id,
        moocs_topic: itemMoocs.topicMoocs,
        assignementId: itemMoocs.idAssignement,
        prerequiste: itemMoocs.prerequiste,
        educational_goals: itemMoocs.educationalGoals,
        moocs_session: itemMoocs.SessionMoocs,
        moocs_duration: 30,
        creation_date: new Date(),
        status: true,
        moocs_url: itemMoocs.moocsUrl,
      };
      axios
        .put(
          `${baseUrl.baseUrl}/moocs/edit-moocs?access_token=${localStorage.token}`,
          dataMoocs
        )
        .then((response) => {
          if (response) {
            let newObject = {
              dateOfCreation: response.data.MoocsUpDate.moocs.creation_date,
              educationalGoals:
                response.data.MoocsUpDate.moocs.educational_goals,
              id: response.data.MoocsUpDate.moocs.id,
              moocsAssignCourse: itemMoocs.assignmentRefresh,
              moocsDuration: response.data.MoocsUpDate.moocs.moocs_duration,
              moocsSession: response.data.MoocsUpDate.moocs.moocs_session,
              moocsStatus: response.data.MoocsUpDate.moocs.status,
              moocsTopic: response.data.MoocsUpDate.moocs.moocs_topic,
              moocsUrl: response.data.MoocsUpDate.moocs.moocs_url,
              poster: itemMoocs.userReresh,
              prerequiste: response.data.MoocsUpDate.moocs.prerequiste,
            };

            dispatch({
              type: EDIT_MOOCS,
              payload: newObject,
            });

            // dispatch(
            //   getMoocs(establishmentId, schoolYearId, roleId, roleUserId)
            // );
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
                "Une erreur est survenue lors de la création merci d'essayer à nouveau",
            });
            setTimeout(() => {
              dispatch({ type: HIDE_ERROR_MESSAGE });
            }, 4000);
          }
        });
    } else {
      let moocsFile = itemMoocs.moocsFile;
      var object = {};
      object.file = moocsFile;
      object.fileName = moocsFile.name;
      const myNewFile = new File([object.file], moocsFile.name, {
        type: object.file.type,
      });
      let formadata = new FormData();
      formadata.append("video", myNewFile);
      dispatch({
        type: SHOW_LOADER,
        payload: true,
      });
      let apiEndpoint = `/moocs/upload-moocs?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, formadata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            let dataMoocs = {
              id: itemMoocs.id,
              moocs_topic: itemMoocs.topicMoocs,
              assignementId: itemMoocs.idAssignement,
              prerequiste: itemMoocs.prerequiste,
              educational_goals: itemMoocs.educationalGoals,
              moocs_session: itemMoocs.SessionMoocs,
              moocs_duration: 30,
              creation_date: new Date(),
              status: true,
              moocs_url: response.data.moocsURL,
            };
            axios
              .put(
                `${baseUrl.baseUrl}/moocs/edit-moocs?access_token=${localStorage.token}`,
                dataMoocs
              )
              .then((response) => {
                if (response) {
                  let newObject = {
                    dateOfCreation:
                      response.data.MoocsUpDate.moocs.creation_date,
                    educationalGoals:
                      response.data.MoocsUpDate.moocs.educational_goals,
                    id: response.data.MoocsUpDate.moocs.id,
                    moocsAssignCourse: itemMoocs.assignmentRefresh,
                    moocsDuration:
                      response.data.MoocsUpDate.moocs.moocs_duration,
                    moocsSession: response.data.MoocsUpDate.moocs.moocs_session,
                    moocsStatus: response.data.MoocsUpDate.moocs.status,
                    moocsTopic: response.data.MoocsUpDate.moocs.moocs_topic,
                    moocsUrl: response.data.MoocsUpDate.moocs.moocs_url,
                    poster: itemMoocs.userReresh,
                    prerequiste: response.data.MoocsUpDate.moocs.prerequiste,
                  };
                  dispatch({
                    type: EDIT_MOOCS,
                    payload: newObject,
                  });
                  dispatch({
                    type: HIDE_LOADER,
                    payload: false,
                  });
                  dispatch({
                    type: SHOW_SUCCESS_MESSAGE,
                    payload: "La modification est effectuée avec succès",
                  });
                  setTimeout(() => {
                    dispatch({ type: HIDE_SUCCESS_MESSAGE });
                  }, 4000);
                } else {
                  dispatch({
                    type: HIDE_LOADER,
                    payload: false,
                  });
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
          } else {
            dispatch({
              type: HIDE_LOADER,
              payload: false,
            });
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
    }
  };
}

export const serviceAction = {
  addMoocs,
  getMoocs,
  deleteMoocs,
  editMoocs,
};
