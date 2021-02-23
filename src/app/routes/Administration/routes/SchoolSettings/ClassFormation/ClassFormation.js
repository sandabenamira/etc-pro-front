import React from 'react';
import CardBox from '../../../../../../components/CardBox/index';
import { connect } from 'react-redux';
import AddClassFormation from './AddClassFormation';
import SubmitStep from './SubmitStep';
import _ from 'lodash';
import { UncontrolledAlert } from 'reactstrap';
import { addAssignementCourse } from '../../../../../../actions/AssignementAction';
import { getRoomsByEstablshment } from '../../../../../../actions/roomAction';

class CourseAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      step2: false,
      step3: false,
      confirmStep1: false,
      confirmStep2: false,
      isOpenArchive: false,
      agenceList: [],
      subjectList: [],
      levelList: [],
      studentsList: [],
      professorList: [],
      participantList: [{ id: 0, agence: {}, participants: [] }],
      horaireList: [
        {
          id: 0,
          dateFormation: new Date(),
          startHour: new Date(),
          endHour: new Date(),
          room: {},
        },
      ],

      nameClassFormation: '',
      levelId: null,
      subjectId: null,
      profId: null,
      agenceIds: [],
      roomsList: [],
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeParticipant = this.handleChangeParticipant.bind(this);
    this.addNewListParticipant = this.addNewListParticipant.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmitStep1 = this.handleSubmitStep1.bind(this);
    this.handleSubmitStep2 = this.handleSubmitStep2.bind(this);
    this.handleSubmitStep3 = this.handleSubmitStep3.bind(this);
    this.handleConfirmStep1 = this.handleConfirmStep1.bind(this);
    this.handleConfirmStep2 = this.handleConfirmStep2.bind(this);
    this.handleChangeHoraire = this.handleChangeHoraire.bind(this);
    this.addNewHoraire = this.addNewHoraire.bind(this);
    this.deleteListParticipant = this.deleteListParticipant.bind(this);
    this.deleteHoraire = this.deleteHoraire.bind(this);
  }
  deleteHoraire = (index) => {
    let newHoraireList = [];
    let newIndex = 0;
    this.state.horaireList.map((element) => {
      if (element.id !== index) {
        newHoraireList.push({ ...element, id: newIndex });
        newIndex++;
      }
    });
    this.setState({ horaireList: newHoraireList });
  };
  deleteListParticipant = (index) => {
    let agenceIds = [];
    this.state.participantList.map((element) => {
      if (element.id != index) {
        agenceIds.push(element.agence.id);
      }
    });
    let newParticipantList = [];
    let newIndex = 0;

    this.state.participantList.map((element) => {
      if (element.id !== index) {
        newParticipantList.push({ ...element, id: newIndex });
        newIndex++;
      }
    });
    this.setState({ participantList: newParticipantList, agenceIds });
  };
  addNewHoraire = (index) => {
    let horaireList = [];
    this.state.horaireList.map((element) => {
      horaireList.push({
        dateFormation: element.dateFormation,
        startHour: element.startHour,
        endHour: element.endHour,
        room: element.room,
        id: element.id,
        isAdded: true,
      });
    });
    horaireList.push({
      id: index,
      isAdded: false,
      dateFormation: new Date(),
      startHour: new Date(),
      endHour: new Date(),
      room: {},
    });

    this.setState({ horaireList });
  };
  handleChangeHoraire = (selectedOption, name, index) => {
    if (name === 'room') {
      let newHoraireList = this.state.horaireList.map((element, i) =>
        i === index
          ? {
              ...element,
              [name]: selectedOption,
            }
          : element
      );
      this.setState({ horaireList: newHoraireList });
    } else {
      let newHoraireList = this.state.horaireList.map((element, i) =>
        i === index
          ? {
              ...element,
              [name]: selectedOption._d,
            }
          : element
      );
      this.setState({ horaireList: newHoraireList });
    }
  };
  addNewListParticipant = (index) => {
    let participantList = [];
    this.state.participantList.map((element) => {
      participantList.push({
        agence: element.agence,
        participants: element.participants,
        id: element.id,
        isAdded: true,
      });
    });
    participantList.push({
      agence: {},
      participants: [],
      id: index,
      isAdded: false,
    });

    this.setState({ participantList });
  };
  handleChangeParticipant = (selectedOption, name, index) => {
    if (name === 'agence') {
      let agenceIds = [selectedOption.value];
      this.state.participantList.map((element) => {
        if (element.id != index) {
          agenceIds.push(element.agence.id);
        }
      });
      this.setState({ agenceIds });
      let newParticipantList = this.state.participantList.map((element, i) =>
        i === index
          ? {
              ...element,
              [name]: selectedOption,
            }
          : element
      );
      this.setState({ participantList: newParticipantList });
    } else if (name === 'participants') {
      let newParticipantList = this.state.participantList.map((element, i) =>
        i === index
          ? {
              ...element,
              [name]: selectedOption,
            }
          : element
      );
      this.setState({ participantList: newParticipantList });
    }
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

  handleConfirmStep1(event) {
    event.preventDefault();
    this.setState({
      confirmStep1: true,
    });
  }
  handleConfirmStep2(event) {
    event.preventDefault();
    this.setState({
      confirmStep2: true,
    });
  }
  handleSubmitStep1(event) {
    event.preventDefault();
    this.setState({
      step2: true,
      confirmStep1: false,
    });
  }
  handleSubmitStep2(event) {
    event.preventDefault();
    this.setState({
      step3: true,
      confirmStep2: false,
    });
  }
  handleSubmitStep3(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });
  }

  handleCancel() {
    this.setState({ confirmStep1: false, confirmStep2: false });
  }
  componentDidMount() {
    this.props.dispatch(
      getRoomsByEstablshment(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      )
    );
    if (this.props.rooms != undefined) {
      let roomsList = [];
      roomsList = this.props.rooms.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });
      this.setState({ roomsList });
    }
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
    if (prevProps.rooms !== this.props.rooms) {
      let roomsList = [];
      roomsList = this.props.rooms.map((element) => {
        var object = {};
        object.label = element.name;
        object.id = element.id;
        object.value = element.id;

        return object;
      });
      this.setState({ roomsList });
    }
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
                handleConfirmStep1={this.handleConfirmStep1}
                handleConfirmStep2={this.handleConfirmStep2}
                handleSubmitStep3={this.handleSubmitStep3}
                handleCancel={this.handleCancel}
                handleChange={this.handleChange}
                handleChangeName={this.handleChangeName}
                handleChangeParticipant={this.handleChangeParticipant}
                addNewListParticipant={this.addNewListParticipant}
                handleChangeHoraire={this.handleChangeHoraire}
                addNewHoraire={this.addNewHoraire}
                deleteListParticipant={this.deleteListParticipant}
                deleteHoraire={this.deleteHoraire}
              />
            </CardBox>
          </div>
        </div>
        {this.state.confirmStep1 === true ? (
          <SubmitStep
            openConfirm={this.state.confirmStep1}
            handleCancel={this.handleCancel}
            handleSubmitStep={this.handleSubmitStep1}
          />
        ) : (
          ''
        )}
        {this.state.confirmStep2 === true ? (
          <SubmitStep
            openConfirm={this.state.confirmStep2}
            handleCancel={this.handleCancel}
            handleSubmitStep={this.handleSubmitStep2}
          />
        ) : (
          ''
        )}
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
    rooms: state.rooms.rooms,
  };
};

export default connect(mapStateToProps)(CourseAssignment);
