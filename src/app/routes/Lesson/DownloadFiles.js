import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import CardBox from "../../../components/CardBox/index";
import Auxiliary from "../../../util/Auxiliary";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { getUserProfile } from "../../../actions/Auth";
import { subjectsByLevelBySection } from "../../../actions/subjectAction";
import { RoleContext } from "../../../Context";
import Can from "../../../can";
import Aux from "../../../util/Auxiliary.js";
import _ from "lodash";
import axios from "axios";
import baseUrl from "../../../config/config";
import imageLogo from "./Assets/image.png";
import docLogo from "./Assets/pdf.png";
import videoLogo from "./Assets/video.png";
import { element } from "prop-types";
import { classService } from "../../../_services/class.service";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class DownloadFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoUrl: [],
      pdfUrl: [],
      imageUrl: [],
      loader: true,
    };
  }

  componentDidMount() {
    if (this.state.loader) {
      setTimeout(() => {
        this.setState({ loader: false });
      }, 5000);
    }
  }
  componentWillMount() {
    axios
      .get(
        `${baseUrl.baseUrl}/establishments/` +
          this.props.userProfile.establishment_id +
          `?access_token=${localStorage.token}`
      )
      .then((response) => {
        var establishmentName = response.data.name;
        axios
          .get(
            `${baseUrl.baseUrl}/courses/` +
              this.props.lessonId +
              `/courseFile?access_token=${localStorage.token}`
          )
          .then((response) => {
            var tabPDF = [];
            var tabVideo = [];
            var tabImage = [];

            if (!_.isEmpty(response.data)) {
              var files = response.data;
              files.map((element) => {
                var establishLogoUrl =
                  `/containers/` +
                  "classebook.data.storage" +
                  "/download/" +
                  element.file_name +
                  `?access_token=${localStorage.token}`;
                const fileExtension = element.file_name.replace(/^.*\./, "");

                classService.getPhoto(establishLogoUrl).then((response) => {
                  if (response) {
                    var arr = response.data;
                    var data2 = new Uint8Array(arr);
                    var blob;
                    if (fileExtension === "pdf") {
                      blob = new Blob([data2], { type: "application/pdf" });

                      var url = URL.createObjectURL(blob);
                      tabPDF.push(url);
                      this.setState({
                        pdfUrl: tabPDF,
                      });
                    } else if (
                      fileExtension === "mp4" ||
                      fileExtension === "mov" ||
                      fileExtension === "mpeg" ||
                      fileExtension === "asf" ||
                      fileExtension === "x-m4v" ||
                      fileExtension === "webm"
                    ) {
                      blob = new Blob([data2], { type: "video/*" });

                      var url = URL.createObjectURL(blob);
                      tabVideo.push(url);
                      this.setState({
                        videoUrl: tabVideo,
                      });
                    } else {
                      blob = new Blob([data2], { type: "video/*" });

                      var url = URL.createObjectURL(blob);
                      tabImage.push(url);
                      this.setState({
                        imageUrl: tabImage,
                      });
                    }
                  }
                });
              });
            }
          });
      });
  }

  render() {
    return (
      <Auxiliary>
        <Modal isOpen={this.props.opendownload}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="course.download.modal.title" />}
          </ModalHeader>
          <br />
          <ModalBody>
            <form autoComplete="off">
              <div className="row">
                <CardBox
                  heading={<IntlMessages id="cours.video" />}
                  styleName="col-lg-12 text-primary"
                >
                  {this.state.loader && (
                    <div className="loader-view">
                      <CircularProgress />
                    </div>
                  )}
                  <RoleContext.Consumer>
                    {({ role }) => (
                      <div className="row">
                        {this.state.videoUrl.length > 0 ? (
                          <div className="complex-btn-wrapper">
                            {this.state.videoUrl.map((element, index) => (
                              <ButtonBase
                                focusRipple
                                onClick={() => {}}
                                href={element}
                                download
                                key={index}
                                className="complex-btn ripple-effect"
                                style={{
                                  width: "20%",
                                }}
                              >
                                <div
                                  className="img-src"
                                  style={{
                                    backgroundImage: `url(${videoLogo})`,
                                  }}
                                />
                                <div className="img-btn-overlay" />
                                <div className="img-btn">
                                  <Typography
                                    component="h3"
                                    type="subheading"
                                    color="inherit"
                                    className="img-title"
                                  >
                                    {
                                      <IntlMessages id="message.attach.download" />
                                    }
                                    <div className="img-marked" />
                                  </Typography>
                                </div>
                              </ButtonBase>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </RoleContext.Consumer>
                </CardBox>
              </div>

              <div className="row">
                <CardBox
                  heading={<IntlMessages id="cours.pdf" />}
                  styleName="col-lg-12 text-primary"
                >
                  {this.state.loader && (
                    <div className="loader-view">
                      <CircularProgress />
                    </div>
                  )}
                  <RoleContext.Consumer>
                    {({ role }) => (
                      <div className="row">
                        {this.state.pdfUrl.length > 0 ? (
                          <div className="complex-btn-wrapper">
                            {this.state.pdfUrl.map((element, index) => (
                              <ButtonBase
                                focusRipple
                                onClick={() => {}}
                                href={element}
                                download
                                key={index}
                                className="complex-btn ripple-effect"
                                style={{
                                  width: "20%",
                                }}
                              >
                                <div
                                  className="img-src"
                                  style={{
                                    backgroundImage: `url(${docLogo})`,
                                  }}
                                />
                                <div className="img-btn-overlay" />
                                <div className="img-btn">
                                  <Typography
                                    component="h3"
                                    type="subheading"
                                    color="inherit"
                                    className="img-title"
                                  >
                                    {
                                      <IntlMessages id="message.attach.download" />
                                    }
                                    <div className="img-marked" />
                                  </Typography>
                                </div>
                              </ButtonBase>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </RoleContext.Consumer>
                </CardBox>
              </div>
              <div className="row">
                <CardBox
                  heading={<IntlMessages id="cours.image" />}
                  styleName="col-lg-12 text-primary"
                >
                  {this.state.loader && (
                    <div className="loader-view">
                      <CircularProgress />
                    </div>
                  )}
                  <RoleContext.Consumer>
                    {({ role }) => (
                      <div className="row">
                        {this.state.imageUrl.length > 0 ? (
                          <div className="complex-btn-wrapper">
                            {this.state.imageUrl.map((element, index) => (
                              <ButtonBase
                                focusRipple
                                onClick={() => {}}
                                href={element}
                                download
                                key={index}
                                className="complex-btn ripple-effect"
                                style={{
                                  width: "20%",
                                }}
                              >
                                <div
                                  className="img-src"
                                  style={{
                                    backgroundImage: `url(${imageLogo})`,
                                  }}
                                />
                                <div className="img-btn-overlay" />
                                <div className="img-btn">
                                  <Typography
                                    component="h3"
                                    type="subheading"
                                    color="inherit"
                                    className="img-title"
                                  >
                                    {
                                      <IntlMessages id="message.attach.download" />
                                    }
                                    <div className="img-marked" />
                                  </Typography>
                                </div>
                              </ButtonBase>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </RoleContext.Consumer>
                </CardBox>
              </div>

              <div className="col-md-12 text-right ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.props.handleCancel}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
  };
}
export default connect(
  mapStateToProps,
  {
    getUserProfile,
  }
)(DownloadFiles);
