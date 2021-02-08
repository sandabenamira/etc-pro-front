import React from 'react';
import IconWithTextCard from '../../../CommonComponents/IconWithTextCard';
import IntlMessages from '../../../../../util/IntlMessages';
import HomeworkInProgress from './HomeworkInProgress';
import CardBox from '../../../../../components/CardBox/index';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import { connect } from 'react-redux';
import AddHomework from './AddHomework';
import { UncontrolledAlert } from 'reactstrap';
import { classService } from '../../../../../_services/class.service';
import HomeworkList from './HomeworkList';
import _ from 'lodash';
import { addNewHomework, getHomework } from '../../../../../actions/HomeworkAction';
import ArchivedHomework from './ArchivedHomework';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import TextField from '@material-ui/core/TextField';
import { roleIdAdmin, roleIdProfessor, roleIdStudent } from '../../../../../config/config';
import MenuItem from '@material-ui/core/MenuItem';
import SweetAlert from 'react-bootstrap-sweetalert';

class Homework extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenAddModal: false,
      openArchive: false,
      nameFile: '',
      HomeworkTypes: [
        {
          label: <IntlMessages id="toDo.book.exercise" />,
          value: 'book',
          id: 1,
        },
        {
          label: <IntlMessages id="toDo.series.exercise" />,
          value: 'serie',
          id: 2,
        },
        {
          label: <IntlMessages id="toDo.other.exercise" />,
          value: 'other',
          id: 3,
        },
      ],

      HomeworkStatus: [
        {
          label: <IntlMessages id="status.classe.virtual.programmé" />,
          value: 'programed',
          id: 1,
        },
        {
          label: <IntlMessages id="status.classe.virtual.progrés" />,
          value: 'progress',
          id: 2,
        },
        {
          label: <IntlMessages id="status.classe.virtual.términé" />,
          value: 'finished',
          id: 3,
        },
      ],

      homeworkType: '',
      subjectId: null,
      subjectColor: '',
      description: '',
      courseUrl: '',
      homeworkFiles: [],
      nameFiles: [],
      publicationDate: new Date(),
      postTime: new Date(),
      classes: [],
      subjects: [],
      eventChecked: '',
      classesId: [],
      errorClass: false,
      correctionDate: new Date(),
      renderingDate: new Date(),
      isEmptylistClass: false,
      classesData: [],
      subjectName: '',
      classId: null,
      classList: [],
      homeworks: [],
      statusHomework: null,
      homeworkClass: [],
      idType: '',
      homeworksListForStudent: [],
      classStudent: null,
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeHomeworkType = this.handleChangeHomeworkType.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.attachFile = this.attachFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.handleChangePostTime = this.handleChangePostTime.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeClassList = this.handleChangeClassList.bind(this);
    this.addNewHomework = this.addNewHomework.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.openArchive = this.openArchive.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleChangeFilterType = this.handleChangeFilterType.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleChangeFilterStatus = this.handleChangeFilterStatus.bind(this);
  }

  handleChangeFilterStatus = (name) => (event) => {
    this.setState({ idType: '' });
    let homeworksList = [];
    if (this.state.classId !== null) {
      homeworksList = this.state.homeworkClass;
    } else {
      homeworksList = this.props.homeworks;
    }

    if (event.target.value === 'all') {
      this.setState({
        [name]: event.target.value,
        homeworks: homeworksList,
      });
    } else {
      let homeworks = homeworksList.filter((element) => element.status === event.target.value);
      this.setState({
        [name]: event.target.value,
        homeworks,
        homeworksListForStudent: homeworks,
      });
    }
  };

  handleDate() {
    let homeworksList = [];
    if (this.state.classId !== null) {
      homeworksList = this.state.homeworkClass;
    } else {
      homeworksList = this.props.homeworks;
    }

    let homeworks = [];
    homeworksList.forEach((element) => {
      let item = {
        ...element,
        date: new Date(element.homework.publication_date),
      };
      homeworks.push(item);
    });
    const sortedHomework = homeworks.slice().sort((a, b) => b.date - a.date);
    this.setState({
      homeworks: sortedHomework,
    });
  }

  handleChangeFilterType = (name) => (event) => {
    let homeworksList = [];
    if (this.state.classId !== null) {
      homeworksList = this.state.homeworkClass;
    } else {
      homeworksList = this.props.homeworks;
    }
    if (event.target.value === 'all') {
      this.setState({
        [name]: event.target.value,
        homeworks: homeworksList,
      });
    } else {
      let homeworks = homeworksList.filter(
        (element) => element.homework.homework_type === event.target.value
      );
      this.setState({ [name]: event.target.value, homeworks });
    }
  };

  handleChangeFilter = (name) => (event) => {
    if (event.target.value === 'all') {
      this.setState({
        homeworks: this.props.homeworks,
      });
    } else {
      let homeworks = this.props.homeworks.filter(
        (element) => element.classId === event.target.value
      );
      this.setState({ homeworks, homeworkClass: homeworks });
    }

    this.setState({
      [name]: event.target.value,
      statusHomework: '',
      idType: '',
    });
  };

  cancelModal() {
    this.setState({
      isOpenAddModal: false,
      nameFile: '',
      homeworkType: '',
      subjectId: null,
      subjectColor: '',
      description: '',
      courseUrl: '',
      homeworkFiles: [],
      nameFiles: [],
      publicationDate: new Date(),
      postTime: new Date(),
      classes: [],
      eventChecked: '',
      classesId: [],
      errorClass: false,
      correctionDate: new Date(),
      renderingDate: new Date(),
      isEmptylistClass: false,
      classesData: [],
      subjectName: '',
    });
  }

  addNewHomework(e) {
    e.preventDefault();
    if (this.state.subjectId === null) {
      this.setState({ errorClass: true });
    } else if (_.isEmpty(this.state.classesId)) {
      this.setState({ isEmptylistClass: true });
    } else {
      let dataHomework = {};
      dataHomework.title = this.state.nameFile;
      dataHomework.homeworkType = this.state.homeworkType;
      dataHomework.subjectId = this.state.subjectId;
      dataHomework.subjectColor = this.state.subjectColor;
      dataHomework.classesId = this.state.classesId;
      dataHomework.publicationDate = this.state.publicationDate;
      dataHomework.publicationTime = this.state.postTime;
      dataHomework.courseUrl = this.state.courseUrl;
      dataHomework.description = this.state.description;
      dataHomework.correctionDate = this.state.correctionDate;
      dataHomework.renderingDate = this.state.renderingDate;
      dataHomework.subjectName = this.state.subjectName;
      this.props.dispatch(
        addNewHomework(dataHomework, this.state.homeworkFiles, this.state.classesData)
      );
      this.cancelModal();
    }
  }

  handleChangeClassList = (selectedOption) => {
    if (selectedOption != null) {
      let classesId = _.map(selectedOption, 'id');
      this.setState({
        classesId,
        isEmptylistClass: false,
        classesData: selectedOption,
      });
    } else {
      this.setState({ classesId: [] });
    }
  };

  handleChangeDate = (name) => (date) => {
    this.setState({ [name]: date });
  };

  handleChangePostTime = (time) => {
    this.setState({ postTime: time._d });
  };

  deleteFile(filename) {
    let nameFiles = this.state.nameFiles.filter((element) => element != filename);

    let homeworkFiles = this.state.homeworkFiles.filter((element) => element.name != filename);

    this.setState({ nameFiles, homeworkFiles });
  }

  attachFile(e) {
    var oldFiles = this.state.homeworkFiles;
    var files = Object.values(e.target.files);
    var nameFiles = this.state.nameFiles;
    if (files !== undefined && this.state.nameFiles.length + files.length < 6) {
      files.map((element) => {
        nameFiles.push(element.name);
        oldFiles.push(element);
      });
      this.setState({ homeworkFiles: oldFiles, nameFiles });
    } else {
      this.setState({
        messageAlerte: 'Vous avez dépasser 5 fichiers',
        alerteStatus: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: '', alerteStatus: false });
      }, 4000);
    }
  }

  handleChangeSubject = (selectedOption) => {
    this.setState({
      subjectId: selectedOption.id,
      subjectColor: selectedOption.color,
      subjectName: selectedOption.label,
      errorClass: false,
    });
    if (this.props.userProfile.role_id === roleIdAdmin) {
      let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_subject_v4]=${selectedOption.value}&filter[include]=class&filter[include]=course`;
      classService.get(apiEndpoint).then((response) => {
        if (response) {
          let classesSubjects = response.data.filter((element) => element.status);
          let newList = [];
          classesSubjects.map((element) => {
            let object = {};
            if (!_.isEmpty(element.course)) {
              object.label = element.class.name;
              object.id = element.course[0].id;
              object.value = element.course[0].id;

              newList.push(object);
            }
          });
          this.setState({ classes: newList });
        }
      });
    } else {
      let apiEndpoint = `/assignment_class_subjects/${selectedOption.value}?access_token=${localStorage.token}&filter[include]=class&filter[include]=course`;
      classService.get(apiEndpoint).then((response) => {
        if (response) {
          let element = response.data;
          if (element.status) {
            let object = {};
            object.label = element.class.name;
            object.id = element.course[0].id;
            object.value = element.course[0].id;
            this.setState({ classes: [object] });
          }
        }
      });
    }
  };

  handleChangeHomeworkType = (selectedOption) => {
    this.setState({ homeworkType: selectedOption.value });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  openAddModal() {
    this.setState({ isOpenAddModal: !this.state.isOpenAddModal });
  }
  openArchive() {
    this.setState((previousState) => ({
      openArchive: !previousState.openArchive,
    }));
  }

  UNSAFE_componentWillMount() {
    if (this.props.userProfile.role_id === roleIdAdmin) {
      let subjects = createListSubject(this.props.subjects);
      this.setState({ subjects, classList: this.props.classSettings });
    } else if (this.props.userProfile.role_id === roleIdProfessor) {
      const professorId = this.props.userProfile.user.profiles[0].professors[0].id;
      let apiEndpoint = `/course_v4?access_token=${localStorage.token}&filter[where][fk_id_professor]=${professorId}&filter[include][assignmentClassSubject]=subject&filter[include][assignmentClassSubject]=class`;
      classService.get(apiEndpoint).then((response) => {
        if (response) {
          let subjects = [];
          let classes = [];
          response.data.map((element) => {
            let object = {};
            let classItem = {};
            object.label = element.assignmentClassSubject.subject.name;
            object.id = element.assignmentClassSubject.subject.id;
            object.value = element.assignmentClassSubject.id;
            subjects.push(object);
            classItem = element.assignmentClassSubject.class;
            classes.push(classItem);
          });
          this.setState({ subjects, classList: classes });
        }
      });
    } else if (this.props.userProfile.role_id === roleIdStudent) {
      let classStudent = this.props.userProfile.user.profiles[0].students[0].inscription[0]
        .fk_id_class_v4;
      this.setState({ classStudent });
      if (classStudent === null) {
        this.setState({ show: true });
      }
      let subjects = createListSubject(this.props.subjects);
      this.setState({ subjects });
    } else {
      let subjects = createListSubject(this.props.subjects);
      this.setState({ subjects });
    }
    this.props.dispatch(
      getHomework(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        this.props.userProfile.id,
        this.props.userProfile.role_id
      )
    );
  }
  componentDidUpdate(previouProps) {
    if (previouProps.subjects !== this.props.subjects) {
      if (this.props.userProfile.role_id !== roleIdProfessor) {
        let subjects = createListSubject(this.props.subjects);
        this.setState({ subjects });
      }
    }
    if (previouProps.classSettings !== this.props.classSettings) {
      if (this.props.userProfile.role_id === roleIdAdmin) {
        this.setState({ classList: this.props.classSettings });
      }
    }
    if (previouProps.homeworks !== this.props.homeworks) {
      this.setState({ homeworks: this.props.homeworks });
    }
  }
  onConfirm = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    let detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../../../assets/images/dashboard/teams-icon.png'),

        // title: this.props.virtualClasses.length,
        subTitle: 'Nombre de Collaborateurs',
      },
      {
        cardColor: 'secondary',
        imageIcon: require('../../../../../assets/images/dashboard/tasks-icon.png'),
        // title: this.state.prog,
        subTitle: <IntlMessages id={`homework.file`} />,
      },
      {
        cardColor: 'info',
        imageIcon: require('../../../../../assets/images/dashboard/project-icon.png'),
        // title: this.state.encours,
        subTitle: <IntlMessages id={`homework.uncorrected`} />,
      },
      {
        cardColor: 'success',
        imageIcon: require('../../../../../assets/images/dashboard/files-icon.png'),
        // title: this.state.encours,
        subTitle: <IntlMessages id={`homework.educational.files`} />,
      },
    ];
    return (
      <div className="app-wrapper col-lg-12 col-md-12">
        <div className="d-flex flex-column mb-3">
          <div className="row col-lg-12 col-md- col-sm-12  ">
            {detailCards.map((data, index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <IconWithTextCard data={data} />
              </div>
            ))}
          </div>
          <div>
            {this.state.alerteStatus && (
              <UncontrolledAlert className="alert-addon-card bg-danger bg-success text-white shadow-lg">
                <span className="icon-addon alert-addon">
                  <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                </span>
                <span className="d-inline-block"> {this.state.messageAlerte} </span>
              </UncontrolledAlert>
            )}

            {this.props.errorStatus && (
              <UncontrolledAlert className="alert-addon-card bg-danger   text-white shadow-lg">
                <span className="icon-addon alert-addon">
                  <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                </span>
                <span className="d-inline-block"> {this.props.message} </span>
              </UncontrolledAlert>
            )}
            {this.props.successStatus && (
              <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
                <span className="icon-addon alert-addon">
                  <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                </span>
                <span className="d-inline-block"> {this.props.message} </span>
              </UncontrolledAlert>
            )}
          </div>
          <div className="row">
            <div className="col-12 col-md-auto ">
              <CardBox styleName="row">
                <HomeworkInProgress />
              </CardBox>
            </div>

            <div className="col ">
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'add-homework',
                      permissionList: this.props.userPermission,
                    }}
                    yes={() => (
                      <>
                        <CardBox styleName="col-lg-12 ">
                          <div className="row">
                            <div>
                              <Fab
                                size="small"
                                color="secondary"
                                aria-label="Add"
                                onClick={this.openAddModal.bind(this)}
                              >
                                {this.state.isOpenAddModal ? <RemoveSharpIcon /> : <AddIcon />}
                              </Fab>
                            </div>
                            <div className="p-2" style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
                              <IntlMessages id="modal.addToDo" />
                            </div>

                            <div className="pl-5 ">
                              <Fab
                                size="small"
                                aria-label="Add"
                                style={{
                                  backgroundColor: '#ffbb33',
                                  color: '#ffffff',
                                }}
                                onClick={this.openArchive}
                              >
                                <DeleteOutlineIcon />
                              </Fab>
                            </div>
                            <div className="p-2" style={{ fontFamily: 'Roboto', fontSize: '17px' }}>
                              <IntlMessages id="icon.archives" />
                            </div>
                          </div>
                        </CardBox>

                        {this.state.isOpenAddModal && (
                          <CardBox styleName="col-lg-12">
                            <AddHomework
                              values={this.state}
                              handleChange={this.handleChange}
                              handleChangeHomeworkType={this.handleChangeHomeworkType}
                              subjects={this.state.subjects}
                              handleChangeSubject={this.handleChangeSubject}
                              attachFile={this.attachFile}
                              deleteFile={this.deleteFile}
                              handleChangePostTime={this.handleChangePostTime}
                              handleChangeDate={this.handleChangeDate}
                              handleChangeClassList={this.handleChangeClassList}
                              addNewHomework={this.addNewHomework}
                              cancelModal={this.cancelModal}
                            />
                          </CardBox>
                        )}
                      </>
                    )}
                  />
                )}
              </RoleContext.Consumer>

              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-homework',
                      permissionList: this.props.userPermission,
                    }}
                    yes={() => (
                      <>
                        {this.state.openArchive ? (
                          <div>
                            <ArchivedHomework homeworks={this.props.archivedHomework} />
                          </div>
                        ) : (
                          ''
                        )}
                      </>
                    )}
                  />
                )}
              </RoleContext.Consumer>
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'get-homework',
                      permissionList: this.props.userPermission,
                    }}
                    yes={() => (
                      <>
                        {!this.state.openArchive ? (
                          <div>
                            <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
                              <Can
                                role={role}
                                perform="homework-filter-class"
                                yes={() => (
                                  <>
                                    <div className="p-2 s bd-highlight col-lg-2 col-md-6 col-sm-5">
                                      <TextField
                                        id="idClasse"
                                        name="idClasse"
                                        select
                                        value={this.state.classId}
                                        onChange={this.handleChangeFilter('classId')}
                                        SelectProps={{}}
                                        label={<IntlMessages id={`components.note.class`} />}
                                        InputProps={{ disableUnderline: true }}
                                        margin="normal"
                                        fullWidth
                                      >
                                        <MenuItem key={0} value="all">
                                          {<IntlMessages id={`userStuppDisplay.all`} />}
                                        </MenuItem>
                                        {this.state.classList.map((option) => (
                                          <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </div>

                                    <div className="pt-5 bd-highlight">|</div>
                                  </>
                                )}
                              />
                              <div className="p-2 bd-highlight col-lg-2 col-md-6 col-sm-6">
                                <TextField
                                  id="statusHomework"
                                  name="statusHomework"
                                  select
                                  value={this.state.statusHomework}
                                  onChange={this.handleChangeFilterStatus('statusHomework')}
                                  SelectProps={{}}
                                  label={<IntlMessages id={`components.todo.etat`} />}
                                  InputProps={{ disableUnderline: true }}
                                  margin="normal"
                                  fullWidth
                                >
                                  <MenuItem key={0} value="all">
                                    {' '}
                                    {<IntlMessages id={`userStuppDisplay.all`} />}
                                  </MenuItem>
                                  {this.state.HomeworkStatus.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="pt-5 bd-highlight">|</div>
                              <div className="p-2 bd-highlight col-lg-2 col-md-6 col-sm-6">
                                <TextField
                                  id="idType"
                                  name="idType"
                                  select
                                  value={this.state.idType || ''}
                                  onChange={this.handleChangeFilterType('idType')}
                                  SelectProps={{}}
                                  label={<IntlMessages id={`components.todo.type`} />}
                                  InputProps={{ disableUnderline: true }}
                                  margin="normal"
                                  fullWidth
                                >
                                  <MenuItem key={0} value="all">
                                    {' '}
                                    {<IntlMessages id={`userStuppDisplay.all`} />}
                                  </MenuItem>
                                  {this.state.HomeworkTypes.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="pt-5 bd-highlight">|</div>
                              <div className="pt-5  bd-highlight col-lg-2 col-md-6 col-sm-6">
                                <h5 onClick={this.handleDate}>
                                  <IntlMessages id="complaint.date" />
                                </h5>
                              </div>
                            </div>

                            <HomeworkList
                              homeworks={this.state.homeworks}
                              subjects={this.state.subjects}
                            />
                          </div>
                        ) : (
                          ''
                        )}
                      </>
                    )}
                  />
                )}
              </RoleContext.Consumer>
            </div>
          </div>
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
    subjects: state.subject.subjects,
    homeworks: state.HomeworkReducer.homeworks,
    archivedHomework: state.HomeworkReducer.archivedHomework,
    classSettings: state.ClassSettingsReducer.classSettings,
    userPermission: state.PermissionReducer.userPermission,
  };
};
export default connect(mapStateToProps)(Homework);

function createListSubject(subjects) {
  let newList = subjects.map((element) => {
    let object = {};
    object.label = element.name;
    object.id = element.id;
    object.value = element.id;
    object.color = element.color;
    return object;
  });
  return newList;
}
