import React from "react";
import LessonListItem from "./LessonListItem";
import CardBox from "../../../components/CardBox/index";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import { getSectionFromLevel } from "../../../actions/sectionAction";
import { getLevelListFromEstabType } from "../../../actions/classLevelAction";
import IntlMessages from "../../../util/IntlMessages";
import Can from "../../../can";
import { RoleContext } from "../../../Context";
import { roleIdProfessor, roleIdStudent } from "../../../config/config";
import { getLessonByClassId } from "../../../actions/LessonAction";
import { editLesson, deleteLesson } from "../../../actions/LessonAction";
import { connect } from "react-redux";
import _ from "lodash";
import EditLesson from "./EditLesson";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import axios from "axios";
import baseUrl from "../../../config/config";
import Input from "@material-ui/icons/Input";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteLesson from "./DeleteLesson";
import DownloadFiles from "./DownloadFiles";

class LessonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedit: false,
      section_id: "",
      class_id: "",
      level_id: "",
      sectionDisabled: true,
      classeDisabled: true,
      studentClassesByLevelSectionID: [],
      subject_id: "",
      lessons: [],
      item: {},
      levelItem: {},
      course_object: "",
      details: "",
      selectedFilterDateProfessor: null,
      ProfessorCoursList: [],
      studentCoursList: [],
      studentSubjectList: [],
      tags: null,
      sections: [],
      url: "",
      anchorEl: undefined,
      menuState: false,
      deleteIsopen: false,
      opendownload: false,
      deleteItem: {},
      showItem: {},
      id: null,
    };
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleChangeSection = this.handleChangeSection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);

    this.editLessonList = this.editLessonList.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeDateProfessor = this.handleChangeDateProfessor.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.handleShowdelete = this.handleShowdelete.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.handleDeleteLesson = this.handleDeleteLesson.bind(this);
    this.handleShowDownloadModal = this.handleShowDownloadModal.bind(this);
  }
  onOptionMenuSelect = (event) => {
    this.setState({
      menuState: true,
      anchorEl: event.currentTarget,
    });
  };

  handleDeleteLesson = (item, event) => {
    event.preventDefault();
    console.log("ccccccc", this.state.deleteItem.id);
    this.props.deleteLesson(this.state.deleteItem.id);
    this.setState({ deleteIsopen: false, menuState: false, deleteItem: item });
  };
  cancelModal() {
    this.setState({ deleteIsopen: false });
  }

  handleShowDownloadModal = (item) => {
    console.log("download modale", item);

    this.setState({
      opendownload: true,
      menuState: false,
      anchorEl: undefined,
      downlaodItem: item,
    });
  };

  handleShowdelete = (item) => {
    this.setState({
      deleteItem: item,
      deleteIsopen: true,
    });
  };

  handleCancel = () => {
    this.setState({
      opendownload: false,
      openedit: false,
    });
  };

  handleChangeDateProfessor = (date) => {
    if (date === null) {
      this.setState({
        selectedFilterDateProfessor: null,
      });
    } else {
      this.setState({
        selectedFilterDateProfessor: date.format().slice(0, 10),
      });
    }
  };

  editLessonList = () => {
    var data = {};
    data.name = this.state.course_object;
    data.details = this.state.details;
    data.creation_date = this.state.lesson.creation_date;
    data.status = this.state.lesson.status;
    data.file = this.state.lesson.file;
    data.class_professor_id = this.state.lesson.class_professor_id;
    data.id = this.state.lesson.id;
    this.props.editLesson(data);
    this.setState({
      course_object: "",
      details: "",
      openedit: false,
    });
  };
  handleEdit = (courseObject) => {
    this.setState({
      openedit: true,
      lesson: courseObject,
      course_object: courseObject.name,
      details: courseObject.details,
    });
  };
  handleChangeClass = (name) => (event) => {
    this.setState({
      selectedFilterDateProfessor: null,
    });
    if (event.target.value === "0") {
      this.setState({ [name]: "" });
    } else {
      this.setState({ [name]: event.target.value });
      this.props.getLessonByClassId(event.target.value);
    }
  };
  handleChangeSubject = (name) => (event) => {
    if (event.target.value === "0") {
      this.setState({ [name]: "" });
    } else {
      this.setState({ [name]: event.target.value });
    }
    this.setState({
      selectedFilterDateProfessor: null,
    });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeLevel = (name) => (event) => {
    let sections = this.props.sections.filter(
      (element) => element.fk_id_level_v3 === event.target.value
    );
    this.setState({
      sections,
      section_id: 0,
      class_id: 0,
      classeDisabled: true,
      [name]: event.target.value,
    });
    if (!_.isEmpty(sections)) {
      this.setState({ sectionDisabled: false, class_id: 0 });
    } else {
      const filtredClassesD = this.props.classes.filter(
        (classe) =>
          classe.fk_id_level_v3 === event.target.value && classe.status
      );
      this.setState({
        sectionDisabled: true,
        class_id: 0,
        classeDisabled: false,
        studentClassesByLevelSectionID: filtredClassesD,
      });
    }
  };
  handleChangeSection = (name) => (event) => {
    const filtredClasses = this.props.classes.filter(
      (classe) =>
        classe.fk_id_level_v3 === this.state.level_id &&
        classe.fk_id_section_v3 === event.target.value &&
        classe.status
    );
    this.setState({
      class_id: 0,
      classeDisabled: false,
      [name]: event.target.value,
      studentClassesByLevelSectionID: filtredClasses,
    });
  };

  componentDidMount() {
    if (this.props.roleId === roleIdStudent) {
      axios
        .get(
          `${baseUrl.baseUrl}/profiles/fetchLessonByprofileID/` +
            this.props.userProfile.id +
            `?access_token=${localStorage.token}`
        )
        .then((res) => {
          this.setState({ studentCoursList: res.data.lessonData });
        });
      axios
        .get(
          `${baseUrl.baseUrl}/profiles/fetchSubjectByprofileID/` +
            this.props.userProfile.id +
            `?access_token=${localStorage.token}`
        )
        .then((res) => {
          this.setState({ studentSubjectList: res.data.subjectData });
        });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.roleId === roleIdProfessor) {
      if (prevProps.lessons !== this.props.lessons) {
        let classList = this.props.classes;
        if (!_.isEmpty(classList)) {
          const filtredClasses = Array.from(classList).filter(
            (classe) => classe.status
          );
          this.setState({
            classeDisabled: false,
            studentClassesByLevelSectionID: filtredClasses,
          });
        }

        let apiEndpoint = `${baseUrl.baseUrl}/courses?access_token=${localStorage.token}&filter[include][classProfSubject]`;
        axios.get(apiEndpoint).then((res) => {
          var CoursList = res.data.filter((element) => element.status);
          axios
            .get(
              `${baseUrl.baseUrl}/profiles/` +
                this.props.userProfile.id +
                `/professors?access_token=${localStorage.token}`
            )
            .then((res) => {
              var ProfId = res.data[0].id;
              var ProfessorCoursList = CoursList.filter(
                (element) => element.classProfSubject.professor_id === ProfId
              );
              this.setState({
                ProfessorCoursList: ProfessorCoursList,
              });
            });
        });
      }
    }
  }

  onTagsChange = (event, values) => {
    this.setState({
      tags: values,
      selectedFilterDateProfessor: null,
      subject_id: "",
    });
  };

  render() {
    const { levels, lessons } = this.props;
    const { sections } = this.state;
    var CourListByRole = [];
    console.log("lesson", this.props.lesson);
    //il faut metre une méthode générique pour else et if
    if (this.props.userProfile.role_id === roleIdProfessor) {
      if (
        this.state.class_id === "" &&
        this.state.selectedFilterDateProfessor === null
      ) {
        CourListByRole = this.state.ProfessorCoursList;
      } else if (
        this.state.class_id !== "" &&
        this.state.selectedFilterDateProfessor === null
      ) {
        CourListByRole = this.state.ProfessorCoursList.filter(
          (element) => element.classProfSubject.class_id === this.state.class_id
        );
      } else if (
        this.state.class_id === "" &&
        this.state.selectedFilterDateProfessor !== null
      ) {
        CourListByRole = this.state.ProfessorCoursList.filter(
          (element) =>
            element.creation_date.slice(0, 10) ===
            this.state.selectedFilterDateProfessor
        );
      } else {
        CourListByRole = this.state.ProfessorCoursList.filter(
          (element) =>
            element.creation_date.slice(0, 10) ===
              this.state.selectedFilterDateProfessor &&
            element.classProfSubject.class_id === this.state.class_id
        );
      }
    } else if (this.props.userProfile.role_id === roleIdStudent) {
      if (
        this.state.subject_id === "" &&
        this.state.selectedFilterDateProfessor === null &&
        this.state.tags === null
      ) {
        CourListByRole = this.state.studentCoursList.filter(
          (element) => element.status === true
        );
      } else if (
        this.state.subject_id !== "" &&
        this.state.selectedFilterDateProfessor === null
      ) {
        CourListByRole = this.state.studentCoursList.filter(
          (element) =>
            element.subject_id === this.state.subject_id &&
            element.status === true
        );
      } else if (
        this.state.subject_id !== "" &&
        this.state.selectedFilterDateProfessor !== null
      ) {
        CourListByRole = this.state.studentCoursList.filter(
          (element) =>
            element.creation_date.slice(0, 10) ===
              this.state.selectedFilterDateProfessor &&
            element.subject_id === this.state.subject_id &&
            element.status === true
        );
      } else if (
        this.state.tags !== null &&
        this.state.subject_id === "" &&
        this.state.selectedFilterDateProfessor === null
      ) {
        CourListByRole = this.state.studentCoursList.filter(
          (element) =>
            element.id === this.state.tags.id && element.status === true
        );
      } else {
        CourListByRole = this.state.studentCoursList.filter(
          (element) =>
            element.creation_date.slice(0, 10) ===
              this.state.selectedFilterDateProfessor &&
            element.subject_id === this.state.subject_id &&
            element.status === true
        );
      }
    } else {
      CourListByRole = lessons;
    }
    return (
      <div>
        <div className="row mb-md-3">
          <CardBox styleName="col-lg-12 text-primary">
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="lesson-filter:visit"
                  yes={() => (
                    <div className="row">
                      <Can
                        role={role}
                        perform="lesson-filter-level:visit"
                        yes={() => (
                          <div className="col-md-2 text-left">
                            <TextField
                              name="level_id"
                              id="level_id"
                              select
                              label={
                                <IntlMessages id="components.note.niveau" />
                              }
                              value={this.state.level_id}
                              defaultValue=" "
                              onChange={this.handleChangeLevel("level_id")}
                              SelectProps={{}}
                              margin="normal"
                              fullWidth
                            >
                              {this.props.levels.map((levelItem) => (
                                <MenuItem
                                  key={levelItem.id}
                                  value={levelItem.id}
                                >
                                  {levelItem.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        )}
                      />
                      <Can
                        role={role}
                        perform="lesson-filter-section:visit"
                        yes={() => (
                          <div className="col-md-2 text-left">
                            <TextField
                              name="section_id"
                              id="section_id"
                              select
                              disabled={this.state.sectionDisabled}
                              label={
                                <IntlMessages id="components.class.level.input.label.section" />
                              }
                              value={this.state.section_id}
                              onChange={this.handleChangeSection("section_id")}
                              SelectProps={{}}
                              margin="normal"
                              fullWidth
                            >
                              {sections.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        )}
                      />

                      <Can
                        role={role}
                        perform="lesson-filter-class:visit"
                        yes={() => (
                          <div className="col-md-2 text-left">
                            <TextField
                              name="class_id"
                              id="class_id"
                              disabled={this.state.classeDisabled}
                              select
                              label={
                                <IntlMessages id="components.student.formadd.classe" />
                              }
                              value={this.state.class_id}
                              onChange={this.handleChangeClass("class_id")}
                              SelectProps={{}}
                              margin="normal"
                              fullWidth
                            >
                              <MenuItem key="0" value="0">
                                <IntlMessages id="all.label" />
                              </MenuItem>
                              {this.state.studentClassesByLevelSectionID.map(
                                (classe) => (
                                  <MenuItem key={classe.id} value={classe.id}>
                                    {classe.name}
                                  </MenuItem>
                                )
                              )}
                            </TextField>
                          </div>
                        )}
                      />

                      <Can
                        role={role}
                        perform="lesson-filter-student-subject:visit"
                        yes={() => (
                          <div
                            className="col-md-2 text-left"
                            style={{ marginTop: "-16px" }}
                          >
                            <TextField
                              id="subject_id"
                              name="subject_id"
                              select
                              label={
                                <IntlMessages id="components.note.subject" />
                              }
                              value={this.state.subject_id}
                              onChange={this.handleChangeSubject("subject_id")}
                              SelectProps={{}}
                              margin="normal"
                              fullWidth
                            >
                              <MenuItem key="0" value="0">
                                <IntlMessages id="all.subject" />
                              </MenuItem>
                              {this.state.studentSubjectList.map((subject) => (
                                <MenuItem key={subject.id} value={subject.id}>
                                  {subject.name_FR}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        )}
                      />
                      <Can
                        role={role}
                        perform="lesson-filter-date:visit"
                        yes={() => (
                          <div className="col-md-2 text-right">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                label="                                           "
                                clearable
                                fullWidth
                                id="selectedFilterDateProfessor"
                                name="selectedFilterDateProfessor"
                                value={this.state.selectedFilterDateProfessor}
                                onChange={this.handleChangeDateProfessor}
                                format="MM-DD-YYYY"
                                autoOk
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        )}
                      />
                      <Can
                        role={role}
                        perform="lesson-filter-search:visit"
                        yes={() => (
                          <div className="col-md-2 text-right">
                            <div className="form-group">
                              <Autocomplete
                                id="combo-box-demo"
                                options={this.state.studentCoursList}
                                onChange={this.onTagsChange}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label={<IntlMessages id="search.lesson" />}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        )}
                      />
                      <Can
                        role={role}
                        perform="lesson-class-add"
                        yes={() => (
                          <div className="col-md-6 text-right ">
                            <Fab
                              size="small"
                              color="primary"
                              aria-label="Add"
                              onClick={this.props.openAddModal}
                            >
                              <AddIcon />
                            </Fab>
                            &nbsp;&nbsp;&nbsp;
                            <Fab size="small" color="primary">
                              <Input />
                            </Fab>
                            <br></br>
                          </div>
                        )}
                      />
                    </div>
                  )}
                />
              )}
            </RoleContext.Consumer>
          </CardBox>
        </div>
        <div className="row animated slideInUpTiny animation-duration-3">
          {CourListByRole.map((courseItem, index) => (
            <LessonListItem
              handleShowdelete={this.handleShowdelete}
              cancelModal={this.cancelModal}
              handleDeleteLesson={this.handleDeleteLesson}
              handleShowDownloadModal={this.handleShowDownloadModal}
              url={this.state.url}
              anchorEl={this.state.anchorEl}
              menuState={this.state.menuState}
              deleteIsopen={this.state.deleteIsopen}
              opendownload={this.state.opendownload}
              key={index}
              courseItem={courseItem}
              // lesson={lesson}
              handleEdit={this.handleEdit}
              divEyeClassname={this.props.divEyeClassname}
              divEyeClassnameSpace={this.props.divEyeClassnameSpace}
            />
          ))}
        </div>
        {this.state.openedit ? (
          <EditLesson
            lesson={this.state.item}
            levels={levels}
             sections={sections}
            // courseItem={courseItem}
            openedit={this.state.openedit}
            values={this.state}
            editLessonList={this.editLessonList}
            handleChange={this.handleChange}
            handleCancel={this.handleCancel}
           />
        ) : (
          ""
        )}
        {this.state.deleteIsopen ? (
          <DeleteLesson
            item={this.state.item}
            cancelModal={this.cancelModal}
            handleDeleteLesson={this.handleDeleteLesson}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
          ""
        )}
        {this.state.opendownload ? (
          <DownloadFiles
            opendownload={this.state.opendownload}
            handleCancel={this.handleCancel}
            lessonId={this.state.downlaodItem.id}
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
    // classes: state.classes,
    userProfile: state.auth.userProfile,
    // levels: state.ClassLevels.remoteLevels,
    // sections: state.classSections.remoteSections,
    lessons: state.lessons.remoteLessons,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    levels: state.levelsReducer.levels,
    sections: state.SectionsReducer.Section,
    classes: state.ClassSettingsReducer.classSettings,
  };
}
export default connect(
  mapStateToProps,
  {
    getLessonByClassId,
    editLesson,
    deleteLesson,
  }
)(LessonList);
