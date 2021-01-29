import _ from 'lodash';
import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import StudentItem from './StudentItem';
import IntlMessages from '../../../../../util/IntlMessages';
import axios from 'axios';
import cst from '../../../../../config/config';

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName : '',
            userSurname: ''
        }
    }

    componentDidMount() {

axios.get(`${cst.baseUrl}/users/${localStorage.user_id}?access_token=${localStorage.token}`)
.then((response)=>{
 this.setState({userName : response.data.name, userSurname:response.data.surname })
 })
    }

    render() {
        let absentStudents = [];
        absentStudents = this.props.absentStudents;
        let noAbsents = this.props.noAbsents;
        let class_name = this.props.class_name;
        return (
            <div>
                {(() => {
                    if (!_.isEmpty(absentStudents)) {
                        return (
                            <div className="container" >

                                <div className="row" autoComplete="off">
                                    <div className=" col-12  animated slideInUpTiny animation-duration-3">
                                        {absentStudents.map((data, index) => (
                                            <StudentItem
                                                key={index}
                                                data={data}
                                                profileSupervisor={this.state.profile_idSupervisor}
                                                class_name={class_name}
                                                userName={this.state.userName}
                                                userSurname={this.state.userSurname}

                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    } else if (_.isEmpty(absentStudents) && noAbsents) {
                        return (
                            <div className="container" >
                                <div style={{marginTop: "25px", alignItems: "center"}}>
                                    <h1 > {<IntlMessages id="message.no.absent" />}</h1>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="container" >
                            <div style={{marginTop: "25px", alignItems: "center"}}>
                                <h1 > {<IntlMessages id="message.billet" />}</h1>
                            </div>
                        </div>
                           
                        )
                    }
                })()}
            </div>)
    }
}

export default StudentList; 