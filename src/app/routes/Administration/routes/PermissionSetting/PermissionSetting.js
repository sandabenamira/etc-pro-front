import React, { Component } from 'react';
import PermissionList from './PermissionList';
 import { connect } from 'react-redux';
import { getPermissionSetting } from '../../../../../actions/PermissionAction';
import { UncontrolledAlert } from 'reactstrap';
import _ from 'lodash';
 

export class PermissionSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: '',
      subModuleList: [],
      subModuleId: '',
      listPermissions: [],
      filtreRole: -1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getPermissionSetting(this.props.userProfile.establishment_id));
 
    this.setState({ listPermissions: this.props.permissionSetting });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.permissionSetting !== this.props.permissionSetting) {
      this.setState({ listPermissions: this.props.permissionSetting });
    }
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    if (name == 'moduleId') {
      if (event.target.value > 0) {
        let moduleChecked = _.find(this.props.estabModule, { fk_id_module: event.target.value });
        this.setState({ subModuleList: moduleChecked.module.suBmodule });
      } else {
        this.setState({
          subModuleList: [],
          subModuleId: '',
          listPermissions: this.props.permissionSetting,
        });
      }
    } else if (name == 'subModuleId') {
      let listPermissions = this.props.permissionSetting.filter(
        (element) => element.subModuleId == event.target.value
      );
      this.setState({ listPermissions });
    }
  };
  render() {
     return (
      <div>
        {this.props.successStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
          ''
        )}
        {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
          ''
        )}
        <PermissionList
          listPermissions={this.state.listPermissions}
          estabModule={this.props.estabModule}
          handleChange={this.handleChange}
          values={this.state}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    estabModule: state.establishment.estabModule,
    settings: state.settings.locale,
    permissionSetting: state.PermissionReducer.permissionSetting,
  };
}

export default connect(mapStateToProps)(PermissionSetting);
