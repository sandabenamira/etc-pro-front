import {
  HANDLE_RECLAM_CLOSE,
  ON_COMPOSE_RECLAM,
  ON_RECLAM_SEND,
  SHOW_DETAIL_RECLAM,
  GET_RECLAM_RECUES,
  GET_RECLAM_ENVOYÉES,
  EDIT_RECLAM_STATUS,
  ON_CHANGE_STATUS_CLOSE,
  DELETE_RECLAM,
} from "../constants/ActionTypes";

const INIT_STATE = {
  showMessage: false,
  alertMessage: "",
  alertMessageAR: "",
  alertMessageEN: "",

  composeReclam: false,
  changeStatus: false,

  folderReclamRecues: [],
  folderReclamEnvoyées: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case HANDLE_RECLAM_CLOSE: {
      return {
        ...state,
        composeReclam: false,
        showMessage: false,
        alertMessage: "",
      };
    }

    case ON_RECLAM_SEND: {
      return {
        ...state,
        alertMessage: "Réclamation envoyée avec succès",
        alertMessageAR: "تم إرسال الشكوى بنجاح ",
        alertMessageEN: "Complaint Sent Successfully , Check Your Box",

        showMessage: true,
      };
    }

    case GET_RECLAM_RECUES: {
      return {
        ...state,
        folderReclamRecues: action.payload.data,
      };
    }

    case GET_RECLAM_ENVOYÉES: {
      return {
        ...state,
        folderReclamEnvoyées: action.payload.data,
      };
    }

    case ON_COMPOSE_RECLAM: {
      return { ...state, composeReclam: true };
    }

    case ON_CHANGE_STATUS_CLOSE: {
      if (state.alertMessageEN === "Complaint Status Modified Successfully") {
        return {
          ...state,
          changeStatus: false,
          showMessage: true,
        };
      } else {
        return {
          ...state,
          changeStatus: false,

          showMessage: false,
        };
      }
    }
    case SHOW_DETAIL_RECLAM: {
      return {
        ...state,
        showMessage: true,
      };
    }
    case "MAIL_NOT_FOUND": {
      return {
        ...state,
      };
    }

    case EDIT_RECLAM_STATUS: {
      return {
        ...state,
        alertMessageEN: "Complaint Status Modified Successfully",
        alertMessageAR: "  تم تعديل حالة الشكوى بنجاح ",
        alertMessage: "Statut de la réclamation est modifié avec succès",
        // showMessage: true,
      };
    }
    case DELETE_RECLAM: {
      return {
        ...state,
        alertMessageEN: "Complaint Deleted Successfully",
        alertMessageAR: "تم حذف الشكوى بنجاح",
        alertMessage: "Réclamation supprimée avec succès",
        showMessage: true,
      };
    }

    default:
      return state;
  }
};
