import { classService } from '../_services/class.service';
import {
  ADD_SCHOOL_LICENCE,
  SHOW_SUCCESS_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  GET_SCHOOL_LICENCE,
  EDIT_SCHOOL_LICENCE,
  DELETE_SCHOOL_LICENCE,
  ARCHIVED_GET_SCHOOL_LICENCE,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */
import axios from 'axios';
import baseUrl from '../config/config';

export function addSchoolLicence(data, establishment, modules) {
  return (dispatch, getState) => {
    const state = getState();
    const allModules = state.module.remoteModules;
    let apiEndpoint = `/licences?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        var modulesList = modules.map(function (num) {
          let moduleName = allModules.find((element) => element.id === num);
          var object = {
            status: true,
            fk_id_module: num,
            fk_id_licence: response.data.id,
            module: moduleName,
          };
          return object;
        });
        let newData = {
          ...response.data,
          licenceModule: modulesList,
        };
        dispatch({ type: ADD_SCHOOL_LICENCE, payload: newData });
        dispatch(EstablishmentModules(modulesList));
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
  };
}

export function EstablishmentModules(modules) {
  return (dispatch) => {
    axios
      .post(`${baseUrl.baseUrl}/licence_modules?access_token=${localStorage.token}`, modules)
      .then((response) => {
        //  dispatch({ type: GET_SCHOOL_LICENCE, payload: schoolLicenceList });

        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'La création est effectuée avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch((error) => {
        dispatch({ type: SHOW_ERROR_MESSAGE });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
}
export function editSchoolLicence(data) {
  return (dispatch, getState) => {
    const state = getState();
    const allModules = state.module.remoteModules;
    axios
      .put(`${baseUrl.baseUrl}/licences/edit-licence?access_token=${localStorage.token}`, data)
      .then((response) => {
        if (response) {
          var modulesList = response.data.licenceUpDate.licenceModules.map(function (num) {
            let moduleName = allModules.find((element) => element.id === num);
            var object = {
              status: true,
              fk_id_module: num,
              fk_id_licence: response.data.id,
              module: moduleName,
            };
            return object;
          });
          let newData = {
            situation: data.situation,
            id: data.id,
            fk_id_establishment: data.fk_id_establishment,
            fk_id_school_year: data.fk_id_school_year,
            number_students: data.number_students,
            mode_payment: data.mode_payment,
            number_sms: data.number_sms,
            modules: response.data.licenceUpDate.licenceModules,
            licenceModule: modulesList,
          };

          dispatch({ type: EDIT_SCHOOL_LICENCE, payload: newData });
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: 'La modification est effectuée avec succès',
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        } else {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        }
      })
      .catch(function (error) {
        console.log('editSchoolLicence error', error);
      });
  };
}

export function getSchoolLicence(schoolYearId) {
  return (dispatch) => {
    let apiEndpoint = `/licences?access_token=${localStorage.token}&filter[include][licenceModule][module]`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const schoolLicenceList = response.data;
        const archivedSchoolLicenceList = schoolLicenceList.filter((element) => element.status === false);
        dispatch({ type: GET_SCHOOL_LICENCE, payload: schoolLicenceList });
        dispatch({
          type: ARCHIVED_GET_SCHOOL_LICENCE,
          payload: archivedSchoolLicenceList,
        });
      }
    });
  };
}

export function deleteSchoolLicence(itemId) {
  return (dispatch) => {
    let apiEndpoint = `/licences/` + itemId.id + `?access_token=${localStorage.token} `;
    classService
      .patch(apiEndpoint, {
        status: false,
      })
      .then((response) => {
        if (response) {
          dispatch({ type: DELETE_SCHOOL_LICENCE, payload: response.data });
          // dispatch({
          //   type: SHOW_SUCCESS_MESSAGE,
          //   payload: "L'archivage est effectuée avec succès",
          // });
          // setTimeout(() => {
          //   dispatch({ type: HIDE_SUCCESS_MESSAGE });
          // }, 4000);
        }
        // else {
        //   dispatch({
        //     type: SHOW_ERROR_MESSAGE,
        //     payload:
        //       "Une erreur est survenue lors de l'archivage merci d'essayer à nouveau",
        //   });
        //   setTimeout(() => {
        //     dispatch({ type: HIDE_ERROR_MESSAGE });
        //   }, 4000);
        // }
      })
      .catch(function (error) {});
  };
}
