import React, { Component } from 'react';
import StudentItem from './StudentItem';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../util/IntlMessages';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'
import _ from 'lodash';
import { UncontrolledAlert } from 'reactstrap';
import { isObject, isString } from 'formik';

let timeout;


class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countAbsent: 0,
            countPresent: 0,
            modal: false,
            list: [],
            refresh: 0,
            alertNoChange: false,
            changeHappened: false
        }
        this.handleRequestSave = this.handleRequestSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeList = this.handleChangeList.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    handleCloseAlert() {
        timeout = setTimeout(() => this.setState({ alertNoChange: false }), 3000)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.prevStudentStatus !== this.props.prevStudentStatus || prevProps.gEvent.listContextual !== this.props.gEvent.listContextual) {
            this.handleChangeList(this.props.prevStudentStatus)
        }
    }
    componentWillUnmount() {
        clearTimeout(timeout);
        this.setState({
            countAbsent: 0,
            countPresent: 0,
            modal: false,
            list: [],
            refresh: 0,
            alertNoChange: false,
            changeHappened: false
        })
    }

    handleChange(item) {
        let filterList = [];
        filterList = this.state.list.filter(data => (data.profile_student_id !== parseInt(item.id)))

        let actionOfItem = actionDetails(item);
        this.setState({
            changeHappened: true, alertNoChange: false,
            list: [...filterList, { action: actionOfItem, profile_student_id: parseInt(item.id) }]
        });
    }

    handleChangeList(list) {
        // Used to initalize all the list

        this.setState({
            list: [...list], changeHappened: false
        });
    }

    handleRequestSave(e) {
        e.preventDefault();
        let countPresent = 0;
        let countAbsent = 0;

        let result = [];
        if (this.state.list.length !== 0 && this.state.changeHappened && this.props.prevStudentStatus.length !== 0) {

            result = this.props.prevStudentStatus.map(obj => {
                let element;
                let findElement = this.state.list.find(call => call.profile_student_id === obj.profile_student_id)
                if (!_.isEmpty(findElement)) {
                    (findElement.action === "Absent" && findElement.action !== "Puni" && findElement.action !== "En Retard" && findElement.action !== "En Retard et Puni") ?
                        countAbsent += 1 : countPresent += 1;
                    element = ({ action: findElement.action, profile_student_id: findElement.profile_student_id })
                } else {
                    (obj.action === "Absent" && obj.action !== "Puni" && obj.action !== "En Retard" && obj.action !== "En Retard et Puni") ?
                        countAbsent += 1 : countPresent += 1;
                    element = ({ action: obj.action, profile_student_id: obj.profile_student_id })
                }
                return element
            })
        } else if (this.state.list.length !== 0 && this.state.changeHappened && this.props.firstTry) {
            result = this.props.users.map(obj => {
                let element;
                let findElement = this.state.list.find(call => call.profile_student_id === obj.id)
                if (!_.isEmpty(findElement)) {
                    (findElement.action === "Absent" && findElement.action !== "Puni" && findElement.action !== "En Retard" && findElement.action !== "En Retard et Puni") ?
                        countAbsent += 1 : countPresent += 1;
                    element = ({ action: findElement.action, profile_student_id: findElement.profile_student_id })

                } else {
                    countPresent += 1;
                    element = ({ action: "Present", profile_student_id: obj.id })

                }
                return element
            })
        }
        else if (!(this.state.changeHappened) && this.props.firstTry) {
            let element;
            result = this.props.users.map(obj => {
                countPresent += 1;
                element = ({ action: "Present", profile_student_id: obj.id })

                return element
            })
            this.setState({ alertNoChange: true });
        } else if (this.props.prevStudentStatus.length !== 0 && !(this.state.changeHappened)) {
            this.setState({ alertNoChange: true });
        }
      
       
         if (this.state.changeHappened || this.props.firstTry) {
            this.props.NumberAbsentPresent(countPresent, countAbsent)
            this.props.RequestSaveRegister(result)
            this.setState({ countPresent: 0, countAbsent: 0, modal: false });
        }
        this.handleCloseAlert();
    }

    render() {
 
        if (this.props.users && this.props.firstTry) {
            return (
                <>
                    {this.state.alertNoChange ? <UncontrolledAlert color="info"  >
                        <span > {<IntlMessages id="message.alert.call.undone" />} </span>
                    </UncontrolledAlert> : ''}
                    <div className="user-list" autoComplete="off">

                        {this.props.users.map((data, index) => (
                            <StudentItem
                                status={{ checkPresent: true, checkRetard: false, checkPunition: false }}
                                key={index}
                                id={data.id}
                                data={data}
                                handleClickAbsent={this.handleClickAbsent}
                                handleClickPresent={this.handleClickPresent}
                                handleChange={this.handleChange}
                                styleName="card shadow"
                                establishment_id={data.establishment_id}
                            />
                        ))}
                    </div>
                    <Button variant="contained" color="primary" className="jr-btn text-white" style={{ position: "relative", float: 'right', marginBottom: 10 + 'px' }}
                        onClick={this.handleRequestSave}
                    ><IntlMessages id="button.save.registreAppel" /></Button>
                </>
            )
        } else if (this.props.users && !(this.props.firstTry) && this.props.prevStudentStatus) {
            return (
                <>
                    {this.state.alertNoChange ? <UncontrolledAlert color="danger" >
                        <span > {<IntlMessages id="message.alert.same.call" />} </span>
                    </UncontrolledAlert> : ''}
                    <div className="user-list" autoComplete="off">

                        {this.props.users.map((data, index) => (
                            <StudentItem
                                prevStudentStatus={this.props.prevStudentStatus}
                                key={data.id}
                                id={data.id}
                                data={data}
                                handleClickAbsent={this.handleClickAbsent}
                                handleClickPresent={this.handleClickPresent}
                                handleChange={this.handleChange}
                                handleChangeList={this.handleChangeList}
                                styleName="card shadow"
                                establishment_id={data.establishment_id}
                            />
                        ))}
                    </div>
                    <Button variant="contained" color="primary" className="jr-btn text-white" style={{ position: "relative", float: 'right', marginBottom: 10 + 'px' }}
                        onClick={this.handleRequestSave}
                    ><IntlMessages id="button.save.registreAppel" /></Button>
                </>
            )
        } else { return "" }
    }
}

function actionDetails(obj) {
    let present = obj.checkPresent
    let retard = obj.checkRetard
    let punition = obj.checkPunition
    if (present && retard && punition) { return "En Retard et Puni" }
    else if (present && retard) { return "En Retard" }
    else if (present && punition) { return "Puni" }
    else if (!present) { return "Absent" }
    else if (present) { return "Present" }
}

export default connect()(StudentList); 