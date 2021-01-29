import React, { Component } from "react";
import About from "./About/index";
import Contact from "./Contact/index";
import ProfileHeader from "./ProfileHeader/index";
import Auxiliary from "../../../util/Auxiliary";
import Events from "./Events/index";
import { connect } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
class Profile extends Component {
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
        <ProfileHeader />
        <div className="jr-profile-content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-12">
              <About />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <Contact />
            </div>

            <div className="col-xl-12 col-lg-4 col-md-5 col-12">
              <Events />
            </div>
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
  };
}
export default connect(mapStateToProps)(Profile);
