
import React from 'react';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import { addAndAssignHomework, fetchProfessorBySubject } from '../../../../../actions/ToDo';
import InputLabel from '@material-ui/core/InputLabel';
import { classService } from "../../../../../_services/class.service";
import CardBox from '../../../../../components/CardBox/index';
// import { getSectionsByLevelId } from "../../../../../actions/sectionAction";
import { subjectsByLevelBySection } from '../../../../../actions/subjectAction'
import { roleIdProfessor, roleIdAdmin } from '../../../../../config/config';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import _ from "lodash";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { element } from 'prop-types';
import moment from 'moment'


class AddHomework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: true,
            levels: [],
            sections: [],
            subjects: [],
            professors: [],
            classes: [],
            title: '',
            subject_id: '',
            levelId: null,
            classId: null,
            description: '',
            correctionDate: new Date(),


            professor_id: 0,
            sectionsDisable: true,
            modal: false,
            pictures: [],
            file: null,
            fileList: null,
            inputText: '',
            assignHomeworkList: [{ id: 0 }],

            subjectsAffectedToProf: [],
            subjectError: false,
            professorError: false,
            educationTypeId: null
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeSubject = this.handleChangeSubject.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.handleChangeSection = this.handleChangeSection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.assignCorrectionDate = this.assignCorrectionDate.bind(this);
        this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
    };

    handleChangeProfessor = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleChange = name => event => {
        if (name === 'educationTypeId') {
            let educationType = this.props.establishmentData.filter(element => element.id === event.target.value)
            this.setState({ levels: educationType[0].levels });
        } else { this.setState({ [name]: event.target.value, })}
    }

    handleChangeLevel = name => event => {
        let level = this.state.levels.filter(element => element.id === event.target.value)
        let classes = this.props.classes.filter(element => element.fk_id_level_v3 === event.target.value)
        this.setState({ sections: level[0].sections, subjects: level[0].subjectsLevelsSections, classes })
        if (!_.isEmpty(level[0].sections)) {
            this.setState({ sectionsDisable: false, [name]: event.target.value })
        } else {
            this.setState({ sectionsDisable: true })
        }

        // let classes = this.state.classes.filter(element => element.level_id === event.target.value)
        // let sections = this.props.sections.filter(element => element.fk_id_level_v3 === event.target.value)
        // this.setState({ classes, sections })
        // let levelId = event.target.value;

        // if (this.props.userProfile.role_id === roleIdProfessor) {
        //     let data = this.state.subjectsAffectedToProf;
        //     let listSubject = subjectsByLevelBySection(this.props.subjects, levelId, 0);
        //     let dataSubjectsFiltred = []
        //     data.forEach(item => {
        //         let dataFiltred = listSubject.filter(element => element.id === item)
        //         if (!_.isEmpty(dataFiltred[0])) {
        //             dataSubjectsFiltred.push(dataFiltred[0])
        //         }
        //         this.setState({ subjects: dataSubjectsFiltred, levelId: levelId });
        //     });

        // } else {
        //     this.setState({ levelId: levelId, professor_id: 0 });
        // }


    }

    handleChangeSection = name => event => {
        let section = this.state.sections.filter(element => element.id === event.target.value)
        let classes = this.props.classes.filter(element => element.fk_id_level_v3 === this.state.levelId && element.fk_id_section_v3 === event.target.value)
        this.setState({ subjects: section[0].subjectsLevelsSection, classes })
        
        // let sectionId = event.target.value;
        // if (this.props.userProfile.role_id === roleIdProfessor) {
        //     let data = this.state.subjectsAffectedToProf;
        //     let listSubject = subjectsByLevelBySection(this.props.subjects, this.state.levelId, sectionId);
        //     let dataSubjectsFiltred = []
        //     data.forEach(item => {
        //         let dataFiltred = listSubject.filter(element => element.id === item)
        //         if (!_.isEmpty(dataFiltred[0])) {
        //             dataSubjectsFiltred.push(dataFiltred[0])
        //         }
        //         this.setState({ subjects: dataSubjectsFiltred });
        //     });
        // } else {
        //     this.setState({ subjects: subjectsByLevelBySection(this.props.subjects, this.state.levelId, sectionId) })
        // }
    }
    handleChangeSubject = name => event => {
        this.setState({ [name]: event.target.value });
        if (this.props.userProfile.role_id === roleIdAdmin) {
            let professors = this.props.subjectsProfessors.filter(element => element.subject_id === event.target.value)
            this.setState({ professor_id: 0, professors })
        }
    };

    componentDidMount() {
        // let levelsAffectedToProf = []
        if (this.props.userProfile.role_id === roleIdProfessor) {
            // let apiEndpoint = `/professors?access_token=${localStorage.token}&filter[where][profile_id]=` + this.props.userProfile.id + `&filter[include][profSubjects][subject]`
            // classService.get(apiEndpoint)
            //     .then(res => {
            //         if (res) {
            //             const professorsData = res.data;

            //             let subjectsAffectedToProf = _.map(professorsData[0].profSubjects, 'subject_id')
            //             let levelsId = _.uniqBy(_.map(professorsData[0].profSubjects, 'level_id'))
            //             _.forEach(levelsId, function (value) {
            //                 levelsAffectedToProf.push({ 'id': value })
            //             });
            //             let levels = _.intersectionBy(this.props.levels, levelsAffectedToProf, 'id');
            //             this.setState({
            //                 subject: professorsData[0].profSubjects, professor_id: professorsData[0].profSubjects[0].professor_id, subjectsAffectedToProf: subjectsAffectedToProf,
            //                 levels: levels
            //             })
            //         }
            //     });

            // this.setState({ classes: this.props.classesList })
        } else {
            this.props.dispatch(fetchProfessorBySubject(this.props.userProfile.establishment_id));

        }

    }

    handleCancel() {
        this.props.cancelModal();
    };

    assignCorrectionDate = name => event => {
        this.setState({ [name]: event._d })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.subject_id === '') {
            this.setState({ subjectError: true })
        } else if (this.state.professor_id === 0 && this.props.userProfile.role_id === roleIdAdmin) {
            this.setState({ professorError: true })
        } else {
            const data = {
                 title:this.state.title,
                 description: this.state.description, 
                 date_creation: new Date(), 
                 professor_id: this.state.professor_id, 
                 subject_id: this.state.subject_id,
                 establishment_id: this.props.userProfile.establishment_id,
                 files_name: this.state.inputText,
                 classId: this.state.classId,
                 correctionDate : this.state.correctionDate,
                };
             this.props.dispatch(addAndAssignHomework(data, this.state.fileList));
            
            this.setState({
                title: '',
                subject_id: 0,
                description: '',
                professor_id: 0,
                classId: null,
                correctionDate: null,
            });
            this.props.cancelModal();
        }
    };
    onDrop = e => {
        let file = e.target.files[0]
        this.setState({
            fileList: file,
            inputText: file.name
        });
    };
    render() {

        let { sectionsDisable, subjects, professors, classes, levels, sections } = this.state;
        let { establishmentData } = this.props
        return (
            <Auxiliary>
                <Modal isOpen={this.state.previewVisible}>
                    <ModalHeader className="modal-box-header bg-primary text-white"
                        toggle={this.handleCancel}
                    >
                        {<IntlMessages id="modal.addToDo" />}
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <RoleContext.Consumer>
                                {({ role }) => (
                                    <Can
                                        role={role}
                                        perform="homework-filter:visit"
                                        yes={() => (
                                            <div>
                                                <CardBox styleName="col-lg-12 text-primary" heading={<IntlMessages id="component.etablishments.info.general" />} >
                                                    <div className="row">
                                                        <div className="col-md-4">

                                                            <TextField
                                                                id="educationTypeId"
                                                                name="educationTypeId"
                                                                select
                                                                defaultValue=" "
                                                                onChange={this.handleChange("educationTypeId")}
                                                                SelectProps={{}}
                                                                label={<IntlMessages id="educational.system" />}
                                                                margin="normal"
                                                                fullWidth
                                                            >

                                                                {establishmentData.map((educationType) => (
                                                                    <MenuItem key={educationType.id} value={educationType.id}>
                                                                        {educationType.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>

                                                        </div>
                                                        <div className="col-md-4">

                                                            <TextField
                                                                id="levelId"
                                                                name="levelId"
                                                                select
                                                                defaultValue=" "
                                                                onChange={this.handleChangeLevel("levelId")}
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
                                                        <div className="col-md-4">

                                                            <TextField
                                                                id="section_id"
                                                                name="section_id"
                                                                select
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
                                                                {subjects.map(item => (
                                                                    <MenuItem key={item.subject.id} value={item.subject.id}>
                                                                        {item.subject.name}
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
                                                                        {professors.map((option) => (
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
                                                                variant="outlined"
                                                                multiline
                                                                rows={3}
                                                                id="description"
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


                                                    <div className="row" >
                                                        <div className="col-sm-6">

                                                            <FormControl className="w-100 mb-2">
                                                                <InputLabel htmlFor="age-simple">{<IntlMessages id="sidebar.classes" />}</InputLabel>
                                                                <Select
                                                                    required
                                                                    native
                                                                    onChange={this.handleChange("classId")}
                                                                    name="classId"
                                                                    value={this.state.classId}
                                                                    inputProps={{
                                                                        id: 'classId-native-required',
                                                                    }}
                                                                    input={<Input id="classe" />}
                                                                >
                                                                    <option></option>
                                                                    {classes.map(itemClass => (
                                                                        <option key={itemClass.id} value={itemClass.id}>
                                                                            {itemClass.name}
                                                                        </option>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-sm-6">

                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDatePicker
                                                                    label={<IntlMessages id="toDo.correctionDate" />}
                                                                    fullWidth
                                                                    name="correctionDate"
                                                                    value={this.state.correctionDate}
                                                                    onChange={this.assignCorrectionDate("correctionDate")}
                                                                    format='dddd DD MMMM Y'
                                                                    autoOk
                                                                    minDate={new Date()}
                                                                    required
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div>



                                                </CardBox>
                                                <div className="col-sm-12 pt-4">
                                                    <h4><font color="red">*</font> {<IntlMessages id="component.required_fields" />}</h4>
                                                </div>
                                                <div className="col-md-12 text-left ">
                                                    <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="components.establishments.formadd.buttonAdd" />}</Button>
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
        levels: state.levelsReducer.levels,
        // subjects: state.subject.subjects,
        sections: state.SectionsReducer.Section,
        classes: state.ClassSettingsReducer.classSettings,
        subjectsProfessors: state.toDo.subjectsProfessors,
    }
}
export default connect(mapStateToProps)(AddHomework);