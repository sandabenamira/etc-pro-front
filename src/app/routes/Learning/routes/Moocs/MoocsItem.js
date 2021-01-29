import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import IntlMessages from "../../../../../util/IntlMessages";
import baseUrl from "../../../../../config/config";
import _ from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import Button from "@material-ui/core/Button";
import StarRatingComponent from "react-star-rating-component";
import prof from "../VirtualClasses/./Assets/prof1.jpg";
import { roleIdSuperAdmin } from "../../../../../config/config";
import { roleIdAdmin } from "../../../../../config/config";
import { roleIdProfessor } from "../../../../../config/config";
import { NavLink } from "react-router-dom";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import moocsPoster from "./Assets/moocsPoster.jpg";
import HoverVideoPlayer from "react-hover-video-player";
import img1 from "./Assets/img1.jpg";
import img2 from "./Assets/img2.jpg";
import img3 from "./Assets/img3.png";
import img4 from "./Assets/img4.jpg";
class MoocsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: false,
      itemId: 0,
      deleteIsopen: false,
      anchorEl: undefined,
      imagesList: [
        "./Assets/img1.jpg",
        "./Assets/img2.jpg",
        "./Assets/img3.png",
        "./Assets/img4.jpg",
      ],
    };
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
  }
  handleShowDeleteModal = () => {
    this.setState({ menuState: false, deleteIsopen: true });
  };

  onOptionMenuSelect = (event) => {
    this.setState({
      menuState: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  render() {
    const { anchorEl, menuState } = this.state;
    const { moocsItem } = this.props;
    var things = [ img2, img3, img4];
    var thing = things[Math.floor(Math.random() * things.length)];

    return (
      <div className="col-xl-3 col-md-4 col-sm-6 col-12">
        <div className="card product-item">
          <div className="card-header border-0 p-0">
            <div className="card-image">
              <div>
                {/* <span className="grid-thumb-cover jr-link">
                <img alt="Remy Sharp" src={prof}/>
              </span> */}
                <span>
                  {/* <video
                style={{width:"100%",height:"200px"}}
                  controls={true}
                  poster={moocsPoster}
                  
                >
                  <source src={moocsItem.moocsUrl} type="video/mp4" />
                </video> */}
                  <HoverVideoPlayer
                    style={{ width: "100%", height: "200px" }}
                    videoSrc={moocsItem.moocsUrl}
                    pausedOverlay={
                      <img
                        src={thing}
                        style={{ width: "100%", height: "200px" }}
                      />
                    }
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="card-body" style={{ paddingLeft: "10px" }}>
            <div className="product-details">
              <div
                style={{ fontSize: "16px", color: " #3c3b37", width: "100%" }}
              >
                {moocsItem.moocsTopic}
              </div>
              <div style={{ fontSize: "12px", color: " #73726c" }}>
                {" "}
                {moocsItem.moocsAssignCourse[0].subjectName}
              </div>
              <div className="d-flex ">
                <div style={{ fontSize: "10px", color: " #73726c" }}>
                  <IntlMessages id="moocs.date.add" /> :{" "}
                  {moment(moocsItem.dateOfCreation).format("DD/MM/YYYY") +
                    "  ,   " +
                    moocsItem.moocsSession}
                </div>
              </div>
              <div className="d-flex ">
                <div style={{ fontSize: "10px", color: " #73726c" }}>
                  <IntlMessages id="moocs.postor" /> :{" "}
                  {moocsItem.poster.name + " " + moocsItem.poster.surname}
                </div>
              </div>
            </div>
            {this.props.archived ? (
              ""
            ) : (
              <div>
                <div style={{ paddingTop: "30px", display: "flex" }}>
                  <div
                    style={{
                      width: "80px",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#BFBFBE",
                        color: "white",
                        height: "20px",
                      }}
                    >
                      <NavLink
                        to={`/app/e-learning/moocs_details/${moocsItem.id}/${moocsItem.moocsTopic}`}
                      >
                        <span style={{ fontSize: "10px" }}> Visualiser</span>
                      </NavLink>
                    </Button>
                  </div>
                  <RoleContext.Consumer>
                    {({ role }) => (
                      <Can
                        role={role}
                        perform="add-service"
                        yes={() => (
                          <>
                            <div
                              style={{
                                width: "60px",
                                paddingRight: "15px",
                              }}
                            >
                              <Button
                                style={{
                                  backgroundColor: "white",
                                  color: "#7C7C7C",
                                  height: "20px",
                                }}
                                onClick={(e) => {
                                  this.setState({ menuState: false });
                                  this.props.editMoocsShowModal(moocsItem);
                                }}
                              >
                                <span
                                  style={{ fontSize: "12px", color: "#7C7C7C" }}
                                >
                                  <IntlMessages id="button.modify" />
                                </span>
                              </Button>
                            </div>
                            <div
                              className=" bd-highlight"
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingLeft: "5px",
                              }}
                            >
                              <IconButton
                                size="small"
                                className="icon-btn"
                                onClick={(e) => {
                                  this.props.handleDelete(moocsItem);
                                }}
                              >
                                <i
                                  className="zmdi zmdi-delete"
                                  style={{ color: "#A3A3A3" }}
                                />
                              </IconButton>
                            </div>
                          </>
                        )}
                      />
                    )}
                  </RoleContext.Consumer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
  };
}

export default connect(mapStateToProps)(MoocsItem);
