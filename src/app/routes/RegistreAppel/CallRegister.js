import React from 'react';
import Entete from './Entete';
import StudentList from './StudentList/StudentList';
import ConfirmAppel from './ConfirmAppel';
import InitAppelDialog from './InitAppelDialog';
import IntlMessages from '../../../util/IntlMessages';
import { UncontrolledAlert, Alert } from 'reactstrap';
import axios from 'axios';
import baseUrl from '../../../config/config';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getStudentClass } from "../../../actions/RegistreAction";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardBox from '../../../components/CardBox/index';
import moment from 'moment';
 import { getSubjectName, getSubject } from '../../../actions/subjectAction';
import DateFnsUtils from '@date-io/moment';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import AssignmentInd from '@material-ui/icons/AssignmentIndOutlined';
import AssignmentReturn from '@material-ui/icons/AssignmentReturnOutlined';
import AssignmentLate from '@material-ui/icons/AssignmentLateOutlined';
let timeout;
//TODO controller l'affichage de temps selon la langue ?

function notEmpty(value) {
    return (!_.isEmpty(value))
}

const styles = {
    selected: { /* Increase the specificity */
        color: "blue",
    },

    button: {
        backgroundColor: "#00b894"
    }
};

class CallRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alert_success: false,
            modal_save: false,
            nbre_Absent: 0,
            nbre_Present: 0,
            result: [],
            firstTry: true,
            prevStudentStatus: [],
            date_gEvent: moment(),
            classe: '',
            list_gEvent: [],
            gEvent: '',
            contextEvent: '',
            readyRender: false,
            seance: '',
            callRegister: {},
            last_version: {},
            lastVerStudentStats: [],
            alertOldCall: false,
            alertReset_allStu: false,
            modifAppel: false
        };
        this.SetAllAbsent = this.SetAllAbsent.bind(this)
        this.SetPrevStudentVersion = this.SetPrevStudentVersion.bind(this)
        this.RequestSaveRegister = this.RequestSaveRegister.bind(this);
        this.NumberAbsentPresent = this.NumberAbsentPresent.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChangeClasse = this.handleChangeClasse.bind(this);
        this.handleChangeSeance = this.handleChangeSeance.bind(this);
        this.ModalConfirmSave = this.ModalConfirmSave.bind(this);
        this.CancelModalConfirm = this.CancelModalConfirm.bind(this);
        this.ResetStuListPresent = this.ResetStuListPresent.bind(this);
        this.CancelDialogReset = this.CancelDialogReset.bind(this);
    }

    componentDidMount() {
        if (!(_.isEmpty(this.props.userProfile))) {
         }
        this.props.dispatch(getSubject())
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userProfile !== this.props.userProfile && _.isEmpty(this.props.classesList.classes)) {
         }
    }

    handleChangeClasse = name => event => {
        this.setState({
            [name]: event.target.value,
            list_gEvent: [], result: [], prevStudentStatus: [], contextEvent: '', gEvent: '', seance: '', readyRender: false,
            last_version: {},
            callRegister: {},
            lastVerStudentStats: []
        });
        this.props.dispatch(getStudentClass(event.target.value))
        //Création de l'input data pour la remothe methode getListSeances
        let data = {
            class_id: event.target.value,
            choixDate: moment(this.state.date_gEvent).format()
        }
        axios.get(`${baseUrl.baseUrl}/classes/getListSeances/${JSON.stringify(data)}?access_token=${localStorage.token}`)
            .then(res => {
                this.setState({ list_gEvent: [...res.data.contextualEvent] })
            })
        axios.get(`${baseUrl.baseUrl}/call_registers/getLastV_Calls?class_id=${event.target.value}&access_token=${localStorage.token}`)
            .then(res => {
                let data = {
                    callRegister: { class_id: 3, last_version: 1, year: 2020, id: 8 },
                    last_version: { time_stamp: "2020-01-07T14:56:45.000Z", id: 1, context_event_id: 1, context_event: { "data": '...' } },
                    student_calls: []
                }
                if (_.isEmpty(res.data.last_version)) {
                    this.setState({
                        callRegister: res.data.callRegister,
                        last_version: {},
                        lastVerStudentStats: [],
                        prevStudentStatus: [],
                    })
                } else {
                    this.setState({
                        callRegister: res.data.callRegister,
                        last_version: res.data.last_version,
                        lastVerStudentStats: res.data.student_calls,
                        prevStudentStatus: res.data.student_calls
                    })
                }
            })
    };

    handleDateChange = (date) => {

        /** date change => new getListSeances
         * => save : list_gEvents & date_gEvent
         * if last_version exist & last_version_context_start_date is before date 
         * => await : render & seance change 
         * => save : reset prevStudentStats & contextEvent & result & readyRender
         */
        let data = {
            class_id: this.state.classe,
            choixDate: moment(date).format()
        }
        axios.get(`${baseUrl.baseUrl}/classes/getListSeances/${JSON.stringify(data)}?access_token=${localStorage.token}`)
            .then(res => {
                this.setState({
                    date_gEvent: date, list_gEvent: [...res.data.contextualEvent]
                })
            })

        let lastV_contextE = notEmpty(this.state.last_version) ? this.state.last_version.context_event : {};

        if (notEmpty(lastV_contextE) && moment(date).isSameOrAfter(lastV_contextE.start_lesson, "day")) {
            this.setState({
                date_gEvent: date,
                result: [], prevStudentStatus: [], contextEvent: '', gEvent: '', seance: '',
                readyRender: false,
                alertOldCall: false
            });
        } else if (notEmpty(lastV_contextE) && moment(date).isBefore(lastV_contextE.start_lesson, "day")) {
            this.setState({
                date_gEvent: date,
                result: [], prevStudentStatus: [], contextEvent: '', gEvent: '', seance: '',
                readyRender: false,
                alertOldCall: true
            });
        } else {
            // Dans le cas ou on fais l'appel dans le registre pour la premiére fois === on n'a pas de last_version d'appel
            this.setState({
                date_gEvent: date,
                result: [], prevStudentStatus: [], contextEvent: '', gEvent: '', seance: '',
                readyRender: false,
                alertOldCall: false
            });
        }
    };

    handleChangeSeance = event => {
        let dataJson = JSON.parse(event.target.value)
        let contextEvent = _.first(dataJson.sameDayContextE);

        this.setState({
            seance: event.target.value,
            contextEvent: contextEvent,
            gEvent: dataJson,
            result: []
        });

        let lastV_contextE = notEmpty(this.state.last_version) ? this.state.last_version.context_event : {};
        let contextE_isSameOrAfter_lastV_contextE = notEmpty(lastV_contextE) && moment(contextEvent.start_lesson).isSameOrAfter(this.state.last_version.context_event.start_lesson, "hour");

        axios.get(`${baseUrl.baseUrl}/generic_events/beforeNewCall?cEventChosen=${JSON.stringify(contextEvent)}&lastV_contextE=${JSON.stringify(lastV_contextE)}&access_token=${localStorage.token}`)
            .then(res => {
                let data = {
                    pastLessons: [],
                    pastCallsAllDone: true,
                    studentPrevStatus: (5)
                }
                if (_.isEmpty(this.state.last_version)) {
                    this.setState({
                        prevStudentStatus: [],
                        firstTry: true,
                        readyRender: true
                    })
                } else if (notEmpty(this.state.lastVerStudentStats) && notEmpty(lastV_contextE) && res.data.pastCallsAllDone && contextE_isSameOrAfter_lastV_contextE) {
                    this.setState({
                        prevStudentStatus: this.state.lastVerStudentStats,
                        firstTry: false,
                        readyRender: true,
                        alertOldCall: false,
                        modifAppel: false
                    })
                } else if (res.data.pastCallsAllDone === false && contextE_isSameOrAfter_lastV_contextE) {
                    this.setState({
                        result: [],
                        readyRender: true,
                        alertReset_allStu: true,
                        alertOldCall: false,
                        modifAppel: false
                    })
                } else if (contextE_isSameOrAfter_lastV_contextE === false && notEmpty(res.data.studentPrevStatus)) {
                    this.setState({
                        prevStudentStatus: res.data.studentPrevStatus,
                        result: [],
                        firstTry: false,
                        readyRender: true,
                        alertOldCall: true,
                        modifAppel: true
                    })
                } else {
                    this.setState({
                        prevStudentStatus: [],
                        result: [],
                        firstTry: true,
                        readyRender: true,
                        alertOldCall: true
                    })
                }
            })
        //Requete dans le but d'extraire la derniére version pour la séance choisie && if seance is in the past then it shouldn't affect the callR_last_version patch
    };

    NumberAbsentPresent(nbre_Present, nbre_Absent) {
        this.setState({ nbre_Present, nbre_Absent });
    }

    RequestSaveRegister(list) {
        this.setState({ result: list, modal_save: true });
    }

    ModalConfirmSave() {
        let objCallR = this.state.callRegister;
        let contextEvent = this.state.contextEvent;
        let student_calls = this.state.result;

        // let updateOrNo = _.isEmpty(this.state.last_version) ? true : (notEmpty(this.state.last_version.context_event) && notEmpty(this.state.context_event) &&
        //     moment(this.state.last_version.context_event.start_lesson).isSameOrAfter(this.state.contextEvent.start_lesson)) ? true : false;
 
        axios.post(`${baseUrl.baseUrl}/register_versions/createCallsAndUpdate?student_calls=${JSON.stringify(student_calls)}&callRegister=${JSON.stringify(objCallR)}&contextEvent=${JSON.stringify(contextEvent)}&access_token=${localStorage.token}`)
            .then(res => {
                let data = {
                    resCEvent: { start_lesson: "2020-01-07T12:30:00.000Z", end_lesson: "2020-01-07T13:00:00.000Z", id_generic_event: 5, tag_call: true, id: 5 },
                    resCallReg: { class_id: 3, last_version: 6, year: 2020, id: 8 },
                    resVersion: { time_stamp: "2020-01-08T11:52:20.000Z", id: 11, context_event_id: 7 },
                    resCalls: (5)
                }
                let updateContextEvent = Object.assign({}, res.data.resCEvent, { generic_events: this.state.gEvent })
                let updatedVersion = Object.assign({}, res.data.resVersion, { context_event: updateContextEvent })
                // let updateCallR = updateOrNo ? Object.assign({}, res.data.resCallReg) : this.state.callRegister;
                this.setState({
                    readyRender: false,
                    // callRegister: updateCallR,
                    last_version: updatedVersion,
                    lastVerStudentStats: res.data.resCalls,
                    result: [],
                    firstTry: true,
                    prevStudentStatus: [],
                    alertOldCall: false,
                    alertReset_allStu: false,
                    modal_save: false,
                    alert_success: true
                });

            })
        timeout = setTimeout(() => this.setState({ alert_success: false }), 3000)
    }

    ResetStuListPresent() {
        this.setState({
            prevStudentStatus: [],
            firstTry: true,
            result: [],
            alertReset_allStu: false,
        })
    }
    SetAllAbsent() {
        let setStudentList = []
        if (this.state.prevStudentStatus) {
             setStudentList = this.state.prevStudentStatus.map((data, index) => ({ ...data, "action": "Absent" }))
            this.setState({
                prevStudentStatus: setStudentList,
                firstTry: false,
                result: [],
                alertReset_allStu: false,
            })
        } else {
             this.setState({
                prevStudentStatus: [],
                firstTry: true,
                result: [],
                alertReset_allStu: false,
            })
        }
    }
    SetPrevStudentVersion() {
        if (true) {
            this.setState({
                prevStudentStatus: this.state.lastVerStudentStats,
                firstTry: false,
                alertReset_allStu: false
            })
        }
    }

    CancelModalConfirm() {
        this.setState({ modal_save: false })
    }
    CancelDialogReset() {
        this.setState({
            prevStudentStatus: this.state.lastVerStudentStats,
            firstTry: false,
            alertReset_allStu: false
        })
    }

    componentWillUnmount() {
        clearTimeout(timeout);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {(() => {
                    return (
                        <div>
                            {this.state.alert_success ? <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
                                <span className="icon-addon alert-addon">
                                    <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                                </span>
                                <span className="d-inline-block"> {<IntlMessages id="message.success.call" />}</span>
                            </UncontrolledAlert> : ''}
                            <CardBox styleName="col-12" >
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <FormControl className="w-100 mb-2">
                                            <InputLabel htmlFor="age-simple">{<IntlMessages id="components.note.class" />}</InputLabel>
                                            <Select
                                                value={this.state.classe}
                                                onChange={this.handleChangeClasse('classe')}
                                                input={<Input id="classe" />}
                                            >
                                                {Array.from(this.props.classesList).filter(classe => classe.status).map(classe =>
                                                    <MenuItem key={classe.id} value={classe.id}>
                                                        {classe.name}
                                                    </MenuItem>
                                                )
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-12">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                label={<IntlMessages id="components.call.register.jour" />}
                                                fullWidth
                                                value={this.state.date_gEvent}
                                                onChange={this.handleDateChange}
                                                format='dddd DD MMMM Y'
                                                maxDate={moment()}
                                                autoOk
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-lg-5 col-sm-6 col-12">
                                        <FormControl className="w-100 mb-2">
                                            <InputLabel htmlFor="age-simple">{<IntlMessages id="components.call.register.sceances" />}</InputLabel>
                                            <Select
                                                value={this.state.seance}
                                                onChange={this.handleChangeSeance}
                                            >
                                                {Array.from(this.state.list_gEvent).map((gEvent, index) => {
                                                    let contextEvent = _.first(gEvent.sameDayContextE)
                                                    let dynamicBtnClass = (!_.isEmpty(contextEvent)) && contextEvent.tag_call ? classes.button : "";
                                                    return (
                                                        <MenuItem className={dynamicBtnClass} key={index} value={JSON.stringify(gEvent)}>
                                                            {/* {(_.first(gEvent.sameDayContextE)).tag_call ? <h6>Done </h6> : ""} */}
                                                            {getSubjectName(Array.from(this.props.subjects), gEvent.subject_id) + " " + moment(gEvent.start_date_generic_event).format("HH[h]mm") + "-" + moment(gEvent.end_date_generic_event).format("HH[h]mm")}
                                                        </MenuItem>
                                                    )
                                                }
                                                )}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    {this.state.last_version.context_event && <div className="col-lg-12 col-12 mt-3">
                                        <p className="MuiInputBase-root" style={{ margin: "auto" }}>
                                            {<IntlMessages id="callRegister.last.lesson" />}
                                            <span>
                                                {": " + moment(this.state.last_version.context_event.generic_events.start_date_generic_event).format("dddd D MMM") + " " + getSubjectName(Array.from(this.props.subjects), this.state.last_version.context_event.generic_events.subject_id) + " " + moment(this.state.last_version.context_event.generic_events.start_date_generic_event).format("HH[h]mm") + "-" + moment(this.state.last_version.context_event.generic_events.end_date_generic_event).format("HH[h]mm")}
                                            </span>

                                        </p>
                                    </div>}
                                </div>
                            </CardBox>
                            {this.state.classe && this.state.gEvent && this.state.readyRender ?
                                <>
                                    <div className="jr-btn-group">
                                        <Button onClick={this.SetPrevStudentVersion} className="jr-btn" variant="outlined">
                                            <AssignmentReturn className="zmdi zmdi-github zmdi-hc-lg" />
                                            <span>{"Mettre la derniére version du registre"}</span>
                                        </Button>
                                        <Button onClick={this.ResetStuListPresent} className="jr-btn" variant="outlined" color="primary">
                                            <AssignmentInd className="zmdi zmdi-github zmdi-hc-lg" />
                                            <span>{"Mettre tous à Présent"}</span>
                                        </Button>
                                        <Button onClick={this.SetAllAbsent} className="jr-btn" variant="outlined" color="secondary">
                                            <AssignmentLate className="zmdi zmdi-github zmdi-hc-lg" />
                                            <span>{"Mettre tous à Absent"}</span>
                                        </Button>
                                    </div>

                                    {/* {this.state.last_version.context_event ?
                                        <>
                                            <h2>{<IntlMessages id="callRegister.lastCall" />}{" " + moment(this.state.last_version.time_stamp).fromNow()}
                                            </h2>
                                            <h2>
                                                {<IntlMessages id="callRegister.last.lesson" />}{moment(this.state.last_version.context_event.generic_events.start_date_generic_event).format("ddd D MMM") + " " + getSubjectName(Array.from(this.props.subjects), this.state.last_version.context_event.generic_events.subject_id) + " " + moment(this.state.last_version.context_event.generic_events.start_date_generic_event).format("HH[h]mm") + "-" + moment(this.state.last_version.context_event.generic_events.end_date_generic_event).format("HH[h]mm")}
                                            </h2>
                                        </>
                                        : <h2>{<IntlMessages id="callRegister.firstTry" />}</h2>}
                                    {this.state.alertOldCall ? <h2>{<IntlMessages id="callRegister.late.call" />}</h2> : ""}
                                    {this.state.modifAppel ? <h2>{<IntlMessages id="callRegister.edit.prev.call" />}</h2> : ""} */}
                                    <StudentList
                                        // callRegister={this.state.callRegister}
                                        prevStudentStatus={this.state.prevStudentStatus}
                                        contextEvent={this.state.contextEvent}
                                        presences={this.props.presences}
                                        users={this.props.studentsClass.classData}
                                        RequestSaveRegister={this.RequestSaveRegister}
                                        NumberAbsentPresent={this.NumberAbsentPresent}
                                        firstTry={this.state.firstTry}
                                        establishment_id={this.props.userProfile.establishment_id}
                                        gEvent={this.state.gEvent}
                                    />
                                </> : ""}
                            {/* {this.state.alertReset_allStu ?
                                <InitAppelDialog
                                    last_version={this.state.last_version}
                                    contextEvent={this.state.contextEvent}
                                    ResetStuListPresent={this.ResetStuListPresent}
                                    CancelDialogReset={this.CancelDialogReset}
                                /> : ''} */}
                            {this.state.modal_save ?
                                <ConfirmAppel
                                    contextEvent={this.state.contextEvent}
                                    ModalConfirmSave={this.ModalConfirmSave}
                                    CancelModalConfirm={this.CancelModalConfirm}
                                    NumberAbsent={this.state.nbre_Absent}
                                    NumberPresent={this.state.nbre_Present}
                                    presences={this.props.presences}
                                /> : ''}
                        </div>
                    )

                })()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        classesList: state.classes,
        studentsClass: state.callRegister.studentsClass,
        subjects: state.subject.remoteSubjects
    }
}

export default withStyles(styles)(connect(mapStateToProps)(CallRegister));
