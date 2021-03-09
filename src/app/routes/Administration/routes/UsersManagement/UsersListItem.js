import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../../../../assets/images/default-Avatar.png';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from '../../../../../config/config';
import ModalDetailsUser from './ModalDetailsUser';
import { deleteUserPermitted, editUserPermitted } from '../../../../../constants/validationFunctions';
import ModalDetailsUserNameAndPassword from './ModalDetailsUserNameAndPassword';
const listRolesUsers = [
  {
    id: roleIdAdmin,
    label: <IntlMessages id="role.admin" />,
    value: roleIdAdmin,
    labelBackEnd: 'Admin',
  },
  {
    id: roleIdDirector,
    label: 'Directeur Des Ressources Humaines',
    value: roleIdDirector,
    labelBackEnd: 'Director',
  },
  {
    id: roleIdSupervisor,
    label: 'Responsable formation',
    value: roleIdSupervisor,
    labelBackEnd: 'Vie scolaire',
  },
  {
    id: roleIdParent,
    label: "Chef d'agence",
    value: roleIdParent,
    labelBackEnd: 'Responsable formation',
  },
  {
    id: roleIdProfessor,
    label: <IntlMessages id={`toDo.professor`} />,
    value: roleIdProfessor,
    labelBackEnd: 'Formateur',
  },
  {
    id: roleIdStudent,
    label: 'Collaborateur',
    value: roleIdStudent,
    labelBackEnd: 'Participant',
  },
];
/* eslint eqeqeq: "off" */
class UsersListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: '',
      menuState: false,
      anchorEl: undefined,
      openDetails: false,
      openDetailsUsernamePassword: false,
    };
    this.handleCancelDetails = this.handleCancelDetails.bind(this);
    this.handleOpenDetails = this.handleOpenDetails.bind(this);
    this.handleOpenDetailsUsernamePassword = this.handleOpenDetailsUsernamePassword.bind(this);
    this.handleCancelDetailsUsernamePassword = this.handleCancelDetailsUsernamePassword.bind(this);
  }
  handleCancelDetailsUsernamePassword() {
    this.setState({ openDetailsUsernamePassword: false });
  }
  handleOpenDetailsUsernamePassword() {
    this.setState({ menuState: false, openDetailsUsernamePassword: true });
  }
  handleCancelDetails() {
    this.setState({ openDetails: false });
  }
  handleOpenDetails() {
    this.setState({ menuState: false, openDetails: true });
  }
  render() {   /* eslint eqeqeq: "off" */
    const { user } = this.props;
    let listSubjectStudent = [];
    let listClassProf = [];
    let roleNameUser = '';
    let roleUser = listRolesUsers.find((element) => element.id===user.roleId);
    if (roleUser != undefined) {
      roleNameUser = roleUser.label;
    }

    if (this.props.roleIdFilter===roleIdProfessor) {
      listSubjectStudent = _.uniqBy(user.inforamtionsProf, 'subjectName');
      listClassProf = _.uniqBy(user.inforamtionsProf, 'classname');
    }
    return (
      <>
        <TableRow key={user.id}>
          <TableCell>
            {user.urlPhoto ? (
              <Avatar align="left" className="size-90" alt="..." src={user.urlPhoto} />
            ) : (
              <Avatar align="left" className="size-90" alt="..." src={defaultAvatar} />
            )}
          </TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.surname}</TableCell>
          {this.props.roleIdFilter===0 ? <TableCell>{roleNameUser}</TableCell> : null}
          {/* ------------     affichage classe et matiére pour prof -------------------------------------------*/}
          {this.props.roleIdFilter===roleIdProfessor ? (
            <TableCell>{listSubjectStudent.map((element, index) => element.subjectName + ' , ')}</TableCell>
          ) : null}
          {this.props.roleIdFilter===roleIdProfessor ? <TableCell>{listClassProf.map((element) => element.classname + ' , ')}</TableCell> : null}
          {/* ------------     affichage classe et parent pour student -------------------------------------------*/}
          {this.props.roleIdFilter===roleIdStudent ? <TableCell>{user.agencyName}</TableCell> : null}
          {this.props.roleIdFilter===roleIdStudent ? (
            <TableCell>
              {user.parentId.length===0 ? 'Non Affécté' : user.parentId.map((element) => element.parentName + ' ' + element.parentLastName)}
            </TableCell>
          ) : null}
          {this.props.roleIdFilter===roleIdStudent ? (
            <TableCell>
              {user.inforamtionsStudent.length===0
                ? 'Non Affécté'
                : user.inforamtionsStudent.map((element) => (element.classname === null ? 'Non Affécté' : element.classname + ' , '))}
            </TableCell>
          ) : null}
          {/* ------------     affichage enfant et classe pour parent -------------------------------------------*/}

          {this.props.roleIdFilter===roleIdParent ? (
            <TableCell align="justify">
              {user.agencyName}
              {/* <div className="d-flex flex-column align-items-right">
                {user.inforamtionsParent.length===0
                  ? "Non Affecté"
                  : user.inforamtionsParent.map((element) => (
                      <div>
                        {element.studentClassName===null
                          ? "Non Affecté"
                          : element.studentClassName}
                      </div>
                    ))}
              </div>{" "} */}
            </TableCell>
          ) : null}
          {this.props.roleIdFilter===roleIdParent ? (
            <TableCell align="justify">
              <div className="d-flex flex-column align-items-right">
                {user.inforamtionsParent.length===0
                  ? 'Non Affecté'
                  : user.inforamtionsParent.map((element) => (
                      <div>
                        {element.studentName + ' '} {element.studentLastName}
                      </div>
                    ))}
              </div>
            </TableCell>
          ) : null}
          {/* ------------     éliminer colonne email  -------------------------------------------*/}
          {this.props.roleIdFilter===roleIdAdmin ||
          this.props.roleIdFilter===roleIdDirector ||
          this.props.roleIdFilter===roleIdSupervisor ||
          this.props.roleIdFilter===0 ? (
            <TableCell>{user.email}</TableCell>
          ) : null}
          <TableCell>{user.phone}</TableCell>
          <TableCell align="justify">
            <div className="d-flex  flex-row align-items-right">
              {this.props.userProfile.role_id === roleIdSuperAdmin || this.props.userProfile.role_id === roleIdAdmin ? (
                <IconButton size="meduim" className="icon-btn" onClick={(e) => this.handleOpenDetailsUsernamePassword(e)}>
                  <i className="zmdi zmdi-lock-outline" style={{ color: 'text-grey' }} />
                </IconButton>
              ) : (
                ''
              )}
              <IconButton
                size="meduim"
                className="icon-btn"
                // onClick={(e) => this.props.handleDelete(cours)}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: 'grey',
                    fontWeight: 'normal',
                    fontSize: 10,
                  }}
                >
                  <IntlMessages id="user.new.password" />
                </Typography>
                <i className="zmdi zmdi-replay" style={{ color: 'text-grey' }} />
              </IconButton>
              &nbsp; | &nbsp;
              <IconButton size="medium" className="icon-btn" onClick={(e) => this.handleOpenDetails(e)}>
                <i className="zmdi zmdi-eye" style={{ color: 'text-grey' }} />
              </IconButton>
              {editUserPermitted(user.roleName, this.props.userPermission) ? (
                <>
                  &nbsp; | &nbsp;
                  <Button
                    style={{
                      backgroundColor: 'white',
                      color: '#7C7C7C',
                      width: '50px',
                      height: '20px',
                    }}
                    onClick={(e) => {
                      this.props.handleEdit(user);
                    }}
                    target="_blank"
                  >
                    <span style={{ fontSize: '12px', color: '#7C7C7C' }}>
                      <IntlMessages id="button.modify" />
                    </span>
                  </Button>
                </>
              ) : (
                ''
              )}
              {deleteUserPermitted(user.roleName, this.props.userPermission) ? (
                <>
                  &nbsp; | &nbsp;
                  <IconButton
                    size="medium"
                    className="icon-btn"
                    // onClick={(e) => this.props.handleDelete(cours)}
                  >
                    <i className="zmdi zmdi-delete" style={{ color: 'text-grey' }} />
                  </IconButton>
                </>
              ) : (
                ''
              )}
            </div>
          </TableCell>
        </TableRow>
        {this.state.openDetails ? (
          <ModalDetailsUser
            handleOpenDetails={this.handleOpenDetails}
            handleCancelDetails={this.handleCancelDetails}
            openDetails={this.state.openDetails}
            userItem={this.props.user}
            userProfile={this.props.userProfile}
            establishments={this.props.establishments}
          />
        ) : (
          ''
        )}
        {this.state.openDetailsUsernamePassword ? (
          <ModalDetailsUserNameAndPassword
            handleOpenDetailsUsernamePassword={this.handleOpenDetailsUsernamePassword}
            handleCancelDetailsUsernamePassword={this.handleCancelDetailsUsernamePassword}
            openDetailsUsernamePassword={this.state.openDetailsUsernamePassword}
            userItem={this.props.user}
            userProfile={this.props.userProfile}
          />
        ) : (
          ''
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    settings: state.settings.locale,
    userProfile: state.auth.userProfile,
    userPermission: state.PermissionReducer.userPermission,
    establishments: state.establishment.establishementInformations,
  };
}

export default connect(mapStateToProps, {})(UsersListItem);
