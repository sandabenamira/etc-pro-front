import React from 'react';
import CardBox from '../../../../../../components/CardBox/index';
import { connect } from 'react-redux';
import AddAssignClassSubject from './AddAssignClassSubject';
import CoursesAssignmentList from './CoursesAssignmentList';
import ArchiveCourseAssignment from './ArchiveCourseAssignment';

import { UncontrolledAlert } from 'reactstrap';
import { addAssignementCourse } from '../../../../../../actions/AssignementAction';
class CourseAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameLevel: '',
      class_id: '',
      subject_id: '',
      isOpenArchive: false,
      class: '',
      assignementCourseExist: false,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCoficient = this.handleChangeCoficient.bind(this);
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
     let data = {
      assignment_date: new Date(),
      status: true,
      global_coefficient: this.state.CoficientGlobal,
      fk_id_class_v4: this.state.class_id,
      fk_id_subject_v4: this.state.subject_id,
      class: this.state.class,
    };
    let checkDoubleAssignementCourse = this.props.courseAssignment.filter(
      (element) =>
        element.fk_id_class_v4 == this.state.class_id &&
        element.fk_id_subject_v4 == this.state.subject_id
    );
    if (checkDoubleAssignementCourse.length > 0) {
      this.setState({
        assignementCourseExist: true,
        messageAlerte: 'cette classe a déja cette matière',
      });
      setTimeout(() => {
        this.setState({ assignementCourseExist: false, messageAlerte: '' });
      }, 4000);
    } else {
      this.props.dispatch(addAssignementCourse(data));
    }

    this.setState({
      open: false,
      nameLevel: '',
      class_id: '',
      subject_id: '',
      class: '',
    });
  }

  handleChangeCoficient = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeClass = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
 
    this.setState({
      [name]: obj.id,
      class: obj,
    });
  };
  handleChangeSubject = (name) => (event) => {
    let subjects = this.props.subjects;
    this.setState({ [name]: event.target.value, subjects });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleCancel() {
    this.setState({ open: false });
  }

  render() {
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
                values={this.state}
                handleChangeCoficient={this.handleChangeCoficient}
                openAddModal={this.openAddModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
                values={this.state}
                ClassSettings={this.props.ClassSettings}
                subjects={this.props.subjects}
                examTypes={this.props.examTypes}
                handleChangeClass={this.handleChangeClass}
                handleChangeSubject={this.handleChangeSubject}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: '90%' }}>
            <CardBox styleName="col-lg-12">
              <CoursesAssignmentList
                courseAssignment={this.props.courseAssignment}
                ClassSettings={this.props.ClassSettings}
                subjects={this.props.subjects}
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
