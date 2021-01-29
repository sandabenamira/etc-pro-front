import React from 'react';
import '../../../../../styles/app.scss';
import './Calendar.css';
import _ from 'lodash';
import moment from 'moment';
import AddEvent from './AddEvent';
import PlanningCalendar from './PlanningCalendar';
import { getRoomsByEstablshment } from '../../../../../actions/roomAction';
import { connect } from 'react-redux';
import {
  getData as getProfessors,
  getProfesseurByEstablishmentId,
} from '../../../../../actions/professorAction';
import {
  addEvent,
  handleEventRequestClose,
  getEventsByEstabAndSchoolYear,
  editEvent,
  deleteEvent,
} from '../../../../../actions/planningActions';
import { getAssignementCourse } from '../../../../../actions/AssignementAction';
import Snackbar from '@material-ui/core/Snackbar';
import { classService } from '../../../../../_services/class.service';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from '../../../../../util/IntlMessages';
import { removeEventList } from '../../../../../actions/planningActions';
import EditEvent from './EditEvent';
import { roleIdSuperAdmin } from '../../../../../config/config';
import EventDetails from './EventDetails';
import ConfirmationEditEvent from './ConfirmationEditEvent';
import ConfirmationNotifMail from './ConfirmationNotifMail';
import ConfirmationDeleteEvent from './ConfirmationDeleteEvent';
import { UncontrolledAlert } from 'reactstrap';
import AlerteDelete from './AlerteDelete';
class Planning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      slotInfo: '',
      eventList: [],
      classrooms: [],
      classe: {},
      establishment: '',
      establishmentClass: [],
      establishmentProfessor: [],
      subjectListByLevel: [],
      show: false,
      isOpenEdit: false,

      courses: [],
      subjects: [],
      nameError: false,
      professorId: '',
      frequencyID: '',
      room: '',
      // event_type: "lesson",
      subjectId: 0,
      className: '',
      startHours: '',
      endHours: '',
      dateEvent: '',
      frequencyOption: false,
      eventType: 'lesson',
      loader: false,
      eventName: '',
      subject: '',
      assignClassSubjectId: '',
      professor: [],
      roomName: '',
      subjectName: '',
      subjectColor: '',
      profName: '',
      profSurname: '',
      idEvent: null,
      isEditAction: false,
      isOpenModalConfirm: false,
      AllObject: {
        // fk_id_establishment: 0,
        // fk_id_level_v4: 0,
        // fk_id_school_year: 0,
        // fk_id_section_v4: 0,
        // id: 0,
        // name: 'All',
      },
      EventGategorie: '',
      isOpen: false,
      details: {},
      eventChecked: 'thisEvent',
      frequency: [],
      allFrequency: [
        {
          value: 'weekly',
          label: <IntlMessages id="data.weekly" />,
        },
        {
          value: 'fortnightly',
          label: <IntlMessages id="data.fortnightly" />,
        },
        {
          value: 'annual',
          label: <IntlMessages id="mode_payment.establishment.annual" />,
        },
      ],
      examFrequency: [
        {
          value: 'annual',
          label: <IntlMessages id="mode_payment.establishment.annual" />,
        },
      ],
      options: {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      },
      courseAssignmentClass: [],
      endTimeEventError: true,
      startTimeEventError: true,
      endHourEventError: true,
      startHourEventError: true,
      detailsMailNotif: {},
      isOpenModalConfimationNotif: false,
      alerteNotif: false,
      messageAlerte: '',
      colorNotif: ' ',
      disponibleRooms: [],
      indisponibleprofessors: [],
      isOpenModalDelete: false,
      deleteItem: {},
      typeDeleteChecked: 'all',
    };

    this.addLesson = this.addLesson.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeClasse = this.handleChangeClasse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFields = this.handleChangeFields.bind(this);
    this.handleChangeFieldsProfessor = this.handleChangeFieldsProfessor.bind(this);
    this.handleChangeFieldsRoom = this.handleChangeFieldsRoom.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeEventType = this.handleChangeEventType.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.displayEventDetails = this.displayEventDetails.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditConfirmation = this.handleEditConfirmation.bind(this);
    this.handleCancelEditEvent = this.handleCancelEditEvent.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleNotifMailConfirmation = this.handleNotifMailConfirmation.bind(this);
    this.handleCancelNotif = this.handleCancelNotif.bind(this);
    this.handleSubmitNotif = this.handleSubmitNotif.bind(this);
    this.handleDeleteConfirmation = this.handleDeleteConfirmation.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
    this.handleChangeTypeDelete = this.handleChangeTypeDelete.bind(this);
  }

  handleDeleteConfirmation = (event) => {
    this.setState({
      isOpen: false,
      deleteItem: event,
      isOpenModalDelete: true,
    });
  };
  handleSubmitDelete = () => {
    let startTimeDate =
      moment(this.state.deleteItem.start).format('YYYY-MM-DD') +
      'T' +
      moment(this.state.deleteItem.start).format('HH:mm:ssZ');
    let endTimeDate =
      moment(this.state.deleteItem.end).format('YYYY-MM-DD') +
      'T' +
      moment(this.state.deleteItem.end).format('HH:mm:ssZ');

    let data = {};
    data.id = this.state.deleteItem.id;
    data.start = startTimeDate;
    data.end = endTimeDate;

    if (this.state.typeDeleteChecked == 'future') {
      let newRepetition = this.state.deleteItem.repetition.filter(
        (element) => element < this.state.deleteItem.idRepetition
      );
      data.repetition = newRepetition;
      data.status = true;
      this.props.dispatch(
        deleteEvent(
          this.state.typeDeleteChecked,
          data,
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.state.classe.id
        )
      );
    } else if (this.state.typeDeleteChecked == 'uniq') {
      let newRepetition = this.state.deleteItem.repetition.filter(
        (element) => element != this.state.deleteItem.idRepetition
      );
      data.repetition = newRepetition;
      data.status = true;
      this.props.dispatch(
        deleteEvent(
          this.state.typeDeleteChecked,
          data,
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.state.classe.id
        )
      );
    } else if (this.state.typeDeleteChecked == 'all') {
      data.status = false;
      let classId = this.state.classe.id == undefined ? 0 : this.state.classe.id;
      this.props.dispatch(
        deleteEvent(
          this.state.typeDeleteChecked,
          data,
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          classId
        )
      );
    }
    this.setState({
      deleteItem: {},
      isOpenModalDelete: false,
      typeDeleteChecked: 'all',
    });
  };
  handleSubmitNotif = () => {
    let obj = {};
    obj.subjectName = this.state.detailsMailNotif.subjectName;
    obj.eventType = this.state.detailsMailNotif.eventType;
    obj.profName = this.state.detailsMailNotif.profName;
    obj.profSurname = this.state.detailsMailNotif.profSurname;
    obj.roomName = this.state.detailsMailNotif.roomName;
    obj.end = moment(this.state.detailsMailNotif.end).format('LT');
    obj.start = moment(this.state.detailsMailNotif.start).format('LLLL');
    obj.classId = this.state.detailsMailNotif.classId;
    obj.classeName = this.state.detailsMailNotif.classeName;
    let apiEndpoint = `/planning_events/absent-prof-notif?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, obj).then((response) => {
      if (response.data.notificationData.length > 0) {
        this.setState({
          messageAlerte:
            response.data.notificationData.length + ' Parents sont notifiés avec succées',
          alerteNotif: true,
          colorNotif: 'bg-success',
        });
        setTimeout(() => {
          this.setState({ messageAlerte: '', alerteNotif: false });
        }, 4000);
      } else {
        this.setState({
          messageAlerte: ' Aucun Parent est notifié',
          alerteNotif: true,
          colorNotif: 'bg-danger',
        });
        setTimeout(() => {
          this.setState({ messageAlerte: '', alerteNotif: false });
        }, 4000);
      }
    });

    this.setState({ detailsMailNotif: {}, isOpenModalConfimationNotif: false });
  };
  handleCancelNotif = () => {
    this.setState({
      detailsMailNotif: {},
      isOpenModalConfimationNotif: false,
      deleteItem: {},
      isOpenModalDelete: false,
      typeDeleteChecked: 'all',
    });
  };

  handleNotifMailConfirmation = (event) => {
    this.setState({
      isOpen: false,
      detailsMailNotif: event,
      isOpenModalConfimationNotif: true,
    });
  };

  handleDateStartChange = (date) => {
    let startHourEventError = moment(date._d).isBefore(this.state.endHours);

    this.setState({
      startHours: date,
      startHourEventError: startHourEventError,
    });
  };
  handleDateEndChange = (date) => {
    let endHourEventError = moment(date._d).isAfter(this.state.startHours);

    this.setState({ endHours: date, endHourEventError: endHourEventError });
  };

  handleDateChange = (date) => {
    let startHours = moment({
      y: moment(date).year(),
      M: moment(date).month(),
      d: moment(date).format('DD'),
      h: moment(this.state.startHours).hour(),
      m: moment(this.state.startHours).minutes(),
    });
    let endHours = moment({
      y: moment(date).year(),
      M: moment(date).month(),
      d: moment(date).format('DD'),
      h: moment(this.state.endHours).hour(),
      m: moment(this.state.endHours).minutes(),
    });
    this.setState({
      startHours: moment(startHours).format(),
      endHours: moment(endHours).format(),
      dateEvent: moment(date).format(),
    });
  };

  handleChangeEvent = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeTypeDelete = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleEditConfirmation = (event) => {
    event.preventDefault();
    this.setState({ isOpenModalConfirm: true });
  };

  handleCancelEditEvent = () => {
    this.setState({ isOpenModalConfirm: false });
  };
  handleEdit = (event) => {
    const course = this.state.courses.filter(
      (element) => element.fk_id_subject_v4 === event.subjectId
    );

    if (event.eventType === 'exam') {
      const frequency = this.state.examFrequency;
      this.setState({
        frequency: frequency,
        professor: this.props.professors,
        EventGategorie: 1,
      });
      if (!_.isEmpty(course[0].course)) {
        this.setState({
          subjectName: course[0].subject.name,
          subjectColor: course[0].subject.color,
          endHours: event.end,
        });
      }
    } else if (event.eventType === 'lesson') {
      const frequency = this.state.allFrequency;
      this.setState({ frequency: frequency });
      if (!_.isEmpty(course[0].course)) {
        const profId = course[0].course[0].fk_id_professor;
        var professor = this.props.professors.filter((element) => {
          if (!_.isEmpty(element.profile.professors)) {
            var x = element.profile.professors[0].id;
            if (x == profId) return element;
          }
        });

        this.setState({
          subjectName: course[0].subject.name,
          subjectColor: course[0].subject.color,
          professor: professor,
          EventGategorie: 1,
          endHours: event.end,
        });
      }
    } else if (event.eventType === 'event') {
      this.setState({
        professor: this.props.professors,
        EventGategorie: 1,
        endHours: event.end,
      });
    } else {
      this.setState({
        EventGategorie: 0,
        endHours: moment(event.end).subtract(1, 'days'),
      });
    }

    this.setState({
      isOpen: false,
      startHours: event.start,
      eventName: event.title,
      frequencyID: event.frequency,
      eventType: event.eventType,
      room: event.roomId,
      professorId: event.profId,
      assignClassSubjectId: event.assignClassSubjectId,
      subject: event.subjectId,
      idEvent: event.id,
      subjectId: event.subjectId,
      profName: event.profName,
      profSurname: event.profSurname,
      className: event.classeName,
      roomName: event.roomName,
      isEditAction: true,
      isOpenEdit: true,
    });
  };

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  displayEventDetails = (event) => {
    this.setState({ isOpen: true, details: event });
  };

  handleChangeStartDate = (date) => {
    let startTimeEventError = moment(date._d).isBefore(this.state.endHours);

    this.setState({
      startHours: date._d,
      startTimeEventError: startTimeEventError,
    });
  };
  handleChangeEndDate = (date) => {
    let endTimeEventError = moment(date._d).isAfter(this.state.startHours);

    this.setState({
      endHours: date._d,
      endTimeEventError: endTimeEventError,
    });
  };

  handleToggle() {
    this.setState({
      professorId: '',
      frequencyID: '',
      room: '',
      eventType: 'lesson',
      subjectId: '',
      profObject: {},
      isEditAction: false,
      modal: false,
      isOpenEdit: false,
      disponibleRooms: [],
      indisponibleprofessors: [],
      subject: '',
      professor: [],
    });
  }

  toggle = (tab) => {
    if (this.state.eventType !== tab) {
      this.setState({
        eventType: tab,
      });
    }
    if (tab === 'exam') {
      const frequency = this.state.examFrequency;
      this.setState({ frequency: frequency });
    } else {
      const frequency = this.state.allFrequency;
      this.setState({ frequency: frequency });
    }
  };

  handleChangeEventType = () => {
    if (this.state.EventGategorie == 1) {
      this.setState({
        eventType: 'lesson',
      });
    } else {
      this.setState({
        eventType: 'holidays',
      });
    }
  };

  handleChangeFields = (name) => (event) => {
    if (this.state.eventType === 'event') {
      this.setState({ professor: this.props.professors });
    }
    this.setState({
      [name]: event.target.value,
    });
    if (name === 'frequencyID') {
      let disponibleRooms = [];
      const startHours = this.state.startHours;
      const endHours = this.state.endHours;
      let establishementId = this.props.userProfile.establishment_id;
      let schoolYearId = this.props.userProfile.school_year_id;
      let frequency = event.target.value;
      let apiEndpoint = `/planning_events/check-planning/${establishementId}/${schoolYearId}/${startHours}/${endHours}/${frequency}?access_token=${localStorage.token}`;
      classService
        .get(apiEndpoint)
        .then((response) => {
          let data = response.data.checkData;
          disponibleRooms = this.props.rooms.filter(
            (element) => data.indisponibleRooms.indexOf(element.id) < 0
          );
          this.setState({
            disponibleRooms,
            indisponibleprofessors: data.indisponibleprofessors,
            professor: [],
            subject: '',
            professorId: '',
            room: '',
          });
        })
        .catch((err) => {});
    }
  };

  handleChangeFieldsProfessor = (name) => (event) => {
    if (event.target.value !== undefined) {
      var Professor = this.state.professor.filter(
        (element) => element.profile.professors[0].id == event.target.value
      );
      this.setState({
        [name]: event.target.value,
        profName: Professor[0].profile.user.name,
        profSurname: Professor[0].profile.user.surname,
      });
    }
  };
  handleChangeFieldsRoom = (name) => (event) => {
    var Room = this.props.rooms.filter((element) => element.id == event.target.value);
    this.setState({
      [name]: event.target.value,
      roomName: Room[0].name,
    });
  };

  handleChangeSubject = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    const course = this.state.courses.filter(
      (element) => element.fk_id_subject_v4 === event.target.value
    );

    if (!_.isEmpty(course[0].course)) {
      this.setState({
        subjectName: course[0].subject.name,
        subjectColor: course[0].subject.color,
      });
      const assignClassSubjectId = course[0].id;
      const profId = course[0].course[0].fk_id_professor;
      let professor = this.props.professors.filter((element) => {
        if (!_.isEmpty(element.profile.professors)) {
          let professorId = element.profile.professors[0].id;
          if (professorId == profId && this.state.indisponibleprofessors.indexOf(professorId) < 0)
            return element;
        }
      });

      this.setState({
        assignClassSubjectId: assignClassSubjectId,
        professor: professor,
        subjectId: event.target.value,
      });
    }

    if (this.state.eventType === 'exam') {
      this.setState({ professor: this.props.professors });
    }
  };

  handleChangeClasse = (name) => (event) => {
    this.props.dispatch(
      getEventsByEstabAndSchoolYear(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        event.target.value.id
      )
    );
    this.setState({ EventGategorie: event.target.value.id === 0 ? 0 : 1 });
    if (event.target.value.id && event.target.value.id !== 0) {
      let courseAssignment = this.props.courseAssignment.filter(
        (element) => element.fk_id_class_v4 === event.target.value.id
      );

      let subjects = _.map(courseAssignment, 'subject');
      let classe = this.state.establishmentClass.find(({ id }) => id === event.target.value.id);
      this.setState({
        courses: courseAssignment,
        subjects: subjects,
        classe: classe,
        courseAssignmentClass: courseAssignment,
      });
    } else {
      this.setState({
        classe: { id: 0 },
      });
    }
  };

  handleChange = (name) => (event) => {
    let classrooms = this.props.rooms.filter(
      ({ establishment_id }) => establishment_id === event.target.value
    );
    let establishmentClass = this.props.classes.filter(
      (classe) => classe.establishment_id === event.target.value
    );
    this.setState({
      [name]: event.target.value,
      establishmentClass: establishmentClass,
      events: [],
      classe: '',
      classrooms: classrooms,
    });
  };

  addLesson(slotInfo) {
    if (_.isEmpty(this.state.classe)) {
      this.setState({ show: true });
    } else {
      const startHours = moment(slotInfo.start);
      const endHours = moment(slotInfo.end);
      this.setState({
        modal: true,
        startHours: startHours,
        endHours: endHours,
        slotInfo: slotInfo,
        eventList: [],
        isOpen: false,
      });
    }
  }
  onConfirm = () => {
    this.setState({
      show: false,
    });
  };
  UNSAFE_componentWillMount() {
    const frequency = this.state.allFrequency;
    this.setState({ frequency: frequency });
    this.props.dispatch(
      getAssignementCourse(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      )
    );
    this.props.dispatch(getProfesseurByEstablishmentId(this.props.userProfile.establishment_id));
    this.props.dispatch(
      getRoomsByEstablshment(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      )
    );
    if (this.props.userProfile.role_id !== roleIdSuperAdmin) {
      let apiEndpoint =
        `/class_v4?access_token=${localStorage.token}&filter[where][and][0][fk_id_establishment]=` +
        this.props.userProfile.establishment_id +
        `&filter[where][and][1][fk_id_school_year]=` +
        this.props.userProfile.school_year_id;
      classService.get(apiEndpoint).then((response) => {
        if (response) {
          let activeClass = response.data.filter((classInfo) => classInfo.status);
          // activeClass.unshift(this.state.AllObject);
          this.setState({
            establishmentClass: activeClass,
          });
        }
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var data = {};
    const expr = this.state.eventType;

    switch (expr) {
      case 'lesson':
        data.start_time = moment(this.state.startHours).format();
        data.end_time = moment(this.state.endHours).format();
        data.title = this.state.eventName;
        data.frequency = this.state.frequencyID;
        data.event_type = this.state.eventType;
        data.status = true;
        data.fk_id_room = this.state.room;
        data.fk_id_prof = this.state.professorId;
        data.fk_id_assign_class_subject = this.state.assignClassSubjectId;
        data.fk_id_profile_creator = this.props.userProfile.id;
        data.repetition =
          this.state.frequencyID == 'weekly'
            ? [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
              ]
            : this.state.frequencyID == 'fortnightly'
            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
            : [0];

        break;
      case 'exam':
        data.start_time = moment(this.state.startHours).format();
        data.end_time = moment(this.state.endHours).format();
        data.title = this.state.eventName;
        data.frequency = this.state.frequencyID;
        data.event_type = this.state.eventType;
        data.status = true;
        data.fk_id_room = this.state.room;
        data.fk_id_prof = this.state.professorId;
        data.fk_id_assign_class_subject = this.state.assignClassSubjectId;
        data.fk_id_profile_creator = this.props.userProfile.id;
        data.repetition = [0];
        break;
      case 'event':
        data.start_time = moment(this.state.startHours).format();
        data.end_time = moment(this.state.endHours).format();
        data.title = this.state.eventName;
        data.frequency = this.state.frequencyID;
        data.event_type = this.state.eventType;
        data.status = true;
        data.fk_id_room = this.state.room;
        data.fk_id_prof = this.state.professorId;
        data.fk_id_assign_class_subject = this.state.courseAssignmentClass[0].id;
        data.fk_id_profile_creator = this.props.userProfile.id;
        data.repetition =
          this.state.frequencyID == 'weekly'
            ? [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
              ]
            : this.state.frequencyID == 'fortnightly'
            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
            : [0];
        break;
      case 'holidays':
        data.start_time = moment(this.state.startHours).format();
        data.end_time = moment(this.state.startHours).format();
        data.title = this.state.eventName;
        data.frequency = 'unique';
        data.event_type = this.state.eventType;
        data.status = true;
        data.fk_id_room = null;
        data.fk_id_prof = null;
        data.fk_id_assign_class_subject = this.props.courseAssignment[0].id;
        data.fk_id_profile_creator = this.props.userProfile.id;
        data.repetition = [0];
        break;
      case 'schoolVacation':
        data.start_time = moment(this.state.startHours).format();
        data.end_time = moment(this.state.endHours).format();
        data.title = this.state.eventName;
        data.frequency = 'unique';
        data.event_type = this.state.eventType;
        data.status = true;
        data.fk_id_room = null;
        data.fk_id_prof = null;
        data.fk_id_assign_class_subject = this.props.courseAssignment[0].id;
        data.fk_id_profile_creator = this.props.userProfile.id;
        data.repetition = [0];
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
    var dataSup = {};
    dataSup.className = this.state.className;
    dataSup.classId = this.state.classe.id;
    dataSup.creatorName = this.props.userProfile.user.name;
    dataSup.creatorSurname = this.props.userProfile.user.surname;

    dataSup.roomName = this.state.roomName;
    dataSup.subjectName = this.state.subjectName;
    dataSup.subjectColor = this.state.subjectColor;
    dataSup.profName = this.state.profName;
    dataSup.profSurname = this.state.profSurname;
    dataSup.subjectId = this.state.subjectId;

    dataSup.establishmentId = this.props.userProfile.establishment_id;
    dataSup.schoolYearId = this.props.userProfile.school_year_id;
    if (this.state.isEditAction === true) {
      //edit action

      data.id = this.state.idEvent;
      dataSup.eventsEdited = this.state.eventChecked;

      this.props.dispatch(editEvent(data, dataSup));
      this.setState({ isEditAction: false });
    } else {
      //add action
      this.props.dispatch(addEvent(data, dataSup));
    }

    this.setState({
      modal: false,
      professorId: '',
      frequencyID: '',
      room: '',
      subjectId: 0,
      className: '',
      startHours: '',
      endHours: '',
      dateEvent: '',
      frequencyOption: false,
      eventType: 'lesson',
      loader: false,
      eventName: '',
      subject: '',
      assignClassSubjectId: '',
      professor: [],
      roomName: '',
      subjectName: '',
      subjectColor: '',
      profName: '',
      profSurname: '',
      isOpenEdit: false,
      isOpenModalConfirm: false,
    });
  };

  handleRequestClose = () => {
    this.props.dispatch(handleEventRequestClose());
  };

  componentWillUnmount() {
    this.props.dispatch(removeEventList());
  }
  // edit(event) {
  //   let params = {
  //     startHours: moment(event.start).format("YYYY-MM-DD HH:mm:ss"),
  //     endHours: moment(event.end).format("YYYY-MM-DD HH:mm:ss"),
  //     establishmentId: this.props.userProfile.establishment_id,
  //     classe: this.state.classe.id,
  //   };

  //   let apiEndpoint = `/rooms/get-disposable-rooms/${JSON.stringify(
  //     params
  //   )}?access_token=${localStorage.token}`;
  //   classService
  //     .get(apiEndpoint)
  //     .then((response) => {
  //       this.setState({
  //         classrooms: response.data.rooms,
  //         establishment: this.props.userProfile.establishment_id,
  //       });
  //     })
  //     .catch((err) => {});

  //   this.setState({
  //     modalEdit: true,
  //     event: event,
  //   });
  // }
  // closeEdit() {
  //   this.setState({
  //     modalEdit: false,
  //   });
  // }

  render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        {this.state.alerteNotif ? (
          <UncontrolledAlert
            className={`alert-addon-card ${this.state.colorNotif} text-white shadow-lg`}
          >
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.state.messageAlerte} </span>
          </UncontrolledAlert>
        ) : (
          ''
        )}
        {/* {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger   text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
          ''
        )} */}
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
        <PlanningCalendar
          events={this.props.events}
          displayEventDetails={this.displayEventDetails}
          subjects={this.props.subjects}
          match={this.props.match}
          userProfile={this.props.userProfile}
          addLesson={this.addLesson}
          classes={this.props.classes}
          establishments={this.props.establishments}
          establishment={this.state.establishment}
          handleChangeClasse={this.handleChangeClasse}
          handleChange={this.handleChange}
          establishmentClass={this.state.establishmentClass}
          establishmentProfessor={this.state.establishmentProfessor}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
          appLang={this.props.settings}
          edit={this.edit}
        />
        {this.state.modal ? (
          <AddEvent
            handleChangeStartDate={this.handleChangeStartDate}
            handleChangeEndDate={this.handleChangeEndDate}
            modal={this.state.modal}
            startDateLesson={this.state.startHours}
            endDateLesson={this.state.endHours}
            handleSubmit={this.handleSubmit}
            handleChangeFields={this.handleChangeFields}
            handleChangeSubject={this.handleChangeSubject}
            handleChangeEventType={this.handleChangeEventType}
            toggle={this.toggle}
            handleToggle={this.handleToggle}
            values={this.state}
            rooms={this.state.disponibleRooms}
            language={this.props.settings.languageId}
            handleChangeFieldsProfessor={this.handleChangeFieldsProfessor}
            handleChangeFieldsRoom={this.handleChangeFieldsRoom}
          />
        ) : (
          ''
        )}

        {this.state.isOpen ? (
          <EventDetails
            values={this.state}
            handleCancel={this.handleCancel}
            language={this.props.settings.languageId}
            handleEdit={this.handleEdit}
            handleNotifMailConfirmation={this.handleNotifMailConfirmation}
            handleDeleteConfirmation={this.handleDeleteConfirmation}
          />
        ) : (
          ''
        )}

        {this.state.isOpenEdit ? (
          <EditEvent
            handleChangeStartDate={this.handleChangeStartDate}
            handleChangeEndDate={this.handleChangeEndDate}
            modal={this.state.isOpenEdit}
            handleEditConfirmation={this.handleEditConfirmation}
            handleChangeFields={this.handleChangeFields}
            handleChangeSubject={this.handleChangeSubject}
            toggle={this.toggle}
            handleToggle={this.handleToggle}
            values={this.state}
            rooms={this.props.rooms}
            language={this.props.settings.languageId}
            handleChangeFieldsProfessor={this.handleChangeFieldsProfessor}
            handleChangeFieldsRoom={this.handleChangeFieldsRoom}
            handleDateChange={this.handleDateChange}
            handleDateEndChange={this.handleDateEndChange}
            handleDateStartChange={this.handleDateStartChange}
          />
        ) : null}
        {this.state.isOpenModalConfirm ? (
          <ConfirmationEditEvent
            modal={this.state.isOpenModalConfirm}
            handleCancelEditEvent={this.handleCancelEditEvent}
            handleChangeEvent={this.handleChangeEvent}
            eventChecked={this.state.eventChecked}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          ''
        )}
        {this.state.isOpenModalDelete ? (
          <ConfirmationDeleteEvent
            item={this.state.deleteItem}
            modal={this.state.isOpenModalDelete}
            handleCancelNotif={this.handleCancelNotif}
            handleSubmitDelete={this.handleSubmitDelete}
            typeDeleteChecked={this.state.typeDeleteChecked}
            handleChangeTypeDelete={this.handleChangeTypeDelete}
          />
        ) : (
          ''
        )}
        {this.state.isOpenModalConfimationNotif ? (
          <ConfirmationNotifMail
            modal={this.state.isOpenModalConfimationNotif}
            handleCancelNotif={this.handleCancelNotif}
            handleSubmitNotif={this.handleSubmitNotif}
          />
        ) : (
          ''
        )}
        {this.props.errorStatus ? (
          <AlerteDelete modal={this.props.errorStatus} message={this.props.message} />
        ) : (
          ''
        )}
        <SweetAlert
          show={this.state.show}
          title={<IntlMessages id="components.planning.alert.message.add.event" />}
          onConfirm={this.onConfirm}
        ></SweetAlert>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.props.showMessageEvent}
          autoHideDuration={3000}
          onClose={this.handleRequestClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.alertMessage}</span>}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    classes: state.classes,
    establishments: state.establishment.remoteEstablishments,
    userProfile: state.auth.userProfile,
    rooms: state.rooms.rooms,
    events: state.planning.events,
    alertMessage: state.planning.alertMessage,
    showMessageEvent: state.planning.showMessageEvent,
    startTime: state.settings.startTime,
    endTime: state.settings.endTime,
    settings: state.settings.locale.languageId,
    courseAssignment: state.AssignementReducer.courseAssignment,
    professors: state.professor.professors,
    settings: state.settings.locale,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};

export default connect(mapStateToProps)(Planning);
