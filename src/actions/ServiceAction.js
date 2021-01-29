import { classService } from '../_services/class.service';
import {
  FETECHED_ALL_SERVICES,
  ADD_SERVICE,
  EDIT_SERVICE,
  DELETE_SERVICE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  FETECHED_ALL_SERVICES_ARCHIVES,
  FETECHED_ALL_SERVICES_V2,
} from '../constants/ActionTypes';
import baseUrl from '../config/config';
import axios from 'axios';
import _ from 'lodash';

export const addService = (itemService) => {
  //1
  return (dispatch) => {
    let apiEndpoint = `/services?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, itemService).then((response) => {
      if (response) {
        dispatch({ type: ADD_SERVICE, payload: response.data });
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
  };
};

export function getServiceV2(idEstablishment, idSchoolYear) {
  return (dispatch) => {
    let apiEndpoint = `/service_v2?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=${idEstablishment}&filter[where][and][1][fk_id_school_year]=${idSchoolYear}&filter[include]=currencyV2&filter[include]=frequencyV2&filter[include]=schoolYear`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const list = response.data;
        console.log(list, 'list serviiiiiiice');
        const serviceList = list.filter(
          (element) => element.status_service && element.fk_id_school_year == idSchoolYear
        );
        const serviceListArchive = list.filter(
          (element) => element.status_service === false && element.fk_id_school_year == idSchoolYear
        );

        dispatch({ type: FETECHED_ALL_SERVICES_V2, payload: serviceList });
        dispatch({
          type: FETECHED_ALL_SERVICES_ARCHIVES,
          payload: serviceListArchive,
        });
      }
    });
  };
}
export function addServiceV2(itemService) {

  return (dispatch) => {
    let apiEndpoint = `/service_v2?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, itemService)
      .then((response) => {
        if (_.isEmpty(response.data)) {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la création merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        } else {
          dispatch(getServiceV2(itemService.fk_id_establishment, itemService.fk_id_school_year));
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: 'La création est effectuée avec succès',
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        }
      })
      .catch((error) => {});
  };
}

export const getServices = () => {
  return (dispatch) => {
    let apiEndpoint = `/services?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const serviceList = list.filter((element) => element.status);
        dispatch({ type: FETECHED_ALL_SERVICES, payload: serviceList });
      })
      .catch((err) => {});
  };
};

export const getServicesByEstablishmentId = (establishmentId) => {
  return (dispatch) => {
    let apiEndpoint =
      `/services?access_token=${localStorage.token}&filter[where][establishment_id]=` +
      establishmentId;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const serviceList = list.filter((element) => element.status);

        dispatch({ type: FETECHED_ALL_SERVICES, payload: serviceList });
      })
      .catch((err) => {});
  };
};

export function deleteServices(itemId) {
  return (dispatch) => {
    let apiEndpoint = `/services/` + itemId + `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const dataService = response.data;
        let serviceData = {
          name: dataService.name,
          details: dataService.details,
          start_date: dataService.start_date,
          end_date: dataService.end_date,
          price: dataService.price,
          price_ttc: dataService.price_ttc,
          tva: dataService.tva,
          currency: dataService.currency,
          payment_periodicity: dataService.payment_periodicity,
          note: dataService.note,
          status: false,
          id: dataService.id,
          establishment_id: dataService.establishment_id,
        };
        let apiEndpoint2 = `/services/` + dataService.id + `?access_token=${localStorage.token}`;
        classService
          .put(apiEndpoint2, serviceData)

          .then((response) => {
            dispatch({ type: DELETE_SERVICE, payload: response.data });
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };
}

export function editService(dataService) {
  return (dispatch) => {
    let serviceData = {
      name: dataService.name,
      details: dataService.details,
      start_date: dataService.start_date,
      end_date: dataService.end_date,
      price: dataService.price,
      price_ttc: dataService.price_ttc,
      tva: dataService.tva,
      currency: dataService.currency,
      payment_periodicity: dataService.payment_periodicity,
      note: dataService.note,
      status: true,
      id: dataService.id,
      establishment_id: dataService.establishment_id,
    };
    let apiEndpoint = `/services/` + dataService.id + `?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, serviceData).then((response) => {
      if (response) {
        dispatch({ type: EDIT_SERVICE, payload: response.data });
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
    });
  };
}

export function editServiceV2(itemService) {
  return (dispatch) => {
    let apiEndpoint = `/service_v2/` + itemService.id + `?access_token=${localStorage.token}`;
    classService
      .put(apiEndpoint, itemService)
      .then((response) => {
        if (_.isEmpty(response.data)) {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
          });
          setTimeout(() => {
            dispatch({ type: HIDE_ERROR_MESSAGE });
          }, 4000);
        } else {
          dispatch(getServiceV2(itemService.fk_id_establishment, itemService.fk_id_school_year));
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: 'La modification est effectuée avec succès',
          });
          setTimeout(() => {
            dispatch({ type: HIDE_SUCCESS_MESSAGE });
          }, 4000);
        }
      })
      .catch((error) => {});
  };
}

export function deleteServiceV2(itemId) {
  return (dispatch) => {
    axios
      .patch(`${baseUrl.baseUrl}/service_v2/` + itemId + `?access_token=${localStorage.token}`, {
        status_service: false,
      })
      .then((response) => {
        dispatch(getServiceV2(response.data.fk_id_establishment, response.data.fk_id_school_year));
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "L'archivage  est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch(function(error) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de l'archivage merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
}

export function publishServiceV2(itemId) {
  return (dispatch) => {
    axios
      .patch(`${baseUrl.baseUrl}/service_v2/` + itemId + `?access_token=${localStorage.token}`, {
        status_service: true,
      })
      .then((response) => {
        dispatch(getServiceV2(response.data.fk_id_establishment));
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'Prestation est publiée avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch(function(error) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de cette action merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
}

export const serviceAction = {
  addService,
  getServices,
  deleteServices,
  getServicesByEstablishmentId,
  deleteServiceV2,
  publishServiceV2,
};
