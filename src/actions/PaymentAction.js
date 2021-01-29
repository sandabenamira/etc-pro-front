
import { EDIT_PAYMENT, GET_PAYMENTS, CLEAR_LIST_PAYMENTS, PAY_BILL } from "../constants/ActionTypes";
import { classService } from "../_services/class.service";

export function editPayments(dataPayment, dataLinePayment) {

    return dispatch => {
        let apiEndpoint = `/payments/payService?access_token=${localStorage.token}`;
        classService
            .post(apiEndpoint, dataPayment)
            .then(response => {

                let obj = {
                    "name": dataLinePayment.name,
                    "surname": dataLinePayment.surname,
                    "service": {
                        "name": dataLinePayment.service.name,
                        "price": response.data.payment.price,
                        "currency": dataLinePayment.service.currency,
                        "payment_periodicity": dataLinePayment.service.payment_periodicity
                    },
                    "linesPayments": [response.data.payment]
                }
                dispatch({ type: EDIT_PAYMENT, payload: obj });
            })
            .catch(error => {
            });
    };
}
export function editBill(data,idPaymentV2, dataInvoice) {
    return dispatch => {
        let apiEndpoint = '';
        apiEndpoint = `/payments_v2/${idPaymentV2}?access_token=${localStorage.token}`;
        classService
            .patch(apiEndpoint, data).then(response => {
                if (response) {
                    const price_invoice = parseFloat(response.data.price_invoice)
                    const price_paid = parseFloat(response.data.price_paid)
                    if (price_invoice === price_paid) {
                        const invoicePaid = 2;
                        apiEndpoint = `/bills/${response.data.fk_id_bill}?access_token=${localStorage.token}`;
                        classService.patch(apiEndpoint, {
                            status: invoicePaid
                        })
                            .then(response => {
                                let obj={
                                    "bill":response.data,
                                    "student": dataInvoice.student,
                                    "service_v2":dataInvoice.service_v2
                                }
                                dispatch({ type: PAY_BILL, payload: obj });
                            })

                    } else if (price_invoice > price_paid) {
                        const partialPayment = 1;
                        apiEndpoint = `/bills/${response.data.fk_id_bill}?access_token=${localStorage.token}`;
                        classService.patch(apiEndpoint, {
                            status: partialPayment
                        })
                            .then(response => {
                                let obj={
                                    "bill":response.data,
                                    "student": dataInvoice.student,
                                    "service_v2":dataInvoice.service_v2
                                }
                                dispatch({ type: PAY_BILL, payload: obj });
                            })
                    }
                }
                

            })
    }
}

export function payBill(data, dataInvoice) {

    return dispatch => {
        let apiEndpoint = '';
        apiEndpoint = `/payments_v2?access_token=${localStorage.token}`;
        classService
            .post(apiEndpoint, data)
            .then(response => {
                if (response) {
                    const price_invoice = parseFloat(response.data.price_invoice)
                    const price_paid = parseFloat(response.data.price_paid)
                    if (price_invoice === price_paid) {
                        const invoicePaid = 2;
                        apiEndpoint = `/bills/${response.data.fk_id_bill}?access_token=${localStorage.token}`;
                        classService.patch(apiEndpoint, {
                            status: invoicePaid
                        })
                            .then(response => {
                                let obj={
                                    "bill":response.data,
                                    "student": dataInvoice.student,
                                    "service_v2":dataInvoice.service_v2
                                }
                                dispatch({ type: PAY_BILL, payload: obj });
                            })

                    } else if (price_invoice > price_paid) {
                        const partialPayment = 1;
                        apiEndpoint = `/bills/${response.data.fk_id_bill}?access_token=${localStorage.token}`;
                        classService.patch(apiEndpoint, {
                            status: partialPayment
                        })
                            .then(response => {
                                let obj={
                                    "bill":response.data,
                                    "student": dataInvoice.student,
                                    "service_v2":dataInvoice.service_v2
                                }
                                dispatch({ type: PAY_BILL, payload: obj });
                            })
                    }
                }
            })

    };
}


export function getPaymentsForParent(profileId) {
    return dispatch => {
        let apiEndpoint = `/lines_payments/getPaymentsForParent/${profileId}?access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
            .then(response => {
                dispatch({ type: GET_PAYMENTS, payload: response.data.payments });
            }).catch(error => {
            });
    };
};

export function getPaymentsForStudent(profileId) {
    return dispatch => {
        let apiEndpoint = `/lines_payments/getPaymentsForStudent/${profileId}?access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
            .then(response => {
                dispatch({ type: GET_PAYMENTS, payload: response.data.payments });
            }).catch(error => {
            });
    };
};

export function getPayments(classId, status, month) {
    return dispatch => {
        let apiEndpoint = `/lines_payments/getLinesPayments?classId=${classId}&status=${status}&month=${month}&access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
            .then(response => {
                dispatch({ type: GET_PAYMENTS, payload: response.data.payments });
            }).catch(error => {
            });
    };
};

export function clearListPayments() {
    return dispatch => {
        dispatch({ type: CLEAR_LIST_PAYMENTS });
    };
};