import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import { UncontrolledAlert } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import CardBox from "../../../../../components/CardBox/index";
import MenuItem from "@material-ui/core/MenuItem";
import ListGrade from "./ListGrade.js";
import { connect } from "react-redux";
import {
  addGrade,
  getGrades,
  updateGrade,
  updateAlerte,
  resetAlerte,
} from "../../../../../actions/noteActions";

import { getSubject } from "../../../../../actions/subjectAction";
import { getExam } from "../../../../../actions/examAction";
import { getLevelsVirtualClass } from "../../../../../actions/classLevelAction";
import { getEstablishment } from "../../../../../actions/establishmentAction";
import { getSectionFromLevel } from "../../../../../actions/sectionAction";
import { getStudentClass } from "../../../../../actions/RegistreAction";
import { subjectsByLevelBySection } from "../../../../../actions/subjectAction";
import axios from "axios";
import baseUrl from "../../../../../config/config";
import _ from "lodash";

function mapStateToProps(state) {
  return {
    classSections: state.classSections.remoteSections,
    establishments: state.establishment.remoteEstablishments,
    levels: state.ClassLevels.remoteLevels,
    subjects: state.subject.remoteSubjects,
    classes: state.classes,
    students: state.callRegister.studentsClass,
    settings: state.settings.locale,
    exams: state.exam.remoteExams,
    grades: state.grade.grades,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
}
const periodExam = [
  {
    value: "1er Trimestre",
    label: <IntlMessages id="first.trimester" />,
  },
  {
    value: "2eme Trimestre",
    label: <IntlMessages id="second.trimester" />,
  },
  {
    value: "3eme Trimestre",
    label: <IntlMessages id="third.trimester" />,
  },
  {
    value: "Session Controle",
    label: <IntlMessages id="controlSession" />,
  },
];
class Grades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Disable_section: true,
      examen: "",
      classe: "",
      level: "",
      section: "",
      subject: "",
      period: "",
      studentList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.addGrade = this.addGrade.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.reset = this.reset.bind(this);
  }
  addGrade = () => {
    var newData = [];
    var oldData = [];
    this.state.studentList.map((grade, index) => {
      if (grade.id == "") {
        newData.push({
          student_id: grade.student_id,
          note: grade.note,
          class_id: this.state.classe,
          exam_id: this.state.examen,
          status: true,
        });
      } else {
        oldData.push({
          id: grade.id,
          student_id: grade.student_id,
          note: grade.note,
          class_id: this.state.classe,
          exam_id: this.state.examen,
          status: true,
        });
      }
    });

    if (newData.length > 0) {
      this.props.addGrade(newData);
    }
    if (oldData.length > 0) {
      oldData.map((gradeItem) => {
        this.props.updateGrade(gradeItem);
      });
      this.props.updateAlerte();
    }

    this.setState({
      studentList: [],
      subject: "",
      period: "",
      examen: "",
      level: "",
      section: "",
      classe: "",
    });
  };

  reset = () => {
    let grades = [];
    let data = [];
    this.state.studentList.map((option) =>
      data.push({
        student_id: option.student_id,
        id: option.id,
        note: "",
        class_id: this.state.classe,
        exam_id: this.state.examen,
        status: true,
      })
    );
    this.state.studentList.map((option) =>
      grades.push({
        student_id: option.student_id,
        id: option.id,
        note: "",
        studentInfo: option.studentInfo,
      })
    );

    data.map((gradeItem) => {
      this.props.updateGrade(gradeItem);
    });
    this.props.resetAlerte();

    this.setState({
      studentList: grades,
    });
  };
  componentWillMount() {
     this.props.getEstablishment();
    this.props.getLevelsVirtualClass();
    this.props.getSubject();
    this.props.getExam();
  }

  handleBlur = (event) => {};

  handleChange = (name) => (event) => {
    if (name === "level") {
      if (event.target.value > 10) {
        this.setState({
          [name]: event.target.value,
          Disable_section: false,
          classe: "",
          section: 0,
          studentList: [],
          subject: "",
          period: "",
          examen: "",
        });
      } else {
        this.setState({
          [name]: event.target.value,
          Disable_section: true,
          classe: "",
          section: 0,
          subject: "",
          studentList: [],
          period: "",
          examen: "",
        });
      }
    } else if (name === "section") {
      this.setState({
        classe: "",
        studentList: [],
        [name]: event.target.value,
        period: "",
        examen: "",
      });
    } else if (name === "classe") {
      var studentGrades = [];
      this.setState({
        [name]: event.target.value,
        period: "",
        subject: "",
        examen: "",
      });
      axios

        .get(
          `${baseUrl.baseUrl}/students/fetchAllStudentsDataByClassID/` +
            event.target.value +
            `?access_token=${localStorage.token}`
        )
        .then((res) => {
          res.data.classData.map((option) => {
            if (option.profile.user.status) {
              studentGrades.push({
                id: "",
                student_id: option.id,
                note: "",
                studentInfo: option,
              });
            }
          });

          this.setState({
            studentList: studentGrades,
          });
        });
    } else if (name === "subject") {
      let studentGrades = [];
      this.state.studentList.map((option) => {
        studentGrades.push({
          id: "",
          student_id: option.student_id,
          note: "",
          studentInfo: option.studentInfo,
        });
      });
      this.setState({
        [name]: event.target.value,
        period: "",
        examen: "",
        studentList: studentGrades,
      });
    } else if (name === "period") {
      let studentGrades = [];
      this.state.studentList.map((option) => {
        studentGrades.push({
          id: "",
          student_id: option.student_id,
          note: "",
          studentInfo: option.studentInfo,
        });
      });

      this.setState({
        [name]: event.target.value,
        examen: "",
        studentList: studentGrades,
      });
    } else if (name === "examen") {
      let studentGrades = [];
      this.state.studentList.map((option) => {
        studentGrades.push({
          id: "",
          student_id: option.student_id,
          note: "",
          studentInfo: option.studentInfo,
        });
      });
      let apiEndpoint =
        `${baseUrl.baseUrl}/notes?access_token=${localStorage.token}&filter[where][and][0][exam_id]=` +
        event.target.value +
        `&filter[where][and][1][class_id]=` +
        this.state.classe;
      axios.get(apiEndpoint).then((res) => {
        if (res.data.length > 0) {
          res.data.map((option) => {
            let index = _.findIndex(studentGrades, {
              student_id: option.student_id,
            });
            if (index >= 0) {
              _.fill(
                studentGrades,
                {
                  id: option.id,
                  student_id: option.student_id,
                  note: option.note,
                  studentInfo: studentGrades[index].studentInfo,
                },
                index,
                index + 1
              );
            }
          });

          this.setState({
            studentList: studentGrades,
          });
        } else {
          this.setState({
            studentList: studentGrades,
          });
        }
      });

      this.setState({
        [name]: event.target.value,
      });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleChangeNote = (id) => (event) => {
    let ListNote = this.state.studentList;
    let index = _.findIndex(ListNote, { student_id: id });
    _.fill(
      ListNote,
      {
        id: ListNote[index].id,
        student_id: id,
        note: event.target.value,
        studentInfo: ListNote[index].studentInfo,
      },
      index,
      index + 1
    );
    this.setState({ studentList: ListNote });
  };

  render() {
    const sections = Array.from(this.props.classSections);
    const levels = Array.from(this.props.levels);
    const establishments = Array.from(this.props.establishments);
    const classes = Array.from(this.props.classes);

    let estab_typeId;
    if (establishments.length !== 0) {
      estab_typeId = establishments.filter(
        (estab) => estab.id == localStorage.establishment_id
      )[0].estab_type_id;
    }
    return (
      <div className="app-wrapper">
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
        <div className="row">
          <CardBox
            heading={<IntlMessages id="component.grade.form.filter.class" />}
          >
            <div className="row">
              <div className="col-sm-4" align="left">
                <TextField
                  required
                  id="level"
                  select
                  helperText={<IntlMessages id="components.note.niveau" />}
                  value={this.state.level}
                  onChange={this.handleChange("level")}
                  SelectProps={{}}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                >
                  {levels.map((option) =>
                    option.estab_type_id === estab_typeId ? (
                      <MenuItem key={option.id} value={option.id}>
                        {this.props.settings.languageId == "tunisia"
                          ? option.name_AR
                          : this.props.settings.languageId == "french"
                          ? option.name_FR
                          : option.name_EN}
                      </MenuItem>
                    ) : (
                      ""
                    )
                  )}
                </TextField>
              </div>
              <div className="col-sm-4" align="left">
                <TextField
                  required
                  disabled={this.state.Disable_section}
                  id="Section"
                  select
                  helperText={
                    <IntlMessages id="components.class.level.input.label.section" />
                  }
                  value={this.state.section}
                  onChange={this.handleChange("section")}
                  SelectProps={{}}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                >
                  {getSectionFromLevel(sections, this.state.level).map(
                    (option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </div>
              <div className="col-sm-4" align="left">
                <TextField
                  required
                  id="classe"
                  select
                  helperText={<IntlMessages id="components.note.class" />}
                  value={this.state.classe}
                  onChange={this.handleChange("classe")}
                  SelectProps={{}}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                >
                  {this.state.level > 10
                    ? classes.map((option) =>
                        option.level_id === this.state.level &&
                        option.section_id === this.state.section &&
                        option.establishment_id === estab_typeId &&
                        option.status ? (
                          <MenuItem key={option.id} value={option.id}>
                            {this.props.settings.languageId == "tunisia"
                              ? option.ar_name
                              : option.name}
                          </MenuItem>
                        ) : (
                          ""
                        )
                      )
                    : classes.map((option) =>
                        option.level_id === this.state.level &&
                        option.establishment_id === estab_typeId &&
                        option.status ? (
                          <MenuItem key={option.id} value={option.id}>
                            {this.props.settings.languageId == "tunisia"
                              ? option.ar_name
                              : option.name}{" "}
                          </MenuItem>
                        ) : (
                          ""
                        )
                      )}
                </TextField>
              </div>
            </div>
          </CardBox>
          <CardBox
            heading={<IntlMessages id="component.grade.form.filter.exam" />}
          >
            <div className="row">
              <div className="col-sm-4" align="left">
                <TextField
                  required
                  id="subject"
                  select
                  helperText={<IntlMessages id="components.note.subject" />}
                  value={this.state.subject}
                  onChange={this.handleChange("subject")}
                  SelectProps={{}}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                >
                  {subjectsByLevelBySection(
                    this.props.subjects,
                    this.state.level,
                    this.state.section
                  ).map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {this.props.settings.languageId == "tunisia"
                        ? subject.name_AR
                        : this.props.settings.languageId == "french"
                        ? subject.name_FR
                        : subject.name_EN}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-4" align="left">
                <TextField
                  required
                  name="period"
                  id="period"
                  select
                  helperText={<IntlMessages id="components.note.période" />}
                  onChange={this.handleChange("period")}
                  value={this.state.period}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                >
                  {periodExam.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-4" align="left">
                <TextField
                  required
                  id="examen"
                  select
                  helperText={<IntlMessages id="components.note.exam" />}
                  value={this.state.examen}
                  onChange={this.handleChange("examen")}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                >
                  {this.props.exams.map((exam) =>
                    exam.class_id === this.state.classe &&
                    exam.subject_id === this.state.subject &&
                    exam.period === this.state.period &&
                    exam.status ? (
                      <MenuItem key={exam.id} value={exam.id}>
                        {exam.type}
                      </MenuItem>
                    ) : (
                      ""
                    )
                  )}
                </TextField>
              </div>
            </div>
          </CardBox>
        </div>
        <ListGrade
          reset={this.reset}
          handleChangeNote={this.handleChangeNote}
          studentList={this.state.studentList}
          addGrade={this.addGrade}
          classId={this.state.classe}
          examId={this.state.examen}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getSubject,
  getExam,
  getLevelsVirtualClass,
  getEstablishment,
   getSectionFromLevel,
  getStudentClass,
  addGrade,
  getGrades,
  updateGrade,
  updateAlerte,
  resetAlerte,
})(Grades);
