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
import VirtualClassList from './VirtualClassList';
import ArchiveVirtualClass from './ArchiveVirtualClass';
import { addClassVirtual } from '../../../../../actions/VirtualClassAction';
import axios from 'axios';
import baseUrl from '../../../../../config/config';
import Fab from '@material-ui/core/Fab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import moment from 'moment';
import IconWithTextCard from '../../../FinancialManagement/routes/ServiceAllocation/ServiceAllocationComp/IconWithTextCard';
import SweetAlert from 'react-bootstrap-sweetalert';

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
      accessibility: false,
      subjects: [],
      classes: [],
      professors: [],
      classId: null,
      courseId: null,
      subjectId: null,
      professorId: null,
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
      classStudent: null,
      show: false,
      classSelected: [],
      courseAssignment: [],
      professorsFiltred: [],
      profSelected: [],
      coursesIds: [],
      isOpenAlertParent: false,
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

  handleCancel() {
    this.setState({
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
      classSelected: [],
      courseAssignment: [],
      professorsFiltred: [],
      profSelected: [],
      professorId: null,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeProfessor = (event) => {
    let profSelected = event.target.value;
    this.setState({ profSelected });
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

    let courseAssignment = [];
    if (this.props.userProfile.role_id === roleIdProfessor) {
      this.state.classes.map((element) => {
        if (element.assignmentClassSubject.fk_id_subject_v4 === obj.subjectId) {
          let object = {
            courseId: element.id,
            ...element.assignmentClassSubject,
          };
          courseAssignment.push(object);
        }
      });
    } else {
      this.props.courseAssignment.forEach((element) => {
        if (element.fk_id_subject_v4 === obj.subjectId && !_.isEmpty(element.course)) {
          courseAssignment.push(element);
        }
      });
    }
    this.setState({
      itemSubject: event.target.value,
      subjectId: obj.subjectId,
      subjectName: obj.subjectName,
      subjectColor: obj.subjectColor,
      courseAssignment: courseAssignment,
      classSelected: [],
    });
  };

  handleChangeClass = (event) => {
    let classSelected = event.target.value;
    this.setState({ classSelected });
    let coursesIds = [];
    if (this.props.userProfile.role_id === roleIdProfessor) {
      classSelected.forEach((element) => {
        let object = {
          id: element.courseId,
        };
        coursesIds.push(object);
      });
      this.setState({ coursesIds });
    } else {
      let professorsIds = [];
      classSelected.forEach((element) => {
        if (!_.isEmpty(element.course)) {
          var object = {};
          var courseId = {};
          object.id = element.course[0].fk_id_professor;
          courseId.id = element.course[0].id;
          coursesIds.push(courseId);
          professorsIds.push(object);
        }
      });
      let professorsUniqIds = _.uniqBy(professorsIds, 'id');
      let professorsFiltred = [];
      professorsUniqIds.forEach((professor) => {
        this.props.professors.forEach((element) => {
          if (professor.id === element.profId) {
            professorsFiltred.push(element);
          }
        });
      });
      this.setState({ professorsFiltred, coursesIds });
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
        let data = {
          subjectName: this.state.subjectName,
          subjectColor: this.state.subjectColor,
          subjectId: this.state.subjectId,
          classSelected: this.state.classSelected,
          coursesIds: this.state.coursesIds,
        };
        let dateVirtuelClass = {
          date_virtual_class: this.state.dateVirtualClass,
          status: true,
          virtual_class_name: this.state.virtualClassName,
          class_url: this.state.classUrl,
          password: this.state.password,
          start_time_class: this.state.startTimeClass,
          end_time_class: this.state.endTimeClass,
          virtual_class_status: 'programée',
          accessibility: this.state.accessibility,
          publish: this.state.isPublish,
          description: this.state.description,
        };

        if (this.props.userProfile.role_id === roleIdAdmin) {
          data.professorId = this.state.profSelected[0].profId;
          data.profName = this.state.profSelected[0].name;
          data.profSurname = this.state.profSelected[0].surname;
        } else {
          data.professorId = this.props.userProfile.user.profiles[0].professors[0].id;
          data.profName = this.props.userProfile.user.name;
          data.profSurname = this.props.userProfile.user.surname;
        }
        this.props.dispatch(addClassVirtual(data, dateVirtuelClass));
        this.handleCancel();
      }
    } else {
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.subjects !== this.props.subjects &&
      this.props.userProfile.role_id === roleIdAdmin
    ) {
      this.setState({
        subjects: this.props.subjects,
      });
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.userProfile.role_id === roleIdProfessor) {
      let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
      axios.get(apiEndpoint).then((res) => {
        let data = _.map(res.data, 'course');
        let subjects = [];
        data[0].forEach((element) => {
          if (
            element.assignmentClassSubject.class.fk_id_school_year ==
            this.props.userProfile.school_year_id
          ) {
            subjects.push(element.assignmentClassSubject.subject);
          }
        });
        let newListSubjects = _.uniqBy(subjects, 'id');
        this.setState({
          classes: data[0],
          subjects: newListSubjects,
        });
      });
    } else if (this.props.userProfile.role_id === roleIdStudent) {
      let classStudent = this.props.userProfile.user.profiles[0].students[0].inscription[0]
        .fk_id_class_v4;
      this.setState({ classStudent });
      if (classStudent === null) {
        this.setState({ show: true });
      }
    } else if (this.props.userProfile.role_id === roleIdParent) {
      let classStudents = this.props.userProfile.user.profiles[0].parents[0].student_parents;
      if (_.isEmpty(classStudents)) {
        this.setState({ isOpenAlertParent: true });
      }
    } else if (this.props.userProfile.role_id === roleIdAdmin) {
      this.setState({ subjects: this.props.subjects });
    }
  }
  onConfirm = () => {
    this.setState({
      show: false,
    });
  };
  onConfirmParent = () => {
    this.setState({
      isOpenAlertParent: false,
    });
  };

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
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="user-permission"
                data={{
                  permission: 'get-online-course',
                  permissionList: this.props.userPermission,
                }}
                yes={() => (
                  <>
                    <div className="p-2 bd-highlight" style={{ marginLeft: '4%' }}>
                      <h1>
                        <b>Liste des formations en ligne </b>
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
                  </>
                )}
              />
            )}
          </RoleContext.Consumer>
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
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="user-permission"
                data={{
                  permission: 'add-online-course',
                  permissionList: this.props.userPermission,
                }}
                yes={() => (
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
                        handleCancel={this.handleCancel.bind(this)}
                      />
                    </CardBox>
                  </div>
                )}
              />
            )}
          </RoleContext.Consumer>
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

        {this.props.userProfile.role_id === roleIdStudent && this.state.classStudent === null ? (
          <SweetAlert
            show={this.state.show}
            title={<IntlMessages id="alert.affect.student" />}
            onConfirm={this.onConfirm}
          ></SweetAlert>
        ) : (
          ''
        )}
        {this.state.isOpenAlertParent && (
          <SweetAlert
            show={this.state.isOpenAlertParent}
            title={<IntlMessages id="alert.affect.student.to.parent" />}
            onConfirm={this.onConfirmParent}
          ></SweetAlert>
        )}
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
    virtualClasses: state.classVirtualReducer.remoteClassVirtual,
    ClassSettings: state.ClassSettingsReducer.classSettings,
    archivedVirtualClass: state.classVirtualReducer.archivedVirtualClass,
    subjects: state.subject.subjects,
    courseAssignment: state.AssignementReducer.courseAssignment,
    professors: state.usersReducer.professors,
    userPermission: state.PermissionReducer.userPermission,
  };
};

export default connect(mapStateToProps)(VirtualClass);
