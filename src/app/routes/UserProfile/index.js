import React, { Component } from "react";
import About from "./About/index";
import Contact from "./Contact/index";
import ProfileHeader from "./ProfileHeader/index";
import Auxiliary from "../../../util/Auxiliary";
// import Events from "./Events/index";
import { connect } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
class UserProfile extends Component {
  render() {
    return (
      <Auxiliary>
         {this.props.successStatus ? (
          <div>
            {" "}
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
            &nbsp;&nbsp;&nbsp;
          </div>
        ) : (
          ""
        )}
        {this.props.errorStatus ? (
          <div>
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message}</span>
            </UncontrolledAlert>
            &nbsp;&nbsp;&nbsp;
          </div>
        ) : (
          ""
        )}
        {/* <ProfileHeader userProfile={this.props.userProfile}/>
         */}
        <div className="jr-profile-content">
          <div className="row d-flex justify-content-center">
            <div className=" d-flex justify-content-center col-sm-12 col-lg-12 col-md-7">
              <About  userProfile={this.props.userProfile}/>
            </div>
            {/* <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <Contact />
            </div> */}

            {/* <div className="col-xl-12 col-lg-4 col-md-5 col-12">
              <Events />
            </div> */}
          </div>
        </div>
      </Auxiliary>
    );
  }
}
function mapStateToProps(state) {
  return {
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    userProfile: state.auth.userProfile,

  };
}
export default connect(mapStateToProps)(UserProfile);
