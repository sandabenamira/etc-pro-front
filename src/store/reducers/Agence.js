import {
  ADD_AGENCE,
  GET_AGENCE,
  EDIT_AGENCE,
  SHOW_ERROR_ALERTE_AGENCE,
  HIDE_ERROR_ALERTE_AGENCE,
  SHOW_ALERTE_AGENCE,
  SET_AGENCE,
  EDIT_AGENCE_E,
} from "../../constants/ActionTypes";

const initialState = {
  agences: [],
  showMessage: false,
  alertMessageAgence: "",
  successAgence: "success",
  showAlerteNavAgence: false,
  agence: {},
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
    case SET_AGENCE: {
      return { ...state, agence: action.payload };
    }
    case EDIT_AGENCE_E: {
      return {
        ...state,
        agences: [
          action.payload,
          ...state.agences.filter((row) => row.id !== action.payload.id),
        ],
      };
    }
    default:
      return state;
  }
}
