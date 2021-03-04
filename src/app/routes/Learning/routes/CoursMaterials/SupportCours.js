import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import IconWithTextCard from '../../../FinancialManagement/routes/ServiceAllocation/ServiceAllocationComp/IconWithTextCard';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import CardBox from '../../../../../components/CardBox/index';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import { NavLink } from 'react-router-dom';
import { getLevelClassSubjectData, getMaterialCourse } from '../../../../../actions/MaterialCourseAction';
import { roleIdStudent, roleIdAdmin, roleIdParent } from '../../../../../config/config';
import _ from 'lodash';
import SweetAlert from 'react-bootstrap-sweetalert';

class SupportCours extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFolderOpen: false,
      folderId: 0,
      classId: 0,
      SubjectList: [],
      className: '',
      options: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      listMaterialCourseStudent: [],
      SubjectListStudent: [],
      levelIdStudent: 0,
      levelNameStudent: 0,
      classIdStudent: 0,
      classNameStudent: 0,
      isOpenAlertParent: false,
      show: false,
    };
    this.handleChangeFolder = this.handleChangeFolder.bind(this);
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

  handleChangeFolder(id, e, classMaterialCourse) {
    e.preventDefault();
    this.setState({
      SubjectList: classMaterialCourse.subject,
    });
    if (classMaterialCourse.classId !== this.state.classId) {
      this.setState({
        isFolderOpen: true,
        folderId: id,
        classId: classMaterialCourse.classId,
        className: classMaterialCourse.className,
      });
    } else {
      this.setState({ isFolderOpen: false, folderId: 0, classId: 0 });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.props.getLevelClassSubjectData(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        this.props.userProfile.role_id,
        this.props.userProfile.id
      );
    }
    if (prevProps.listMaterialCourse !== this.props.listMaterialCourse) {
      if (!_.isEmpty(this.props.listMaterialCourse)) {
        let levelIdStudent = this.props.listMaterialCourse[0].levelId;
        let levelNameStudent = this.props.listMaterialCourse[0].levelName;
        let classIdStudent = this.props.listMaterialCourse[0].classes[0].classId;
        let classNameStudent = this.props.listMaterialCourse[0].classes[0].className;
        this.setState({
          listMaterialCourseStudent: this.props.listMaterialCourse[0],
          SubjectListStudent: this.props.listMaterialCourse[0].classes[0].subject,
          levelIdStudent,
          levelNameStudent,
          classIdStudent,
          classNameStudent,
        });
      }
    }
  }
  UNSAFE_componentWillMount() {
    this.props.getLevelClassSubjectData(
      this.props.userProfile.establishment_id,
      this.props.userProfile.school_year_id,
      this.props.userProfile.role_id,
      this.props.userProfile.id
    );
    if (this.props.userProfile.role_id === roleIdStudent) {
      let classStudent = this.props.userProfile.user.profiles[0].students[0].inscription[0].fk_id_class_v4;
      this.setState({ classStudent });
      if (classStudent === null) {
        this.setState({ show: true });
      }
    } else if (this.props.userProfile.role_id === roleIdParent) {
      let classStudents = this.props.userProfile.user.profiles[0].parents[0].student_parents;
      if (_.isEmpty(classStudents)) {
        this.setState({ isOpenAlertParent: true });
      }
    }
  }

  render() {
    const { settings } = this.props;
    const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      row: {
        display: 'flex',
        justifyContent: 'center',
      },
      margin: {
        margin: theme.spacing(3),
      },
    }));
    const classes = useStyles;

    let detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/project-icon.png'),
        title: 50,
        subTitle: <IntlMessages id={`support.cours.day`} />,
      },
      {
        cardColor: 'secondary',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/tasks-icon.png'),
        title: 12,
        subTitle: <IntlMessages id={`support.cours.month`} />,
      },
      {
        cardColor: 'info',
        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/teams-icon.png'),
        title: '11',
        subTitle: <IntlMessages id={`support.cours.total`} />,
      },
    ];
    return (
      <div
        className="app-wrapper  "
        style={{
          marginLeft: '2%',
          marginRight: 'auto',
        }}
      >
        <div className="row col-lg-12 col-md-12 ">
          {detailCards.map((data, index) => (
            <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <IconWithTextCard data={data} />
            </div>
          ))}
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="KPI-subject-material-course"
                yes={() => (
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                    <IconWithTextCard
                      data={{
                        cardColor: 'warning',
                        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/files-icon.png'),
                        title: '10',
                        subTitle: <IntlMessages id={`components.note.subject`} />,
                      }}
                    />
                  </div>
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
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                    <IconWithTextCard
                      data={{
                        cardColor: 'warning',
                        imageIcon: require('../../../FinancialManagement/routes/ServiceAllocation/Icone/files-icon.png'),
                        title: '10',
                        subTitle: <IntlMessages id={`sidebar.classes`} />,
                      }}
                    />
                  </div>
                )}
              />
            )}
          </RoleContext.Consumer>

          <div className=" bd-highlight" style={{ width: '100%' }}>
            <CardBox styleName="col-lg-12">
              <div className="d-flex flex-column bd-highlight mb-6 justify-content-around ">
                {this.props.listMaterialCourse.map((levelMaterialCourse, index) => {
                  return (
                    <>
                      <div key={index} className="col-md-12 col-lg-12 col-sm-12 d-flex flex-wrap flex-row bd-highlight mb-4  ">
                        {levelMaterialCourse.classes.map((classMaterialCourse, index) => {
                          return (
                            <div key={index} className="col-md-6 col-lg-3 col-sm-6">
                              <List>
                                <ListItem>
                                  <div className="d-flex  flex-column justify-content-center ">
                                    <div
                                      className="d-flex  flex-row justify-content-center "
                                      onClick={(e) => this.handleChangeFolder(levelMaterialCourse.levelId, e, classMaterialCourse)}
                                      language
                                    >
                                      <ListItemAvatar>
                                        <Avatar>
                                          <FolderIcon />
                                        </Avatar>
                                      </ListItemAvatar>
                                    </div>

                                    <div className="d-flex  flex-column justify-content-center align-items-center ">
                                      <Typography
                                        variant="h6"
                                        style={{
                                          marginLeft: '-7%',
                                          color: 'grey',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        {classMaterialCourse.className}
                                      </Typography>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          color: 'grey',
                                          fontWeight: 'normal',
                                        }}
                                      >
                                        {settings === 'tunisia'
                                          ? new Date(classMaterialCourse.classDate).toLocaleDateString('ar-TN', this.state.options)
                                          : settings === 'french'
                                          ? new Date(classMaterialCourse.classDate).toLocaleDateString('fr-FR', this.state.options)
                                          : new Date(classMaterialCourse.classDate).toLocaleDateString('en-US', this.state.options)}{' '}
                                      </Typography>{' '}
                                    </div>
                                  </div>
                                </ListItem>
                              </List>
                            </div>
                          );
                        })}{' '}
                      </div>
                      <hr
                        style={{
                          width: '100%',
                          margin: 'auto',
                          marginTop: '1%',
                          marginBottom: '1%',
                          border: '1px solid #979A9A',
                          paddingLeft: '-100%',
                        }}
                      />

                      {this.state.SubjectList.length > 0 && levelMaterialCourse.levelId === this.state.folderId ? (
                        <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-wrap bd-highlight mb-4  ">
                          {this.state.SubjectList.map((subject, index) => {
                            // eslint-disable-next-line
                            let levelId = levelMaterialCourse.levelId;
                            let levelName = levelMaterialCourse.levelName;
                            let classId = this.state.classId;
                            let className = this.state.className;
                            let subjectId = subject.subjectId;
                            let subjectName = subject.subjectName;
                            let assignementId = subject.assignementClassSubject;
                            let surnameProf =
                              subject.prof === undefined ? 0 : subject.prof[0] == undefined ? 0 : subject.prof[0].profile.user.surname;
                            let nameProf = subject.prof === undefined ? 0 : subject.prof[0] == undefined ? 0 : subject.prof[0].profile.user.name;
                            let profId = subject.prof === undefined ? 0 : subject.prof[0] == undefined ? 0 : subject.prof[0].id;

                            return (
                              <div key={index} class="col-md-4 col-lg-3 col-sm-6">
                                <List>
                                  <ListItem>
                                    <div
                                      class="d-flex flex-column justify-content-center align-items-center text-center"
                                      onClick={() => {
                                        this.props.getMaterialCourse(
                                          this.props.userProfile.establishment_id,
                                          this.props.userProfile.school_year_id,
                                          this.props.userProfile.role_id,
                                          this.props.userProfile.id,
                                          assignementId
                                        );
                                      }}
                                    >
                                      <NavLink
                                        to={`/app/e-learning/course_material/${levelId}/${levelName}/${classId}/${className}/${subjectId}/${subjectName}/${assignementId}/${surnameProf}/${nameProf}/${profId}`}
                                      >
                                        <FolderIcon
                                          style={{
                                            fontSize: '55px',
                                            color: this.props.userProfile.role_id === roleIdAdmin ? 'blue' : subject.subjectColor,
                                          }}
                                        />
                                        <ListItemText
                                          primary={
                                            <Typography
                                              variant="h6"
                                              style={{
                                                color: 'grey',
                                                fontWeight: 'normal',
                                                textAlign: 'center',
                                              }}
                                            >
                                              {subject.subjectName}
                                            </Typography>
                                          }
                                        />{' '}
                                      </NavLink>
                                    </div>
                                  </ListItem>
                                </List>
                              </div>
                            );
                          })}
                          <hr
                            style={{
                              width: '100%',
                              margin: 'auto',
                              marginTop: '1%',
                              marginBottom: '1%',
                              border: '1px solid #979A9A',
                              paddingLeft: '-100%',
                            }}
                          />
                        </div>
                      ) : null}
                    </>
                  );
                })}
              </div>
            </CardBox>
          </div>
        </div>
        {this.props.userProfile.role_id === roleIdStudent && this.state.classStudent === null ? (
          <SweetAlert show={this.state.show} title={<IntlMessages id="alert.affect.student" />} onConfirm={this.onConfirm}></SweetAlert>
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
    levels: state.levelsReducer.levels,
    classes: state.classes,
    listMaterialCourse: state.MaterialCourseReducer.remoteFolderCourse,
    settings: state.settings.locale.languageId,
  };
};

export default connect(mapStateToProps, { getLevelClassSubjectData, getMaterialCourse })(SupportCours);
