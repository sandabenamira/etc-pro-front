import React from 'react';
import CardBox from '../../../../../../components/CardBox/index';
import { connect } from 'react-redux';
import AddClassFormation from './AddClassFormation';
import _ from 'lodash';
import { UncontrolledAlert } from 'reactstrap';
import { addAssignementCourse } from '../../../../../../actions/AssignementAction';
class CourseAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      step2: false,
      step3: false,
      isOpenArchive: false,
      agenceList: [],
      subjectList: [],
      levelList: [],
      studentsList: [],
      professorList: [],
      participantList: [
        {
          agence: {},
          participants: [],
        },
      ],
      nameClassFormation: '',
      levelId: null,
      subjectId: null,
      profId: null,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeParticipant = this.handleChangeParticipant.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmitStep1 = this.handleSubmitStep1.bind(this);
    this.handleSubmitStep2 = this.handleSubmitStep2.bind(this);
    this.handleSubmitStep3 = this.handleSubmitStep3.bind(this);
  }

  handleChangeParticipant = (selectedOption, name, index) => {
    console.log('-----selectedOption------',selectedOption);
    console.log('-----name------',name);
    console.log('-----index------',index);

    // this.setState({ [name]: selectedOption.id });
  };
  handleChange = (name) => (selectedOption) => {
    this.setState({ [name]: selectedOption.id });
  };
  handleChangeName = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }
  handleSubmitStep1(event) {
    event.preventDefault();
    this.setState({
      step2: true,
    });
  }
  handleSubmitStep2(event) {
    event.preventDefault();
    this.setState({
      step3: true,
    });
  }
  handleSubmitStep3(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });
  }

  handleCancel() {
    this.setState({ open: false });
  }
  componentDidMount() {
    if (this.props.agenceSettings != undefined) {
      let agenceList = [];
      agenceList = this.props.agenceSettings.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({ agenceList });
    }
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
    if (this.props.levels != undefined) {
      let levelList = [];
      levelList = this.props.levels.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;

        return object;
      });
      this.setState({ levelList });
    }
    if (typeof this.props.usersReducer.professors != 'undefined') {
      let professorList = [];
      professorList = this.props.usersReducer.professors.map((element) => {
        var object = {};
        object.label = element.name + ' ' + element.surname;
        object.id = element.profId;
        object.value = element.profId;
        object.agenceId = element.agenceId;

        return object;
      });
      this.setState({ professorList });
    }

    if (this.props.usersReducer.students != undefined) {
      let studentsList = [];
      studentsList = this.props.usersReducer.students.map((element) => {
        var object = {};
        object.label = element.name + ' ' + element.surname;
        object.id = element.studentId[0];
        object.value = element.studentId[0];
        object.agenceId = element.agenceId;

        return object;
      });
      this.setState({ studentsList });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.levels !== this.props.levels) {
      let levelList = [];
      levelList = this.props.levels.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;

        return object;
      });
      this.setState({ levelList });
    }
    if (prevProps.agenceSettings !== this.props.agenceSettings) {
      let agenceList = [];
      agenceList = this.props.agenceSettings.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({ agenceList });
    }
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
    if (prevProps.usersReducer !== this.props.usersReducer) {
      let professorList = [];
      professorList = this.props.usersReducer.professors.map((element) => {
        var object = {};
        object.label = element.name + ' ' + element.surname;
        object.id = element.profId;
        object.value = element.profId;
        object.agenceId = element.agenceId;

        return object;
      });
      let studentsList = [];
      studentsList = this.props.usersReducer.students.map((element) => {
        var object = {};
        object.label = element.name + ' ' + element.surname;
        object.id = element.studentId[0];
        object.value = element.studentId[0];
        object.agenceId = element.agenceId;

        return object;
      });
      this.setState({ professorList, studentsList });
    }
  }
  render() {
    // console.log('-----state----', this.state);
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
              <AddClassFormation
                values={this.state}
                openAddModal={this.openAddModal}
                handleSubmitStep1={this.handleSubmitStep1}
                handleSubmitStep2={this.handleSubmitStep2}
                handleSubmitStep3={this.handleSubmitStep3}
                handleCancel={this.handleCancel}
                handleChange={this.handleChange}
                handleChangeName={this.handleChangeName}
                handleChangeParticipant={this.handleChangeParticipant}
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
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    agenceSettings: state.AgenceReducer.agenceSettings,
    subjects: state.subject.subjects,
    levels: state.levelsReducer.levels,
    usersReducer: state.usersReducer,
  };
};

export default connect(mapStateToProps)(CourseAssignment);
