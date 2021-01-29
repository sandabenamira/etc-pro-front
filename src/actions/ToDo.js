import {
  FETCH_ALL_TODO,
  FETCH_ALL_TODO_CONVERSATION,
  FETCH_ALL_TODO_CONVERSATION_SUCCESS,
  FETCH_ALL_TODO_SUCCESS,
  GET_IMPORTANT_TODO,
  GET_MARK_AS_START,
  GET_NAV_FILTERS,
  GET_NAV_LABELS,
  GET_STARRED_TODO,
  GET_UNIMPORTANT_TODO,
  GET_UNSELECTED_ALL_TODO,
  GET_UNSTARRED_TODO,
  HANDLE_REQUEST_CLOSE,
  ON_DELETE_TODO,
  ON_HIDE_LOADER,
  ON_LABEL_MENU_ITEM_SELECT,
  ON_LABEL_SELECT,
  ON_LABEL_UPDATE,
  ON_OPTION_MENU_SELECT,
  ON_SORTEND,
  ON_TODO_ADD,
  ON_TODO_CHECKED,
  ON_TODO_SELECT,
  ON_TODO_UPDATE,
  ON_TOGGLE_DRAWER,
  SEARCH_TODO,
  SELECT_ALL_TODO,
  SET_CURRENT_TODO_NULL,
  SHOW_MESSAGE,
  UPDATE_SEARCH,
  GET_LABELS_FOR_HOMRWORK,
  GET_NAV_LABELS_FOR_ADMIN,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  ADD_TODO_CONVERSATION,
  FETCH_SUBJECTS_PROFESSORS
} from '../constants/ActionTypes'
import _ from 'lodash';
import { roleIdProfessor } from '../config/config';
import { classService } from "../_services/class.service";
const colors = ['purple lighten-2', 'amber darken-1', 'green darken-3', 'light-blue darken-4', 'purple lighten-3', 'amber darken-2', 'green darken-1', 'light-blue darken-2']

export const fetchTodo = () => {
  return {
    type: FETCH_ALL_TODO
  };
};
export const fetchTodoConversation = () => {
  return {
    type: FETCH_ALL_TODO_CONVERSATION
  };
};

export const fetchTodosSuccess = (mails) => {
  return {
    type: FETCH_ALL_TODO_SUCCESS,
    payload: mails
  }
};
export const fetchTodosConversationSuccess = (mails) => {
  return {
    type: FETCH_ALL_TODO_CONVERSATION_SUCCESS,
    payload: mails
  }
};

export const showTodoMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
export const onSortEnd = (data) => {
  return {
    type: ON_SORTEND,
    payload: data
  };
};

export const onOptionMenuSelect = () => {
  return {
    type: ON_OPTION_MENU_SELECT,
  };
};
export const onLabelSelect = () => {
  return {
    type: ON_LABEL_SELECT,
  };
};

export const selectAllTodo = () => {
  return {
    type: SELECT_ALL_TODO,
  };
};

// export const getAllTodo = () => {
//   return {
//     type: GET_ALL_TODO,
//   };
// };


export const getUnselectedAllTodo = () => {
  return {
    type: GET_UNSELECTED_ALL_TODO,
  };
};

export const getStarredToDo = () => {
  return {
    type: GET_STARRED_TODO,
  };
};

export const getUnStarredTodo = () => {
  return {
    type: GET_UNSTARRED_TODO,
  };
};
export const getImportantToDo = () => {
  return {
    type: GET_IMPORTANT_TODO,
  };
};
export const getUnimportantToDo = () => {
  return {
    type: GET_UNIMPORTANT_TODO,
  };
};
export const onLabelMenuItemSelect = (label) => {
  return {
    type: ON_LABEL_MENU_ITEM_SELECT,
    payload: label
  };
};
export const onLabelUpdate = (data) => {
  return {
    type: ON_LABEL_UPDATE,
    payload: data
  };
};
export const onMarkAsStart = (data) => {
  return {
    type: GET_MARK_AS_START,
    payload: data
  };
};

export const onToDoUpdate = (data) => {
  return {
    type: ON_TODO_UPDATE,
    payload: data
  };
};

export const onDeleteToDo = (data) => {
  return {
    type: ON_DELETE_TODO,
    payload: data
  };
};
export const getNavFilters = (data) => {
  return {
    type: GET_NAV_FILTERS,
    payload: data
  };
};

export const getNavLabels = (dataLabel, id) => {
  return dispatch => {
    let apiEndpoint = `/homeworks/fetchHomeworkByProfileId/` + id + `?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        let dataFiltred = []
        response.data.homeworks.forEach(element => {
          _.forEach(element.homeworkClass, function (value, key) {
            if (value.class_id === dataLabel.class_id) {
              dataFiltred.push(element)
            }

          });
        });
        dispatch({ type: GET_NAV_LABELS, payload: dataFiltred });
      }).catch(error => {
      });
  }
};

export const getNavLabelsForAdmin = (dataLabel, data) => {
  return function (dispatch) {
    let dataFiltred = []
    data.forEach(element => {
      _.forEach(element.homeworkClass, function (value, key) {
        if (value.class_id === dataLabel.class_id) {
          dataFiltred.push(element)
        }
      });
    });
    dispatch({ type: GET_NAV_LABELS_FOR_ADMIN, payload: dataFiltred });
  }
}

export const onSearchTodo = (searchText) => {
  return {
    type: SEARCH_TODO,
    payload: searchText
  };
};
export const onTodoChecked = (data) => {
  return {
    type: ON_TODO_CHECKED,
    payload: data
  };
};
export const onTodoAdd = (data) => {
  return {
    type: ON_TODO_ADD,
    payload: data
  };
};
export const onTodoSelect = (todo) => {
  return {
    type: ON_TODO_SELECT,
    payload: todo
  };
};
export const setCurrentToDoNull = () => {
  return {
    type: SET_CURRENT_TODO_NULL,
  };
};

export const toDoToggleDrawer = () => {
  return {
    type: ON_TOGGLE_DRAWER,
  };
};

export const updateSearch = (searchTodo) => {
  return {
    type: UPDATE_SEARCH,
    payload: searchTodo
  };
};

export const hideToDoLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};
export const handleToDoMenuRequestClose = () => {
  return {
    type: HANDLE_REQUEST_CLOSE,
  };
};

export function addAndAssignHomework(homework, file) {
  if (file !== null) {
    const fileExtension = file.name.replace(/^.*\./, '');
    const fileName = 'Devoir_' + Math.random().toString(36).slice(2) + '_Matiere_' + homework.subject_id + '_Professor_' + homework.professor_id + '.' + fileExtension
    const myNewFile = new File([file], fileName, { type: file.type });
    const upload = {
      file: myNewFile,
      establishment_id: homework.establishment_id
    }
    let DataWithFile = {
      files: fileName,
      title: homework.title,
      description: homework.description,
      date_creation: homework.date_creation,
      status: true,
      professor_id: homework.professor_id,
      subject_id: homework.subject_id,
      files_name:homework.files_name,
      classId: homework.classId,
      correctionDate : homework.correctionDate

    }

    return dispatch => {
      let apiEndpoint = `/homeworks/addAndAssignHomework?access_token=${localStorage.token}`;
      classService.post(apiEndpoint, DataWithFile)
        .then(response => {
          if (response) {
            dispatch(uploadFile(upload));
            dispatch({ type: ON_TODO_ADD, payload: response.data.homework });
            dispatch({
              type: SHOW_SUCCESS_MESSAGE,
              payload: 'message.add.success',
            });
            setTimeout(() => {
              dispatch({ type: HIDE_SUCCESS_MESSAGE });
            }, 4000);
          } else {
            dispatch({
              type: SHOW_ERROR_MESSAGE,
              payload: "message.add.failed",
            });
            setTimeout(() => {
              dispatch({ type: HIDE_ERROR_MESSAGE });
            }, 4000);
          }
        })



    };
  }
  else {
    return dispatch => {

      let apiEndpoint = `/homeworks/addAndAssignHomework?access_token=${localStorage.token}`;
      classService.post(apiEndpoint, homework)
        .then(response => {
          if (response) {
            dispatch({ type: ON_TODO_ADD, payload: response.data.homework });
            dispatch({
              type: SHOW_SUCCESS_MESSAGE,
              payload: 'message.add.success',
            });
            setTimeout(() => {
              dispatch({ type: HIDE_SUCCESS_MESSAGE });
            }, 4000);
          } else {
            dispatch({
              type: SHOW_ERROR_MESSAGE,
              payload: "message.add.failed",
            });
            setTimeout(() => {
              dispatch({ type: HIDE_ERROR_MESSAGE });
            }, 4000);
          }

        })
    };
  }

};


export function uploadFile(payload) {
  console.log('rrrrrrrrrr')
  if (payload.file !== null) {
    return dispatch => {
      let apiEndpoint = `/establishments/` + payload.establishment_id + `?access_token=${localStorage.token}`;
      classService.get(apiEndpoint)
        .then(response => {
          let formadata = new FormData()
          formadata.append('image', payload.file)
          let apiEndpoint2 = `/containers/` +
          "classebook.data.storage" +
          `/upload?access_token=${localStorage.token}`;
          classService.post(apiEndpoint2, formadata)
            .then(response => {
            })
            .catch(error => {
            });
        }).catch(error => {
        });
    }
  }
  else {
    return function (dispatch) {
    }
  }
}
export function assignHomework(homework, profileId) {

  return dispatch => {
    let data = {
      correction_date: homework.correction_date,
      status: true,
      homework_id: homework.homework_id,
      class_id: homework.class_id
    }
    let apiEndpoint = `/homeworks_classes?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data)
      .then(response => {
        let apiEndpoint2 = `/homeworks/fetchHomeworkByProfileId/` + profileId + `?access_token=${localStorage.token}`;
        classService.get(apiEndpoint2)
          .then(response => {
            const tableTododos = response.data.homeworks.filter(item => item.status === true)
            dispatch({ type: FETCH_ALL_TODO_SUCCESS, payload: tableTododos });
          })
          .catch(error => {
          });
      }).catch(error => {
      });
  };
};

export const getAllTodo = (id, webService) => {
  return dispatch => {
    let apiEndpoint = `/students/${webService}/${id}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        if (response) {
          const homeworks = response.data.homeworks.filter(item => item.status === true && item.active === true)
          dispatch({ type: FETCH_ALL_TODO_SUCCESS, payload: homeworks });
        }
      })
  }
};

export const cleanState = () => {
  return dispatch => {
          dispatch({ type: 'CLEAN_TODO_STATE', payload: [] });
        }
};
export const getAllTodoForProfessor = (id) => {
  return dispatch => {
    let apiEndpoint = `/homeworks/fetchHomeworkByProfileId/` + id + `?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        const tableTododos = response.data.homeworks.filter(item => item.status === true)
        dispatch({ type: FETCH_ALL_TODO_SUCCESS, payload: tableTododos });
      }).catch(error => {
      });
  };
}

export function getAllTodoForAdmin (id, schoolYearId)  {
  return dispatch => {
    let apiEndpoint = `/homeworks/fetchHomeworkByEstablishmentId/${id}/${schoolYearId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        const tableTododos = response.data.homeworks.filter(item => item.status === true)
        dispatch({ type: FETCH_ALL_TODO_SUCCESS, payload: tableTododos });
      }).catch(error => {
      });
  };
}

export const getLabelsForHomework = (id) => {
  const roleId = parseInt(localStorage.roles_id);
  if (roleId === roleIdProfessor) {
    return dispatch => {
      let apiEndpoint = `/professors/?access_token=${localStorage.token}&filter={"where":{"profile_id":` + id + `}}`;
      classService.get(apiEndpoint)
        .then(response => {
          let apiEndpoint2 = `/classes_professors/?access_token=${localStorage.token}&filter[include][class]&filter[where][professor_id]=` + response.data[0].id;
          classService.get(apiEndpoint2)
            .then(res => {
              let labels = [];
              for (let i = 0; i < res.data.length; i++) {
                if (_.some(labels, ['class_id', res.data[i].class_id])) { } else {
                  let obj = {
                    "class_id": res.data[i].class_id,
                    "className": res.data[i].class.name,
                    "color": colors[i]
                  }
                  labels.push(obj)
                }
              }
              dispatch({ type: GET_LABELS_FOR_HOMRWORK, payload: labels });
            })
            .catch(error => {
            });
        }).catch(error => {
        });
    }
  } else {
    return dispatch => {
      let apiEndpoint = `/classes?access_token=${localStorage.token}&filter={"where":{"establishment_id":` + id + `}}`;
      classService.get(apiEndpoint)
        .then(res => {
          let labels = [];
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              "class_id": res.data[i].id,
              "className": res.data[i].name,
              "color": colors[i]
            }
            labels.push(obj)
          };
          dispatch({ type: GET_LABELS_FOR_HOMRWORK, payload: labels });
        }).catch(error => {
        });

    }
  }
};



export function deleteHomework(idItem) {
  return dispatch => {
    let apiEndpoint = `/homeworks/` + idItem + `?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        const datahomework = response.data;
        let homeworkData = {
          title: datahomework.title,
          description: datahomework.description,
          date_creation: datahomework.date_creation,
          status: false,
          files: datahomework.files,
          id: datahomework.id,
          professor_id: datahomework.professor_id,
          subject_id: datahomework.subject_id
        }
        let apiEndpoint2 = `/homeworks/` + datahomework.id + `?access_token=${localStorage.token}`;
        classService.put(apiEndpoint2, homeworkData)
          .then(response => {

            if (response) {
              dispatch({ type: ON_DELETE_TODO, payload: response.data });
              dispatch({
                type: SHOW_SUCCESS_MESSAGE,
                payload: 'message.delete.success',
              });
              setTimeout(() => {
                dispatch({ type: HIDE_SUCCESS_MESSAGE });
              }, 4000);
            } else {
              dispatch({
                type: SHOW_ERROR_MESSAGE,
                payload:
                  "message.delete.failed",
              });
              setTimeout(() => {
                dispatch({ type: HIDE_ERROR_MESSAGE });
              }, 4000);
            }
          })

      }).catch(error => {
      });
  };
}




export function editHomework(homework, file) {
  if (homework.newFile !== null) {
    if (file !== null) {
      return dispatch => {
        let apiEndpoint = `/establishments/` + homework.establishment_id + `?access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
          .then(response => {
            if (response) {
              const establishmentName = response.data.name
              let formadata = new FormData()
              formadata.append('image', file)
              let apiEndpoint2 = `/containers/checkFileExist/${establishmentName}?access_token=${localStorage.token}`;
              classService.get(apiEndpoint2)
                .then((response) => {
                  if (response) {
                    let fileList = null;
                    if (response.data.checkFile.length === 0) {
                      fileList = null
                    }
                    else {
                      fileList = response.data.checkFile.find(item => item.name === file)
                    }
                    const fileExtension = homework.newFile.name.replace(/^.*\./, '');
                    const fileName = 'Devoir_' + homework.id + '_Matiere_' + homework.subject_id + '_Professor_' + homework.professor_id + '.' + fileExtension
                    const myNewFile = new File([homework.newFile], fileName, { type: homework.newFile.type });
                    const upload = {
                      file: myNewFile,
                      establishment_id: homework.establishment_id
                    }
                    let data = {
                      "id": homework.id,
                      "title": homework.title,
                      "description": homework.description,
                      "date_creation": homework.date_creation,
                      "files": fileName,
                      "status": true,
                      "professor_id": homework.professor_id,
                      "subject_id": homework.subject_id,
                      "assignHomeworkList": homework.assignHomeworkList,
                      "files_name": homework.files_name,
                      "active":homework.active
                    }
                    if (fileList !== null && fileList !== undefined) {

                      const establishLogoUrl = `/containers/` + establishmentName + `/files/` + file + `?access_token=${localStorage.token}`
                      classService.deleteDetail(establishLogoUrl, formadata)
                        .then((response) => {
                          if (response) {
                            let apiEndpoint = `/homeworks/editHomework?access_token=${localStorage.token}`
                            classService.post(apiEndpoint, data)
                              .then(response => {
                                if (response) {
                                  dispatch(uploadFile(upload));
                                  dispatch({ type: ON_TODO_UPDATE, payload: response.data.homework });
                                }
                              })
                          }
                        })
                    }
                    else {
                      let apiEndpoint = `/homeworks/editHomework?access_token=${localStorage.token}`
                      classService.post(apiEndpoint, data)
                        .then(response => {
                          if (response) {
                            dispatch(uploadFile(upload));
                            dispatch({ type: ON_TODO_UPDATE, payload: response.data.homework });
                          }
                        })
                    }

                  }
                })

            }
          })
      }
    }

    else {
      const fileExtension = homework.newFile.name.replace(/^.*\./, '');
      const fileName = 'Devoir_' + homework.id + '_Matiere_' + homework.subject_id + '_Professor_' + homework.professor_id + '.' + fileExtension
      const myNewFile = new File([homework.newFile], fileName, { type: homework.newFile.type });
      const upload = {
        file: myNewFile,
        establishment_id: homework.establishment_id
      }
      let newdata = {
        "id": homework.id,
        "title": homework.title,
        "description": homework.description,
        "date_creation": homework.date_creation,
        "status": true,
        "files": fileName,
        "professor_id": homework.professor_id,
        "subject_id": homework.subject_id,
        "assignHomeworkList": homework.assignHomeworkList,
        "files_name": homework.files_name,
        "active":homework.active
      }
      return dispatch => {
        let apiEndpoint = `/homeworks/editHomework?access_token=${localStorage.token}`;
        classService.post(apiEndpoint, newdata)
          .then(response => {
            if (response) {
              dispatch(uploadFile(upload));
              dispatch({ type: ON_TODO_UPDATE, payload: response.data.homework });
            }
          })

      };
    }
  }

  else {
    return function (dispatch) {
      let apiEndpoint = `/homeworks/editHomework?access_token=${localStorage.token}`;
      classService.post(apiEndpoint, homework)
        .then(response => {
          if (response) {
            dispatch({ type: ON_TODO_UPDATE, payload: response.data.homework });
          }
        })

    };
  }
}

export function addComment(data, file, establishmentId) {
  let upload = {};
  if (file !== null) {
    const myNewFile = new File([file], data.file, { type: file.type });
    upload = {
      file: myNewFile,
      establishment_id: establishmentId
    }
  }
  return dispatch => {
    let apiEndpoint = `/homeworks_discussions/addComment/?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data)
      .then(response => {
        if (response) {
          if (file !== null) {
            dispatch(uploadFile(upload));
          }
          dispatch({ type: ADD_TODO_CONVERSATION, payload: response.data.comment });
        }
      })
  }

}

export function getConversation(homework_id, profile_professor_id, profile_student_id) {
  return dispatch => {
    let apiEndpoint = `/homeworks_discussions/getConversation/${homework_id}/${profile_professor_id}/${profile_student_id}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {        
        if (response) {
          if (!_.isEmpty(response.data)) {
            dispatch({ type: FETCH_ALL_TODO_CONVERSATION_SUCCESS, payload: response.data.comments });
          } else {
            dispatch({ type: FETCH_ALL_TODO_CONVERSATION_SUCCESS, payload: response.data });
          }
        }
      })
  }

}

export function initListConversation() {
  return dispatch => {
    dispatch({ type: FETCH_ALL_TODO_CONVERSATION_SUCCESS, payload: [] });
  }

}

export function getNumberOfHomeworkStudents(homeworkId) {
  return dispatch => {
   let apiEndpoint = `/homeworks_discussions/getNumberOfHomeworkStudents/${homeworkId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {
   // dispatch({ type: FETCH_ALL_TODO_CONVERSATION_SUCCESS, payload: [] });
  }
  })
  }

}

export function getAllDiscussionHomework(homeworkId, senderId) {
  return dispatch => {
   let apiEndpoint = `/homeworks_discussions/getAllDiscussionHomework/${homeworkId}/${senderId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {        
    dispatch({ type: FETCH_ALL_TODO_CONVERSATION_SUCCESS, payload: response.data.comments});
  }
  })
  }

}
export function fetchProfessorBySubject(establishmentId) {
  return dispatch => {
   let apiEndpoint = `/prof_subjects/fetchProfessorBySubject/${establishmentId}/?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {  
     dispatch({ type: FETCH_SUBJECTS_PROFESSORS, payload: response.data.professors});
  }
  })
  }

}

export function initHomework(data) {
  return dispatch => {
    dispatch({ type: ON_TODO_UPDATE, payload: data });
  }

}



