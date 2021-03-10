import IntlMessages from '../../../../../util/IntlMessages';
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { roleIdProfessor, roleIdAdmin, roleIdParent, roleIdStudent, roleIdSupervisor, roleIdDirector } from '../../../../../config/config';
const listRole = [
  { id: roleIdAdmin, label: <IntlMessages id={`role.admin`} /> },
  { id: roleIdDirector, label: <IntlMessages id={`component.etablishments.info.director`} /> },
  { id: roleIdSupervisor, label: <IntlMessages id={`role.supervisor`} /> },
  { id: roleIdProfessor, label: <IntlMessages id={`toDo.professor`} /> },
  { id: roleIdStudent, label: <IntlMessages id={`userStuppDisplay.Student`} /> },
  { id: roleIdParent, label: <IntlMessages id={`userStuppDisplay.Parent`} /> },
];
/* eslint eqeqeq: "off" */
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
    /* eslint eqeqeq: "off" */
    const { permission, filtreRole } = this.props;
    return (
      <TableRow>
        <TableCell>
          {this.props.settings.languageId === 'tunisia'
            ? permission.permissionAr
            : this.props.settings.languageId === 'french'
            ? permission.permissionFr
            : permission.permissionAng}
        </TableCell>
        {filtreRole > -1 ? (
          <TableCell> {this.havePermission(listRole[filtreRole].id, permission.id)} </TableCell>
        ) : (
          listRole.map((element, index) => <TableCell key={index}> {this.havePermission(element.id, permission.id)} </TableCell>)
        )}
      </TableRow>
    );
  }
}

export default PermissionListItem;
