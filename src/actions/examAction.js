import { classService } from "../_services/class.service";

export function getExam() {

    return dispatch => {
        let apiEndpoint = `/exams?access_token=${localStorage.token}`;
        classService
          .get(apiEndpoint)
          .then(response => {
            dispatch({ type: "DATA_LOADED_EXAM", payload: response.data });
          }).catch(error => {
          });
  
    };
};

export function addExam(exam) {
    let examData= {
        type: exam.type,
        period: exam.period,
        coefficient: exam.coefficient,
        subject_id: exam.subject_id,
        establishment_id: exam.establishment_id,
        class_id: exam.class_id,
        status: true
    }
    return dispatch => {
        let apiEndpoint = `/exams?access_token=${localStorage.token}`;
        classService.post(apiEndpoint,examData)
        .then(response => { 
            dispatch({ type: "ADD_EXAM", payload: response.data });
            alert('L\'ajout est effectué avec succès');
        }).catch(error => {
        });   
    }
}

export function deleteExam(idItem) {
    return dispatch => {
        let apiEndpoint =  `/exams/` + idItem + `?access_token=${localStorage.token}`;
        classService
        .get(apiEndpoint)
        .then(response => { 
            const exam = response.data;
            let examData ={
                type: exam.type,
                    period: exam.period,
                    coefficient: exam.coefficient,
                    subject_id: exam.subject_id,
                    establishment_id: exam.establishment_id,
                    class_id: exam.class_id,
                    status: false
            }
            let apiEndpoint2 = `/exams/` +  exam.id + `?access_token=${localStorage.token}`;
            classService.put(apiEndpoint2, examData)
              .then(response => {
                dispatch({ type: "DELETE_EXAM", payload: response.data });
              })
              .catch(error => {
              });

        }).catch(error => {
        });
    };
}

export function editExam(data) {
    let examData = {  type: data.type,
        period: data.period,
        coefficient: data.coefficient,
        subject_id: data.subject_id,
        status: true,
        id: data.id,
        establishment_id: data.establishment_id,
        class_id: data.class_id,}
    return dispatch => {
        let apiEndpoint = `/exams/` + data.id+`?access_token=${localStorage.token}`;
        classService.put(apiEndpoint, examData)
        .then(response => { 
            dispatch({ type: "EDIT_EXAM", payload: response.data });
        }).catch(error => {
        });
    };

}