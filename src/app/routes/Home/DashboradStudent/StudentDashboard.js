import React, { Component } from 'react';
import ProjectsList from '../DashboradStudent/ProjectsList';
import { projects, data1 } from '../DashboradStudent/data';
import CardHeader from '../../../../components/dashboard/Common/CardHeader/index';
import IntlMessages from '../../../../util/IntlMessages';
import IconButton from '@material-ui/core/IconButton';
import IconWithTextCard from '../IconWithTextCard';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import SolidCards1 from './SolidCards1';
import SolidCards2 from './SolidCards2';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import SolidCards3 from './SolidCards3';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
const localizer = BigCalendar.momentLocalizer(moment);

var options1 = {
  day: 'numeric',
  month: 'long',
};
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

// components/dashboard/Common/DailyFeed/index
class StudentDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorSelected: '#0000CD',
      dateEvent: '',
      events: [
        {
          id: 18,
          start: new Date('2020-12-17T09:00:00.000Z'),
          end: new Date('2020-12-17T10:00:00.000Z'),
          title: null,
          frequency: 'fortnightly',
          eventType: 'lesson',
          status: true,
          roomId: 16,
          roomName: 'S1',
          profId: 44,
          profName: 'kawther',
          profSurname: 'kawther',
          assignClassSubjectId: 6,
          subjectId: 4,
          subjectColor: '#eb9694',
          subjectName: 'chinois',
          classId: 2,
          classeName: '2ème B1',
          creatorName: 'ahed',
          creatorSurname: 'ahed',
          profGender: '',
          tagCallRegister: false,
        },
      ],
    };
    this.CustomToolbar = this.CustomToolbar.bind(this);
    this.event = this.event.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({
      dateEvent: new Date().toLocaleDateString('fr-FR', options1),
    });
  }
  CustomToolbar = (toolbar) => {
    let dayCall = new Date(toolbar.date);
    const goToBack = () => {
      toolbar.onNavigate('PREV');
      dayCall.setDate(dayCall.getDate() + -1);

      this.setState({
        dateEvent: new Date().toLocaleDateString('fr-FR', options1),
      });
    };

    const goToNext = () => {
      dayCall.setDate(dayCall.getDate() + 1);
      let curentDay = new Date();
      let checkDate = moment(dayCall).isAfter(curentDay);
      if (!checkDate) {
        toolbar.onNavigate('NEXT');

        this.setState({
          dateEvent: new Date().toLocaleDateString('fr-FR', options1),
          colorSelected: '#0000CD',
        });
      } else {
        this.setState({ colorSelected: '#C0C0C0' });
      }
    };

    return (
      <div class="d-flex flex-column bd-highlight ">
        <div class="p-2 bd-highlight ml-4">Trimestre1/Semaine10</div>
        <div class=" bd-highlight">
          <div className="d-flex flex-row bd-highlight">
            <div className=" bd-highlight"></div>
            <div className=" bd-highlight">
              <Typography
                variant="h6"
                style={{
                  color: '#3F51B5',
                  fontWeight: 'normal',
                  fontFamily: 'Roboto',
                  marginLeft: '20px',
                }}
              >
                <i className="zmdi zmdi-caret-left-circle zmdi-hc-1x " style={{ color: '#0000CD' }} onClick={goToBack}></i>
                {this.state.dateEvent}
                <i className="zmdi zmdi-caret-right-circle zmdi-hc-1x " style={{ color: this.state.colorSelected }} onClick={goToNext}></i>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  };
  event({ event }) {
    return (
      <div id={'Popover-' + event.id}>
        <span>
          {event.eventType === 'lesson' ? (
            <p style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
              {' '}
              <b>{event.subjectName}</b>
              <br />{' '}
              {event.profGender === 'Féminin' ? (
                <p>
                  Mme. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                  <i class="zmdi zmdi-circle zmdi-hc-lg " style={{ color: 'green', float: 'right' }}></i>{' '}
                </p>
              ) : (
                <p>
                  M. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                </p>
              )}{' '}
            </p>
          ) : event.eventType === 'exam' ? (
            <p style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
              {' '}
              <IntlMessages id="components.note.exam" />: <b>{event.subjectName}</b> <br />
              {event.profGender === 'Féminin' ? (
                <p>
                  Mme. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                  <i class="zmdi zmdi-circle zmdi-hc-lg " style={{ color: 'green', float: 'right' }}></i>{' '}
                </p>
              ) : (
                <p>
                  M. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                </p>
              )}
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
    console.log('events', this.state.events);

    const detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../../assets/images/dashboard/tasks-icon.png'),
        // title: 7,
        subTitle: <IntlMessages id="dashborad.prof.observations" />,
      },
      {
        cardColor: 'secondary',
        imageIcon: require('../../../../assets/images/dashboard/tasks-icon.png'),
        // title: 7,
        subTitle: <IntlMessages id="dashborad.std.classroom" />,
      },
      {
        cardColor: 'info',
        imageIcon: require('../../../../assets/images/dashboard/24.png'),
        // title: 3,
        subTitle: <IntlMessages id="dashborad.prof.notes" />,
      },
      {
        cardColor: 'success',
        imageIcon: require('../../../../assets/images/dashboard/files-icon.png'),
        // title: 32,
        subTitle: <IntlMessages id="dashborad.prof.moocs" />,
      },
      {
        cardColor: 'warning',
        imageIcon: require('../../../../assets/images/dashboard/files-icon.png'),
        // title: 10,
        subTitle: <IntlMessages id="sidebar.components.virtual_classes" />,
      },
    ];

    const startDayTime = new Date('2020-11-30T07:00:00.000Z');
    const endDayTime = new Date('2020-11-30T17:00:00.000Z');
    let events = this.props.events ? this.props.events : [];

    return (
      <div className="app-wrapper d-flex flex-column  col-lg-12 col-md-12 col-sm-12 ">
        <div className="row d-flex flex-wrap justify-content-between col-lg-12 col-md-12 col-sm-12">
          {detailCards.map((data, index) => (
            <div key={index} className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12">
              <IconWithTextCard data={data} />
            </div>
          ))}
        </div>

        <div className="d-flex flex-row  flex-wrap ">
          <div className="col-lg-2 col-md-4 col-sm-12 ">
            <DragAndDropCalendar
              style={{
                backgroundColor: 'white', //this works
              }}
              localizer={localizer}
              events={this.state.events}
              // events={events}
              defaultView="day"
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
              // onSelectEvent={event => this.props.displayEventDetails(event)}
              components={{
                event: this.event,
                toolbar: this.CustomToolbar,
              }}
            />
          </div>
          <div className=" d-flex flex-column flex-wrap bd-highlight mb-3 col-lg-10 col-md-8 col-sm-12">
            {/* ligne 1  */}
            <div className="p-1 bd-highlight ">
              <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
                <div class="p-1 bd-highlight col-lg-4 col-12 ">
                  <div
                    className="jr-card jr-full-card"
                    style={{
                      boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}
                  >
                    <div className="jr-card-header d-flex">
                      <div className="mr-auto">
                        <h3 className="card-heading d-inline-block mb-0">Classes virtuelles</h3>
                        <span className="badge badge-secondary">Aujourd'hui</span>
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                        }}
                      >
                        <IconButton color="primary">
                          <i className="zmdi zmdi-more-vert" />
                        </IconButton>
                        &nbsp;
                        <IconButton color="primary">
                          <i className="zmdi zmdi-close" size="small" />
                        </IconButton>
                      </div>
                    </div>
                    {/* <YourDailyFeed data={dailyFeedData}/> */}
                  </div>
                </div>
                <div class="p-1 bd-highlight col-lg-4  col-12 ">
                  <div className="jr-card">
                    <div className="jr-card-header mb-3 d-flex">
                      <h3 className="mb-0 mr-auto">Devoirs de maison à faire</h3>
                      <span className="badge badge-secondary" style={{ fontSize: '10px', height: '20px' }}>
                        Cette semaine
                      </span>
                    </div>
                    <ProjectsList data={projects} />
                  </div>
                </div>
                <div class="p-1 bd-highlight col-lg-4 col-12 ">
                  <div className="jr-card">
                    <CardHeader heading={<IntlMessages id="Cours/Fichiers à télécharger" />} />

                    {/* {recentList.map((recentList, index) => <RecentActivities key={index}
                                                                       recentData={recentList}/>)} */}
                  </div>
                </div>
              </div>
            </div>
            {/* ligne 1  */}

            {/* ligne 2 */}

            <div className="p-1 bd-highlight">
              <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
                <div class="p-1 bd-highlight  col-xl-3 col-lg-3 col-md-6 col-sm-6 col-11">
                  <ChartCard styleName="bg-cyan text-white">
                    <div className="chart-title">
                      <h2 className="mb-1">Compétences</h2>
                      <p>Évaluations de ce mois</p>
                    </div>
                    <ResponsiveContainer width="100%" height={193}>
                      <AreaChart data={data1} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="pv"
                          stroke="rgba(255,255,255,0.5)"
                          activeDot={{ r: 8 }}
                          fillOpacity={0.5}
                          fill="rgba(255,255,255,0.8)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
                <div class="p-1 bd-highlight col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <SolidCards1 headerText="Absences (2)" cardStyle="bg-white text-primary" />{' '}
                </div>
                <div class="p-1 bd-highlight col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <SolidCards2 headerText="Observations (4)" cardStyle="bg-primary text-white" />
                </div>
                <div class="p-1 bd-highlight col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <SolidCards3 headerText="INFOS" cardStyle="bg-warning text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // <div className="app-wrapper">
            //     <div className="animated slideInUpTiny animation-duration-3">
            //         <div className="row">
            //             <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
            //                 <GreenStepCard />
            //             </div>
            //             <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            //                 <div className="jr-card">
            //                     <div className="jr-card-header mb-12 d-flex">
            //                         <h3 className="mb-0 mr-auto">Liste des devoirs & examens</h3>
            //                         <span className="badge badge-secondary">Cette semaine</span>
            //                     </div>
            //                     <ProjectsList data={projects} />
            //                 </div>

            //             </div>
            //             <div className="col-lg-4 col-4 col-sm-10">
            //                 <div className="jr-card">
            //                     <CardHeader heading={<Intl
            Messages id="dashboard.recentActivities" />} */}
        {/* //                         subHeading={<IntlMessages id="dashboard.lastActivity" />} />

            //                     {recentList.map((recentList, index) => <RecentActivities key={index} */}
        {/* //                         recentData={recentList} />)}

            //                 </div> */}
        {/* //             </div> */}
        {/* //             <div>
                           
            //             </div>
            //         </div> */}
        {/* //     </div> */}
      </div>
    );
  }
}

export default StudentDashboard;
// app/routes/widgets/routes/Modern/GreenStepCard"
