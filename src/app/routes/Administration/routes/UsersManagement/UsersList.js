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
import { toUpperCaseFirst } from '../../../../../constants/ReactConst';
import { editUser } from '../../../../../actions/usersAction';
import { getAllUsersForAdmin } from '../../../../../actions/usersAction';
const fonctionList = [
  { label: "Agent d'entretien", id: 1, value: 1 },
  { label: 'Infirmière', id: 2, value: 2 },
  { label: 'Cuisinier(e)', id: 3, value: 3 },
  { label: 'Gardien', id: 4, value: 4 },
  { label: 'surveillant', id: 5, value: 5 },
  { label: 'surveillant général', id: 6, value: 6 },
];
 /* eslint  array-callback-return: "off" */
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
      userPapiersFiles: [],
      userPhoto: '',
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
      subjectIdSelected: [],
      oldProfAssignments: [],
      // state parent
      listStudentEdit: [],
      /// vie scolaire states
      fonctionEdit: '',
      // counter user
      userCount: '',
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeFilterProf = this.handleChangeFilterProf.bind(this);
    this.handleChangeFilterStudent = this.handleChangeFilterStudent.bind(this);
    this.handleChangeClassRoom = this.handleChangeClassRoom.bind(this);
    this.addNewSubject = this.addNewSubject.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBirthdayDate = this.handleChangeBirthdayDate.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeCountries = this.handleChangeCountries.bind(this);
    this.handleChangeParent = this.handleChangeParent.bind(this);
    this.handleChangeStudentClass = this.handleChangeStudentClass.bind(this);
    this.handleChangeGroupClassRoom = this.handleChangeGroupClassRoom.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.attachFile = this.attachFile.bind(this);
    this.handleChangeFunctions = this.handleChangeFunctions.bind(this);
    this.handleChangeStudent = this.handleChangeStudent.bind(this);
    this.handleChangeFilterSuperAdmin = this.handleChangeFilterSuperAdmin.bind(this);
  }
  handleChangeStudent = (selectedOption) => {
    let listStudentEdit = [];
    if (selectedOption != null) {
      listStudentEdit = selectedOption.map((element) => element);
    } else {
      this.setState({
        listStudentEdit: [],
      });
    }
    this.setState({ listStudentEdit });
  };
  handleChangeFunctions = (selectedOption) => {
    this.setState({ fonctionEdit: selectedOption });
  };
  attachFile(e) {
    var oldFiles = this.state.userPapiersFiles;

    var nameFiles = this.state.nameFiles;
    if (e.target.files !== undefined) {
      var files = Object.values(e.target.files);
      if (this.state.nameFiles.length + files.length < 6) {
        files.map((element) => {
          nameFiles.push(element.name);
          oldFiles.push(element);
        });
        this.setState({ userPapiersFiles: oldFiles, nameFiles });
      } else {
        this.setState({
          messageAlerte: 'vous avez dépasser 5 fichiers',
          alerteStatus: true,
        });
        setTimeout(() => {
          this.setState({ messageAlerte: '', alerteStatus: false });
        }, 4000);
      }
    }
  }
  handleChangeGroupClassRoom = (selectedOption) => {
    this.setState({ studentGroupEdit: selectedOption });
  };
  handleChangeStudentClass = (selectedOption) => {
    let listGroupClass = [];
    selectedOption.groups.map((element) => {
      if (element.status) {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        listGroupClass.push(object);
      }
    });
    this.setState({
      studentClassEdit: selectedOption,
      listGroupClass,
      studentGroupEdit: {},
    });
  };
  handleChangeParent = (selectedOption) => {
    let listParentEdit = [];
    if (selectedOption != null) {
      listParentEdit = selectedOption.map((element) => element);
    } else {
      this.setState({
        listParentEdit: [],
      });
    }
    this.setState({ listParentEdit });
  };
  handleChangeCountries = (selectedOption) => {
    this.setState({ userCountryEdit: selectedOption });
  };
  handleChangePhone = (value) => {
    this.setState({ userPhoneNumberEdit: value });
  };
  handleChangeBirthdayDate = (date) => {
    this.setState({ birthdayDateEdit: date });
  };
  handleChangeClassRoom = (selectedOption, name, index) => {
    if (name === 'classId') {
      let subjectIdSelected = this.state.listOfSubjectsEdit.map((element) => element.subjectId);
      this.setState({ subjectIdSelected });
      let subjectsList = [];
      this.props.courseAssignment.map((element) => {
        if (element.fk_id_class_v4 === selectedOption.id) {
          var object = {};
          object.label = element.subject.name;
          object.id = element.id;
          object.value = element.id;
          subjectsList.push(object);
        }
      });
      let newListSubjects = this.state.listOfSubjectsEdit.map((objSubject, i) =>
        i === index
          ? {
              ...objSubject,
              [name]: selectedOption.value,
              subjects: subjectsList,
            }
          : objSubject
      );
      this.setState({ listOfSubjectsEdit: newListSubjects });
    } else if (name === 'subjectId') {
      let subjectIdSelected = [selectedOption.value];
      this.state.listOfSubjectsEdit.map((element) => {
        if (element.id != index) {
          subjectIdSelected.push(element.subjectId);
        }
      });
      this.setState({ subjectIdSelected });
      let newListSubjects = this.state.listOfSubjectsEdit.map((objSubject, i) =>
        i === index ? { ...objSubject, [name]: selectedOption.value } : objSubject
      );
      this.setState({ listOfSubjectsEdit: newListSubjects });
    }
  };
  addNewSubject = (index) => {
    let listOfSubjectsEdit = [];
    this.state.listOfSubjectsEdit.map((element) => {
      listOfSubjectsEdit.push({
        id: element.id,
        classId: element.classId,
        subjectId: element.subjectId,
        subjects: element.subjects,
        isAdded: true,
      });
    });
    listOfSubjectsEdit.push({
      id: index,
      classId: 0,
      subjectId: 0,
      subjects: [],
      isAdded: false,
    });

    this.setState({ listOfSubjectsEdit });
  };
  deleteChoice = (index) => {
    let subjectIdSelected = [];
    this.state.listOfSubjectsEdit.map((element) => {
      if (element.id != index) {
        subjectIdSelected.push(element.subjectId);
      }
    });
    let listOfSubjectsEditClasses = [];
    let newIndex = 0;

    this.state.listOfSubjectsEdit.map((element) => {
      if (element.id !== index) {
        listOfSubjectsEditClasses.push({ ...element, id: newIndex });
        newIndex++;
      }
    });
    this.setState({
      listOfSubjectsEdit: listOfSubjectsEditClasses,
      subjectIdSelected,
    });
  };

  componentDidMount() {
    this.setState({ usersList: this.props.usersList });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.usersList !== this.props.usersList) {
      this.setState({
        usersList: this.props.usersList,
      });
    }
  }

  handleCancel() {
    this.setState({
      isOpen: false,
      deleteIsopen: false,
      openEdit: false,
      itemEdit: {},
    });
  }
  handleEdit(item) {
    // console.log('-----------+++++++++', item);
    let fileNamesEdit = [];
    let listParentEdit = [];
    let listStudentEdit = [];
    let studentClassEdit = {};
    let listGroupClass = [];
    let studentGroupEdit = {};
    let listOfSubjectsEdit = [];
    let fonctionEdit = {};
    let subjectIdSelected = [];

    let schoolyearEdit = this.props.usefulData.listSchoolYears.find((element) => element.id===item.schoolYearId);
    let establishmentEdit = this.props.usefulData.establishmentsList.find((element) => element.id===item.establishmentId);
    let userCountryEdit = this.props.usefulData.countriesList.find((element) => element.id===item.country);
    if (item.paperFiles===null) {
      fileNamesEdit = [];
    } else {
      fileNamesEdit = item.paperFiles.map((element) => element.slice(59));
    }
    if (item.roleId===roleIdStudent) {
      listParentEdit = item.parentId.map((element) => {
        var parentItem = {};
        parentItem.label = element.parentName + ' ' + element.parentLastName;
        parentItem.id = element.parenttId;
        parentItem.value = element.parenttId;
        return parentItem;
      });
      // studentClassEdit = this.props.usefulData.classForStudent.find((element) => element.id===item.inforamtionsStudent.classInformation.classId);
      // if (studentClassEdit !== undefined) {
      //   studentClassEdit.groups.map((element) => {
      //     if (element.status) {
      //       var object = {};
      //       object.label = element.name;
      //       object.id = element.id;
      //       object.value = element.id;
      //       listGroupClass.push(object);
      //     }
      //     if (element.status && element.id===item.inforamtionsStudent.classInformation.groupId) {
      //       studentGroupEdit = object;
      //     }
      //   });
      // }
    }
    if (item.roleId===roleIdProfessor) {
      item.inforamtionsProf.map((profItem, index) => {
        let subjectsList = [];
        this.props.courseAssignment.map((element) => {
          if (element.fk_id_class_v4 === profItem.ClassId) {
            var object = {};
            object.label = element.subject.name;
            object.id = element.id;
            object.value = element.id;
            subjectsList.push(object);
          }
        });
        subjectIdSelected.push(profItem.idAssignnement);
        listOfSubjectsEdit.push({
          id: index,
          classId: profItem.ClassId,
          subjectId: profItem.idAssignnement,
          subjects: subjectsList,
          isAdded: !index===item.inforamtionsProf.length - 1,
        });
      });
    }
    if (item.roleId===roleIdParent) {
      listStudentEdit = item.inforamtionsParent.map((element) => {
        var studentItem = {};
        studentItem.label = element.studentName + ' ' + element.studentLastName;
        studentItem.id = element.studentId;
        studentItem.value = element.studentId;
        return studentItem;
      });
    }
    if (item.roleId===roleIdSupervisor) {
      fonctionEdit = fonctionList.find((element) => element.label===item.functionName);
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
      userPhoneNumberEdit: item.phone===null ? '' : '+' + item.phone,
      userCinEdit: item.cin,
      userIdentifierEdit: item.uniqueIdentifier,
      userAdressEdit: item.address,
      userZipCodeEdit: item.zipCode,
      userCountryEdit: userCountryEdit===undefined ? {} : userCountryEdit,
      photoText: item.urlPhoto===null ? '' : item.urlPhoto.slice(59),
      usefulInformationEdit: item.usefulInformation,
      nameFiles: fileNamesEdit,
      listParentEdit,
      studentClassEdit: studentClassEdit != undefined ? studentClassEdit : {},
      listGroupClass,
      studentGroupEdit: studentGroupEdit != undefined ? studentGroupEdit : {},
      listOfSubjectsEdit,
      listStudentEdit,
      fonctionEdit,
      subjectIdSelected,
      oldProfAssignments: subjectIdSelected,
    });
  }
  handleToggle() {
    this.setState({
      openEdit: false,
      itemEdit: {},
      userPapiersFiles: [],
      userPhoto: '',
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
      subjectIdSelected: [],
      oldProfAssignments: [],
      // state parent
      listStudentEdit: [],
      /// vie scolaire states
      fonctionEdit: '',
    });
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

      if (subjectIdFilter===0) {
        if (event.target.value===0) {
          return true;
        } else {
          listClass = item.inforamtionsProf.filter((element) => element.ClassId===event.target.value);
        }
      } else {
        if (event.target.value===0) {
          listClass = item.inforamtionsProf.filter((element) => element.subjectId===subjectIdFilter);
        } else {
          listClass = item.inforamtionsProf.filter((element) => element.ClassId===event.target.value && element.subjectId===subjectIdFilter);
        }
      }
      return listClass.length > 0;
    }

    function filterSubjectProf(item) {
      let listClass = [];
      if (classIdFilter===0) {
        if (event.target.value===0) {
          return true;
        } else {
          listClass = item.inforamtionsProf.filter((element) => element.subjectId===event.target.value);
        }
      } else {
        if (event.target.value===0) {
          listClass = item.inforamtionsProf.filter((element) => element.ClassId===classIdFilter);
        } else {
          listClass = item.inforamtionsProf.filter((element) => element.subjectId===event.target.value && element.ClassId===classIdFilter);
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
  uploadPhoto = (e) => {
    if (e.target.files[0] !== undefined) {
      let file = e.target.files[0];
      this.setState({ userPhoto: file, photoText: file.name });
    } else {
      this.setState({
        messageAlerte: "Vous n'avez pas choisir une photo",
        alerteFiltre: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: '', alerteFiltre: false });
      }, 4000);
    }
  };
  handleSubmitEdit(event) {
    event.preventDefault();
    let data = {
      id: this.state.itemEdit.id,
      name: this.state.userNameEdit.toUpperCase(),
      surname: toUpperCaseFirst(this.state.userLastNameEdit),
      gender: this.state.userGenderEdit,
      dateOfBirth: this.state.birthdayDateEdit,
      placeOfBirth: this.state.birthdayPlaceEdit,
      address: this.state.userAdressEdit,
      nationality: this.state.userNationnalityEdit,
      phone: this.state.userPhoneNumberEdit,
      cin: this.state.userCinEdit,
      zipCode: this.state.userZipCodeEdit,
      country: this.state.userCountryEdit.id===undefined ? null : this.state.userCountryEdit.id,
      userPhoto: this.state.userPhoto,
      paperFiles: this.state.userPapiersFiles,
      oldPaperFiles: this.state.itemEdit.paperFiles,
      name_ar: '',
      surname_ar: '',
      email: this.state.userMailEdit,
      functionName: this.state.fonctionEdit.label===undefined ? '' : this.state.fonctionEdit.label,
      usefulInformation: this.state.usefulInformationEdit,
      uniqueIdentifier: this.state.userIdentifierEdit,
    };
    // ****************** specific data for prof ***************************

    if (this.state.roleItemEdit.id === roleIdProfessor) {
      data.oldAssignment = this.state.oldProfAssignments;

      let newAssignment = [];
      this.state.listOfSubjectsEdit.map((element) => {
        if (element.subjectId != 0) {
          newAssignment.push(element.subjectId);
        }
      });
      data.newAssignment = newAssignment;
    }
    // ****************** specific data for student ***************************
    if (this.state.roleItemEdit.id === roleIdStudent) {
      data.classId = this.state.studentClassEdit.id === undefined ? null : this.state.studentClassEdit.id;
      data.levelId = this.state.studentClassEdit.levelId === undefined ? null : this.state.studentClassEdit.levelId;
      data.sectionId = this.state.studentClassEdit.sectionId === undefined ? null : this.state.studentClassEdit.sectionId;
      data.groupId = this.state.studentGroupEdit.id === undefined ? null : this.state.studentGroupEdit.id;
      data.parentsId = this.state.listParentEdit.map((element) => element.id);
    }
    // ****************** specific data for Parent ***************************
    if (this.state.roleItemEdit.id === roleIdParent) {
      data.studentsId = this.state.listStudentEdit.map((element) => element.id);
    }
    this.props.editUser(data, this.props.userProfile.establishment_id, this.props.userProfile.school_year_id);
    this.handleToggle();
  }
  handleChangeFilterStudent = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    if (name === 'filterLevelStudentId') {
      if (event.target.value===0) {
        this.setState({
          usersList: this.props.usersList,
          filterClassStudentId: 0,
          classStudentFilter: [],
          filterGroupStudentId: 0,
          listGroupFilter: [],
        });
      } else {
        let classStudentFilter = this.props.listClassFilter.filter((element) => element.levelId===event.target.value);
        let studentByLevel = this.props.usersList.students.filter((element) =>
          element.inforamtionsStudent.some((classItem) => classItem.levelId===event.target.value)
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
      if (event.target.value===0) {
        if (this.state.filterLevelStudentId===0) {
          this.setState({ usersList: this.props.usersList });
        } else {
          let studentByLevel = this.props.usersList.students.filter((element) =>
            element.inforamtionsStudent.some((classItem) => classItem.levelId===this.state.filterLevelStudentId)
          );
          let newUserList = {
            ...this.props.usersList,
            students: studentByLevel,
          };
          this.setState({ usersList: newUserList });
        }
      } else {
        let studentByClass = this.props.usersList.students.filter((element) =>
          element.inforamtionsStudent.some((classItem) => classItem.classId===event.target.value)
        );

        let newUserList = { ...this.props.usersList, students: studentByClass };
        this.setState({ usersList: newUserList });
      }
    }
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeFilterSuperAdmin = (name) => (event) => {
    this.props.getAllUsersForAdmin(event.target.value, this.props.userProfile.school_year_id);
  };
  render() {   /* eslint eqeqeq: "off" */
    const { usefulData } = this.props;

    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="users.list" />
              {this.state.roleIdFilter===0
                ? '(' + this.props.usersList.users.length + ')'
                : this.state.roleIdFilter===roleIdAdmin
                ? '(' + this.props.usersList.admins.length + ')'
                : this.state.roleIdFilter===roleIdDirector
                ? '(' + this.props.usersList.directors.length + ')'
                : this.state.roleIdFilter===roleIdProfessor
                ? '(' + this.props.usersList.professors.length + ')'
                : this.state.roleIdFilter===roleIdStudent
                ? '(' + this.props.usersList.students.length + ')'
                : this.state.roleIdFilter===roleIdParent
                ? '(' + this.props.usersList.parents.length + ')'
                : this.state.roleIdFilter===roleIdSupervisor
                ? '(' + this.props.usersList.supervisors.length + ')'
                : ''}
            </b>{' '}
          </h1>
        </div>
        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}
          {this.props.userProfile.role_id === roleIdSuperAdmin ? (
            <div className="p-2 bd-highlight col-lg-2 col-md-4 col-sm-2">
              <TextField
                id="filterRoleId"
                name="filterRoleId"
                select
                // value={this.state.roleIdFilter}
                onChange={this.handleChangeFilterSuperAdmin('name')}
                SelectProps={{}}
                label={<IntlMessages id={`list.schools`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {this.props.establishments.map((establishment) => (
                  <MenuItem key={establishment.id} value={establishment.id}>
                    {establishment.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          ) : (
            ''
          )}
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
              {this.props.listRolesUsers.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {this.state.roleIdFilter===roleIdProfessor ? (
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
          {this.state.roleIdFilter===roleIdStudent ? (
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
              <TableCell align="left">
                <IntlMessages id="user.name" />
              </TableCell>
              <TableCell align="left">
                <IntlMessages id="user.last.name" />
              </TableCell>

              {this.state.roleIdFilter===0 ? (
                <TableCell align="left">
                  <IntlMessages id="role.user" />
                </TableCell>
              ) : null}
              {/* ------------     affichage classe et matiére pour prof -------------------------------------------*/}

              {this.state.roleIdFilter===roleIdProfessor ? (
                <TableCell align="left">
                  <IntlMessages id={`components.note.subject`} />
                </TableCell>
              ) : null}
              {this.state.roleIdFilter===roleIdProfessor ? (
                <TableCell align="left">
                  <IntlMessages id={`components.note.class`} />
                </TableCell>
              ) : null}
              {/* ------------     affichage classe et parent pour student -------------------------------------------*/}
              {this.state.roleIdFilter===roleIdStudent ? <TableCell align="left">Agence</TableCell> : null}
              {this.state.roleIdFilter===roleIdStudent ? <TableCell align="left">Chef d'agence</TableCell> : null}
              {this.state.roleIdFilter===roleIdStudent ? (
                <TableCell align="left">
                  <IntlMessages id={`components.note.class`} />
                </TableCell>
              ) : null}
              {/* ------------     affichage enfant et classe pour parent -------------------------------------------*/}

              {this.state.roleIdFilter===roleIdParent ? <TableCell align="left">Agence</TableCell> : null}
              {this.state.roleIdFilter===roleIdParent ? (
                <TableCell align="left">
                  <TableCell align="left">Collaborateurs </TableCell>
                </TableCell>
              ) : null}
              {/* ------------     éliminer colonne email  -------------------------------------------*/}

              {this.state.roleIdFilter===roleIdAdmin ||
              this.state.roleIdFilter===roleIdDirector ||
              this.state.roleIdFilter===roleIdSupervisor ||
              this.state.roleIdFilter===0 ? (
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
            {this.props.userProfile.role_id === roleIdSuperAdmin
              ? this.state.usersList.users.map((element) => {
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
              : ''}

            {this.state.roleIdFilter===roleIdAdmin || this.state.roleIdFilter===0 ? (
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
            {this.state.roleIdFilter===roleIdSupervisor || this.state.roleIdFilter===0 ? (
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
            {this.state.roleIdFilter===roleIdDirector || this.state.roleIdFilter===0 ? (
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
            {this.state.roleIdFilter===roleIdProfessor || this.state.roleIdFilter===0 ? (
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
            {this.state.roleIdFilter===roleIdParent || this.state.roleIdFilter===0 ? (
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
            {this.state.roleIdFilter===roleIdStudent || this.state.roleIdFilter===0 ? (
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
            handleSubmitEdit={this.handleSubmitEdit}
            handleToggle={this.handleToggle}
            handleChangeDateStart={this.handleChangeDateStart}
            handleChangeDateEnd={this.handleChangeDateEnd}
            handleChangeStartDate={this.handleChangeStartDate}
            handleChangeEndDate={this.handleChangeEndDate}
            educationTypes={this.props.educationTypes}
            handleChangeEducationType={this.handleChangeEducationType}
            addNewSubject={this.addNewSubject}
            deleteChoice={this.deleteChoice}
            handleChangeClassRoom={this.handleChangeClassRoom}
            handleChangeBirthdayDate={this.handleChangeBirthdayDate}
            handleChangePhone={this.handleChangePhone}
            handleChangeCountries={this.handleChangeCountries}
            handleChangeParent={this.handleChangeParent}
            handleChangeStudentClass={this.handleChangeStudentClass}
            handleChangeGroupClassRoom={this.handleChangeGroupClassRoom}
            uploadPhoto={this.uploadPhoto}
            attachFile={this.attachFile}
            fonctionList={fonctionList}
            handleChangeFunctions={this.handleChangeFunctions}
            handleChangeStudent={this.handleChangeStudent}
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

const mapStateToProps = (state) => {
  return {
    subjects: state.subject.subjects,
    levels: state.levelsReducer.levels,
    courseAssignment: state.AssignementReducer.courseAssignment,
    userProfile: state.auth.userProfile,
    establishments: state.establishment.remoteEstablishments,
  };
};

export default connect(mapStateToProps, { getAllUsersForAdmin, editUser })(UsersList);
