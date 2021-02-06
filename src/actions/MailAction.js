import { classService } from "../_services/class.service";
import axios from "axios";
import baseUrl from "../config/config";
import {
  ON_MAIL_SEND,
  HANDLE_REQUEST_CLOSE,
  MAIL_NOT_SEND_ALERT,
} from "../constants/ActionTypes";
export const sendMail = (data, receivers, files) => {
  let mailItem = {};
  return (dispatch) => {
    let apiEndpoint = `/mails_v4?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, data).then((response) => {
      if (response) {
        let mailId = response.data.id;
        let receiversMail = [];
        receiversMail = receivers.map((receiverId) => {
          return {
            status: true,
            fk_id_mail: mailId,
            fk_id_receiver_profile: receiverId,
          };
        });
        let apiEndpointFiles = `/receivers_mails?access_token=${localStorage.token}`;
        classService
          .post(apiEndpointFiles, receiversMail)
          .then((receivermail) => {
            if (receivermail) {
              if (files.length > 0) {
                let formadata = new FormData();
                files.map((element, index) => {
                  let mailFile = element;
                  const fileExtension = mailFile.name.replace(/^.*\./, "");
                  const fileName =
                    "mail" + mailId + "N" + index + "." + fileExtension;
                  var object = {};
                  object.file = mailFile;
                  object.fileName = fileName;
                  const myNewFile = new File([object.file], fileName, {
                    type: object.file.type,
                  });
                  formadata.append("file", myNewFile);

                });

                let filesURL = [];
                const URLMaterailCourse = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
                axios({
                  url: URLMaterailCourse,
                  method: "POST",
                  data: formadata,
                })
                  .then((response) => {
                    if (response) {
                      filesURL = response.data.result.files.file.map(
                        (urlFile, index) => {
                          return {
                            file_name: urlFile.name,
                            url_file: urlFile.providerResponse.location,
                            status: true,
                            creation_date: new Date(),
                            fk_id_mail: mailId,
                          };
                        }
                      );
                      let apiEndpointFiles = `/files_mails?access_token=${localStorage.token}`;
                      classService
                        .post(apiEndpointFiles, filesURL)
                        .then((mailsFiles) => {
                          if (mailsFiles) {
                            dispatch({
                              type: ON_MAIL_SEND,
                              payload: mailsFiles.data,
                            });
                            setTimeout(() => {
                              dispatch({ type: HANDLE_REQUEST_CLOSE });
                            }, 4000);
                          } else {
                          }
                        });
                    }
                  })
                  .catch((err) => {});
              } else {
                //l email ne contient pas des files
                dispatch({ type: ON_MAIL_SEND, payload: response.data });
                setTimeout(() => {
                  dispatch({ type: HANDLE_REQUEST_CLOSE });
                }, 4000);
              }
            } else {
            }
          });
      } else {
        //erreur lors de l'ajout
        dispatch({ type: MAIL_NOT_SEND_ALERT, payload: "" });
        setTimeout(() => {
          dispatch({ type: HANDLE_REQUEST_CLOSE });
        }, 4000);
      }
    });
  };
};
