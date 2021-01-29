import React from "react";
import { getAllUsers } from "../../../../../actions/appUserAction";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
import UserListItem from "./UserInformation/UserListItems";
import CardBox from "../../../../../components/CardBox/index";
import {
  roleIdProfessor,
  roleIdSuperAdmin,
} from "../../../../../config/config";
import { roleIdStudent } from "../../../../../config/config";
import  ModalSchoolYears  from "./ModalSchoolYears";
class UsersList extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      archiveModal: false,
      idClass: "",
      classItem: [],
      anchorEl: undefined,
      menuState: false,
      itemId: 0,
      user: "",
      isOpenResetModal: false,
      isOpenResetModalSchoolYears:false
    };
    this.editUser = this.editUser.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRequestResetPassword = this.handleRequestResetPassword.bind(this);
    this.showModalSchoolYears = this.showModalSchoolYears.bind(this);

  }

  handleRequestClose = () => {
    this.setState({ isOpenResetModal: false });
  };

  showModalSchoolYears = (e) => {
    e.preventDefault(); 
    this.setState({ isOpenResetModalSchoolYears: true });
  };
  closeModalSchoolYears = () => {
    this.setState({ isOpenResetModalSchoolYears: false });
  };
  handleRequestResetPassword = () => {
    this.setState({ isOpenResetModal: true });
  };
  componentDidMount() {}
  editUser = (id) => {
    this.props.editUser(id);
  };

  render() {
    const users = Array.from(this.props.users);
    var userList = [];
    if (this.props.role === roleIdSuperAdmin) {
      if (this.props.establishment_id === "") {
        userList = users;
      } else {
        userList = this.props.studentListByClass;
      }
    } else {
      if (this.props.role_id === "" || this.props.role_id == 0) {
        userList = users;
      } else if (this.props.role_id === roleIdStudent) {
        userList = this.props.studentListByClass;
      } else if (this.props.role_id === roleIdProfessor) {
        userList = this.props.studentListByClass;
      } else {
        userList = users.filter(
          (element) => element.role_id === this.props.role_id
        );
      }
    }

    if (userList.length > 0) {
      return (
        <div>
          <CardBox styleName="col-lg-12">
            <div className="table-responsive-material">
              <Table className="default-table table-unbordered table table-sm table-hover" onClick={(e)=>this.showModalSchoolYears(e)}>
                <TableHead className="th-border-b">
                  <TableRow>
                    <TableCell align="center">
                      <IntlMessages id="stuppUser.user.avatar" />
                    </TableCell>
                    <TableCell align="left">
                      <IntlMessages id="stuppUser.formadd.id" />
                    </TableCell>
                    <TableCell align="left">
                      <IntlMessages id="stuppUser.formadd.surname" />
                    </TableCell>
                    <TableCell align="left">
                      <IntlMessages id="stuppUser.formadd.name" />
                    </TableCell>

                    {(() => {
                      if (this.props.roleActivate) {
                        return (
                          <TableCell align="left">
                            <IntlMessages id="stuppUser.formadd.role" />
                          </TableCell>
                        );
                      }
                    })()}
                    <TableCell align="left">
                      <IntlMessages id="stuppUser.formadd.address_mail" />
                    </TableCell>
                    <TableCell align="left">
                      <IntlMessages id="stuppUser.formadd.phone.home" />
                    </TableCell>
                    <TableCell align="right">
                      <IntlMessages id="stuppUser.action" />
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {userList.map((user, index) => {
                    if (user.user) {
                      return (
                        <UserListItem
                          key={index}
                          user={user}
                          editUser={this.editUser}
                          roleActivate={this.props.roleActivate}
                          establishmentName={this.props.establishmentName}
                        />
                      );
                    }
                  })}
                </TableBody>
              </Table>
              {/* {this.state.isOpenResetModalSchoolYears && 
              <ModalSchoolYears
              isOpenResetModalSchoolYears={this.state.isOpenResetModalSchoolYears}
              closeModalSchoolYears={this.closeModalSchoolYears}
              />
              } */}
            </div>
          </CardBox>
        </div>
      );
    } else {
      return (
        <CardBox styleName="col-lg-12">
          <div className="table-responsive-material">
            <Table className="default-table table-unbordered table table-sm table-hover">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <IntlMessages id="stuppUser.user.avatar" />
                  </TableCell>
                  <TableCell align="left">
                    <IntlMessages id="stuppUser.formadd.surname" />
                  </TableCell>
                  <TableCell align="left">
                    <IntlMessages id="stuppUser.formadd.name" />
                  </TableCell>
                  <TableCell align="left">
                    <IntlMessages id="stuppUser.formadd.role" />
                  </TableCell>
                  <TableCell align="left">
                    <IntlMessages id="stuppUser.formadd.address_mail" />
                  </TableCell>
                  <TableCell align="left">
                    <IntlMessages id="stuppUser.formadd.phone" />
                  </TableCell>
                  <TableCell align="right">
                    <IntlMessages id="stuppUser.action" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </div>
        </CardBox>
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(
  mapStateToProps,
  {
    getAllUsers,
  }
)(UsersList);
