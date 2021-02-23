import React from 'react';
import IntlMessages from '../../../util/IntlMessages';
import ContainerHeader from '../../../components/ContainerHeader/index';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddHealthFile from './AddHealthFile';
import HealthFileList from './HealthFileList';
import { addFicheMedical } from '../../../actions/HealthAction';
import { getFicheMedicalByEstablishmentId } from '../../../actions/HealthAction';
import { connect } from 'react-redux';
import { getSectionFromLevel } from '../../../actions/sectionAction';
import { getLevelListFromEstabType } from '../../../actions/classLevelAction';
import axios from 'axios';
import baseUrl from '../../../config/config';
import { getSections } from '../../../actions/sectionAction';
import { getLevels } from '../../../actions/classLevelAction';
import { getLevelsVirtualClass } from '../../../actions/classLevelAction';
 import { UncontrolledAlert } from 'reactstrap';
import Can from '../../../can';
import { RoleContext } from '../../../Context';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { roleIdSuperAdmin } from '../../../config/config';
import { roleIdAdmin } from '../../../config/config';
import { roleIdDirector } from '../../../config/config';
import CardBox from "../../../components/CardBox/index";
import { classService } from "../../../_services/class.service";
class HealthMonitoring extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addIsopen: false,
      level_id: '',
      section_id: '',
      establishment_id: '',
      class_id: '',
      student_id: '',
      blood_type: '',
      poids: '',
      hauteur: '',
      prenom_doctor: '',
      nom_doctor: '',
      phone_doctor: '',
      mail_doctor: '',
      remarque: '',
      userPhotos: null,
      checkedBox: true,
      inputText: '',
      studentsectionByLevels: [],
      Disable_studentsection: true,
      levelsbyestablishment: [],
      studentClassesByLevelSectionID: [],
      subjectList: [],
      establishmentProfessor: [],
      professorIdFilter: '',
      professorClassesList: [],
      professor_class_id: '',
      selectedFilterDateProfessor: null,
      studentByclassID: [],
      levelId:0,
      sectionId:0,
      student_subject_id: '',
      selectedFilterDateStudent: null,
      studentList:[],
      classId:'',
      data: [
        {
          id: 1,
          name: 'Des yeux',
        },
        {
          id: 2,
          name: 'Coeur',
        },
        {
          id: 3,
          name: 'CUTANÉ',
        },
        {
          id: 4,
          name: 'Système respiratoire',
        },
        {
          id: 5,
          name: 'Des oreilles',
        },
        {
          id: 6,
          name: 'Tension',
        },
        {
          id: 7,
          name: 'Système musculo-squelettique',
        },
        {
          id: 8,
          name: 'Système respiratoire',
        },
        {
          id: 9,
          name: 'Système nerveux',
        },
      ],
      checkedValues: [],
      blood_group: [
        {
          id: 1,
          type: 'A+',
        },
        {
          id: 2,
          type: 'A-',
        },
        {
          id: 3,
          type: 'B+',
        },
        {
          id: 4,
          type: 'B-',
        },
        {
          id: 5,
          type: 'AB+',
        },
        {
          id: 6,
          type: 'AB-',
        },
        {
          id: 7,
          type: 'O+',
        },
        {
          id: 8,
          type: 'O-',
        },
      ],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addHealthShowModal = this.addHealthShowModal.bind(this);
    this.handleChangestudentLevel = this.handleChangestudentLevel.bind(this);
    this.handleChangestudentSection = this.handleChangestudentSection.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleChangeStudent = this.handleChangeStudent.bind(this);
    this.addHealthFile = this.addHealthFile.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChangesLevel = this.handleChangesLevel.bind(this);
    this.handleChangeSection = this.handleChangeSection.bind(this); 
    this.handleChangeClassStudent = this.handleChangeClassStudent.bind(this);
    
    
  }

componentDidMount(){
  let apiEndpoint = "";
  apiEndpoint = `/students/fetchStudentByEstablishmentId/${this.props.userProfile.establishment_id}?access_token=${localStorage.token}&filter[include][profile][user]`;
  classService.get(apiEndpoint).then((res) => {
    if (res) {      
      this.setState({ studentList: res.data.students });
    }
  });
}

  handleChangeClassStudent= (name) => (event) => { 
  let students= this.state.studentList.filter(student => student.class_id === event.target.value);
  this.setState({studentByclassID : students, [name]: event.target.value })
  
  }

  handleChangeSection= (name) => (event) => {
    
    var studentfiltredClasses = this.props.classes.filter(
      (classe) =>
        classe.level_id === this.state.levelId &&
        classe.section_id === event.target.value &&
        classe.status
    );
    this.setState({[name]: event.target.value, studentClassesByLevelSectionID: studentfiltredClasses });
  }

  handleChangesLevel = (name) => (event) => {
    if (event.target.value > 10) {
      var studentSectionbyLevel = getSectionFromLevel(
        this.props.classSections,
        event.target.value
      );
      this.setState({[name]: event.target.value ,Disable_studentsection: false , studentsectionByLevels: studentSectionbyLevel });
    }
    else {
      var studentfiltredClasses = this.props.classes.filter( (classe) => classe.level_id === event.target.value && classe.status);
      this.setState({
        Disable_studentsection: true,
        section_id: 0,
        studentClassesByLevelSectionID: studentfiltredClasses,
        [name]: event.target.value 
      });
    }
  }
  
  handleCheck = (event) => {
    var tab = this.state.checkedValues;
    var test = this.state.checkedValues.findIndex(
      (element) => element == event.target.value
    );
    if (test == -1) {
      tab.push(parseInt(event.target.value, 10));
      this.setState({ checkedValues: tab });
    } else {
      tab.splice(test, 1);
      this.setState({ checkedValues: tab });
    }
  };
  handleChangestudentLevel = (name) => (event) => {
    if (event.target.value === '0') {
      this.setState({
        classId: '',
        level_id: '',
      });
    } else {
      this.setState({ section_id: 0, classId: 0 });
      if (event.target.value > 10) {
        this.setState({ [name]: event.target.value });
        this.setState({ Disable_studentsection: false });
        var studentSectionbyLevel = getSectionFromLevel(
          this.props.classSections,
          event.target.value
        );
        this.setState({ studentsectionByLevels: studentSectionbyLevel });
      } else {
        this.setState({
          level_id: event.target.value,
          Disable_studentsection: true,
          section_id: 0,
        });
        const levelID = event.target.value;
        var studentfiltredClasses = this.props.classes.filter(
          (classe) => classe.level_id === levelID && classe.status
        );
        this.setState({
          studentClassesByLevelSectionID: studentfiltredClasses,
        });
      }
    }
  };

  handleChangestudentSection = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    const levelID = this.state.level_id;
    const sectionID = event.target.value;
    var studentfiltredClasses = this.props.classes.filter(
      (classe) =>
        classe.level_id === levelID &&
        classe.section_id === sectionID &&
        classe.status
    );
    this.setState({ studentClassesByLevelSectionID: studentfiltredClasses });
  };

  handleChangeClass = (name) => (event) => {
    
    if (this.props.userProfile.role_id === roleIdAdmin) {
      axios
        .get(
          `${baseUrl.baseUrl}/students/fetchAllStudentsDataByClassID/` +
            event.target.value +
            `?access_token=${localStorage.token}`
        )
        .then((res) => {
          this.setState({
            studentByclassID: res.data.classData,
          });
        });
      this.setState({
        establishment_id: this.props.userProfile.establishment_id,
      });
    }
    this.setState({ [name]: event.target.value });
  };


  handleChangeStudent = (name) => (event) => {
    this.setState({
      student_id: event.target.value,
    });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  addHealthShowModal = () => {
    this.setState({
      addIsopen: true,
      // level_id: '',
      // section_id: '',
      // establishment_id: '',
      // class_id: '',
      // student_id: '',
    });
  };

  handleCancel = () => {
    this.setState({
      addIsopen: false,
    });
  };
  onDrop = (e) => {
    let file = e.target.files[0];
    this.setState({ userPhotos: file, inputText: file.name });
  };
  addHealthFile = () => {
    var data = {};
    // data.establishment_id = this.props.userProfile.establishment_id;
    // data.student_id = this.state.student_id;
    // data.class_id = this.state.class_id;
    // data.nom_doctor = this.state.nom_doctor;
    // data.prenom_doctor = this.state.prenom_doctor;
    // data.phone_doctor = parseInt(this.state.phone_doctor, 10);
    // data.blood_type = this.state.blood_type;
    // data.poids = parseInt(this.state.poids, 10);
    // data.hauteur = parseInt(this.state.hauteur, 10);
    // data.problems = this.state.checkedValues;
    // data.remarque = this.state.remarque;
    // data.files = '1.png';
    // data.status = true;
    // data.mail_doctor = this.state.mail_doctor;


    data.establishment_id = 2;
    data.student_id = 30;
    data.class_id = 3;
    data.nom_doctor = "Zied";
    data.prenom_doctor = "Wafi";
    data.phone_doctor = parseInt("25147963", 10);
    data.blood_type = 1;
    data.poids = parseInt("16", 10);
    data.hauteur = parseInt("188", 10);
    data.problems = [2,3];
    data.remarque = "dqffffe";
    data.files = '1.png';
    data.status = true;
    data.mail_doctor = "doc@gmail.com";
    this.props.addFicheMedical(data, this.state.userPhotos);

    this.setState({
      addIsopen: false,
      level_id: '',
      section_id: '',
      class_id: '',
      student_id: '',
      blood_type: '',
      poids: '',
      hauteur: '',
      prenom_doctor: '',
      nom_doctor: '',
      phone_doctor: '',
      mail_doctor: '',
      remarque: '',
      userPhotos: null,
      checkedBox: true,
      inputText: '',
      checkedValues: [],
    });
  };

  componentWillMount() {
    this.props.getSections();
     this.props.getLevelsVirtualClass();
     this.props.getFicheMedicalByEstablishmentId(this.props.userProfile.establishment_id);
this.setState({levelsbyestablishment: this.props.ClassLevels})
   
  }

  render() {
    
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.components.health-monitiring" />}
        />
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
            <span className="d-inline-block"> {this.props.message}</span>
          </UncontrolledAlert>
        ) : (
          ''
        )}
        <br />

        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="user-filter:visit"
              yes={() => (
                <CardBox styleName="col-lg-12 text-primary">
                <div className="col-md-12  d-flex justify-content-between">
                  <Can
                    role={role}
                    perform="user-filter-establishment:visit"
                    yes={() => (
                      <div className="col-md-2 text-left">
                        <TextField
                          className="mt-0"
                          required
                          name="establishment_id"
                          id="establishment_id"
                          select
                          label={
                            <IntlMessages id="components.student.formadd.establishment" />
                          }
                          //  value={this.state.establishment_id}
                          // onChange={this.handleChangeEstablishment('establishment_id')}
                          SelectProps={{}}
                          margin="normal"
                          fullWidth
                        >
                          {/* {this.state.establishments.map(establishment => (
                            <MenuItem key={establishment.id} value={establishment.id}>
                              {this.props.settings == "tunisia" ? establishment.ar_name : establishment.name}
                            </MenuItem>
                          ))} */}
                        </TextField>
                      </div>
                    )}
                  />
                  <div className="col-md-2 text-left ">
                    <TextField
                      id="level_id"
                      name="level_id"
                      select
                      value={this.state.level_id}
                      defaultValue=" "
                      onChange={this.handleChangestudentLevel('level_id')}
                      SelectProps={{}}
                      helperText={
                        <IntlMessages id="components.class.level.input.label.level" />
                      }
                      margin="normal"
                      fullWidth
                    >
                      <MenuItem key="0" value="0">
                        <IntlMessages id="extraPages.all" />
                      </MenuItem>
                      {this.props.classLevels.map((level) => (
                        <MenuItem key={level.id} value={level.id}>
                          {this.props.settings.languageId == 'tunisia'
                            ? level.name_AR
                            : this.props.settings.languageId == 'french'
                            ? level.name_FR
                            : level.name_EN}
                            {/* {level.name} */}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="col-md-2 text-left ">
                    <TextField
                      id="section_id"
                      name="section_id"
                      select
                      value={this.state.section_id}
                      onChange={this.handleChangestudentSection('section_id')}
                      disabled={this.state.Disable_studentsection}
                      SelectProps={{}}
                      helperText={
                        <IntlMessages id="components.class.level.input.label.section" />
                      }
                      margin="normal"
                      fullWidth
                    >
                      {this.state.studentsectionByLevels.map((section) => (
                        <MenuItem key={section.id} value={section.id}>
                          {section.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="col-md-2 text-left ">
                    <TextField
                      id="classId"
                      name="classId"
                      select
                      value={this.state.classId}
                      onChange={this.handleChangeClass('classId')}
                      SelectProps={{}}
                      helperText={<IntlMessages id="ticket.name.class" />}
                      margin="normal"
                      fullWidth
                    >
                      {this.state.studentClassesByLevelSectionID.map(
                        (classe) => (
                          <MenuItem key={classe.id} value={classe.id}>
                            {classe.name}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </div>
                  {this.props.userProfile.role_id === roleIdSuperAdmin ||
                  this.props.userProfile.role_id === roleIdAdmin ||
                  this.props.userProfile.role_id === roleIdDirector ? (
                    <div
                      className="col-md-6 text-right "
                      style={{ marginBottom: 20 }}
                    >
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.addHealthShowModal}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </CardBox>
              
              )}
            />
          )}
        </RoleContext.Consumer>

        {
          <HealthFileList
            ficheMedicalList={this.props.ficheMedicalList}
            class_id={this.state.classId}
            levelsbyestablishment={this.props.classLevels}
          />
        }

        <AddHealthFile
          values={this.state}
          addIsopen={this.state.addIsopen}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          handleChangeSection={this.handleChangeSection}
          handleChangesLevel={this.handleChangesLevel}
          handleChangeClassStudent={this.handleChangeClassStudent}
          onDrop={this.onDrop}
          handleChangeStudent={this.handleChangeStudent}
          addHealthFile={this.addHealthFile}
          handleCheck={this.handleCheck}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    classLevels: state.ClassLevels.remoteLevels,
    classSections: state.classSections.remoteSections,
    classes: state.classes,
    classVirtual: state.classVirtualReducer.remoteClassVirtual,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    settings: state.settings.locale,
    ficheMedicalList: state.HealthReducer.remoteFicheMedical,
  };
}

export default connect(
  mapStateToProps,
  {
    addFicheMedical,
    getSections,
    getLevels,
    getLevelsVirtualClass,
     getFicheMedicalByEstablishmentId,
  }
)(HealthMonitoring);
