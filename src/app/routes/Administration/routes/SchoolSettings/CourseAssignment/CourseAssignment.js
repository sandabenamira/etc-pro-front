import React from 'react';
import CardBox from '../../../../../../components/CardBox/index';
import { connect } from 'react-redux';
import AddAssignClassSubject from './AddAssignClassSubject';
import CoursesAssignmentList from './CoursesAssignmentList';
import ArchiveCourseAssignment from './ArchiveCourseAssignment';
import _ from 'lodash';
import { UncontrolledAlert } from 'reactstrap';
import { addAssignementCourse } from '../../../../../../actions/AssignementAction';
class CourseAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      class_id: '',
      subjectsSelected: [],
      isOpenArchive: false,
      class: '',
      assignementCourseExist: false,
      subjectList: [],
      ClassSettingsList: [],
      CoficientGlobal: null,
      courseAssignmentList: [],
      subjectIDselected: [],
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.openArchiveModal = this.openArchiveModal.bind(this);
    this.handleChangeAlerte = this.handleChangeAlerte.bind(this);
  }
  handleChangeAlerte = (name) => {
    this.setState({
      assignementCourseExist: true,
      messageAlerte: 'cette classe a déja cette matière',
    });
    setTimeout(() => {
      this.setState({ assignementCourseExist: false, messageAlerte: '' });
    }, 4000);
  };
  openArchiveModal() {
    this.setState((previousState) => ({
      isOpenArchive: !previousState.isOpenArchive,
    }));
  }
  handleChange = (event) => {
    this.setState({ CoficientGlobal: event.target.value });
  };

  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let newData = this.state.subjectsSelected.map((element) => {
      return {
        assignment_date: new Date(),
        status: true,
        global_coefficient: this.state.CoficientGlobal,
        fk_id_class_v4: this.state.class_id,
        fk_id_subject_v4: element.id,
        class: this.state.class,
        subject: element,
        course: [],
      };
    });
    this.props.dispatch(addAssignementCourse(newData));
    this.setState({
      open: false,
      class_id: '',
      subjectsSelected: [],
    });
  }

  handleChangeClass = (selectedOption) => {
    let subjectIDselected = [];
    this.state.courseAssignmentList.map((element) => {
      if (element.classItem.id===selectedOption.id) {
        subjectIDselected = element.subjects.map((subjectItem) => subjectItem.fk_id_subject_v4);
      }
    });
    this.setState({
      class_id: selectedOption.id,
      class: selectedOption,
      subjectIDselected,
    });
  };
  handleChangeSubject = (selectedOption) => {
    if (selectedOption != null) {
 
      let subjectsSelected = selectedOption;
      this.setState({
        subjectsSelected,
      });
    } else {
      this.setState({
        subjectsSelected: [],
      });
    }
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleCancel() {
    this.setState({ open: false });
  }
  componentDidMount() {
    if (this.props.subjects != undefined) {
      let subjectList = [];
      subjectList = this.props.subjects.map((element) => {
        var object = element;
        object.label = element.name;
        object.value = element.id;
        delete object.subjectModule;
        return object;
      });
      this.setState({ subjectList });
    }
    if (this.props.ClassSettings != undefined) {
      let ClassSettingsList = [];
      ClassSettingsList = this.props.ClassSettings.map((element) => {
        var object = element;
        object.label = element.name;
        object.value = element.id;

        return object;
      });
      this.setState({ ClassSettingsList });
    }
    if (this.props.courseAssignment != undefined) {
      let groupAssignment = _.groupBy(this.props.courseAssignment, 'class.name');
      let finalListAssignment = [];
      for (const property in groupAssignment) {
        finalListAssignment.push({
          classItem: groupAssignment[property][0].class,
          subjects: groupAssignment[property],
        });
      }
      this.setState({ courseAssignmentList: finalListAssignment });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.subjects !== this.props.subjects) {
      let subjectList = [];
      subjectList = this.props.subjects.map((element) => {
        var object = element;
        object.label = element.name;
        object.value = element.id;
        delete object.subjectModule;

        return object;
      });
      this.setState({ subjectList });
    }
    if (prevProps.ClassSettings !== this.props.ClassSettings) {
      let ClassSettingsList = [];
      ClassSettingsList = this.props.ClassSettings.map((element) => {
        var object = element;
        object.label = element.name;
        object.value = element.id;

        return object;
      });
      this.setState({ ClassSettingsList });
    }
    if (prevProps.courseAssignment !== this.props.courseAssignment) {
      let groupAssignment = _.groupBy(this.props.courseAssignment, 'class.name');
      let finalListAssignment = [];
      for (const property in groupAssignment) {
        finalListAssignment.push({
          classItem: groupAssignment[property][0].class,
          subjects: groupAssignment[property],
        });
      }
      this.setState({ courseAssignmentList: finalListAssignment });
    }
  }
  render() {   /* eslint eqeqeq: "off" */
     return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: '5%',
          marginRight: '10%',
        }}
      >
        <div className="  d-flex flex-column mb-3">
          {this.state.assignementCourseExist ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.state.messageAlerte} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          {this.props.successStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          {this.state.alerteFiltre ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.state.messageAlerte} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          <div className=" bd-highlight" style={{ width: '90%' }}>
            <CardBox styleName="col-lg-12">
              <AddAssignClassSubject
                courseAssignmentList={this.state.courseAssignmentList}
                values={this.state}
                openAddModal={this.openAddModal}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
                ClassSettingsList={this.state.ClassSettingsList}
                subjectList={this.state.subjectList}
                handleChangeClass={this.handleChangeClass}
                handleChangeSubject={this.handleChangeSubject}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: '90%' }}>
            <CardBox styleName="col-lg-12">
              <CoursesAssignmentList
                courseAssignmentList={this.state.courseAssignmentList}
                ClassSettingsList={this.state.ClassSettingsList}
                subjectList={this.state.subjectList}
                handleChangeAlerte={this.handleChangeAlerte}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: '90%' }}>
            <CardBox styleName="col-lg-12">
              <ArchiveCourseAssignment
                ClassSettings={this.props.ClassSettings}
                subjects={this.props.subjects}
                isOpenArchive={this.state.isOpenArchive}
                openArchiveModal={this.openArchiveModal}
              />
            </CardBox>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    ClassSettings: state.ClassSettingsReducer.classSettings,
    subjects: state.subject.subjects,
    examTypes: state.ExamTypesReducer.examTypes,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    courseAssignment: state.AssignementReducer.courseAssignment,
  };
};

export default connect(mapStateToProps)(CourseAssignment);
