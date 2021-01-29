import React, { Component } from "react";
import About from "../../../../components/profile/About/index";
import Biography from "../../../../components/profile/Biography/index";
import Events from "../../../../components/profile/Events/index";
import Contact from "../../../../components/profile/Contact/index";
import Friends from "../../../../components/profile/Friends/index";
import Photos from "../../../../components/profile/Photos/index";
import ProfileHeader from "../../../../components/profile/ProfileHeader/index";
import { connect } from "react-redux";
import Auxiliary from "../../../../util/Auxiliary";
import { friendList } from "./data";
import { photoList } from "../Wall/data";
class Profile extends React.Component {
  render() {
    return (
      <Auxiliary>
        <ProfileHeader userProfile={this.props.userProfile} />
        <div className="jr-profile-content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-12">
              <About userProfile={this.props.userProfile} />
              {/* <Biography userProfile={this.props.userProfile} />
              <Events userProfile={this.props.userProfile} /> */}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <Contact userProfile={this.props.userProfile} />
              <div className="row">
                {/* <div className="col-12">
                  <Friends
                    friendList={friendList}
                    userProfile={this.props.userProfile}
                  />
                </div>
                <div className="col-12">
                  <Photos
                    photoList={photoList}
                    userProfile={this.props.userProfile}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
  };
}
export default connect(mapStateToProps, {})(Profile);
