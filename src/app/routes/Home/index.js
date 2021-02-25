import React from "react";
import IntlMessages from "../../../util/IntlMessages";
import { RoleContext } from "../../../Context";
import Can from "../../../can";
import { connect } from "react-redux";
import ResetPasswordModal from "./ResetPasswordModal";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  roleIdProfessor,
  roleIdStudent,
  roleIdParent,
} from "../../../config/config";
import { classService } from "../../../_services/class.service";
import moment from "moment";
import StudentDashborad from "../Home/DashboradStudent/StudentDashboard";
import ProfessorDashborad from "../Home/DashboradProfessor/ProfessorDashboard";
import { getAllUsersByEstablishmentId } from "../../../actions/stuppUserAction";
import AdminDashboard from "../Home/DashboardAdmin/AdminDashboard";

let currentDate = new Date();

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: undefined,
      menuState: false,
      resetPassword: "",
      oldPassword: "",
      confirmresetPassword: "",
      errorAlert: false,
      succedAlert: false,
      isopen: true,
      countesStudents: 0,
      countesProfessors: 0,
      countesParents: 0,
      countesComplaints: 0,
      nbreGirls: 0,
      nbreBoys: 0,
      listPayments: [],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      let listParent = this.props.users.filter(
        (element) => element.role_id == roleIdParent
      );
      let listStudent = this.props.users.filter(
        (element) => element.role_id == roleIdStudent
      );
      let listProf = this.props.users.filter(
        (element) => element.role_id == roleIdProfessor
      );

      this.setState({ countesProfessors: listProf.length });
      this.setState({ countesParents: listParent.length });
      this.setState({ countesStudents: listStudent.length });
      let nbreGirls = listStudent.filter(
        (element) => element.user.gender === "Féminin"
      );
      let nbreBoys = listStudent.filter(
        (element) => element.user.gender === "Masculin"
      );
      this.setState({ nbreGirls: nbreGirls.length, nbreBoys: nbreBoys.length });
    }
  }
  componentWillMount() {
    var first_connexion = localStorage.getItem("first_connexion");
    if (first_connexion === "false") {
      this.setState({
        isopen: false,
      });
    } else {
      this.setState({
        isopen: true,
      });
    }
  }

  componentDidMount() {
    const establishment_id = localStorage.getItem("establishment_id");

    //let apiEndpoint = "";

    // apiEndpoint = `/complaints/count?access_token=${localStorage.token}&where={"establishment_id":${establishment_id}}`;
    // classService.get(apiEndpoint).then((response) => {
    //   if (response) {
    //     this.setState({ countesComplaints: response.data.count });
    //   }
    // });
    // card4
    // apiEndpoint = `/profiles?access_token=${localStorage.token}&filter[include]=user&filter[where][and][0][establishment_id]=${establishment_id}&filter[where][and][1][role_id]=${roleIdStudent}`;

    //card7
    // let classId = 0;
    // const status = "Non payé";
    // const month = moment(currentDate)._d.getMonth() + 1;
    // apiEndpoint = `/classes?access_token=${localStorage.token}&filter[where][establishment_id]=${establishment_id}`;
  }

  onOptionMenuSelect = (event) => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  handleCancel() {
    this.setState({
      isopen: false,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  ResetPassword() {
    var data = {};
    data.password = this.state.resetPassword;
    data.oldpassword = this.state.oldPassword;
    data.userId = this.props.userProfile.user_id;
    var token = localStorage.getItem("token");
    axios
      .post(`${baseUrl}/users/change-password?access_token=` + token, {
        oldPassword: data.oldpassword,
        newPassword: data.password,
      })
      .then((response) => {
        axios
          .post(
            `${baseUrl}/users/reset-initial-password?access_token=${token}`,
            data,
            {
              headers: { "content-type": "application/json" },
            }
          )
          .then((res) => {
            if (res.data.existe === true) {
              localStorage.setItem("first_connexion", false);

              this.setState({
                succedAlert: true,
                resetPassword: "",
                confirmresetPassword: "",
                oldPassword: "",
              });
              setTimeout(
                function() {
                  this.setState({ succedAlert: false, isopen: false });
                }.bind(this),
                2000
              );
            } else {
              this.setState({
                errorAlert: true,
                resetPassword: "",
                confirmresetPassword: "",
                oldPassword: "",
              });
              setTimeout(
                function() {
                  this.setState({ errorAlert: false });
                }.bind(this),
                2000
              );
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.setState({
                errorAlert: true,
                resetPassword: "",
                confirmresetPassword: "",
                oldPassword: "",
              });
              setTimeout(
                function() {
                  this.setState({ errorAlert: false });
                }.bind(this),
                2000
              );
            }
          });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            errorAlert: true,
            resetPassword: "",
            confirmresetPassword: "",
            oldPassword: "",
          });
          setTimeout(
            function() {
              this.setState({ errorAlert: false });
            }.bind(this),
            2000
          );
        }
      });
  }

  render() {
    const first_connexion = localStorage.getItem("first_connexion");
    console.log("first_connexion render", first_connexion);
    const { anchorEl, menuState } = this.state;
    return (
      <RoleContext.Consumer>
        {({ role }) => (
          <div>
            <Can
              role={role}
              perform="home-filter:visit"
              yes={() => (
                <div>
                  <AdminDashboard />
                  {first_connexion === "true" ? (
                    <ResetPasswordModal
                      isopen={this.state.isopen}
                      handleCancel={this.handleCancel}
                      handleChange={this.handleChange}
                      ResetPassword={this.ResetPassword}
                      values={this.state}
                    />
                  ) : (
                    ""
                  )}
                </div>
              )}
            />
            <Can
              role={role}
              perform="Student.Dashborad:visit"
              yes={() => (
                <div>
                  <StudentDashborad />
                  {first_connexion === "true" ? (
                    <ResetPasswordModal
                      isopen={this.state.isopen}
                      handleCancel={this.handleCancel}
                      handleChange={this.handleChange}
                      ResetPassword={this.ResetPassword}
                      values={this.state}
                    />
                  ) : (
                    ""
                  )}
                </div>
              )}
            />
            <Can
              role={role}
              perform="Professor.Dashborad:visit"
              yes={() => (
                <div>
                  <ProfessorDashborad />
                  {first_connexion === "true" ? (
                    <ResetPasswordModal
                      isopen={this.state.isopen}
                      handleCancel={this.handleCancel}
                      handleChange={this.handleChange}
                      ResetPassword={this.ResetPassword}
                      values={this.state}
                    />
                  ) : (
                    ""
                  )}
                </div>
              )}
            />
          </div>
        )}
      </RoleContext.Consumer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    users: state.stuppUsers.remoteStuppUsers,
  };
};

export default connect(mapStateToProps, {
  getAllUsersByEstablishmentId,
})(Home);
