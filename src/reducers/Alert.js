
import { SHOW_ERROR_MESSAGE, HIDE_ERROR_MESSAGE, HIDE_SUCCESS_MESSAGE, SHOW_SUCCESS_MESSAGE, SHOW_WARNING_MESSAGE,HIDE_WARNING_MESSAGE } from "../constants/ActionTypes";

const initialState = {
    error : false,
    success: false,
    errorSteper: false,
    successSteper: false,
    messageSteper:"",
    message : "",
    warning: false,
};

export default function (state = initialState, action) {
    if (action.type === SHOW_ERROR_MESSAGE) {
        return Object.assign({}, state, {
            message: action.payload,
            error: true
        })
    }
    if (action.type === HIDE_ERROR_MESSAGE) {
        return Object.assign({}, state, {
            error: false
        })
    }
    if (action.type === SHOW_SUCCESS_MESSAGE) {
        return Object.assign({}, state, {
            message: action.payload,
            success: true
        })
    }
    if (action.type === HIDE_SUCCESS_MESSAGE) {
        return Object.assign({}, state, {
            success: false
        });
    }
    if (action.type === "SHOW_SUCCESS_STEPER") {
        return Object.assign({}, state, {
            messageSteper: action.payload,
            successSteper: true
        });
    }
    if (action.type === "HIDE_SUCCESS_STEPER") {
        return Object.assign({}, state, {
            successSteper: false
        });
    }
    if (action.type === "SHOW_ERROR_STEPER") {
        return Object.assign({}, state, {
            messageSteper: action.payload,
            errorSteper: true
        })
    }
    if (action.type === "HIDE_ERROR_STEPER") {
        return Object.assign({}, state, {
            errorSteper: false
        })
    }
  if (action.type === SHOW_WARNING_MESSAGE) {
        return Object.assign({}, state, {
            message: action.payload,
            warning: true
        })
    }
    if (action.type === HIDE_WARNING_MESSAGE) {
        return Object.assign({}, state, {
            warning: false
        })
    }

    return state;

};
