import {
  ADD_AGENCE,
  GET_AGENCE,
  EDIT_AGENCE,
  SHOW_MESSAGE_AGENCE,
  HIDE_SUCCESS_MESSAGE_AGENCE,
  SHOW_ERROR_MESSAGE_AGENCE,
} from "../../constants/ActionTypes";

const initialState = {
  agences: [],
  showMessage: "",
  alertMessage: "",
  success: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_AGENCE: {
      return Object.assign({}, state, {
        agences: [{ ...action.payload, id: state.agences.length + 1 }].concat(
          state.agences
        ),
      });
    }
    case SHOW_MESSAGE_AGENCE: {
      return {
        ...state,
        showMessage: true,
        alertMessage: "Le formulaire est envoyé avec succès! ",
        success: "success",
      };
    }
    case HIDE_SUCCESS_MESSAGE_AGENCE: {
      return {
        ...state,
        showMessage: false,
        alertMessage: "",
      };
    }

    case SHOW_ERROR_MESSAGE_AGENCE: {
      return {
        ...state,
        showMessage: true,
        alertMessage: action.payload,
        success: "warning",
      };
    }
    case GET_AGENCE: {
      return Object.assign({}, state, {
        agences: action.payload,
      });
    }
    case EDIT_AGENCE: {
      return Object.assign({}, state, {
        agences: [
          action.payload,
          ...state.agences.filter((e) => e.id !== action.payload.id),
        ],
      });
    }

    default:
      return state;
  }
}
