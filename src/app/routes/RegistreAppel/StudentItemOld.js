import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import baseUrl from '../../../../config/config';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../util/IntlMessages';
import Fab from '@material-ui/core/Fab';


function jsUpperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class StudentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      id: 0,
      checkPresent: true,
      checkRetard: false,
      checkPunition: false,
      initialized: true,
      establishmentName: '',
      uri: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.prevStudentStatus && this.state.initialized || prevProps.prevStudentStatus !== this.props.prevStudentStatus) {
      let status = returnStatus(this.props.prevStudentStatus, this.props.id)
      this.setState({ checkPresent: status.checkPresent, checkRetard: status.checkRetard, checkPunition: status.checkPunition, initialized: false }, () => {
        let result = { id: this.props.id, checkPresent: this.state.checkPresent, checkRetard: this.state.checkRetard, checkPunition: this.state.checkPunition }
        this.props.handleChangeList(this.props.prevStudentStatus)
      })
    }
  }

  handleChange(event) {
    let name = event.target.name;
    this.setState({ id: event.target.value, [name]: event.target.checked }, () => {
      let result = { id: this.state.id, checkPresent: this.state.checkPresent, checkRetard: this.state.checkRetard, checkPunition: this.state.checkPunition }
      this.props.handleChange(result);
    })
  };


  componentDidMount() {
    axios.get(`${baseUrl.baseUrl}/establishments/` + this.props.establishment_id + `?access_token=${localStorage.token}`)
      .then(res => {
        axios.get(`${baseUrl.baseUrl}/containers/checkFileExist/${res.data.name}?access_token=${localStorage.token}`)
          .then((response) => {
            let itemList = _.isEmpty(response.data.checkFile) ? null :
              response.data.checkFile.find(item => item.name === this.props.data.photo);
            _.isEmpty(itemList) ? this.setState({ uri: null }) : this.setState({ uri: `${baseUrl.baseUrl}/containers/` + res.data.name + '/download/' + this.props.data.photo + `?access_token=${localStorage.token}` });
          });
      });
  }

  render() {
      const { styleName, data, id } = this.props;
      return (
      <div className={`user-list d-flex flex-row  ${styleName}`}>
        {this.state.uri ? (<Avatar
          alt='...'
          src={this.state.uri}
          className="user-avatar avatar-shadow"
        />) :
          (<Avatar
            alt='...'
            src={require('../../../../assets/images/placeholder.jpg')}
            className="user-avatar avatar-shadow"
          />)}
        <div className="description " >
          <h5>{this.props.data.user.name.toUpperCase()} {jsUpperCaseFirst(this.props.data.user.surname)}</h5>
          {!_.isEmpty(this.props.data.absentPass) ?

            <FormControlLabel
              control={<Fab className="jr-fab-btn bg-secondary text-white jr-btn-fab-xs">
                <i className="zmdi zmdi-notifications zmdi-hc-lg" />
              </Fab>}
              label={<IntlMessages id="sidebar.components.billetPass" />}
              labelPlacement="bottom"
            />

            : ""

          }

          <FormControlLabel
            control={<Switch color="primary" value={id.toString()} onChange={this.handleChange} name="checkPresent" checked={this.state.checkPresent} />}
            label="Present"
            labelPlacement="bottom"
          />
          <FormControlLabel
            control={<Checkbox value={id.toString()} onChange={this.handleChange} name="checkRetard" checked={this.state.checkRetard} />}
            label="Retard"
            labelPlacement="bottom"
          />
          <FormControlLabel
            control={<Checkbox value={id.toString()} onChange={this.handleChange} label="Punition" name="checkPunition" checked={this.state.checkPunition} />}
            label="Punition"
            labelPlacement="bottom"
          />

        </div>
      </div >
    );
  }
}


export default StudentItem;


function returnStatus(listStatus, id) {
  let status;
  let element = listStatus.find(data => data.profile_student_id === id);
  (_.isEmpty(element)) ? status = "Present" : status = initState(element.action)

  return status
}


function initState(action) {
  switch (action) {
    case "Present":
      return { checkPresent: true, checkRetard: false, checkPunition: false };
    case "Absent":
      return { checkPresent: false, checkRetard: false, checkPunition: false };
    case "Puni":
      return { checkPresent: true, checkRetard: false, checkPunition: true };
    case "En Retard":
      return { checkPresent: true, checkRetard: true, checkPunition: false };
    case "En Retard et Puni":
      return { checkPresent: true, checkRetard: true, checkPunition: true };
    default: ""
  }
}
