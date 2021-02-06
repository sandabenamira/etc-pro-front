import React from "react";
import CardBox from "../../../../../components/CardBox/index";
import { connect } from "react-redux";
import UsersList from "./UsersList";
import { UncontrolledAlert } from "reactstrap";
import AddUsers from "./AddUsers";
import { getAllRole } from "../../../../../actions/usersAction";
import { getSchoolYearEtabs } from "../../../../../actions/SchoolYearEtabAction";
import countriesList from "../../../../../constants/const";
import { addUsers } from "../../../../../actions/usersAction";
import _ from "lodash";
import moment from "moment";
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from "../../../../../config/config";
import { toUpperCaseFirst } from "../../../../../constants/ReactConst";
import { addUserPermitted } from "../../../../../constants/validationFunctions";
import LoaderModal from "./LoaderModal";
import { getAssignementCourse } from "../../../../../actions/AssignementAction";
import IntlMessages from "../../../../../util/IntlMessages";

// const listRolesUsers = [
//   {
//     id: roleIdAdmin,
//     label: <IntlMessages id={`role.admin`} />,
//     value: roleIdAdmin,
//     labelBackEnd: "Admin",
//   },
//   {
//     id: roleIdDirector,
//     label: <IntlMessages id={`component.etablishments.info.director`} />,
//     value: roleIdDirector,
//     labelBackEnd: "Director",
//   },
//   {
//     id: roleIdSupervisor,
//     label: <IntlMessages id={`role.supervisor`} />,
//     value: roleIdSupervisor,
//     labelBackEnd: "Vie scolaire",
//   },
//   {
//     id: roleIdProfessor,
//     label: <IntlMessages id={`toDo.professor`} />,
//     value: roleIdProfessor,
//     labelBackEnd: "Professor",
//   },
//   {
//     id: roleIdStudent,
//     label: <IntlMessages id={`userStuppDisplay.Student`} />,
//     value: roleIdStudent,
//     labelBackEnd: "Student",
//   },
//   {
//     id: roleIdParent,
//     label: <IntlMessages id={`userStuppDisplay.Parent`} />,
//     value: roleIdParent,
//     labelBackEnd: "Parent",
//   },
// ];
const listRolesUsers = [
  {
    id: roleIdAdmin,
    label: <IntlMessages id="role.admin" />,
    value: roleIdAdmin,
    labelBackEnd: "Admin",
  },
  {
    id: roleIdDirector,
    label: "Directeur Des Ressources Humaines",
    value: roleIdDirector,
    labelBackEnd: "Director",
  },
  {
    id: roleIdSupervisor,
    label: "Responsable formation",
    value: roleIdSupervisor,
    labelBackEnd: "Vie scolaire",
  },
  {
    id: roleIdParent,
    label: "Chef d'agence",
    value: roleIdParent,
    labelBackEnd: "Responsable formation",
  },
  {
    id: roleIdProfessor,
    label: <IntlMessages id={`toDo.professor`} />,
    value: roleIdProfessor,
    labelBackEnd: "Formateur",
  },
  {
    id: roleIdStudent,
    label: "Participant",
    value: roleIdStudent,
    labelBackEnd: "Participant",
  },
];
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoles: [],
      listSchoolYears: [],
      roleId: "",
      roleName: "",
      schoolyearId: null,
      classRoomId: null,
      subjectId: null,
      parentId: null,
      studentId: null,
      userName: "",
      userLastName: "",
      userNationnality: "",
      userCIN: "",
      userIdentifier: "",
      userMail: "",
      userPhoneNumber: "",
      userAdress: "",
      userCountry: "",
      userZipCode: "",
      userPhoto: "",
      userGender: "",
      birthdayDate: moment().year() - 6 + "-01-01",
      birthdayPlace: "",
      countriesList: [],
      usefulInformation: "",
      userPapiersFiles: [],
      nameUserPapiersFiles: [],
      isOpen: false,
      openArchive: false,
      isOpenArchive: false,
      messageAlerte: "",
      photoText: "",
      nameFiles: [],
      establishmentsList: [],
      establishmentId: "",
      classRoomList: [],
      subjectsList: [],
      classForStudent: [],
      studentClass: null,
      functionName: "",
      missingValue: false,
      alertMessage: "",
      subjectItem: {},
      listOfSubjects: [
        {
          id: 0,
          classId: 0,
          subjectId: 0,
          subjects: [],
          subjectModuleId: 0,
          levelId: 0,
        },
      ],
      parentsList: [],
      studentsList: [],
      levelId: null,
      sectionId: null,
      userList: {
        users: [],
        students: [],
        parents: [],
        professors: [],
        admins: [],
        directors: [],
        supervisors: [],
      },
      permissionList: [],
      birthdayDateCheck: false,
      listGroupClass: [],
      groupId: null,
      subjectIds: [],
      levelListParticipant: [],
      classForStudentFiltred: [],
      subjectModulesList: [],
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleChangeBirthdayDate = this.handleChangeBirthdayDate.bind(this);
    this.openArchiveModal = this.openArchiveModal.bind(this);
    this.handleChangeAlerte = this.handleChangeAlerte.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeSchoolYear = this.handleChangeSchoolYear.bind(this);
    this.handleChangeClassRoom = this.handleChangeClassRoom.bind(this);
    this.handleChangeParent = this.handleChangeParent.bind(this);
    this.handleChangeStudent = this.handleChangeStudent.bind(this);
    this.handleChangeCountries = this.handleChangeCountries.bind(this);
    this.attachFile = this.attachFile.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.openArchive = this.openArchive.bind(this);
    this.handleChangeEstablishments = this.handleChangeEstablishments.bind(
      this
    );
    this.handleChangeStudentClass = this.handleChangeStudentClass.bind(this);
    this.handleChangeFunctions = this.handleChangeFunctions.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.addNewSubject = this.addNewSubject.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
    this.handleChangeGroupClassRoom = this.handleChangeGroupClassRoom.bind(
      this
    );
    this.handleChangeLevelParticipant = this.handleChangeLevelParticipant.bind(
      this
    );
  }

  handleChangeLevelParticipant = (selectedOption) => {
    let classForStudentFiltred = [];

    classForStudentFiltred = this.state.classForStudent.filter(
      (element) => element.levelId == selectedOption.id
    );
    this.setState({
      classForStudentFiltred,
    });
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
      studentClass: selectedOption.id,
      levelId: selectedOption.levelId,
      sectionId: selectedOption.sectionId,
      listGroupClass,
    });
  };
  handleChangeAlerte = (name) => {
    this.setState({
      sessionExist: true,
      messageAlerte: "Il existe déja une licence pour cet etablissement",
    });
    setTimeout(() => {
      this.setState({ sessionExist: false, messageAlerte: "" });
    }, 4000);
  };
  handleChangeEducationType = (name) => (event) => {
    let obj = JSON.parse(event.target.value);

    this.setState({ educationItem: obj, educationTypeId: obj.id });
  };
  openArchiveModal() {
    this.setState((previousState) => ({
      isOpenArchive: !previousState.isOpenArchive,
    }));
  }
  handleCancel() {
    this.setState({
      isOpen: false,
      listOfSubjects: [
        {
          id: 0,
          classId: 0,
          subjectId: 0,
          subjects: [],
        },
      ],
      subjectIds: [],
    });
  }

  openAddModal() {
    this.setState({ roleId: "" });

    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
      listOfSubjects: [
        {
          id: 0,
          classId: 0,
          subjectId: 0,
          subjects: [],
          subjectModuleId: 0,
          levelId: 0,
        },
      ],
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    let AssignementIdProf = [];
    this.state.listOfSubjects.map((element) => {
      if (element.subjectId != 0) {
        AssignementIdProf.push(element.subjectId);
      }
    });
    if (this.state.roleId === null) {
      this.setState({
        missingValue: true,
        alertMessage: "Il faut remplir les champs obligatoires ",
      });
      setTimeout(() => {
        this.setState({ alertMessage: "", missingValue: false });
      }, 4000);
    } else {
      if (
        this.state.roleId === roleIdProfessor &&
        AssignementIdProf.length === 0
      ) {
        this.setState({
          missingValue: true,
          alertMessage:
            "Il faut affecter une classe et une matiére pour le professeur ",
        });
        setTimeout(() => {
          this.setState({ alertMessage: "", missingValue: false });
        }, 4000);
      } else {
        this.openAddModal();
        let data = {
          name: this.state.userName.toUpperCase(),
          surname: toUpperCaseFirst(this.state.userLastName),
          gender: this.state.userGender,
          dateOfBirth: this.state.birthdayDate,
          placeOfBirth: this.state.birthdayPlace,
          address: this.state.userAdress,
          nationality: this.state.userNationnality,
          phone: this.state.userPhoneNumber,
          status: true,
          cin: this.state.userCIN,
          userIdentifier: this.state.userIdentifier,
          zipCode: this.state.userZipCode,
          userCountry: this.state.userCountry,
          userPhoto: this.state.userPhoto,
          userPapiersFiles: this.state.userPapiersFiles,
          name_ar: "string",
          surname_ar: "string",
          email: this.state.userMail,
          roleId: this.state.roleId,
          establishmentId: this.state.establishmentId,
          assignClassSubject: AssignementIdProf,
          studentClass: this.state.studentClass,
          schoolyearId: this.props.userProfile.school_year_id,
          functionName: this.state.functionName,
          password: "123456",
          login: "login1",
          levelId: this.state.levelId,
          sectionId: this.state.sectionId,
          usefulInformation: this.state.usefulInformation,
          parentId: this.state.parentId,
          studentId: this.state.studentId,
          groupId: this.state.groupId,
        };
        console.log(data, "data avant action");
        this.props.addUsers(data);
        this.setState({
          roleId: "",
          roleName: "",
          schoolyearId: this.props.userProfile.school_year_id,
          classRoomId: "",
          subjectId: "",
          parentId: null,
          studentId: null,
          userName: "",
          userLastName: "",
          userNationnality: "",
          userCIN: "",
          userIdentifier: "",
          userMail: "",
          userPhoneNumber: "",
          userAdress: "",
          userCountry: "",
          userZipCode: "",
          userPhoto: "",
          userGender: "",
          birthdayDate: moment().year() - 18 + "-01-01",
          birthdayPlace: "",
          usefulInformation: "",
          userPapiersFiles: [],
          nameUserPapiersFiles: [],
          isOpen: false,
          photoText: "",
          nameFiles: [],
          establishmentId: this.props.userProfile.establishment_id,
          subjectsList: [],
          studentClass: null,
          functionName: "",
          missingValue: false,
          subjectItem: {},
          listOfSubjects: [
            {
              id: 0,
              classId: 0,
              subjectId: 0,
              subjects: [],
              subjectModuleId: 0,
              levelId: 0,
            },
          ],
          levelId: null,
          sectionId: null,
          birthdayDateCheck: false,
          groupId: null,
          subjectIds: [],
        });
      }
    }
  }
  handleChangePhone = (value) => {
    this.setState({ userPhoneNumber: value });
  };
  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeBirthdayDate = (date) => {
    this.setState({ birthdayDate: date, birthdayDateCheck: true });
  };
  handleChangeRole = (selectedOption) => {
    if (selectedOption.id == roleIdStudent) {
      this.setState({
        birthdayDate: moment().year() - 6 + "-01-01",
      });
    }
    this.setState({
      roleId: selectedOption.id,
      roleName: selectedOption.label,
      listOfSubjects: [
        {
          id: 0,
          classId: 0,
          subjectId: 0,
          subjects: [],
        },
      ],
      subjectIds: [],
    });
  };
  handleChangeGroupClassRoom = (selectedOption) => {
    this.setState({ groupId: selectedOption.id });
  };
  handleChangeSchoolYear = (selectedOption) => {
    this.setState({ schoolyearId: selectedOption.id });
  };
  handleChangeClassRoom = (selectedOption, name, index) => {
    if (name === "classId") {
      let subjectIds = this.state.listOfSubjects.map(
        (element) => element.subjectId
      );
      this.setState({ subjectIds });
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
      let newListSubjects = this.state.listOfSubjects.map((objSubject, i) =>
        i === index
          ? {
              ...objSubject,
              [name]: selectedOption.value,
              // subjects: subjectsList,
            }
          : objSubject
      );
      this.setState({ listOfSubjects: newListSubjects });
    } else if (name === "subjectId") {
      let subjectIds = [selectedOption.value];
      this.state.listOfSubjects.map((element) => {
        if (element.id != index) {
          subjectIds.push(element.subjectId);
        }
      });
      this.setState({ subjectIds });
      let newListSubjects = this.state.listOfSubjects.map((objSubject, i) =>
        i === index
          ? { ...objSubject, [name]: selectedOption.value }
          : objSubject
      );
      this.setState({ listOfSubjects: newListSubjects });
    } else if (name === "subjectModuleId") {
      let classId = this.state.listOfSubjects[index].classId;
      let subjectsList = [];
      this.props.courseAssignment.map((element) => {
        if (
          element.fk_id_class_v4 === classId &&
          element.subject.fk_id_subjects_module_v4 == selectedOption.value
        ) {
          var object = {};
          object.label = element.subject.name;
          object.id = element.id;
          object.value = element.id;
          object.fk_id_subjects_module_v4 =
            element.subject.fk_id_subjects_module_v4;

          subjectsList.push(object);
        }
      });
      let newListSubjects = this.state.listOfSubjects.map((objSubject, i) =>
        i === index
          ? {
              ...objSubject,
              subjects: subjectsList,
              subjectModuleId: selectedOption.value,
            }
          : objSubject
      );
      this.setState({ listOfSubjects: newListSubjects });
    } else if (name === "levelId") {
      let newListSubjects = this.state.listOfSubjects.map((objSubject, i) =>
        i === index
          ? {
              ...objSubject,
              [name]: selectedOption.id,
              classId: 0,
              subjectId: 0,
              subjects: [],
              subjectModuleId: 0,
            }
          : objSubject
      );
      this.setState({ listOfSubjects: newListSubjects });
    }
  };
  addNewSubject = (index) => {
    let listOfSubjects = [];
    this.state.listOfSubjects.map((element) => {
      listOfSubjects.push({
        id: element.id,
        classId: element.classId,
        subjectId: element.subjectId,
        subjects: element.subjects,
        isAdded: true,
        subjectModuleId: element.subjectModuleId,
        levelId: element.levelId,
      });
    });
    listOfSubjects.push({
      id: index,
      classId: 0,
      subjectId: 0,
      subjects: [],
      isAdded: false,
      subjectModuleId: 0,
      levelId: 0,
    });

    this.setState({ listOfSubjects });
  };
  deleteChoice = (index) => {
    let subjectIds = [];
    this.state.listOfSubjects.map((element) => {
      if (element.id != index) {
        subjectIds.push(element.subjectId);
      }
    });
    let listOfSubjectsClasses = [];
    let newIndex = 0;

    this.state.listOfSubjects.map((element) => {
      if (element.id !== index) {
        listOfSubjectsClasses.push({ ...element, id: newIndex });
        newIndex++;
      }
    });
    this.setState({ listOfSubjects: listOfSubjectsClasses, subjectIds });
  };

  handleChangeParent = (selectedOption) => {
    this.setState({ parentId: selectedOption.id });
  };
  handleChangeStudent = (selectedOption) => {
    this.setState({ studentId: selectedOption.id });
  };
  handleChangeCountries = (selectedOption) => {
    this.setState({ userCountry: selectedOption.id });
  };
  handleChangeEstablishments = (selectedOption) => {
    this.setState({ establishmentId: selectedOption.id });
  };
  handleChangeFunctions = (selectedOption) => {
    this.setState({ functionName: selectedOption.label });
  };
  attachFile(e) {
    var oldFiles = this.state.userPapiersFiles;

    var nameFiles = this.state.nameUserPapiersFiles;
    if (e.target.files !== undefined) {
      var files = Object.values(e.target.files);
      if (this.state.nameUserPapiersFiles.length + files.length < 6) {
        files.map((element) => {
          nameFiles.push(element.name);
          oldFiles.push(element);
        });
        this.setState({ userPapiersFiles: oldFiles, nameFiles });
      } else {
        this.setState({
          messageAlerte: "vous avez dépasser 5 fichiers",
          alerteStatus: true,
        });
        setTimeout(() => {
          this.setState({ messageAlerte: "", alerteStatus: false });
        }, 4000);
      }
    }
  }
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
        this.setState({ messageAlerte: "", alerteFiltre: false });
      }, 4000);
    }
  };
  openArchive = () => {
    this.setState((previousState) => ({
      openArchive: !previousState.openArchive,
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.subjectModules !== this.props.subjectModules) {
      let subjectModulesList = [];
      subjectModulesList = this.props.subjectModules.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({ subjectModulesList });
    }
    if (prevProps.levels !== this.props.levels) {
      let levelListParticipant = [];
      levelListParticipant = this.props.levels.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;

        return object;
      });
      this.setState({ levelListParticipant });
    }
    if (prevProps.ClassSettings !== this.props.ClassSettings) {
      let classForStudent = [];
      classForStudent = this.props.ClassSettings.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        object.sectionId = element.fk_id_section_v4;
        object.levelId = element.fk_id_level_v4;
        object.groups = element.group;
        return object;
      });
      this.setState({ classForStudent });
    }
    if (prevProps.courseAssignment !== this.props.courseAssignment) {
      let classRoomList = [];
      classRoomList = this.props.courseAssignment.map((element) => {
        var object = {};
        object.label = element.class.name;
        object.id = element.class.id;
        object.value = element.class.id;
        return object;
      });
      let classRoomListFiltredByID = _.uniqBy(classRoomList, "id");
      this.setState({ classRoomList: classRoomListFiltredByID });
    }

    if (prevProps.userPermission !== this.props.userPermission) {
      let listRoles = [];
      if (this.props.userProfile.role_id === roleIdSuperAdmin) {
        listRolesUsers.map((element) => {
          var object = {};
          object.label = element.label;
          object.id = element.id;
          object.value = element.id;

          listRoles.push(object);
        });
      } else {
        listRolesUsers.map((element) => {
          var object = {};
          object.label = element.label;
          object.id = element.id;
          object.value = element.id;

          let permitted = false;
          permitted = addUserPermitted(
            element.labelBackEnd,
            this.props.userPermission
          );
          if (permitted) {
            listRoles.push(object);
          }
        });
      }

      this.setState({ listRoles: listRoles });
    }

    if (
      prevProps.userProfile.establishment_id !==
      this.props.userProfile.establishment_id
    ) {
      this.setState({
        establishmentId: this.props.userProfile.establishment_id,
      });
    }

    if (prevProps.establishments !== this.props.establishments) {
      let establishmentsList = [];
      establishmentsList = this.props.establishments.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({ establishmentsList });
    }

    if (prevProps.schoolYearEtabs !== this.props.schoolYearEtabs) {
      let listSchoolYears = [];
      listSchoolYears = this.props.schoolYearEtabs.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        object.startDate = element.start_date;
        object.endtDate = element.end_date;
        return object;
      });
      let countriesListUser = [];
      countriesListUser = countriesList.countriesList.map((element) => {
        var object = {};
        object.label = element.name_fr;
        object.id = element.code;
        object.value = element.code;
        return object;
      });
      this.setState({
        listSchoolYears: listSchoolYears,
        countriesList: countriesListUser,
      });
    }
    if (prevProps.usersReducer !== this.props.usersReducer) {
      let parentsList = [];
      parentsList = this.props.usersReducer.parents.map((element) => {
        var object = {};
        object.label = element.name + " " + element.surname;
        object.id = element.parentId[0];
        object.value = element.parentId[0];
        return object;
      });
      let studentsList = [];
      studentsList = this.props.usersReducer.students.map((element) => {
        var object = {};
        object.label = element.name + " " + element.surname;
        object.id = element.studentId[0];
        object.value = element.studentId[0];
        return object;
      });
      this.setState({ parentsList, studentsList });
    }
    if (prevProps.usersReducer.users !== this.props.usersReducer.users) {
      this.setState({ userList: this.props.usersReducer });
    }
    if (prevProps.userPermission !== this.props.userPermission) {
      this.setState({ permissionList: this.props.userPermission });
    }
  }
  UNSAFE_componentWillMount() {
    this.props.getAllRole();
    this.props.getSchoolYearEtabs();
    // this.props.getAllUsersForAdmin(
    //   this.props.userProfile.establishment_id,
    //   this.props.userProfile.school_year_id
    // );
    // this.props.getAllUsersForSuperAdministrator();
    this.props.getAssignementCourse(
      this.props.userProfile.establishment_id,
      this.props.userProfile.school_year_id
    );
  }

  componentDidMount() {
    if (this.props.subjectModules != undefined) {
      let subjectModulesList = [];
      subjectModulesList = this.props.subjectModules.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({ subjectModulesList });
    }
    if (this.props.userPermission != undefined) {
      this.setState({ permissionList: this.props.userPermission });
      let listRoles = [];
      if (this.props.userProfile.role_id === roleIdSuperAdmin) {
        listRolesUsers.map((element) => {
          var object = {};
          object.label = element.label;
          object.id = element.id;
          object.value = element.id;

          listRoles.push(object);
        });
      } else {
        listRolesUsers.map((element) => {
          var object = {};
          object.label = element.label;
          object.id = element.id;
          object.value = element.id;

          let permitted = false;
          permitted = addUserPermitted(
            element.labelBackEnd,
            this.props.userPermission
          );
          if (permitted) {
            listRoles.push(object);
          }
        });
      }

      this.setState({ listRoles: listRoles });
    }
    if (this.props.establishments != undefined) {
      let establishmentsList = [];
      establishmentsList = this.props.establishments.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({
        establishmentsList,
        establishmentId: this.props.userProfile.establishment_id,
      });
    }
    if (this.props.ClassSettings != undefined) {
      let classForStudent = [];
      classForStudent = this.props.ClassSettings.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        object.sectionId = element.fk_id_section_v4;
        object.levelId = element.fk_id_level_v4;
        object.groups = element.group;
        return object;
      });
      this.setState({ classForStudent });
    }
    if (this.props.courseAssignment != undefined) {
      let classRoomList = [];
      classRoomList = this.props.courseAssignment.map((element) => {
        var object = {};
        object.label = element.class.name;
        object.id = element.class.id;
        object.value = element.class.id;
        return object;
      });
      let classRoomListFiltredByID = _.uniqBy(classRoomList, "id");
      this.setState({ classRoomList: classRoomListFiltredByID });
    }
    if (typeof this.props.usersReducer.parents != "undefined") {
      let parentsList = [];
      parentsList = this.props.usersReducer.parents.map((element) => {
        var object = {};
        object.label = element.name + " " + element.surname;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({ parentsList });
    }
    if (this.props.usersReducer.students != undefined) {
      let studentsList = [];
      studentsList = this.props.usersReducer.students.map((element) => {
        var object = {};
        object.label = element.name + " " + element.surname;
        object.id = element.studentId[0];
        object.value = element.studentId[0];
        return object;
      });
      this.setState({ studentsList });
    }
    if (this.props.levels != undefined) {
      let levelListParticipant = [];
      levelListParticipant = this.props.levels.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;

        return object;
      });
      this.setState({ levelListParticipant });
    }
    this.setState({ userList: this.props.usersReducer });
  }

  render() {
    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: "5%",
          marginRight: "10%",
        }}
      >
        <div className="  d-flex flex-column mb-3">
          {this.state.missingValue ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {" "}
                {this.state.alertMessage}{" "}
              </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
          {this.props.errorStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">{this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
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
          {this.state.listRoles.length > 0 ? (
            <div className=" bd-highlight" style={{ width: "90%" }}>
              <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                <AddUsers
                  openAddModal={this.openAddModal}
                  handleCancel={this.handleCancel}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleArchive={this.handleArchive}
                  handleChangeRole={this.handleChangeRole}
                  handleChangeSchoolYear={this.handleChangeSchoolYear}
                  handleChangeClassRoom={this.handleChangeClassRoom}
                  handleChangeBirthdayDate={this.handleChangeBirthdayDate}
                  handleChangeParent={this.handleChangeParent}
                  handleChangeStudent={this.handleChangeStudent}
                  handleChangeCountries={this.handleChangeCountries}
                  handleChangeStudentClass={this.handleChangeStudentClass}
                  attachFile={this.attachFile}
                  uploadPhoto={this.uploadPhoto}
                  openArchive={this.openArchive}
                  handleChangeEstablishments={this.handleChangeEstablishments}
                  handleChangeFunctions={this.handleChangeFunctions}
                  handleChangePhone={this.handleChangePhone}
                  addNewSubject={this.addNewSubject}
                  deleteChoice={this.deleteChoice}
                  parentsList={this.state.parentsList}
                  studentsList={this.state.studentsList}
                  handleChangeGroupClassRoom={this.handleChangeGroupClassRoom}
                  values={this.state}
                  handleChangeLevelParticipant={
                    this.handleChangeLevelParticipant
                  }
                />
              </CardBox>
            </div>
          ) : (
            ""
          )}

          {/* <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="add-service"
                yes={() => (
                  <>
                    {this.state.openArchive ? (
                      <div>
                        <ArchiveUsers openArchive={this.openArchive} />
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                )}
                establishements
              />
            )}
          </RoleContext.Consumer> */}
          {!this.state.openArchive ? (
            <div className=" bd-highlight" style={{ width: "90%" }}>
              <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                {/* <UsersList usersList={this.props.usersReducer} /> */}
                <UsersList
                  usersList={this.state.userList}
                  permissionList={this.state.permissionList}
                  listClassFilter={this.state.classForStudent}
                  usefulData={this.state}
                />
              </CardBox>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <div className=" bd-highlight" style={{ width: '90%' }}>
          <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
            <ArchiveUsers
              isOpenArchive={this.state.isOpenArchive}
              openArchiveModal={this.openArchiveModal}
            />
          </CardBox>
        </div> */}
        {this.props.userLoading ? <LoaderModal /> : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersReducer: state.usersReducer,
    userProfile: state.auth.userProfile,
    establishments: state.establishment.remoteEstablishments,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    schoolYearEtabs: state.schoolYearEtab.remoteSchoolYearEtab,
    courseAssignment: state.AssignementReducer.courseAssignment,
    ClassSettings: state.ClassSettingsReducer.classSettings,
    userPermission: state.PermissionReducer.userPermission,
    userLoading: state.usersReducer.userLoading,
    groupsList: state.GroupsReducer.groupsList,
    levels: state.levelsReducer.levels,
    subjectModules: state.subjectModuleReducer.subjectModules,
  };
};

export default connect(mapStateToProps, {
  getAllRole,
  getSchoolYearEtabs,
  addUsers,
  getAssignementCourse,
})(Users);
