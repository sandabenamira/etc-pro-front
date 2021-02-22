import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import ReportIcon from '@material-ui/icons/Report';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { ButtonGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import {
  getEventCallRegisterForAdmin,
  getEventCallRegisterForProf,
  getEventCallRegisterForParent,
} from '../../../../../actions/planningActions';
import { Redirect } from 'react-router-dom';
import {
  getStudentsCallRegister,
  getStudentsCallRegisterForParent,
} from '../../../../../actions/studentAction';
import ContainerHeader from '../../../../../components/ContainerHeader';
import { roleIdProfessor, roleIdAdmin, roleIdParent } from '../../../../../config/config';
import {
  saveCallRegister,
  getObservationList,
  getEncouragementList,
  getSanctionList,
  saveCallRegisterParent,
} from '../../../../../actions/RegistreAction';
import { classService } from '../../../../../_services/class.service';
import OtherPopover from './OtherPopover';
import SanctionPopover from './SanctionPopover';
import SweetAlert from 'react-bootstrap-sweetalert';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const styles = (theme) => ({
  textColorPrimary: {
    color: 'red',
  },
});

var options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
};
var options1 = {
  day: 'numeric',
  month: 'long',
};
var callRegisterParent = {
  delay: true,
  encouragement: true,
  observation: true,
  presence: true,
  sanction: true,
  status: true,
};
class DetailsCallRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: false,
      colorSelected: '#C0C0C0',
      title: '',
      dateEvent: '',
      callRegister: [],
      event: {},
      callRegisterSetting: {},
      isOpen: false,
      sutdentId: null,
      observations: [],
      encouragements: [],
      sanctions: [],
      observationSelected: [],
      descriptionObservation: '',
      encouragementSelected: [],
      descriptionEncouragement: '',
      isOpenSanction: false,
      sanctionSelected: [],
      descriptionSanction: '',
      isOpenAlert: false,
    };
    this.CustomToolbar = this.CustomToolbar.bind(this);
    this.event = this.event.bind(this);
    this.handleChangePresence = this.handleChangePresence.bind(this);
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
    this.handleChangeSanction = this.handleChangeSanction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeOther = this.handleChangeOther.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeObservations = this.handleChangeObservations.bind(this);
    this.handleChangeEncouragement = this.handleChangeEncouragement.bind(this);
    this.handleSubmitOther = this.handleSubmitOther.bind(this);
    this.handleSubmitSanction = this.handleSubmitSanction.bind(this);
    this.handleChangeSanctions = this.handleChangeSanctions.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }

  changeEvent = (event) => {
    this.setState({ event: event });
    let dateFormat = moment(event.start).format('YYYY-MM-DD');
    let timeFormat = moment(event.start)
      .add(-1, 'h')
      .format('HH:mm:ss[Z]');
    let TimeDate = dateFormat + 'T' + timeFormat;
    let eventId = event.id;

    let apiEndpoint =
      `/call_registers?access_token=${localStorage.token}&filter[where][and][0][fk_id_planning_events]=` +
      eventId +
      `&filter[where][and][1][start_date]=` +
      TimeDate +
      `&filter[include][studentCall][student][profile][user]`;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        if (res.data.length > 0) {
          let historiqRegistre = res.data[0].studentCall.map((element) => {
            return {
              name: element.student.profile.user.name,
              surname: element.student.profile.user.surname,
              presence: element.presence,
              delay: element.delay,
              sanction: element.sanction,
              description_sanction: element.description_sanction,
              observation: element.observation,
              description_observation: element.description_observation,
              encouragement: element.encouragement,
              description_encouragement: element.description_encouragement,
              studentId: element.fk_id_student,
              photo: element.student.profile.user.photo,
            };
          });

          this.setState({ callRegister: historiqRegistre });
        } else {
          this.setState({ callRegister: this.props.students });
        }
      }
    });
  };

  onConfirm() {
    this.setState({ isOpenAlert: false });
  }

  handleChangeSanctions = (selectedOption) => {
    this.setState({ sanctionSelected: selectedOption });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeEncouragement = (selectedOption) => {
    this.setState({ encouragementSelected: selectedOption });
  };

  handleChangeObservations = (selectedOption) => {
    this.setState({ observationSelected: selectedOption });
  };

  handleCancel() {
    this.setState({ isOpen: false, isOpenSanction: false });
  }

  handleChangeOther(event, id, student) {
    event.preventDefault();
    let observationSelected = this.state.observations.filter(
      (observation) => observation.value == student.observation
    );
    let encouragementSelected = this.state.encouragements.filter(
      (encouragement) => encouragement.value == student.encouragement
    );
    this.setState({
      isOpen: true,
      sutdentId: id,
      descriptionObservation: student.description_observation,
      descriptionEncouragement: student.description_encouragement,
      observationSelected,
      encouragementSelected,
    });
  }

  handleChangePresence(event, name, id) {
    event.preventDefault();

    let newCallRegister = this.state.callRegister.map((studentCall) =>
      studentCall.studentId === parseInt(id)
        ? {
            ...studentCall,
            [name]: !studentCall.presence,
          }
        : studentCall
    );
    this.setState({ callRegister: newCallRegister });
  }

  handleChangeDelay(event, name, id) {
    event.preventDefault();
    let newCallRegister = this.state.callRegister.map((studentCall) =>
      studentCall.studentId === parseInt(id)
        ? {
            ...studentCall,
            [name]: !studentCall.delay,
          }
        : studentCall
    );
    this.setState({ callRegister: newCallRegister });
  }

  handleChangeSanction(event, id, student) {
    let sanctionSelected = this.state.sanctions.filter(
      (sanction) => sanction.value == student.sanction
    );
    event.preventDefault();
    this.setState({
      isOpenSanction: true,
      sutdentId: id,
      descriptionSanction: student.description_sanction,
      sanctionSelected,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let callRegister = {
      plannningEventsId: this.state.event.id,
      creatorProfileId: this.props.userProfile.id,
      startDate: this.state.event.start,
      endDate: this.state.event.end,
      callDate: moment()._d,
      studentsCalls: this.state.callRegister,
    };
    let otherData = {
      classId: this.state.event.classId,
      establishementId: this.props.userProfile.establishment_id,
      schoolYearId: this.props.userProfile.school_year_id,
      roleId: this.props.userProfile.role_id,
      profileId: this.props.userProfile.id,
    };
    if (this.props.userProfile.role_id === roleIdParent) {
      this.props.dispatch(saveCallRegisterParent(callRegister, otherData));
    } else {
      this.props.dispatch(saveCallRegister(callRegister, otherData, this.state.title));
    }
    this.setState({ isRedirect: true });
  }

  handleSubmitOther(e, id) {
    e.preventDefault();
    this.setState({ isOpen: false });

    let newCallRegister = this.state.callRegister.map((studentCall) =>
      studentCall.studentId === parseInt(id)
        ? {
            ...studentCall,
            observation: this.state.observationSelected.value,
            description_observation: this.state.descriptionObservation,
            encouragement: this.state.encouragementSelected.value,
            description_encouragement: this.state.descriptionEncouragement,
          }
        : studentCall
    );
    this.setState({
      callRegister: newCallRegister,
      observationSelected: '',
      descriptionObservation: '',
      encouragementSelected: '',
      descriptionEncouragement: '',
    });
  }

  handleSubmitSanction(e, id) {
    e.preventDefault();
    this.setState({ isOpenSanction: false });
    let newCallRegister = this.state.callRegister.map((studentCall) =>
      studentCall.studentId === parseInt(id)
        ? {
            ...studentCall,
            sanction: this.state.sanctionSelected.value,
            description_sanction: this.state.descriptionSanction,
          }
        : studentCall
    );
    this.setState({
      callRegister: newCallRegister,
      sanctionSelected: '',
      descriptionSanction: '',
    });
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
                    class="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'green', float: 'right' }}
                  ></i>
                ) : (
                  <i
                    class="zmdi zmdi-circle zmdi-hc-lg "
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
                    class="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'green', float: 'right' }}
                  ></i>
                ) : (
                  <i
                    class="zmdi zmdi-circle zmdi-hc-lg "
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
              <div style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
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
              </div>
            ) : (
              ''
            )}
          </span>
        </div>
      );
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

  CustomToolbar = (toolbar) => {
    let dayCall = new Date(toolbar.date);
    const goToBack = () => {
      toolbar.onNavigate('PREV');
      dayCall.setDate(dayCall.getDate() + -1);

      let title =
        this.props.userProfile.role_id === roleIdParent
          ? 'Agence Biat sousse 1' + '/' + new Date(dayCall).toLocaleDateString('fr-FR', options)
          : this.state.event.classeName +
            '/' +
            this.state.event.subjectName +
            '/' +
            new Date(dayCall).toLocaleDateString('fr-FR', options);
      this.setState({
        title: title,
        dateEvent: new Date(dayCall).toLocaleDateString('fr-FR', options1),
      });
    };

    const goToNext = () => {
      dayCall.setDate(dayCall.getDate() + 1);
      let curentDay = new Date();
      let checkDate = moment(dayCall).isAfter(curentDay);
      if (!checkDate) {
        toolbar.onNavigate('NEXT');

        let title =
          this.props.userProfile.role_id === roleIdParent
            ? 'Agence Biat sousse 1' + '/' + new Date(dayCall).toLocaleDateString('fr-FR', options)
            : this.state.event.classeName +
              '/' +
              this.state.event.subjectName +
              '/' +
              new Date(dayCall).toLocaleDateString('fr-FR', options);
        this.setState({
          title: title,
          dateEvent: new Date(dayCall).toLocaleDateString('fr-FR', options1),
          colorSelected: '#0000CD',
        });
      } else {
        this.setState({ colorSelected: '#C0C0C0' });
      }
    };

    return (
      <div className="d-flex flex-row bd-highlight mb-3 d-flex justify-content-around">
        <div className="p-2 bd-highlight"></div>
        <div className="p-2 bd-highlight">
          <ButtonGroup vertical={false}>
            <Button className=" jr-btn active">
              <span className="label-filter-off">
                <IntlMessages id="timetable.day" />
              </span>
            </Button>
            <Button className="jr-btn" disabled={true}>
              <span className="label-filter-off">
                {' '}
                <IntlMessages id="timetable.week" />
              </span>
            </Button>
            <Button className="jr-btn" disabled={true}>
              <span className="label-filter-off">
                <IntlMessages id="timetable.month" />
              </span>
            </Button>
          </ButtonGroup>
          <Typography
            variant="h6"
            style={{
              color: '#3F51B5',
              fontWeight: 'normal',
              fontFamily: 'Roboto',
              marginLeft: '60px',
              marginTop: '20px',
            }}
          >
            <i
              className="zmdi zmdi-chevron-left zmdi-hc-1x mr-3"
              style={{ color: '#0000CD' }}
              onClick={goToBack}
            ></i>
            {this.state.dateEvent}
            <i
              className="zmdi zmdi-chevron-right zmdi-hc-1x ml-3"
              style={{ color: this.state.colorSelected }}
              onClick={goToNext}
            ></i>
          </Typography>
        </div>
      </div>
    );
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
      borderRadius: '0px',
      paddingTop: height,
    };
    return {
      style: style,
    };
  }
  componentDidMount() {
    // this.props.dispatch(
    //   getEventCallRegisterForAdmin(
    //     this.props.userProfile.establishment_id,
    //     this.props.userProfile.school_year_id,
    //     this.props.match.params.classId
    //   )
    // );
    if (this.props.userProfile.role_id === roleIdProfessor) {
      this.props.dispatch(
        getEventCallRegisterForProf(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.props.userProfile.id
        )
      );
    } else if (this.props.userProfile.role_id === roleIdAdmin) {
      this.props.dispatch(
        getEventCallRegisterForAdmin(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.props.match.params.classId
        )
      );
    } else if (this.props.userProfile.role_id === roleIdParent) {
      this.props.dispatch(
        getEventCallRegisterForParent(
         
          this.props.userProfile.id
        )
      );
    }
    let dateFormat = moment(this.props.match.params.startDate).format('YYYY-MM-DD');
    let timeFormat = moment(this.props.match.params.startDate)
      .add(-1, 'h')
      .format('HH:mm:ss[Z]');
    let TimeDate = dateFormat + 'T' + timeFormat;
    let eventId = this.props.match.params.eventId;
    let apiEndpoint =
      `/call_registers?access_token=${localStorage.token}&filter[where][and][0][fk_id_planning_events]=` +
      eventId +
      `&filter[where][and][1][start_date]=` +
      TimeDate +
      `&filter[include][studentCall][student][profile][user]`;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        if (res.data.length > 0) {
          let historiqRegistre = res.data[0].studentCall.map((element) => {
            return {
              name: element.student.profile.user.name,
              surname: element.student.profile.user.surname,
              presence: element.presence,
              delay: element.delay,
              sanction: element.sanction,
              description_sanction: element.description_sanction,
              observation: element.observation,
              description_observation: element.description_observation,
              encouragement: element.encouragement,
              description_encouragement: element.description_encouragement,
              studentId: element.fk_id_student,
              photo: element.student.profile.user.photo,
            };
          });

          this.setState({ callRegister: historiqRegistre });
        } else {
          this.setState({ callRegister: this.props.students });
        }
      }
    });
    const startDateEvent = moment(this.props.match.params.startDate).format('DD/MM/YYYY HH:mm');
    let eventSelected = this.props.events.filter(
      (element) =>
        element.id === parseInt(this.props.match.params.eventId, 10) &&
        moment(element.start).format('DD/MM/YYYY HH:mm') === startDateEvent
    );

    if (!_.isEmpty(eventSelected)) {
      if (this.props.userProfile.role_id !== roleIdParent) {
        const classId = eventSelected[0].classId;
        let apiEndpoint = `/class_v4/${classId}?access_token=${localStorage.token}&filter[include][level][educationType][callRegisterSetting]`;
        classService.get(apiEndpoint).then((res) => {
          if (res) {
            let callRegisterSetting = res.data.level.educationType.callRegisterSetting;
            if (!_.isEmpty(callRegisterSetting)) {
              let callRegisterSetting = res.data.level.educationType.callRegisterSetting[0];
              this.setState({ callRegisterSetting });
              if (callRegisterSetting.observation) {
                this.props.dispatch(getObservationList());
              }
              if (callRegisterSetting.encouragement) {
                this.props.dispatch(getEncouragementList());
              }
              if (callRegisterSetting.sanction) {
                this.props.dispatch(getSanctionList());
              }
            } else {
              this.setState({ isOpenAlert: true });
            }
          }
        });
      } else {
        this.props.dispatch(getObservationList());

        this.props.dispatch(getEncouragementList());

        this.props.dispatch(getSanctionList());
        this.setState({ callRegisterSetting: callRegisterParent });
      }

      let title =
        this.props.userProfile.role_id === roleIdParent
          ? 'Agence Biat sousse 1/' +
            '/' +
            new Date(eventSelected[0].start).toLocaleDateString('fr-FR', options)
          : eventSelected[0].classeName +
            '/' +
            eventSelected[0].subjectName +
            '/' +
            new Date(eventSelected[0].start).toLocaleDateString('fr-FR', options);

      let curentDay = new Date();
      let checkDate = moment(eventSelected[0].start).isAfter(curentDay);
      if (!checkDate) {
        this.setState({ colorSelected: '#0000CD' });
      }
      this.setState({
        title: title,
        dateEvent: new Date(eventSelected[0].start).toLocaleDateString('fr-FR', options1),
        event: eventSelected[0],
      });
    }
  }
  componentDidUpdate(prevProps) {
    let title = '';
    if (prevProps.userProfile !== this.props.userProfile) {
      if (this.props.userProfile.role_id === roleIdProfessor) {
        this.props.dispatch(
          getEventCallRegisterForProf(
            this.props.userProfile.establishment_id,
            this.props.userProfile.school_year_id,
            this.props.userProfile.id
          )
        );
      } else if (this.props.userProfile.role_id === roleIdAdmin) {
        this.props.dispatch(
          getEventCallRegisterForAdmin(
            this.props.userProfile.establishment_id,
            this.props.userProfile.school_year_id,
            this.props.match.params.classId
          )
        );
      } else if (this.props.userProfile.role_id === roleIdParent) {
        this.props.dispatch(
          getEventCallRegisterForParent(
          
            this.props.userProfile.id
          )
        );
      }
      if (this.props.userProfile.role_id === roleIdParent) {
        this.props.dispatch(getStudentsCallRegisterForParent(this.props.userProfile.id));
      } else {
        this.props.dispatch(
          getStudentsCallRegister(
            this.props.match.params.classId,
            this.props.userProfile.school_year_id
          )
        );
      }
    }
    if (prevProps.students !== this.props.students && this.state.callRegister.length == 0) {
      this.setState({ callRegister: this.props.students });
    }

    if (prevProps.events !== this.props.events) {
      const startDateEvent = moment(this.props.match.params.startDate).format('DD/MM/YYYY HH:mm');
      let eventSelected = this.props.events.filter(
        (element) =>
          element.id === parseInt(this.props.match.params.eventId, 10) &&
          moment(element.start).format('DD/MM/YYYY HH:mm') === startDateEvent
      );
      this.setState({
        event: eventSelected[0],
      });
      if (!_.isEmpty(eventSelected)) {
        if (this.props.userProfile.role_id !== roleIdParent) {
          const classId = eventSelected[0].classId;

          let apiEndpoint = `/class_v4/${classId}?access_token=${localStorage.token}&filter[include][level][educationType][callRegisterSetting]`;
          classService.get(apiEndpoint).then((res) => {
            if (res) {
              let callRegisterSetting = res.data.level.educationType.callRegisterSetting;
              if (!_.isEmpty(callRegisterSetting)) {
                let callRegisterSetting = res.data.level.educationType.callRegisterSetting[0];
                this.setState({ callRegisterSetting });
                if (callRegisterSetting.observation) {
                  this.props.dispatch(getObservationList());
                }
                if (callRegisterSetting.encouragement) {
                  this.props.dispatch(getEncouragementList());
                }
                if (callRegisterSetting.sanction) {
                  this.props.dispatch(getSanctionList());
                }
              } else {
                this.setState({ isOpenAlert: true });
              }
            }
          });
        } else {
          this.props.dispatch(getObservationList());

          this.props.dispatch(getEncouragementList());

          this.props.dispatch(getSanctionList());
          this.setState({ callRegisterSetting: callRegisterParent });
        }

        title =
          this.props.userProfile.role_id === roleIdParent
            ? 'Agence Biat sousse 1' +
              '/' +
              new Date(eventSelected[0].start).toLocaleDateString('fr-FR', options)
            : eventSelected[0].classeName +
              '/' +
              eventSelected[0].subjectName +
              '/' +
              new Date(eventSelected[0].start).toLocaleDateString('fr-FR', options);

        this.setState({
          title: title,
          dateEvent: new Date(eventSelected[0].start).toLocaleDateString('fr-FR', options1),
          event: eventSelected[0],
        });
      }
    }

    if (prevProps.observations !== this.props.observations) {
      let options = [];
      this.props.observations.forEach((element, index) => {
        let option = {
          label: element.name_fr,
          value: element.value,
          key: index,
        };
        options.push(option);
      });
      this.setState({ observations: options });
    }
    if (prevProps.encouragements !== this.props.encouragements) {
      let options = [];
      this.props.encouragements.forEach((element, index) => {
        let option = {
          label: element.name_fr,
          value: element.value,
          key: index,
        };
        options.push(option);
      });
      this.setState({ encouragements: options });
    }
    if (prevProps.sanctions !== this.props.sanctions) {
      let options = [];
      this.props.sanctions.forEach((element, index) => {
        let option = {
          label: element.name_fr,
          value: element.value,
          key: index,
        };
        options.push(option);
      });
      this.setState({ sanctions: options });
    }
  }
  render() {
     let newMatch = {
      path: '/app/assiduity/DetailsCallRegister',
      url: this.props.match.url,
      isExact: this.props.match.isExact,
      params: this.props.match.params,
    };

    const startDayTime = new Date('2020-11-30T07:00:00.000Z');
    const endDayTime = new Date('2020-11-30T17:00:00.000Z');
    let events = this.props.events ? this.props.events : [];
    if (this.state.isRedirect == true) {
      return (
        <Redirect
          to={`/app/assiduity/call_register/${this.props.match.params.classId}/${this.state.event.classeName}`}
        />
      );
    } else {
      return (
        <div
          className="d-flex flex-column    col-lg-12 col-md-12 col-sm-6 bd-highlight "
          style={{
            paddingRight: 'auto',
            paddingLeft: '2%',
          }}
        >
          <ContainerHeader title={<IntlMessages id="call_register" />} match={newMatch} />
          <div className="d-flex flex-column    col-lg-12 col-md-12 col-sm-6 bd-highlight ">
            <div className="pointer">
              <h5
                style={{
                  color: 'blue',
                  fontWeight: 'normal',
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  marginRight: '50%',
                }}
                onClick={() => this.setState({ isRedirect: true })}
              >
                {<IntlMessages id="sidebar.components.assiduity" />}/
                {<IntlMessages id="call_register" />}
              </h5>
            </div>

            <div className=" d-flex flex-row bd-highlight  justify-content-between  ">
              <div className="bd-highlight">
                <ListItem>
                  <ListItemText
                    primary={
                      <div className=" d-flex row">
                        <Typography
                          variant="h6"
                          style={{
                            color: '#3F51B5',
                            fontWeight: 'normal',
                            fontFamily: 'Roboto',
                            marginLeft: '-20px',
                          }}
                        >
                          {this.state.title}
                        </Typography>
                      </div>
                    }
                  />{' '}
                </ListItem>
              </div>
              <div className="bd-highlight " style={{ fontSize: '13px' }}>
                {moment(this.state.event.start).format('HH:mm')} &nbsp; à &nbsp;
                {moment(this.state.event.end).format('HH:mm')}
              </div>
              <div className=" bd-highlight ">
                <PrintIcon
                  style={{
                    fontSize: '35',
                  }}
                  color="inherit"
                />
                <PictureAsPdfIcon
                  style={{
                    fontSize: '35',
                  }}
                  color="inherit"
                />
              </div>
            </div>
          </div>

          <div className="row col-lg-12 col-md-12 ">
            <div className="row col-lg-12 col-md-12 "></div>
            <div className="col-xl-3 col-lg-4 col-md-7 col-sm-12 col-12 ">
              <DragAndDropCalendar
                style={{
                  backgroundColor: 'white',
                }}
                localizer={localizer}
                events={events}
                defaultView="day"
                timeslots={1}
                min={startDayTime}
                max={endDayTime}
                eventPropGetter={this.eventStyleGetter}
                defaultDate={new Date(this.props.match.params.startDate)}
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
                onSelectEvent={(event) => this.changeEvent(event)}
                components={{
                  event: this.event,
                  toolbar: this.CustomToolbar,
                }}
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
              {this.state.callRegister
                .slice(0, Math.ceil(this.state.callRegister.length / 2))
                .map((element, index) => (
                  <div
                    className="d-flex flex-wrap flex-row justify-content-around  bd-highlight card shadow"
                    key={index}
                    id={'Popover-' + element.studentId}
                  >
                    <div className="mr-2 mt-2 bd-highlight">
                      {' '}
                      <Avatar alt="..." src={element.photo} className="size-40" />
                    </div>
                    <div
                      className="mr-2  bd-highlight description"
                      style={{ marginTop: '13px', marginRight: '15px' }}
                    >
                      {' '}
                      <h5>
                        {element.name} {element.surname}
                      </h5>
                    </div>
                    {this.state.callRegisterSetting.presence && (
                      <div className=" bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <Switch
                              classes={{
                                checked: 'text-success',
                              }}
                              onChange={(event) =>
                                this.handleChangePresence(event, 'presence', element.studentId)
                              }
                              checked={element.presence}
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.presence" />
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.callRegisterSetting.delay ? (
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <AccessAlarmsIcon
                              style={{
                                color: element.delay ? 'black' : 'Grey',
                              }}
                              onClick={(event) =>
                                this.handleChangeDelay(event, 'delay', element.studentId)
                              }
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.retard" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.callRegisterSetting.sanction ? (
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <ReportIcon
                              style={{
                                color: element.sanction ? 'pink' : 'Grey',
                              }}
                              onClick={(event) =>
                                this.handleChangeSanction(
                                  event,

                                  element.studentId,
                                  element
                                )
                              }
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.punition" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.callRegisterSetting.encouragement ||
                    this.state.callRegisterSetting.observation ? (
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <AddCircleIcon
                              color="primary"
                              onClick={(event) =>
                                this.handleChangeOther(event, element.studentId, element)
                              }
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.autre" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
              {this.state.callRegister
                .slice(
                  Math.ceil(this.state.callRegister.length / 2),
                  this.state.callRegister.length
                )
                .map((element, index) => (
                  <div
                    className="d-flex flex-wrap flex-row justify-content-around  bd-highlight card shadow"
                    key={index}
                    id={'Popover-' + element.studentId}
                  >
                    <div className="mr-2 mt-2 bd-highlight">
                      {' '}
                      <Avatar alt="..." src={element.photo} className="size-40" />
                    </div>
                    <div
                      className="mr-2  bd-highlight description"
                      style={{ marginTop: '13px', marginRight: '15px' }}
                    >
                      {' '}
                      <h5>
                        {element.name} {element.surname}
                      </h5>
                    </div>
                    {this.state.callRegisterSetting.presence ? (
                      <div className=" bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <Switch
                              classes={{
                                checked: 'text-success',
                              }}
                              onChange={(event) =>
                                this.handleChangePresence(event, 'presence', element.studentId)
                              }
                              checked={element.presence}
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.presence" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.callRegisterSetting.delay ? (
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <AccessAlarmsIcon
                              style={{
                                color: element.delay ? 'black' : 'Grey',
                              }}
                              onClick={(event) =>
                                this.handleChangeDelay(event, 'delay', element.studentId)
                              }
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.retard" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.callRegisterSetting.sanction ? (
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <ReportIcon
                              style={{
                                color: element.sanction ? 'pink' : 'Grey',
                              }}
                              onClick={(event) =>
                                this.handleChangeSanction(event, element.studentId, element)
                              }
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.punition" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.callRegisterSetting.encouragement ||
                    this.state.callRegisterSetting.observation ? (
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-column bd-highlight ">
                          <div className=" bd-highlight">
                            {' '}
                            <AddCircleIcon
                              color="primary"
                              onClick={(event) =>
                                this.handleChangeOther(event, element.studentId, element)
                              }
                            />
                          </div>
                          <div className=" bd-highlight" style={{ fontSize: '9px' }}>
                            <IntlMessages id="timetable.autre" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
              <div className="d-flex justify-content-end mt-5">
                <Button
                  disabled={this.state.callRegister.length == 0}
                  variant="contained"
                  style={{
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    width: '100px',
                    height: '40px',
                    marginRight: '10%',
                  }}
                  className=" bg-indigo text-white "
                  onClick={this.handleSubmit}
                >
                  <IntlMessages id="button.save.registreAppel" />
                </Button>
              </div>
            </div>
          </div>

          {this.state.isOpen ? (
            <OtherPopover
              values={this.state}
              handleCancel={this.handleCancel}
              handleChange={this.handleChange}
              handleChangeObservations={this.handleChangeObservations}
              handleChangeEncouragement={this.handleChangeEncouragement}
              handleSubmitOther={this.handleSubmitOther}
            />
          ) : (
            ''
          )}
          {this.state.isOpenSanction ? (
            <SanctionPopover
              values={this.state}
              handleCancel={this.handleCancel}
              handleSubmitSanction={this.handleSubmitSanction}
              handleChangeSanctions={this.handleChangeSanctions}
              handleChange={this.handleChange}
            />
          ) : (
            ''
          )}
          <SweetAlert
            show={this.state.isOpenAlert}
            title={<IntlMessages id="alert.setting.call.register" />}
            onConfirm={this.onConfirm}
          ></SweetAlert>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings.locale.languageId,
    events: state.planning.callRegisterEvents,
    userProfile: state.auth.userProfile,
    students: state.student.remoteStudents,
    observations: state.callRegister.observations,
    encouragements: state.callRegister.encouragements,
    sanctions: state.callRegister.sanctions,
  };
};
export default withStyles(styles)(connect(mapStateToProps)(DetailsCallRegister));
