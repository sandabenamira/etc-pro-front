
import React from 'react';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import { editHomework ,fetchProfessorBySubject} from '../../../../../actions/ToDo';
import { getName } from "../../../../../actions/countriesAction";
import InputLabel from '@material-ui/core/InputLabel';
import { classService } from "../../../../../_services/class.service";
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import _ from "lodash";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import CardBox from '../../../../../components/CardBox/index';
import { roleIdProfessor, roleIdAdmin } from '../../../../../config/config';
import { getSectionsByLevelId } from "../../../../../actions/sectionAction";
import { subjectsByLevelBySection, getSubjectsForProf } from '../../../../../actions/subjectAction'
import { getLevelsAndSubjectsForProf } from '../../../../../actions/classLevelAction';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';


class EditHomework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: true,
            title: '',
            subject_id: '',
            description: '',
            professor_id: 0,
            professorsList: [],
            subject: [],
            levels: [],
            modal: false,
            pictures: [],
            file: null,
            fileList: null,
            inputText: '',
            assignHomeworkList: [{ id: 0 }],
            sectionsDisable: true,
            level_id: 0,
            subjectsAffectedToProf: [],
            classes: [],
            subjectList: [],
            section_id: 0,
            active: '',
            subjectError: false,
            professorError:false,
            classesFiltredByLevel:[]
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.handleChangeSection = this.handleChangeSection.bind(this);
        this.handleChangeSubject = this.handleChangeSubject.bind(this);
        this.assignClass = this.assignClass.bind(this);
        this.assignNewClass = this.assignNewClass.bind(this);
        this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
    };
    handleChangeProfessor= name => event => {
        let apiEndpoint = `/classes_professors/?access_token=${localStorage.token}&filter[include][class]&filter[where][professor_id]=` + event.target.value;
           classService.get(apiEndpoint)
             .then(res => {
              if(res){                  
                 let classesListForProf= _.uniqBy(_.map(res.data, 'class'), 'id');                 
                 let newClassesList = classesListForProf.filter(element => element.level_id === this.state.level_id)                 
                 this.setState({classesFiltredByLevel:newClassesList})
              }  
             })
         this.setState({
             [name]: event.target.value,
         });
     }

    assignNewClass = index => {
        this.setState(prevState => ({
            assignHomeworkList: [
                ...prevState.assignHomeworkList,
                {
                    id: index

                }
            ]
        }));
    };

    assignClass(event, name, index) {
        if (name === "classId") {
            let newList = this.state.assignHomeworkList.map(objSubject =>
                objSubject.id === index
                    ? { ...objSubject, classId: event.target.value }
                    : objSubject
            )
            this.setState({ assignHomeworkList: newList })

        } else {
            let newList = this.state.assignHomeworkList.map(objSubject =>
                objSubject.id === index
                    ? { ...objSubject, correctionDate: event._d }
                    : objSubject
            )
            this.setState({ assignHomeworkList: newList })

        }
    }

    handleChangeSubject = name => event => {
        this.setState({ [name]: event.target.value });
        if (this.props.userProfile.role_id === roleIdAdmin) {
            let listProfByEstablishment = this.props.subjectsProfessors.filter(element => element.subject_id === event.target.value)
              this.setState({ professor_id: 0 , professorsList: listProfByEstablishment})
         }
    };

    handleChangeLevel = name => event => {
        let classesFiltredByLevel = this.state.classes.filter(element => element.level_id === event.target.value)
        this.setState({ classesFiltredByLevel })

        let levelId = event.target.value;
        if (levelId > 10) {
            this.setState({ sectionsDisable: false, subject_id: '' })
        } else {
            if (this.props.userProfile.role_id === roleIdProfessor) {
                this.setState({ level_id: levelId, subject_id: '' });
                this.props.dispatch(getSubjectsForProf(this.props.userProfile.id))
            } else {
                this.setState({ subjectList: subjectsByLevelBySection(this.props.subjects, levelId, 0), level_id: levelId, subject_id: '', professor_id:0 });
            }

        }
        this.props.dispatch(getSectionsByLevelId(levelId))

    }
    handleChangeSection = name => event => {
        let sectionId = event.target.value;
        if (this.props.userProfile.role_id === roleIdProfessor) {
            let data = this.state.subjectsAffectedToProf;
            let listSubject = subjectsByLevelBySection(this.props.subjects, this.state.level_id, sectionId);
            let dataSubjectsFiltred = []
            data.forEach(item => {
                let dataFiltred = listSubject.filter(element => element.id === item)
                if (!_.isEmpty(dataFiltred[0])) {
                    dataSubjectsFiltred.push(dataFiltred[0])
                }

                this.setState({ subjectList: dataSubjectsFiltred });
            });
        } else {
            this.setState({ subjectList: subjectsByLevelBySection(this.props.subjects, this.state.level_id, sectionId) })
        }
    }
    componentDidMount() {
        let data = this.props.homework
         let apiEndpoint = `/subjects/${data.subject_id}?access_token=${localStorage.token}`;
        classService.get(apiEndpoint)
            .then((response) => {
                if (response) {
                    let levelId = response.data.level_id;
                    this.setState({ level_id: response.data.level_id, section_id: response.data.section_id })
                    this.props.dispatch(getSectionsByLevelId(response.data.level_id))
                    if (levelId > 10) {
                        this.setState({ sectionsDisable: false })
                    }
                    if (this.props.userProfile.role_id === roleIdProfessor) {
                        this.props.dispatch(getLevelsAndSubjectsForProf(this.props.userProfile.id))
                        
                        this.setState({ classes: this.props.classesList , classesFiltredByLevel:this.props.classesList })
                    } else {
                        let subjectList = this.props.subjects.filter(element => element.level_id === levelId)
                        this.props.dispatch(fetchProfessorBySubject(this.props.userProfile.establishment_id));             
                        this.setState({ classes: this.props.classes, levels: this.props.levels, subjectList: subjectList , classesFiltredByLevel:this.props.classes, professorsList : [data]})
                    }
                }
            })


        let homeworkClass = []
        if (!_.isEmpty(data.homeworkClass)) {

            data.homeworkClass.forEach(element => {
                let obj = {
                    'id': data.homeworkClass.indexOf(element),
                    'classId': element.class_id,
                    'correctionDate': element.correction_date
                }
                homeworkClass.push(obj)
            });
        } else {
            homeworkClass = [{ id: 0 }];
        }

        this.setState({
            title: data.title,
            description: data.description,
            professor_id: data.professor_id,
            subject_id: data.subject_id,
            assignHomeworkList: homeworkClass,
            inputText: data.files_name,
            active: data.active

        })

    }
    componentDidUpdate(prevProps) {
        if ((prevProps.levels !== this.props.levels)) {
            this.setState({ levels: this.props.levels })
        }
        if ((prevProps.subjectsProf !== this.props.subjectsProf)) {
            let list = this.props.subjectsProf.filter(element => element.level_id === this.state.level_id)
            this.setState({ subjectList: list })
        }
    }
    handleCancel() {
        this.props.cancelModal();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.subject_id === '') {
            this.setState({ subjectError: true })
        } else if (this.state.professor_id === 0) {
            this.setState({ professorError: true })
        }
        else {
            let date = new Date();
            const title = this.state.title;
            const description = this.state.description;
            const date_creation = date;
            const professor_id = this.state.professor_id;
            const subject_id = this.state.subject_id;
            let files = this.props.homework.files
            const establishment_id = this.props.userProfile.establishment_id
            const newFile = this.state.fileList
            const files_name = this.state.inputText;
            const id = this.props.homework.id
            const assignHomeworkList = this.state.assignHomeworkList;
            const active = this.state.active

            const data = { id, active, title, files_name, description, date_creation, professor_id, subject_id, establishment_id, newFile, assignHomeworkList, files };
            this.props.dispatch(editHomework(data, files));

            this.setState({
                title: '',
                subject_id: 0,
                description: '',
                professor_id: 0,
                assignHomeworkList: [{ id: 0 }]
            });
            this.props.cancelModal();
        }
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onDrop = e => {
        let file = e.target.files[0]
        this.setState({
            fileList: file,
            inputText: file.name
        });
    };





    render() {
        let { sections } = this.props;
        let { sectionsDisable, subjectList, assignHomeworkList, professorsList, classesFiltredByLevel, levels } = this.state;
        return (
            <Auxiliary>
                <Modal isOpen={this.state.previewVisible}>
                    <ModalHeader className="modal-box-header bg-primary text-white"
                        toggle={this.handleCancel}
                    >
                        {<IntlMessages id="modal.editToDo" />}
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleSubmit}>
                            <RoleContext.Consumer>
                                {({ role }) => (
                                    <Can
                                        role={role}
                                        perform="homework-filter:visit"
                                        yes={() => (
                                            <div>
                                                <CardBox styleName="col-lg-12 text-primary" heading={<IntlMessages id="component.etablishments.info.general" />} >
                                                    <div className="row">
                                                        <div className="col-md-6">

                                                            <TextField
                                                                id="level_id"
                                                                name="level_id"
                                                                select
                                                                value={this.state.level_id}
                                                                onChange={this.handleChangeLevel()}
                                                                SelectProps={{}}
                                                                label={<IntlMessages id="components.note.niveau" />}
                                                                margin="normal"
                                                                fullWidth
                                                            >
                                                                {levels.map((level) => (
                                                                    <MenuItem key={level.id} value={level.id}>
                                                                        {level.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>

                                                        </div>
                                                        <div className="col-md-6">

                                                            <TextField
                                                                id="section_id"
                                                                name="section_id"
                                                                select
                                                                value={this.state.section_id}
                                                                onChange={this.handleChangeSection()}
                                                                disabled={sectionsDisable}
                                                                SelectProps={{}}
                                                                label={<IntlMessages id="components.class.level.input.label.section" />}
                                                                margin="normal"
                                                                fullWidth
                                                            >
                                                                {sections.map((section) => (
                                                                    <MenuItem key={section.id} value={section.id}>
                                                                        {section.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>

                                                        </div>
                                                        <div className="col-sm-6">
                                                            <TextField
                                                                required
                                                                select
                                                                id="subject_id"
                                                                name='subject_id'
                                                                label={<IntlMessages id="sidebar.subjects" />}
                                                                error={this.state.subjectError}
                                                                value={this.state.subject_id}
                                                                onChange={this.handleChangeSubject('subject_id')}
                                                                margin="normal"
                                                                fullWidth
                                                            >
                                                                {subjectList.map(subject => (
                                                                    <MenuItem key={subject.id} value={subject.id}>
                                                                        {getName(subject)}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                            <FormHelperText error={this.state.subjectError}>
                                                                {this.state.subjectError
                                                                    ? <IntlMessages id="message.seclect.subject" />
                                                                    : ''}
                                                            </FormHelperText>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <TextField
                                                                required
                                                                id="title"
                                                                label={<IntlMessages id="toDo.titre" />}
                                                                value={this.state.title}
                                                                onChange={this.handleChange('title')}
                                                                margin="normal"
                                                                fullWidth />
                                                        </div>
                                                        <Can
                                                            role={role}
                                                            perform="homework-filter-professor:visit"
                                                            yes={() => (
                                                                <div className="col-md-6">

                                                                    <TextField
                                                                        id="professor_id"
                                                                        name="professor_id"
                                                                        select
                                                                        label={<IntlMessages id="toDo.professor" />}
                                                                        error={this.state.professorError}
                                                                        value={this.state.professor_id}
                                                                        onChange={this.handleChangeProfessor('professor_id')}
                                                                        SelectProps={{}}
                                                                        margin="normal"
                                                                        fullWidth
                                                                    >
                                                                        {professorsList.map((option) => (
                                                                            <MenuItem
                                                                                key={option.professor.id}
                                                                                value={option.professor.id}
                                                                            >
                                                                                {option.professor.profile.user.name +
                                                                                    ' ' +
                                                                                    option.professor.profile.user.surname}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                    <FormHelperText error={this.state.professorError}>
                                                                        {this.state.professorError
                                                                            ? <IntlMessages id="message.error.seclect.professor" />
                                                                            : ''}
                                                                    </FormHelperText>

                                                                </div>

                                                            )}
                                                        />

                                                        <div className="col-sm-12">
                                                            <TextField
                                                                name='description'
                                                                multiline
                                                                rows={3}
                                                                id="description"
                                                                variant="outlined"
                                                                label={<IntlMessages id="room.description" />}
                                                                onChange={this.handleChange('description')}
                                                                value={this.state.description}
                                                                margin="normal"
                                                                fullWidth
                                                            />
                                                        </div>
                                                    </div>
                                                </CardBox>

                                                <CardBox styleName="col-lg-12 text-primary" heading={<IntlMessages id="stuppUser.formadd.file" />} >

                                                    <div className="row">
                                                        <div className="col-sm-12 pt-3">
                                                            <InputLabel htmlFor="name-multiple">{<IntlMessages id="components.homework.task" />}</InputLabel> <br />
                                                            <label htmlFor="files" className="btn" style={{ cursor: "pointer", color: "white", fontWeight: "bold", backgroundColor: '#4B58B9', borderRadius: '4rem' }} ><strong>{<IntlMessages id="stuppUser.formadd.file" />}</strong></label> <label htmlFor="files" className="btn">{this.state.inputText}</label>
                                                            <input id="files" type="file" style={{ visibility: "hidden" }} onChange={(e) => this.onDrop(e)} accept="application/pdf,image/*, application/txt" />
                                                        </div>
                                                    </div>
                                                </CardBox>
                                                <CardBox styleName="col-12" heading={<IntlMessages id="modal.assign_homework" />} >
                                                    <div >
                                                        {
                                                            assignHomeworkList.map((val, index) => {
                                                                return (
                                                                    <div className="row" key={index}>
                                                                        <div className="col-sm-5">
                                                                            <FormControl className="w-100 mb-2">
                                                                                <InputLabel htmlFor="age-simple">{<IntlMessages id="sidebar.classes" />}</InputLabel>
                                                                                <Select
                                                                                    required
                                                                                    id={`${index}`}
                                                                                    onChange={event =>
                                                                                        this.assignClass(event, "classId", index)
                                                                                    }
                                                                                    name="classId"
                                                                                    value={val.classId}
                                                                                    input={<Input id="classe" />}
                                                                                >
                                                                                    {classesFiltredByLevel.map(itemClass => (
                                                                                        <MenuItem key={itemClass.id} value={itemClass.id}>
                                                                                            {itemClass.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className="col-sm-5">

                                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                                <KeyboardDatePicker
                                                                                    label={<IntlMessages id="toDo.correctionDate" />}
                                                                                    fullWidth
                                                                                    id={`${index}`}
                                                                                    name="correctionDate"
                                                                                    value={val.correctionDate}
                                                                                    onChange={event =>
                                                                                        this.assignClass(event, "correctionDate", index)
                                                                                    }
                                                                                    format='dddd DD MMMM Y'
                                                                                    autoOk
                                                                                    minDate={new Date()}
                                                                                    minDateMessage=''
                                                                                    required
                                                                                />
                                                                            </MuiPickersUtilsProvider>
                                                                        </div>


                                                                        {/* <div className="col-sm-2">
                                                                            <Fab
                                                                                size="small"
                                                                                value={`${index}`}
                                                                                color="primary"
                                                                                aria-label="Add"
                                                                                onClick={() => this.assignNewClass(index + 1)}
                                                                            >
                                                                                <AddIcon />
                                                                            </Fab>
                                                                        </div> */}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </CardBox>
                                                <div className="col-sm-12 pt-4">
                                                    <h4><font color="red">*</font> {<IntlMessages id="component.required_fields" />}</h4>
                                                </div>
                                                <div className="col-md-12 text-left ">
                                                    <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="button.modify" />}</Button>
                                                    <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
                                                </div>
                                            </div>

                                        )}
                                    />
                                )}
                            </RoleContext.Consumer>
                        </form>
                    </ModalBody>

                </Modal>
            </Auxiliary>

        )
    };
}
const mapStateToProps = (state) => {
    return {
        userProfile: state.auth.userProfile,
        levels: state.ClassLevels.remoteLevels,
        subjects: state.subject.remoteSubjects,
        sections: state.classSections.remoteSections,
        classes: state.classes,
        subjectsProf: state.subject.subjectsProf,
        subjectsProfessors: state.toDo.subjectsProfessors
    }
}
export default connect(mapStateToProps)(EditHomework);

