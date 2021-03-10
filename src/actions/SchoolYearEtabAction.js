import { classService } from '../_services/class.service';
import {
  FETECHED_ALL_SCHOOL_YEAR_ETAB,
  ADD_SCHOOL_YEAR_ETAB,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  GET_USER_PROFILE,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */



export const addSchoolYearEtab = (data) => {
  //1
  return (dispatch) => {
    let apiEndpoint = `/school_year_etablissements?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((res) => {
      if (res.data.some((arrayTest) => arrayTest.establishment_id == data.establishment_id && arrayTest.school_year_id == data.school_year_id)) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "L'anneé Scolaire existe déja pour cette établissement",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      } else {
        classService.post(apiEndpoint, data).then((response) => {
          if (response) {
            dispatch({ type: ADD_SCHOOL_YEAR_ETAB, payload: response.data });
            dispatch({
              type: SHOW_SUCCESS_MESSAGE,
              payload: 'La création est effectuée avec succès',
            });
            setTimeout(() => {
              dispatch({ type: HIDE_SUCCESS_MESSAGE });
            }, 4000);
          } else {
            dispatch({
              type: SHOW_ERROR_MESSAGE,
              payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
            });
            setTimeout(() => {
              dispatch({ type: HIDE_ERROR_MESSAGE });
            }, 4000);
          }
        });
      }
    });
  };
};
export const getSchoolYearEtabs = () => {
  return (dispatch) => {
    let apiEndpoint = `/school_years?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        dispatch({
          type: FETECHED_ALL_SCHOOL_YEAR_ETAB,
          payload: response.data,
        });
      })
      .catch((err) => {});
  };
};

export const updateShoolYear = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_PROFILE,
      payload: data,
    });
  };
};
