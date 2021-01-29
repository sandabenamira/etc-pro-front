import React, { Component } from "react";
import AddUser from "./AddUser";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../../util/IntlMessages";
import Input from "@material-ui/icons/Input";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import UserList from "./UsersList";
import EditUser from "./EditUser";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../../../actions/stuppUserAction";
import { getAllUsersByEstablishmentId } from "../../../../../actions/stuppUserAction";
import { UncontrolledAlert } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import baseUrl from "../../../../../config/config";
import {
  getClassesByEstablishmentId,
  getClasses,
} from "../../../../../actions/classeAction";
import { roleIdProfessor, roleIdStudent } from "../../../../../config/config";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import { getEstablishment } from "../../../../../actions/establishmentAction";
import { getNameRole } from "../../../../../actions/countriesAction";
import { fetchClassesSubjects } from "../../../../../actions/subjectAction";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      edit: false,
      editAlert: false,
      roleList: [],
      role_id: "",
      class_id: "",
      classes: [],
      enableClassFilter: true,
      studentListByClass: [],
      professorListByClass: [],
      usersList: [],
      establishment_id: "",
      establishments: [],
      openModalImport: false,
      roleActivate: true,
      establishmentName: "",
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.editUser = this.editUser.bind(this);
    this.editAlert = this.editAlert.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeEstablishment = this.handleChangeEstablishment.bind(this);
    this.openModalImportExcel = this.openModalImportExcel.bind(this);
    this.handleCancelImport = this.handleCancelImport.bind(this);
  }

  handleCancelImport() {
    this.setState({ openModalImport: false });
  }

  handleChangeEstablishment = (name) => (event) => {
    this.setState({ [name]: event.target.value, role_id: "", class_id: "" });
  };

  handleChangeClass = (name) => (event) => {
    if (this.state.role_id === roleIdStudent) {
      var listStudent = [];
      if (this.state.establishment_id) {
        listStudent = this.state.usersList.filter(
          (element) =>
            element.role_id === roleIdStudent &&
            element.students[0].class_id == event.target.value &&
            element.establishment_id === this.state.establishment_id
        );
      } else {
        listStudent = this.state.usersList.filter(
          (element) =>
            element.role_id === roleIdStudent &&
            element.students[0].class_id == event.target.value
        );
      }
      this.setState({
        studentListByClass: listStudent,
        [name]: event.target.value,
      });
    } else if (this.state.role_id === roleIdProfessor) {
      axios
        .get(
          `${baseUrl.baseUrl}/classes_professors?access_token=${localStorage.token}`
        )
        .then((res) => {
          var final = [];
          var listprofessor = [];
          if (this.state.establishment_id) {
            listprofessor = this.state.usersList.filter(
              (element) =>
                element.role_id === roleIdProfessor &&
                element.establishment_id === this.state.establishment_id
            );
          } else {
            listprofessor = this.state.usersList.filter(
              (element) => element.role_id === roleIdProfessor
            );
          }
          listprofessor.forEach((professor) =>
            res.data.forEach((classProfessor) => {
              if (
                professor.professors[0].id === classProfessor.professor_id &&
                classProfessor.class_id === event.target.value
              ) {
                final.push(professor);
              }
            })
          );
          this.setState({
            [name]: event.target.value,
            studentListByClass: final,
          });
        });
    }
  };
  handleChangeRole = (name) => (event) => {
    let userFiltred;
    let userFiltredRole;
    if (event.target.value === "0") {
      this.setState({ roleActivate: true });
    } else {
      this.setState({ roleActivate: false });
    }
    if (this.state.establishment_id) {
      if (
        event.target.value === roleIdStudent ||
        event.target.value === roleIdProfessor
      ) {
        let classeFiltred = this.props.classes.filter(
          (element) => element.establishment_id === this.state.establishment_id
        );
        this.setState({ enableClassFilter: false, classes: classeFiltred });
      } else {
        this.setState({ enableClassFilter: true });
      }
      if (event.target.value == 0) {
        userFiltred = this.state.usersList.filter(
          (element) => element.establishment_id == this.state.establishment_id
        );
      } else {
        userFiltred = this.state.usersList.filter(
          (element) =>
            element.role_id == event.target.value &&
            element.establishment_id == this.state.establishment_id
        );
      }

      this.setState({
        [name]: event.target.value,
        studentListByClass: userFiltred,
        class_id: "",
      });
    } else {
      if (event.target.value === roleIdStudent) {
        userFiltredRole = this.state.usersList.filter(
          (element) => element.role_id == event.target.value
        );
        this.setState({
          studentListByClass: userFiltredRole,
          [name]: event.target.value,
          class_id: "",
          enableClassFilter: false,
        });
      } else if (event.target.value === roleIdProfessor) {
        userFiltredRole = this.state.usersList.filter(
          (element) => element.role_id == event.target.value
        );
        this.setState({
          studentListByClass: userFiltredRole,
          enableClassFilter: false,
          [name]: event.target.value,
          class_id: "",
        });
      } else {
        userFiltredRole = this.state.usersList.filter(
          (element) => element.role_id == event.target.value
        );
        this.setState({
          [name]: event.target.value,
          enableClassFilter: true,
          steps: event.target.value,
          studentListByClass: userFiltredRole,
          class_id: "",
        });
      }
    }
  };

  openAddModal() {
    this.setState({
      open: true,
    });
  }

  openModalImportExcel() {
    this.setState({
      openModalImport: true,
    });
  }

  editUser(id) {
    let user = this.props.users.find(function(element) {
      return element.user.id === id;
    });
    this.setState({ user: user, edit: true });
  }
  cancelModal() {
    this.setState({ open: false, edit: false });
  }
  editAlert() {
    this.setState({ edit: false, editAlert: true });
    setTimeout(
      function() {
        this.setState({ editAlert: true });
      }.bind(this),
      1000
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        usersList: this.props.users,
        role_id: "",
        class_id: "",
      });
    }
    if (prevProps.classes !== this.props.classes) {
      this.setState({
        classes: this.props.classes,
      });
    }
    if (prevProps.establishments !== this.props.establishments) {
      this.setState({
        establishments: this.props.establishments,
      });
    }
  }
  UNSAFE_componentWillMount() {
    if (this.props.userProfile.role_id === 1) {
      this.props.fetchAllUsers();
      this.props.getEstablishment();
      this.props.getClasses();
      axios
        .get(`${baseUrl.baseUrl}/roles?access_token=${localStorage.token}`)
        .then((res) => {
          this.setState({ roleList: res.data });
        });
    } else {
      this.props.fetchClassesSubjects(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      );
      this.props.getClassesByEstablishmentId(
        this.props.userProfile.establishment_id
      );
      this.props.getAllUsersByEstablishmentId(
        this.props.userProfile.establishment_id
      );
      axios
        .get(`${baseUrl.baseUrl}/roles?access_token=${localStorage.token}`)
        .then((res) => {
          let data = res.data;
          const roleList = data.filter((element) => element.id !== 1);
          this.setState({ roleList });
        });
    }
    axios
      .get(
        `${baseUrl.baseUrl}/establishments/` +
          this.props.userProfile.establishment_id +
          `?access_token=${localStorage.token}`
      )
      .then((res) => {
        const establishmentName = res.data.name;

        this.setState({ establishmentName });
      });
  }

  render() {
    return (
      <div>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="pages.stuppUserPage" />}
        />
        {this.props.successStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message}</span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {this.props.warningStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-warning bg-warning text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message}</span>
          </UncontrolledAlert>
        ) : (
          ""
        )}

        {this.state.editAlert ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {<IntlMessages id="edit.user.message" />}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="user-filter:visit"
              yes={() => (
                <div className="col-md-12  d-flex justify-content-between">
                  <Can
                    role={role}
                    perform="user-filter-establishment:visit"
                    yes={() => (
                      <div className="col-md-2 text-left">
                        <TextField
                          className="mt-0"
                          variant="outlined"
                          required
                          name="establishment_id"
                          id="establishment_id"
                          select
                          label={
                            <IntlMessages id="components.student.formadd.establishment" />
                          }
                          value={this.state.establishment_id}
                          onChange={this.handleChangeEstablishment(
                            "establishment_id"
                          )}
                          SelectProps={{}}
                          margin="normal"
                          fullWidth
                        >
                          {this.state.establishments.map((establishment) => (
                            <MenuItem
                              key={establishment.id}
                              value={establishment.id}
                            >
                              {this.props.settings == "tunisia"
                                ? establishment.ar_name
                                : establishment.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    )}
                  />
                  <div className="col-md-4 text-left ">
                    <TextField
                      className="mt-0"
                      variant="outlined"
                      required
                      name="role_id"
                      id="role_id"
                      select
                      label={<IntlMessages id="stuppUser.formadd.role" />}
                      value={this.state.role_id}
                      onChange={this.handleChangeRole("role_id")}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      <MenuItem key="0" value="0">
                        <IntlMessages id="all.user" />
                      </MenuItem>
                      {this.state.roleList.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {getNameRole(role.id, this.props.settings)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="col-md-4 text-left ">
                    <TextField
                      disabled={this.state.enableClassFilter}
                      className="mt-0"
                      variant="outlined"
                      required
                      name="class_id"
                      id="class_id"
                      select
                      label={<IntlMessages id="ticket.name.class" />}
                      value={this.state.class_id}
                      onChange={this.handleChangeClass("class_id")}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {this.state.classes.map((classe) => (
                        <MenuItem key={classe.id} value={classe.id}>
                          {classe.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="col-md-2 text-right ">
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="Add"
                      onClick={this.openAddModal}
                    >
                      <AddIcon />
                    </Fab>
                    &nbsp;&nbsp;&nbsp;
                    <Fab
                      size="small"
                      color="primary"
                      onClick={this.openModalImportExcel}
                    >
                      <Input />
                    </Fab>
                  </div>
                </div>
              )}
            />
          )}
        </RoleContext.Consumer>
        <div className="col-md-12 text-right ">
          {this.props.users ? (
            <UserList
              role_id={this.state.role_id}
              users={this.props.users}
              role={this.props.userProfile.role_id}
              editUser={this.editUser}
              studentListByClass={this.state.studentListByClass}
              establishment_id={this.state.establishment_id}
              roleActivate={this.state.roleActivate}
              establishmentName={this.state.establishmentName}
            />
          ) : (
            ""
          )}
        </div>

        <AddUser
          open={this.state.open}
          cancel={this.cancelModal}
          openModalImport={this.state.openModalImport}
          cancelModalImport={this.handleCancelImport}
          classesSubjects={this.props.classesSubjects}
        />
        {this.state.edit ? (
          <EditUser
            edit={this.state.edit}
            user={this.state.user}
            cancel={this.cancelModal}
            editAlert={this.editAlert}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.stuppUsers.remoteStuppUsers,
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    classes: state.classes,
    establishments: state.establishment.remoteEstablishments,
    settings: state.settings.locale.languageId,
    warningStatus: state.alert.warning,
    classesSubjects: state.subject.classesSubjects,
  };
}
export default connect(mapStateToProps, {
  fetchAllUsers,
  getAllUsersByEstablishmentId,
  getClassesByEstablishmentId,
  getEstablishment,
  getClasses,
  fetchClassesSubjects,
})(User);
