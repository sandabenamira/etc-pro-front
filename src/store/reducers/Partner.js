import {
  ADD_PARTNER,
  GET_PARTNER,
  EDIT_PARTNER,
  SHOW_ERROR_ALERTE_PARTNER,
  HIDE_ERROR_ALERTE_PARTNER,
  SHOW_ALERTE_PARTNER,
  SET_PARTNER,EDIT_PARTNER_E
} from "../../constants/ActionTypes";

const initialState = {
  PARTNERs: [
    {
      nom: "GO MY CODE",
      pays: "Tunisie",
      gouvernerat: "Tunis",
      adresse: "Place Taher Haddad 1 Tunis 1053",
      email: "hello@gomycode.com",
      Ntel: "39143900",
      isArchived: false,
      add: true,
    },
    {
      nom: "Formations et Perspectives",
      pays: "Tunisie",
      gouvernerat: "Tunis",
      adresse: "23 Rue d'Algerie Tunis 1000",
      email: "hello@formation.com",
      Ntel: "39143900",
      isArchived: false,
      add: false,
    },
    {
      nom: " UNESCO-UNEVOC",
      pays: "France",
      gouvernerat: "Paris",
      adresse: "22 Rue du Débarcadère, Paris, 75017, France",
      email: "unesco@formation.com",
      Ntel: "39143900",
      isArchived: true,
      add: false,
    },
  ],
  showMessage: false,
  alertMessagePartner: "",
  successPartner: "success",
  showAlerteNavPartner: false,
  PARTNER: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PARTNER: {
      return Object.assign({}, state, {
        PARTNERs: [{ ...action.payload, id: state.PARTNERs.length + 1 }].concat(
          state.PARTNERs
        ),
      });
    }

    case GET_PARTNER: {
      return Object.assign({}, state, {
        PARTNERs: action.payload,
      });
    }

    case SHOW_ALERTE_PARTNER: {
      return {
        ...state,
        showAlerteNavPartner: true,
        alertMessagePartner: action.payload,
        successPartner: "success",
      };
    }
    case SHOW_ERROR_ALERTE_PARTNER: {
      return {
        ...state,
        showAlerteNavPartner: true,
        alertMessagePartner: action.payload,
        successPartner: "warning",
      };
    }
    case HIDE_ERROR_ALERTE_PARTNER: {
      return {
        ...state,
        showAlerteNavPartner: false,
        alertMessagePartner: "",
      };
    }
    case SET_PARTNER: {
      return { ...state, PARTNER: action.payload };
    }
    case EDIT_PARTNER: {
      return {
        ...state,
        PARTNERs: [
          action.payload,
          ...state.PARTNERs.filter((row) => row.nom !== action.payload.nom),
        ],
      };
    }
    case EDIT_PARTNER_E: {
      return {
        ...state,
        PARTNERs:  state.PARTNERs.map((support) =>
          support.nom === action.payload.nom ? action.payload : support
        ),
        
      };
    }
    default:
      return state;
  }
}
