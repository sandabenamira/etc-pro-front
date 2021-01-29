
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from "react-redux";
import ContainerHeader from '../../../../../components/ContainerHeader';
import CardBox from '../../../../../components/CardBox/index';
import AddSupplies from './AddSupplies';
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import { removeEventList } from "../../../../../actions/planningActions";




const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
 
  }

  componentWillUnmount() {
      this.props.dispatch(removeEventList())
  }


  // annuleModal() {
  //   this.setState({
  //     supplieModal: false, eventId: ''
  //   })
  // }

  // handleRequestClose = () => {
  //   this.setState({
  //     open: false
  //   })
  // }
  // handleClickEvent(event) {
  //   if (this.props.userProfile.role_id === roleIdProfessor) {
  //     this.setState({ supplieModal: true, eventId: event.id });


  //   } else {
  //     let apiEndpoint = `/profiles?access_token=${localStorage.token}&filter[where][id]=` + parseInt(event.professor_profile) + `&filter[include][user]`
  //     classService.get(apiEndpoint)
  //       .then(res => {

  //         this.setState({
  //           eventType: event.event_type,
  //           eventFrequency: event.frequency,
  //           eventRoom: event.room_name,
  //           eventSubject: event.subject_name,
  //           eventProfessorName: res.data[0].user.name,
  //           eventProfessorSurname: res.data[0].user.surname,
  //           eventSupplie: event.supplies,
  //           open: true
  //         })
  //       })


  //   }

  // }

  eventStyleGetter(event, start, end, isSelected) {

    let diff = moment.utc(moment(event.end, "DD/MM/YYYY HH:mm").diff(moment(event.start, "DD/MM/YYYY HH:mm"))).format("HH:mm")
    const mn = moment.duration(diff).asMinutes()
    let height = (mn * 1.3) * 0.33 + 'px'
    var backgroundColor = event.subjectColor;
    var style = {
      backgroundColor: backgroundColor,
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
      borderRadius: '0px',
      paddingTop: height

    };
    return {
      style: style
    };
  }

  EventAgenda({ event }) {
    return <span>
      {event.event_type === 'exam' ? <p> {event.event_type}</p> : null
      }
      <em style={{ color: 'magenta' }}>{event.subject_name}</em>
      <p>{event.room_name}</p>  <p>{event.room_name}</p>
    </span>
  }


  render() {
    let startHours = ''
    let startMinutes = ''
    let endHours = ''
    let endMinutes = ''
    if (this.props.startTime && this.props.endTime) {
      const startTime = this.props.startTime.split(':');
      const endTime = this.props.endTime.split(':');
      startHours = startTime[0]
      startMinutes = startTime[1]
      endHours = endTime[0]
      endMinutes = endTime[1]
    } else {
      startHours = '08'
      startMinutes = '00'
      endHours = '21'
      endMinutes = '00'
    }
    let now = new Date();
    const startDayTime = new Date();
    const endDayTime = new Date();
    startDayTime.setHours(startHours); startDayTime.setMinutes(startMinutes);
    endDayTime.setHours(endHours); endDayTime.setMinutes(endMinutes);
    let events = this.props.events ? this.props.events : [];
    return (
      <RoleContext.Consumer>
        {({ role }) => (
          <div className="animated slideInUpTiny animation-duration-3">
            <ContainerHeader title={<IntlMessages id="model.timetable" />} match={this.props.match} />


            <Can
              role={role}
              perform="emploi-supplies:add"
              yes={() => (
                <AddSupplies isOpen={this.state.supplieModal} annuleModal={this.annuleModal} eventId={this.state.eventId} />
              )}
            />
            <Can
              role={role}
              perform="emploi-filter:visit"
              yes={() => (
                <CardBox styleName="col-12" >
                  <div className="row">
                    <Can
                      role={role}
                      perform="emploi-filter-establishment:visit"

                      yes={() => (
                        <div className="col-lg-3 col-sm-6 col-12">

                          <FormControl className="w-100 mb-2">
                            <InputLabel htmlFor="age-simple">{<IntlMessages id="components.professor.formadd.etablissement_id" />}</InputLabel>
                            <Select
                              value={this.props.establishment}
                              onChange={this.props.handleChange('establishment')}
                              input={<Input id="establishment" />}
                            >
                              <MenuItem value="">
                                <em>{<IntlMessages id="autocomplete.emploidutemps.none" />}</em>
                              </MenuItem>
                              {this.props.establishments.map(establishment => (
                                <MenuItem key={establishment.id} value={establishment.id}>
                                  {establishment.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      )}
                    />
                    <div className="col-lg-3 col-sm-6 col-12">
                      <FormControl className="w-100 mb-2">
                        <InputLabel htmlFor="age-simple">{<IntlMessages id="components.note.class" />}</InputLabel>
                        <Select
                          value={this.props.classId}
                          onChange={this.props.handleChangeClasse('classId')}
                          input={<Input id="classId" />}
                        >
                          {this.props.establishmentClass.map(classe => (
                            <MenuItem key={classe.id} value={classe.id}>
                              {classe.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </CardBox>
              )}
            />
            <DragAndDropCalendar
              localizer={localizer}
              events={events}
              // onEventDrop={this.moveEvent}
              defaultView='week'
              defaultDate={now}
              eventPropGetter={(this.eventStyleGetter)}
              components={{
                event: this.props.event,
                agenda: {
                  event: this.EventAgenda
                }
              }}
              // onSelectEvent={event => this.handleClickEvent(event)}
              messages={{
                month: <IntlMessages id="timetable.month" />,
                day: <IntlMessages id="timetable.day" />,
                today: <IntlMessages id="timetable.today" />,
                previous: <IntlMessages id="appModule.back" />,
                next: <IntlMessages id="appModule.next" />,
                agenda: <IntlMessages id="timetable.agenda" />,
                week: <IntlMessages id="timetable.week" />,
              }}
              step={30}
              timeslots={1}
              min={startDayTime}
              max={endDayTime}
            />
            <Dialog open={this.state.open} TransitionComponent={Slide} onClose={this.handleRequestClose}>
              <DialogTitle>
                <IntlMessages id="components.planning.lesson.details" />
              </DialogTitle>
              <DialogContent>
                <ul>
                  {
                    this.state.eventType  ==="exam" ?
                    <li> <IntlMessages id="components.event.planning.modal.add.name.event_type" />  :<span>{this.state.eventType}</span></li>
                 : null

                  }

                  <li> <IntlMessages id="components.note.subject" />  :<span>{this.state.eventSubject}</span></li>
                  <li> <IntlMessages id="calandar.popup.details.frequency" />: <span>{this.state.eventFrequency}</span> </li>
                  <li> <IntlMessages id="room.name" />: <span>{this.state.eventRoom}</span></li>
                  <li> <IntlMessages id="toDo.professor" />: <span>{this.state.eventProfessorName}  {this.state.eventProfessorSurname}</span></li>
                  <Can
                    role={role}
                    perform="emploi-display-supplie"
                    yes={() => {
                      if (!_.isEmpty(this.state.eventSupplie)) {
                        return (
                          <li> <span> <IntlMessages id="supplie" /> </span>:
                            {this.state.eventSupplie.map((supplie, index) => (
                              <div key={index} >{supplie.name} : {supplie.description}</div>
                            ))}</li>
                        )
                      } else { return null }
                    }}
                  />
                </ul>
               
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary">
                  {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}

      </RoleContext.Consumer>

    )
  }
}
TimeTable.contextType = RoleContext;


TimeTable = DragDropContext(HTML5Backend)(TimeTable);
export default connect()(TimeTable)