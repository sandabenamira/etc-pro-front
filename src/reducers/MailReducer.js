import { ON_MAIL_SEND, HANDLE_REQUEST_CLOSE , MAIL_NOT_SEND_ALERT} from "../constants/ActionTypes";
const initialState = {
  mails: [],
};

export default function(state = initialState, action) {
  if (action.type === ON_MAIL_SEND) {
    return Object.assign({}, state, {
        mails: action.payload,
        alertMessage: "Courrier envoyé avec succès",
        showMessage: true
    });
  }
  if (action.type === HANDLE_REQUEST_CLOSE) {
  return Object.assign({}, state, {
      showMessage: false
  });
}
if (action.type === MAIL_NOT_SEND_ALERT) {
    return Object.assign({}, state, {
        alertMessage: "Une erreur est survenue lors de l'envoi du courrier",
        showMessage: true
    });
  }
  return state;
}
