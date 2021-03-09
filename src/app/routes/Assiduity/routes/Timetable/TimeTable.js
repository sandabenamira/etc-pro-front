import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
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
import { connect } from 'react-redux';
import ContainerHeader from '../../../../../components/ContainerHeader';
import CardBox from '../../../../../components/CardBox/index';
import AddSupplies from './AddSupplies';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
 import SweetAlert from 'react-bootstrap-sweetalert';

const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertePermission: true,
    };
  }

  componentWillUnmount() {}

  eventStyleGetter(event, start, end, isSelected) {
    let diff = moment.utc(moment(event.end, 'DD/MM/YYYY HH:mm').diff(moment(event.start, 'DD/MM/YYYY HH:mm'))).format('HH:mm');
    const mn = moment.duration(diff).asMinutes();
    let height = mn * 1.3 * 0.33 + 'px';
    var backgroundColor = event.subjectColor;
    var style = {
      backgroundColor: backgroundColor,
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
      borderRadius: '0px',
      paddingTop: height,
    };
    return {
      style: style,
    };
  }

  EventAgenda({ event }) {
    return (
      <span>
        {event.event_type === 'exam' ? <p> {event.event_type}</p> : null}
        <em style={{ color: 'magenta' }}>{event.subject_name}</em>
        <p>{event.room_name}</p> <p>{event.room_name}</p>
      </span>
    );
  }
  closeAlerte = () => {
    this.setState({ alertePermission: false });
  };
  render() {   /* eslint eqeqeq: "off" */
    let startHours = '';
    let startMinutes = '';
    let endHours = '';
    let endMinutes = '';
    if (this.props.startTime && this.props.endTime) {
      const startTime = this.props.startTime.split(':');
      const endTime = this.props.endTime.split(':');
      startHours = startTime[0];
      startMinutes = startTime[1];
      endHours = endTime[0];
      endMinutes = endTime[1];
    } else {
      startHours = '08';
      startMinutes = '00';
      endHours = '21';
      endMinutes = '00';
    }
    let now = new Date();
    const startDayTime = new Date();
    const endDayTime = new Date();
    startDayTime.setHours(startHours);
    startDayTime.setMinutes(startMinutes);
    endDayTime.setHours(endHours);
    endDayTime.setMinutes(endMinutes);
    let events = this.props.events ? this.props.events : [];
    return (
      <RoleContext.Consumer>
        {({ role }) => (
          <div className="animated slideInUpTiny animation-duration-3">
            <ContainerHeader title={<IntlMessages id="model.timetable" />} match={this.props.match} />
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="user-permission"
                  data={{
                    permission: 'get-timetable',
                    permissionList: this.props.userPermission,
                  }}
                  yes={() => (
                    <>
                      <Can
                        role={role}
                        perform="emploi-filter:visit"
                        yes={() => (
                          <CardBox styleName="col-12">
                            <div className="row">
                              <Can
                                role={role}
                                perform="emploi-filter-establishment:visit"
                                yes={() => (
                                  <div className="col-lg-3 col-sm-6 col-12">
                                    <FormControl className="w-100 mb-2">
                                      <InputLabel htmlFor="age-simple">
                                        {<IntlMessages id="components.professor.formadd.etablissement_id" />}
                                      </InputLabel>
                                      <Select
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
                                    value={this.props.classId}
                                    onChange={this.props.handleChangeClasse('classId')}
                                    input={<Input id="classId" />}
                                  >
                                    {this.props.establishmentClass.map((classe) => (
                                      <MenuItem key={classe.id} value={classe.id}>
                                        {classe.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-sm-6 col-12">
                                <FormControl className="w-100 mb-2">
                                  <InputLabel htmlFor="age-simple">{<IntlMessages id="toDo.professor" />}</InputLabel>
                                  <Select
                                    value={this.props.professorId}
                                    onChange={this.props.handleChangeProfessor('professorId')}
                                    input={<Input id="professorId" />}
                                  >
                                    <MenuItem key={0} value={0}>
                                      <IntlMessages id={`userStuppDisplay.all`} />
                                    </MenuItem>
                                    {this.props.professorsFiltred.map((professor) => (
                                      <MenuItem key={professor.profId} value={professor.profId}>
                                        {professor.name} {professor.surname}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-sm-6 col-12">
                                <FormControl className="w-100 mb-2">
                                  <InputLabel htmlFor="age-simple">{<IntlMessages id="sidebar.components.rooms" />}</InputLabel>
                                  <Select
                                    value={this.props.classroomId}
                                    onChange={this.props.handleChangeClassroom('classroomId')}
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
                        localizer={localizer}
                        events={events}
                        defaultView="week"
                        defaultDate={now}
                        eventPropGetter={this.eventStyleGetter}
                        components={{
                          event: this.props.event,
                          agenda: {
                            event: this.EventAgenda,
                          },
                        }}
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
                    </>
                  )}
                  no={() => (
                    <SweetAlert
                      show={this.state.alertePermission}
                      title={<IntlMessages id="alert.permission" />}
                      onConfirm={this.closeAlerte}
                    ></SweetAlert>
                  )}
                />
              )}
            </RoleContext.Consumer>
          </div>
        )}
      </RoleContext.Consumer>
    );
  }
}
TimeTable.contextType = RoleContext;

TimeTable = DragDropContext(HTML5Backend)(TimeTable);
export default connect()(TimeTable);
