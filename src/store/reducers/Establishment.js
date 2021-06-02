import {
  ADD_ESTABLISHMENT,
  GET_ALL_ESTABLISHMENT,
  DELETE_ESTABLISHMENT,
  EDIT_ESTABLISHMENT,
  GET_ESTABLISHMENT_INFORMATIONS,
} from '../../constants/ActionTypes'; /* eslint eqeqeq: "off" */

const initialState = {
  remoteEstablishments: [],
  estabModule: [],
  establishementInformations: {},
};

export default function (state = initialState, action) {
  if (action.type === GET_ALL_ESTABLISHMENT) {
    return Object.assign({}, state, {
      remoteEstablishments: action.payload,
    });
  }

  if (action.type === ADD_ESTABLISHMENT) {
    return Object.assign({}, state, {
      remoteEstablishments: state.remoteEstablishments.concat(action.payload),
    });
  }

  if (action.type === DELETE_ESTABLISHMENT) {
    return Object.assign({}, state, {
      remoteEstablishments: [
        ...state.remoteEstablishments.filter(
          element => element.id !== action.payload.id,
        ),
      ],
    });
  }

  if (action.type === EDIT_ESTABLISHMENT) {
    return Object.assign({}, state, {
      remoteEstablishments: [
        ...state.remoteEstablishments.filter(
          element => element.id !== action.payload.id,
        ),
        action.payload,
      ],
    });
  }
  if (action.type === 'GET_ESTABLISHMENT_MODULE') {
    return Object.assign({}, state, {
      estabModule: action.payload,
    });
  }

  if (action.type === GET_ESTABLISHMENT_INFORMATIONS) {
    return Object.assign({}, state, {
      establishementInformations: action.payload,
    });
  }

  return state;
}
