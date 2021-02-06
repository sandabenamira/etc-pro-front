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
import _ from "lodash";
import { classService } from "../_services/class.service";
import baseUrl from "../config/config";
import axios from "axios";

export const showReclamMessage = (message) => {
  return {
    type: SHOW_DETAIL_RECLAM,
    payload: message,
  };
};

export const handleReclamRequestClose = () => {
  return {
    type: HANDLE_RECLAM_CLOSE,
  };
};
export function uploadComplaintMedia(ObjetFile, ObjetComplaint) {

  const fileName = ObjetFile.fileName;
  const myNewFile = new File([ObjetFile.file], fileName, { type: ObjetFile.file.type });
  let formadata = new FormData();
  formadata.append("image", myNewFile);
  return function (dispatch) {
    const establishLogoUrl =
      `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
    axios({
      url: establishLogoUrl,
      method: "POST",
      data: formadata,
    })
      .then((response) => {

        axios
          .patch(
            `${baseUrl.baseUrl}/complaints/` +
            ObjetComplaint.id +
            `?access_token=${localStorage.token}`,
            {
              files: response.data.result.files.image[0].providerResponse.location,
            }
          )
          .then((response) => {
    
          })
          .catch(function (error) {
            console.log("error", error);
          });

      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function uploadFile(payload) {
  if (payload.file !== null) {
    return (dispatch) => {

      console.log("file", payload.file);
      let file = payload.file
      // Split the filename to get the name and type
      let fileParts = file.name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      console.log("Preparing the upload");
      let apiEndpoint = `/containers/uploadFile/${{
        fileName: fileName,
        fileType: fileType
      }}?access_token=${localStorage.token}`;

      classService.post(apiEndpoint)
        .then(response => {
          var returnData = response.data.data.returnData;
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
          this.setState({ url: url })
          console.log("Recieved a signed request " + signedRequest);

          var options = {
            headers: {
              'Content-Type': fileType
            }
          };
          axios.put(signedRequest, file, options)
            .then(result => {
              console.log("Response from s3")
              this.setState({ success: true });
            })
            .catch(error => {
              alert("ERROR " + JSON.stringify(error));
            })


        }).catch(error => {
          console.log("errrrrrorrr")
        });




      
    };
  } else {
    return function (dispatch) { };
  }
}

export const onReclamSend = (data) => {
  if (data.file !== null) {
    return (dispatch) => {
      let dataMail = {
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        subject: data.subject,
        message: data.message,
        date_hour_reclamation: data.date_hour_mail,
        status: true,
        profile_id: data.sender_id,
        status_complaint: "non traitée",
      };
      let apiEndpoint = `/complaints/send-mail?access_token=${localStorage.token}`;
      let file = data.file
      classService
        .post(apiEndpoint, dataMail)
        .then((response) => {
          if (_.isEmpty(response.data)) {
            dispatch({
              type: "MAIL_NOT_FOUND",
              payload: " mail n'existe pas ",
            });
          } else {
            var complaintObject = response.data;
            const fileExtension = file.name.replace(/^.*\./, "");
            const fileName =
            "COMPLAINT_" +
            response.data.mail.id +
            "_Sender_" +
            data.sender_id +
            "." +
            fileExtension;
              var object = {};
              object.file = file;
              object.fileName = fileName;
           
              dispatch(uploadComplaintMedia(object,complaintObject));
  
          }
        })
        .catch((error) => { });
    };
  } else {
    return (dispatch) => {
      let mailWithoutFile = {
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        subject: data.subject,
        message: data.message,
        date_hour_reclamation: data.date_hour_mail,
        status: true,
        profile_id: data.sender_id,
        files: null,
        status_complaint: "non traitée",
      };

      let apiEndpoint = `/complaints/send-mail?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, mailWithoutFile)
        .then((response) => {
          if (_.isEmpty(response.data)) {
            dispatch({
              type: "MAIL_NOT_FOUND",
              payload: " mail n'existe pas ",
            });
          } else {
            dispatch(getReclams_Envoyées());
            dispatch({ type: ON_RECLAM_SEND, payload: response.data });
            setTimeout(() => {
              dispatch({ type: HANDLE_RECLAM_CLOSE });
            }, 2000);
          }
        })
        .catch((error) => { });
    };
  }
};

export const getReclams_Recues = () => {
  return (dispatch) => {
    let apiEndpoint =
      `/complaints/fetchemails/` +
      localStorage.profileId +
      `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const reclamReceived = response.data.emails;
        // const reclamList = reclamReceived.filter((element) => element.status);

        dispatch({
          type: GET_RECLAM_RECUES,
          payload: {
            data: reclamReceived,
          },
        });
      })
      .catch((error) => { });
  };
};

export const getReclams_Envoyées = () => {
  return (dispatch) => {
    let apiEndpoint =
      `/complaints/fetchSentEmails/` +
      localStorage.profileId +
      `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const reclamReceived = response.data.emails;
        //const reclamList = reclamReceived.filter((element) => element.status);
        dispatch({
          type: GET_RECLAM_ENVOYÉES,
          payload: {
            data: reclamReceived,
          },
        });
      })
      .catch((error) => { });
  };
};

export const onComposeReclam = () => {
  return {
    type: ON_COMPOSE_RECLAM,
  };
};

export function onChangeStatusClose() {
  return (dispatch) => {
    dispatch({ type: ON_CHANGE_STATUS_CLOSE });
    setTimeout(() => {
      dispatch({ type: HANDLE_RECLAM_CLOSE });
    }, 2000);
  };
}

export function editStatus(dataReclam) {
  return (dispatch) => {
    let reclamData = {
      status_complaint: dataReclam.status,
      id: dataReclam.id,
    };
    let apiEndpoint =
      `/complaints/` + dataReclam.id + `?access_token=${localStorage.token}`;
    classService
      .patch(apiEndpoint, reclamData)
      .then((response) => {
        dispatch({ type: EDIT_RECLAM_STATUS, payload: response.data });
        dispatch(getReclams_Recues());
      })
      .catch((error) => { });
  };
}

export function deleteComplaint(itemId) {
  return (dispatch) => {
    let reclamData = {
      status: false,
      id: itemId,
    };
    let apiEndpoint =
      `/complaints/` + itemId + `?access_token=${localStorage.token}`;
    classService
      .patch(apiEndpoint, reclamData)
      .then((response) => {
        dispatch({ type: DELETE_RECLAM, payload: response.data });
        dispatch(getReclams_Recues());
        dispatch(getReclams_Envoyées());
        setTimeout(() => {
          dispatch({ type: HANDLE_RECLAM_CLOSE });
        }, 2000);
      })
      .catch((error) => { });
  };
}
