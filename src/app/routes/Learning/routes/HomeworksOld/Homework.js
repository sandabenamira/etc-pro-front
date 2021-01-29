import React from 'react';
import ListHomework from './ListHomework';
import _ from 'lodash';
import { roleIdProfessor, roleIdAdmin, roleIdParent, roleIdStudent } from '../../../../../config/config';
import IntlMessages from '../../../../../util/IntlMessages';
import { getLevelByEstablishmentId } from '../../../../../actions/classLevelAction';
import { getSubjectsByEstablishmentId, subjectsByLevelBySection } from '../../../../../actions/subjectAction';
import AddHomework from './AddHomework';
import { getClassesByEstablishmentId } from '../../../../../actions/classeAction'
import { classService } from "../../../../../_services/class.service";
import { getAllTodoForProfessor, getAllTodoForAdmin, fetchTodo, getAllTodo, cleanState } from '../../../../../actions/ToDo';
import { connect } from 'react-redux'
import { getEstablishment } from '../../../../../actions/establishmentAction';
import { UncontrolledAlert } from 'reactstrap';
import Can from '../../../../../can';
import { RoleContext } from "../../../../../Context";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CardBox from "../../../../../components/CardBox/index";
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import { getName } from "../../../../../actions/countriesAction";
import IconWithTextCard from "./IconWithTextCard";
import moment from 'moment'

let countesHomeworkUncorrected = [];
class Homework extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      establishment_id: '',
      classesList: [],
      subjectList: [],
      addTodo: false,
      class_id: 0,
      subject_id: 0,
      subjects: [],
      toDoData: [],
      homeworkFiltredByClassId: [],
      countesStudents: 0,
      countesFiles: 0,
      countesEducationalFiles: 0

    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.filtreListToDo = this.filtreListToDo.bind(this);
    this.getSubjectsStudent = this.getSubjectsStudent.bind(this);
    this.getSubjectsParent = this.getSubjectsParent.bind(this);
  }
  getSubjectsParent() {
    let apiEndpoint = `/parents/?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][student_parents][student][class]`;
    classService.get(apiEndpoint)
      .then(response => {
        let subjectFiltred = subjectsByLevelBySection(this.props.remoteSubjects, _.head(response.data).student_parents[0].student.class.level_id, _.head(response.data).student_parents[0].student.class.section_id)
        this.setState({ subjects: subjectFiltred })
      })
  }

  getSubjectsStudent() {
    let apiEndpoint = `/students/?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include]=class`;
    classService.get(apiEndpoint)
      .then(response => {
        let subjectFiltred = subjectsByLevelBySection(this.props.remoteSubjects, _.head(response.data).class.level_id, _.head(response.data).class.section_id)
        this.setState({ subjects: subjectFiltred })
      })
  }

  filtreListToDo(subjectId) {
    this.setState({ subject_id: subjectId })
  }

  handleChangeClass = name => event => {

    let data = this.state.classesList.find(item => item.id === event.target.value)    
    let homeworkFiltredByClassId = [];
    this.props.toDos.forEach(element => {
      if (!_.isEmpty(element.homeworkClass)) {
        _.forEach(element.homeworkClass, function (value) {
          if (value.class_id === event.target.value) {
            homeworkFiltredByClassId.push(element)
          }
        });
      }
    });
    this.setState({ toDoData: homeworkFiltredByClassId, homeworkFiltredByClassId: homeworkFiltredByClassId })
    let levelId = data.level_id;
    let subjects = this.state.subjectList.filter(element => element.level_id === levelId)
    if (this.props.userProfile.role_id === roleIdProfessor) {
      let subjectsList = _.map(subjects, 'subject')
      this.setState({ [name]: event.target.value, subjects: subjectsList });
    } else if (this.props.userProfile.role_id === roleIdAdmin) {      
      this.setState({ [name]: event.target.value, subjects: subjects });
    }


  };

  handleChangeSubject = name => event => {
    this.setState({ [name]: event.target.value });
    let homeworkFiltredBySubject = []
    if (!_.isEmpty(this.state.homeworkFiltredByClassId)) {
      if (event.target.value === '0') {
        this.setState({ toDoData: this.state.homeworkFiltredByClassId });
      } else {
        homeworkFiltredBySubject = this.state.homeworkFiltredByClassId.filter(element => element.subject_id === event.target.value)
        this.setState({ toDoData: homeworkFiltredBySubject })
      }

    } else {
      if (event.target.value === '0') {
        this.setState({ toDoData: this.props.toDos });
      } else {
        homeworkFiltredBySubject = this.props.toDos.filter(element => element.subject_id === event.target.value)
        this.setState({ toDoData: homeworkFiltredBySubject })
      }
    }
  };

  handleCancel() {
    this.setState({ addTodo: false })
  };

  componentDidUpdate(prevProps) {
    if (prevProps.toDos !== this.props.toDos) {
      this.props.toDos.map(item => item.studentHomework = false)
      this.setState({ toDoData: this.props.toDos })
    } if (prevProps.classes !== this.props.classes) {
      this.setState({ classesList: this.props.classes })
    }
    if (prevProps.remoteSubjects !== this.props.remoteSubjects) {

      if (this.props.userProfile.role_id === roleIdStudent) {
        this.setState({ subjectList: this.props.remoteSubjects })
        this.getSubjectsStudent()
      } else if (this.props.userProfile.role_id === roleIdParent) {
        this.setState({ subjectList: this.props.remoteSubjects })
        this.getSubjectsParent()
      }
      else if (this.props.userProfile.role_id === roleIdAdmin) {
        this.setState({ subjectList: this.props.remoteSubjects })
      }
    }
    if (prevProps.userProfile !== this.props.userProfile)
    {
      const establishmentId = this.props.userProfile.establishment_id;
      const schoolYear = this.props.userProfile.school_year_id;
      this.props.getClassesByEstablishmentId(establishmentId, schoolYear);
      this.props.getAllTodoForAdmin(establishmentId,schoolYear)
    }
  }

  componentDidMount() {

    let apiEndpoint = '';
     const establishmentId = this.props.userProfile.establishment_id;
    const schoolYear = this.props.userProfile.school_year_id;
    const profileId = this.props.userProfile.id;
    this.props.getLevelByEstablishmentId(establishmentId)
    this.props.getSubjectsByEstablishmentId(establishmentId)
    this.props.toDos.map(item => item.studentHomework = false)
    this.setState({ toDoData: this.props.toDos })

    apiEndpoint = `/profiles/count?access_token=${localStorage.token}&where={"establishment_id":${establishmentId},"role_id":${roleIdStudent}}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {
        this.setState({ countesStudents: response.data.count });
      }
    });

    if (this.props.userProfile.role_id === roleIdProfessor) {
      this.props.getAllTodoForProfessor(profileId)
      apiEndpoint = `/professors/?access_token=${localStorage.token}&filter={"where":{"profile_id":` + profileId + `}}`;
      classService.get(apiEndpoint)
        .then(response => {
          apiEndpoint = `/classes_professors/?access_token=${localStorage.token}&filter[include][class]&filter[where][professor_id]=` + response.data[0].id;
          classService.get(apiEndpoint)
            .then(res => {
              this.setState({ classesList: _.uniqBy(_.map(res.data, 'class'), 'id') })
            })
          apiEndpoint = `/prof_subjects/?access_token=${localStorage.token}&filter[include][subject]&filter[where][professor_id]=` + response.data[0].id;
          classService.get(apiEndpoint)
            .then(res => {
              this.setState({ subjectList: res.data })
            })
        })

    }
    else if (this.props.userProfile.role_id === roleIdAdmin) {
      this.props.getClassesByEstablishmentId(establishmentId, schoolYear);
      this.props.getAllTodoForAdmin(establishmentId,schoolYear)
    }
    else if (this.props.userProfile.role_id === roleIdParent) {
      this.props.getAllTodo(this.props.userProfile.id, 'fetchHomeworkByProfileIdForParent');
      this.getSubjectsParent()
    }

    else if (this.props.userProfile.role_id === roleIdStudent) {
      this.props.getAllTodo(this.props.userProfile.id, 'fetchHomeworkByProfileIdForStudent');
      this.getSubjectsStudent()
    }

  };
componentWillUnmount(){
  this.props.cleanState()
}

  render() {
 let detailCards = [];
 if(this.props.userProfile.role_id === roleIdAdmin || this.props.userProfile.role_id === roleIdProfessor){
  //countesHomeworkUncorrected = this.props.toDos.filter(element => moment(element.homeworkClass[0].correction_date ).isAfter(moment().format()))
     detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../../../assets/images/dashboard/teams-icon.png'),
        title: this.state.countesStudents,
        subTitle: <IntlMessages id="message.Numbers.of.students" />
      }, {
        cardColor: 'secondary',
        imageIcon: require('../../../../../assets/images/dashboard/tasks-icon.png'),
        title: this.state.countesFiles,
        subTitle: <IntlMessages id="homework.file" />
      }, {
        cardColor: 'info',
        imageIcon: require('../../../../../assets/images/dashboard/project-icon.png'),
        title: countesHomeworkUncorrected.length,
        title: '0',
        subTitle: <IntlMessages id="homework.uncorrected" />
      }, {
        cardColor: 'warning',
        imageIcon: require('../../../../../assets/images/dashboard/files-icon.png'),
        title: this.state.countesEducationalFiles,
        subTitle: <IntlMessages id="homework.educational.files" />
      }
    ]
 }
 
    const { classesList, toDoData, subjects } = this.state;
    return (
      <div className="app-wrapper bg-white">
        <div className="row">
          {detailCards.map((data, index) => <div key={index} className="col-xl-3 col-lg-3 col-md-3 col-sm-7 col-6">
            <IconWithTextCard data={data} />
          </div>)
          }

        </div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="todo-filter:visit"
              yes={() => (
                <CardBox styleName="col-lg-12 text-primary">
                  <div className="row">
                    <Can
                      role={role}
                      perform="todo-filter-class:visit"
                      yes={() => (

                        <div className="col-md-2 text-left">
                          <TextField
                            required
                            name="class_id"
                            id="class_id"
                            select
                            label={<IntlMessages id="components.student.formadd.classe" />}
                            value={this.state.class_id}
                            onChange={this.handleChangeClass("class_id")}
                            SelectProps={{}}
                            margin="normal"
                            fullWidth
                          >
                            {classesList.map(classe => (
                              <MenuItem key={classe.id} value={classe.id}>
                                {classe.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      )}
                    />
                    <Can
                      role={role}
                      perform="todo-filter-subject:visit"
                      yes={() => (
                        <div className="col-md-2 text-left">
                          <TextField
                            required
                            name="subject_id"
                            id="subject_id"
                            select
                            label={<IntlMessages id="components.note.subject" />}
                            value={this.state.subject_id}
                            onChange={this.handleChangeSubject('subject_id')}
                            SelectProps={{}}
                            margin="normal"
                            fullWidth >
                            <MenuItem key="0" value="0">
                              <IntlMessages id="all.subject" />
                            </MenuItem>
                            {subjects.map(option => (
                              < MenuItem key={option.id} value={option.id} >
                                {getName(option)}
                              </MenuItem>

                            ))}

                          </TextField>
                        </div>

                      )}
                    />

                    <Can
                      role={role}
                      perform="homework-button-add"
                      yes={() => (
                        <div className="col-md-8 text-right " >
                          <Fab
                            size="small"
                            color="primary"
                            aria-label="Add"
                            onClick={() => {
                              this.setState({ addTodo: true })
                            }}
                          >
                            <AddIcon />
                          </Fab>

                        </div>)}
                    />
                  </div>
                </CardBox>


              )}
            />

          )}
        </RoleContext.Consumer>

        {this.props.success ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {<IntlMessages id={this.props.message} />} </span>
          </UncontrolledAlert>
        ) : (
            ''
          )}
        {this.props.error ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {<IntlMessages id={this.props.message} />} </span>
          </UncontrolledAlert>
        ) : (
            ''
          )}

        <div className="col-lg-12 text-primary">

          <ListHomework
            toDos={toDoData}
            roleId={this.props.userProfile.role_id}
            filtreListToDo={this.filtreListToDo}
            classesList={this.state.classesList}
            classId={this.state.class_id} />

          {this.state.addTodo ? <AddHomework 
          cancelModal={this.handleCancel} 
          listSubject={this.props.subjects} 
          classesList={this.state.classesList}
          establishmentData={this.props.establishmentData} /> : ''}

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ toDo, settings, auth, establishment, classes, subject, alert }) => {
  const { width } = settings;
  const {
    alertMessage,
    showMessage,
    currentTodo,
    user,
    toDos,
    conversation,
    toDosForParent,
    toDosForAdmin,

  } = toDo;
  const { userProfile } = auth;
  const { remoteEstablishments } = establishment;
  const { remoteSubjects, establishmentData } = subject;
  const { error, success, message } = alert;
  return {
    width,
    getAllTodo,
    alertMessage,
    showMessage,
    currentTodo,
    user,
    toDos,
    conversation,
    userProfile,
    toDosForParent,
    toDosForAdmin,
    remoteEstablishments,
    classes,
    remoteSubjects,
    error,
    success,
    message,
    establishmentData
  };

};
export default connect(mapStateToProps, {
  fetchTodo,
  getAllTodoForProfessor,
  getAllTodoForAdmin,
  getEstablishment,
  getLevelByEstablishmentId,
  getSubjectsByEstablishmentId,
  getClassesByEstablishmentId,
  getAllTodo, 
  cleanState
})(Homework);
