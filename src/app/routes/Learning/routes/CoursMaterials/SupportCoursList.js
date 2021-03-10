import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from '../../../../../util/IntlMessages';
import CardBox from '../../../../../components/CardBox/index';
import Fab from '@material-ui/core/Fab';
import AddSupportCours from './AddSupportCours';
import FolderIcon from '@material-ui/icons/Folder';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SupportCoursListItems from './SupportCoursListItems';
import { UncontrolledAlert } from 'reactstrap';
import { addMaterialCourse, getMaterialCourse, editMaterialCourse, deleteMaterialCourse } from '../../../../../actions/MaterialCourseAction';
import moment from 'moment';
import axios from 'axios';
import baseUrl from '../../../../../config/config';
import _ from 'lodash';
import { roleIdProfessor, roleIdAdmin } from '../../../../../config/config';
import EditSupportCours from './EditSupportCours';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArchiveSupportCours from './ArchiveSupportCours';
import LoaderModal from './LoaderModal';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
class SupportCoursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEdit: false,
      courseName: '',
      courseUrl: '',
      comment: '',
      publicationDate: new Date(),
      postTime: new Date(),
      MoocsIds: [],
      virtualClassIds: [],
      toDoClassIds: [],
      materialCoursefilesDelete: [],
      materialCoursefiles: [],
      nameFiles: [],
      courseAssignmentList: [],
      assignmentIds: [],
      classIndex: '',
      nameError: false,
      itemEdit: {},
      classEditName: '',
      classEditId: '',
      defaultMoocs: [],
      defaultVirtualClasses: [],
      messageAlerte: '',
      alerteStatus: false,
      defaultClass: [],
      openArchive: false,
      deleteIsopen: false,
      deleteItem: {},
    };
    this.openArchive = this.openArchive.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangePublicationDate = this.handleChangePublicationDate.bind(this);
    this.handleChangePostTime = this.handleChangePostTime.bind(this);
    this.addNewMaterialCourse = this.addNewMaterialCourse.bind(this);
    this.handleChangeMoocsIds = this.handleChangeMoocsIds.bind(this);
    this.handleChangeVirtualClassIds = this.handleChangeVirtualClassIds.bind(this);
    this.attachFile = this.attachFile.bind(this);
    this.editShowModal = this.editShowModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.editMaterialCourse = this.editMaterialCourse.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
  }
  handleSubmitDelete = () => {
    this.props.dispatch(deleteMaterialCourse(this.state.deleteItem));
    this.setState({
      deleteIsopen: false,
      deleteItem: {},
    });
  };
  handleCancelDelete = () => {
    this.setState({
      deleteIsopen: false,
      deleteItem: {},
    });
  };
  handleDelete = (item) => {
    this.setState({ deleteIsopen: true, deleteItem: item });
  };
  openArchive() {
    this.setState((previousState) => ({
      openArchive: !previousState.openArchive,
    }));
  }
  componentDidUpdate(prevProps, previousState) {
    if (prevProps.listMoocs !== this.props.listMoocs) {
      var optionsListMoocs = this.props.listMoocs.map((element) => {
        var object = {};
        object.label = element.moocsTopic;
        object.id = element.id;
        object.value = element.moocsTopic;
        return object;
      });
      this.setState({
        optionsListMoocs,
      });
    }
    if (prevProps.virtualClasses !== this.props.virtualClasses) {
      var optionsListVirtualClasses = this.props.virtualClasses.map((element) => {
        var object = {};
        object.label = element.virtual_class_name;
        object.id = element.id;
        object.value = element.virtual_class_name;
        return object;
      });
      this.setState({
        optionsListVirtualClasses,
      });
    }
    if (prevProps.userProfile !== this.props.userProfile) {
      this.props.dispatch(
        getMaterialCourse(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id,
          this.props.userProfile.role_id,
          this.props.userProfile.id,
          this.props.match.params.idAssignement
        )
      );
      if (this.props.userProfile.role_id === roleIdProfessor) {
        let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
        axios.get(apiEndpoint).then((res) => {
          let data = _.map(res.data, 'course');

          let courseAssignmentList = [];

          data[0].forEach((element) => {
            if (
              element.assignmentClassSubject.class.fk_id_school_year === this.props.userProfile.school_year_id &&
              element.assignmentClassSubject.subject.id === this.props.match.params.subjectId
            ) {
              var object = {};
              object.label = element.assignmentClassSubject.class.name;
              object.id = element.assignmentClassSubject.id;
              object.value = element.assignmentClassSubject.id;
              courseAssignmentList.push(object);
            }
          });
          this.setState({ courseAssignmentList });
        });
      } else if (this.props.userProfile.role_id === roleIdAdmin) {
        let courseAssignmentList = [];
        courseAssignmentList = this.props.courseAssignment.map((element) => {
          var object = {};
          object.label = element.class.name;
          object.id = element.id;
          object.value = element.id;
          return object;
        });
        this.setState({ courseAssignmentList });
      }
    }
  }
  UNSAFE_componentWillMount() {
    if (this.props.userProfile.role_id === roleIdProfessor) {
      let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
      axios.get(apiEndpoint).then((res) => {
        let data = _.map(res.data, 'course');

        let courseAssignmentList = [];

        data[0].forEach((element) => {
          if (
            element.assignmentClassSubject.class.fk_id_school_year === this.props.userProfile.school_year_id &&
            element.assignmentClassSubject.subject.id === this.props.match.params.subjectId
          ) {
            var object = {};
            object.label = element.assignmentClassSubject.class.name;
            object.id = element.assignmentClassSubject.id;
            object.value = element.assignmentClassSubject.id;
            courseAssignmentList.push(object);
          }
        });
        this.setState({ courseAssignmentList });
      });
    } else if (this.props.userProfile.role_id === roleIdAdmin) {
      let courseAssignmentList = [];
      courseAssignmentList = this.props.courseAssignment.map((element) => {
        var object = {};
        object.label = element.class.name;
        object.id = element.id;
        object.value = element.id;
        return object;
      });

      this.setState({ courseAssignmentList });
    }
    var optionsListMoocs = this.props.listMoocs.map((element) => {
      var object = {};
      object.label = element.moocsTopic;
      object.id = element.id;
      object.value = element.moocsTopic;
      return object;
    });
    var optionsListVirtualClasses = this.props.virtualClasses.map((element) => {
      var object = {};
      object.label = element.virtual_class_name;
      object.id = element.id;
      object.value = element.virtual_class_name;
      return object;
    });
    this.setState({ optionsListMoocs, optionsListVirtualClasses });
  }
  openAddModal() {
    let classIndex = this.state.courseAssignmentList.findIndex((element) => element.id === this.props.match.params.idAssignement);
    let assignmentIds = [parseInt(this.props.match.params.idAssignement, 10)];
    this.setState({
      classIndex,
      assignmentIds,
    });

    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }
  editShowModal = (item) => {
    let defaultClass = [];
    defaultClass = this.state.courseAssignmentList.filter((element) => item.assignClassSubjectId.indexOf(element.id) >= 0);

    let defaultMoocs = [];
    let MoocsIds = [];
    item.moocsList.map((element) => {
      var object = {};
      object.label = element.moocs_topic;
      object.id = element.id;
      object.value = element.moocs_topic;
      defaultMoocs.push(object);
      MoocsIds.push(element.id);
    });

    let virtualClassIds = [];
    let defaultVirtualClasses = [];
    item.virtualClassList.map((element) => {
      var object = {};
      object.label = element.virtual_class_name;
      object.id = element.id;
      object.value = element.virtual_class_name;
      defaultVirtualClasses.push(object);
      virtualClassIds.push(element.id);
    });
    var nameFiles = item.fileList.map((element) => {
      return element.url_course_materials_files.slice(59);
    });
    let assignmentIds = item.assignClassSubjectId;
    let publicationDate = moment(item.creationDate);
    let postTime = moment(item.creationDate);
    this.setState({
      defaultClass,
      itemEdit: item,
      open: false,
      openEdit: true,
      defaultMoocs,
      nameFiles,
      materialCoursefiles: [],
      defaultVirtualClasses,
      courseName: item.name,
      courseUrl: item.urlCourse,
      comment: item.comment,
      classEditName: item.classes[0].name,
      classEditId: item.classes[0].id,
      publicationDate,
      postTime,
      assignmentIds,
      MoocsIds,
      virtualClassIds,
    });
  };
  handleChange = (name) => (event) => {
    if (name === 'courseName') {
      let nameError = false;
      nameError = this.props.listSupportCourse.filter((element) => element.name === event.target.value.trim()).length > 0;

      this.setState({ [name]: event.target.value, nameError: nameError });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };
  handleChangePublicationDate = (date) => {
    this.setState({ publicationDate: date });
  };
  handleChangePostTime = (time) => {
    this.setState({ postTime: time._d });
  };

  handleChangeClass = (selectedOption) => {
    if (selectedOption != null) {
      let assignmentIds = [];
      selectedOption.map((element) => {
        assignmentIds.push(element.id);
      });
      this.setState({
        assignmentIds,
      });
    } else {
      this.setState({
        assignmentIds: [],
      });
    }
  };

  handleChangeMoocsIds = (selectedOption) => {
    if (selectedOption != null) {
      let MoocsIds = [];
      selectedOption.map((element) => {
        MoocsIds.push(element.id);
      });
      this.setState({
        MoocsIds,
      });
    } else {
      this.setState({
        MoocsIds: [],
      });
    }
  };
  handleChangeVirtualClassIds = (selectedOption) => {
    if (selectedOption != null) {
      let virtualClassIds = [];
      selectedOption.map((element) => {
        virtualClassIds.push(element.id);
      });
      this.setState({
        virtualClassIds,
      });
    } else {
      this.setState({
        virtualClassIds: [],
      });
    }
  };
  deleteFile(filename) {
    let nameFiles = this.state.nameFiles.filter((element) => element != filename);
    let deletedFiles = [];
    if (this.state.itemEdit.fileList != undefined) {
      this.state.itemEdit.fileList.map((element) => {
        if (element.url_course_materials_files.slice(59) === filename) {
          deletedFiles.push(element.id);
        }
      });
    }

    let materialCoursefiles = this.state.materialCoursefiles.filter((element) => element.name != filename);
    this.state.materialCoursefilesDelete.map((element) => {
      deletedFiles.push(element);
    });
    this.setState({ nameFiles, materialCoursefilesDelete: deletedFiles, materialCoursefiles });
  }
  attachFile(e) {
    var oldFiles = this.state.materialCoursefiles;
    var files = Object.values(e.target.files);
    var nameFiles = this.state.nameFiles;
    if (files !== undefined && this.state.nameFiles.length + files.length < 6) {
      files.map((element) => {
        nameFiles.push(element.name);
        oldFiles.push(element);
      });
      this.setState({ materialCoursefiles: oldFiles, nameFiles });
    } else {
      this.setState({
        messageAlerte: 'vous avez dépasser 5 fichiers',
        alerteStatus: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: '', alerteStatus: false });
      }, 4000);
    }
  }
  editMaterialCourse(event) {
    event.preventDefault();

    let idCreatorProfile = this.props.userProfile.user.id;
    let dateFormat = moment(this.state.publicationDate).format('YYYY-MM-DD');
    let timeFormat = moment(this.state.postTime).format('HH:mm:ssZ');
    let TimeDate = dateFormat + 'T' + timeFormat;
    let fk_id_professor = parseInt(this.props.match.params.idProf, 10) === 0 ? null : parseInt(this.props.match.params.idProf, 10);

    let data = {
      id: this.state.itemEdit.id,
      name: this.state.courseName,
      url_course: this.state.courseUrl,
      status: true,
      creation_date: TimeDate,
      comment: this.state.comment,
      fk_id_assign_class_subject: this.state.assignmentIds,
      fk_id_creator_profile: idCreatorProfile,
      files: this.state.materialCoursefiles,
      filesDeleted: this.state.materialCoursefilesDelete,
      moocsAttached: this.state.MoocsIds,
      virtuelClassAttached: this.state.virtualClassIds,
      toDoAttached: 0,
      fk_id_professor: fk_id_professor,
    };
    this.props.dispatch(
      editMaterialCourse(
        data,
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        this.props.userProfile.role_id,
        this.props.userProfile.id,
        this.props.match.params.idAssignement
      )
    );
    this.setState({
      open: false,
      openEdit: false,
      courseName: '',
      courseUrl: '',
      comment: '',
      publicationDate: new Date(),
      postTime: new Date(),
      MoocsIds: [],
      virtualClassIds: [],
      toDoClassIds: [],
      materialCoursefiles: [],
      materialCoursefilesDelete: [],
      nameFiles: [],
      assignmentIds: [],
      classIndex: '',
      nameError: false,
      defaultClass: [],
    });
  }
  addNewMaterialCourse(event) {
    event.preventDefault();
    let idCreatorProfile = this.props.userProfile.user.id;
    let dateFormat = moment(this.state.publicationDate).format('YYYY-MM-DD');
    let timeFormat = moment(this.state.postTime).format('HH:mm:ssZ');
    let TimeDate = dateFormat + 'T' + timeFormat;
    let fk_id_professor = parseInt(this.props.match.params.idProf, 10) === 0 ? null : parseInt(this.props.match.params.idProf, 10);

    let data = {
      name: this.state.courseName,
      url_course: this.state.courseUrl,
      status: true,
      creation_date: TimeDate,
      comment: this.state.comment,
      fk_id_assign_class_subject: this.state.assignmentIds,
      fk_id_creator_profile: idCreatorProfile,
      files: this.state.materialCoursefiles,
      moocsAttached: this.state.MoocsIds,
      virtuelClassAttached: this.state.virtualClassIds,
      toDoAttached: 0,
      fk_id_professor: fk_id_professor,
    };
    this.props.dispatch(
      addMaterialCourse(
        data,
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        this.props.userProfile.role_id,
        this.props.userProfile.id,
        this.props.match.params.idAssignement
      )
    );
    this.setState({
      open: false,
      courseName: '',
      courseUrl: '',
      comment: '',
      publicationDate: new Date(),
      postTime: new Date(),
      MoocsIds: [],
      virtualClassIds: [],
      toDoClassIds: [],
      materialCoursefiles: [],
      nameFiles: [],
      assignmentIds: [],
      classIndex: '',
      nameError: false,
    });
  }
  handleCancel() {
    this.setState({
      open: false,
      openEdit: false,
      courseName: '',
      courseUrl: '',
      comment: '',
      publicationDate: new Date(),
      postTime: new Date(),
      MoocsIds: [],
      virtualClassIds: [],
      toDoClassIds: [],
      materialCoursefiles: [],
      nameFiles: [],
      assignmentIds: [],
      classIndex: '',
      nameError: false,
      // state edit
      classEditName: '',
      classEditId: '',
      defaultMoocs: [],
      defaultVirtualClasses: [],
      materialCoursefilesDelete: [],
      itemEdit: {},
      defaultClass: [],
    });
  }
  render() {
    /* eslint eqeqeq: "off" */

    /* eslint  array-callback-return: "off" */

    return (
      <div>
        <div className=" bd-highlight" style={{ width: '100%' }}>
          <div className="  d-flex p-2 bd-highlight mb-4">
            <div style={{ marginTop: '13px' }}>
              <Button className="bg-primary text-white " style={{ borderRadius: '15px' }}>
                <i class="zmdi zmdi-hc-2x zmdi-caret-left"></i>&nbsp;
                <NavLink to={'/app/e-learning/course-material'}>
                  <span className="text-white">
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  </span>
                </NavLink>
              </Button>
            </div>
            <ListItem>
              <ListItemAvatar>
                <FolderIcon
                  style={{
                    fontSize: '55px',
                    marginRight: '20px',
                  }}
                  color="primary"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className="  d-flex row">
                    <Typography
                      variant="h4"
                      style={{
                        color: '#3F51B5',
                        fontWeight: 'normal',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {this.props.match.params.className + '/' + this.props.match.params.subjectName}
                    </Typography>
                  </div>
                }
              />{' '}
            </ListItem>
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
            <UncontrolledAlert className="alert-addon-card bg-danger bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          {this.state.alerteStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.state.messageAlerte} </span>
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
                  permission: 'add-course-material',
                  permissionList: this.props.userPermission,
                }}
                yes={() => (
                  <CardBox styleName="col-lg-12">
                    <AddSupportCours
                      informationsAdd={this.props.match.params}
                      courseAssignmentList={this.state.courseAssignmentList}
                      values={this.state}
                      openAddModal={this.openAddModal}
                      handleChangeClass={this.handleChangeClass}
                      handleChange={this.handleChange}
                      handleChangePublicationDate={this.handleChangePublicationDate}
                      handleChangePostTime={this.handleChangePostTime}
                      handleChangeMoocsIds={this.handleChangeMoocsIds}
                      handleChangeVirtualClassIds={this.handleChangeVirtualClassIds}
                      attachFile={this.attachFile}
                      addNewMaterialCourse={this.addNewMaterialCourse}
                      handleCancel={this.handleCancel}
                      deleteFile={this.deleteFile}
                    />
                  </CardBox>
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
                  permission: 'get-course-material',
                  permissionList: this.props.userPermission,
                }}
                yes={() => (
                  <CardBox styleName="col-lg-12">
                    <div className="table-responsive-material">
                      <Table>
                        <TableHead className="th-border-b">
                          <TableRow>
                            <TableCell>
                              {' '}
                              <IntlMessages id="file.type" />
                            </TableCell>

                            <TableCell>
                              <IntlMessages id="file.title" />
                            </TableCell>
                            <TableCell>Classes de formation</TableCell>
                            <TableCell>
                              <IntlMessages id="publication.date" />
                            </TableCell>
                            <TableCell>Formateur</TableCell>
                            <TableCell>
                              <IntlMessages id="associated.files.links" />
                            </TableCell>
                            <TableCell>
                              <IntlMessages id="dashboard.comments" />
                            </TableCell>

                            <RoleContext.Consumer>
                              {({ role }) => (
                                <Can
                                  role={role}
                                  perform="add-service"
                                  yes={() => (
                                    <TableCell>
                                      <IntlMessages id="action.type.of.education" />
                                    </TableCell>
                                  )}
                                />
                              )}
                            </RoleContext.Consumer>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.listSupportCourse.map((cours) => {
                            return (
                              <SupportCoursListItems
                                cours={cours}
                                editShowModal={this.editShowModal}
                                pathAttached={this.props.match}
                                archived={false}
                                handleDelete={this.handleDelete}
                                userPermission={this.props.userPermission}
                              />
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardBox>
                )}
              />
            )}
          </RoleContext.Consumer>

          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="add-service"
                yes={() => (
                  <div className="col-lg-12 col-md-12 bd-highlight">
                    <div>
                      <div
                        className="d-flex justify-content-start align-items-center "
                        style={{
                          paddingRight: 'auto',
                          paddingLeft: '2%',
                        }}
                      >
                        <h1>
                          <b>
                            {' '}
                            <IntlMessages id="service.button.archive" />{' '}
                          </b>
                        </h1>{' '}
                        &nbsp;&nbsp;&nbsp;
                        <Fab size="small" color="secondary" aria-label="Add" onClick={this.openArchive}>
                          <DeleteOutlineIcon />
                        </Fab>
                      </div>
                      <br />

                      {this.state.openArchive ? (
                        <CardBox styleName="col-lg-12">
                          <div className="table-responsive-material">
                            <Table>
                              <TableHead className="th-border-b">
                                <TableRow>
                                  <TableCell>
                                    {' '}
                                    <IntlMessages id="file.type" />
                                  </TableCell>

                                  <TableCell>
                                    <IntlMessages id="file.title" />
                                  </TableCell>
                                  <TableCell>
                                    <IntlMessages id="todo.labels" />
                                  </TableCell>
                                  <TableCell>
                                    <IntlMessages id="publication.date" />
                                  </TableCell>
                                  <TableCell>
                                    <IntlMessages id="material.professor.name" />
                                  </TableCell>
                                  <TableCell>
                                    <IntlMessages id="associated.files.links" />
                                  </TableCell>
                                  <TableCell>
                                    <IntlMessages id="dashboard.comments" />
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {this.props.listSupportCourseArchived.map((cours) => {
                                  return (
                                    <SupportCoursListItems
                                      cours={cours}
                                      editShowModal={this.editShowModal}
                                      pathAttached={this.props.match}
                                      archived={true}
                                    />
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        </CardBox>
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
        <ArchiveSupportCours
          values={this.state}
          deleteIsopen={this.state.deleteIsopen}
          handleCancelDelete={this.handleCancelDelete}
          handleSubmitDelete={this.handleSubmitDelete}
        />
        <EditSupportCours
          values={this.state}
          informationsAdd={this.props.match.params}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          handleChangeClass={this.handleChangeClass}
          handleChangePublicationDate={this.handleChangePublicationDate}
          handleChangePostTime={this.handleChangePostTime}
          handleChangeMoocsIds={this.handleChangeMoocsIds}
          handleChangeVirtualClassIds={this.handleChangeVirtualClassIds}
          attachFile={this.attachFile}
          deleteFile={this.deleteFile}
          editMaterialCourse={this.editMaterialCourse}
          courseAssignmentList={this.state.courseAssignmentList}
        />
        {this.props.materialCourseLoading ? <LoaderModal materialCourseLoading={this.props.materialCourseLoading} /> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    courseAssignment: state.AssignementReducer.courseAssignment,
    virtualClasses: state.classVirtualReducer.remoteClassVirtual,
    listMoocs: state.MoocsReducer.remoteMoocs,
    listSupportCourse: state.MaterialCourseReducer.remoteMaterialCourse,
    listSupportCourseArchived: state.MaterialCourseReducer.remoteMaterialCourseArchived,
    userPermission: state.PermissionReducer.userPermission,
    materialCourseLoading: state.MaterialCourseReducer.materialCourseLoading,
  };
}

export default connect(mapStateToProps)(SupportCoursList);
