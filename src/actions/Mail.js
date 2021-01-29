import {
  GET_ALL_MAIL,
  GET_IMPORTANT_MAIL,
  GET_NAV_FILTERS,
  GET_NAV_FOLDER,
  GET_NAV_LABELS,
  GET_READ_MAIL,
  GET_STARRED_MAIL,
  GET_UNIMPORTANT_MAIL,
  GET_UNREAD_MAIL,
  GET_UNSELECTED_ALL_MAIL,
  GET_UNSTARRED_MAIL,
  HANDLE_REQUEST_CLOSE,
  ON_ALL_MAIL_SELECT,
  ON_COMPOSE_MAIL,
  ON_DELETE_MAIL,
  ON_FOLDER_MENU_ITEM_SELECT,
  ON_FOLDER_SELECT,
  ON_HIDE_LOADER,
  ON_IMPORTANT_SELECT,
  ON_LABEL_MENU_ITEM_SELECT,
  ON_LABEL_SELECT,
  ON_MAIL_CHECKED,
  ON_MAIL_SELECT,
  ON_MAIL_SEND,
  ON_OPTION_MENU_ITEM_SELECT,
  ON_OPTION_MENU_SELECT,
  ON_START_SELECT,
  ON_TOGGLE_DRAWER,
  SEARCH_MAIL,
  SET_CURRENT_MAIL_NULL,
  UPDATE_SEARCH
} from '../constants/ActionTypes';
import _ from 'lodash';
import { classService } from '../_services/class.service';
import baseUrl from '../config/config';
import axios from 'axios';
import { FETCH_ALL_MAIL_SUCCESS, SHOW_MESSAGE } from '../constants/ActionTypes';

export const fetchMails = id => {
  return dispatch => {
    let apiEndpoint =
      `/mails/fetchemails/` +
      localStorage.profileId +
      `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then(response => {
        const mailReceived = response.data;
        dispatch(fetchMailsSuccess(mailReceived.emails));
      })
      .catch(error => {});
  };
};

export const fetchMailsSuccess = mails => {
  return {
    type: FETCH_ALL_MAIL_SUCCESS,
    payload: mails
  };
};
export const showMailMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const onFolderMenuItemSelect = folderId => {
  return {
    type: ON_FOLDER_MENU_ITEM_SELECT,
    payload: folderId
  };
};

export const onMailLabelMenuItemSelect = label => {
  return {
    type: ON_LABEL_MENU_ITEM_SELECT,
    payload: label
  };
};
export const handleMailRequestClose = () => {
  return {
    type: HANDLE_REQUEST_CLOSE
  };
};

export const getMailNavFilters = filter => {
  return {
    type: GET_NAV_FILTERS,
    payload: filter
  };
};
export const onFolderSelect = () => {
  return {
    type: ON_FOLDER_SELECT
  };
};
export const onMailLabelSelect = () => {
  return {
    type: ON_LABEL_SELECT
  };
};
export const onMailOptionMenuSelect = () => {
  return {
    type: ON_OPTION_MENU_SELECT
  };
};
export const onOptionMenuItemSelect = option => {
  return {
    type: ON_OPTION_MENU_ITEM_SELECT,
    payload: option
  };
};
export const getAllMail = () => {
  return {
    type: GET_ALL_MAIL
  };
};
export const getUnselectedAllMail = () => {
  return {
    type: GET_UNSELECTED_ALL_MAIL
  };
};
export const getReadMail = () => {
  return {
    type: GET_READ_MAIL
  };
};
export const getUnreadMail = () => {
  return {
    type: GET_UNREAD_MAIL
  };
};
export const getStarredMail = () => {
  return {
    type: GET_STARRED_MAIL
  };
};

export const getUnStarredMail = () => {
  return {
    type: GET_UNSTARRED_MAIL
  };
};
export const getImportantMail = () => {
  return {
    type: GET_IMPORTANT_MAIL
  };
};
export const getUnimportantMail = () => {
  return {
    type: GET_UNIMPORTANT_MAIL
  };
};
export const getMailNavLabels = label => {
  return {
    type: GET_NAV_LABELS,
    payload: label
  };
};
export const onSearchMail = searchText => {
  return {
    type: SEARCH_MAIL,
    payload: searchText
  };
};
export const onMailChecked = data => {
  return {
    type: ON_MAIL_CHECKED,
    payload: data
  };
};

export const onAllMailSelect = () => {
  return {
    type: ON_ALL_MAIL_SELECT
  };
};
export const onStartSelect = data => {
  return {
    type: ON_START_SELECT,
    payload: data
  };
};
export const onImportantSelect = data => {
  return {
    type: ON_IMPORTANT_SELECT,
    payload: data
  };
};
export const onMailSend = data => {
  if (data.file !== null) {
    return dispatch => {
      let dataMail = {
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        subject: data.subject,
        message: data.message,
        date_hour_mail: data.date_hour_mail,
        profile_id: data.sender_id
      };
      let apiEndpoint = `/mails/send-mail?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, dataMail)
        .then(response => {
          if (_.isEmpty(response.data)) {
            dispatch({
              type: 'MAIL_NOT_FOUND',
              payload: " mail n'existe pas "
            });
          } else {
            const fileExtension = data.file.name.replace(/^.*\./, '');
            const fileName =
              'Mail_' +
              response.data.mail.id +
              '_Sender_' +
              data.sender_id +
              '.' +
              fileExtension;
            const myNewFile = new File([data.file], fileName, {
              type: data.file.type
            });
            const upload = {
              file: myNewFile,
              establishment_id: data.establishmentId
            };
            axios
              .put(
                `${baseUrl.baseUrl}/mails/` +
                  response.data.mail.id +
                  `?access_token=${localStorage.token}`,
                {
                  sender_id: data.sender_id,
                  receiver_id: data.receiver_id,
                  subject: data.subject,
                  message: data.message,
                  date_hour_mail: data.date_hour_mail,
                  profile_id: data.sender_id,
                  files: fileName
                }
              )
              .then(response => {
                dispatch(uploadFile(upload));
                dispatch({ type: ON_MAIL_SEND, payload: response.data });
              });
          }
        })
        .catch(error => {});
    };
  } else {
    return dispatch => {
      let mailWithoutFile = {
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        subject: data.subject,
        message: data.message,
        date_hour_mail: data.date_hour_mail,
        profile_id: data.sender_id,
        files: null
      };
      let apiEndpoint = `/mails/send-mail?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, mailWithoutFile)
        .then(response => {
          if (_.isEmpty(response.data)) {
            dispatch({
              type: 'MAIL_NOT_FOUND',
              payload: " mail n'existe pas "
            });
          } else {
            dispatch({ type: ON_MAIL_SEND, payload: response.data });
          }
        })
        .catch(error => {});
    };
  }
};

export function uploadFile(payload) {
  if (payload.file !== null) {
    return dispatch => {
      let apiEndpoint =
        `/establishments/` +
        payload.establishment_id +
        `?access_token=${localStorage.token}`;
      classService
        .get(apiEndpoint)
        .then(response => {
          let formadata = new FormData();
          formadata.append('image', payload.file);
          const establishLogoUrl =
            `/containers/` +
            response.data.name +
            `/upload?access_token=${localStorage.token}`;
          classService
            .post(establishLogoUrl, formadata)
            .then(response => {})
            .catch(error => {});
        })
        .catch(error => {});
    };
  } else {
    return function(dispatch) {};
  }
}
export const onMailSelect = mail => {
  return {
    type: ON_MAIL_SELECT,
    payload: mail
  };
};
export const getNavFolders = folder => {
  switch (folder.id) {
    case 0:
      return dispatch => {
        let apiEndpoint =
          `/mails/fetchemails/` +
          localStorage.profileId +
          `?access_token=${localStorage.token}`;
        classService
          .get(apiEndpoint)
          .then(response => {
            const mailReceived = response.data;
            dispatch({
              type: GET_NAV_FOLDER,
              payload: {
                id: folder.id,
                data: mailReceived.emails
              }
            });
          })
          .catch(error => {});
      };
    case 1:
      return dispatch => {
        let apiEndpoint =
          `/mails/fetchSentEmails/` +
          localStorage.profileId +
          `?access_token=${localStorage.token}`;
        classService
          .get(apiEndpoint)
          .then(response => {
            const mailReceived = response.data;
            dispatch({
              type: GET_NAV_FOLDER,
              payload: {
                id: folder.id,
                data: mailReceived.emails
              }
            });
          })
          .catch(error => {});
      };
    default:
   }
};

export const updateMailSearch = searchText => {
  return {
    type: UPDATE_SEARCH,
    payload: searchText
  };
};
export const onMailToggleDrawer = () => {
  return {
    type: ON_TOGGLE_DRAWER
  };
};
export const onDeleteMail = () => {
  return {
    type: ON_DELETE_MAIL
  };
};
export const hideMailLoader = () => {
  return {
    type: ON_HIDE_LOADER
  };
};
export const setCurrentMailNull = () => {
  return {
    type: SET_CURRENT_MAIL_NULL
  };
};
export const onComposeMail = () => {
  return {
    type: ON_COMPOSE_MAIL
  };
};
