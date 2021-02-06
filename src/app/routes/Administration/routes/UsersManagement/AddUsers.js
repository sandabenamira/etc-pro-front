import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import GetAppIcon from "@material-ui/icons/GetApp";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import { connect } from "react-redux";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import AddBox from "@material-ui/icons/AddBox";
import Typography from "@material-ui/core/Typography";
import WcIcon from "@material-ui/icons/Wc";
import { Radio } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PrintIcon from "@material-ui/icons/Print";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import {
  getAllRole,
  importUsersFromFile,
} from "../../../../../actions/usersAction";
import PhotoIcon from "@material-ui/icons/Photo";
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from "../../../../../config/config";
import {
  isEmail,
  isPhonenumber,
  isZipCode,
  isCIN,
  isValidphoneNumber,
} from "../../../../../constants/validationFunctions";
import MuiPhoneNumber from "material-ui-phone-number";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import moment from "moment";
import RemoveIcon from "@material-ui/icons/Remove";
import ModalImportUser from "./ModalImportUser";
import ModalExportUser from "./ModalExportUser";
import readXlsxFile from "read-excel-file";
import { element } from "prop-types";
import _ from "lodash";
import AlerteImport from "./AlerteImport";

import axios from "axios";
import baseUrl from "../../../../../config/config";
import { exportCsv } from "../../../../../actions/usersAction";

// const { getJsDateFromExcel } = require('excel-date-to-js');
const correctHeader = [
  "role",
  "année scolaire",
  "nom",
  "prénom",
  "nom ar",
  "prénom ar",
  "gender",
  "date de naissance",
  "lieu de naissance",
  "nationalité",
  "E-mail",
  "telephone",
  "CIN",
  "Identifiant unique",
  "adresse postal",
  "code postal",
  "pays",
  "informations utiles",
  "classe",
  "groupe",
];
const fonctionList = [
  { label: "Agent d'entretien", id: 1, value: 1 },
  { label: "Infirmière", id: 2, value: 2 },
  { label: "Cuisinier(e)", id: 3, value: 3 },
  { label: "Gardien", id: 4, value: 4 },
  { label: "surveillant", id: 5, value: 5 },
  { label: "surveillant général", id: 6, value: 6 },
];

class AddUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      importisOpen: false,
      listUsers: [],
      errorHeader: false,
      FormatedUserList: [],
      errorHeaderColumn: [],
      exportHasOpen: false,
      userFile: "",
      inputText: "",
      valeur: [],
      idRole: "",
      classId: "",
      classeName: "",
      invalidData: [],
      alerteImportStatus: false,
      alerteImportMessage: "",
      importStatus: [],
      importDone: false,
      fileUploaded: false,
    };
    this.handleSubmitImport = this.handleSubmitImport.bind(this);
    this.handleOpenImportModal = this.handleOpenImportModal.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.checkDataFile = this.checkDataFile.bind(this);
    this.handleOpenExportModal = this.handleOpenExportModal.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
  }
  ImportXLSX = async (ListUsers) => {
    let importStatus = [];
    const listUsers = ListUsers.map(async (data) => {
      let dataUser = {
        name: data.name,
        surname: data.surname,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        phone: data.phone,
        cin: data.cin,
        zipCode: data.zipCode,
        country: data.userCountry,
        photo: null,
        name_ar: data.name_ar,
        surname_ar: data.surname_ar,
        creation_date: new Date(),
        nationality: data.nationality,
        placeOfBirth: data.placeOfBirth,
        email: data.email,
        roleId: roleIdStudent,
        establishmentId: data.establishmentId,
        assignClassSubject: null,
        classId: data.classID,
        schoolYearId: data.schoolYearId,
        paperFiles: null,
        levelId: data.levelId,
        sectionId: data.sectionId,
        usefulInformation: data.usefulInformation,
        parentId: null,
        studentId: null,
        groupId: data.groupId,
        userIdentifier: data.userIdentifier,
      };
      try {
        let apiEndpoint = `/users/createByRole?access_token=${localStorage.token}`;
        const response = await axios.post(
          baseUrl.baseUrl + apiEndpoint,
          dataUser
        );

        return data.indexFile;
      } catch (err) {
        // Handle Error Here
      }
    });
    const results = await Promise.all(listUsers);
    importStatus = results.filter((element) => element !== undefined);
    this.setState({ importStatus });
  };

  handleCancel() {
    this.setState({
      importisOpen: false,
      idRole: "",
      listUsers: [],
      FormatedUserList: [],
      exportHasOpen: false,
      classId: "",
      className: "",
    });
  }

  onDrop = (e) => {
    let file = e.target.files[0];
    if (file !== undefined) {
      this.setState({
        FormatedUserList: [],
        importStatus: [],
        importDone: false,
        invalidData: [],
        listUsers: [],
      });

      readXlsxFile(file).then((rows) => {
        if (_.isEqual(rows[0], correctHeader)) {
          this.setState({
            listUsers: rows,
            fileUploaded: true,
          });
          this.setState({ fileUploaded: true });
          setTimeout(() => {
            this.setState({ fileUploaded: false });
          }, 4000);
        } else {
          let errorHeaderColumn = _.difference(correctHeader, rows[0]);

          this.setState({ errorHeader: true, errorHeaderColumn });
          setTimeout(() => {
            this.setState({ errorHeader: false });
          }, 4000);
        }
      });
      this.setState({ userFile: file, inputText: file.name });
    }
  };

  handleSubmitExportCsv = (e) => {
    e.preventDefault();
    const exportReturn = exportCsv(
      this.props.usersReducer.students,
      this.state.classId,
      this.state.classeName
    );
    if (exportReturn == "error") {
      this.setState({
        alerteImportStatus: true,
        alerteImportMessage: "erreur d'export svp vérifier votre classe",
      });
      setTimeout(() => {
        this.setState({ alerteImportStatus: false, alerteImportMessage: "" });
      }, 3000);
    }
    this.setState({ classId: "", classeName: "", exportHasOpen: false });
  };

  checkDataFile = (event) => {
    event.preventDefault();

    var establishmentId = this.props.userProfile.establishment_id;
    var school_year_id = localStorage.school_year_id;
    var ClassList = this.props.ClassSettings;

    var objs = this.state.listUsers.map(function(row) {
      return {
        roleId: row[0],
        schoolYearId: row[1],
        name: row[2],
        surname: row[3],
        name_ar: row[4],
        surname_ar: row[5],
        gender: row[6],
        dateOfBirth: new Date(Math.round((row[7] - 25569) * 86400 * 1000)),
        placeOfBirth: row[8],
        nationality: row[9],
        email: row[10],
        phone: row[11],
        cin: row[12],
        idUnique: row[13],
        address: row[14],
        zipCode: row[15],
        country: row[16],
        usefulInformation: row[17],
        classID: row[18],
        groupeID: row[19],
        establishmentId: row[20],
      };
    });

    if (this.state.idRole == 2) {
      if ("Course" in objs[0]) {
        // this.props.importUsersFromFile(objs);
      } else {
      }
    }
    if (this.state.idRole == 3) {
      if ("Course" in objs[0]) {
        // this.props.importUsersFromFile(objs);
      } else {
      }
    }

    if (this.state.idRole == 4) {
      if ("idEnfant" in objs[0]) {
        // this.props.importUsersFromFile(objs);
      } else {
      }
    }
    let invalidData = [];
    if (this.state.idRole == roleIdStudent) {
      var FormatedUserList = objs.slice(1).map((element, index) => {
        var UserObject = element;
        UserObject.establishmentId = parseInt(establishmentId, 10);
        UserObject.schoolYearId = parseInt(school_year_id, 10);
        UserObject.indexFile = index + 2;
        UserObject.roleId = 5;
        let classItem = this.props.ClassSettings.find(
          (classElement) =>
            classElement.name == element.classID &&
            classElement.fk_id_establishment == establishmentId &&
            classElement.fk_id_school_year == school_year_id
        );
        if (classItem != undefined) {
          UserObject.classID = classItem.id;
          UserObject.levelId = classItem.fk_id_level_v4;
          UserObject.sectionId = classItem.fk_id_section_v4;
          let groupItem = classItem.group.find(
            (groupItem) => groupItem.name == element.groupeID
          );
          UserObject.groupId = groupItem == undefined ? null : groupItem.id;
        } else {
          UserObject.classID = null;
          UserObject.levelId = null;
          UserObject.sectionId = null;
          UserObject.groupId = null;
        }
        if (
          element.name == null ||
          element.surname == null ||
          isEmail(element.email) === false
        ) {
          invalidData.push(element);
        }
        return UserObject;
      });

      this.setState({ FormatedUserList, invalidData });
    }
  };

  handleOpenImportModal = () => {
    this.setState({
      importisOpen: true,
    });
  };
  handleOpenExportModal = () => {
    this.setState({
      exportHasOpen: true,
    });
  };
  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }

    return res;
  };

  handleChangeRole = (selectedOption) => {
    this.setState({
      idRole: selectedOption.value,
    });
  };
  handleSubmitImport = (event) => {
    event.preventDefault();
    if (this.state.invalidData.length === 0) {
      this.setState({ importDone: true });
      let result = this.ImportXLSX(this.state.FormatedUserList);
    } else {
      let alerteImportMessage =
        "les lignes numéro " +
        this.state.invalidData.map((element) => element.indexFile + " , ") +
        "sont invalides";

      this.setState({ alerteImportStatus: true, alerteImportMessage });
      setTimeout(() => {
        this.setState({ alerteImportStatus: false, alerteImportMessage: "" });
      }, 4000);
    }
  };
  handleChangeClass = (selectedOption) => {
    this.setState({
      classId: selectedOption.value,
      classeName: selectedOption.label,
    });
  };
  render() {
    const { values } = this.props;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-wrap align-items-start">
        <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-row flex-wrap  justify-content-between align-items-center">
          <div className="d-flex flex-row ">
            <Fab
              size="small"
              color="primary"
              aria-label="Add"
              onClick={this.props.openAddModal}
            >
              {this.props.values.isOpen ? <RemoveSharpIcon /> : <AddIcon />}
            </Fab>
            &nbsp;&nbsp;&nbsp;
            <Typography
              variant="h6"
              style={{
                color: "black",
                fontWeight: "blod",
                fontFamily: "Roboto",
                fontSize: "25px",
              }}
            >
              <IntlMessages id="add.new.user" />
            </Typography>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className="d-flex flex-row">
            <Fab
              size="small"
              color="secondary"
              aria-label="Add"
              onClick={() => this.handleOpenImportModal()}
            >
              <GetAppIcon />
            </Fab>
            &nbsp;&nbsp;&nbsp;
            <Typography
              variant="h6"
              style={{
                color: "black",
                fontWeight: "blod",
                fontFamily: "Roboto",
                fontSize: "25px",
              }}
            >
              <IntlMessages id="upload.file.user" />
            </Typography>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className="d-flex flex-row">
            <Fab
              size="small"
              color="#7b1fa2"
              aria-label="Add"
              onClick={() => this.handleOpenExportModal()}
            >
              <ImportExportIcon />
            </Fab>
            &nbsp;&nbsp;&nbsp;
            <Typography
              variant="h6"
              style={{
                color: "black",
                fontWeight: "blod",
                fontFamily: "Roboto",
                fontSize: "25px",
              }}
            >
              <IntlMessages id="export.file.user" />
            </Typography>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className="d-flex flex-row ">
            <Fab
              size="small"
              aria-label="Add"
              style={{ backgroundColor: "#ffbb33", color: "#ffffff" }}
              //   onClick={this.handleOpenImportModal()}
            >
              <DeleteOutlineIcon />
            </Fab>
            &nbsp;&nbsp;&nbsp;
            <Typography
              variant="h6"
              style={{
                color: "black",
                fontWeight: "blod",
                fontFamily: "Roboto",
                fontSize: "25px",
              }}
            >
              <IntlMessages id="service.button.archives" />
            </Typography>
          </div>
          <div className="d-flex flex-row justify-content-between">
            &nbsp;&nbsp;&nbsp;
            <PrintIcon
              style={{
                fontSize: "35",
              }}
              color="inherit"
            />
            &nbsp;&nbsp;&nbsp;
            <PictureAsPdfIcon
              style={{
                fontSize: "35",
              }}
              color="inherit"
            />
          </div>
        </div>

        <form
          className="d-flex  flex-wrap col-lg-12 col-md-12 col-sm-12 p-4"
          autoComplete="off"
          onSubmit={this.props.handleSubmit}
        >
          {this.props.values.isOpen ? (
            <>
              <div className=" d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center">
                <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                  <InputLabel
                    htmlFor="nomSelect"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                    }}
                    required
                  >
                    {<IntlMessages id="role.user" />}
                  </InputLabel>
                  <Select
                    required
                    options={this.props.values.listRoles}
                    onChange={this.props.handleChangeRole}
                    id="role"
                    name="role"
                    styles={{
                      control: (base) => ({
                        ...base,
                        "&:hover": { borderColor: "gray" }, // border style on hover
                        border: "1px solid lightgray", // default border color
                        boxShadow: "none", // no box-shadow
                        borderTopStyle: "none",
                        borderRightStyle: "none",
                        borderLeftStyle: "none",
                        borderRadius: " none",
                      }),
                    }}
                  />{" "}
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                  <InputLabel
                    htmlFor="nomSelect"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                    }}
                     
                  >
                    Année
                  </InputLabel>
                  <Select
                    isDisabled
                    // options={[this.props.userProfile.school_year_name]}
                    // onChange={this.props.handleChangeSchoolYear}
                    // defaultValue={this.props.userProfile.school_year_name}
                    defaultValue={{
                      label: this.props.userProfile.school_year_name,
                      id: 0,
                    }}
                    id="role"
                    name="role"
                    styles={{
                      control: (base) => ({
                        ...base,
                        "&:hover": { borderColor: "gray" }, // border style on hover
                        border: "1px solid lightgray", // default border color
                        boxShadow: "none", // no box-shadow
                        borderTopStyle: "none",
                        borderRightStyle: "none",
                        borderLeftStyle: "none",
                        borderRadius: " none",
                      }),
                    }}
                  />{" "}
                </div>
                {this.props.userProfile.role_id === roleIdSuperAdmin ? (
                  <>
                    <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                      <InputLabel
                        htmlFor="nomSelect"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                        }}
                        required
                      >
                        {<IntlMessages id="user.establishment" />}
                      </InputLabel>
                      <Select
                        options={this.props.values.establishmentsList}
                        onChange={this.props.handleChangeEstablishments}
                        id="role"
                        name="role"
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderRadius: " none",
                          }),
                        }}
                      />{" "}
                    </div>
                  </>
                ) : (
                  ""
                )}
                {this.props.values.roleId === roleIdStudent ? (
                  <>
                    <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                      <InputLabel
                        htmlFor="nomSelect"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                        }}
                      >
                        {<IntlMessages id="parent.couplage.user" />}
                      </InputLabel>
                      <Select
                        options={this.props.parentsList}
                        onChange={this.props.handleChangeParent}
                        id="role"
                        name="role"
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderRadius: " none",
                          }),
                        }}
                      />{" "}
                    </div>
                    <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                      <InputLabel
                        htmlFor="nomSelect"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                        }}
                      >
                        {<IntlMessages id="classe.couplage.user" />}
                      </InputLabel>
                      <Select
                        options={this.props.values.classForStudent}
                        onChange={this.props.handleChangeStudentClass}
                        id="nomSelect"
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderRadius: " none",
                          }),
                        }}
                      />{" "}
                    </div>
                    <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                      <InputLabel
                        htmlFor="group"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                        }}
                      >
                        {<IntlMessages id="assignment.student.group" />}
                      </InputLabel>
                      <Select
                        options={this.props.values.listGroupClass}
                        onChange={this.props.handleChangeGroupClassRoom}
                        id="group"
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderRadius: " none",
                          }),
                        }}
                      />{" "}
                    </div>
                  </>
                ) : (
                  ""
                )}
                {this.props.values.roleId === roleIdProfessor ? (
                  <>
                    <div className="col-md-6 col-lg-3 col-sm-12 p-0 "> </div>
                    <div className="col-md-6 col-lg-3 col-sm-12 p-0 "> </div>
                  </>
                ) : (
                  ""
                )}
                {this.props.values.roleId === roleIdProfessor ? (
                  <>
                    {values.listOfSubjects.map((objSubject, index) => (
                      <div className="col-md-6 col-lg-12 col-sm-12 d-flex flex-row justify-content-between p-3">
                        <div className="col-md-6 col-lg-2 col-sm-12 p-0 ">
                          <InputLabel
                            htmlFor="nomSelect"
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "18px",
                            }}
                            required
                          >
                            {<IntlMessages id="classe.couplage.level" />}
                          </InputLabel>
                          <Select
                            options={this.props.values.levelListParticipant}
                            onChange={(e) =>
                              this.props.handleChangeClassRoom(
                                e,
                                "levelId",
                                index
                              )
                            }
                            value={
                              this.props.values.levelListParticipant.find(
                                (element) => element.id == objSubject.levelId
                              ) == undefined
                                ? {}
                                : this.props.values.levelListParticipant.find(
                                    (element) =>
                                      element.id == objSubject.levelId
                                  )
                            }
                            id="levelId"
                            name="levelId"
                            styles={{
                              control: (base) => ({
                                ...base,
                                "&:hover": { borderColor: "gray" }, // border style on hover
                                border: "1px solid lightgray", // default border color
                                boxShadow: "none", // no box-shadow
                                borderTopStyle: "none",
                                borderRightStyle: "none",
                                borderLeftStyle: "none",
                                borderRadius: " none",
                              }),
                            }}
                          />{" "}
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-12 mr-1 ">
                          <InputLabel
                            htmlFor="nomSelect"
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "18px",
                            }}
                            required
                          >
                            {<IntlMessages id="classe.couplage.user" />}
                          </InputLabel>
                          <Select
                            options={this.props.values.classForStudent.filter(
                              (element) => element.levelId == objSubject.levelId
                            )}
                            onChange={(e) =>
                              this.props.handleChangeClassRoom(
                                e,
                                "classId",
                                index
                              )
                            }
                            value={
                              this.props.values.classForStudent.find(
                                (element) => element.id == objSubject.classId
                              ) == undefined
                                ? {}
                                : this.props.values.classForStudent.find(
                                    (element) =>
                                      element.id == objSubject.classId
                                  )
                            }
                            id="classId"
                            name="classId"
                            styles={{
                              control: (base) => ({
                                ...base,
                                "&:hover": { borderColor: "gray" }, // border style on hover
                                border: "1px solid lightgray", // default border color
                                boxShadow: "none", // no box-shadow
                                borderTopStyle: "none",
                                borderRightStyle: "none",
                                borderLeftStyle: "none",
                                borderRadius: " none",
                              }),
                            }}
                          />{" "}
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-12 mr-1 ">
                          <InputLabel
                            htmlFor="nomSelect"
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "18px",
                            }}
                            required
                          >
                            {
                              <IntlMessages id="classe.couplage.module.formation" />
                            }
                          </InputLabel>
                          <Select
                            options={values.subjectModulesList}
                            onChange={(e) =>
                              this.props.handleChangeClassRoom(
                                e,
                                "subjectModuleId",
                                index
                              )
                            }
                            value={
                              values.subjectModulesList.find(
                                (element) =>
                                  element.value == objSubject.subjectModuleId
                              ) == undefined
                                ? {}
                                : values.subjectModulesList.find(
                                    (element) =>
                                      element.value ==
                                      objSubject.subjectModuleId
                                  )
                            }
                            id="classId"
                            name="classId"
                            styles={{
                              control: (base) => ({
                                ...base,
                                "&:hover": { borderColor: "gray" }, // border style on hover
                                border: "1px solid lightgray", // default border color
                                boxShadow: "none", // no box-shadow
                                borderTopStyle: "none",
                                borderRightStyle: "none",
                                borderLeftStyle: "none",
                                borderRadius: " none",
                              }),
                            }}
                          />{" "}
                        </div>
                        <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                          <InputLabel
                            htmlFor="nomSelect"
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "18px",
                            }}
                            required
                          >
                            {<IntlMessages id="prof.couplage.subjects" />}
                          </InputLabel>
                          <Select
                            // options={objSubject.subjects}
                            // onChange={(e) =>
                            //   this.props.handleChangeClassRoom(
                            //     e,
                            //     "subjectId",
                            //     index
                            //   )
                            // }
                            options={objSubject.subjects.filter(
                              (element) =>
                                !values.subjectIds.includes(element.id)
                            )}
                            onChange={(e) =>
                              this.props.handleChangeClassRoom(
                                e,
                                "subjectId",
                                index
                              )
                            }
                            value={
                              objSubject.subjects.find(
                                (element) => element.id == objSubject.subjectId
                              ) == undefined
                                ? {}
                                : objSubject.subjects.find(
                                    (element) =>
                                      element.id == objSubject.subjectId
                                  )
                            }
                            id="subjectId"
                            name="subjectId"
                            styles={{
                              control: (base) => ({
                                ...base,
                                "&:hover": { borderColor: "gray" }, // border style on hover
                                border: "1px solid lightgray", // default border color
                                boxShadow: "none", // no box-shadow
                                borderTopStyle: "none",
                                borderRightStyle: "none",
                                borderLeftStyle: "none",
                                borderRadius: " none",
                              }),
                            }}
                          />{" "}
                        </div>
                        <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                          <Fab
                            size="small"
                            value={`${index}`}
                            color="primary"
                            aria-label="Add"
                            onClick={() => {
                              if (!objSubject.isAdded) {
                                if (objSubject.subjectId != 0) {
                                  this.props.addNewSubject(index + 1);
                                } else {
                                }
                              } else {
                                this.props.deleteChoice(index);
                              }
                            }}
                          >
                            {objSubject.isAdded ? <RemoveIcon /> : <AddIcon />}
                          </Fab>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-12 p-0"></div>
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
                {this.props.values.roleId === roleIdParent ? (
                  <>
                    <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                      <InputLabel
                        htmlFor="nomSelect"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                        }}
                      >
                        {<IntlMessages id="parent.couplage.student" />}
                      </InputLabel>
                      <Select
                        options={this.props.studentsList}
                        onChange={this.props.handleChangeStudent}
                        id="studentIdAssignement"
                        name="studentIdAssignement"
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderRadius: " none",
                          }),
                        }}
                      />{" "}
                    </div>
                  </>
                ) : (
                  ""
                )}
                {/* {this.props.values.roleId === roleIdSupervisor ? (
                  <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                    <InputLabel
                      htmlFor="nomSelect"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "18px",
                      }}
                    >
                      {<IntlMessages id="vie.scolaire.fonction" />}
                    </InputLabel>
                    <Select
                      options={fonctionList}
                      onChange={this.props.handleChangeFunctions}
                      id="function"
                      name="function"
                      styles={{
                        control: (base) => ({
                          ...base,
                          "&:hover": { borderColor: "gray" }, // border style on hover
                          border: "1px solid lightgray", // default border color
                          boxShadow: "none", // no box-shadow
                          borderTopStyle: "none",
                          borderRightStyle: "none",
                          borderLeftStyle: "none",
                          borderRadius: " none",
                        }),
                      }}
                    />{" "}
                  </div>
                ) : (
                  ""
                )} */}
                <hr
                  style={{
                    width: "100%",
                    margin: "auto",
                    marginTop: "40px",
                    marginBottom: "10px",
                    border: "1px dashed #979A9A",
                    paddingLeft: "-100%",
                  }}
                />
              </div>

              <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center pt-3">
                <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                  <InputLabel
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                      marginTop: "-2%",
                    }}
                    required
                  >
                    {<IntlMessages id="user.name" />}
                  </InputLabel>
                  <TextField
                    required
                    // error={values.nameError}
                    id="userName"
                    name="userName"
                    value={values.userName || ""}
                    onChange={this.props.handleChange("userName")}
                    style={{
                      marginTop: "3%",
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  />
                  {/* <FormHelperText
                    error={values.nameError}
                    >
                      {values.nameError ? 'Nom de support de cours déja existe' : ''}
                    </FormHelperText> */}
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                  <InputLabel
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                      marginTop: "-2%",
                    }}
                    required
                  >
                    {<IntlMessages id="user.last.name" />}
                  </InputLabel>
                  <TextField
                    required
                    // error={values.nameError}
                    id="userLastName"
                    name="userLastName"
                    value={values.userLastName || ""}
                    onChange={this.props.handleChange("userLastName")}
                    style={{
                      marginTop: "3%",
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  />
                  {/* <FormHelperText
                    error={values.nameError}
                    >
                      {values.nameError ? 'Nom de support de cours déja existe' : ''}
                    </FormHelperText> */}
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-0 d-flex justify-content-center">
                  <div className="col-md-2 p-1 d-flex justify-content-center align-items-end ">
                    <Radio
                      checked={values.userGender == "Male"}
                      onChange={this.props.handleChange("userGender")}
                      value="Male"
                      color="primary"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "D" }}
                    />
                    <WcIcon color="primary" style={{ fontSize: 60 }} />
                    <Radio
                      checked={values.userGender == "Female"}
                      onChange={this.props.handleChange("userGender")}
                      value="Female"
                      color="primary"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "D" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-2">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      label={
                        <InputLabel
                          style={{
                            backgroundColor: "white",
                            fontFamily: "Roboto",
                            fontSize: "30px",
                            marginTop: "-16px",
                            width: "300px",
                          }}
                        >
                          {<IntlMessages id="user.birthday.date" />}
                        </InputLabel>
                      }
                      clearable
                      fullWidth
                      id="birthdayDate"
                      name="birthdayDate"
                      value={values.birthdayDate}
                      onChange={this.props.handleChangeBirthdayDate}
                      format="DD-MM-YYYY"
                      autoOk
                      style={{
                        marginTop: "4px",
                      }}
                      maxDate={moment().year() - 6 + "-01-01"}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-2">
                  <InputLabel
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                      marginTop: "-16px",
                      width: "300px",
                    }}
                  >
                    {<IntlMessages id="user.birthday.place" />}
                  </InputLabel>
                  <TextField
                    id="birthdayPlace"
                    name="birthdayPlace"
                    value={values.birthdayPlace || ""}
                    onChange={this.props.handleChange("birthdayPlace")}
                    style={{
                      marginTop: "3%",
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  />
                  {/* <FormHelperText
                    error={values.nameError}
                    >
                      {values.nameError ? 'Nom de support de cours déja existe' : ''}
                    </FormHelperText> */}
                </div>
              </div>

              <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center pt-3">
                {this.props.values.roleId === roleIdStudent ? (
                  <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                    <InputLabel
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "18px",
                        marginTop: "-2%",
                      }}
                      required
                    >
                      {<IntlMessages id="user.nationality" />}
                    </InputLabel>
                    <TextField
                      required
                      id="userNationnality"
                      name="userNationnality"
                      value={values.userNationnality || ""}
                      onChange={this.props.handleChange("userNationnality")}
                      style={{
                        marginTop: "3%",
                      }}
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </div>
                ) : (
                  <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                    <InputLabel
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "18px",
                        marginTop: "-2%",
                      }}
                    >
                      {<IntlMessages id="user.nationality" />}
                    </InputLabel>
                    <TextField
                      id="userNationnality"
                      name="userNationnality"
                      value={values.userNationnality || ""}
                      onChange={this.props.handleChange("userNationnality")}
                      style={{
                        marginTop: "3%",
                      }}
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </div>
                )}

                <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                  <InputLabel
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                      marginTop: "-2%",
                    }}
                    required
                  >
                    {<IntlMessages id="user.mail" />}
                  </InputLabel>
                  <TextField
                    required
                    error={isEmail(values.userMail) === false ? true : false}
                    id="userMail"
                    name="userMail"
                    value={values.userMail || ""}
                    onChange={this.props.handleChange("userMail")}
                    style={{
                      marginTop: "3%",
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    helperText={
                      isEmail(values.userMail) === false ? (
                        <IntlMessages id="error.user.message.mail" />
                      ) : (
                        ""
                      )
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                  <MuiPhoneNumber
                    error={
                      this.isValidphoneNumber(values.userPhoneNumber) ===
                        true || values.userPhoneNumber.length === 0
                        ? false
                        : true
                    }
                    id="userPhoneNumber"
                    name="userPhoneNumber"
                    // country={this.state.countrie_locale === "ar" ? "tn" : "fr"}
                    value={values.userPhoneNumber}
                    onChange={this.props.handleChangePhone}
                    fullWidth={true}
                    label={<IntlMessages id="user.phone.number" />}
                    placeholder="(+XXX) XXX XXX XXX"
                    helperText={
                      this.isValidphoneNumber(values.userPhoneNumber) ===
                        true || values.userPhoneNumber.length === 0 ? (
                        ""
                      ) : (
                        <IntlMessages id="error.user.message.phone" />
                      )
                    }
                  />
                </div>
                {this.props.values.roleId !== roleIdStudent ? (
                  <>
                    <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                      <InputLabel
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                          marginTop: "-2%",
                        }}
                      >
                        {<IntlMessages id="user.cin" />}
                      </InputLabel>
                      <TextField
                        // error={isCIN(values.userCIN) === false ? true : false}
                        id="userCIN"
                        id="userCIN"
                        name="userCIN"
                        type="number"
                        value={values.userCIN || ""}
                        onChange={this.props.handleChange("userCIN")}
                        style={{
                          marginTop: "3%",
                        }}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        // helperText={
                        //   isCIN(values.userCIN) === true ? (
                        //     ""
                        //   ) : (
                        //     <IntlMessages id="error.user.message.cin" />
                        //   )
                        // }
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="col-md-6 col-lg-2 col-sm-12 d-flex flex-row p-1">
                  <input
                    type="file"
                    className="d-none"
                    accept="image/png, image/jpeg,image/bmp"
                    id="add-photo"
                    onChange={(e) => this.props.uploadPhoto(e)}
                  />
                  <label htmlFor="add-photo" className="d-flex  bd-highlight">
                    <AddBox fontSize="inherit" style={{ fontSize: "40px" }} />
                  </label>
                  <div className="p-2 bd-highlight">
                    <Typography
                      variant="h6"
                      style={{
                        color: "grey",
                        fontWeight: "normal",
                      }}
                    >
                      <IntlMessages id="user.join.photo" />
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center pt-3">
                <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                  <InputLabel
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                      marginTop: "-2%",
                    }}
                  >
                    {<IntlMessages id="user.id" />}
                  </InputLabel>
                  <TextField
                    id="userIdentifier"
                    name="userIdentifier"
                    value={values.userIdentifier || ""}
                    onChange={this.props.handleChange("userIdentifier")}
                    style={{
                      marginTop: "3%",
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  />
                </div>

                <div className="col-md-6 col-lg-3 col-sm-12 p-1">
                  <InputLabel
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                      marginTop: "-2%",
                    }}
                  >
                    {<IntlMessages id="user.address.postal" />}
                  </InputLabel>
                  <TextField
                    id="userAdress"
                    name="userAdress"
                    value={values.userAdress || ""}
                    onChange={this.props.handleChange("userAdress")}
                    style={{
                      marginTop: "3%",
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                  <InputLabel
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                      marginTop: "-2%",
                    }}
                  >
                    {<IntlMessages id="zip.code.user" />}
                  </InputLabel>
                  <TextField
                    id="userZipCode"
                    name="userZipCode"
                    type="number"
                    value={values.userZipCode || ""}
                    onChange={this.props.handleChange("userZipCode")}
                    style={{
                      marginTop: "3%",
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                  <InputLabel
                    htmlFor="nomSelect"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "18px",
                    }}
                  >
                    {<IntlMessages id="country.user" />}
                  </InputLabel>
                  <Select
                    options={this.props.values.countriesList}
                    onChange={this.props.handleChangeCountries}
                    id="userCountry"
                    name="userCountry"
                    styles={{
                      control: (base) => ({
                        ...base,
                        "&:hover": { borderColor: "gray" }, // border style on hover
                        border: "1px solid lightgray", // default border color
                        boxShadow: "none", // no box-shadow
                        borderTopStyle: "none",
                        borderRightStyle: "none",
                        borderLeftStyle: "none",
                        borderRadius: " none",
                      }),
                    }}
                  />{" "}
                </div>
                {values.photoText == "" ? (
                  ""
                ) : (
                  <div className="col-md-6 col-lg-2 col-sm-12 p-1 d-flex flex-row-reverse">
                    <div>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          color: "#3F51B5",
                          fontWeight: "normal",
                          fontFamily: "Roboto",
                          fontSize: "15px",
                          marginTop: "10px",
                        }}
                      >
                        {values.photoText} &nbsp;
                      </Typography>
                    </div>
                    <PhotoIcon
                      style={{
                        fontSize: "55",
                      }}
                      color="primary"
                    />
                  </div>
                )}

                <div className="col-md-6 col-lg-1 col-sm-12 d-flex flex-row p-1"></div>
              </div>
              <hr
                style={{
                  width: "100%",
                  margin: "auto",
                  marginTop: "40px",
                  marginBottom: "10px",
                  border: "1px dashed #979A9A",
                  paddingLeft: "-100%",
                }}
              />
              <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap pt-3">
                <div className="col-md-6 col-lg-4 col-sm-12 p-1">
                  <div className="d-flex flex-row justify-content-start align-items-center ">
                    <input
                      type="file"
                      className="d-none"
                      accept="image/png, image/jpeg,image/bmp,application/pdf,application/docx"
                      id="add-file"
                      multiple
                      onChange={(e) => this.props.attachFile(e)}
                    />
                    <label htmlFor="add-file" className="d-flex  bd-highlight">
                      <CheckCircleIcon checked={true} color={"default"} />
                    </label>
                    <div className="p-2 bd-highlight">
                      <Typography
                        variant="h6"
                        style={{
                          color: "grey",
                          fontWeight: "normal",
                        }}
                      >
                        <IntlMessages id="user.join.papiers" />
                      </Typography>
                    </div>
                  </div>
                  <div className="bd-highlight" style={{ marginTop: "-40px" }}>
                    <i className="zmdi zmdi-caret-down zmdi-hc-2x mt-4 ml-1 "></i>
                  </div>
                  <div className="d-flex flex-row bd-highlight ">
                    <div className="p-2 bd-highlight ">
                      <hr
                        style={{
                          height: "80%",
                          margin: "auto",
                          marginTop: "5%",
                          marginBottom: "5%",
                          border: "1px dashed #979A9A",
                          paddingLeft: "-100%",
                        }}
                      />
                    </div>
                    <div className=" bd-highlight ">
                      <div className="d-flex flex-column bd-highlight mb-3">
                        {values.nameFiles.map((papier, index) => (
                          <div className=" bd-highlight " key={index}>
                            {/* {this.props.settings.languageId == "tunisia"
                              ? papier.name_ar
                              : this.props.settings.languageId == "french"
                              ? papier.name_fr
                              : papier.name_en} */}
                            {papier}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-8 col-sm-12 p-1">
                  <label>
                    <Typography
                      variant="h6"
                      style={{
                        color: "grey",
                        fontWeight: "normal",
                      }}
                    >
                      <IntlMessages id="inforamtions.user" />
                    </Typography>
                  </label>
                  <textarea
                    className="container"
                    id="usefulInformation"
                    name="usefulInformation"
                    rows="3"
                    value={values.usefulInformation || ""}
                    onChange={this.props.handleChange("usefulInformation")}
                    style={{
                      borderRadius: "20px",
                      marginTop: "10px",
                      width: "100%",
                    }}
                  ></textarea>
                </div>
              </div>
              <div class="col-lg-12 col-sm-12 col-md-12 d-flex flex-wrap flex-row justify-content-end pt-5">
                <div class="p-1">
                  <Button
                    variant="contained"
                    className="bg-grey text-white pr-2 "
                    style={{
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      width: "100px",
                      height: "30px",
                    }}
                    onClick={this.props.openAddModal}
                  >
                    {
                      <IntlMessages id="components.establishments.formadd.buttonCancel" />
                    }
                  </Button>
                </div>
                <div className="p-1">
                  <Button
                    // disabled={values.roleId ==="" || values.schoolyearId===""}
                    variant="contained"
                    style={{
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      width: "100px",
                      height: "30px",
                    }}
                    className=" bg-indigo text-white pr-2 "
                    type="submit"
                  >
                    <IntlMessages id="service.button.publish" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </form>
        {this.state.importisOpen ? (
          <ModalImportUser
            values={this.state}
            handleCancel={this.handleCancel}
            handleSubmitImport={this.handleSubmitImport}
            checkDataFile={this.checkDataFile}
            onDrop={this.onDrop}
            options={this.props.values.listRoles}
            handleChangeRole={this.handleChangeRole}
          />
        ) : null}
        {this.state.exportHasOpen ? (
          <ModalExportUser
            values={this.state}
            handleCancel={this.handleCancel}
            handleSubmitExportCsv={this.handleSubmitExportCsv}
            options={this.props.values.classForStudent}
            handleChangeClass={this.handleChangeClass}
          />
        ) : null}
        {this.state.alerteImportStatus ? (
          <AlerteImport
            modal={this.state.alerteImportStatus}
            message={this.state.alerteImportMessage}
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
    ClassSettings: state.ClassSettingsReducer.classSettings,
    usersReducer: state.usersReducer,
    userProfile: state.auth.userProfile,
    schoolYearEtabs: state.schoolYearEtab.remoteSchoolYearEtab,
  };
}

export default connect(mapStateToProps, { getAllRole, importUsersFromFile })(
  AddUsers
);
