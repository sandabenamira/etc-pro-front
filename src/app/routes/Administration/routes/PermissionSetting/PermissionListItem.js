import IntlMessages from '../../../../../util/IntlMessages';
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import moment from 'moment';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import { NavLink } from 'react-router-dom';
import {
  roleIdProfessor,
  roleIdAdmin,
  roleIdParent,
  roleIdStudent,
  roleIdSupervisor,
  roleIdDirector,
} from '../../../../../config/config';
const listRole = [
  { id: roleIdAdmin, label: <IntlMessages id={`role.admin`} /> },
  { id: roleIdDirector, label: <IntlMessages id={`component.etablishments.info.director`} /> },
  { id: roleIdSupervisor, label: <IntlMessages id={`role.supervisor`} /> },
  { id: roleIdProfessor, label: <IntlMessages id={`toDo.professor`} /> },
  { id: roleIdStudent, label: <IntlMessages id={`userStuppDisplay.Student`} /> },
  { id: roleIdParent, label: <IntlMessages id={`userStuppDisplay.Parent`} /> },
];
class PermissionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  havePermission(idRole, idPermission) {
    let have = true;

    have = this.props.permission.roles.includes(idRole);
    let icone = have ? (
      <i
        className="zmdi zmdi-check"
        onClick={(e) => {
          this.props.deletePermission(idPermission, idRole);
        }}
      ></i>
    ) : (
      <i
        className="zmdi zmdi-block"
        onClick={(e) => {
          this.props.addPermission(idPermission, idRole);
        }}
      ></i>
    );
    return icone;
  }
  render() {
    const { permission, filtreRole } = this.props;
    return (
      <TableRow>
 
        <TableCell>
          {this.props.settings.languageId == 'tunisia'
            ? permission.permissionAr
            : this.props.settings.languageId == 'french'
            ? permission.permissionFr
            : permission.permissionAng}
        </TableCell>
        {filtreRole > -1 ? (
          <TableCell> {this.havePermission(listRole[filtreRole].id, permission.id)} </TableCell>
        ) : (
          listRole.map((element) => (
            <TableCell> {this.havePermission(element.id, permission.id)} </TableCell>
          ))
        )}

         
      </TableRow>
    );
  }
}

export default PermissionListItem;
