import { classService } from '../_services/class.service';

import baseUrl from '../config/config';
import axios from 'axios';
import { gradeService } from '../_services/grade.service';
import {
  GET_ALL_GRADES,
  ADD_GRADE,
  UPDATE_GRADE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
} from '../constants/ActionTypes';

export const getGrades = () => {
  return (dispatch) => {
    let apiEndpoint = `/notes?access_token=${localStorage.token}`;
    gradeService
      .get(apiEndpoint)
      .then((response) => {
        dispatch({ type: GET_ALL_GRADES, payload: response.data });
      })
      .catch((err) => {});
  };
};

export const addGrade = (gradeList) => {
  return (dispatch) => {
    axios
      .post(
        `${baseUrl.baseUrl}/notes/addGrades?access_token=${localStorage.token}`,
        gradeList
      )
      .then((response) => {
        if (response) {
          dispatch({ type: ADD_GRADE, payload: response.data });
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: 'Les Notes sont enregistrées avec succès',
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        } else {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload:
              "Une erreur est survenue lors de l'enregistrement  merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }
      });
  };
};

export const updateGrade = (gradeItem) => {
  return (dispatch) => {
    let apiEndpoint =
      `/notes/` + gradeItem.id + `?access_token=${localStorage.token}`;

    gradeService
      .put(apiEndpoint, gradeItem)
      .then((response) => {
        //dispatch({ type: UPDATE_GRADE, payload: response.data });
      })
      .catch((error) => {
        throw error;
      });
  };
};
export const updateAlerte = (gradeItem) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: 'Les Notes sont modifiées avec succès',
    });
    setTimeout(() => {
      dispatch({ type: HIDE_SUCCESS_MESSAGE });
    }, 4000);
  };
};
export const resetAlerte = (gradeItem) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: 'Les Notes sont supprimées avec succès',
    });
    setTimeout(() => {
      dispatch({ type: HIDE_SUCCESS_MESSAGE });
    }, 4000);
  };
};

export const gradeAction = {
  getGrades,
  addGrade,
  updateGrade,
};
