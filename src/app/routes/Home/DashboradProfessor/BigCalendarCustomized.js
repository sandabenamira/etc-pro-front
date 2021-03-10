import React from 'react';
import IntlMessages from '../../../../util/IntlMessages';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { roleIdProfessor } from '../../../../config/config';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

var options = {
  month: 'long',
  currentDate: '',
};

class BigCalendarCustomized extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classeName: '',
    };
    this.customToolbar = this.customToolbar.bind(this);
    this.event = this.event.bind(this);
  }

  customToolbar = (toolbar) => {
    let dayCall = new Date(toolbar.date);
    var currentDate = moment(toolbar.date);
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');

    const goToBack = () => {
      dayCall.setDate(dayCall.getDate() - 1);
      let currentDate = moment(dayCall).format('DD MMMM');
      this.setState({ currentDate });
      toolbar.onNavigate('PREV');
    };
    const goToNext = () => {
      dayCall.setDate(dayCall.getDate() + 1);
      let currentDate = moment(dayCall).format('DD MMMM');
      this.setState({ currentDate });
      toolbar.onNavigate('NEXT');
    };
    const SetViewWeek = () => {
      toolbar.onView('week');
    };
    const SetViewDay = () => {
      let currentDate = moment(toolbar.date).format('DD MMMM');
      this.setState({ currentDate });
      toolbar.onView('day');
    };
    const goToCurrent = () => {
      let currentDate = moment(toolbar.date).format('DD MMMM');
      this.setState({ currentDate });
      toolbar.onNavigate('TODAY');
    };

    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="bd-highlight">
          <h3 className="ml-5"> {this.state.classeName}</h3>
        </div>

        <div className="row bd-highlight align-items-center justify-content-center flex-column ">
          <div class=" justify-content-center ">
            <Typography
              variant="h6"
              style={{
                color: 'grey',
                fontWeight: 'normal',
                textAlign: 'center',
              }}
            >
              <IntlMessages id="timetable.month" />
            </Typography>
          </div>
          <div class="bd-highlight   p-1">
            <div class="d-flex flex-wrap flex-row bd-highlight ">
              <div class="p-1 bd-highlight">
                <i className="zmdi zmdi-chevron-left zmdi-hc-2x " style={{ color: '#0000CD' }} onClick={goToBack}></i>
              </div>
              <div class="p-1 bd-highlight mt-1">
                {this.props.settings === 'tunisia' ? (
                  <span style={{ color: '#0000CD' }}>
                    {' '}
                    <IntlMessages id="timetable.week" /> {moment(toolbar.date).weeks()}: {moment(weekStart).format('DD')} -{' '}
                    {moment(weekEnd).format('DD') - 1} {new Date(weekStart).toLocaleDateString('ar-TN', options)}
                  </span>
                ) : this.props.settings === 'french' ? (
                  <span style={{ color: '#0000CD' }}>
                    {' '}
                    <IntlMessages id="timetable.week" /> {moment(toolbar.date).weeks()}: {moment(weekStart).format('DD')} -{' '}
                    {moment(weekEnd).format('DD') - 1} {moment(weekStart).format('MMMM')}
                  </span>
                ) : (
                  <span style={{ color: '#0000CD' }}>
                    {' '}
                    <IntlMessages id="timetable.week" /> {moment(toolbar.date).weeks()}: {moment(weekStart).format('DD')} -{' '}
                    {moment(weekEnd).format('DD') - 1} {new Date(weekStart).toLocaleDateString('en-US', options)}
                  </span>
                )}
              </div>

              <div class="p-1 bd-highlight">
                <i className="zmdi zmdi-chevron-right zmdi-hc-2x mb-3" style={{ color: '#0000CD' }} onClick={goToNext}></i>
              </div>

              {/* <div class="p-1 bd-highlight">
                <Button
                  variant="contained"
                  className=" bg-grey text-white "
                  onClick={goToCurrent}
                >
                  <IntlMessages id="todo.today" />
                </Button>
              </div> */}
            </div>
          </div>
          <div class="bd-highlight   p-1">
            <div class="d-flex flex-wrap flex-row bd-highlight ">
              <div class="p-1 bd-highlight">
                <Button variant="contained" className=" bg-grey text-white " onClick={SetViewWeek}>
                  <IntlMessages id="timetable.week" />
                </Button>
              </div>
              <div class="p-1 bd-highlight">
                <Button variant="contained" className=" bg-grey text-white " onClick={SetViewDay}>
                  Jour
                </Button>
              </div>
              <div class="p-1 bd-highlight">
                <Button variant="contained" className=" bg-grey text-white " onClick={goToCurrent}>
                  <IntlMessages id="todo.today" />
                </Button>
              </div>
            </div>
          </div>
          <div class="bd-highlight   p-1">
            <div class="d-flex flex-wrap flex-row bd-highlight ">
              <div class="p-1 bd-highlight">
                <i className="zmdi zmdi-chevron-left zmdi-hc-2x " style={{ color: '#0000CD' }} onClick={goToBack}></i>
              </div>
              <div class="p-1 bd-highlight">{this.state.currentDate}</div>
              <div class="p-1 bd-highlight">
                <i className="zmdi zmdi-chevron-right zmdi-hc-2x mb-3" style={{ color: '#0000CD' }} onClick={goToNext}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
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
  event({ event }) {
    return (
      <div id={'Popover-' + event.id}>
        <span
          style={{
            alignItems: 'center',
            margin: 'auto',
            fontFamily: 'Raleway',
            fontSize: '10px',
          }}
        >
          {event.eventType === 'lesson' && this.props.userProfile.role_id === roleIdProfessor ? (
            <p>
              <b>{event.subjectName}</b> <br />
              {event.classeName} <br />
              {event.roomName}
            </p>
          ) : event.eventType === 'lesson' && this.props.userProfile.role_id !== roleIdProfessor ? (
            <p>
              <b>{event.subjectName}</b> <br />
              {event.roomName}
              <br />
              {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
            </p>
          ) : event.eventType === 'exam' && this.props.userProfile.role_id === roleIdProfessor ? (
            <p>
              {' '}
              <IntlMessages id="components.note.exam" />: <b>{event.subjectName}</b> <br />
              {event.classeName} <br />
              {event.roomName}{' '}
            </p>
          ) : event.eventType === 'exam' && this.props.userProfile.role_id !== roleIdProfessor ? (
            <p>
              {' '}
              <IntlMessages id="components.note.exam" />: <b>{event.subjectName}</b> <br />
              {event.roomName} <br />
              {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
            </p>
          ) : event.eventType === 'holidays' ? (
            <p>
              {' '}
              <b>{event.title}</b>
            </p>
          ) : event.eventType === 'schoolVacation' ? (
            <p>
              <b>{event.title}</b>{' '}
            </p>
          ) : event.eventType === 'event' && this.props.userProfile.role_id === roleIdProfessor ? (
            <p>
              <b>{event.title}</b> <br />
              {event.classeName} <br />
              {event.roomName}
            </p>
          ) : event.eventType === 'event' && this.props.userProfile.role_id !== roleIdProfessor ? (
            <p>
              <b>{event.title}</b> <br />
              {event.roomName} <br />
              {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
            </p>
          ) : (
            ''
          )}
        </span>
      </div>
    );
  }
  render() {
    /* eslint eqeqeq: "off" */
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
      startHours = '07';
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
      <div>
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          style={{ width: '100%' }}
          defaultView="week"
          defaultDate={now}
          eventPropGetter={this.eventStyleGetter}
          components={{
            event: this.event,
            toolbar: this.customToolbar,
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
      </div>
    );
  }
}

export default BigCalendarCustomized;
