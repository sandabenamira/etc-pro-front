import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import IntlMessages from '../../../util/IntlMessages';
import moment from 'moment';
import 'moment/locale/fr';
import _ from 'lodash';

class Entete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new moment().format("LLL"),
            user: JSON.parse(localStorage.getItem('user')),
            labelNumStudents: <IntlMessages id="components.establishments.formadd.number_students" />,
            labelSalle: <IntlMessages id="components.entete.textfields" />,
            labelClass: <IntlMessages id="components.class.formadd.name" />
        }
        this.getClassName = this.getClassName.bind(this)
        this.getClassNumberStudent = this.getClassNumberStudent.bind(this)
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            60000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    getClassName(class_id, classes) {
        let result = classes.find(classe => classe.id === class_id)
        let add = result.name
        return add
    }
    getClassNumberStudent(class_id, classes) {
        let result = classes.find(classe => classe.id === class_id)
        let number = result.students_number
        return number
    }

    tick = () => {
        this.setState({
            date: new moment().format("LLL")
        });
    }
    render() {
        const { class_id, classes } = this.props;
        if (!(_.isEmpty(class_id)) && classes.length) {
            return (
                <div >
                    <AppBar className="bg-primary" position="static" style={{ borderRadius: "9px" }}>
                        <Tabs onChange={this.handleChange} variant="scrollable" value={1} scrollButtons="off">
                            <Tab className="tab" label={this.state.date} />
                            <Tab className="tab" label={this.getClassName(class_id, classes)} />
                        </Tabs>
                    </AppBar>
                </div>
            )
        } else { return "" }
    }
}
export default Entete;