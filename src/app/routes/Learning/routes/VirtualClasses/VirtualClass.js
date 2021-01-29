import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import CardBox from '../../../../../components/CardBox/index';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import AddVirtualClass from './AddVirtualClass';
import _ from 'lodash';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import {
  roleIdProfessor,
  roleIdAdmin,
  roleIdParent,
  roleIdStudent,
} from '../../../../../config/config';
import { fetchProfessorBySubject } from '../../../../../actions/ToDo';
import VirtualClassList from './VirtualClassList';
import ArchiveVirtualClass from './ArchiveVirtualClass';
import JitsiComponent from './JitsiComponent';
import { addClassVirtual, getClassesVirtual } from '../../../../../actions/VirtualClassAction';
import axios from 'axios';
import baseUrl from '../../../../../config/config';
import Fab from '@material-ui/core/Fab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { privateStatus, publicStatus, allStatus } from '../../../../../config/config';
import moment from 'moment';
import VirtualClassListItems from './VirtualClassListItems';
import IconWithTextCard from '../../../FinancialManagement/routes/ServiceAllocation/ServiceAllocationComp/IconWithTextCard';

class VirtualClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dateVirtualClass: new Date(),
      virtualClassName: '',
      classUrl: '',
      password: '',
      description: '',
      startTimeClass: new Date(Date.now() + 60000),
      endTimeClass: new Date(Date.now() + 120000),
      virtualClassStatus: '',
      accessibility: false,
      levels: [],
      sectionsDisable: true,
      sections: [],
      subjects: [],
      classes: [],
      professors: [],
      classId: null,
      courseId: null,
      subjectId: null,
      levelId: null,
      professorId: null,
      class_password: '',
      call: false,
      filterValues: 0,
      roleUserId: 1,
      assignmentClassSubject: [],
      isPublish: false,
      endTimeClassError: true,
      startTimeClassError: true,
      profName: '',
      profSurname: '',
      subjectName: '',
      classeName: '',
      subjectColor: '',
      itemClass: '',
      itemProfessor: '',
      itemSubject: '',
      classItem: {},
      filterStatus: 'all',
      openArchive: false,
      alerteDate: false,
      prog: 0,
      encours: 0,
      terminé: 0,
    };

    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.addVirtualClass = this.addVirtualClass.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.openArchive = this.openArchive.bind(this);
  }

  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeProfessor = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
    this.setState({
      professorId: obj.profId,
      profName: obj.profName,
      profSurname: obj.profSurname,
      itemProfessor: event.target.value,
    });
    let apiEndpoint = `${baseUrl.baseUrl}/course_v4?access_token=${localStorage.token}&filter[where][fk_id_professor]=${obj.profId}&filter[include][assignmentClassSubject][subject]`;
    axios.get(apiEndpoint).then((res) => {
      let subjects = [];
      res.data.forEach((element) => {
        if (element.assignmentClassSubject.fk_id_class_v4 === this.state.classId) {
          let newObj = {
            ...element.assignmentClassSubject,
            courseId: element.id,
          };

          // subjects.push(element.assignmentClassSubject);
          subjects.push(newObj);
        }
      });
      this.setState({ subjects });
    });
  };

  handleStartTimeChange = (time) => {
    let startTimeClassError;

    if (moment(this.state.dateVirtualClass).format('LL') == moment(new Date()).format('LL')) {
      startTimeClassError =
        moment(time._d).isBefore(this.state.endTimeClass) &&
        moment(time._d).isAfter(this.state.dateVirtualClass);
    } else {
      startTimeClassError = moment(time._d).isBefore(this.state.endTimeClass);
    }

    let endTimeClassError = moment(this.state.endTimeClass).isAfter(time._d);
    this.setState({
      startTimeClass: time._d,
      startTimeClassError: startTimeClassError,
      endTimeClassError: endTimeClassError,
    });
  };

  handleEndTimeChange = (time) => {
    let endTimeClassError = moment(time._d).isAfter(this.state.startTimeClass);
    let startTimeClassError;

    if (moment(this.state.dateVirtualClass).format('LL') == moment(new Date()).format('LL')) {
      startTimeClassError =
        moment(this.state.startTimeClass).isBefore(time._d) &&
        moment(this.state.startTimeClass).isAfter(this.state.dateVirtualClass);
    } else {
      startTimeClassError = moment(this.state.startTimeClass).isBefore(time._d);
    }

    this.setState({
      endTimeClass: time._d,
      endTimeClassError: endTimeClassError,
      startTimeClassError: startTimeClassError,
    });
  };

  handleChangeDate = (date) => {
    let startTimeClassError;

    if (moment(date._d).format('LL') == moment(new Date()).format('LL')) {
      startTimeClassError =
        moment(this.state.startTimeClass).isBefore(this.state.endTimeClass) &&
        moment(this.state.startTimeClass).isAfter(date._d);
    } else {
      startTimeClassError = moment(this.state.startTimeClass).isBefore(this.state.endTimeClass);
    }
    this.setState({
      dateVirtualClass: date._d,
      startTimeClassError: startTimeClassError,
    });
  };

  handleChangeSubject = (name) => (event) => {
    let obj = JSON.parse(event.target.value);

    this.setState({
      itemSubject: event.target.value,
      subjectId: obj.subjectId,
      subjectName: obj.subjectName,
      subjectColor: obj.subjectColor,
      courseId: obj.courseId,
    });
  };

  handleChangeClass = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    let obj = JSON.parse(event.target.value);
    this.setState({
      classId: obj.classId,
      classeName: obj.classeName,
    });
    if (this.props.userProfile.role_id === roleIdProfessor) {
      let subjects = this.state.assignmentClassSubject.filter(
        (element) => element.class.id === obj.classId
      );
      this.setState({ subjects });
    } else {
      let apiEndpoint = `${baseUrl.baseUrl}/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_class_v4]=${obj.classId}&filter[include][course][professor][profile][user]`;
      axios.get(apiEndpoint).then((res) => {
        let courses = [];
        res.data.forEach((element) => {
          courses.push(element.course);
        });
        let newCoursesList = _.flatten(courses);
        let professorsFiltredByID = _.uniqBy(newCoursesList, 'fk_id_professor');
        this.setState({ professors: professorsFiltredByID, subjects: [] });
      });
    }
  };

  addVirtualClass = (e) => {
    e.preventDefault();

    if (this.state.endTimeClassError && this.state.startTimeClassError) {
      let dateClass = moment(this.state.dateVirtualClass).format('LL');
      let endHourClass = moment(this.state.endTimeClass).format('HH:mm');
      let startHourClass = moment(this.state.startTimeClass).format('HH:mm');
      let timedebutAdd = Date.parse(dateClass + ' ' + startHourClass) / 60000;
      let timefinAdd = Date.parse(dateClass + ' ' + endHourClass) / 60000;

      const result = this.props.virtualClasses.filter((item) => {
        let dateClassItem = moment(item.date_virtual_class).format('LL');
        let endHourClassItem = moment(item.end_time_class).format('HH:mm');
        let startHourClassItem = moment(item.start_time_class).format('HH:mm');

        let timedebutItem = Date.parse(dateClassItem + ' ' + startHourClassItem) / 60000;
        let timefinItem = Date.parse(dateClassItem + ' ' + endHourClassItem) / 60000;

        return (
          item.classeId == this.state.classId &&
          dateClassItem == dateClass &&
          ((timedebutAdd <= timedebutItem && timefinItem <= timefinAdd) ||
            (timedebutItem <= timedebutAdd && timedebutAdd <= timefinItem) ||
            (timedebutItem <= timefinAdd && timefinAdd <= timefinItem))
        );
      });

      if (result.length > 0) {
        this.setState({ alerteDate: true });
        setTimeout(() => {
          this.setState({ alerteDate: false });
        }, 3000);
      } else {
        this.setState({
          call: true,
        });
        let data = {
          virtualClassName: this.state.virtualClassName,
          accessibility: this.state.accessibility,
          classId: this.state.classId,
          subjectId: this.state.subjectId,
          professorId: this.state.professorId,
          dateVirtualClass: this.state.dateVirtualClass,
          startTimeClass: this.state.startTimeClass,
          endTimeClass: this.state.endTimeClass,
          classUrl: this.state.classUrl,
          password: this.state.password,
          publish: this.state.isPublish,
          profName: this.state.profName,
          profSurname: this.state.profSurname,
          subjectName: this.state.subjectName,
          classeName: this.state.classeName,
          subjectColor: this.state.subjectColor,
          courseId: this.state.courseId,
          description: this.state.description,
        };
        this.props.dispatch(addClassVirtual(data));
        this.setState({
          call: false,
          isOpen: false,
          virtualClassName: '',
          accessibility: '',
          classId: null,
          subjectId: null,
          itemClass: {},
          itemSubject: {},
          itemProfessor: {},
          dateVirtualClass: new Date(),
          startTimeClass: new Date(),
          endTimeClass: new Date(),
          classUrl: '',
          password: '',
          description: '',
        });
        if (this.props.userProfile.role_id === roleIdAdmin) {
          this.setState({ professorId: null });
        }
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.virtualClasses !== this.props.virtualClasses) {
      let prog = 0;
      let encours = 0;
      let terminé = 0;

      let VirtualClassListFinal = this.props.virtualClasses.map((elementItem) => {
        const sys = Date.parse(new Date()) / 60000;
        const start =
          Date.parse(
            elementItem.date_virtual_class.slice(0, 10) +
              ' ' +
              moment(elementItem.start_time_class).format('HH:mm')
          ) / 60000;
        const end =
          Date.parse(
            elementItem.date_virtual_class.slice(0, 10) +
              ' ' +
              moment(elementItem.end_time_class).format('HH:mm')
          ) / 60000;

        if (start > sys && end > sys) {
          terminé = ++terminé;
          this.setState({ terminé: terminé });
        } else if (start < sys && end > sys) {
          encours = ++encours;
          this.setState({ encours: encours });
        } else if (start < sys && end < sys) {
          prog = ++prog;
          this.setState({ prog: prog });
        } else if (this.props.filterStatus == 'all') {
          return elementItem;
        }
      });
    }
    if (prevProps.ClassSettings !== this.props.ClassSettings) {
      if (this.props.userProfile.role_id === roleIdProfessor) {
      } else {
        this.setState({ classes: this.props.ClassSettings });
      }
    }
    if (prevProps.userProfile.school_year_id !== this.props.userProfile.school_year_id) {
      this.props.dispatch(
        getClassesVirtual(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.props.userProfile.role_id,
          this.props.userProfile.id
        )
      );

      this.setState({
        subjects: [],
        professors: [],
        itemClass: '',
        itemSubject: '',
        itemProfessor: '',
      });
      if (this.props.userProfile.role_id === roleIdProfessor) {
        let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
        axios.get(apiEndpoint).then((res) => {
          let data = _.map(res.data, 'course');

          let classes = [];
          let assignmentClassSubject = [];
          data[0].forEach((element) => {
            if (
              element.assignmentClassSubject.class.fk_id_school_year ==
              this.props.userProfile.school_year_id
            ) {
              let newObj = {
                ...element.assignmentClassSubject,
                courseId: element.id,
              };

              classes.push(element.assignmentClassSubject.class);
              // assignmentClassSubject.push(element.assignmentClassSubject);
              assignmentClassSubject.push(newObj);
            }
          });
          this.setState({
            classes,
            professorId: res.data[0].id,
            assignmentClassSubject,
            subjects: [],
            professors: [],
            itemClass: '',
            itemSubject: '',
            itemProfessor: '',
          });
        });
        let apiEndpoint1 = `${baseUrl.baseUrl}/users?access_token=${localStorage.token}&filter[where][id]=${this.props.userProfile.user_id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
        axios.get(apiEndpoint1).then((res) => {
          this.setState({
            profName: res.data.name,
            profSurname: res.data.surname,
          });
        });
      }
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(
      getClassesVirtual(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        this.props.userProfile.role_id,
        this.props.userProfile.id
      )
    );

    if (this.props.userProfile.role_id === roleIdProfessor) {
      let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
      axios.get(apiEndpoint).then((res) => {
        let data = _.map(res.data, 'course');

        let classes = [];
        let assignmentClassSubject = [];
        data[0].forEach((element) => {
          if (
            element.assignmentClassSubject.class.fk_id_school_year ==
            this.props.userProfile.school_year_id
          ) {
            let newObj = {
              ...element.assignmentClassSubject,
              courseId: element.id,
            };
            classes.push(element.assignmentClassSubject.class);
            assignmentClassSubject.push(newObj);

            // assignmentClassSubject.push(element.assignmentClassSubject);
          }
        });
        this.setState({
          classes,
          professorId: res.data[0].id,
          assignmentClassSubject,
        });
      });
      let apiEndpoint1 = `${baseUrl.baseUrl}/users?access_token=${localStorage.token}&filter[where][id]=${this.props.userProfile.user_id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
      axios.get(apiEndpoint1).then((res) => {
        this.setState({
          profName: res.data.name,
          profSurname: res.data.surname,
        });
      });
    } else {
      this.props.dispatch(fetchProfessorBySubject(this.props.userProfile.establishment_id));
      this.setState({ classes: this.props.ClassSettings });
    }
    if (this.props.userProfile.role_id == 3) {
      this.setState({
        roleUserId: this.props.userProfile.user.profiles[0].professors[0].id,
      });
    }
  }

  openAddModal() {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
    }));
  }
  openArchive() {
    this.setState((previousState) => ({
      openArchive: !previousState.openArchive,
    }));
  }

  render() {
    let detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/project-icon.png'),
        title: this.props.virtualClasses.length,
        subTitle: <IntlMessages id={`virtual.class.total`} />,
      },
      {
        cardColor: 'secondary',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/tasks-icon.png'),
        title: this.state.prog,
        subTitle: <IntlMessages id={`virtual.class.terminée`} />,
      },
      {
        cardColor: 'info',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/teams-icon.png'),
        title: this.state.encours,
        subTitle: <IntlMessages id={`virtual.class.encours`} />,
      },
      {
        cardColor: 'warning',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/files-icon.png'),
        title: this.state.terminé,
        subTitle: <IntlMessages id={`virtual.class.programmé`} />,
      },
    ];

    return (
      <div
        className="app-wrapper col-lg-12 col-md-12"
        style={{
          marginLeft: '2%',
          marginRight: 'auto',
        }}
      >
        <div className="row col-lg-12 col-md-12">
          {detailCards.map((data, index) => (
            <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <IconWithTextCard data={data} />
            </div>
          ))}
        </div>
        <div className="  mb-3">
          <div className="p-2 bd-highlight" style={{ marginLeft: '4%' }}>
            <h1>
              <b>
                <IntlMessages id="sidebar.components.liste.classes.virtuelles" />
              </b>
            </h1>
          </div>
          <div className="d-flex flex-row bd-highlight mb-3" style={{ marginLeft: '4%' }}>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: 'all' })}>
                <IntlMessages id="service.filter.with.all" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>

            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: 'progress' })}>
                <IntlMessages id="status.classe.virtual.progrés" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: 'upcoming' })}>
                {' '}
                <IntlMessages id="status.classe.virtual.programmé" />
              </h5>
            </div>

            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: 'past' })}>
                <IntlMessages id="status.classe.virtual.términé" />
              </h5>
            </div>
          </div>

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

          <div className=" bd-highlight" style={{ width: '100%' }}>
            <CardBox styleName="col-lg-12 col-md-12 ">
              <AddVirtualClass
                values={this.state}
                handleArchive={this.handleArchive}
                openAddModal={this.openAddModal}
                handleChangeDate={this.handleChangeDate}
                handleChange={this.handleChange}
                handleStartTimeChange={this.handleStartTimeChange}
                handleEndTimeChange={this.handleEndTimeChange}
                addVirtualClass={this.addVirtualClass}
                handleChangeClass={this.handleChangeClass}
                handleChangeProfessor={this.handleChangeProfessor}
                handleChangeSubject={this.handleChangeSubject}
              />
            </CardBox>
          </div>
          <div>
            <div>
              <div
                className="  col-lg-12 col-md-12 bd-highlight"
                style={{
                  paddingRight: 'auto',
                  paddingLeft: '2%',
                }}
              >
                <VirtualClassList
                  virtualClasses={this.props.virtualClasses}
                  subjectList={this.state.subjectList}
                  editClassShowModal={this.editClassShowModal}
                  filterStatus={this.state.filterStatus}
                  roleUserId={this.state.roleUserId}
                  classes={this.props.ClassSettings}
                  assignmentClassSubject={this.state.assignmentClassSubject}
                />
              </div>
            </div>
          </div>

          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="add-service"
                yes={() => (
                  <div
                    className="col-lg-12 col-md-12 bd-highlight"
                    style={{
                      paddingRight: 'auto',
                      paddingLeft: '2%',
                    }}
                  >
                    <div>
                      <div className="d-flex justify-content-start align-items-center ">
                        <h1>
                          <b>
                            {' '}
                            <IntlMessages id="service.button.archive" />{' '}
                          </b>
                        </h1>{' '}
                        &nbsp;&nbsp;&nbsp;
                        <Fab
                          size="small"
                          color="secondary"
                          aria-label="Add"
                          onClick={this.openArchive}
                        >
                          <DeleteOutlineIcon />
                        </Fab>
                      </div>
                      <br />

                      {this.state.openArchive ? (
                        <div>
                          <ArchiveVirtualClass
                            virtualClassesArchived={this.props.archivedVirtualClass}
                          ></ArchiveVirtualClass>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                )}
              />
            )}
          </RoleContext.Consumer>
        </div>
        {this.state.call == true ? <JitsiComponent values={this.state} /> : <div></div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    establishmentData: state.subject.establishmentData,
    classes: state.ClassSettingsReducer.classSettings,
    subjectsProfessors: state.toDo.subjectsProfessors,
    virtualClasses: state.classVirtualReducer.remoteClassVirtual,
    ClassSettings: state.ClassSettingsReducer.classSettings,
    archivedVirtualClass: state.classVirtualReducer.archivedVirtualClass,
  };
};

export default connect(mapStateToProps)(VirtualClass);
