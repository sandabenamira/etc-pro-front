import React from "react";
import CustomScrollbars from "../../../util/CustomScrollbars";
import { Modal, ModalHeader } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import baseUrl from "../../../config/config";
import IntlMessages from "../../../util/IntlMessages";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import { roleIdSuperAdmin } from "../../../config/config";
import { roleIdAdmin } from "../../../config/config";
import { roleIdProfessor } from "../../../config/config";
import { roleIdParent } from "../../../config/config";
import { roleIdStudent } from "../../../config/config";
import { roleIdSupervisor } from "../../../config/config";
import { roleIdDirector } from "../../../config/config";
import { classService } from "../../../_services/class.service";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import _ from "lodash";
var options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
var dateFormat = require("dateformat");

class ReclamDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      open: false,
      showDetail: false,
      receiverInfo: "",
      url: "",
      openCompose: false,
      receiverProfile: "",
    };
  }
  _isMounted = false;
  componentWillMount() {
    this._isMounted = true;

    axios
      .get(
        `${baseUrl.baseUrl}/profiles/` +
          this.props.data.receiver_id +
          `/user?access_token=${localStorage.token}`
      )
      .then((res) => {
        if (this._isMounted) {
          const receiverInfo = res.data;
          this.setState({ receiverInfo });
        }
      });
    axios
      .get(
        `${baseUrl.baseUrl}/profiles/` +
          this.props.data.receiver_id +
          `?access_token=${localStorage.token}`
      )
      .then((res) => {
        if (this._isMounted) {
          const receiverProfile = res.data;
          this.setState({ receiverProfile });
        }
      });

    var apiEndpoint =
      `/establishments/` +
      this.props.userProfile.establishment_id +
      `?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        this.setState({
          establishmentName: response.data.name,
        });
        var apiEndpoint = `/containers/checkFileExist/classebook.data.storage/${response.data.name}?access_token=${localStorage.token}`;
        classService.get(apiEndpoint).then((response) => {
          if (response) {
            let fileList = _.isEmpty(response.data.checkFile)
              ? null
              : response.data.checkFile.find(
                  (item) => item.name === this.props.data.files
                );
            const establishLogoUrl = _.isEmpty(fileList)
              ? null
              : `/containers/classebook.data.storage/download/?access_token=${localStorage.token}`;
            if (establishLogoUrl !== null) {
              classService
                .getPhoto(establishLogoUrl)
                .then((response) => {
                  if (response) {
                    const fileExtension = this.props.data.files.replace(
                      /^.*\./,
                      ""
                    );
                    if (fileExtension === "pdf") {
                      var arr = response.data;
                      var data2 = new Uint8Array(arr);
                      var blob = new Blob([data2], { type: "application/pdf" });
                      var url = URL.createObjectURL(blob);
                      this.setState({
                        url: url,
                      });
                    } else {
                      var arr = response.data;
                      var data2 = new Uint8Array(arr);
                      var blob = new Blob([data2], { type: "video/*" });
                      var url = URL.createObjectURL(blob);
                      this.setState({
                        url: url,
                      });
                    }
                  }
                })
                .catch((err) => {
                 });
            } else {
              this.setState({
                url: null,
              });
            }
          }
        });
      }
    });
  }
  getNameRole(id) {
    if (this.props.settings.languageId === "tunisia") {
      return id === roleIdSuperAdmin
        ? "superadmin"
        : id === roleIdAdmin
        ? "مشرف"
        : id === roleIdProfessor
        ? "أستاذ"
        : id === roleIdParent
        ? "الولي"
        : id === roleIdStudent
        ? "تلميذ"
        : id === roleIdDirector
        ? "مشرف اول"
        : id === roleIdDirector
        ? "مدير"
        : "";
    } else if (this.props.settings.languageId === "english") {
      return id === roleIdSuperAdmin
        ? "Superadmin"
        : id === roleIdAdmin
        ? "Admin"
        : id === roleIdProfessor
        ? "Professor"
        : id === roleIdParent
        ? "Parent"
        : id === roleIdStudent
        ? "Student"
        : id === roleIdSupervisor
        ? "Superviseur"
        : id === roleIdDirector
        ? "Director"
        : "";
    } else {
      return id === roleIdSuperAdmin
        ? "superadmin"
        : id === roleIdAdmin
        ? "Administrateur"
        : id === roleIdProfessor
        ? "Professeur"
        : id === roleIdParent
        ? "Parent"
        : id === roleIdStudent
        ? "Élève"
        : id === roleIdSupervisor
        ? "Superviseur"
        : id === roleIdDirector
        ? "Directeur"
        : "";
    }
  }

  render() {   /* eslint eqeqeq: "off" */
    const { data, width, onClose } = this.props;
    const statusStyle = data.status_complaint.includes("non traitée")
      ? "text-white bg-danger"
      : data.status_complaint.includes("en cours")
      ? "bg-amber"
      : "text-white bg-success";

    const nameSender = data.profile.user.name + " " + data.profile.user.surname;
    const nameReceiver =
      this.state.receiverInfo.name + " " + this.state.receiverInfo.surname;
    const nameSender_AR =
      data.profile.user.surname_ar + " " + data.profile.user.name_ar;
    const nameReceiver_AR =
      this.state.receiverInfo.surname_ar +
      " " +
      this.state.receiverInfo.name_ar;
    const RoleSender = this.getNameRole(this.props.data.profile.role_id);
    const RoleReceiver = this.getNameRole(this.state.receiverProfile.role_id);
    const statusComplaint = data.status_complaint.includes("non traitée") ? (
      <IntlMessages id="Reclam.non.traité" />
    ) : data.status_complaint.includes("en cours") ? (
      <IntlMessages id="Reclam.encours" />
    ) : (
      <IntlMessages id="Reclam.Traité" />
    );
    return (
      <Modal
        className="modal-box modal-box-mail"
        isOpen={this.props.open}
        style={{ zIndex: 2600 }}
      >
        <ModalHeader className="modal-box-header bg-primary text-white">
          {this.props.type === "Reçues" ? (
            <IntlMessages id="Reclam.detail.recue" />
          ) : (
            <IntlMessages id="Reclam.detail.envoyée" />
          )}

          <IconButton className="text-white" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <div className="module-detail mail-detail">
          <div className="jr-card text-center">
            <div className={`jr-card-header-color bg-gradient-primary`}>
              <div className="jr-card-header-top">
                <div>
                  <h3 className="mb-0 text-white">
                    {this.props.settings.languageId === "tunisia"
                      ? new Date(data.date_hour_reclamation).toLocaleDateString(
                          "ar-TN",
                          options
                        )
                      : this.props.settings.languageId === "english"
                      ? new Date(data.date_hour_reclamation).toLocaleDateString(
                          "en-US",
                          options
                        )
                      : new Date(data.date_hour_reclamation).toLocaleDateString(
                          "fr-FR",
                          options
                        )}
                  </h3>
                </div>
              </div>

              <img
                className="rounded-circle size-90 avatar-shadow mb-3"
                src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png"
                alt="Team Member"
              />

              <div className="jr-card-hd-content">
                {this.props.type === "Reçues" ? (
                  this.props.settings.languageId==="tunisia" &&
                  nameSender_AR != "null null" ? (
                    <h4 className="mb-0 text-white">
                      <IntlMessages id="Reclam.detail.from" /> {nameSender_AR}
                    </h4>
                  ) : (
                    <h4 className="mb-0 text-white">
                      <IntlMessages id="Reclam.detail.from" /> {nameSender}
                    </h4>
                  )
                ) : this.props.settings.languageId==="tunisia" &&
                  nameReceiver_AR != "null null" ? (
                  <h4 className="mb-0 text-white">
                    <IntlMessages id="Reclam.detail.to" /> {nameReceiver_AR}
                  </h4>
                ) : (
                  <h4 className="mb-0 text-white">
                    <IntlMessages id="Reclam.detail.to" /> {nameReceiver}
                  </h4>
                )}
                {this.props.type === "Reçues" ? (
                  <h4 className="mb-0 text-white">{RoleSender}</h4>
                ) : (
                  <h4 className="mb-0 text-white">{RoleReceiver}</h4>
                )}
              </div>
              {this.props.type === "Reçues" ? (
                <Fab
                  className="jr-badge-up bg-success"
                  onClick={() => {
                    this.props.compose();
                    onClose();
                  }}
                >
                  <i className="zmdi zmdi-mail-send" />
                </Fab>
              ) : (
                ""
              )}
            </div>
            <div className="jr-card-body pt-2">
              <div>
                <strong>
                  <IntlMessages id="complaint.Sujet" /> {"    :   "}
                </strong>
                {data.subject}
              </div>

              <div>
                <font size="+2"> {data.message}</font>
              </div>
              <div>
                {this.props.type === "Reçues" ? (
                  localStorage.roles_id===roleIdAdmin ? (
                    <div className={` badge text-uppercase ${statusStyle}`}>
                      {statusComplaint}
                    </div>
                  ) : (
                    ""
                  )
                ) : localStorage.roles_id != roleIdAdmin ? (
                  <div className={` badge text-uppercase ${statusStyle}`}>
                    {statusComplaint}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.props.data.files===null ? (
                  ""
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#009D88",
                        color: "#fff",
                        marginTop: "3%",
                      }}
                      startIcon={<GetAppIcon />}
                      href={this.props.data.files}
                      download
                    >
                      <IntlMessages id="complaint.télécharger" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings.locale,
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps)(ReclamDetail);
