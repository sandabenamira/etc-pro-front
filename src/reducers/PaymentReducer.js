
import { EDIT_PAYMENT, GET_PAYMENTS, CLEAR_LIST_PAYMENTS } from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */


const initialState = {
    remotePayments: [],
    listPayments: [],
};

export default function (state = initialState, action) {

    if (action.type === EDIT_PAYMENT) {
        return Object.assign({}, state, {
            listPayments: [...state.listPayments.filter(element => element.linesPayments[0].id !== action.payload.linesPayments[0].id), action.payload]
        })
    }

    if (action.type === GET_PAYMENTS) {
        return Object.assign({}, state, {
            listPayments: action.payload
        })
    }
    if (action.type === CLEAR_LIST_PAYMENTS) {
        return Object.assign({}, state, {
            listPayments: []
        })
    }

    return state;

};
