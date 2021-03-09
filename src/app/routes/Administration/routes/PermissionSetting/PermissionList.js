import React, { Component } from 'react';
import CardBox from '../../../../../components/CardBox/index';
import { connect } from 'react-redux';
import IntlMessages from '../../../../../util/IntlMessages';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PermissionListItem from './PermissionListItem';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ResetPermission from './ResetPermission';
import PermissionConfirmation from './PermissionConfirmation';
import { applyPermissionSetting } from '../../../../../actions/PermissionAction';
import {
  roleIdProfessor,
  roleIdAdmin,
  roleIdParent,
  roleIdStudent,
  roleIdSupervisor,
  roleIdDirector,
} from '../../../../../config/config';
const listRole = [
  // { id: 0, label: <IntlMessages id={`permission.role.all`} /> },
  { id: roleIdAdmin, label: <IntlMessages id={`role.admin`} /> },
  { id: roleIdDirector, label: <IntlMessages id={`component.etablishments.info.director`} /> },
  { id: roleIdSupervisor, label: <IntlMessages id={`role.supervisor`} /> },
  { id: roleIdProfessor, label: <IntlMessages id={`toDo.professor`} /> },
  { id: roleIdStudent, label: <IntlMessages id={`userStuppDisplay.Student`} /> },
  { id: roleIdParent, label: <IntlMessages id={`userStuppDisplay.Parent`} /> },
];
/* eslint eqeqeq: "off" */
export class PermissionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPermissions: [],
      listPermissionsModified: [],
      modalReset: false,
      modalConfirmation: false,
    };

    this.addPermission = this.addPermission.bind(this);
    this.deletePermission = this.deletePermission.bind(this);
    this.resetPermission = this.resetPermission.bind(this);
    this.applyPermission = this.applyPermission.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.setState({ listPermissions: this.props.listPermissions });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.listPermissions !== this.props.listPermissions) {
      this.setState({ listPermissions: this.props.listPermissions });
    }
  }
  handleCancel() {
    this.setState({ modalReset: false, modalConfirmation: false });
  }
  applyPermission() {
    let listPermissionsModified = this.state.listPermissions.filter(
      (permission) => permission.modified
    );
    let data = listPermissionsModified.map((element) => {
      return {
        permissionId: element.id,
        estabId: this.props.userProfile.establishment_id,
        rolesArray: element.roles,
      };
    });
    this.props.dispatch(
      applyPermissionSetting(
        data,
        listPermissionsModified,
        this.props.userProfile.establishment_id,
        this.props.userProfile.role_id
      )
    );
    this.setState({ listPermissionsModified, modalConfirmation: false });
  }
  resetPermission() {
    this.setState({
      listPermissions: this.props.listPermissions,
      listPermissionsModified: [],
      modalReset: false,
    });
  }
  deletePermission(idPermission, idRole) {
    let newListPermissions = this.state.listPermissions.map((permission) => {
      let newPermission =
        permission.id === parseInt(idPermission)
          ? {
              ...permission,
              roles: permission.roles.filter((role) => role !== idRole),
              modified: true,
            }
          : permission;
      return newPermission;
    });
    this.setState({
      listPermissions: newListPermissions,
    });
  }
  addPermission(idPermission, idRole) {
    let newListPermissions = this.state.listPermissions.map((permission) => {
      let newPermission =
        permission.id === parseInt(idPermission)
          ? {
              ...permission,
              roles: permission.roles.concat([idRole]),
              modified: true,
            }
          : permission;
      return newPermission;
    });
    this.setState({
      listPermissions: newListPermissions,
    });
  }
  render() {   /* eslint eqeqeq: "off" */
    const { values } = this.props;
    return (
      <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column bd-highlight mb-3 ">
        <ResetPermission
          modal={this.state.modalReset}
          handleCancelReset={this.handleCancel}
          handleSubmit={this.resetPermission}
        ></ResetPermission>
        <PermissionConfirmation
          modal={this.state.modalConfirmation}
          handleCancel={this.handleCancel}
          handleSubmit={this.applyPermission}
        ></PermissionConfirmation>
        <CardBox styleName="col-md-12 col-lg-12 col-sm-12">
          <div className="d-flex flex-row bd-highlight  ">
            <div className="p-3 col-md-5 col-lg-5 col-sm-5  mt-4">
              <h1 style={{ color: '#0000CD', fontFamily: 'Roboto' }}>
                {' '}
                <IntlMessages id="sidebar.components.permissionSetting" />
              </h1>
            </div>
            <div className="p-2 col-md-2 col-lg-2 col-sm-2">
              <TextField
                id="filtreRole"
                name="filtreRole"
                select
                value={values.filtreRole}
                onChange={this.props.handleChange('filtreRole')}
                SelectProps={{}}
                label={<IntlMessages id={`stuppUser.steps.role`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                <MenuItem key={-1} value={-1}>
                  <IntlMessages id={`permission.role.all`} />
                </MenuItem>
                {listRole.map((role, index) => (
                  <MenuItem key={role.id} value={index}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="p-2 col-md-2 col-lg-2 col-sm-2    ">
              <TextField
                id="moduleId"
                name="moduleId"
                select
                value={values.moduleId}
                onChange={this.props.handleChange('moduleId')}
                SelectProps={{}}
                label={<IntlMessages id={`sidebar.modules`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                <MenuItem key={0} value={0}>
                  <IntlMessages id={`userStuppDisplay.all`} />
                </MenuItem>
                {this.props.estabModule.map((element, index) => (
                  <MenuItem key={index} value={element.module.id}>
                    <IntlMessages id={`sidebar.components.${element.module.path}`} />
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="p-2 col-md-2 col-lg-2 col-sm-2">
              <TextField
                id="subModuleId"
                name="subModuleId"
                select
                value={values.subModuleId}
                onChange={this.props.handleChange('subModuleId')}
                SelectProps={{}}
                label={<IntlMessages id={`permission.sous.module`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {values.subModuleList.map((subModule) => (
                  <MenuItem key={subModule.id} value={subModule.id}>
                    {/* {subModule.name} */}
                    <IntlMessages id={`sidebar.components.${subModule.name}`} />
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </CardBox>
        <CardBox styleName="col-md-12 col-lg-12 col-sm-12">
          <div className="table-responsive-material">
            <Table>
              <TableHead className="th-border-b">
                <TableRow>
                  <TableCell>
                    {' '}
                    <IntlMessages id={`action.type.of.education`} />
                  </TableCell>

                  {values.filtreRole > -1 ? (
                    <TableCell>{listRole[values.filtreRole].label}</TableCell>
                  ) : (
                    listRole.map((element, index) => (
                      <TableCell key={index}>{element.label}</TableCell>
                    ))
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.listPermissions.map((element, index) => {
                  return (
                    <PermissionListItem
                      key={index}
                      permission={element}
                      addPermission={this.addPermission}
                      deletePermission={this.deletePermission}
                      settings={this.props.settings}
                      filtreRole={values.filtreRole}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardBox>
        <div className="d-flex flex-row-reverse bd-highlight col-md-12 col-lg-12 col-sm-12">
          <div className=" bd-highlight ">
            <Button
              variant="contained"
              className="bg-primary text-white "
              style={{
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                width: '100%',
                height: '80%',
                textTransform: 'capitalize',
              }}
              onClick={() => this.setState({ modalConfirmation: true })}
            >
              {true ? (
                <IntlMessages id="superadmin.apply.button" />
              ) : (
                <IntlMessages id="button.modify" />
              )}
            </Button>
          </div>
          <div className=" bd-highlight mr-2">
            <Button
              variant="contained"
              style={{
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                width: '100%',
                height: '80%',
                textTransform: 'capitalize',
              }}
              className=" bg-grey text-white "
              onClick={() => this.setState({ modalReset: true })}
            >
              <IntlMessages id="components.classes.formadd.buttonCancel" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    settings: state.settings.locale,
  };
}

export default connect(mapStateToProps)(PermissionList);
