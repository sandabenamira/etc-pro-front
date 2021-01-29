import { classService } from '../_services/class.service';
import {
  GENERATE_BILLS,
  FETECHED_ALL_BILLS,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from '../constants/ActionTypes';
export const generateBillForEstablishment = (idEstablishment) => {
  return (dispatch) => {
    let apiEndpoint = `/allocation_service_v2/generateBillForEstablishment/${idEstablishment}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      dispatch({ type: GENERATE_BILLS, payload: response.data.invoices });
    });
  };
};



export const getInvoicesByEstablishmentId = (idEstablishment) => {
  return (dispatch) => {
    let apiEndpoint = `/bills/fetchInvoicesByEstablishmentId/${idEstablishment}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      dispatch({ type: FETECHED_ALL_BILLS, payload: response.data.Invoices });
    });
  };
};

export const invoiceNotificationWithMail = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/bills/invoiceNotificationWithMail?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'L\'envoie de mail est effectué avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de l\'envoie de mail, merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};

export const invoiceNotificationWithSMS = (data) => {
  return (dispatch) => {
    let apiEndpoint = `/bills/invoiceNotificationWithSMS?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'L\'envoie de SMS est effectué avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de SMS de mail, merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};


export const SendInvoice = (data) => {
  return (dispatch) => {
    console.log('Object to send ',data)
    let apiEndpoint = `/bills/sendInvoice?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
       
      } else {
      
      }
    });
  };
};
