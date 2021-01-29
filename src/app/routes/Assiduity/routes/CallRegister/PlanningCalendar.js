import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import { RoleContext } from '../../../../../Context';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import Can from '../../../../../can';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
class PlanningCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, values } = this.props;
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
      endHours = '19';
      endMinutes = '00';
    }

    const startDayTime = new Date();
    const endDayTime = new Date();
    let startHour = this.props.startTime.substr(0, 2);
    let startMunite = this.props.startTime.substr(3, 2);
    let endHour = this.props.endTime.substr(0, 2);
    let endMunite = this.props.endTime.substr(3, 2);
    let events = this.props.events ? this.props.events : [];

    startDayTime.setHours(startHour);
    startDayTime.setMinutes(startMunite);
    endDayTime.setHours(endHour);
    endDayTime.setMinutes(endMunite);
    return (
      <RoleContext.Consumer>
        {({ role }) => (
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="d-flex flex-column bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 bd-highlight col-md-1">
                    <TextField
                      id="itemClass"
                      name="itemClass"
                      select
                      value={this.props.values.itemClass || ''}
                      onChange={this.props.handleChangeClass('itemClass')}
                      SelectProps={{}}
                      label={<IntlMessages id={`components.note.class`} />}
                      InputProps={{ disableUnderline: true }}
                      margin="normal"
                      fullWidth
                    >
                      {classes.map((itemClass) => {
                        let data = {
                          classId: itemClass.id,
                          classeName: itemClass.name,
                        };

                        return (
                          <MenuItem key={itemClass.id} value={JSON.stringify(data)}>
                            {data.classeName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>

                  <div
                    className="d-flex mt-5 mr-1"
                    style={{
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      borderColor: '#979A9A',
                      height: '16px',
                    }}
                  ></div>

                  <div className="p-2 bd-highlight col-md-1">
                    <TextField
                      id="classLevel"
                      name="classLevel"
                      select
                      value={this.props.values.typeCall}
                      onChange={this.props.handleChangeType('typeCall')}
                      SelectProps={{}}
                      label={<IntlMessages id={`register.no.call`} />}
                      InputProps={{ disableUnderline: true }}
                      margin="normal"
                      fullWidth
                    >
                      <MenuItem key={0} value={'all'}>
                        <IntlMessages id={`userStuppDisplay.all`} />
                      </MenuItem>
                      <MenuItem key={1} value={true}>
                        <IntlMessages id={`register.call.done`} />
                      </MenuItem>
                      <MenuItem key={2} value={false}>
                        <IntlMessages id={`register.call.not.done`} />
                      </MenuItem>
                    </TextField>
                  </div>

                  <Can
                    role={role}
                    perform="call-register-filter:visit"
                    yes={() => (
                      <>
                        <div
                          className="d-flex mt-5 mr-1"
                          style={{
                            borderWidth: 'thin',
                            borderStyle: 'solid',
                            borderColor: '#979A9A',
                            height: '16px',
                          }}
                        ></div>
                        <div className="p-2 bd-highlight col-md-2">
                          <TextField
                            id="idProf"
                            name="idProf"
                            select
                            value={values.profId}
                            onChange={this.props.handleChangeProf('profId')}
                            SelectProps={{}}
                            label={<IntlMessages id={`professor.call`} />}
                            InputProps={{ disableUnderline: true }}
                            margin="normal"
                            fullWidth
                          >
                            <MenuItem key={0} value={0}>
                              <IntlMessages id={`userStuppDisplay.all`} />
                            </MenuItem>
                            {values.professors.map((option) => (
                              <MenuItem key={option.fk_id_professor} value={option.fk_id_professor}>
                                {option.professor.profile.user.name +
                                  ' ' +
                                  option.professor.profile.user.surname}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="p-2 bd-highlight">
                <DragAndDropCalendar
                  localizer={localizer}
                  events={events}
                  defaultView="week"
                  timeslots={1}
                  min={startDayTime}
                  max={endDayTime}
                  eventPropGetter={this.eventStyleGetter}
                  resizableAccessor={() => false}
                  messages={{
                    month: <IntlMessages id="timetable.month" />,
                    day: <IntlMessages id="timetable.day" />,
                    today: <IntlMessages id="timetable.today" />,
                    previous: <IntlMessages id="appModule.back" />,
                    next: <IntlMessages id="appModule.next" />,
                    agenda: <IntlMessages id="timetable.agenda" />,
                    week: <IntlMessages id="timetable.week" />,
                  }}
                  onSelectEvent={(event) => this.props.displayEventCallregister(event)}
                  components={{
                    event: this.props.event,
                    toolbar: this.props.customToolbar,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </RoleContext.Consumer>
    );
  }

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
      paddingTop: height,
      borderRadius: '0px',
    };
    return {
      style: style,
    };
  }
}

export default PlanningCalendar;
