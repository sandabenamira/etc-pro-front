import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import mails from "./mails";
import folders from "./folders";
import filters from "./filters";
import labels from "./labels";
import options from "./options";
import MailList from "./MailList";

import ComposeMail from "./Compose";
import AppModuleHeader from "./AppModuleHeader";
import MailDetail from "./MailDetail";
import IntlMessages from "../../../../../util/IntlMessages";
import CustomScrollbars from "./CustomScrollbars";
import { classService } from "../../../../../_services/class.service";
import {
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from "../../../../../config/config";
import _ from "lodash";
import { sendMail } from "../../../../../actions/MailAction";

class Mail extends Component {
  constructor() {
    super();
    this.state = {
      searchMail: "",
      noContentFoundMessage: "No mail found in selected folder",
      alertMessage: "",
      showMessage: false,
      drawerState: false,
      optionName: "None",
      anchorEl: null,
      allMail: mails,
      loader: true,
      currentMail: null,
      user: {
        name: "Robert Johnson",
        email: "robert@example.com",
        avatar: "https://via.placeholder.com/150x150",
      },
      selectedMails: 0,
      selectedFolder: 0,
      composeMail: false,
      labelMenuState: false,
      folderMenuState: false,
      optionMenuState: false,
      folderMails: mails.filter((mail) => mail.folder === 0),

      classes: [],
      professorsIds: [],
      subject: "",
      roleId: null,
      classId: null,
      professorsFiltred: [],
      adminsIds: [],
      receivers: [],
      mailFiles: [],
      nameFiles: [],
      users: [],
      message: "",
      classStudentFilter: [],
      studentFiltred: [],
      studentsIds: [],
      filterLevelStudentId: null,
      filterClassStudentId: null,
      parentsIds: [],
      parentFiltred: [],
    };
  }

  sendMail = () => {
    let dataMail = {};
    dataMail.status = true;
    dataMail.subject = this.state.subject;
    dataMail.message = this.state.message;
    dataMail.date_mail = new Date();
    dataMail.read = false;
    dataMail.starred = false;
    dataMail.important = false;
    dataMail.fk_id_sender_profile = this.props.userProfile.id;
    this.props.dispatch(
      sendMail(dataMail, this.state.receivers, this.state.mailFiles)
    );
    this.setState({
      classes: [],
      professorsIds: [],
      subject: "",
      roleId: null,
      classId: null,
      professorsFiltred: [],
      adminsIds: [],
      receivers: [],
      mailFiles: [],
      nameFiles: [],
      users: [],
      message: "",
      classStudentFilter: [],
      studentFiltred: [],
      studentsIds: [],
      filterLevelStudentId: null,
      filterClassStudentId: null,
      parentsIds: [],
      parentFiltred: [],

    });
  };

  handleChangeRole = (event) => {
    this.setState({ roleId: event.target.value });
    if (event.target.value !== 0) {
      let receivers = [];
      switch (event.target.value) {
        case roleIdAdmin:
          receivers = _.map(this.props.admins, "profileId");
          this.setState({ receivers, users: this.props.admins });
          break;
        case roleIdProfessor:
          receivers = _.map(this.props.professors, "profileId");
          this.setState({
            receivers,
            professorsFiltred: [],
            professorsIds: [],
          });
          break;
        case roleIdStudent:
          receivers = _.map(this.props.students, "profileId");
          this.setState({
            receivers,
            studentsIds: [],
            filterLevelStudentId: null,
          });
          break;
        case roleIdSupervisor:
          receivers = _.map(this.props.supervisors, "profileId");
          this.setState({ receivers, users: this.props.supervisors });
          break;
        case roleIdDirector:
          receivers = _.map(this.props.directors, "profileId");
          this.setState({ receivers, users: this.props.directors });
          break;
        default:
          break;
      }
    } else {
      this.setState({ receivers: [], adminsIds: [] });
    }
  };

  handleChangeClass = (event) => {
    this.setState({ classId: event.target.value, professorsIds: [] });
    let professorsFiltred = [];
    let receivers = [];
    this.props.professors.forEach((professor) => {
      professor.inforamtionsProf.forEach((element) => {
        if (element.ClassId === event.target.value) {
          professorsFiltred.push(professor);
          receivers.push(professor.profileId);
        }
      });
    });
    this.setState({ professorsFiltred, receivers });
  };

  handleChangeSubject = (event) => {
    this.setState({ subject: event.target.value });
  };

  handleChangeEditor = (event) => {
    let message = "";
    event.blocks.map((element) => {
      message = message + " " + element.text;
    });
    this.setState({ message });
  };

  handleChangeProfessorIds = (event) => {
    this.setState({
      professorsIds: event.target.value,
      receivers: event.target.value,
    });
  };
  handleChangeAdminsIds = (event) => {
    this.setState({
      adminsIds: event.target.value,
      receivers: event.target.value,
    });
  };
  handleChangeStudentsIds = (event) => {
    this.setState({
      studentsIds: event.target.value,
      receivers: event.target.value,
    });
    if (this.state.roleId === roleIdParent) {
      let parentFiltred = [];
      this.props.parents.forEach((element) => {
        element.inforamtionsParent.forEach((item) => {
          event.target.value.forEach((id) => {
            if (id == item.studentProfileId) {
              parentFiltred.push(element);
            }
          });
        });
      });
      this.setState({ parentFiltred });
    }
  };

  handleChangeParentsIds = (event) => {
    this.setState({
      parentsIds: event.target.value,
      receivers: event.target.value,
    });
  };

  handleChangeFilterStudent = (name) => (event) => {
    if (name === "filterLevelStudentId") {
      let classStudentFilter = this.props.classes.filter(
        (element) => element.fk_id_level_v4 === event.target.value
      );
      this.setState({
        classStudentFilter,
        studentsIds: [],
        filterLevelStudentId: event.target.value,
        filterClassStudentId: null,
      });
    }
    if (name === "filterClassStudentId") {
      let studentFiltred = [];
      this.props.students.forEach((student) => {
        if (
          student.inforamtionsStudent.classInformation.classId ===
          event.target.value
        ) {
          studentFiltred.push(student);
        }
      });
      this.setState({
        studentFiltred,
        studentsIds: [],
        filterClassStudentId: event.target.value,
      });
    }
  };

  deleteFile(filename) {
    let nameFiles = this.state.nameFiles.filter(
      (element) => element != filename
    );

    let mailFiles = this.state.mailFiles.filter(
      (element) => element.name != filename
    );

    this.setState({ nameFiles, mailFiles });
  }

  attachFile(e) {
    var oldFiles = this.state.mailFiles;
    var files = Object.values(e.target.files);
    var nameFiles = this.state.nameFiles;
    if (files !== undefined && this.state.nameFiles.length + files.length < 6) {
      files.map((element) => {
        nameFiles.push(element.name);
        oldFiles.push(element);
      });
      this.setState({ mailFiles: oldFiles, nameFiles });
    } else {
      this.setState({
        messageAlerte: "Vous avez dépasser 5 fichiers",
        alerteStatus: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: "", alerteStatus: false });
      }, 4000);
    }
  }

  MailSideBar = () => {
    return (
      <div className="module-side">
        <div className="module-side-header">
          <div className="module-logo">
            <i className="zmdi zmdi-email mr-3" />
            <span>
              <IntlMessages id="mail.mailbox" />
            </span>
          </div>
        </div>

        <div className="module-side-content">
          <CustomScrollbars
            className="module-side-scroll scrollbar"
            style={{
              height:
                this.props.width >= 1200
                  ? "calc(100vh - 200px)"
                  : "calc(100vh - 80px)",
            }}
          >
            <div className="module-add-task">
              <Button
                variant="contained"
                color="primary"
                className="btn-block"
                onClick={() => {
                  this.setState({ composeMail: true });
                }}
              >
                <i className="zmdi zmdi-edit zmdi-hc-fw" />
                <IntlMessages id="mail.compose" />{" "}
              </Button>
            </div>

            <ul className="module-nav">
              {this.getNavFolders()}

              <li className="module-nav-label">
                <IntlMessages id="mail.filters" />
              </li>

              {this.getNavFilters()}

              <li className="module-nav-label">
                <IntlMessages id="mail.labels" />
              </li>

              {this.getNavLabels()}
            </ul>
          </CustomScrollbars>
        </div>
      </div>
    );
  };

  onDeleteMail = () => {
    const mails = this.state.allMail.map((mail) =>
      mail.selected && mail.folder === this.state.selectedFolder
        ? { ...mail, folder: 4, selected: false }
        : mail
    );
    this.setState({
      alertMessage: "Mail Deleted Successfully",
      showMessage: true,
      selectedMails: 0,
      allMail: mails,
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
  };
  getNavFolders = () => {
    return folders.map((folder, index) => (
      <li
        key={index}
        onClick={() => {
          const filterMails = this.state.allMail.filter(
            (mail) => mail.folder === folder.id
          );
          this.setState({
            selectedFolder: folder.id,
            noContentFoundMessage: "No mail found in selected folder",
            currentMail: null,
            loader: true,
            folderMails: filterMails,
          });
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1500);
        }}
      >
        <span
          className={`jr-link ${
            this.state.selectedFolder === folder.id ? "active" : ""
          }`}
        >
          <i className={`zmdi zmdi-${folder.icon}`} />
          <span>{folder.title}</span>
        </span>
      </li>
    ));
  };
  onFolderMenuItemSelect = (folderId) => {
    this.handleRequestClose();
    const mails = this.state.allMail.map((mail) =>
      mail.selected && mail.folder === this.state.selectedFolder
        ? { ...mail, folder: folderId, selected: false }
        : mail
    );
    this.setState({
      selectedMails: 0,
      allMail: mails,
      noContentFoundMessage: "No mail found in selected folder",
      alertMessage: "Mail has been moved successfully",
      showMessage: true,
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
  };
  onLabelMenuItemSelect = (label) => {
    this.handleRequestClose();
    const mails = this.state.allMail.map((mail) => {
      if (mail.selected && mail.folder === this.state.selectedFolder) {
        if (mail.labels.includes(label.id)) {
          return { ...mail, labels: this.removeLabel(mail, label.id) };
        } else {
          return { ...mail, labels: this.addLabel(mail, label.id) };
        }
      } else {
        return mail;
      }
    });
    this.setState({
      noContentFoundMessage: "No mail found in selected label",
      alertMessage: "Label Updated Successfully",
      showMessage: true,
      allMail: mails,
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
  };
  handleRequestClose = () => {
    this.setState({
      composeMail: false,
      showMessage: false,
      folderMenuState: false,
      labelMenuState: false,
      optionMenuState: false,

      classes: [],
      professorsIds: [],
      subject: "",
      roleId: null,
      classId: null,
      professorsFiltred: [],
      adminsIds: [],
      receivers: [],
      mailFiles: [],
      nameFiles: [],
      users: [],
      message: "",
      classStudentFilter: [],
      studentFiltred: [],
      studentsIds: [],
      filterLevelStudentId: null,
      filterClassStudentId: null,
      parentsIds: [],
      parentFiltred: [],
    });
  };
  getNavFilters = () => {
    return filters.map((filter, index) => (
      <li
        key={index}
        onClick={() => {
          const filterMails = this.state.allMail.filter((mail) => {
            if (filter.id === 0 && mail.starred) {
              return mail;
            } else if (filter.id === 1 && mail.important) {
              return mail;
            }
            return null;
          });
          this.setState({
            noContentFoundMessage: "No mail found in selected filter",
            loader: true,
            folderMails: filterMails,
          });
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1500);
        }}
      >
        <span className="jr-link">
          <i className={`zmdi zmdi-${filter.icon}`} />
          <span>{filter.title}</span>
        </span>
      </li>
    ));
  };
  onFolderSelect = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      folderMenuState: !this.state.folderMenuState,
    });
  };
  onLabelSelect = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      labelMenuState: !this.state.labelMenuState,
    });
  };
  onOptionMenuSelect = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      optionMenuState: !this.state.optionMenuState,
    });
  };
  onOptionMenuItemSelect = (option) => {
    switch (option.title) {
      case "All":
        this.handleRequestClose();
        this.getAllMail();
        break;
      case "None":
        this.handleRequestClose();
        this.getUnselectedAllMail();
        break;
      case "Read":
        this.handleRequestClose();
        this.getReadMail();
        break;
      case "Unread":
        this.handleRequestClose();
        this.getUnreadMail();
        break;
      case "Starred":
        this.handleRequestClose();
        this.getStarredMail();
        break;
      case "Unstarred":
        this.handleRequestClose();
        this.getUnStarredMail();
        break;
      case "Important":
        this.handleRequestClose();
        this.getImportantMail();
        break;
      case "Unimportant":
        this.handleRequestClose();
        this.getUnimportantMail();
        break;
      default:
        this.handleRequestClose();
        this.getAllMail();
    }
  };
  getAllMail = () => {
    let mails = this.state.allMail.map((mail) =>
      mail.folder === this.state.selectedFolder
        ? {
            ...mail,
            selected: true,
          }
        : mail
    );
    this.setState({
      selectedMails: mails.length,
      allMail: mails,
      optionName: "All",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
  };
  getUnselectedAllMail = () => {
    let mails = this.state.allMail.map((mail) =>
      mail.folder === this.state.selectedFolder
        ? {
            ...mail,
            selected: false,
          }
        : mail
    );
    this.setState({
      selectedMails: 0,
      allMail: mails,
      optionName: "None",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
  };
  getReadMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(
      (mail) => mail.folder === this.state.selectedFolder
    );
    mails = mails.map((mail) => {
      if (mail.read) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false };
    });
    this.setState({
      selectedMails: selectedMail,
      allMail: mails,
      optionName: "Read",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
    return mails;
  };
  getUnreadMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(
      (mail) => mail.folder === this.state.selectedFolder
    );
    mails = mails.map((mail) => {
      if (!mail.read) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false };
    });
    this.setState({
      selectedMails: selectedMail,
      allMail: mails,
      optionName: "Unread",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
    return mails;
  };
  getStarredMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(
      (mail) => mail.folder === this.state.selectedFolder
    );
    mails = mails.map((mail) => {
      if (mail.starred) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false };
    });
    this.setState({
      selectedMails: selectedMail,
      allMail: mails,
      optionName: "Starred",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
    return mails;
  };
  getUnStarredMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(
      (mail) => mail.folder === this.state.selectedFolder
    );
    mails = mails.map((mail) => {
      if (!mail.starred) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false };
    });
    this.setState({
      selectedMails: selectedMail,
      allMail: mails,
      optionName: "UnStarred",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
    return mails;
  };
  getImportantMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(
      (mail) => mail.folder === this.state.selectedFolder
    );
    mails = mails.map((mail) => {
      if (mail.important) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false };
    });
    this.setState({
      selectedMails: selectedMail,
      allMail: mails,
      optionName: "Important",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
    return mails;
  };
  getUnimportantMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(
      (mail) => mail.folder === this.state.selectedFolder
    );
    mails = mails.map((mail) => {
      if (!mail.important) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false };
    });
    this.setState({
      selectedMails: selectedMail,
      optionName: "Unimportant",
      allMail: mails,
      noContentFoundMessage: "No Mail found in selected Label",
      folderMails: mails.filter(
        (mail) => mail.folder === this.state.selectedFolder
      ),
    });
    return mails;
  };
  getNavLabels = () => {
    return labels.map((label, index) => (
      <li
        key={index}
        onClick={() => {
          const filterMails = this.state.allMail.filter((mail) =>
            mail.labels.includes(label.id)
          );
          this.setState({
            loader: true,
            noContentFoundMessage: "No mail found in selected label",
            folderMails: filterMails,
          });
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1500);
        }}
      >
        <span className="jr-link">
          <i className={`zmdi zmdi-circle text-${label.color}`} />
          <span>{label.title}</span>
        </span>
      </li>
    ));
  };
  searchMail = (searchText) => {
    if (searchText === "") {
      this.setState({
        folderMails: this.state.allMail.filter((mail) => !mail.deleted),
      });
    } else {
      const searchMails = this.state.allMail.filter(
        (mail) =>
          !mail.deleted &&
          mail.subject.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      this.setState({
        folderMails: searchMails,
      });
    }
  };
  displayMail = (currentMail, folderMails, noContentFoundMessage) => {
    return (
      <div className="module-box-column">
        {currentMail === null ? (
          folderMails.length === 0 ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                height:
                  this.props.width >= 1200
                    ? "calc(100vh - 265px)"
                    : "calc(100vh - 245px)",
              }}
            >
              {noContentFoundMessage}
            </div>
          ) : (
            <MailList
              mails={folderMails}
              onStartSelect={this.onStartSelect.bind(this)}
              onMailSelect={this.onMailSelect.bind(this)}
              width={this.props.width}
              onMailChecked={this.onMailChecked.bind(this)}
            />
          )
        ) : (
          <MailDetail
            mail={currentMail}
            onStartSelect={this.onStartSelect.bind(this)}
            width={this.props.width}
            onImportantSelect={this.onImportantSelect.bind(this)}
          />
        )}
      </div>
    );
  };
  getMailActions = () => {
    return (
      <div>
        <IconButton
          onClick={this.onFolderSelect.bind(this)}
          className="icon-btn"
        >
          <i className="zmdi zmdi-folder" />
        </IconButton>

        <IconButton onClick={this.onDeleteMail.bind(this)} className="icon-btn">
          <i className="zmdi zmdi-delete" />
        </IconButton>

        <IconButton
          onClick={this.onLabelSelect.bind(this)}
          className="icon-btn"
        >
          <i className="zmdi zmdi-label-alt" />
        </IconButton>
      </div>
    );
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);
  }

  onMailChecked(data) {
    data.selected = !data.selected;
    let selectedMail = 0;
    const mails = this.state.folderMails.map((mail) => {
      if (mail.selected) {
        selectedMail++;
      }
      if (mail.id === data.id) {
        if (mail.selected) {
          selectedMail++;
        }
        return data;
      } else {
        return mail;
      }
    });
    this.setState({
      selectedMails: selectedMail,
      folderMails: mails,
    });
  }

  onAllMailSelect() {
    const selectAll = this.state.selectedMails <= this.state.folderMails.length;
    if (selectAll) {
      this.getAllMail();
    } else {
      this.getUnselectedAllMail();
    }
  }

  removeLabel(mail, label) {
    mail.labels.splice(mail.labels.indexOf(label), 1);
    if (
      this.state.currentMail !== null &&
      mail.id === this.state.currentMail.id
    ) {
      this.setState({
        currentMail: { ...mail, labels: mail.labels },
      });
    }
    return mail.labels;
  }

  onStartSelect(data) {
    data.starred = !data.starred;
    this.setState({
      alertMessage: data.starred ? "Mail Mark as Star" : "Mail Remove as Star",
      showMessage: true,
      folderMails: this.state.folderMails.map((mail) =>
        mail.id === data.id ? data : mail
      ),
    });
  }

  onImportantSelect(data) {
    data.important = !data.important;
    this.setState({
      alertMessage: data.important
        ? "Mail Mark as Important"
        : "Mail Remove as Important",
      showMessage: true,
      folderMails: this.state.folderMails.map((mail) =>
        mail.id === data.id ? data : mail
      ),
    });
  }

  // onMailSend(data) {
  //   this.setState({
  //     alertMessage: "Mail Sent Successfully",
  //     showMessage: true,
  //     folderMails: this.state.allMail.concat(data),
  //     allMail: this.state.allMail.concat(data),
  //   });
  // }

  onMailSelect(mail) {
    this.setState({
      loader: true,
      currentMail: mail,
    });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);
  }

  addLabel(mail, label) {
    if (
      this.state.currentMail !== null &&
      mail.id === this.state.currentMail.id
    ) {
      this.setState({
        currentMail: { ...mail, labels: mail.labels.concat(label) },
      });
    }
    return mail.labels.concat(label);
  }

  updateSearch(evt) {
    this.setState({
      searchMail: evt.target.value,
    });
    this.searchMail(evt.target.value);
  }

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState,
    });
  }

  render() {
    const {
      selectedMails,
      loader,
      currentMail,
      folderMails,
      composeMail,
      user,
      alertMessage,
      showMessage,
      noContentFoundMessage,
    } = this.state;

    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="app-module">
            <div className="d-block d-xl-none">
              <Drawer
                open={this.state.drawerState}
                onClose={this.onToggleDrawer.bind(this)}
              >
                {this.MailSideBar()}
              </Drawer>
            </div>
            <div className="app-module-sidenav d-none d-xl-flex">
              {this.MailSideBar()}
            </div>

            <div className="module-box">
              <div className="module-box-header">
                <IconButton
                  className="drawer-btn d-block d-xl-none"
                  aria-label="Menu"
                  onClick={this.onToggleDrawer.bind(this)}
                >
                  <i className="zmdi zmdi-menu" />
                </IconButton>
                <AppModuleHeader
                  placeholder="Search mails"
                  user={this.state.user}
                  onChange={this.updateSearch.bind(this)}
                  value={this.state.searchMail}
                />
              </div>

              <div className="module-box-content">
                <div className="module-box-topbar">
                  {this.state.currentMail === null ? (
                    <div className="d-flex">
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selectedMails > 0 &&
                          selectedMails < folderMails.length
                        }
                        checked={selectedMails > 0}
                        onChange={this.onAllMailSelect.bind(this)}
                        value="SelectMail"
                      />
                      <div
                        className="d-flex align-items-center"
                        onClick={this.onOptionMenuSelect.bind(this)}
                      >
                        <span className="px-2"> {this.state.optionName}</span>
                        <IconButton className="icon-btn-sm">
                          <i className="zmdi zmdi-caret-down" />
                        </IconButton>
                      </div>
                    </div>
                  ) : (
                    <IconButton
                      className="icon-btn"
                      onClick={() => {
                        this.setState({
                          currentMail: null,
                        });
                      }}
                    >
                      <i className="zmdi zmdi-arrow-back" />
                    </IconButton>
                  )}

                  {selectedMails > 0 && this.getMailActions()}

                  <Menu
                    id="option-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.optionMenuState}
                    onClose={this.handleRequestClose}
                    MenuListProps={{
                      style: {
                        width: 150,
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem
                        key={option.title}
                        onClick={this.onOptionMenuItemSelect.bind(this, option)}
                      >
                        {option.title}
                      </MenuItem>
                    ))}
                  </Menu>

                  <Menu
                    id="folder-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.folderMenuState}
                    onClose={this.handleRequestClose}
                    MenuListProps={{
                      style: {
                        width: 150,
                      },
                    }}
                  >
                    {folders.map((folder) => (
                      <MenuItem
                        key={folder.id}
                        onClick={this.onFolderMenuItemSelect.bind(
                          this,
                          folder.id
                        )}
                      >
                        {folder.title}
                      </MenuItem>
                    ))}
                  </Menu>
                  <Menu
                    id="label-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.labelMenuState}
                    onClose={this.handleRequestClose}
                    MenuListProps={{
                      style: {
                        width: 150,
                      },
                    }}
                  >
                    {labels.map((label) => (
                      <MenuItem
                        key={label.id}
                        onClick={this.onLabelMenuItemSelect.bind(this, label)}
                      >
                        {label.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>

                {loader ? (
                  <div
                    className="loader-view"
                    style={{
                      height:
                        this.props.width >= 1200
                          ? "calc(100vh - 265px)"
                          : "calc(100vh - 245px)",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  this.displayMail(
                    currentMail,
                    folderMails,
                    noContentFoundMessage
                  )
                )}

                <ComposeMail
                  open={composeMail}
                  user={user}
                  onClose={this.handleRequestClose.bind(this)}
                  // onMailSend={this.onMailSend.bind(this)}
                  handleChangeClass={this.handleChangeClass.bind(this)}
                  handleChangeSubject={this.handleChangeSubject.bind(this)}
                  handleChangeEditor={this.handleChangeEditor.bind(this)}
                  handleChangeRole={this.handleChangeRole.bind(this)}
                  handleChangeProfessorIds={this.handleChangeProfessorIds.bind(
                    this
                  )}
                  handleChangeAdminsIds={this.handleChangeAdminsIds.bind(this)}
                  sendMail={this.sendMail.bind(this)}
                  attachFile={this.attachFile.bind(this)}
                  deleteFile={this.deleteFile.bind(this)}
                  values={this.state}
                  professors={this.props.professors}
                  admins={this.props.admins}
                  classes={this.props.classes}
                  levels={this.props.levels}
                  handleChangeFilterStudent={this.handleChangeFilterStudent.bind(
                    this
                  )}
                  handleChangeStudentsIds={this.handleChangeStudentsIds.bind(
                    this
                  )}
                  handleChangeParentsIds={this.handleChangeParentsIds.bind(
                    this
                  )}
                />
              </div>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.props.showMessage}
            autoHideDuration={3000}
            onClose={this.handleRequestClose}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">{this.props.alertMessage}</span>}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    professors: state.usersReducer.professors,
    admins: state.usersReducer.admins,
    supervisors: state.usersReducer.supervisors,
    directors: state.usersReducer.directors,
    classes: state.ClassSettingsReducer.classSettings,
    students: state.usersReducer.students,
    levels: state.levelsReducer.levels,
    alertMessage: state.MailReducer.alertMessage,
    showMessage: state.MailReducer.showMessage,
    parents: state.usersReducer.parents,
  };
};
export default connect(mapStateToProps)(Mail);
