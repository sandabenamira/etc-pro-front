import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from '../../../../../util/IntlMessages';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import { getSubjectName } from "../../../../../actions/subjectAction";
import _ from 'lodash';
import moment from 'moment';
import { TimePicker, DatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { classService } from '../../../../../_services/class.service';
import { handleSubmitEdit } from "../../../../../actions/planningActions";
import { connect } from "react-redux";






const range = [
    {
        value: 1,
        label: <IntlMessages id="calandar.popup.edit.event.seul" />,
    },
    {
        value: 2,
        label: <IntlMessages id="calandar.popup.edit.event.tous" />,
    },
    // {
    //     value: 3,
    //     label: <IntlMessages id="calandar.popup.edit.event.range" />,
    // },

];

const frequency = [
    // {
    //     value: 'quotidien',
    //     label: <IntlMessages id="data.daily" />,
    // },
    {
        value: 'hebdomadaire',
        label: <IntlMessages id="data.weekly" />,
    },
    {
        value: 'Quinzomadaire',
        label: <IntlMessages id="data.fortnightly" />,
    },
    // {
    //     value: 'mensuelle',
    //     label: <IntlMessages id="mode_payment.establishment.monthly" />,
    // },
    // {
    //     value: 'trimestriel',
    //     label: <IntlMessages id="mode_payment.establishment.trimester" />,
    // },
    {
        value: 'annuel',
        label: <IntlMessages id="mode_payment.establishment.annual" />,
    },

];
const eventType = [
    {
        value: 'lesson',
        label: <IntlMessages id="eventType.lesson" />,
    },
    {
        value: 'meeting',
        label: <IntlMessages id="eventType.meeting" />,
    },
    {
        value: 'party',
        label: <IntlMessages id="eventType.party" />,
    },
    {
        value: 'exam',
        label: <IntlMessages id="components.note.exam" />,
    },
    {
        value: 'Class Council',
        label: <IntlMessages id="eventType.classCouncil" />,
    },
    {
        value: 'Trip',
        label: <IntlMessages id="eventType.trip" />,
    },
    {
        value: 'Rattrapage',
        label: <IntlMessages id="eventType.catchUpSession" />,
    },
    {
        value: 'other',
        label: <IntlMessages id="eventType.other" />,
    },


];

class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            professorId: '',
            frequency: '',
            room: '',
            eventType: '',
            subjectId: '',
            profObject: {},
            startHours: '',
            endHours: '',
            dateEvent: '',
            range: '',
            classrooms: [],
            classId: ''
        };
        this.handleAnnule = this.handleAnnule.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.SubmitEdit = this.SubmitEdit.bind(this)
        this.handleChangeEventType = this.handleChangeEventType.bind(this)
        this.handleDateEndChange = this.handleDateEndChange.bind(this)
        this.handleDateStartChange = this.handleDateStartChange.bind(this)


    }
    componentDidMount() {
        this.setState({
            id: this.props.event.id,
            frequency: this.props.event.frequency,
            eventType: this.props.event.event_type,
            profObject: this.props.event.profObject,
            startHours: this.props.event.startDateLesson,
            endHours: this.props.event.endDateLesson,
            dateEvent: this.props.event.startDateLesson,
            idGenericEvent: this.props.event.id_generic_event,
            classId: this.props.event.class_id

        });
        this.setState({
            startHours: moment(this.props.event.start).format("YYYY-MM-DD HH:mm:ss"),
            endHours: moment(this.props.event.end).format("YYYY-MM-DD HH:mm:ss"),
            dateEvent: moment(this.props.event.end).format("YYYY-MM-DD HH:mm:ss"),

        })
    }

    handleAnnule() {
        this.setState({
            frequency: this.props.frequency,
            eventType: this.props.eventType,
            profObject: this.props.profObject,
            startHours: this.props.startDateLesson,
            endHours: this.props.endDateLesson,
            dateEvent: this.props.startDateLesson,
        });
        this.props.annuleModal();
    }
    handleChange = name => event => {

        this.setState({
            [name]: event.target.value,
        });
    };
    handleChangeProfessor = name => event => {
        let obj = JSON.parse(event.target.value);
 
        this.setState({ professorId: obj.professor_id, subjectId: obj.subject_id, profObject: event.target.value })
    }
    handleChangeEventType = name => event => {
        this.setState({ eventType: event.target.value });
    }

    handleToggle() {
        this.setState({
            professorId: '',
            frequency: '',
            room: '',
            eventType: '',
            subjectId: '',
            profObject: {},
        });
        this.props.annuleModal();
    }
    SubmitEdit = (e) => {
        e.preventDefault();
         this.props.dispatch(handleSubmitEdit(this.state));
        this.setState({
            professorId: '',
            frequency: '',
            room: '',
            eventType: '',
            subjectId: '',
            profObject: {},
            startHours: '',
            endHours: '',
            dateEvent: '',
            range: '',
            classrooms: [],
            classId:''
        });
        this.props.annuleModal();

    }

    handleDateStartChange = (date) => {
         this.setState({ startHours: date });
    };
    handleDateEndChange = (date) => {

        this.setState({ endHours: date });
    };
    handleDateChange = (date) => {
 
        let startHours = moment({ y: moment(date).year(), M: moment(date).month(), d: moment(date).format('DD'), h: moment(this.state.startHours).hour(), m: moment(this.state.startHours).minutes() });
        let endHours = moment({ y: moment(date).year(), M: moment(date).month(), d: moment(date).format('DD'), h: moment(this.state.endHours).hour(), m: moment(this.state.endHours).minutes() });
        

        this.setState({ startHours: moment(startHours).format(), endHours: moment(endHours).format(), dateEvent: moment(date).format() });
    };

    render() {





        return (
            <Auxiliary>
                <Dialog
                    open={this.props.modalEdit}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{<IntlMessages id="title.modal.lesson.edit" />}</DialogTitle>
                    <DialogContent>
                        <form className="row" onSubmit={this.SubmitEdit}>
                            <div className="col-sm-6" >
                                <TextField
                                    required
                                    id="range"
                                    onChange={this.handleChange('range')}
                                    select
                                    label={<IntlMessages id="calandar.popup.edit.event.range.dropdown" />}
                                    value={this.state.range}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth
                                    style={{
                                        marginTop: 0
                                    }}
                                >
                                    {range.map(option => (
                                        <MenuItem key={option.id} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">
                                <DatePicker
                                    id="dateEvent"
                                    label={<IntlMessages id="components.establishments.formadd.jour.sceances" />}
                                    fullWidth
                                    value={this.state.dateEvent}
                                    onChange={this.handleDateChange}
                                    animateYearScrolling={false}
                                    format='dddd   DD'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <i className="zmdi zmdi-alarm" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="col-sm-6">

                                <TimePicker
                                    id="startHours"
                                    label={<IntlMessages id="components.establishments.formadd.date.debut.sceances" />}
                                    fullWidth
                                    value={this.state.startHours}
                                    onChange={this.handleDateStartChange}
                                    ampm={false}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <i className="zmdi zmdi-alarm" />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            </div>
                            <div className="col-sm-6">
                                <TimePicker
                                    id="endHours"
                                    label={<IntlMessages id="components.establishments.formadd.date.fin.sceances" />}
                                    fullWidth
                                    value={this.state.endHours}
                                    onChange={this.handleDateEndChange}
                                    ampm={false}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <i className="zmdi zmdi-alarm" />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            </div>

                            <div className="col-sm-6">
                                <TextField
                                    required
                                    id="eventType"
                                    onChange={this.handleChangeEventType('eventType')}
                                    select
                                    label={<IntlMessages id="components.event.planning.modal.add.name.event_type" />}
                                    value={this.state.eventType}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth
                                >
                                    {eventType.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">

                                <TextField
                                    required
                                    id="frequency"
                                    onChange={this.handleChange('frequency')}
                                    select
                                    label={<IntlMessages id="components.establishments.formadd.frequency" />}
                                    value={this.state.frequency}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth
                                >
                                    {frequency.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div className="col-sm-6">
                                <TextField
                                    required
                                    id="room"
                                    onChange={this.handleChange('room')}
                                    select
                                    label={<IntlMessages id="components.establishments.formadd.room" />}
                                    value={this.props.room}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth
                                >
                                    {this.props.classrooms.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    name="professor"
                                    id="professor"
                                    onChange={this.handleChangeProfessor('professor')}
                                    select
                                    label={<IntlMessages id="components.establishments.formadd.professor" />}
                                    value={this.state.profObject}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth
                                >
                                    {this.props.establishmentProfessor.map((option, index) => {
                                        let data = { professor_id: option.professor.profile_id, subject_id: option.subject_id }
                                        return (
                                            <MenuItem key={index} value={JSON.stringify(data)}>
                                                {option.professor.profile.user.name + " " + option.professor.profile.user.surname + "  "} ({getSubjectName(this.props.subjectListByLevel, option.subject_id)})
                                            </MenuItem>
                                        )
                                    })}
                                </TextField>
                            </div>
                            <br /><br />


                            <div className="col-sm-6">
                                <Button variant="contained" color="primary" className="jr-btn text-uppercase text-white btn-block" type="submit" >{<IntlMessages id="components.establishments.formadd.buttonAdd" />}</Button>

                            </div>
                            <div className="col-sm-6">
                                <Button variant="contained" className="jr-btn text-uppercase text-white btn-block" onClick={this.props.annuleModal}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>




                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Auxiliary>
        )
    }
}

export default connect()(EditEvent);