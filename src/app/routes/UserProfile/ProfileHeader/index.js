import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import "moment/locale/fr";
import imageStudent from "../../../../assets/images/supAdmin.png";
class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      photo: imageStudent,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile != this.props.userProfile) {
      this.setState(
        {
          user: this.props.userProfile,
          photo:
            this.props.userProfile.user.photo===null
              ? imageStudent
              : this.props.userProfile.user.photo,
        }
      );
    }
  }
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="jr-profile-banner">
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top mr-4 ml-4 mt-3">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
                <Avatar className="size-90" alt="..." src={this.state.photo} />
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">
                  {this.state.user.user != undefined
                    ? this.state.user.user.name.charAt(0).toUpperCase() +
                      this.state.user.user.name.slice(1) +
                      " " +
                      this.state.user.user.surname.charAt(0).toUpperCase() +
                      this.state.user.user.surname.slice(1)
                    : ""}
                </h2>
                {/* <p className="mb-0 jr-fs-lg">
                  {this.state.user.user != undefined
                    ? this.state.user.user.zip_code +
                      " , " +
                      this.state.user.user.address.charAt(0).toUpperCase() +
                      this.state.user.user.address.slice(1)
                    : ""}
                </p> */}
              </div>
            </div>
            {/* <div className="jr-profile-banner-top-right">
              <ul className="jr-follower-list">
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">
                    2k+
                  </span>
                  <span className="jr-fs-sm">Followers</span>
                </li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">
                    847
                  </span>
                  <span className="jr-fs-sm">Following</span>
                </li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">
                    327
                  </span>
                  <span className="jr-fs-sm">Friends</span>
                </li>
              </ul>
            </div> */}
          </div>
          {/* <div className="jr-profile-banner-bottom mr-4 ml-4">
            <div className="jr-tab-list">
              <ul className="jr-navbar-nav">
                <li>
                  <span className="jr-link">Timeline</span>
                </li>
                <li>
                  <span className="jr-link">About</span>
                </li>
                <li>
                  <span className="jr-link">Photos</span>
                </li>
                <li>
                  <span className="jr-link">
                    Friends <span className="jr-fs-xs">287</span>
                  </span>
                </li>
                <li>
                  <span className="jr-link">More</span>
                </li>
              </ul>
            </div>
            <span className="jr-link jr-profile-setting">
              <i className="zmdi zmdi-settings mr-2" />
              <span className="d-inline-flex align-middle ml-1 jr-ml-sm-0">
                Setting
              </span>
            </span>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
