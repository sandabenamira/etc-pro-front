import axios from 'axios';
import baseUrl from '../config/config';
import { classService } from '../_services/class.service';
import {
  ADD_ALLOCATION_SERVICE,
  FETECHED_ALL_ALLOCATION_SERVICE,
  EDIT_ALLOCATION_SERVICE,
  DELETE_ALLOCATION_SERVICE,
  HANDLE_REQUEST_CLOSE,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from '../constants/ActionTypes';

export const editAllocationService = (data, establishmentId, schoolYearId) => {
  return (dispatch) => {
    // let apiEndpoint = '/allocation_service_v2/' + data.id + `?access_token=${localStorage.token}`;

    // classService.patch(apiEndpoint, data).then((response) => {
    //   if (response) {
    //     dispatch(getAllocationServiceByEstablishment(establishmentId, schoolYearId));
    //   }
    // });
    let count = data.length;
    data.map((element) => {
      let apiEndpoint =
        '/allocation_service_v2/' + element.id + `?access_token=${localStorage.token}`;

      classService.patch(apiEndpoint, element).then((response) => {
        if (response) {
        }
      });

      count = count - 1;
    });
    if (count == 0) {
      dispatch(getAllocationServiceByEstablishment(establishmentId, schoolYearId));
      dispatch({
        type: SHOW_SUCCESS_MESSAGE,
        payload: "La modification est effectuée avec succès",
      });
      setTimeout(() => {
        dispatch({ type: HIDE_SUCCESS_MESSAGE });
      }, 4000);
    }
  };
};

export const addAllocationService = (item, establishmentId, schoolYearId) => {
  return (dispatch) => {
    let apiEndpoint = `/allocation_service_v2?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, item).then((response) => {
      if (response) {
        dispatch(getAllocationServiceByEstablishment(establishmentId, schoolYearId));

        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "L'affectaion est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de l'affectation merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};

export const getAllocationService = () => {
  return (dispatch) => {
    let apiEndpoint = `/allocation_service_v2?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const ClassVirtualList = list.filter((element) => element.status);
        dispatch({
          type: FETECHED_ALL_ALLOCATION_SERVICE,
          payload: ClassVirtualList,
        });
      })
      .catch((err) => {});
  };
};

export const getAllocationServiceByEstablishmentId = (establishmentId) => {
  return (dispatch) => {
    let apiEndpoint =
      `/allocation_service_v2?access_token=${localStorage.token}&filter[where][establishment_id]=` +
      establishmentId;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const ClassVirtualList = list.filter((element) => element.status);

        dispatch({
          type: FETECHED_ALL_ALLOCATION_SERVICE,
          payload: ClassVirtualList,
        });
      })
      .catch((err) => {});
  };
};
export const deleteFailed = (data, establishmentId) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: 'La Suppression est impossible , il y a des factures déja générées',
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_MESSAGE });
    }, 4000);
  };
};
export const studentExist = (student) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload:
        "L'éléve  ' " +
        student +
        " '  est déja affecté a des prestations ,Vous pouvez faire la modification ",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_MESSAGE });
    }, 4500);
  };
};
export const deleteAllocationService = (data, establishmentId, schoolYearId) => {
  return (dispatch) => {
    let apiEndpoint = '/allocation_service_v2/' + data.id + `?access_token=${localStorage.token}`;

    classService.patch(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch(getAllocationServiceByEstablishment(establishmentId, schoolYearId));
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'Suppression est effectuée avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: "Une erreur est survenue lors de la suppression merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};

export function getAllocationServiceByEstablishment(idEstablishment, idSchoolYear) {
  return (dispatch) => {
    let apiEndpoint = `/allocation_service_v2/fetchAllocationservicev2Data/${idEstablishment}/${idSchoolYear}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        dispatch({
          type: FETECHED_ALL_ALLOCATION_SERVICE,
          payload: response.data.Allocationservicev2Data,
        });
      }
    });
  };
}

export const serviceAction = {
  addAllocationService,
  getAllocationService,
  deleteAllocationService,
  editAllocationService,
  getAllocationServiceByEstablishmentId,
  deleteFailed,
  studentExist,
};
