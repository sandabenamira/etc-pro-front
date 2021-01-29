import { classService } from "../_services/class.service";
import { GET_CLASSES_BY_ESTABLISHMENT_ID, SHOW_ERROR_MESSAGE, HIDE_ERROR_MESSAGE, HIDE_SUCCESS_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/ActionTypes";

export const getClasses = () => {
  return dispatch => {
    let apiEndpoint = `/classes?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        let listActive = response.data.filter(classe => classe.status);
        dispatch(receiveClasses(listActive));
      }).catch(error => {

      });
  };
};

export function getClassesByEstablishmentId (establishmentId ,schoolYearId )  {

  return dispatch => {
    if(schoolYearId != undefined && establishmentId != undefined){
    let apiEndpoint =
      `/classes?access_token=${localStorage.token}&filter[where][and][0][establishment_id]=` +
      establishmentId+`&filter[where][and][1][fk_id_school_year]=`+schoolYearId;
    classService
      .get(apiEndpoint)
      .then(response => {
        dispatch({ type: GET_CLASSES_BY_ESTABLISHMENT_ID, payload: response.data });
      })
      .catch(err => { });
    }
  };

};


const receiveClasses = classes => ({
  type: "FETECHED_ALL_CLASS",
  classes: classes
});

export function addClass(itemClass) {
  let classData = {
    name: itemClass.name,
    capacity: itemClass.capacity,
    students_number: itemClass.students_number,
    status: true,
    description: itemClass.description,
    start_date: itemClass.start_date,
    end_date: itemClass.end_date,
    professor_id: itemClass.professor_id,
    student_inscription_id: itemClass.student_inscription_id,
    establishment_id: itemClass.establishment_id,
    level_id: itemClass.level_id,
    section_id: itemClass.section_id,
    ar_name: itemClass.ar_name,
    fk_id_school_year: itemClass.fk_id_school_year
  };
  return dispatch => {
    let apiEndpoint = `/classes/create-class?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, classData)
      .then(response => {
        if (response) {
          let data = response.data.classe;
          dispatch({ type: "ADD_CLASS", payload: data });
          dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "La création est effectuée avec succès" })
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        } else {
          dispatch({ type: SHOW_ERROR_MESSAGE, payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau" });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }

      })

  };
}

export const archiverClass = item => {
  return dispatch => {
    let apiEndpoint =
      `/classes/` + item + `?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        const itemClass = response.data;
        let classData = {
          id: itemClass.id,
          name: itemClass.name,
          capacity: itemClass.capacity,
          students_number: itemClass.students_number,
          status: false,
          description: itemClass.description,
          start_date: itemClass.start_date,
          end_date: itemClass.end_date,
          establishment_id: itemClass.establishment_id,
          level_id: itemClass.level_id,
          section_id: itemClass.section_id,
          ar_name: itemClass.ar_name
        };
        let apiEndpoint2 = `/classes/archiver-class?access_token=${localStorage.token}`;
        classService.post(apiEndpoint2, classData)

          .then(response => {
            dispatch({ type: "REMOVE_CLASS", payload: response.data.classe });
          })
          .catch(error => {
          });
      })
      .catch(error => {
      });
  };
};

export const updateClass = itemClass => {
  let classData = {
    id: itemClass.id,
    name: itemClass.name,
    capacity: itemClass.capacity,
    students_number: itemClass.students_number,
    status: true,
    description: itemClass.description,
    start_date: itemClass.start_date,
    end_date: itemClass.end_date,
    professor_id: itemClass.professor_id,
    inscription_ids: itemClass.inscription_ids,
    establishment_id: itemClass.establishment_id,
    level_id: itemClass.level_id,
    section_id: itemClass.section_id,
    last_professor_id: itemClass.last_professor_id,
    ar_name: itemClass.ar_name,
    fk_id_school_year: itemClass.fk_id_school_year
  };
  return dispatch => {
    let apiEndpoint = `/classes/update-class?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, classData)
      .then(response => {

        if (response) {
          dispatch({ type: "UPDATE_CLASS", payload: response.data.classe });
          dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "La modification est effectuée avec succès" })
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        }
        else {
          dispatch({ type: SHOW_ERROR_MESSAGE, payload: "Une erreur est survenue lors de la modification merci d'essayer à nouveau" });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }

      })

  };
};
export const getClassesByUserId = userId => {
  return dispatch => {
    let apiEndpoint = `/classes_professors/getClassesByUserId/${userId}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(response => {
        dispatch({ type: 'GET_CLASSES_BY_USER_ID', payload: response.data.classes });
      })
      .catch(err => { });
  };
};


export const classAction = {
  getClasses,
  addClass,
  archiverClass,
  updateClass,
  getClassesByEstablishmentId
};
