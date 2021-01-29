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
import EditSpecificInformation from "./UserInformation/EditSpecificInformation";
import EditparentInformation from "./UserInformation/EditparentInformation";
import axios from "axios";
import baseUrl from "../../../../../config/config";
import { connect } from "react-redux";
import { getEstablishment } from "../../../../../actions/establishmentAction";
import { getServices } from "../../../../../actions/ServiceAction";
import { getUserProfile } from "../../../../../actions/Auth";
import { getAllUsers } from "../../../../../actions/stuppUserAction";
import { getSections } from "../../../../../actions/sectionAction";
import { getLevels } from "../../../../../actions/classLevelAction";
import { getClassesByEstablishmentId } from "../../../../../actions/classeAction";
import { getServicesByEstablishmentId } from "../../../../../actions/ServiceAction";
import {
  editUser,
  errorHandling,
  successHandling,
  successHandlingSteper,
  errorHandlingSteper,
} from "../../../../../actions/stuppUserAction";
import { getSectionFromLevel } from "../../../../../actions/sectionAction";
import moment from "moment";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import _ from "lodash";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //components Common information
      id: "",
      name: "",
      surname: "",
      Arabname: "",
      Arabsurname: "",
      gender: "",
      date_of_birth: moment().year() - 6 + "-01-01",
      email: "",
      phone: 0,
      cin: 0,
      address: "",
      zip_code: 0,
      status: true,
      activeStep: 0,
      inputText: "",
      userPhotos: null,
      emailVerified: false,

      //components role information
      establishment_id: 0,
      role_id: "",
      steps: 1,
      //components specific information
      date_start_contract: "",
      Disable_studentsection: true,
      date_end_contract: "",
      listOfSubjects: [],
      serviceFilteredByEstablishment: [],
      studentClassesByLevelSectionID: [],
      studentsectionByLevels: [],
      class_id: 0,
      idProfessor: "",
      SubjectsNewList: [],
      //components Parent information
      newParent: false,
      newParentsList: [],
      allParentList: [],
      affectedParents: [],
      oldaffectedParents: [],

      oldService: [],

      nameParent: "",
      surnameParent: "",
      genderParent: "",

      date_of_birthParent: moment().year() - 18 + "-01-01",

      addressParent: "",
      phoneParent: 0,
      statusParent: true,
      cinParent: 0,
      zip_codeParent: 0,
      usernameParent: "",
      emailParent: "",
      inputTextParent: "",
      parentStudentphoto: null,
      emailVerifiedParent: false,
      countrie_locale: "",
      addedListSubject: [],
      added: false,
      listOfSubjects: [
        {
          id: null,
          classId: 0,
          subject_id: 0,
        },
      ],
      establishmentList: [],
      classeList: [],
      classListFiltered: [],
      estabType: 0,
      serviceId: [],
      successStatus: false,
      communsuccessAlert: false,
      communFailedAlert: false,
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
    this.handleChangeListSubjectsAdd = this.handleChangeListSubjectsAdd.bind(
      this
    );
    this.handleChangeEndContract = this.handleChangeEndContract.bind(this);
    this.handleChangeStartContract = this.handleChangeStartContract.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDateParent = this.handleChangeDateParent.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);

  }
  deleteChoice = (index) => {
    let listOfSubjectsClasses = this.state.listOfSubjects.filter(
      (element, i) => i !== index
    );
    this.setState({ listOfSubjects: listOfSubjectsClasses });
    console.log("is ------", index);
    console.log("listOfSubjectsClasses", listOfSubjectsClasses);
  };

  handleChangePhone = (value) => {
    this.setState({ phone: value });
  };
  handleChangeParentPhone = (value) => {
    this.setState({ phoneParent: value });
  };
  handleChangeDate = (date) => {
    this.setState({ date_of_birth: date });
  };

  handleChangeDateParent = (date) => {
    this.setState({ date_of_birthParent: date });
  };

  addNewParentFormulaire = () => {
    this.setState({ newParent: !this.state.newParent });
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
      passwordParent: "123456",
      usernameParent: this.state.nameParent + "." + this.state.surnameParent,
      emailParent: this.state.emailParent,
      parentStudentphoto: this.state.parentStudentphoto,
      emailVerifiedParent: false,
      parentStudentphoto: this.state.parentStudentphoto,
    };

    this.state.newParentsList.push(parent);
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
      passwordParent: "123456",
      usernameParent: "",
      emailParent: "",
      emailVerifiedParent: false,
      parentStudentphoto: null,
      inputTextParent: "",
      newParent: false,
      Arabname: "",
      Arabsurname: "",
    });
  };

  addNewSubject = (index) => {
    this.setState((prevState) => ({
      addedListSubject: [
        ...prevState.addedListSubject,
        {
          id: index,
          level_id: 0,
          section_id: 0,
          subject_id: 0,
          sectionDisabled: true,
        },
      ],
      added: true,
    }));
  };
  handleChangeListSubjectsAdd(event, name, index) {
    if (name === "level_id") {
      var newList = this.state.addedListSubject;
      newList[index].level_id = event.target.value;
      newList[index].section_id = this.state.addedListSubject[index].section_id;
      newList[index].subject_id = this.state.addedListSubject[index].subject_id;

      this.setState({
        addedListSubject: newList,
      });
    }
    if (name === "subject_id") {
      var newList = this.state.addedListSubject;
      newList[index].level_id = this.state.addedListSubject[index].level_id;
      newList[index].section_id = this.state.addedListSubject[index].section_id;
      newList[index].subject_id = event.target.value;

      this.setState({
        addedListSubject: newList,
      });
    }

    let newListSubjects = this.state.addedListSubject.map((objSubject) =>
      name === "level_id" && event.target.value > 10 && objSubject.id === index
        ? {
            ...objSubject,
            [name]: event.target.value,
            sectionDisabled: false,
            section_id: 0,
          }
        : objSubject.id === index
        ? { ...objSubject, [name]: event.target.value, sectionDisabled: true }
        : objSubject
    );
    this.setState({ addedListSubject: newListSubjects });
  }






















  handleChangeListSubjects(event, name, id, index) {
    if (name === "classId") {
      var newList = this.state.listOfSubjects;
      newList[index].classId = event.target.value;
      newList[index].subject_id = this.state.listOfSubjects[index].subject_id;
      newList[index].id = id;
      this.setState({
        listOfSubjects: newList,
      });
    }

    if (name === "subject_id") {
      var newList = this.state.listOfSubjects;
      newList[index].classId = this.state.listOfSubjects[index].classId;
      newList[index].subject_id = event.target.value;
      newList[index].id = id;
      this.setState({
        listOfSubjects: newList,
      });
    }
 

    // if (name === "classId") {
    //   const newList = this.state.listOfSubjects.map((listobject) => {
    //     if (listobject.id === index) {
    //       listobject.section_id = 0;
    //       return listobject;
    //     }
    //     return listobject;
    //   });
    //   this.setState({
    //     listOfSubjects: newList,
    //   });
    // }
    
    let newListSubjects = this.state.listOfSubjects.map((objSubject) =>
      name === "classId"  && objSubject.id === index
        ? {
            ...objSubject,
            [name]: event.target.value,
          }
        : objSubject.id === index
        ? { ...objSubject, [name]: event.target.value }
        : objSubject
    );

    console.log('====================================');
    console.log(newListSubjects);
    console.log('====================================');
    this.setState({ listOfSubjects: newListSubjects });
  }


















  
  handleChangestudentLevel = (name) => (event) => {
    this.setState({ section_id: 0, class_id: 0 });
    if (event.target.value > 10) {
      this.setState({ [name]: event.target.value });
      this.setState({ Disable_studentsection: false });
      var studentSectionbyLevel = getSectionFromLevel(
        this.props.classSections,
        event.target.value
      );
      this.setState({ studentsectionByLevels: studentSectionbyLevel });
    } else {
      this.setState({
        level_id: event.target.value,
        Disable_studentsection: true,
        section_id: 0,
      });
      const levelID = event.target.value;
      var studentfiltredClasses = this.props.classes.filter(
        (classe) => classe.level_id === levelID && classe.status
      );
      this.setState({ studentClassesByLevelSectionID: studentfiltredClasses });
    }
  };

  handleChangestudentSection = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    const levelID = this.state.level_id;
    const sectionID = event.target.value;
    var studentfiltredClasses = this.props.classes.filter(
      (classe) =>
        classe.level_id === levelID &&
        classe.section_id === sectionID &&
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
  handleChangeStartContract = (date) => {
    this.setState({ date_start_contract: date });
  };
  handleChangeEndContract = (date) => {
    this.setState({ date_end_contract: date });
  };
  handleChangeRole = (name) => (event) => {
    this.setState({ [name]: event.target.value, steps: event.target.value });
  };

  handleChangeClass = (name) => (event) => {
    if (
      this.props.userProfile.role_id === 2 ||
      this.props.userProfile.role_id === 7
    ) {
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
    let commonInformation = {
      id: this.state.id,
      name: this.state.name,
      surname: this.state.surname,
      gender: this.state.gender,
      date_of_birth: this.state.date_of_birth,
      address: this.state.address,
      phone: this.state.phone,
      status: true,
      cin: this.state.cin,
      realm: this.state.name,
      username: this.state.name + "." + this.state.surname,
      zip_code: this.state.zip_code,
      email: this.state.email,
      name_ar: this.state.Arabname,
      surname_ar: this.state.Arabsurname,
      photo: this.state.userPhotos,
      emailVerified: false,
    };

    let specificInformation = {};
    if (this.props.user.role_id === 3) {
      specificInformation = {
        idProfessor: this.state.professorId,
        date_start_contract: this.state.date_start_contract,
        date_end_contract: this.state.date_end_contract,
        listOfSubjects: this.state.listOfSubjects,
      };
    }

    const { activeStep } = this.state;
    if (activeStep === 0) {
      axios
        .patch(
          `${baseUrl.baseUrl}/users/` +
            this.props.user.user.id +
            `?access_token=${localStorage.token}`,
          commonInformation
        )
        .then((response) => {
          this.props.editUser(response.data);

          if (this.props.user.user.id === this.props.userProfile.user_id) {
            var object = commonInformation;
            object.creation_date = this.props.user.user.creation_date;
            object.first_connexion = this.props.user.user.first_connexion;
            object.user_signature = this.props.user.user.user_signature;
            localStorage.setItem("user", JSON.stringify(object));
            this.setState({
              communsuccessAlert: true,
            });
          }

          setTimeout(
            function() {
              this.setState({ activeStep: activeStep + 1 });
            }.bind(this),
            1000
          );
        })
        .catch((error) => {
           //  this.props.errorHandlingSteper();
          this.setState({
            communFailedAlert: true,
          });
        });
    } else if (activeStep === 1) {
      setTimeout(
        function() {
          this.setState({ activeStep: activeStep + 1 });
        }.bind(this),
        500
      );
    } else if (activeStep === 2 && this.props.user.role_id === 3) {
      axios
        .patch(
          `${baseUrl.baseUrl}/professors/` +
            this.props.user.id +
            `?access_token=${localStorage.token}`,
          specificInformation
        )
        .then((response) => {})
        .catch(function(error) {
         });
    } else if (activeStep === 2 && this.props.user.role_id === 5) {
      var NewServiceList = this.state.serviceId;
      var OldServiceList = this.state.oldService;
      var difference = [];
      if (OldServiceList.length === 0) {
        difference = NewServiceList;
      } else {
        difference = _.difference(NewServiceList, OldServiceList);
      }
      specificInformation = {
        id: this.props.user.students[0].id,
        level_id: this.state.level_id,
        class_id: this.state.class_id,
        profile_id: this.props.user.students[0].profile_id,
        service: difference,
      };

      axios
        .patch(
          `${baseUrl.baseUrl}/students/edit-class-student?access_token=${localStorage.token}`,
          specificInformation
        )
        .then((response) => {
          this.setState({ successStatus: true });
        })
        .catch(function(error) {
         });
      setTimeout(
        function() {
          this.setState({ activeStep: activeStep + 1 });
        }.bind(this),
        1000
      );
    } else if (activeStep === 3 && this.props.user.role_id === 5) {
      specificInformation = {
        id: this.props.user.students[0].id,
        newParentsList: this.state.newParentsList,
        affectedParents: this.state.affectedParents,
        establishment_id: this.props.user.establishment_id,
      };
      axios
        .patch(
          `${baseUrl.baseUrl}/students/edit-parent-student?access_token=${localStorage.token}`,
          specificInformation
        )
        .then((response) => {})
        .catch(function(error) {
         });
      setTimeout(
        function() {
          this.props.editAlert();
        }.bind(this),
        1000
      );
    } else {
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
            user={this.props.user}
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
          <EditSpecificInformation
            classList={this.props.classes}
            serviceList={this.props.services}
            classSections={this.props.classSections}
            classLevels={this.props.classLevels}
            values={this.state}
            handleChange={this.handleChange}
            handleChangeClass={this.handleChangeClass}
            handleChangeService={this.handleChangeService}
            handleChangeClass={this.handleChangeClass}
            handleChangeListSubjects={this.handleChangeListSubjects}
            addNewSubject={this.addNewSubject}
            handleChangestudentLevel={this.handleChangestudentLevel}
            handleChangestudentSection={this.handleChangestudentSection}
            handleChangeListSubjectsAdd={this.handleChangeListSubjectsAdd}
            handleChangeStartContract={this.handleChangeStartContract}
            handleChangeEndContract={this.handleChangeEndContract}
            subjects={this.props.subjects}
            deleteChoice={this.deleteChoice}
            classesSubjects={this.props.classesSubjects}

          />
        );
      case 3:
        return (
          <EditparentInformation
            values={this.state}
            handleChange={this.handleChange}
            onDropUserParent={this.onDropUserParent}
            addNewParent={this.addNewParent}
            addNewParentFormulaire={this.addNewParentFormulaire}
            handleChangeSelectParent={this.handleChangeSelectParent}
            validateZipCode={this.validateZipCode}
            handleChangeDateParent={this.handleChangeDateParent}
            handleChangeParentPhone={this.handleChangeParentPhone}
          />
        );
      default:
        return "Uknown stepIndex";
    }
  }
  getSteps() {
    switch (this.props.user.role_id) {
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
    if (this.state.activeStep === 1 && this.props.userProfile.role_id === 1) {
      if (this.state.role_id !== 0 && this.state.establishment_id !== 0)
        return true;
      else return false;
    }

    if (this.state.activeStep === 2 && this.state.role_id === 5) {
      if (this.state.level_id === undefined || this.state.class_id === 0)
        return false;
      else return true;
    }
    if (this.state.activeStep === 2 && this.state.role_id === 3) {
      if (
        this.state.listOfSubjects.length === 1 &&
        this.state.listOfSubjects[0].subject_id === 0
      ) {
        return false;
      } else return true;
    } else if (this.state.activeStep === 3 && this.state.role_id === 5) {
      if (
        this.state.newParentsList.length === 0 &&
        this.state.affectedParents.length === 0
      )
        return false;
      else return true;
    }

    if (
      this.state.activeStep === 1 &&
      (this.props.userProfile.role_id === 2 ||
        this.props.userProfile.role_id === 7)
    ) {
      if (this.state.role_id === 0) return false;
      else return true;
    }
  }

  componentDidMount() {  
    if (this.props.user) {
      this.setState({
        steps: this.props.userProfile.role_id,
        id: this.props.user.user.id,
        name: this.props.user.user.name,
        surname: this.props.user.user.surname,
        Arabname: this.props.user.user.name_ar,
        Arabsurname: this.props.user.user.surname_ar,
        gender: this.props.user.user.gender,
        date_of_birth: moment(this.props.user.user.date_of_birth).toISOString(),
        email: this.props.user.user.email,
        phone: '+'+(this.props.user.user.phone),
        cin: this.props.user.user.cin,
        address: this.props.user.user.address,
        zip_code: this.props.user.user.zip_code,
        role_id: this.props.user.role_id,
        establishment_id: this.props.user.establishment_id,
      });
      if (this.props.user.role_id === 3) {
        axios
          .get(
            `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[include][course][assignmentClassSubject][subject]&filter[where][id]=` +
            this.props.user.professors[0].id
          )
          .then((res) => {
            console.log('HHHHHHHHHHHHHHHHHHHHHhhhhh' ,res.data)
            this.setState({
              SubjectsNewList: res.data[0].course,
              listOfSubjects: res.data[0].course,
              idProfessor: this.props.user.professors[0].id,
              date_start_contract: res.data[0].date_start_contract,
              date_end_contract: res.data[0].date_end_contract,
            });
          });
      }

      if (this.props.user.role_id === 5) {
        this.setState({
          level_id: this.props.user.students[0].level_id,
          class_id: this.props.user.students[0].class_id,
        });

        if (this.props.user.students[0].level_id > 10) {
          this.setState({ Disable_studentsection: false });
          var studentSectionbyLevel = getSectionFromLevel(
            this.props.classSections,
            this.props.user.students[0].level_id
          );

          this.setState({ studentsectionByLevels: studentSectionbyLevel });
          const levelID = this.props.user.students[0].level_id;
          var studentfiltredClasses = this.props.classes.filter(
            (classe) => classe.level_id === levelID && classe.status
          );
          this.setState({
            studentClassesByLevelSectionID: studentfiltredClasses,
          });
        } else {
          this.setState({
            level_id: this.props.user.students[0].level_id,
            Disable_studentsection: true,
            section_id: 0,
          });
          const levelID = this.props.user.students[0].level_id;
          var studentfiltredClasses = this.props.classes.filter(
            (classe) => classe.level_id === levelID && classe.status
          );
          this.setState({
            studentClassesByLevelSectionID: studentfiltredClasses,
          });
        }

        axios
          .get(
            `${baseUrl.baseUrl}/students_services?access_token=${localStorage.token}&filter[where][student_id]=` +
              this.props.user.students[0].id
          )
          .then((response) => {
            let result = response.data.map((a) => a.service_id);
            this.setState({ serviceId: result, oldService: result });

            axios
              .get(
                `${baseUrl.baseUrl}/students_parents?access_token=${localStorage.token}&filter[where][student_id]=` +
                  this.props.user.students[0].id
              )
              .then((response) => {
                let parents = response.data.map((a) => a.parent_id);
                this.setState({
                  affectedParents: parents,
                  oldaffectedParents: parents,
                });
              });
          });
      }
    }

    this.props.getSections();
    this.props.getLevels();
    if (
      this.props.userProfile.role_id === 2 ||
      this.props.userProfile.role_id === 7
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
        this.props.userProfile.establishment_id
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

    let specificInformation = {};
    if (this.props.user.role_id === 3) {
      specificInformation = {
        idProfessor: this.props.user.professors[0].id,
        date_start_contract: this.state.date_start_contract,
        date_end_contract: this.state.date_end_contract,
        listOfSubjects: this.state.listOfSubjects,
        addedListSubject: this.state.addedListSubject,
      };
      axios
        .patch(
          `${baseUrl.baseUrl}/professors/edit-professor?access_token=${localStorage.token}`,
          specificInformation
        )
        .then((response) => {
          if (response.status === 200) {
            this.props.successHandling();
          }
        })
        .catch((error) => {
          this.props.errorHandling();
        });
    }

    if (this.props.user.role_id === 5) {
      var newAffectedList = _.difference(
        this.state.affectedParents,
        this.state.oldaffectedParents
      );
      specificInformation = {
        id: this.props.user.students[0].id,
        newParentsList: this.state.newParentsList,
        affectedParents: newAffectedList,
        establishment_id: this.props.user.establishment_id,
      };
      axios
        .patch(
          `${baseUrl.baseUrl}/students/edit-parent-student?access_token=${localStorage.token}`,
          specificInformation
        )
        .then((response) => {
          this.setState({ affectedParents: [], newParentsList: [] });
        })
        .catch(function(error) {
         });

      setTimeout(
        function() {
          this.props.editAlert();
        }.bind(this),
        1000
      );
    }
    this.props.cancel();
  };

  handleCancel() {
    this.setState({
      previewVisible: false,
      name: "",
      surname: "",
      gender: "",
      date_of_birth: "",
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
      date_of_birthParent: "",
      addressParent: "",
      phoneParent: "",
      statusParent: true,
      cinParent: "",
      zip_codeParent: "",
      realmParent: "",
      passwordParent: "123456",
      usernameParent: "",
      emailParent: "",
      emailVerifiedParent: false,
      date_start_contract: "",
      date_end_contract: "",
      establishment_id: 0,
      role_id: 0,
      subject_id: "",
      class_id: 0,
      serviceId: [],
      userPhotos: null,
      parentStudentphoto: null,
      Arabname: "",
      Arabsurname: "",
      affectedParents: [],
      newParentsList: [],
    });
    this.props.close();
  }

  isemail(value) {
    if (value.length > 0)
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    else return true;
  }

  render() {
 
    const steps = this.getSteps();
    const { activeStep, roleList } = this.state;
    return (
      <div className="app-wrapper">
        <Modal isOpen={this.props.edit}>
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
                       //  disabled={this.Validation_Steps(steps) ? false : true}
                        className="jr-btn"
                      >
                        {<IntlMessages id="stuppUser.button.finish" />}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        // disabled={this.Validation_Steps(steps) ? false : true}
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
    classes: state.ClassSettingsReducer.classSettings,
    subjects: state.subject.subjects,
  };
}

export default connect(
  mapStateToProps,
  {
    editUser,
    getAllUsers,
    getServices,
    getEstablishment,
    getUserProfile,
    getLevels,
    getSections,
    getClassesByEstablishmentId,
    getServicesByEstablishmentId,
    errorHandling,
    successHandling,
    successHandlingSteper,
    errorHandlingSteper,
  }
)(EditUser);
