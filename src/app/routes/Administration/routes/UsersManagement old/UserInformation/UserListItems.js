import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import baseUrl from "../../../../../../config/config";
import _ from "lodash";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../../../../../util/IntlMessages";
import ResetPasswordModal from "../UserInformation/ResetPasswordModal";
import DeleteUserModal from "../UserInformation/DeleteUserModal";
import { connect } from "react-redux";
import { roleIdSuperAdmin, roleIdAdmin, roleIdProfessor, roleIdParent, roleIdStudent, roleIdSupervisor,roleIdDirector } from "../../../../../../config/config";
import { deleteStuppUser as deleteUser } from "../../../../../../actions/stuppUserAction";
import defaultAvatar from "../../../../../../assets/images/default-Avatar.png";
import  ModalSchoolYears  from "../ModalSchoolYears";
import { classService } from "../../../../../../_services/class.service";

class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: "",
      menuState: false,
      itemId: 0,
      anchorEl: undefined,
      isOpenResetModal: false,
      isOpenDeleteUserModal: false,
      historicStudent:[]
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRequestCloseModal = this.handleRequestCloseModal.bind(this);
    this.handleRequestResetPass = this.handleRequestResetPass.bind(this);
    this.handleRequestDeleteUser = this.handleRequestDeleteUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.showModalSchoolYears = this.showModalSchoolYears.bind(this);
  }
  handleDeleteUser = () => {
    this.props.deleteUser(this.props.user.user.id);
    this.setState({ isOpenDeleteUserModal: false });
  };
  handleRequestDeleteUser = () => {
    this.setState({ menuState: false, isOpenDeleteUserModal: true });
  };

  showModalSchoolYears = (e) => {
    e.preventDefault(); 

    if(this.props.user.role_id === roleIdStudent){
const profileId = this.props.user.id
      let apiEndpoint = `/profiles/getInscriptionStudent/${profileId}/?access_token=${localStorage.token}`;
      classService.get(apiEndpoint).then(response => {
        if (response) {  
           let inscriptionData = response.data.inscriptionStudent[0].inscription
          this.setState({ isOpenResetModalSchoolYears: true, historicStudent: response.data.inscriptionStudent[0].inscription });
  
    }
    })

    }
  };

  closeModalSchoolYears = () => {
    this.setState({ isOpenResetModalSchoolYears: false });
  };

  handleRequestCloseModal = () => {
    this.setState({ isOpenResetModal: false, isOpenDeleteUserModal: false });
  };

  handleRequestResetPass = () => {
    const params = {
      email: this.props.user.user.email,
    };

    axios
      .post(`${baseUrl.baseUrl}/users/reset-user-password`, params, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => { });
    this.setState({ isOpenResetModal: false });
  };

  onOptionMenuSelect = (event) => {

    this.setState({
      menuState: true,
      anchorEl: event.currentTarget,
      itemId: event.currentTarget.value,
    });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };
  UNSAFE_componentWillMount() {
    if (this.props.user.user.photo != null) {
      axios
        .get(
          `${baseUrl.baseUrl}/containers/checkFileExist/classebook.data.storage?access_token=${localStorage.token}`
        )
        .then((response) => {
          let fileList = _.isEmpty(response.data.checkFile)
            ? null
            : response.data.checkFile.filter(
              (item) => item.name === this.props.user.user.photo
            );
          _.isEmpty(fileList)
            ? this.setState({ uri: null })
            : this.setState({
                uri:
                  `${baseUrl.baseUrl}/containers/` +
                  "classebook.data.storage" +
                  "/download/" +
                  fileList[0].name +
                  `?access_token=${localStorage.token}`,
              });
        });
    }
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

  handleRequestResetPassword = () => {
    this.setState({ menuState: false, isOpenResetModal: true });
  };

  render() {
    const { handleRequestResetPassword } = this.props;
    return (
      <>
        <TableRow key={this.props.user.user.id} >
          <TableCell align="left" onClick={(e)=>this.showModalSchoolYears(e)}>
            {this.props.user.user.photo ? (
              <Avatar
                align="left"
                className="size-90"
                alt="..."
                src={this.props.user.user.photo}
              />
            ) : (
                <Avatar
                  align="left"
                  className="size-90"
                  alt="..."
                  src={defaultAvatar}
                />
              )}
          </TableCell>
          <TableCell align="left">{this.props.user.user.id}</TableCell>
          {this.props.settings.languageId == "tunisia" ? (
            <TableCell align="left">{this.props.user.user.name_ar}</TableCell>
          ) : (
              <TableCell align="left">{this.props.user.user.name}</TableCell>
            )}

          {this.props.settings.languageId == "tunisia" ? (
            <TableCell align="left">{this.props.user.user.surname_ar}</TableCell>
          ) : (
              <TableCell align="left">{this.props.user.user.surname}</TableCell>
            )}

          {(() => {
            if (this.props.roleActivate) {
              return (
                <TableCell align="left">
                  {this.getNameRole(this.props.user.role_id)}
                </TableCell>
              );
            }
          })()}

          <TableCell align="left">{this.props.user.user.email}</TableCell>
          <TableCell align="left">+{this.props.user.user.phone}</TableCell>
          <TableCell align="right">
            <IconButton onClick={this.onOptionMenuSelect.bind(this)}>
              <i className="zmdi zmdi-more-vert" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.menuState}
              onClose={this.handleRequestClose.bind(this)}
              MenuListProps={{
                style: {
                  width: 230,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            >
              <MenuItem
                onClick={(e) => {
                  this.setState({ menuState: false });

                  this.props.editUser(this.props.user.user.id);
                }}
                value={this.props.user.user.id}
              >
                {<IntlMessages id="button.modify" />}
              </MenuItem>
              <MenuItem onClick={this.handleRequestResetPassword}>
                {<IntlMessages id="button.reset.password" />}
              </MenuItem>
              <MenuItem onClick={this.handleRequestDeleteUser}>
                {<IntlMessages id="button.delete" />}
              </MenuItem>
            </Menu>
          </TableCell>
          <ResetPasswordModal
            isopen={this.state.isOpenResetModal}
            handleRequestCloseModal={this.handleRequestCloseModal}
            handleRequestResetPass={this.handleRequestResetPass}
          />
          <DeleteUserModal
            isopen={this.state.isOpenDeleteUserModal}
            handleRequestCloseModal={this.handleRequestCloseModal}
            handleDeleteUser={this.handleDeleteUser}
          />
        </TableRow>
        {this.state.isOpenResetModalSchoolYears &&
          <ModalSchoolYears
            isOpenResetModalSchoolYears={this.state.isOpenResetModalSchoolYears}
            closeModalSchoolYears={this.closeModalSchoolYears}
            historicStudent={this.state.historicStudent}
          />
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings.locale,
    };
}

export default connect(
  mapStateToProps,
  {
    deleteUser,
  }
)(componentName);
