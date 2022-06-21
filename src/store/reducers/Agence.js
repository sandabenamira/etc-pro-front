import {
  ADD_AGENCE,
  GET_AGENCE,
  EDIT_AGENCE,
  SHOW_MESSAGE_AGENCE,
  SHOW_ERROR_MESSAGE_AGENCE,
  HIDE_MESSAGE_AGENCE,
  SHOW_ERROR_ALERTE_AGENCE,
  HIDE_ERROR_ALERTE_AGENCE,
  SHOW_ALERTE_AGENCE,
} from "../../constants/ActionTypes";

const initialState = {
  agences: [],
  showMessage: false,
  alertMessageAgence: "",
  successAgence: "success",
  showAlerteNavAgence: false,
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
    case HIDE_MESSAGE_AGENCE: {
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
    case SHOW_ALERTE_AGENCE: {
      return {
        ...state,
        showAlerteNavAgence: true,
        alertMessageAgence: action.payload,
        successAgence: "success",
      };
    }
    case SHOW_ERROR_ALERTE_AGENCE: {
      return {
        ...state,
        showAlerteNavAgence: true,
        alertMessageAgence: action.payload,
        successAgence: "warning",
      };
    }
    case HIDE_ERROR_ALERTE_AGENCE: {
      return {
        ...state,
        showAlerteNavAgence: false,
        alertMessageAgence: "",
      };
    }
    default:
      return state;
  }
}
