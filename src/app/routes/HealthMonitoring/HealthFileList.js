import React, { Component } from 'react'
import HealthFileListItem from "./HealthFileListItem"
import EditHealthFile from "./EditHealthFile"
import { getSectionFromLevel } from '../../../actions/sectionAction';
import { getLevelListFromEstabType } from '../../../actions/classLevelAction';
import axios from 'axios';
import baseUrl from '../../../config/config';
import {editFicheMedical} from '../../../actions/HealthAction'
import { getSections } from '../../../actions/sectionAction';
import { getLevels } from '../../../actions/classLevelAction';
import { getLevelsVirtualClass } from '../../../actions/classLevelAction';
 import { connect } from 'react-redux';
import { roleIdSuperAdmin } from '../../../config/config';
import { roleIdAdmin } from '../../../config/config';
import { roleIdProfessor } from '../../../config/config';
import { roleIdParent } from '../../../config/config';
import { roleIdStudent } from '../../../config/config';
import { roleIdSupervisor } from '../../../config/config';
import { roleIdDirector } from '../../../config/config';

 class HealthFileList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editIsopen: false,
            level_id: '',
            section_id: '',
            Disable_studentsection: true,
            establishment_id: '',
            student_id: '',
            class_id: '',
            nom_doctor: '',
            prenom_doctor: '',
            phone_doctor: '',
            mail_doctor: '',
            blood_type: '',
            poids: '',
            hauteur: '',
            problems: [],
            remarque: '',
            files: '',
            studentsectionByLevels:[],
            studentClassesByLevelSectionID:[],
            studentByclassID: [],
            userPhotos: null, 
            inputText:'',
            checkedValues:[],
            id:'',
            blood_group: [
                {
                  id: 1,
                  type: "A+"
                },
                {
                  id: 2,
                  type: "A-"
                },
                {
                  id: 3,
                  type: "B+"
                },
                {
                  id: 4,
                  type: "B-"
                },
                {
                  id: 5,
                  type: "AB+"
                },
                {
                  id: 6,
                  type: "AB-"
                },
                {
                  id: 7,
                  type: "O+"
                },
                {
                  id: 8,
                  type: "O-"
                }
              ],
              data: [
                {
                  "id": 1,
                  "name": "Des yeux"
                },
                {
                  "id": 2,
                  "name": "Coeur"
                },
                {
                  "id": 3,
                  "name": "CUTANÉ"
                },
                {
                  "id": 4,
                  "name": "Système respiratoire"
                },
                {
                  "id": 5,
                  "name": "Des oreilles"
                },
                {
                  "id": 6,
                  "name": "Tension"
                },
                {
                  "id": 7,
                  "name": "Système musculo-squelettique"
                },
                {
                  "id": 8,
                  "name": "Système respiratoire"
                },
                {
                  "id": 9,
                  "name": "Système nerveux"
                }
        
              ],

        }
        this.editFicheMedicalShowModal = this.editFicheMedicalShowModal.bind(this)

        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this)
        // this.handleChangeStudent = this.handleChangeStudent.bind(this)
        this.editHealthFile = this.editHealthFile.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
    }

    editHealthFile = () => {

        var data = {};
        data.establishment_id = this.props.userProfile.establishment_id;
        data.student_id = this.state.student_id;
        data.class_id = this.state.class_id;
        data.nom_doctor = this.state.nom_doctor;
        data.prenom_doctor = this.state.prenom_doctor;
        data.phone_doctor = parseInt(this.state.phone_doctor, 10)
        data.blood_type = this.state.blood_type;
        data.poids = parseInt(this.state.poids, 10)
        data.hauteur = parseInt(this.state.hauteur, 10)
        data.problems = this.state.checkedValues;
        data.remarque = this.state.remarque;
        data.files = this.state.files;
        data.status = true;
        data.mail_doctor = this.state.mail_doctor;
        data.id=this.state.id
        this.props.editFicheMedical(data, this.state.userPhotos);
        this.setState({
          editIsopen: false,
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
          id:''
    
    
        })
      }


  handleCheck = (event) => {
    var tab = this.state.checkedValues
    var test = this.state.checkedValues.findIndex(element => element == event.target.value)
    if (test == -1) {
      tab.push(parseInt(event.target.value, 10))
      this.setState({ checkedValues: tab })
    }
    else {
      tab.splice(test, 1)
      this.setState({ checkedValues: tab })
    }
  };

    onDrop = e => {
        let file = e.target.files[0];
        this.setState({ userPhotos: file, inputText: file.name });
      };
    handleCancel = () => {
        this.setState({
          editIsopen: false
        });
      };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
    editFicheMedicalShowModal = (FicheObjectEdit) => {
        this.setState({
            editIsopen: true,
            establishment_id: FicheObjectEdit.establishment_id,
            student_id: FicheObjectEdit.student_id,
            nom_doctor: FicheObjectEdit.nom_doctor,
            prenom_doctor: FicheObjectEdit.prenom_doctor,
            phone_doctor: FicheObjectEdit.phone_doctor,
            mail_doctor: FicheObjectEdit.mail_doctor,
            blood_type: FicheObjectEdit.blood_type,
            poids: FicheObjectEdit.poids,
            hauteur: FicheObjectEdit.hauteur,
            checkedValues: FicheObjectEdit.problems,
            remarque: FicheObjectEdit.remarque,
            files: FicheObjectEdit.files,
            id:FicheObjectEdit.id
        })

        axios.get(`${baseUrl.baseUrl}/students/` + FicheObjectEdit.student_id + `?access_token=${localStorage.token}`)
            .then(response => {

        axios.get(`${baseUrl.baseUrl}/classes/` + response.data.class_id + `?access_token=${localStorage.token}`)
            .then(response => {
           
                var ClassID=response.data.id
                this.setState({
                    level_id: response.data.level_id,
                    section_id: response.data.section_id,
                    class_id: response.data.id,
                     })

                if (response.data.level_id > 10) {
                    this.setState({ Disable_studentsection: false });
                    var studentSectionbyLevel = getSectionFromLevel(
                        response.data.section_id,
                        response.data.level_id
                    );
                    this.setState({ studentsectionByLevels: studentSectionbyLevel });
                  } else {
                    this.setState({
                      Disable_studentsection: true,
                      section_id: 0,
                    });
                    const levelID = response.data.level_id ;
                    var studentfiltredClasses = this.props.classes.filter(
                      (classe) => classe.level_id === levelID && classe.status
                    );
                    this.setState({ studentClassesByLevelSectionID: studentfiltredClasses });
                  }
                  axios
                  .get(
                    `${baseUrl.baseUrl}/students/fetchAllStudentsDataByClassID/` +
                    ClassID +
                    `?access_token=${localStorage.token}`
                  )
                  .then((res) => {
                    this.setState({
                      studentByclassID: res.data.classData
                    });
                  });
    })

            })

    }

    componentWillMount(){
    
        axios
        .get(
          `${baseUrl.baseUrl}/establishments/` +
          this.props.userProfile.establishment_id +
          `?access_token=${localStorage.token}`
        )
        .then((res) => {
          var levelsbyestablishment = getLevelListFromEstabType(
            this.props.classLevels,
            res.data.estab_type_id
          );
          this.setState({
            estabType: res.data.estab_type_id,
            levelsbyestablishment: levelsbyestablishment,
          },);
        });
    }

    render() {
        var finalList
      if(this.props.class_id===''){
        finalList = this.props.ficheMedicalList
      }
      else{
        finalList = this.props.ficheMedicalList.filter(element => element.class_id == this.props.class_id)
      }
        return (
            <div>
                {
                    finalList.length > 0 ? <div className="row animated slideInUpTiny animation-duration-3">
                        {
                            finalList.map(element =>
                                <div className="col-md-4">
                                    <HealthFileListItem
                                        ficheMedicalItem={element}
                                        editFicheMedicalShowModal={this.editFicheMedicalShowModal}


                                    />
                                </div>

                            )
                        }




                    </div> : ""
                }
                {
                    this.state.editIsopen === true ?
                        <EditHealthFile
                            editIsopen={this.state.editIsopen}
                            values={this.state}
                            handleCancel={this.handleCancel}
                            handleChange={this.handleChange}
                            handleChangestudentSection={this.handleChangestudentSection}
                            handleChangestudentLevel={this.handleChangestudentLevel}
                            handleChangeClass={this.handleChangeClass}
                            onDrop={this.onDrop}
                            handleChangeStudent={this.handleChangeStudent}
                            addHealthFile={this.addHealthFile}
                            handleCheck={this.handleCheck}
                            editHealthFile={this.editHealthFile}

                        /> : ""
                }
            </div>

        )
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
      ficheMedicalList: state.HealthReducer.remoteFicheMedical
    };
  }
  
  export default connect(
    mapStateToProps,
    {
    
      getSections,
      getLevels,
      getLevelsVirtualClass,
       editFicheMedical
    }
  )(HealthFileList);
