import React, { Component } from 'react';
import IntlMessages from '../../../util/IntlMessages';
import Auxiliary from '../../../util/Auxiliary';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import CardBox from '../../../components/CardBox/index';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import MenuItem from '@material-ui/core/MenuItem';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import moment from 'moment';
import { TimePicker } from '@material-ui/pickers';
import { connect } from 'react-redux';
import { getSections } from '../../../actions/sectionAction';
import { getLevels } from '../../../actions/classLevelAction';
import { getClassesByEstablishmentId } from '../../../actions/classeAction';
import { getLevelListFromEstabType } from '../../../actions/classLevelAction';
import axios from 'axios';
import baseUrl from '../../../config/config';
import { subjectsByLevelBySection } from '../../../actions/subjectAction';
import { element } from 'prop-types';


class EditHealthFile extends Component {

    render() {

        const {
            values,
            editIsopen,
            handleCancel,
            handleChange,
            handleChangestudentSection,
            handleChangestudentLevel,
            handleChangeClass,
            handleChangeStudent,
            handleCheck
        } = this.props;



        // var maladiesList = [
        //     {
        //         "id":1,
        //         "title":(<IntlMessages id="new.health.yeux" />)
        //     },
        //     {
        //         "id":2,
        //         "title":<IntlMessages id="new.health.coeur" />
        //     },
        //     {
        //         "id":3,
        //         "title":<IntlMessages id="new.health.cutane" />
        //     },
        //     {
        //         "id":4,
        //         "title":<IntlMessages id="new.health.system.res" />
        //     },
        //     {
        //         "id":5,
        //         "title":<IntlMessages id="new.health.oreilles" />
        //     },
        //     {
        //         "id":6,
        //         "title":<IntlMessages id="new.health.tension" />
        //     },
        //     {
        //         "id":7,
        //         "title":<IntlMessages id="new.health.system.musc" />
        //     },
        //     {
        //         "id":8,
        //         "title":<IntlMessages id="new.health.sys.respiratoire" />
        //     },
        //     {
        //         "id":9,
        //         "title":<IntlMessages id="new.health.sys.nerveux" />
        //     }

        // ]

        return (
            <Auxiliary>
                <Modal isOpen={this.props.editIsopen}>
                    <ModalHeader
                        toggle={this.props.handleCancel}
                        className="modal-box-header bg-primary text-white"
                    >
                        {<IntlMessages id="new.health.title" />}
                    </ModalHeader>
                    <br />
                    <ModalBody>
                        <form autoComplete="off">
                            <div className="row">

                                <CardBox
                                    heading={
                                        <IntlMessages id="component.student.info.general" />
                                    }
                                    styleName="col-lg-12 text-primary"
                                >
                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField
                                                    id="level_id"
                                                    name="level_id"
                                                    select

                                                    value={values.level_id}
                                                    defaultValue=" "
                                                    SelectProps={{}}
                                                    helperText={<IntlMessages id="components.class.level.input.label.level" />}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                 {values.levelsbyestablishment.map((level) => (
                                                        <MenuItem key={level.id} value={level.id}>
                                                            {this.props.settings.languageId == 'tunisia'
                                                                ? level.name_AR
                                                                : this.props.settings.languageId == 'french'
                                                                    ? level.name_FR
                                                                    : level.name_EN}
                                                        </MenuItem>
                                                    ))} 
                                                </TextField>
                                            </div>
                                        </div>


                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField
                                                    id="section_id"
                                                    name="section_id"
                                                    select
                                                    value={values.section_id}
                                                   // onChange={handleChangestudentSection('section_id')}
                                                   disabled={values.Disable_studentsection}
                                                    SelectProps={{}}
                                                    helperText={<IntlMessages id="components.class.level.input.label.section" />}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                    {values.studentsectionByLevels.map((section) => (
                                                        <MenuItem key={section.id} value={section.id}>
                                                            {section.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                        </div>


                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField
                                                    id="class_id"
                                                    name="class_id"
                                                    select
                                                   value={values.class_id}
                                                   // onChange={handleChangeClass('class_id')}
                                                    SelectProps={{}}
                                                    helperText={<IntlMessages id="ticket.name.class" />}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                  {values.studentClassesByLevelSectionID.map(
                                                        (classe) => (
                                                            <MenuItem key={classe.id} value={classe.id}>
                                                                {classe.name}
                                                            </MenuItem>
                                                        )
                                                    )} 
                                                </TextField>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    id="professor_id"
                                                    name="professor_id"
                                                    select
                                                   value={values.student_id}
                                                  //  onChange={handleChangeStudent('student_id')}
                                                    SelectProps={{}}
                                                    helperText={<IntlMessages id="userStuppDisplay.Student" />}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                    {values.studentByclassID.map(
                                                        (student) => (
                                                            <MenuItem key={student.id} value={student.id}>
                                                                {student.profile.user.name + ' ' + student.profile.user.surname}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </TextField>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    id="blood_type"
                                                    name="blood_type"
                                                    select
                                                    value={values.blood_type}
                                                   // onChange={handleChange('blood_type')}
                                                    SelectProps={{}}
                                                    helperText={<IntlMessages id="new.health.blood.type" />}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                    {values.blood_group.map(
                                                        (blood) => (
                                                            <MenuItem key={blood.id} value={blood.id}>
                                                                {blood.type}
                                                            </MenuItem>
                                                        )
                                                    )} 
                                                </TextField>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    required
                                                    name="poids"
                                                    id="poids"
                                                    type="number"
                                                    label={<IntlMessages id="new.health.poids" />}
                                                   onChange={handleChange('poids')}
                                                  value={values.poids}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    required
                                                    name="hauteur"
                                                    id="hauteur"
                                                    type="number"
                                                    label={<IntlMessages id="new.health.hauteur" />}
                                                onChange={handleChange('hauteur')}
                                                   value={values.hauteur}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>




                                    </div>
                                </CardBox>

                                <CardBox
                                    heading={<IntlMessages id="new.health.maladies.title" />}
                                    styleName="col-lg-12 text-primary"
                                >

                                    <div className="row">
                                        {values.data.map((element) => (
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <FormControlLabel
                                                        value={element.id}
                                                        control={
                                                            <Checkbox
                                                               checked={values.checkedValues.includes(element.id)}
                                                                color="primary"
                                                                onChange={handleCheck}
                                                            />
                                                        }
                                                        label={element.name}
                                                        labelPlacement={element.name}
                                                    />
                                                </div>
                                            </div>
                                        ))} 




                                    </div>



                                </CardBox>
                                <CardBox
                                    heading={
                                        <IntlMessages id="new.health.medecin.details" />
                                    }
                                    styleName="col-lg-12 text-primary"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    required
                                                    name="nom_doctor"
                                                    id="nom_doctor"
                                                    label={<IntlMessages id="components.establishments.formadd.name" />}
                                                   onChange={handleChange('nom_doctor')}
                                                   value={values.nom_doctor}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    required
                                                    name="prenom_doctor"
                                                    id="prenom_doctor"
                                                    label={<IntlMessages id="components.establishments.formadd.surname_director" />}
                                                   onChange={handleChange('prenom_doctor')}
                                                    value={values.prenom_doctor}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    required
                                                    name="phone_doctor"
                                                    id="phone_doctor"
                                                    label={<IntlMessages id="stuppUser.formadd.phone" />}
                                                   onChange={handleChange('phone_doctor')}
                                                   value={values.phone_doctor}
                                                    margin="normal"
                                                    type="number"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    required
                                                    name="mail_doctor"
                                                    id="mail_doctor"
                                                    label={<IntlMessages id="appModule.email" />}
                                                    onChange={handleChange('mail_doctor')}
                                                    value={values.mail_doctor}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </CardBox>
                                <CardBox
                                    heading={
                                        <IntlMessages id="new.health.remarqque" />
                                    }
                                    styleName="col-lg-12 text-primary"
                                >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <TextField
                                                    required
                                                    name="remarque"
                                                    id="remarque"
                                                    variant="outlined"
                                                    label={<IntlMessages id="components.note.student.comment" />}
                                                    onChange={handleChange('remarque')}
                                                    value={values.remarque}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </CardBox>
                                <CardBox
                                    heading={
                                        <IntlMessages id="new.health.fiche.title" />
                                    }
                                    styleName="col-lg-12 text-primary"
                                >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">


                                                <InputLabel htmlFor="name-multiple">

                                                </InputLabel>{' '}
                                                <br />
                                                <label
                                                    htmlFor="files"
                                                    className="btn"
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#4C19A9',
                                                        borderRadius: '4rem'
                                                    }}
                                                >
                                                    <strong>
                                                        {
                                                            <IntlMessages id="course.file" />
                                                        }
                                                    </strong>
                                                </label>{' '}
                                                <label htmlFor="files" className="btn">

                                                    {/* {values.inputText} */}
                                                </label>
                                                <input
                                                    id="files"
                                                    type="file"
                                                    style={{ visibility: 'hidden' }}
                                                    onChange={this.props.onDrop}
                                                    accept="application/pdf,image/*"
                                                    multiple
                                                />

                                            </div>
                                        </div>


                                    </div>
                                </CardBox>
                            </div>
                            <div className="col-md-12 text-right ">
                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    className="jr-btn bg-indigo text-white "
                                   onClick={this.props.editHealthFile}
                                >
                                    {
                                        <IntlMessages id="components.establishments.formadd.buttonAdd" />
                                    }
                                </Button>
                                <Button
                                    variant="contained"
                                    className="jr-btn bg-grey text-white "
                                    onClick={this.props.handleCancel}
                                >
                                    {
                                        <IntlMessages id="components.establishments.formadd.buttonCancel" />
                                    }
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </Auxiliary>
        )
    }
}



function mapStateToProps(state) {
    return {
        userProfile: state.auth.userProfile,
        classLevels: state.ClassLevels.remoteLevels,
        classSections: state.classSections.remoteSections,
        classes: state.classes,
        settings: state.settings.locale,

    };
}
export default connect(
    mapStateToProps,
    {
        getSections,
        getLevels,
        getClassesByEstablishmentId,
    }
)(EditHealthFile);
