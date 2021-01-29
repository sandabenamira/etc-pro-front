import React, { Component } from 'react'
import axios from "axios";
import baseUrl from "../../../config/config";
import _ from 'lodash';

export default class UserCardItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uri: ""
    }
  }

  UNSAFE_componentWillMount() {
    axios.get(`${baseUrl.baseUrl}/establishments/` + this.props.user.establishment_id + `?access_token=${localStorage.token}`)
      .then(res => {

        const establishmentName = res.data.name

        axios.get(`${baseUrl.baseUrl}/containers/checkFileExist/${res.data.name}?access_token=${localStorage.token}`)
          .then((response) => {

            let fileList = _.isEmpty(response.data.checkFile) ? null :
              response.data.checkFile.filter(item => item.name === this.props.user.user.photo);
            _.isEmpty(fileList) ?
              this.setState({ uri: null })
              :
              this.setState({ uri: `${baseUrl.baseUrl}/containers/` + establishmentName + '/download/' + fileList[0].name + `?access_token=${localStorage.token}` })
          })
      })
  }

  getNameRole(id) {
    return id === 1
      ? "superadmin"
      : id === 2
        ? "admin"
        : id === 3
          ? "professor"
          : id === 4
            ? "parent"
            : id === 5
              ? "Student"
              : id === 6
                ? "Superviseur"
                : id === 7
                  ? "Directeur"
                  : "";
  }


  render() {
    return (
      <li>
        <div className="jr-profileon">
          <div className="jr-profileon-thumb">
            {this.state.uri == null ?
              <img src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png" alt="User"></img> :
              <img src={this.state.uri} alt="User"></img>
            }
          </div>
          <div className="jr-profileon-content">
            <h5 className="mb-0 text-truncate">{this.props.user.user.name + ' ' + this.props.user.user.surname}</h5>
            <p className="mb-0 jr-fs-sm text-truncate">
              <i className="zmdi zmdi-star text-orange"></i>
              {this.getNameRole(this.props.user.role_id)}
            </p>
          </div>
        </div>
      </li>
    )
  }
}
