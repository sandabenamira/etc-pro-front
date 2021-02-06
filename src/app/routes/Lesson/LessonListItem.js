import React from "react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
import Can from "../../../can";
import { RoleContext } from "../../../Context";
import coursStudent from "./Assets/coursStudent.webp";
import matiereScolaire from "./Assets/matiereScolaire.webp";

export default class LessonListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var imageList = [coursStudent, matiereScolaire];
    var imageListItem = imageList[Math.floor(Math.random() * imageList.length)];
    const { name, details, creation_date } = this.props.courseItem;
    const {
      courseItem,
      anchorEl,
      menuState,
      divEyeClassname,
      divEyeClassnameSpace,
    } = this.props;
     return (
      <RoleContext.Consumer>
        {({ role }) => (
          <div className="col-xl-3 col-md-4 col-sm-6 col-12">
            <div
              className="card product-item  "
              style={{
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              <div
                className="card-header border-0 p-0"
                style={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              >
                <div className="card-image">
                  <div className="grid-thumb-equal">
                    <span className="grid-thumb-cover jr-link">
                      <img alt="Remy Sharp" src={imageListItem} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="product-details">
                  <div className="row">
                    <div className="col-md-10 col-sm-10 col-10">
                      <h3 className="card-title fw-regular">
                        {"Sujet :" + name}{" "}
                      </h3>
                    </div>
                  </div>
                  <div className="d-flex ">
                    <h4 className="text-success">
                      {moment(creation_date).format("L")}{" "}
                    </h4>
                  </div>
                  <p>{"Description :" + details}</p>
                  <div className="d-flex flex-row  col-md-12 justify-content-between ">
                    <div className={divEyeClassnameSpace}></div>
                    <div className={divEyeClassname}>
                      <Can
                        role={role}
                        perform="lesson-filter-class:visit"
                        yes={() => (
                          <IconButton
                            size="small"
                            className="icon-btn"
                            onClick={(e) => {
                              this.setState({ menuState: false });
                              this.props.handleEdit(courseItem, e);
                            }}
                          >
                            <i
                              className="zmdi zmdi-edit"
                              style={{ color: "#5422b9" }}
                            />
                          </IconButton>
                        )}
                      />
                      <Can
                        role={role}
                        perform="lesson-filter-class:visit"
                        yes={() => (
                          <IconButton
                            size="small"
                            className="icon-btn"
                            onClick={() =>
                              this.props.handleShowdelete(this.props.courseItem)
                            }
                          >
                            <i
                              className="zmdi zmdi-delete"
                              style={{ color: "#5422b9" }}
                            />
                          </IconButton>
                        )}
                      />
                      <IconButton
                        size="small"
                        className="icon-btn"
                        onClick={() =>
                          this.props.handleShowDownloadModal(
                            this.props.courseItem
                          )
                        }
                      >
                        <i
                          className="zmdi zmdi-eye"
                          style={{ color: "#5422b9" }}
                        />
                      </IconButton>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </RoleContext.Consumer>
    );
  }
}
