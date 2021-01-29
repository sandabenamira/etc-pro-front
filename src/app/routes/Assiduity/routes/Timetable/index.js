
import React from 'react'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { connect } from "react-redux";
import TimeTable from './TimeTable';
import { roleIdStudent, roleIdParent, roleIdAdmin, roleIdProfessor } from '../../../../../config/config'
import { getEventsByEstabAndSchoolYear, getEventsByEstabAndSchoolYearForProf } from "../../../../../actions/planningActions";
import _ from 'lodash'
import moment from 'moment';
import IntlMessages from '../../../../../util/IntlMessages';


class ALMANACH extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      establishment: '',
      establishmentClass: [],
      classId: null,
      supplieModal: false,
      eventId: '',
      establishmentRooms: []
    };
    this.handleChangeClasse = this.handleChangeClasse.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.event = this.event.bind(this);
  }

  event({ event }) {
 console.log(event);
 
    return (
      <div id={'Popover-'+event.id}>
      <span style={{ alignItems: 'center', margin: 'auto', fontFamily: 'Raleway',fontSize:"16px" }} >
    {event.eventType === "lesson" && this.props.userProfile.role_id === roleIdProfessor ? <p><b>{event.subjectName}</b> <br />{event.classeName} <br />{event.roomName}</p>
         : event.eventType === "lesson" && this.props.userProfile.role_id !== roleIdProfessor ? <p><b>{event.subjectName}</b> <br />{event.roomName}<br/>{moment(event.start).format("HH:mm")} - {moment(event.end).format("HH:mm")}</p>
         : event.eventType === "exam" && this.props.userProfile.role_id === roleIdProfessor ? <p> <IntlMessages id="components.note.exam" />: <b>{event.subjectName}</b> <br />{event.classeName} <br />{event.roomName} </p>
         : event.eventType === "exam"  && this.props.userProfile.role_id !== roleIdProfessor? <p> <IntlMessages id="components.note.exam" />: <b>{event.subjectName}</b> <br />{event.roomName} <br />{moment(event.start).format("HH:mm")} - {moment(event.end).format("HH:mm")}</p>   
         : event.eventType === "holidays" ? <p> <b>{event.title}</b></p> 
                : event.eventType === "schoolVacation" ? <p><b>{event.title}</b> </p>
                : event.eventType === "event" && this.props.userProfile.role_id === roleIdProfessor  ? <p><b>{event.title}</b> <br />{event.classeName} <br />{event.roomName}</p>
                  : event.eventType === "event" && this.props.userProfile.role_id !== roleIdProfessor  ? <p><b>{event.title}</b> <br />{event.roomName} <br />{moment(event.start).format("HH:mm")} - {moment(event.end).format("HH:mm")}</p>
                  :""
                }
      </span>
    </div>
    )
      
  }
  handleChangeClasse = name => event => {
    this.props.dispatch(
      getEventsByEstabAndSchoolYear(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        event.target.value
      ));
    this.setState({ classId: event.target.value });
  };
  handleChange = name => event => {

    let establishmentClasse = this.props.classes.filter(classe => classe.establishment_id === event.target.value)
    this.setState({ [name]: event.target.value, establishmentClass: establishmentClasse, events: [], classe: '' });
  };
  UNSAFE_componentWillMount() {
    
    let inscriptionsData = []
    if (this.props.userProfile.role_id === roleIdStudent) {
      inscriptionsData = this.props.userProfile.user.profiles[0].students[0].inscription;
      let currentInscription = inscriptionsData.filter(element => element.fk_id_school_year === this.props.userProfile.school_year_id)
    if (!_.isEmpty(currentInscription)) {
      const classId = currentInscription[0].fk_id_class_v4
      this.props.dispatch(getEventsByEstabAndSchoolYear(this.props.userProfile.establishment_id,this.props.userProfile.school_year_id,classId));
    }
    } else if (this.props.userProfile.role_id === roleIdParent) {
      //case: parent have one student
      inscriptionsData = this.props.userProfile.user.profiles[0].parents[0].student_parents[0].student.inscription;
      let currentInscription = inscriptionsData.filter(element => element.fk_id_school_year === this.props.userProfile.school_year_id)
      if (!_.isEmpty(currentInscription)) {
        const classId = currentInscription[0].fk_id_class_v4
        this.props.dispatch(getEventsByEstabAndSchoolYear(this.props.userProfile.establishment_id,this.props.userProfile.school_year_id,classId));
      }
   
    }else if (this.props.userProfile.role_id === roleIdAdmin){
      this.setState({establishmentClass: this.props.classes})

    }else if (this.props.userProfile.role_id === roleIdProfessor){
      this.props.dispatch(getEventsByEstabAndSchoolYearForProf(this.props.userProfile.establishment_id,this.props.userProfile.school_year_id,this.props.userProfile.id));
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.userProfile.role_id === roleIdAdmin && prevProps.classes !== this.props.classes) {
      this.setState({establishmentClass: this.props.classes});
    }
  }
  render() {
    return (

      <div className="app-wrapper">
        <TimeTable
          match={this.props.match}
          establishments={this.props.establishments}
          handleChange={this.handleChange}
          establishment={this.state.establishment}
          events={this.props.events}
          handleChangeClasse={this.handleChangeClasse}
          establishmentClass={this.state.establishmentClass}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
          classId={this.state.classId}
          event={this.event}
        />
      </div>)

  }
};
const mapStateToProps = (state) => {
  return {
    establishments: state.establishment.remoteEstablishments,
    userProfile: state.auth.userProfile,
    events: state.planning.events,
    startTime: state.settings.startTime,
    endTime: state.settings.endTime,
    classes: state.ClassSettingsReducer.classSettings,


  }
}

export default connect(mapStateToProps)(ALMANACH); 