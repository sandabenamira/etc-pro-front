import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PlanningCalendar from './PlanningCalendar';
import {
  getEventCallRegisterForAdmin,
  getEventCallRegisterForProf,
  getEventCallRegisterForParent,
} from '../../../../../actions/planningActions';
import { ButtonGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../../util/IntlMessages';
import moment from 'moment';
import { roleIdProfessor, roleIdAdmin, roleIdParent } from '../../../../../config/config';
import { classService } from '../../../../../_services/class.service';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import {
  getStudentsCallRegister,
  getStudentsCallRegisterForParent,
} from '../../../../../actions/studentAction';
import ContainerHeader from '../../../../../components/ContainerHeader';
import { UncontrolledAlert } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
var options = {
  month: 'long',
};

class Registre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemClass: '',
      classeName: '',
      status: 'week',
      classes: [],
      isRedirect: false,
      eventId: null,
      classId: null,
      startDate: '',
      typeCall: 'all',
      classIdFilter: 0,
      isOpen: false,
      professors: [],
      profId: '',
      typeCallRegister: 'formation',
      itemAgence: '',
      agenceId: '',
      agenceName: '',
      events: [],
      chefAgenceId: 0,
    };

    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleView = this.handleView.bind(this);
    this.customToolbar = this.customToolbar.bind(this);
    this.event = this.event.bind(this);
    this.displayEventCallregister = this.displayEventCallregister.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeProf = this.handleChangeProf.bind(this);
    this.handleChangeTypeCall = this.handleChangeTypeCall.bind(this);
    this.handleChangeAgence = this.handleChangeAgence.bind(this);
  }
  handleChangeAgence = (name) => (event) => {
    let chefAgence = {};
    let obj = JSON.parse(event.target.value);
    this.setState({ [name]: obj, agenceId: obj.id, agenceName: obj.name });

    chefAgence = this.props.listParents.find((element) => element.agencyId === obj.id);
    if (chefAgence !== undefined) {
      this.setState({ chefAgenceId: chefAgence.profileId });

      this.props.dispatch(getEventCallRegisterForParent(chefAgence.profileId));
    }
  };
  handleChangeTypeCall = (name) => (event) => {
    this.setState({ [name]: event.target.value, events: [], itemClass: '', itemAgence: '' });
  };
  onConfirm = () => {
    this.setState({
      isOpen: false,
    });
  };
  displayEventCallregister = (event) => {
    let curentDate = moment()._d;
    let checkDate = moment(event.start).isAfter(curentDate);
    if (!checkDate) {
      if (this.props.userProfile.role_id === roleIdParent) {
        this.props.dispatch(getStudentsCallRegisterForParent(this.props.userProfile.id));
      } else {
        if (this.state.typeCallRegister === 'formation') {
          this.props.dispatch(
            getStudentsCallRegister(event.classId, this.props.userProfile.school_year_id)
          );
        } else {
          this.props.dispatch(getStudentsCallRegisterForParent(this.state.chefAgenceId));
        }
      }

      this.setState({
        isRedirect: true,
        eventId: event.id,
        classId: event.classId,
        startDate: event.start,
      });
    } else {
      this.setState({ isOpen: true });
    }
  };
  handleView(view) {
    this.setState({ status: view });
  }
  handleChangeProf = (name) => (event) => {
    this.setState({ [name]: event.target.value });

    if (event.target.value !== 0) {
      if (this.state.typeCall == 'all') {
        let events = this.props.events.filter(
          (element) =>
            element.profId === event.target.value && element.classId === this.state.classIdFilter
        );
        this.setState({ events });
      } else {
        let events = this.props.events.filter(
          (element) =>
            element.profId === event.target.value &&
            element.classId === this.state.classIdFilter &&
            element.tagCallRegister === this.state.typeCall
        );
        this.setState({ events });
      }
    } else {
      if (this.state.typeCall == 'all') {
        let events = this.props.events.filter(
          (element) => element.classId === this.state.classIdFilter
        );
        this.setState({ events });
      } else {
        let events = this.props.events.filter(
          (element) =>
            element.classId === this.state.classIdFilter &&
            element.tagCallRegister === this.state.typeCall
        );
        this.setState({ events });
      }
    }
  };
  handleChangeClass = (name) => (event) => {
    this.setState({ [name]: event.target.value });

    let obj = JSON.parse(event.target.value);
    this.setState({
      classeName: obj.classeName,
      classIdFilter: obj.classId,
    });

    if (this.props.userProfile.role_id === roleIdAdmin) {
      let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_class_v4]=${obj.classId}&filter[include][course][professor][profile][user]`;
      classService.get(apiEndpoint).then((res) => {
        let courses = [];
        res.data.forEach((element) => {
          courses.push(element.course);
        });
        let newCoursesList = _.flatten(courses);
        let profFiltredByID = _.uniqBy(newCoursesList, 'fk_id_professor');

        this.setState({ professors: profFiltredByID, profId: '', typeCall: 'all' });
      });

      this.props.dispatch(
        getEventCallRegisterForAdmin(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          obj.classId
        )
      );
    } else if (this.props.userProfile.role_id === roleIdProfessor) {
      if (this.state.typeCall == 'all') {
        if (obj.classId === 0) {
          this.setState({ events: this.props.events });
        } else {
          let events = this.props.events.filter((element) => element.classId === obj.classId);
          this.setState({ events: events });
        }
      } else {
        if (obj.classId === 0) {
          let events = this.props.events.filter(
            (element) => element.tagCallRegister === this.state.typeCall
          );
          this.setState({ events });
        } else {
          let events = this.props.events.filter(
            (element) =>
              element.classId === obj.classId && element.tagCallRegister === this.state.typeCall
          );
          this.setState({ events: events });
        }
      }
    }
  };
  handleChangeType = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    if (this.props.userProfile.role_id === roleIdAdmin) {
      if (this.state.classIdFilter == 0) {
        if (event.target.value == 'all') {
          this.setState({ events: this.props.events });
        } else {
          let events = this.props.events.filter(
            (element) => element.tagCallRegister === event.target.value
          );
          this.setState({ events: events });
        }
      } else {
        if (this.state.profId == '') {
          if (event.target.value == 'all') {
            let events = this.props.events.filter(
              (element) => element.classId == this.state.classIdFilter
            );

            this.setState({ events });
          } else {
            let events = this.props.events.filter(
              (element) =>
                element.tagCallRegister === event.target.value &&
                element.classId == this.state.classIdFilter
            );

            this.setState({ events: events });
          }
        } else {
          if (event.target.value == 'all') {
            let events = this.props.events.filter(
              (element) =>
                element.classId == this.state.classIdFilter && element.profId === this.state.profId
            );

            this.setState({ events });
          } else {
            let events = this.props.events.filter(
              (element) =>
                element.tagCallRegister === event.target.value &&
                element.classId == this.state.classIdFilter &&
                element.profId === this.state.profId
            );

            this.setState({ events: events });
          }
        }
      }
    } else if (
      this.props.userProfile.role_id === roleIdProfessor ||
      this.props.userProfile.role_id === roleIdParent
    ) {
      if (this.state.classIdFilter == 0) {
        if (event.target.value == 'all') {
          this.setState({ events: this.props.events });
        } else {
          let events = this.props.events.filter(
            (element) => element.tagCallRegister === event.target.value
          );
          this.setState({ events: events });
        }
      } else {
        if (event.target.value == 'all') {
          let events = this.props.events.filter(
            (element) => element.classId == this.state.classIdFilter
          );

          this.setState({ events });
        } else {
          let events = this.props.events.filter(
            (element) =>
              element.tagCallRegister === event.target.value &&
              element.classId == this.state.classIdFilter
          );

          this.setState({ events: events });
        }
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.classId !== 'undefined' &&
      this.props.match.params.classId !== undefined &&
      this.state.itemClass == '' &&
      this.props.match.params != prevProps.match.params
    ) {
      if (this.props.userProfile.role_id === roleIdAdmin) {
        this.setState({
          itemClass: `{"classId":${this.props.match.params.classId},"classeName":"${this.props.match.params.classeName}"}`,
        });

        this.setState({
          classeName: this.props.match.params.classeName,
          classIdFilter: this.props.match.params.classId,
        });
        let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_class_v4]=${this.props.match.params.classId}&filter[include][course][professor][profile][user]`;
        classService.get(apiEndpoint).then((res) => {
          if (res) {
            let courses = [];
            res.data.forEach((element) => {
              courses.push(element.course);
            });
            let newCoursesList = _.flatten(courses);
            let profFiltredByID = _.uniqBy(newCoursesList, 'fk_id_professor');

            this.setState({ professors: profFiltredByID, profId: '', typeCall: 'all' });
          }
        });

        this.props.dispatch(
          getEventCallRegisterForAdmin(
            this.props.userProfile.establishment_id,
            this.props.userProfile.school_year_id,
            this.props.match.params.classId
          )
        );
      }
    }
    if (prevProps.events !== this.props.events) {
      this.setState({ events: this.props.events });
    }
    if (
      prevProps.userProfile.role_id !== this.props.userProfile.role_id &&
      this.props.userProfile.role_id === roleIdParent
    ) {
      this.props.dispatch(getEventCallRegisterForParent(this.props.userProfile.id));
    }
    if (prevProps.classes !== this.props.classes) {
      if (this.props.userProfile.role_id === roleIdAdmin) {
        this.setState({ classes: this.props.classes });
      } else if (this.props.userProfile.role_id === roleIdProfessor) {
        let apiEndpoint = `/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
        classService.get(apiEndpoint).then((res) => {
          let data = _.map(res.data, 'course');
          let classes = [];
          const allClass = {
            id: 0,
            name: 'Tous',
          };

          classes.push(allClass);
          data[0].forEach((element) => {
            if (
              element.assignmentClassSubject.class.fk_id_school_year ===
              this.props.userProfile.school_year_id
            ) {
              classes.push(element.assignmentClassSubject.class);
            }
          });
          let uniqClasses = _.uniqBy(classes, 'id');
          this.setState({ classes: uniqClasses });
        });
      }
    }
  }

  UNSAFE_componentWillMount() {
    ///// get events for different roles ////////////
    if (this.props.userProfile.role_id === roleIdProfessor) {
      this.props.dispatch(
        getEventCallRegisterForProf(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.props.userProfile.id
        )
      );

      let apiEndpoint = `/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
      classService.get(apiEndpoint).then((res) => {
        let data = _.map(res.data, 'course');
        let classes = [];
        const allClass = {
          id: 0,
          name: 'Tous',
        };

        classes.push(allClass);
        data[0].forEach((element) => {
          if (
            element.assignmentClassSubject.class.fk_id_school_year ===
            this.props.userProfile.school_year_id
          ) {
            classes.push(element.assignmentClassSubject.class);
          }
        });
        let uniqClasses = _.uniqBy(classes, 'id');
        this.setState({ classes: uniqClasses });
      });
    } else if (this.props.userProfile.role_id === roleIdAdmin) {
      this.setState({ classes: this.props.classes });
      if (
        this.props.match.params.classId != 'undefined' &&
        this.props.match.params.classId != undefined
      ) {
        this.setState({
          itemClass: `{"classId":${this.props.match.params.classId},"classeName":"${this.props.match.params.classeName}"}`,
        });

        this.setState({
          classeName: this.props.match.params.classeName,
          classIdFilter: this.props.match.params.classId,
        });
        let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_class_v4]=${this.props.match.params.classId}&filter[include][course][professor][profile][user]`;
        classService.get(apiEndpoint).then((res) => {
          let courses = [];
          res.data.forEach((element) => {
            courses.push(element.course);
          });
          let newCoursesList = _.flatten(courses);
          let profFiltredByID = _.uniqBy(newCoursesList, 'fk_id_professor');

          this.setState({ professors: profFiltredByID, profId: '', typeCall: 'all' });
        });

        this.props.dispatch(
          getEventCallRegisterForAdmin(
            this.props.userProfile.establishment_id,
            this.props.userProfile.school_year_id,
            this.props.match.params.classId
          )
        );
      }
    } else if (this.props.userProfile.role_id === roleIdParent) {
      this.props.dispatch(getEventCallRegisterForParent(this.props.userProfile.id));
    }
  }
  event({ event }) {
    if (this.props.userProfile.role_id === roleIdProfessor) {
      return (
        <div id={'Popover-' + event.id}>
          <span>
            {event.eventType === 'lesson' ? (
              <p style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
                {' '}
                <b>{event.subjectName}</b> <br /> {event.roomName}{' '}
                {event.tagCallRegister ? (
                  <i
                    className="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'green', float: 'right' }}
                  ></i>
                ) : (
                  <i
                    className="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'red', float: 'right' }}
                  ></i>
                )}{' '}
              </p>
            ) : event.eventType === 'exam' ? (
              <p style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
                {' '}
                <IntlMessages id="components.note.exam" /> <b>{event.subjectName}</b> <br />{' '}
                {event.roomName}{' '}
                {event.tagCallRegister ? (
                  <i
                    className="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'green', float: 'right' }}
                  ></i>
                ) : (
                  <i
                    className="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'red', float: 'right' }}
                  ></i>
                )}{' '}
              </p>
            ) : (
              ''
            )}
          </span>
        </div>
      );
    } else if (this.props.userProfile.role_id === roleIdAdmin) {
      if (this.state.typeCallRegister === 'formation') {
        return (
          <div id={'Popover-' + event.id}>
            <span>
              {event.eventType === 'lesson' ? (
                <div style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
                  {' '}
                  <b>{event.subjectName}</b>
                  <br />{' '}
                  {event.profGender === 'Féminin' ? (
                    <p>
                      Mme. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                      {event.tagCallRegister ? (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'green', float: 'right' }}
                        ></i>
                      ) : (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'red', float: 'right' }}
                        ></i>
                      )}{' '}
                    </p>
                  ) : (
                    <p>
                      M. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                      {event.tagCallRegister ? (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'green', float: 'right' }}
                        ></i>
                      ) : (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'red', float: 'right' }}
                        ></i>
                      )}{' '}
                    </p>
                  )}{' '}
                </div>
              ) : event.eventType === 'exam' ? (
                <p style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
                  {' '}
                  <IntlMessages id="components.note.exam" />: <b>{event.subjectName}</b> <br />
                  {event.profGender === 'Féminin' ? (
                    <p>
                      Mme. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                      {event.tagCallRegister ? (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'green', float: 'right' }}
                        ></i>
                      ) : (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'red', float: 'right' }}
                        ></i>
                      )}{' '}
                    </p>
                  ) : (
                    <p>
                      M. {event.profName} {event.profSurname} <br /> {event.roomName}{' '}
                      {event.tagCallRegister ? (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'green', float: 'right' }}
                        ></i>
                      ) : (
                        <i
                          className="zmdi zmdi-circle zmdi-hc-lg "
                          style={{ color: 'red', float: 'right' }}
                        ></i>
                      )}{' '}
                    </p>
                  )}
                </p>
              ) : (
                ''
              )}
            </span>
          </div>
        );
      } else {
        return (
          <div id={'Popover-' + event.id}>
            <span>
              <div style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
                {' '}
                {event.tagCallRegister ? <b>{'appel fait'}</b> : <b>{'appel non fait'}</b>}
                <br />{' '}
                <p>
                  {event.tagCallRegister ? (
                    <i
                      className="zmdi zmdi-circle zmdi-hc-lg "
                      style={{ color: 'green', float: 'right' }}
                    ></i>
                  ) : (
                    <i
                      className="zmdi zmdi-circle zmdi-hc-lg "
                      style={{ color: 'red', float: 'right' }}
                    ></i>
                  )}
                </p>
              </div>
            </span>
          </div>
        );
      }
    } else if (this.props.userProfile.role_id === roleIdParent) {
      return (
        <div id={'Popover-' + event.id}>
          <span>
            <div style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
              {' '}
              {event.tagCallRegister ? <b>{'appel fait'}</b> : <b>{'appel non fait'}</b>}
              <br />{' '}
              <p>
                {event.tagCallRegister ? (
                  <i
                    className="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'green', float: 'right' }}
                  ></i>
                ) : (
                  <i
                    className="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'red', float: 'right' }}
                  ></i>
                )}
              </p>
            </div>
          </span>
        </div>
      );
    }
  }

  customToolbar = (toolbar) => {
    var currentDate = moment(toolbar.date);
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');

    const goToDayView = () => {
      // toolbar.onView('day');
      // this.handleView('day')

      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate('current');
    };

    const goToWeekView = () => {
      toolbar.onView('week');
      this.handleView('week');
    };

    const goToMonthView = () => {
      toolbar.onView('month');
      this.handleView('month');
    };

    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };
    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };
    return (
      <div className="d-flex flex-row bd-highlight mb-3 d-flex justify-content-center flex-wrap">
        <div className="p-4 bd-highlight">
          <h3 className="ml-5"> {this.state.classeName}</h3>
        </div>
        <div className="p-4 bd-highlight">
          <ButtonGroup vertical={false}>
            <Button
              className={this.state.status === 'day' ? ' jr-btn active' : 'jr-btn'}
              onClick={goToCurrent}
            >
              <span className="label-filter-off">
                <IntlMessages id="timetable.day" />
              </span>
            </Button>
            <Button
              className={this.state.status === 'week' ? ' jr-btn active' : 'jr-btn'}
              onClick={goToWeekView}
            >
              <span className="label-filter-off">
                {' '}
                <IntlMessages id="timetable.week" />
              </span>
            </Button>
            <Button
              className={this.state.status === 'month' ? 'jr-btn active' : 'jr-btn'}
              onClick={goToMonthView}
            >
              <span className="label-filter-off">
                <IntlMessages id="timetable.month" />
              </span>
            </Button>
          </ButtonGroup>
        </div>

        <div className="p-4 row bd-highlight">
          <i
            className="zmdi zmdi-chevron-left zmdi-hc-2x mr-3"
            style={{ color: '#0000CD' }}
            onClick={goToBack}
          ></i>
          {this.props.settings === 'tunisia' ? (
            <span style={{ color: '#0000CD' }}>
              {' '}
              <IntlMessages id="timetable.week" /> {moment(toolbar.date).weeks()}:{' '}
              {moment(weekStart).format('DD')} - {moment(weekEnd).format('DD') - 1}{' '}
              {new Date(weekStart).toLocaleDateString('ar-TN', options)}
            </span>
          ) : this.props.settings === 'french' ? (
            <span style={{ color: '#0000CD' }}>
              {' '}
              <IntlMessages id="timetable.week" /> {moment(toolbar.date).weeks()}:{' '}
              {moment(weekStart).format('DD')} - {moment(weekEnd).format('DD') - 1}{' '}
              {moment(weekStart).format('MMMM')}
            </span>
          ) : (
            <span style={{ color: '#0000CD' }}>
              {' '}
              <IntlMessages id="timetable.week" /> {moment(toolbar.date).weeks()}:{' '}
              {moment(weekStart).format('DD')} - {moment(weekEnd).format('DD') - 1}{' '}
              {new Date(weekStart).toLocaleDateString('en-US', options)}
            </span>
          )}

          <i
            className="zmdi zmdi-chevron-right zmdi-hc-2x ml-3"
            style={{ color: '#0000CD' }}
            onClick={goToNext}
          ></i>
        </div>
      </div>
    );
  };

  render() {
    //chefAgenceId
    if (this.state.isRedirect == true) {
      if (this.props.userProfile.role_id === roleIdParent) {
         return (
          <Redirect
            to={`/app/assiduity/DetailsCallRegister/${'journalier'}/${
              this.state.eventId
            }/${this.props.userProfile.agencyName}/${this.props.userProfile.id}/${this.state.startDate}`}
          />
        );
      } else {
        if (this.state.typeCallRegister === 'formation') {
 
          return (
            <Redirect
              to={`/app/assiduity/DetailsCallRegister/${this.state.typeCallRegister}/${this.state.eventId}/${this.state.classId}/${this.state.chefAgenceId}/${this.state.startDate}`}
            />
          );
        } else {
 
          return (
            <Redirect
              to={`/app/assiduity/DetailsCallRegister/${this.state.typeCallRegister}/${this.state.eventId}/${this.state.agenceName}/${this.state.chefAgenceId}/${this.state.startDate}`}
            />
          );
        }
      }
    } else {
      let newMatch = {
        path: '/app/assiduity/call_register',
        url: this.props.match.url,
        isExact: this.props.match.isExact,
        params: this.props.match.params,
      };
      return (
        <div className="app-wrapper">
          <ContainerHeader title={<IntlMessages id="call_register" />} match={newMatch} />
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
          {this.props.errorStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          <PlanningCalendar
            classes={this.state.classes}
            handleChangeProf={this.handleChangeProf}
            handleChangeClass={this.handleChangeClass}
            handleChangeType={this.handleChangeType}
            events={this.state.events}
            endTime={this.props.endTime}
            startTime={this.props.startTime}
            values={this.state}
            handleView={this.handleView}
            customToolbar={this.customToolbar}
            event={this.event}
            displayEventCallregister={this.displayEventCallregister}
            handleChangeTypeCall={this.handleChangeTypeCall}
            handleChangeAgence={this.handleChangeAgence}
            agenceSettings={this.props.agenceSettings}
          />

          <SweetAlert
            show={this.state.isOpen}
            title={<IntlMessages id="alert.call.register" />}
            onConfirm={this.onConfirm}
          ></SweetAlert>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    classes: state.ClassSettingsReducer.classSettings,
    startTime: state.settings.startTime,
    endTime: state.settings.endTime,
    events: state.planning.callRegisterEvents,
    settings: state.settings.locale.languageId,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    agenceSettings: state.AgenceReducer.agenceSettings,
    listParents: state.usersReducer.parents,
  };
};
export default connect(mapStateToProps)(Registre);
