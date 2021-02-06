import React from 'react';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IntlMessages from '../../../../../util/IntlMessages';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ContainerHeader from '../../../../../components/ContainerHeader';
import CardBox from '../../../../../components/CardBox/index';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import Auxiliary from '../../../../../util/Auxiliary';

const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class PlanningCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      startHours: '',
      endHours: '',
      day: '',
      slotInfo: '',
      eventList: [],
      classrooms: [],
      establishmentClass: [],
      open: false,
      professorEvent: {},
      subjectEvent: {},
      roomEvent: [],
      eventProfessor: '',
      classe: '',
      establishment: '',
      event: {},
    };

    this.edit = this.edit.bind(this);
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  eventStyleGetter(event, start, end, isSelected) {
    let diff = moment
      .utc(moment(event.end, 'DD/MM/YYYY HH:mm').diff(moment(event.start, 'DD/MM/YYYY HH:mm')))
      .format('HH:mm');
    const mn = moment.duration(diff).asMinutes();
    let height = mn * 1.3 * 0.33 + 'px';
    var backgroundColor = event.subjectColor;
    var style = {
      backgroundColor: backgroundColor,
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
      borderRadius: '10px',
      paddingTop: height,
    };
    return {
      style: style,
    };
  }
  edit(event) {
    this.props.edit(event);
    this.setState({
      open: false,
    });
  }

  render() {
    let startHours = '';
    let startMunites = '';
    let endHours = '';
    let endMinutes = '';
    const startDayTime = new Date();
    const endDayTime = new Date();
    if (this.props.startTime && this.props.endTime) {
       startHours = this.props.startTime.substr(0, 2);
       startMunites = this.props.startTime.substr(3, 2);
       endHours = this.props.endTime.substr(0, 2);
       endMinutes = this.props.endTime.substr(3, 2);
    } else {
      startHours = '08';
      startMunites = '00';
      endHours = '21';
      endMinutes = '00';
    }
    let events = this.props.events ? this.props.events : [];

    startDayTime.setHours(startHours);
    startDayTime.setMinutes(startMunites);
    endDayTime.setHours(endHours);
    endDayTime.setMinutes(endMinutes);
    return (
      <RoleContext.Consumer>
        {({ role, roleId }) => (
          <div className="animated slideInUpTiny animation-duration-3">
            <ContainerHeader
              title={<IntlMessages id="components.event.planning.calendar.generate.emploi.temps" />}
              match={this.props.match}
            />
            <Can
              role={role}
              perform="calendar-filter:visit"
              yes={() => (
                <CardBox styleName="col-12">
                  <div className="row">
                    <Can
                      role={role}
                      perform="calendar-filter-establishment:visit"
                      yes={() => (
                        <div className="col-lg-3 col-sm-6 col-12">
                          <FormControl className="w-100 mb-2">
                            <InputLabel htmlFor="age-simple">
                              {<IntlMessages id="components.professor.formadd.etablissement_id" />}
                            </InputLabel>
                            <Select
                              name="establishment"
                              value={this.props.establishment}
                              onChange={this.props.handleChange('establishment')}
                              input={<Input id="establishment" />}
                            >
                              <MenuItem value="">
                                <em>{<IntlMessages id="autocomplete.emploidutemps.none" />}</em>
                              </MenuItem>
                              {this.props.establishments.map((establishment) => (
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
                          name="classe"
                          value={this.props.classe}
                          onChange={this.props.handleChangeClasse('classe')}
                           input={<Input id="components.note.class" />}
                         >
                          {this.props.establishmentClass.map((classe) => (
                            <MenuItem key={classe.id} value={classe}>
                              {classe.name === 'All' ? (
                                <IntlMessages id="vacation.management" />
                              ) : (
                                classe.name
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <FormControl className="w-100 mb-2">
                        <InputLabel htmlFor="age-simple">
                          {<IntlMessages id="toDo.professor" />}
                        </InputLabel>
                        <Select
                          value={this.props.professorIdList}
                          onChange={this.props.handleChangeProfessor(
                            "professorIdList"
                          )}
                          input={<Input id="professorIdList" />}
                        >
                          <MenuItem key={0} value={0}>
                            <IntlMessages id={`userStuppDisplay.all`} />
                          </MenuItem>
                          {this.props.professorsFiltred.map((professor) => (
                            <MenuItem
                              key={professor.profId}
                              value={professor.profId}
                            >
                              {professor.name} {professor.surname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <FormControl className="w-100 mb-2">
                        <InputLabel htmlFor="age-simple">
                          {<IntlMessages id="sidebar.components.rooms" />}
                        </InputLabel>
                        <Select
                          value={this.props.classroomId}
                          onChange={this.props.handleChangeClassroom(
                            "classroomId"
                          )}
                          input={<Input id="classroomId" />}
                        >
                          <MenuItem key={0} value={0}>
                            <IntlMessages id={`userStuppDisplay.all`} />
                          </MenuItem>
                          {this.props.classroomsList.map((classroom) => (
                            <MenuItem key={classroom.id} value={classroom.id}>
                              {classroom.name}
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
              startAccessor="start"
              endAccessor="end"
              selectable
              localizer={localizer}
              events={events}
              defaultView="week"
              step={30}
              timeslots={1}
              min={startDayTime}
              max={endDayTime}
              eventPropGetter={this.eventStyleGetter}
              resizableAccessor={() => false}
              onSelectSlot={(slotInfo) => this.props.addLesson(slotInfo)}
              messages={{
                month: <IntlMessages id="timetable.month" />,
                day: <IntlMessages id="timetable.day" />,
                today: <IntlMessages id="timetable.today" />,
                previous: <IntlMessages id="appModule.back" />,
                next: <IntlMessages id="appModule.next" />,
                agenda: <IntlMessages id="timetable.agenda" />,
                week: <IntlMessages id="timetable.week" />,
              }}
              onSelectEvent={(event) => this.props.displayEventDetails(event)}
              components={{
                event: Event,
                agenda: {
                  event: EventAgenda,
                },
              }}
            />
            <Auxiliary>
              <Dialog
                open={this.state.open}
                TransitionComponent={Slide}
                onClose={this.handleRequestClose}
              >
                <DialogTitle>
                  <IntlMessages id="components.planning.lesson.details" />
                </DialogTitle>
                <DialogContent>
                  <ul>
                    {this.state.event.event_type === 'Class Council' ? null : (
                      <li>
                        {' '}
                        <IntlMessages id="components.note.subject" /> :
                        <span>{this.state.eventSubject}</span>
                      </li>
                    )}
                    {this.state.event.event_type === 'Class Council' ? null : (
                      <li>
                        {' '}
                        <IntlMessages id="calandar.popup.details.frequency" />:{' '}
                        <span>{this.state.eventFrequency}</span>{' '}
                      </li>
                    )}

                    <li>
                      {' '}
                      <IntlMessages id="room.name" />: <span>{this.state.eventRoom}</span>
                    </li>

                    {this.state.event.event_type === 'Class Council' ? null : (
                      <li>
                        {' '}
                        <IntlMessages id="toDo.professor" />:{' '}
                        <span>
                          {this.state.eventProfessorName} {this.state.eventProfessorSurname}
                        </span>
                      </li>
                    )}
                    <li>
                      {' '}
                      <IntlMessages id="components.event.planning.modal.add.name.event_type" />:{' '}
                      <span>{traductionTypeEvent(this.state.eventType, this.state.appLang)} </span>
                    </li>
                  </ul>
                </DialogContent>
                <DialogActions>
                  <Button onClick={(e) => this.edit(this.state.event)} color="primary">
                    {<IntlMessages id="button.modify" />}
                  </Button>
                  <Button onClick={this.handleRequestClose} color="primary">
                    {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                  </Button>
                </DialogActions>
              </Dialog>
            </Auxiliary>
          </div>
        )}
      </RoleContext.Consumer>
    );
  }
}

export default PlanningCalendar;
function Event({ event }) {
  return (
    <div id={'Popover-' + event.id}>
      <span style={{ alignItems: 'center', margin: 'auto' }}>
        {event.eventType === 'lesson' ? (
          <p>
            {event.subjectName} <br />
            {event.roomName}
            <br />
            {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
          </p>
        ) : event.eventType === 'exam' ? (
          <p>
            {' '}
            <IntlMessages id="components.note.exam" />: {event.subjectName} <br />
            {event.roomName} <br />
            {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
          </p>
        ) : event.eventType === 'holidays' ? (
          <p> {event.title}</p>
        ) : event.eventType === 'schoolVacation' ? (
          <p>{event.title} </p>
        ) : (
          <p>
            {event.title} <br />
            {event.roomName} <br />
            {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
          </p>
        )}
      </span>
    </div>
  );
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.subject_id}</em>
      <p>{traductionTypeEvent(event.event_type, event.appLang)} </p>
      <p>{event.room_id}</p>
      <p>{event.professor_name}</p> <p>{event.professor_name}</p>
    </span>
  );
}

function traductionTypeEvent(typeEvent, appLang) {
  if (appLang === 'tunisia') {
    switch (typeEvent) {
      case 'lesson':
        return 'حصة دراسية';
      case 'meeting':
        return ' إجتماع';
      case 'party':
        return 'اِحْتِفال';
      case 'exam':
        return 'إمتحان';
      case 'Class Council':
        return 'حصة تقييم';
      case 'Trip':
        return 'رحلة ';
      case 'Rattrapage':
        return 'حصة تدارك';
      default:
        return 'أخرى';
    }
  } else if (appLang === 'english') {
    switch (typeEvent) {
      case 'lesson':
        return 'Lesson';
      case 'meeting':
        return 'Meeting ';
      case 'party':
        return 'Party';
      case 'exam':
        return 'Exam';
      case 'Class Council':
        return 'Class council';
      case 'Trip':
        return 'Trip ';
      case 'Rattrapage':
        return 'Catch Up lesson';
      default:
        return 'other';
    }
  } else {
    switch (typeEvent) {
      case 'lesson':
        return 'Cours';
      case 'meeting':
        return 'Réunion';
      case 'party':
        return 'Fête';
      case 'exam':
        return 'Examen';
      case 'Class Council':
        return 'Conseil de classe';
      case 'Trip':
        return 'Excursion ';
      case 'Rattrapage':
        return ' ';
      default:
        return 'Autres';
    }
  }
}
