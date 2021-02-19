import {
  ADD_AGENCE,
  GET_AGENCE,
  DELETE_AGENCE,
  ARCHIVED_GET_AGENCE,
  EDIT_AGENCE,
} from '../constants/ActionTypes';

const initialState = {
  agenceSettings: [
    {
      id:1,
      name: 'Agence tunis medina',
      fk_id_establishment: 6,
      status: true,
      typeAgence: 'Particuliers et Professionnels',
      gouvernoratAgence: 'Tunis',
      faxAgence: 713256478,
      telAgence: 712014785,
      emailAgence: 'biat78@biat.com.tn',
      adresseAgence: 'Imm hamrouni 32 rue el jazira . 1000',
    },
    {
      id:2,
      name: 'Agence Montplaisir',
      fk_id_establishment: 6,
      status: true,
      typeAgence: 'Particuliers et Professionnels',
      gouvernoratAgence: 'Tunis',
      faxAgence: 713256478,
      telAgence: 712014785,
      emailAgence: 'biat78@biat.com.tn',
      adresseAgence: 'Imm hamrouni 32 rue el jazira . 1000',
    },
    {
      id:3,
      name: 'Agence le Bardo',
      fk_id_establishment: 6,
      status: true,
      typeAgence: 'Particuliers et Professionnels',
      gouvernoratAgence: 'Tunis',
      faxAgence: 713256478,
      telAgence: 712014785,
      emailAgence: 'biat78@biat.com.tn',
      adresseAgence: 'Imm hamrouni 32 rue el jazira . 1000',
    },
    {
      id:3,
      name: 'Agence BIAT LAC 1',
      fk_id_establishment: 6,
      status: true,
      typeAgence: 'Particuliers et Professionnels',
      gouvernoratAgence: 'Tunis',
      faxAgence: 713256478,
      telAgence: 712014785,
      emailAgence: 'biat78@biat.com.tn',
      adresseAgence: 'Imm hamrouni 32 rue el jazira . 1000',
    },
  ],
  archivedAgenceSettings: [],
};

export default function(state = initialState, action) {
  if (action.type === GET_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: action.payload,
    });
  }
  if (action.type === ARCHIVED_GET_AGENCE) {
    return Object.assign({}, state, {
      archivedAgenceSettings: action.payload,
    });
  }

  if (action.type === ADD_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: state.agenceSettings.concat(action.payload),
    });
  }

  if (action.type === EDIT_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: [
        ...state.agenceSettings.filter((element) => element.id !== action.payload.id),
        action.payload,
      ],
    });
  }

  if (action.type === DELETE_AGENCE) {
    return Object.assign({}, state, {
      agenceSettings: [
        ...state.agenceSettings.filter((element) => element.id !== action.payload.id),
      ],
      archivedAgenceSettings: state.archivedAgenceSettings.concat(action.payload),
    });
  }

  return state;
}
