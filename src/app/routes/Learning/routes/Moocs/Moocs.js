import React from 'react';
import CardBox from '../../../../../components/CardBox/index';
import AddMoocs from './AddMoocs';
import { connect } from 'react-redux';
import MoocsList from './MoocsList';
import ArchiveMoocs from './ArchiveMoocs';
import { UncontrolledAlert } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';
import Fab from '@material-ui/core/Fab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import moment from 'moment';
import { addMoocs } from '../../../../../actions/MoocsActions';
import { getMoocs } from '../../../../../actions/MoocsActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconWithTextCard from '../../../FinancialManagement/routes/ServiceAllocation/ServiceAllocationComp/IconWithTextCard';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import _ from 'lodash';
import { roleIdProfessor, roleIdAdmin } from '../../../../../config/config';
import axios from 'axios';
import baseUrl from '../../../../../config/config';
import Loader from 'react-loader-spinner';
import LoaderModal from './LoaderModal';
import { element } from 'prop-types';

class Moocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      messageAlerte: '',
      moocsText: '',
      moocsFile: null,
      topicMoocs: '',
      idCourse: null,
      idClasses: null,
      prerequisite: '',
      educationalGoals: '',
      SessionMoocs: '',
      dateOfCreation: new Date(),
      durationMoocs: '',
      courseAssignment: [],
      roomClasses: [],
      filterLevelId: '',
      filterClassId: '',
      filterAssignmentId: '',
      filterClasses: [],
      filterCourseAssignment: [],
      listMoocs: [],
      assignmentClassSubjectProf: [],
      openArchive: false,
      itemSubject: {},
      subjectId: '',
      subjectName: '',
      moocsAssignment: [],
      assignmentRefresh: [],
      levelProf: [],
      classProf: [],
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.openArchive = this.openArchive.bind(this);
  }
  openArchive() {
    this.setState((previousState) => ({
      openArchive: !previousState.openArchive,
    }));
  }

  UNSAFE_componentWillMount() {
    if (this.props.userProfile.role_id === roleIdProfessor) {
      let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
      axios.get(apiEndpoint).then((res) => {
        let data = _.map(res.data, 'course');
        let subjects = [];
        let assignmentClassSubjectProf = [];
        let levelProf = [];
        let classProf = [];

        data[0].forEach((element) => {
          if (
            element.assignmentClassSubject.class.fk_id_school_year ==
            this.props.userProfile.school_year_id
          ) {
            classProf.push(element.assignmentClassSubject.class);

            subjects.push(element.assignmentClassSubject.subject);
            assignmentClassSubjectProf.push(element.assignmentClassSubject);
            let level = this.props.levels.find(
              (levelItem) =>
                levelItem.id ==
                element.assignmentClassSubject.class.fk_id_level_v4
            );
            if (level != undefined) {
              levelProf.push(level);
            }
          }
        });
        let levelFiltredByID = _.uniqBy(levelProf, 'id');

        let classFiltredByID = _.uniqBy(classProf, 'id');
        let subjectFiltred = _.uniqBy(subjects, 'id');
        this.setState({
          subjects: subjectFiltred,
          assignmentClassSubjectProf,
          levelProf: levelFiltredByID,
          classProf: classFiltredByID,
        });
      });
    } else {
      this.setState({
        subjects: this.props.subjects,
      });
    }
    this.setState({
      listMoocs: this.props.listMoocs,
    });
  }
  
  componentDidUpdate(prevProps) {
    if (
      prevProps.userProfile.school_year_id !==
      this.props.userProfile.school_year_id
    ) {
      this.props.dispatch(
        getMoocs(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.props.userProfile.role_id,
          this.props.userProfile.id
        )
      );
    }
    if (
      prevProps.subjects !== this.props.subjects &&
      this.props.userProfile.role_id === roleIdAdmin
    ) {
      this.setState({
        subjects: this.props.subjects,
      });
    }
    if (prevProps.listMoocs !== this.props.listMoocs) {
      this.setState({
        listMoocs: this.props.listMoocs,
      });
    }
  }

  openAddModal() {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let userReresh = {
      profileId: this.props.userProfile.id,
      name: this.props.userProfile.user.name,
      surname: this.props.userProfile.user.surname,
    };
    let data = {
      topicMoocs: this.state.topicMoocs,
      idAssignement: this.state.roomClasses,
      prerequisite: this.state.prerequisite,
      educationalGoals: this.state.educationalGoals,
      SessionMoocs: this.state.SessionMoocs,
      dateOfCreation: moment(this.state.dateOfCreation).format(),
      durationMoocs: this.state.durationMoocs,
      status: true,
      moocsFile: this.state.moocsFile,
      posteur: this.props.userProfile.id,
      assignmentRefresh: this.state.assignmentRefresh,
      userReresh,
    };
    this.props.dispatch(addMoocs(data));
    this.openAddModal();
    this.setState({
      topicMoocs: '',
      roomClasses: [],
      prerequisite: '',
      educationalGoals: '',
      SessionMoocs: '',
      moocsFile: '',
      posteur: '',
      moocsText: '',
      moocsAssignment: [],
      assignmentRefresh: [],
      itemSubject: {},
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeSubject = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
    let courseAssignment = [];
    if (this.props.userProfile.role_id === roleIdProfessor) {
      courseAssignment = this.state.assignmentClassSubjectProf.filter(
        (element) => element.fk_id_subject_v4 === obj.subjectId
      );
    } else {
      courseAssignment = this.props.courseAssignment.filter(
        (element) => element.fk_id_subject_v4 === obj.subjectId
      );
    }
    this.setState({
      itemSubject: obj,
      subjectId: obj.subjectId,
      subjectName: obj.subjectName,
      courseAssignment: courseAssignment,
      moocsAssignment: [],
      roomClasses: [],
      assignmentRefresh: [],
    });
  };
  handleChangeClass = (name) => (event) => {
    this.setState({ moocsAssignment: event.target.value });

    let roomClasses = event.target.value.map((element) => element.id);
    let assignmentRefresh = event.target.value.map((element) => {
      let data = {
        assignementId: element.id,
        classId: element.class.id,
        className: element.class.name,
        subjectName: element.subject.name,
        subjectId: element.subject.id,
      };
      return data;
    });
    this.setState({ roomClasses, assignmentRefresh });
  };
  onDrop = (e) => {
    if (e.target.files[0] !== undefined) {
      let file = e.target.files[0];
      this.setState({ moocsFile: file, moocsText: file.name });
    } else {
      this.setState({
        messageAlerte: "Vous n'avez pas choisir un vidéo",
        alerteFiltre: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: '', alerteFiltre: false });
      }, 4000);
    }
  };
  handleChangeFilter = (name) => (event) => {
    if (name === 'filterLevelId') {
      let filterClasses = [];
      if (this.props.userProfile.role_id === roleIdProfessor) {
        filterClasses = this.state.classProf.filter(
          (element) => element.fk_id_level_v4 == event.target.value
        );
      } else {
        filterClasses = this.props.ClassSettings.filter(
          (element) => element.fk_id_level_v4 == event.target.value
        );
      }

      this.setState({
        [name]: event.target.value,
        filterClasses,
        filterCourseAssignment: [],
        listMoocs: this.props.listMoocs,
        filterClassId: '',
        filterAssignmentId: '',
      });
    } else if (name === 'filterClassId') {
      let filterCourseAssignment = [];
      if (this.props.userProfile.role_id === roleIdProfessor) {
        filterCourseAssignment = this.state.assignmentClassSubjectProf.filter(
          (element) => element.fk_id_class_v4 == event.target.value
        );
      } else {
        filterCourseAssignment = this.props.courseAssignment.filter(
          (element) => element.fk_id_class_v4 == event.target.value
        );
      }

      let moocsAssignCourseFilter = [];
      let filterMoocs = this.props.listMoocs.filter((mooc) => {
        moocsAssignCourseFilter = mooc.moocsAssignCourse.filter(
          (element) => element.classId == event.target.value
        );
        if (moocsAssignCourseFilter.length > 0) {
          return mooc;
        }
      });

      this.setState({
        [name]: event.target.value,
        filterCourseAssignment,
        listMoocs: filterMoocs,
        filterAssignmentId: '',
      });
    } else {
      if (event.target.value == 0) {
        let moocsAssignCourseFilter = [];
        let filterMoocs = this.props.listMoocs.filter((mooc) => {
          moocsAssignCourseFilter = mooc.moocsAssignCourse.filter(
            (element) => element.classId == this.state.filterClassId
          );
          if (moocsAssignCourseFilter.length > 0) {
            return mooc;
          }
        });
        this.setState({ [name]: event.target.value, listMoocs: filterMoocs });
      } else {
        let moocsAssignCourseFilter = [];
        let filterMoocs = this.props.listMoocs.filter((mooc) => {
          moocsAssignCourseFilter = mooc.moocsAssignCourse.filter(
            (element) => element.assignementId == event.target.value
          );
          if (moocsAssignCourseFilter.length > 0) {
            return mooc;
          }
        });
        this.setState({ [name]: event.target.value, listMoocs: filterMoocs });
      }
    }
  };

  render() {
    var MoocsByMonth = 0;
    this.props.listMoocs.map((element) => {
      var d = new Date();
      var n = d.getMonth();
      var check = moment(element.dateOfCreation, 'YYYY/MM/DD');
      var month = check.format('M');

      if (month == n + 1) {
        MoocsByMonth = MoocsByMonth + 1;
      }
    });

    let detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/project-icon.png'),
        title: this.props.listMoocs.length,
        subTitle: <IntlMessages id={`moocs.total`} />,
      },
      {
        cardColor: 'secondary',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/tasks-icon.png'),
        title: MoocsByMonth,
        subTitle: <IntlMessages id={`moocs.month`} />,
      },
      {
        cardColor: 'info',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/teams-icon.png'),
        title: '1111',
        subTitle: <IntlMessages id={`moocs.vue`} />,
      },
      {
        cardColor: 'warning',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/files-icon.png'),
        title: '1111',
        subTitle: <IntlMessages id={`moocs.likes`} />,
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
        <div className="row col-lg-12 col-md-12 ">
          {detailCards.map((data, index) => (
            <div
              key={index}
              className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12"
            >
              <IconWithTextCard data={data} />
            </div>
          ))}
        </div>

        <div className="mb-3">
          {this.props.errorStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-danger   text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
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
          {this.state.alerteFiltre ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {' '}
                {this.state.messageAlerte}{' '}
              </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          <div className=" bd-highlight " style={{ width: '99%' }}>
            <CardBox styleName="col-lg-12 col-md-12">
              <AddMoocs
                openAddModal={this.openAddModal}
                handleChange={this.handleChange}
                handleChangeSubject={this.handleChangeSubject}
                handleChangeClass={this.handleChangeClass}
                handleSubmit={this.handleSubmit}
                onDrop={this.onDrop}
                values={this.state}
                courseAssignment={this.state.courseAssignment}
                subjects={this.state.subjects}
              />
            </CardBox>
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
                    <div
                      className="row col-lg-12 col-md-12"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingBottom: '3%',
                      }}
                    >
                      <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                        <TextField
                          id="classLevel"
                          name="classLevel"
                          select
                          value={this.state.filterLevelId}
                          onChange={this.handleChangeFilter('filterLevelId')}
                          SelectProps={{}}
                          label={<IntlMessages id={`components.note.niveau`} />}
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {this.props.userProfile.role_id === roleIdProfessor
                            ? this.state.levelProf.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))
                            : this.props.levels.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                        </TextField>
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                        <TextField
                          id="idClasse"
                          name="idClasse"
                          select
                          value={this.state.filterClassId}
                          onChange={this.handleChangeFilter('filterClassId')}
                          SelectProps={{}}
                          label={<IntlMessages id={`components.note.class`} />}
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )}
                        </TextField>
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                        <TextField
                          id="idSection"
                          name="idSection"
                          select
                          value={this.state.filterAssignmentId}
                          onChange={this.handleChangeFilter(
                            'filterAssignmentId'
                          )}
                          SelectProps={{}}
                          label={
                            <IntlMessages id={`components.note.subject`} />
                          }
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {/* {this.state.filterCourseAssignment.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.subject.name}
                            </MenuItem>
                          ))} */}
                          {this.state.filterCourseAssignment.length > 0 ? (
                            <MenuItem key={0} value={0}>
                              all
                            </MenuItem>
                          ) : (
                            ''
                          )}
                          {this.state.filterCourseAssignment.length > 0 ? (
                            this.state.filterCourseAssignment.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.subject.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de matiére
                            </MenuItem>
                          )}
                        </TextField>
                      </div>
                    </div>
                  </div>
                )}
              />
            )}
          </RoleContext.Consumer>

          <div
            className="col-lg-12 col-md-12 bd-highlight"
            style={{
              paddingRight: 'auto',
              paddingLeft: '2%',
            }}
          >
            <MoocsList
              listMoocs={this.state.listMoocs}
              handleChangeSubject={this.handleChangeSubject}
              handleChangeClass={this.handleChangeClass}
              handleSubmit={this.handleSubmit}
              onDrop={this.onDrop}
              values={this.state}
              courseAssignment={this.props.courseAssignment}
              assignmentClassSubjectProf={this.state.assignmentClassSubjectProf}
              subjects={this.state.subjects}
            />
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
                        <ArchiveMoocs
                          listMoocsArchived={this.props.listMoocsArchived}
                        />
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
        {this.props.moocsLoading ? <LoaderModal /> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    userProfile: state.auth.userProfile,
    listMoocs: state.MoocsReducer.remoteMoocs,
    moocsLoading: state.MoocsReducer.moocsLoading,
    subjects: state.subject.subjects,
    courseAssignment: state.AssignementReducer.courseAssignment,
    listMoocsArchived: state.MoocsReducer.archivedMoocs,
    levels: state.levelsReducer.levels,
    ClassSettings: state.ClassSettingsReducer.classSettings,
  };
};
export default connect(mapStateToProps)(Moocs);
