import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import CommonInformation from "./UserInformation/CommonInformation";
import RoleInformation from "./UserInformation/RoleInformation";
import SpecificInformation from "./UserInformation/SpecificInformation";
import ParentInformation from "./UserInformation/ParentInformation";
import axios from "axios";
import baseUrl from "../../../../../config/config";
import { connect } from "react-redux";
import { getEstablishment } from "../../../../../actions/establishmentAction";
import { getServices } from "../../../../../actions/ServiceAction";
import { getUserProfile } from "../../../../../actions/Auth";
import {
  getAllUsers,
  addNewUser,
} from "../../../../../actions/stuppUserAction";
import { getSections } from "../../../../../actions/sectionAction";
import { getClassesByEstablishmentId } from "../../../../../actions/classeAction";
import { getServicesByEstablishmentId } from "../../../../../actions/ServiceAction";
import {
  successHandling,
  uploadExcel,
  uploadUserPhoto,
  successAddUserHandling,
  uploadAdminPhoto,
  uploadProfAndStudentPhoto,
} from "../../../../../actions/stuppUserAction";
import { classService } from "../../../../../_services/class.service";
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
} from "../../../../../config/config";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import moment from "moment";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import _ from "lodash";
import { getLevel } from "../../../../../actions/LevelAction";

let timeout;
class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      //components Common information
      name: "",
      surname: "",
      Arabname: "",
      Arabsurname: "",
      gender: "",
      //date_of_birth: "",
      email: "",
      phone: "",
      cin: "",
      address: "",
      zip_code: "",
      status: true,
      activeStep: 0,
      inputText: "",
      userPhotos: null,
      emailVerified: false,
      steps: 1,
      date_of_birth: moment().year() - 6 + "-01-01",

      //components role information
      userId: "",
      establishment_id: 0,
      role_id: "",
      //components specific information
      date_start_contract: "",
      Disable_studentsection: true,
      date_end_contract: "",
      listOfSubjects: [],
      serviceFilteredByEstablishment: [],
      studentClassesByLevelSectionID: [],
      studentsectionByLevels: [],
      class_id: "",
      //components Parent information
      newParent: false,
      trustedPerson: false,
      newParentsList: [],
      allParentList: [],
      affectedParents: [],
      trustedPersonList: [],
      nameParent: "",
      surnameParent: "",
      genderParent: "",
      date_of_birthParent: moment().year() - 18 + "-01-01",
      addressParent: "",
      phoneParent: "",
      statusParent: true,
      cinParent: "",
      zip_codeParent: "",
      usernameParent: "",
      emailParent: "",
      inputTextParent: "",
      arabicSurnameParent: "",
      arabicNameparent: "",
      parentStudentphoto: null,
      emailVerifiedParent: false,
      countrie_locale: "",
      listOfSubjects: [
        {
          id: 0,
          classId: 0,
          subject_id: 0,
          subjects: [],
        },
      ],
      establishmentList: [],
      classeList: [],
      classListFiltered: [],
      estabType: 0,
      serviceId: [],
      profileId: "",
      studentId: "",
      communsuccessAlert: false,
      communFailedAlert: false,
      establishment_Name: "",
      newUser: {},
      studentData: {},
      section_id: "",
      level_id: "",
    };
    this.getStepContent = this.getStepContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeParentPhone = this.handleChangeParentPhone.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleChangeSection = this.handleChangeSection.bind(this);
    this.handleChangeListSubjects = this.handleChangeListSubjects.bind(this);
    this.handleChangeService = this.handleChangeService.bind(this);
    this.handleChangeEstablishment = this.handleChangeEstablishment.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDropUserParent = this.onDropUserParent.bind(this);
    this.addNewSubject = this.addNewSubject.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewParentFormulaire = this.addNewParentFormulaire.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getSteps = this.getSteps.bind(this);
    this.handleChangestudentLevel = this.handleChangestudentLevel.bind(this);
    this.handleChangestudentSection = this.handleChangestudentSection.bind(
      this
    );
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDateParent = this.handleChangeDateParent.bind(this);
    this.addNewTrustedParentForm = this.addNewTrustedParentForm.bind(this);
    this.handleCancelImport = this.handleCancelImport.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
  }
  addNewTrustedParentForm = () => {
    this.setState({
      trustedPerson: !this.state.trustedPerson,
      newParent: false,
    });
  };
  handleChangePhone = (value) => {
    this.setState({ phone: value });
  };
  handleChangeParentPhone = (value) => {
    this.setState({ phoneParent: value });
  };
  addNewParentFormulaire = () => {
    this.setState({ newParent: !this.state.newParent, trustedPerson: false });
  };
  addNewParent = () => {
    var parent = {
      nameParent: this.state.nameParent,
      surnameParent: this.state.surnameParent,
      genderParent: this.state.genderParent,
      date_of_birthParent: this.state.date_of_birthParent,
      addressParent: this.state.addressParent,
      phoneParent: this.state.phoneParent,
      statusParent: true,
      cinParent: this.state.cinParent,
      zip_codeParent: this.state.zip_codeParent,
      realmParent: this.state.nameParent,
      passwordParent: " ",
      usernameParent: this.state.nameParent + "." + this.state.surnameParent,
      emailParent: this.state.emailParent,
      parentStudentphoto: this.state.parentStudentphoto,
      emailVerifiedParent: false,
      parentStudentphoto: this.state.parentStudentphoto,
      arabicSurnameParent: this.state.arabicSurnameParent,
      arabicNameparent: this.state.arabicNameparent,
    };
    if (this.state.trustedPerson) {
      this.state.trustedPersonList.push(parent);
    } else {
      this.state.newParentsList.push(parent);
    }

    this.setState({
      nameParent: "",
      surnameParent: "",
      genderParent: "",
      date_of_birthParent: "",
      addressParent: "",
      phoneParent: "",
      statusParent: true,
      cinParent: "",
      zip_codeParent: "",
      realmParent: "",
      passwordParent: " ",
      usernameParent: "",
      emailParent: "",
      emailVerifiedParent: false,
      parentStudentphoto: null,
      inputTextParent: "",
      newParent: false,
      trustedPerson: false,
      arabicSurnameParent: "",
      arabicNameparent: "",
    });
  };

  deleteChoice = (index) => {
    let listOfSubjectsClasses = this.state.listOfSubjects.filter(
      (element, i) => i !== index
    );
    this.setState({ listOfSubjects: listOfSubjectsClasses });
    console.log("is ------", index);
    console.log("listOfSubjectsClasses", listOfSubjectsClasses);
  };

  addNewSubject = (index) => {
    let listOfSubjects = [];
    this.state.listOfSubjects.map((element) => {
      listOfSubjects.push({
        id: element.id,
        classId: element.classId,
        subject_id: element.subject_id,
        subjects: element.subjects,
        isAdded: true,
      });
    });
    listOfSubjects.push({
      id: index,
      classId: 0,
      subject_id: 0,
      subjects: [],
      isAdded: false,
    });
    console.log("listOfSubjects", listOfSubjects);

    this.setState({ listOfSubjects });
  };
  handleChangeListSubjects(event, name, index) {
    if (name === "classId") {
      let subjectsList = this.props.classesSubjects.filter(
        (element) => element.id === event.target.value
      );
      let newListSubjects = this.state.listOfSubjects.map((objSubject, i) =>
        i === index
          ? {
              ...objSubject,
              [name]: event.target.value,
              subjects: subjectsList[0].assignementClassSubject,
            }
          : objSubject
      );
      this.setState({ listOfSubjects: newListSubjects });
    } else if (name === "subject_id") {
      let newListSubjects = this.state.listOfSubjects.map((objSubject, i) =>
        i === index ? { ...objSubject, [name]: event.target.value } : objSubject
      );
      this.setState({ listOfSubjects: newListSubjects });
    }
  }

  handleChangestudentLevel = (name) => (event) => {
    this.setState({ level_id: event.target.value });
  };

  handleChangestudentSection = (name) => (event) => {
    const levelId = this.state.level_id;
    const sectionId = event.target.value;
    this.setState({ section_id: sectionId });
    var studentfiltredClasses = this.props.classeSettings.filter(
      (classe) =>
        classe.fk_id_level_v4 === levelId &&
        classe.fk_id_section_v4 === sectionId &&
        classe.status
    );
    this.setState({ studentClassesByLevelSectionID: studentfiltredClasses });
  };

  handleChangeService = (name) => (event) => {
    this.setState({ serviceId: event.target.value });
  };

  handleChangeSelectParent = (name) => (event) => {
    this.setState({ affectedParents: event.target.value });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeDate = (date) => {
    this.setState({ date_of_birth: date });
  };

  handleChangeDateParent = (date) => {
    this.setState({ date_of_birthParent: date });
  };

  handleChangeRole = (name) => (event) => {
    this.setState({ [name]: event.target.value, steps: event.target.value });
  };

  handleChangeClass = (name) => (event) => {
    if (this.props.userProfile.role_id === roleIdAdmin) {
      this.setState({
        establishment_id: this.props.userProfile.establishment_id,
      });
    }
    this.setState({ [name]: event.target.value });
  };

  handleChangeEstablishment = (name) => (event) => {
    var type_establish = this.state.establishmentList.find(
      (element) => element.id === event.target.value
    );
    this.setState({ [name]: event.target.value });
    this.setState({
      estabType: type_establish.estab_type_id,
      establishment_id: event.target.value,
    });
    this.props.getClassesByEstablishmentId(event.target.value);
    this.props.getServicesByEstablishmentId(event.target.value);

    axios
      .get(
        `${baseUrl.baseUrl}/profiles?access_token=${localStorage.token}&filter[include]=user&filter[where][and][0][establishment_id]=` +
          event.target.value +
          `&filter[where][and][1][role_id]=` +
          4
      )
      .then((res) => {
        const allEstablishmentParents = res.data.map((element) => element.user);
        this.setState({
          allParentList: allEstablishmentParents,
        });
      });
  };

  handleChangeLevel = (event) => {
    this.setState({ level_id: event.target.value });
    event.target.value > 10
      ? this.setState({ level_id: event.target.value, sectionDisabled: false })
      : this.setState({ level_id: event.target.value, sectionDisabled: true });
    let subjectListFiltered = [];
    this.setState({ subjectListFiltered });
  };

  handleChangeSection = (name) => (event) => {
    let subjectListFiltered = [];
    this.setState({ [name]: event.target.value, subjectListFiltered });
  };

  onDropUserParent = (e) => {
    let file = e.target.files[0];
    this.setState({ parentStudentphoto: file, inputTextParent: file.name });
  };

  onDrop = (e) => {
    let file = e.target.files[0];
    this.setState({ userPhotos: file, inputText: file.name });
  };

  handleNext = () => {
    const { activeStep } = this.state;
    var establishment_Name = "";
    var establishment_Name_From_Id = "";
    if (activeStep === 0) {
      this.setState({ activeStep: activeStep + 1 });
    }
    if (activeStep === 1) {
      if (this.props.userProfile.role_id === roleIdSuperAdmin) {
        establishment_Name_From_Id = this.state.establishmentList.filter(
          (establishment) => establishment.id === this.state.establishment_id
        );
        establishment_Name = establishment_Name_From_Id[0].name;
      } else {
        establishment_Name_From_Id = this.state.establishmentList.filter(
          (establishment) =>
            establishment.id == this.props.userProfile.establishment_id
        );
        establishment_Name = establishment_Name_From_Id[0].name;
      }
      let data = {
        name: this.state.name,
        password: Math.random()
          .toString(36)
          .slice(2),
        surname: this.state.surname,
        gender: this.state.gender,
        date_of_birth: this.state.date_of_birth,
        address: this.state.address,
        phone: this.state.phone,
        status: true,
        cin: this.state.cin,
        realm: this.state.name,
        zip_code: this.state.zip_code,
        username: this.state.name + "." + this.state.surname,
        email: this.state.email.toLowerCase(),
        role_id: this.state.role_id,
        Arabname: this.state.Arabname,
        Arabsurname: this.state.Arabsurname,
        photo: this.state.userPhotos,
        establishment_id: this.props.userProfile.establishment_id,
        role_id: this.state.role_id,
        establishment_Name: establishment_Name,
      };

      let apiEndpoint = `/users/create-user?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, data)
        .then((response) => {
          if (response.status === 200) {
            let newUser = {};

            newUser = {
              ..._.last(response.data.user),
              user: _.head(response.data.user),
            };

            this.setState({
              activeStep: activeStep + 1,
              profileId: response.data.user[1].id,
              newUser,
            });
          }
        })
        .catch((err) => {
          this.setState({ communFailedAlert: true });
          timeout = setTimeout(
            () => this.setState({ communFailedAlert: false }),
            1000
          );
        });
    } else if (activeStep === 2 && this.state.role_id === roleIdStudent) {
      var classID = this.state.class_id === 0 ? null : this.state.class_id;
      let studentInformation = {
        level_id: this.state.level_id,
        section_id: this.state.section_id,
        class_id: classID,
        profile_id: this.state.profileId,
        establishment_id: parseInt(this.props.userProfile.establishment_id, 10),
      };
      axios
        .post(
          `${baseUrl.baseUrl}/students/save-student-specific?access_token=${localStorage.token}`,
          studentInformation
        )
        .then((response) => {
          if (response.status === 200) {
            let studentData = {
              ...response.data.student,
            };

            this.setState({
              studentId: response.data.student.id,
              communsuccessAlert: true,
              studentData,
            });
            timeout = setTimeout(
              () =>
                this.setState({
                  activeStep: activeStep + 1,
                  communsuccessAlert: false,
                }),
              3000
            );
          }
        })
        .catch((error) => {
          this.setState({ communFailedAlert: true });
          timeout = setTimeout(
            () => this.setState({ communFailedAlert: false }),
            1000
          );
        });
    }
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  getStepContent(
    stepIndex,
    roleList,
    establishmentList,
    values,
    handleChange,
    handleBlur,
    touched,
    errors
  ) {
    switch (this.state.activeStep) {
      case 0:
        return (
          <CommonInformation
            values={this.state}
            handleChange={this.handleChange}
            onDrop={this.onDrop}
            handleChangeDate={this.handleChangeDate}
            handleChangePhone={this.handleChangePhone}
          />
        );
      case 1:
        return (
          <RoleInformation
            values={this.state}
            handleChangeRole={this.handleChangeRole}
            handleChangeEstablishment={this.handleChangeEstablishment}
          />
        );

      case 2:
        return (
          <SpecificInformation
            classSections={this.props.classSections}
            classLevels={this.props.classLevels}
            levels={this.props.levels}
            sections={this.props.sections}
            values={this.state}
            handleChange={this.handleChange}
            handleChangeClass={this.handleChangeClass}
            handleChangeService={this.handleChangeService}
            handleChangeClass={this.handleChangeClass}
            handleChangeListSubjects={this.handleChangeListSubjects}
            addNewSubject={this.addNewSubject}
            handleChangestudentLevel={this.handleChangestudentLevel}
            handleChangestudentSection={this.handleChangestudentSection}
            // classeSettings={this.props.classeSettings}
            // subjects={this.props.subjects}
            classesSubjects={this.props.classesSubjects}
            deleteChoice={this.deleteChoice}
          />
        );
      case 3:
        return (
          <ParentInformation
            values={this.state}
            handleChange={this.handleChange}
            onDropUserParent={this.onDropUserParent}
            addNewParent={this.addNewParent}
            addNewParentFormulaire={this.addNewParentFormulaire}
            handleChangeSelectParent={this.handleChangeSelectParent}
            validateZipCode={this.validateZipCode}
            handleChangeDateParent={this.handleChangeDateParent}
            handleChangeParentPhone={this.handleChangeParentPhone}
            trustedPerson={this.state.trustedPerson}
            addNewTrustedParentForm={this.addNewTrustedParentForm}
          />
        );
      default:
        return "Uknown stepIndex";
    }
  }
  getSteps() {
    switch (this.state.steps) {
      case 0:
      case 1:
      case 2:
      case 4:
      case 6:
      case 7:
        return [
          <IntlMessages id="stuppUser.steps.accountInfo" />,
          <IntlMessages id="stuppUser.steps.role" />,
        ];

      case 3:
        return [
          <IntlMessages id="stuppUser.steps.accountInfo" />,
          <IntlMessages id="stuppUser.steps.role" />,
          <IntlMessages id="stuppUser.steps.specInfo" />,
        ];

      case 5:
        return [
          <IntlMessages id="stuppUser.steps.accountInfo" />,
          <IntlMessages id="stuppUser.steps.role" />,
          <IntlMessages id="stuppUser.steps.specInfo" />,
          <IntlMessages id="stuppUser.steps.parentInfoOfStudent" />,
        ];

      default:
        return "Uknown stepIndex";
    }
  }
  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }
    return res;
  };

  Validation_Steps(steps) {
    // this methode is to able and disable next and finish button when we insert any user (created by bechir)
    if (this.state.activeStep === 0) {
      if (this.state.countrie_locale === "ar") {
        if (
          this.state.name.length !== 0 &&
          this.state.surname.length !== 0 &&
          this.isemail(this.state.email) === true &&
          this.state.email.length !== 0 &&
          this.state.Arabname.length !== 0 &&
          this.state.Arabsurname.length !== 0 &&
          this.isValidphoneNumber(this.state.phone) === true
        )
          return true;
        else return false;
      } else {
        if (
          this.state.name.length !== 0 &&
          this.state.surname.length !== 0 &&
          this.isemail(this.state.email) === true &&
          this.state.email.length !== 0 &&
          this.isValidphoneNumber(this.state.phone) === true
        )
          return true;
        else return false;
      }
    }
    if (
      this.state.activeStep === 1 &&
      this.props.userProfile.role_id === roleIdSuperAdmin
    ) {
      if (this.state.role_id !== 0 && this.state.establishment_id !== 0)
        return true;
      else return false;
    }

    if (this.state.activeStep === 2 && this.state.role_id === 5) {
      if (this.state.level_id === undefined) return false;
      else return true;
    }
    if (this.state.activeStep === 2 && this.state.role_id === roleIdProfessor) {
      if (
        this.state.listOfSubjects.length === 1 &&
        this.state.listOfSubjects[0].subject_id === 0
      ) {
        return false;
      } else return true;
    } else if (
      this.state.activeStep === 3 &&
      this.state.role_id === roleIdStudent
    ) {
      if (
        this.state.newParentsList.length === 0 &&
        this.state.affectedParents.length === 0
      )
        return false;
      else return true;
    }

    if (
      this.state.activeStep === 1 &&
      (this.props.userProfile.role_id === roleIdAdmin ||
        this.props.userProfile.role_id === roleIdDirector)
    ) {
      if (this.state.role_id == 0) return false;
      else return true;
    }
  }

  componentDidMount() {
    this.setState({
      steps: this.props.userProfile.role_id,
    });
    this.props.getLevel(
      this.props.userProfile.establishment_id,
      this.props.userProfile.school_year_id
    );
    this.props.getSections();
    if (
      this.props.userProfile.role_id === roleIdAdmin ||
      this.props.userProfile.role_id === roleIdDirector
    ) {
      axios
        .get(
          `${baseUrl.baseUrl}/profiles?access_token=${localStorage.token}&filter[include]=user&filter[where][and][0][establishment_id]=` +
            this.props.userProfile.establishment_id +
            `&filter[where][and][1][role_id]=` +
            4
        )
        .then((res) => {
          const allEstablishmentParents = res.data.map(
            (element) => element.user
          );
          this.setState({
            allParentList: allEstablishmentParents,
          });
        });

      this.props.getClassesByEstablishmentId(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      );
      this.props.getServicesByEstablishmentId(
        this.props.userProfile.establishment_id
      );

      axios
        .get(
          `${baseUrl.baseUrl}/establishments/` +
            this.props.userProfile.establishment_id +
            `?access_token=${localStorage.token}`
        )
        .then((res) => {
          this.setState({
            estabType: res.data.estab_type_id,
          });
          axios
            .get(
              `${baseUrl.baseUrl}/countries/` +
                res.data.countries_id +
                `?access_token=${localStorage.token}`
            )
            .then((res) => {
              this.setState({ countrie_locale: res.data.locale });
            });
        });

      axios
        .get(`${baseUrl.baseUrl}/roles?access_token=${localStorage.token}`)
        .then((res) => {
          let data = res.data;
          const roleList = data.filter((element) => element.id !== 1);
          this.setState({ roleList });
        });
    } else {
      axios
        .get(`${baseUrl.baseUrl}/roles?access_token=${localStorage.token}`)
        .then((res) => {
          const roleList = res.data;
          this.setState({ roleList });
        });
    }

    axios
      .get(
        `${baseUrl.baseUrl}/establishments?access_token=${localStorage.token}`
      )
      .then((res) => {
        const establishmentList = res.data.filter((element) => element.status);
        this.setState({ establishmentList });
      });
    axios
      .get(`${baseUrl.baseUrl}/subjects?access_token=${localStorage.token}`)
      .then((res) => {
        const subjectList = res.data;
        this.setState({ subjectList });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var etablishmentID = null;

    var establishment_Name_From_Id = "";
    var establishment_Name = "";
    if (this.props.userProfile.role_id === roleIdSuperAdmin) {
      establishment_Name_From_Id = this.state.establishmentList.filter(
        (establishment) => establishment.id === this.state.establishment_id
      );
      establishment_Name = establishment_Name_From_Id[0].name;
    } else {
      establishment_Name_From_Id = this.state.establishmentList.filter(
        (establishment) =>
          establishment.id == this.props.userProfile.establishment_id
      );
      establishment_Name = establishment_Name_From_Id[0].name;
    }

    if (this.props.userProfile.role_id === roleIdSuperAdmin) {
      etablishmentID = this.state.establishment_id;
    } else {
      etablishmentID = this.props.userProfile.establishment_id;
    }
    if (this.state.role_id === roleIdProfessor) {
      let data = {
        profile_id: this.state.profileId,
        date_start_contract: this.state.date_start_contract,
        date_end_contract: this.state.date_end_contract,
        listOfSubjects: this.state.listOfSubjects,
      };

      let apiEndpoint = `/professors/create-professor?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, data)
        .then((response) => {
          if (response.status === 200) {
            let profData = {
              ...this.state.newUser,
              professors: [{ ...response.data.professor }],
              students: [],
              parents: [],
            };
            this.props.addNewUser(profData);
            this.props.successAddUserHandling();
            this.handleCancel();
            this.props.cancel();
          }
        })
        .catch((err) => {
          this.setState({ communFailedAlert: true });
          timeout = setTimeout(
            () => this.setState({ communFailedAlert: false }),
            1000
          );
        });
    } else if (this.state.role_id === roleIdStudent) {
      let studentParents = {
        newParentsList: this.state.newParentsList,
        affectedParents: this.state.affectedParents,
        trustedPersonList: this.state.trustedPersonList,
        studentId: this.state.studentId,
        etablishmentID: etablishmentID,
      };
      console.log("studentParents", studentParents);
      let apiEndpoint = `/students/add-parents?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, studentParents)
        .then((response) => {
          console.log("/students/add-parents/response", response);
          if (response.status === 200) {
            let student = {
              ...this.state.newUser,
              students: [{ ...this.state.studentData }],
              professors: [],
              parents: [],
            };
            this.props.addNewUser(student);
            this.props.successAddUserHandling();
            this.handleCancel();
            this.props.cancel();
          }
        })
        .catch((err) => {
          this.setState({ communFailedAlert: true });
          timeout = setTimeout(
            () => this.setState({ communFailedAlert: false }),
            1000
          );
        });
    } else {
      let data = {
        name: this.state.name,
        password: Math.random()
          .toString(36)
          .slice(2),
        surname: this.state.surname,
        gender: this.state.gender,
        date_of_birth: this.state.date_of_birth,
        address: this.state.address,
        phone: this.state.phone,
        status: true,
        cin: this.state.cin,
        realm: this.state.name,
        zip_code: this.state.zip_code,

        username: this.state.name + "." + this.state.surname,
        email: this.state.email.toLowerCase(),

        role_id: this.state.role_id,

        Arabname: this.state.Arabname,
        Arabsurname: this.state.Arabsurname,
        photo: this.state.userPhotos,
        photoName: this.state.userPhotos,
        establishment_id: establishment_Name_From_Id[0].id,
        role_id: this.state.role_id,
        establishment_Name: establishment_Name,
      };

      let apiEndpoint = `/users/create-user?access_token=${localStorage.token}`;
      classService
        .post(apiEndpoint, data)
        .then((response) => {
          if (this.state.userPhotos !== null) {
            let userId = response.data.user[0].id;
            const fileExtension = this.state.userPhotos.name.replace(
              /^.*\./,
              ""
            );
            const fileName = "user" + userId + "." + fileExtension;
            var object = {};
            object.file = this.state.userPhotos;
            object.fileName = fileName;
            const myNewFile = new File([object.file], fileName, {
              type: object.file.type,
            });
            let formadata = new FormData();
            formadata.append("image", myNewFile);

            const URLuserPhoto = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;
            axios({
              url: URLuserPhoto,
              method: "POST",
              data: formadata,
            })
              .then((response) => {
                if (response) {
                  axios
                    .patch(
                      `${baseUrl.baseUrl}/users/` +
                        userId +
                        `?access_token=${localStorage.token}`,
                      {
                        photo:
                          response.data.result.files.image[0].providerResponse
                            .location,
                      }
                    )
                    .then((response) => {
                      console.log("updateddddddddddd ", response.data);
                    })
                    .catch(function(error) {
                      console.log("error", error);
                    });
                }
              })
              .catch((err) => {});
          } else {
          }

          if (response.status === 200) {
            if (this.state.userPhotos) {
              let newUser = {
                ..._.last(response.data.user),
                professors: [],
                students: [],
                parents: [],
              };
              this.props.uploadAdminPhoto(
                response.data.user[0].id,
                data,
                newUser
              );
            } else {
              let newUser = {
                ..._.last(response.data.user),
                user: _.head(response.data.user),
                professors: [],
                students: [],
                parents: [],
              };
              this.props.addNewUser(newUser);
            }
            this.props.successAddUserHandling();
            this.handleCancel();
            this.props.cancel();
          }
        })
        .catch((err) => {});
    }
  };
  handleCancelImport() {
    this.props.cancelModalImport();
  }
  handleCancel() {
    this.setState({
      activeStep: 0,
      previewVisible: false,
      name: "",
      surname: "",
      gender: "",
      date_of_birth: moment().year() - 6 + "-01-01",
      address: "",
      phone: "",
      zip_code: "",
      status: true,
      cin: "",
      realm: "",
      password: "",
      username: "",
      email: "",
      emailVerified: false,
      nameParent: "",
      surnameParent: "",
      genderParent: "",
      date_of_birthParent: moment().year() - 18 + "-01-01",
      addressParent: "",
      phoneParent: "",
      statusParent: true,
      cinParent: "",
      zip_codeParent: "",
      realmParent: "",
      passwordParent: "",
      usernameParent: "",
      emailParent: "",
      emailVerifiedParent: false,
      date_start_contract: "",
      date_end_contract: "",
      establishment_id: 0,
      role_id: 0,
      subject_id: "",
      class_id: "",
      serviceId: [],
      userPhotos: null,
      parentStudentphoto: null,
      Arabname: "",
      Arabsurname: "",
      affectedParents: [],
      newParentsList: [],
      section_id: "",
      level_id: "",
      listOfSubjects: [],
    });
    // this.props.close();
  }

  isemail(value) {
    if (value.length > 0)
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    else return true;
  }

  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  onClickHandler = () => {
    if (this.props.userProfile.role_id === roleIdSuperAdmin) {
      this.props.uploadExcel(
        this.state.selectedFile,
        this.state.establishment_id
      );
    } else {
      this.props.uploadExcel(
        this.state.selectedFile,
        this.props.userProfile.establishment_id
      );
    }

    this.props.cancelModalImport();
  };

  render() {
    const steps = this.getSteps() ? this.getSteps() : 0;
    const { activeStep, roleList, establishmentList } = this.state;

    return (
      <div className="app-wrapper">
        <Modal isOpen={this.props.open}>
          <ModalHeader
            toggle={this.props.cancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="pages.stuppUserPage" />}
          </ModalHeader>
          <ModalBody>
            <form className="container" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="w-100">
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    className="horizontal-stepper-linear"
                  >
                    {steps.map((label, index) => {
                      return (
                        <Step
                          key={label}
                          className={`horizontal-stepper ${
                            index === activeStep ? "active" : ""
                          }`}
                        >
                          <StepLabel className="stepperlabel">
                            {label}
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </div>
                {this.state.activeStep === steps.length ? (
                  <div className="w-100">
                    <Typography className="my-2">
                      All steps completed - you&quot;re finished
                    </Typography>
                    <Button onClick={this.handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div className="w-100">
                    {this.getStepContent(activeStep, roleList)}
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="mr-2"
                    >
                      {<IntlMessages id="stuppUser.button.back" />}
                    </Button>

                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={this.Validation_Steps(steps) ? false : true}
                        className="jr-btn"
                      >
                        {<IntlMessages id="stuppUser.button.finish" />}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        disabled={this.Validation_Steps(steps) ? false : true}
                      >
                        {" "}
                        {<IntlMessages id="stuppUser.button.Next" />}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.props.openModalImport}>
          <ModalHeader
            toggle={this.handleCancelImport}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="pages.stuppUserPage" />}
          </ModalHeader>
          <ModalBody>
            <form className="container" onSubmit={this.handleSubmit}>
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-import-excel:visit"
                    yes={() => (
                      <div className="row">
                        <Can
                          role={role}
                          perform="user-import-excel-filter-establishment:visit"
                          yes={() => (
                            <div className="col-sm-6">
                              <TextField
                                required
                                id="establishment"
                                select
                                label={
                                  <IntlMessages id="components.student.formadd.establishment" />
                                }
                                value={this.state.establishment_id}
                                onChange={this.handleChange("establishment_id")}
                                SelectProps={{}}
                                margin="normal"
                                fullWidth
                              >
                                {establishmentList.map((establishment) => (
                                  <MenuItem
                                    key={establishment.id}
                                    value={establishment.id}
                                  >
                                    {establishment.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          )}
                        />
                        <div className="col-md-12 text-center ">
                          <br />
                          <br />
                          <input
                            type="file"
                            name="file"
                            onChange={this.onChangeHandler}
                          />
                        </div>
                        <div className="col-md-12 text-left ">
                          <br />
                          <br />
                          <Button
                            variant="contained"
                            className="jr-btn bg-indigo text-white "
                            onClick={this.onClickHandler}
                          >
                            {
                              <IntlMessages id="components.establishments.formadd.buttonAdd" />
                            }
                          </Button>
                          <Button
                            variant="contained"
                            className="jr-btn bg-grey text-white "
                            onClick={this.handleCancelImport}
                          >
                            {
                              <IntlMessages id="components.establishments.formadd.buttonCancel" />
                            }
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                )}
              </RoleContext.Consumer>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    establishments: state.establishment.remoteEstablishments,
    services: state.service.remoteServices,
    userProfile: state.auth.userProfile,
    users: state.stuppUsers.remoteStuppUsers,
    classLevels: state.ClassLevels.remoteLevels,
    classSections: state.classSections.remoteSections,
    classes: state.classes,
    sections: state.SectionsReducer.Section,
    classeSettings: state.ClassSettingsReducer.classSettings,
    levels: state.levelsReducer.levels,
  };
}

export default connect(mapStateToProps, {
  successHandling,
  getAllUsers,
  getServices,
  getEstablishment,
  getUserProfile,
  getSections,
  getClassesByEstablishmentId,
  getServicesByEstablishmentId,
  uploadExcel,
  uploadUserPhoto,
  addNewUser,
  successAddUserHandling,
  uploadAdminPhoto,
  uploadProfAndStudentPhoto,
  getLevel,
})(AddUser);
