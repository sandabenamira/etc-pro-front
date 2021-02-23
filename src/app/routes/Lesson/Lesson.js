import React from "react";
import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import { connect } from "react-redux";
import { getUserProfile } from "../../../actions/Auth";
import axios from "axios";
import baseUrl from "../../../config/config";
import { getClassesByUserId } from "../../../actions/classeAction";
import LessonList from "./LessonList";
import { getLessons } from "../../../actions/LessonAction";
import { roleIdProfessor, roleIdStudent } from "../../../config/config";
import AddLesson from "./AddLesson";
import { addLesson } from "../../../actions/LessonAction";
import { UncontrolledAlert } from "reactstrap";
import _ from "lodash";

class Lesson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      estab_type_id: "",
      open: false,
      section_id: "",
      class_id: "",
      subject_id: "",
      professor_id: "",
      course_object: "",
      class_professor_id: 1,
      description: "",
      level_id: "",
      sectionDisabled: true,
      classeDisabled: true,
      open: false,
      coursefile: {},
      Disable_studentsection: true,
      studentClassesByLevelSectionID: [],
      subjectList: [],
      establishmentProfessor: [],
      divClassName: "col-md-6",
      divEyeClassname: "d-flex col-md-2",
      divEyeClassnameSpace: "d-flex col-md-6",
      sections: [],
    };
    this.cancelModal = this.cancelModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.handleChangestudentLevel = this.handleChangestudentLevel.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
  }

  handleChangestudentLevel = (name) => (event) => {
    let sections = this.props.sections.filter(
      (element) => element.fk_id_level_v3 === event.target.value
    );
    this.setState({
      sections,
      [name]: event.target.value,
      section_id: 0,
      class_id: 0,
    });
    if (!_.isEmpty(sections)) {
      this.setState({ Disable_studentsection: false });
    } else {
      var studentfiltredClasses = this.props.classes.filter(
        (classe) =>
          classe.fk_id_level_v3 === event.target.value && classe.status
      );
      this.setState({
        Disable_studentsection: true,
        section_id: 0,
        studentClassesByLevelSectionID: studentfiltredClasses,
      });
    }
  };

  handleChangestudentSection = (name) => (event) => {
    var studentfiltredClasses = this.props.classes.filter(
      (classe) =>
        classe.fk_id_level_v3 === this.state.level_id &&
        classe.fk_id_section_v3 === event.target.value &&
        classe.status
    );
    this.setState({
      [name]: event.target.value,
      studentClassesByLevelSectionID: studentfiltredClasses,
    });
  };

  handleChangeClass = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    if (this.props.userProfile.role_id === roleIdProfessor) {
      var chosenClass = this.state.studentClassesByLevelSectionID.filter(
        (classe) => classe.id === event.target.value
      );
      this.setState({
        level_id: chosenClass[0].level_id,
        section_id: chosenClass[0].section_id,
      });
    }
  };
  handleChangeSubject = (name) => (event) => {
    this.setState({ [name]: event.target.value });

    let apiEndpoint =
      `${baseUrl.baseUrl}/classes_professors?access_token=${localStorage.token}&filter[where][and][0][subject_id]=` +
      event.target.value +
      `&filter[where][and][1][class_id]=` +
      this.state.class_id +
      `&filter[include][professor][profile][user]`;
    axios.get(apiEndpoint).then((res) => {
      this.setState({ establishmentProfessor: res.data });
      if (this.props.userProfile.role_id === roleIdProfessor) {
        var classProfessorID = this.state.establishmentProfessor[0].id;
        this.setState({ class_professor_id: classProfessorID });
      }
    });
  };
  handleChangeProfessor = (name) => (event) => {
    var classProfessorID = this.state.establishmentProfessor[0].id;
    this.setState({
      professor_id: event.target.value,
      class_professor_id: classProfessorID,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      const establishmentId = this.props.userProfile.establishment_id;
      this.props.getRoomsByEstablshment(
        establishmentId,
        this.props.userProfile.school_year_id
      );
    }
  }
  componentDidMount() {
    if (this.props.userProfile.role_id === roleIdProfessor) {
    } else {
      this.props.getLessons(this.props.userProfile.establishment_id);
      axios
        .get(
          `${baseUrl.baseUrl}/establishments/` +
            this.props.userProfile.establishment_id +
            `?access_token=${localStorage.token}`
        )
        .then((res) => {
          this.setState({
            estabType: res.data.estab_type_id,
            estab_type_id: res.data.estab_type_id,
            divClassName: "col-md-4",
          });
        });
      axios
        .get(`${baseUrl.baseUrl}/subjects?access_token=${localStorage.token}`)
        .then((res) => {
          const subjectList = res.data;
          this.setState({ subjectList });
        });
    }

    if (this.props.userProfile.role_id === roleIdStudent) {
      this.setState({
        divEyeClassname: "d-flex col-md-2",
        divEyeClassnameSpace: "d-flex col-md-5",
      });
    }
  }
  cancelModal() {
    this.setState({ open: false });
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  addCourse = () => {
    var data = {};
    data.name = this.state.course_object;
    data.details = this.state.description;
    data.creation_date = new Date();
    data.status = true;
    data.file = [];
    data.class_professor_id = this.state.class_professor_id;
    const files = this.state.coursefile;
    this.props.addLesson(data, files, this.props.userProfile.establishment_id);

    this.setState({
      section_id: "",
      class_id: "",
      subject_id: "",
      professor_id: "",
      course_object: "",
      description: "",
      level_id: "",
      estab_type_id: "",
      sectionDisabled: true,
      classeDisabled: true,
      open: false,
      coursefile: {},
      file: [],
      inputText: "",
    });
  };
  openAddModal() {
    this.setState({ open: true });
  }
  onDrop = (e) => {
    let fileName = [];
    let file = e.target.files;
    for (const file of e.target.files) {
      fileName.push(file.name + "");
    }
    this.setState({ coursefile: file, inputText: fileName });
  };

  render() {
    const {
      subjects,
      levels,
      sections,
      classes,
      lessons,
      userProfile,
    } = this.props;

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.components.lesson" />}
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
        &nbsp;&nbsp;&nbsp;
        <AddLesson
          open={this.state.open}
          cancel={this.cancelModal}
          levels={levels}
          subjects={subjects}
          sections={sections}
          values={this.state}
          addCourse={this.addCourse}
          onDrop={this.onDrop}
          handleChange={this.handleChange}
          handleCancel={this.cancelModal}
          handleChangeClass={this.handleChangeClass}
          handleChangestudentLevel={this.handleChangestudentLevel}
          handleChangestudentSection={this.handleChangestudentSection}
          handleChangeClass={this.handleChangeClass}
          handleChangeSubject={this.handleChangeSubject}
          handleChangeProfessor={this.handleChangeProfessor}
        />
        <LessonList
          lessons={lessons}
          estab_type_id={this.state.estab_type_id}
          classes={classes}
          roleId={userProfile.role_id}
          divEyeClassname={this.state.divEyeClassname}
          divEyeClassnameSpace={this.state.divEyeClassnameSpace}
          openAddModal={this.openAddModal}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    lessons: state.lessons.remoteLessons,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    levels: state.levelsReducer.levels,
    sections: state.SectionsReducer.Section,
    classes: state.ClassSettingsReducer.classSettings,
    subjects: state.subject.subjects,
  };
}
export default connect(mapStateToProps, {
  getUserProfile,
  getLessons,
  getClassesByUserId,
  addLesson,
})(Lesson);
