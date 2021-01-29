import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../../util/IntlMessages';
import EditUsers from './EditUsers';
import _ from 'lodash';
import UsersListItem from './UsersListItem';
import DeleteUsersItem from './DeleteUsers';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from '../../../../../config/config';
import MenuItem from '@material-ui/core/MenuItem';

import ModalDetailsUser from './ModalDetailsUser';
const listRole = [
  // { id: 0, label: <IntlMessages id={`permission.role.all`} /> },
  { id: roleIdAdmin, label: 'Admin' },
  { id: roleIdDirector, label: 'Director' },
  { id: roleIdProfessor, label: 'Formateur' },
  { id: roleIdStudent, label: 'Participant' },
  { id: roleIdParent, label: 'Responsable formation' },
];
const fonctionList = [
  { label: "Agent d'entretien", id: 1, value: 1 },
  { label: 'Infirmière', id: 2, value: 2 },
  { label: 'Cuisinier(e)', id: 3, value: 3 },
  { label: 'Gardien', id: 4, value: 4 },
  { label: 'surveillant', id: 5, value: 5 },
  { label: 'surveillant général', id: 6, value: 6 },
];
class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      // satate for filtre
      roleIdFilter: 0,
      filterClassProfId: 0,
      filterSubjectProfId: 0,
      filterLevelStudentId: 0,
      filterClassStudentId: 0,
      usersList: {
        users: [],
        students: [],
        parents: [],
        professors: [],
        admins: [],
        directors: [],
        supervisors: [],
      },
      classStudentFilter: [],
      listGroupFilter: [],
      filterGroupStudentId: 0,
      // satate for edit
      roleItemEdit: {},
      schoolyearEdit: {},
      establishmentEdit: {},
      userNameEdit: '',
      userLastNameEdit: '',
      userGenderEdit: '',
      birthdayDateEdit: '',
      birthdayPlaceEdit: '',
      userNationnalityEdit: '',
      userMailEdit: '',
      userPhoneNumberEdit: '',
      userCinEdit: '',
      userIdentifierEdit: '',
      userAdressEdit: '',
      userZipCodeEdit: '',
      userCountryEdit: {},
      photoText: '',
      usefulInformationEdit: '',
      nameFiles: [],
      /// student state
      listParentEdit: [],
      studentClassEdit: {},
      listGroupClass: [],
      studentGroupEdit: {},
      /// prof state
      listOfSubjectsEdit: [
        {
          id: 0,
          classId: 0,
          subjectId: 0,
          subjects: [],
          isAdded: false,
        },
      ],
      // state parent
      listStudentEdit: [],
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeFilterProf = this.handleChangeFilterProf.bind(this);
    this.handleChangeFilterStudent = this.handleChangeFilterStudent.bind(this);
  }

  componentDidMount() {
    this.setState({ usersList: this.props.usersList });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.usersList !== this.props.usersList) {
      this.setState({ usersList: this.props.usersList });
    }
  }

  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false, openEdit: false, itemEdit: {} });
  }
  handleEdit(item) {
    let nameFiles = [];
    let listParentEdit = [];
    let listStudentEdit = [];
    let studentClassEdit = {};
    let listGroupClass = [];
    let studentGroupEdit = {};
    let listOfSubjectsEdit = [];
    let fonctionEdit = {};
    let schoolyearEdit = this.props.usefulData.listSchoolYears.find(
      (element) => element.id == item.schoolYearId
    );
    let establishmentEdit = this.props.usefulData.establishmentsList.find(
      (element) => element.id == item.establishmentId
    );
    let userCountryEdit = this.props.usefulData.countriesList.find(
      (element) => element.id == item.country
    );
    if (item.paperFiles == null) {
      nameFiles = [];
    } else {
      nameFiles = item.paperFiles.map((element) => element.slice(59));
    }
    if (item.roleId == roleIdStudent) {
      listParentEdit = item.inforamtionsStudent.parentsInformation.map((element) => {
        var parentItem = {};
        parentItem.label = element.parentName + ' ' + element.parentLastName;
        parentItem.id = element.parenttId;
        parentItem.value = element.parenttId;
        return parentItem;
      });
      studentClassEdit = this.props.usefulData.classForStudent.find(
        (element) => element.id == item.inforamtionsStudent.classInformation.classId
      );
      if (studentClassEdit !== undefined) {
        studentClassEdit.groups.map((element) => {
          if (element.status) {
            var object = {};
            object.label = element.name;
            object.id = element.id;
            object.value = element.id;
            listGroupClass.push(object);
          }
          if (element.status && element.id == item.inforamtionsStudent.classInformation.groupId) {
            studentGroupEdit = object;
          }
        });
      }
    }
    if (item.roleId == roleIdProfessor) {
      console.log(this.props.courseAssignment, 'this.props.courseAssignment');
      item.inforamtionsProf.map((profItem, index) => {
        let subjectsList = [];
        let subjectSelected = {};
        this.props.courseAssignment.map((element) => {
          if (element.fk_id_class_v4 === profItem.ClassId) {
            var object = {};
            object.label = element.subject.name;
            object.id = element.id;
            object.value = element.id;
            subjectsList.push(object);
            if (element.id == profItem.idAssignnement) {
              subjectSelected = object;
            }
          }
        });
        // let subjectSelected = subjectsList.find(
        //   (subjectItem) => subjectItem.id == profItem.idAssignnement
        // );
        console.log(subjectsList, 'subjectsList   subjectsList');
        listOfSubjectsEdit.push({
          id: index,
          classId: profItem.ClassId,
          subjectId: profItem.idAssignnement,
          subjects: subjectsList,
          subjectSelected: subjectSelected,
          isAdded: !index == item.inforamtionsProf.length - 1,
        });
      });
    }
    if (item.roleId == roleIdParent) {
      listStudentEdit = item.inforamtionsParent.map((element) => {
        var studentItem = {};
        studentItem.label = element.studentName + ' ' + element.studentLastName;
        studentItem.id = element.studentId;
        studentItem.value = element.studentId;
        return studentItem;
      });
    }
    if (item.roleId == roleIdSupervisor) {
      fonctionEdit = fonctionList.find((element) => element.label == item.functionName);
    }
    this.setState({
      openEdit: true,
      itemEdit: item,
      roleItemEdit: {
        id: item.roleId,
        label: item.roleName,
        value: item.roleId,
      },
      establishmentEdit,
      schoolyearEdit,
      userNameEdit: item.name,
      userLastNameEdit: item.surname,
      userGenderEdit: item.gender,
      birthdayDateEdit: item.dateOfBirth,
      birthdayPlaceEdit: item.placeOfBirth,
      userNationnalityEdit: item.nationality,
      userMailEdit: item.email,
      userPhoneNumberEdit: '+' + item.phone,
      userCinEdit: item.cin,
      userIdentifierEdit: item.uniqueIdentifier,
      userAdressEdit: item.address,
      userZipCodeEdit: item.zipCode,
      userCountryEdit,
      photoText: item.urlPhoto == null ? '' : item.urlPhoto.slice(59),
      usefulInformationEdit: item.usefulInformation,
      nameFiles,
      listParentEdit,
      studentClassEdit: studentClassEdit != undefined ? studentClassEdit : {},
      listGroupClass,
      studentGroupEdit: studentGroupEdit != undefined ? studentGroupEdit : {},
      listOfSubjectsEdit,
      listStudentEdit,
      fonctionEdit,
    });
    console.log('ediiiiiiiit', item);
  }
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  handleAnnule() {
    this.handleCancel();
  }

  handleChangeRole = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
      usersList: this.props.usersList,
      filterSubjectProfId: 0,
      filterClassProfId: 0,
      filterLevelStudentId: 0,
      filterClassStudentId: 0,
    });
  };
  handleChangeFilterProf = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    let classIdFilter = this.state.filterClassProfId;
    let subjectIdFilter = this.state.filterSubjectProfId;
    function filterClassProf(item) {
      let listClass = [];

      if (subjectIdFilter == 0) {
        if (event.target.value == 0) {
          return true;
        } else {
          listClass = item.inforamtionsProf.filter(
            (element) => element.ClassId == event.target.value
          );
        }
      } else {
        if (event.target.value == 0) {
          listClass = item.inforamtionsProf.filter(
            (element) => element.subjectId == subjectIdFilter
          );
        } else {
          listClass = item.inforamtionsProf.filter(
            (element) =>
              element.ClassId == event.target.value && element.subjectId == subjectIdFilter
          );
        }
      }
      return listClass.length > 0;
    }

    function filterSubjectProf(item) {
      let listClass = [];
      if (classIdFilter == 0) {
        if (event.target.value == 0) {
          return true;
        } else {
          listClass = item.inforamtionsProf.filter(
            (element) => element.subjectId == event.target.value
          );
        }
      } else {
        if (event.target.value == 0) {
          listClass = item.inforamtionsProf.filter((element) => element.ClassId == classIdFilter);
        } else {
          listClass = item.inforamtionsProf.filter(
            (element) => element.subjectId == event.target.value && element.ClassId == classIdFilter
          );
        }
      }
      return listClass.length > 0;
    }

    if (name === 'filterClassProfId') {
      let classFiltred = _.filter(this.props.usersList.professors, filterClassProf);
      let newUserList = { ...this.props.usersList, professors: classFiltred };
      this.setState({ usersList: newUserList });
    }
    if (name === 'filterSubjectProfId') {
      let subjectFiltred = _.filter(this.props.usersList.professors, filterSubjectProf);
      let newUserList = { ...this.props.usersList, professors: subjectFiltred };
      this.setState({ usersList: newUserList });
    }
  };
  handleToggle() {
    this.handleCancel();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.handleCancel();
  };
  handleChangeFilterStudent = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    if (name === 'filterLevelStudentId') {
      if (event.target.value == 0) {
        this.setState({
          usersList: this.props.usersList,
          filterClassStudentId: 0,
          classStudentFilter: [],
          filterGroupStudentId: 0,
          listGroupFilter: [],
        });
      } else {
        let classStudentFilter = this.props.listClassFilter.filter(
          (element) => element.levelId == event.target.value
        );
        let studentByLevel = this.props.usersList.students.filter(
          (element) => element.inforamtionsStudent.classInformation.levelId == event.target.value
        );
        let newUserList = { ...this.props.usersList, students: studentByLevel };
        this.setState({
          usersList: newUserList,
          classStudentFilter,
          filterClassStudentId: 0,
          filterGroupStudentId: 0,
          listGroupFilter: [],
        });
      }
    }
    if (name === 'filterClassStudentId') {
      this.setState({ filterGroupStudentId: 0 });
      if (event.target.value == 0) {
        this.setState({ listGroupFilter: [] });

        if (this.state.filterLevelStudentId == 0) {
          this.setState({ usersList: this.props.usersList });
        } else {
          let studentByLevel = this.props.usersList.students.filter(
            (element) =>
              element.inforamtionsStudent.classInformation.levelId ==
              this.state.filterLevelStudentId
          );
          let newUserList = { ...this.props.usersList, students: studentByLevel };
          this.setState({ usersList: newUserList });
        }
      } else {
        let studentByLevel = this.props.usersList.students.filter(
          (element) => element.inforamtionsStudent.classInformation.classId == event.target.value
        );
        let classSelected = this.state.classStudentFilter.find(
          (element) => element.id == event.target.value
        );
        let listGroupFilter;
        if (classSelected != undefined) {
          listGroupFilter = classSelected.groups.filter((element) => element.status);
        }
        let newUserList = { ...this.props.usersList, students: studentByLevel };
        this.setState({ usersList: newUserList, listGroupFilter });
      }
    }
    if (name === 'filterGroupStudentId') {
      if (event.target.value == 0) {
        let studentByClass = this.props.usersList.students.filter(
          (element) =>
            element.inforamtionsStudent.classInformation.classId == this.state.filterClassStudentId
        );
        let newUserList = { ...this.props.usersList, students: studentByClass };

        this.setState({ usersList: newUserList });
      } else {
        let studentByGroup = this.props.usersList.students.filter(
          (element) => element.inforamtionsStudent.classInformation.groupId == event.target.value
        );
        let newUserList = { ...this.props.usersList, students: studentByGroup };

        this.setState({ usersList: newUserList });
      }
    }
  };
  render() {
    const { usefulData } = this.props;

    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="users.list" />
            </b>{' '}
          </h1>
        </div>
        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          <div className="p-2 bd-highlight col-lg-2 col-md-4 col-sm-2">
            <TextField
              id="filterRoleId"
              name="filterRoleId"
              select
              value={this.state.roleIdFilter}
              onChange={this.handleChangeRole('roleIdFilter')}
              SelectProps={{}}
              label={<IntlMessages id={`stuppUser.steps.role`} />}
              InputProps={{ disableUnderline: true }}
              margin="normal"
              fullWidth
            >
              <MenuItem key={0} value={0}>
                <IntlMessages id={`permission.role.all`} />
              </MenuItem>
              {listRole.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {this.state.roleIdFilter == roleIdProfessor ? (
            <>
              <div className="p-2 bd-highlight col-lg-1 col-md-4 col-sm-2">
                <TextField
                  id="idClasse"
                  name="idClasse"
                  select
                  value={this.state.filterClassProfId}
                  onChange={this.handleChangeFilterProf('filterClassProfId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`components.note.class`} />}
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  <MenuItem key={0} value={0}>
                    <IntlMessages id={`extraPages.all`} />
                  </MenuItem>
                  {this.props.listClassFilter.map((classeItem) => (
                    <MenuItem key={classeItem.id} value={classeItem.id}>
                      {classeItem.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="p-2 bd-highlight col-lg-1 col-md-4 col-sm-2">
                <TextField
                  id="idSubject"
                  name="idSubject"
                  select
                  value={this.state.filterSubjectProfId}
                  onChange={this.handleChangeFilterProf('filterSubjectProfId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`components.note.subject`} />}
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  <MenuItem key={0} value={0}>
                    <IntlMessages id={`extraPages.all`} />
                  </MenuItem>
                  {this.props.subjects.map((subjectItem) => (
                    <MenuItem key={subjectItem.id} value={subjectItem.id}>
                      {subjectItem.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </>
          ) : (
            ''
          )}
          {this.state.roleIdFilter == roleIdStudent ? (
            <>
              <div className="p-2 bd-highlight col-lg-1 col-md-4 col-sm-2">
                <TextField
                  id="idLevel"
                  name="idLevel"
                  select
                  value={this.state.filterLevelStudentId}
                  onChange={this.handleChangeFilterStudent('filterLevelStudentId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`components.note.niveau`} />}
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  <MenuItem key={0} value={0}>
                    <IntlMessages id={`extraPages.all`} />
                  </MenuItem>
                  {this.props.levels.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="p-2 bd-highlight col-lg-1 col-md-4 col-sm-2">
                <TextField
                  id="idClasse"
                  name="idClasse"
                  select
                  value={this.state.filterClassStudentId}
                  onChange={this.handleChangeFilterStudent('filterClassStudentId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`components.note.class`} />}
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  <MenuItem key={0} value={0}>
                    <IntlMessages id={`extraPages.all`} />
                  </MenuItem>
                  {this.state.classStudentFilter.map((classeItem) => (
                    <MenuItem key={classeItem.id} value={classeItem.id}>
                      {classeItem.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {/* <div className="p-2 bd-highlight col-lg-1 col-md-4 col-sm-2">
                <TextField
                  id="idClasseStudent"
                  name="idClasseStudent"
                  select
                  value={this.state.filterGroupStudentId}
                  onChange={this.handleChangeFilterStudent('filterGroupStudentId')}
                  SelectProps={{}}
                  label={<IntlMessages id="stuppUser.formadd.groupe" />}
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  <MenuItem key={0} value={0}>
                    <IntlMessages id={`extraPages.all`} />
                  </MenuItem>
                  {this.state.listGroupFilter.map((groupItem) => (
                    <MenuItem key={groupItem.id} value={groupItem.id}>
                      {groupItem.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div> */}
            </>
          ) : (
            ''
          )}
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell align="left">
                <IntlMessages id="user.photo" />
              </TableCell>
              {/* <TableCell align="left">
                <IntlMessages id="user.id" />
              </TableCell> */}
              <TableCell align="left">
                <IntlMessages id="user.name" />
              </TableCell>
              <TableCell align="left">
                <IntlMessages id="user.last.name" />
              </TableCell>

              {this.state.roleIdFilter == 0 ? (
                <TableCell align="left">
                  <IntlMessages id="role.user" />
                </TableCell>
              ) : null}
              {/* ------------     affichage classe et matiére pour prof -------------------------------------------*/}

              {this.state.roleIdFilter == roleIdProfessor ? (
                <TableCell align="left">
                  <IntlMessages id={`components.note.subject`} />
                </TableCell>
              ) : null}
              {this.state.roleIdFilter == roleIdProfessor ? (
                <TableCell align="left">
                  <IntlMessages id={`components.note.class`} />
                </TableCell>
              ) : null}
              {/* ------------     affichage classe et parent pour student -------------------------------------------*/}
              {this.state.roleIdFilter == roleIdStudent ? (
                <TableCell align="left">
                  <IntlMessages id={`components.note.class`} />
                </TableCell>
              ) : null}
              {this.state.roleIdFilter == roleIdStudent ? (
                <TableCell align="left">Parent</TableCell>
              ) : null}
              {/* ------------     affichage enfant et classe pour parent -------------------------------------------*/}
              {this.state.roleIdFilter == roleIdParent ? (
                <TableCell align="left">
                  <TableCell align="left">enfant </TableCell>
                </TableCell>
              ) : null}
              {this.state.roleIdFilter == roleIdParent ? (
                <TableCell align="left">
                  {' '}
                  <IntlMessages id={`components.note.class`} />
                </TableCell>
              ) : null}
              {/* ------------     éliminer colonne email  -------------------------------------------*/}

              {this.state.roleIdFilter == roleIdAdmin ||
              this.state.roleIdFilter == roleIdDirector ||
              this.state.roleIdFilter == roleIdSupervisor ||
              this.state.roleIdFilter == 0 ? (
                <TableCell>
                  <IntlMessages id="user.mail" />
                </TableCell>
              ) : null}

              <TableCell>
                <IntlMessages id="user.phone.number" />
              </TableCell>
              <TableCell align="center">
                <IntlMessages id="user.options" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.roleIdFilter == roleIdAdmin || this.state.roleIdFilter == 0 ? (
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-admin',
                      permissionList: this.props.permissionList,
                    }}
                    yes={() =>
                      this.state.usersList.admins.map((element) => {
                        return (
                          <UsersListItem
                            user={element}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            archived={false}
                            roleIdFilter={this.state.roleIdFilter}
                          />
                        );
                      })
                    }
                  />
                )}
              </RoleContext.Consumer>
            ) : (
              ''
            )}
            {this.state.roleIdFilter == roleIdSupervisor || this.state.roleIdFilter == 0 ? (
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-school-life',
                      permissionList: this.props.permissionList,
                    }}
                    yes={() =>
                      this.state.usersList.supervisors.map((element) => {
                        return (
                          <UsersListItem
                            user={element}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            archived={false}
                            roleIdFilter={this.state.roleIdFilter}
                          />
                        );
                      })
                    }
                  />
                )}
              </RoleContext.Consumer>
            ) : (
              ''
            )}
            {this.state.roleIdFilter == roleIdDirector || this.state.roleIdFilter == 0 ? (
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-direction-membre',
                      permissionList: this.props.permissionList,
                    }}
                    yes={() =>
                      this.state.usersList.directors.map((element) => {
                        return (
                          <UsersListItem
                            user={element}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            archived={false}
                            roleIdFilter={this.state.roleIdFilter}
                          />
                        );
                      })
                    }
                  />
                )}
              </RoleContext.Consumer>
            ) : (
              ''
            )}
            {this.state.roleIdFilter == roleIdProfessor || this.state.roleIdFilter == 0 ? (
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-prof',
                      permissionList: this.props.permissionList,
                    }}
                    yes={() =>
                      this.state.usersList.professors.map((element) => {
                        return (
                          <UsersListItem
                            user={element}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            archived={false}
                            roleIdFilter={this.state.roleIdFilter}
                          />
                        );
                      })
                    }
                  />
                )}
              </RoleContext.Consumer>
            ) : (
              ''
            )}
            {this.state.roleIdFilter == roleIdParent || this.state.roleIdFilter == 0 ? (
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-parent',
                      permissionList: this.props.permissionList,
                    }}
                    yes={() =>
                      this.state.usersList.parents.map((element) => {
                        return (
                          <UsersListItem
                            roleIdFilter={this.state.roleIdFilter}
                            user={element}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            archived={false}
                          />
                        );
                      })
                    }
                  />
                )}
              </RoleContext.Consumer>
            ) : (
              ''
            )}
            {this.state.roleIdFilter == roleIdStudent || this.state.roleIdFilter == 0 ? (
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-student',
                      permissionList: this.props.permissionList,
                    }}
                    yes={() =>
                      this.state.usersList.students.map((element) => {
                        return (
                          <UsersListItem
                            roleIdFilter={this.state.roleIdFilter}
                            user={element}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            archived={false}
                          />
                        );
                      })
                    }
                  />
                )}
              </RoleContext.Consumer>
            ) : (
              ''
            )}
          </TableBody>
        </Table>
        {this.state.openEdit ? (
          <EditUsers
            usefulData={usefulData}
            schoolSession={this.state.item}
            closeModal={this.handleCancel}
            values={this.state}
            handleAnnule={this.handleAnnule}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
            handleChangeDateStart={this.handleChangeDateStart}
            handleChangeDateEnd={this.handleChangeDateEnd}
            handleChangeStartDate={this.handleChangeStartDate}
            handleChangeEndDate={this.handleChangeEndDate}
            educationTypes={this.props.educationTypes}
            handleChangeEducationType={this.handleChangeEducationType}
          />
        ) : (
          ''
        )}

        {this.state.deleteIsopen === true ? (
          <DeleteUsersItem
            handleDeleteSchoolSession={this.handleDeleteSchoolSession}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subjects: state.subject.subjects,
    levels: state.levelsReducer.levels,
    courseAssignment: state.AssignementReducer.courseAssignment,
  };
}

export default connect(mapStateToProps, {})(UsersList);
