/* eslint-disable import/no-anonymous-default-export */

import {
  GET_ENTREPRISE,
   EDIT_ENTREPRISE,
  DELETE_ENTREPRISE,
} from "../../constants/ActionTypes";

const initialState = {
  entreprises: [
    {
      "nameEntreprise": "ETC Tunisie",
      "serialNumberEntreprise": "00123456789",
      "addressEntreprise": "Avenue Beit Elhikma, Immeuble Ghada",
      "postalCodeEntreprise": "3131",
      "governorateEntreprise": "Kairouan",
      "countryEntreprise": "Tunisia",
      "telephoneNumberEntreprise": "98617885",
      "emailEntreprise": "Karine@etcinfo.fr",
    },
    {
      "nameEntreprise": "PROXYM",
      "serialNumberEntreprise": "00987654321",
      "addressEntreprise": "Novation City : Technopole de Sousse Sousse",
      "postalCodeEntreprise": "4051",
      "governorateEntreprise": "Sousse",
      "countryEntreprise": "Tunisia",
      "telephoneNumberEntreprise": "36015050",
      "emailEntreprise": "contact@proxym-group.com",
    }
  ],
  showMessage: false,
  alertMessagePartner: "",
  successPartner: "success",
  showAlerteNavPartner: false,
  PARTNER: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ENTREPRISE: {
      return Object.assign({}, state, {
        entreprises: action.payload.filter((e)=> e.status==='confirmé') ,
      });
    }
 
    case EDIT_ENTREPRISE: {
      return Object.assign({}, state, {
        inscriptions: [
          action.payload,
          ...state.entreprises.filter((e) => e.id !== action.payload.id),
        ],
      });
    }
    case DELETE_ENTREPRISE: {
      return Object.assign({}, state, {
        inscriptions: [
          action.payload,
          ...state.entreprises.filter(({ id }) => id !== action.payload.id),
        ],
      });
    }

    default:
      return state;
  }
}
