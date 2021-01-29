import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import IntlMessages from "../../../../../util/IntlMessages";
import baseUrl from "../../../../../config/config";
import _ from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import Button from "@material-ui/core/Button";
import professor1 from "./Assets/prof1.jpg";
import professor2 from "./Assets/prof2.jpg";
import Switch from "@material-ui/core/Switch";
import { roleIdSuperAdmin } from "../../../../../config/config";
import { roleIdAdmin } from "../../../../../config/config";
import { roleIdProfessor } from "../../../../../config/config";
import { roleIdDirector } from "../../../../../config/config";
import { Col } from "reactstrap";
import { Link, withRouter, NavLink, Route } from "react-router-dom";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";

// import { Redirect, Route, Switch } from 'react-router-dom';

class VitualClassListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: false,
      itemId: 0,
      modifModal: false,
      deleteIsopen: false,
      anchorEl: undefined,
      ClassVirtualObject: {},
    };
    this.handleShow = this.handleShow.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }
  handleShowDeleteModal = () => {
    this.setState({ menuState: false, deleteIsopen: true });
  };

  cancelModal() {
    this.setState({ modifModal: false, deleteIsopen: false });
  }
  handleShow = (e) => {
    e.preventDefault();
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.Item !== this.props.Item) {
      var ClassObject = {};
      ClassObject.id = this.props.Item.id;
      ClassObject.class_url = this.props.Item.class_url;
      ClassObject.password = this.props.Item.password;
      ClassObject.date_virtual_class = this.props.Item.date_virtual_class;
      ClassObject.start_time_class = this.props.Item.start_time_class;
      ClassObject.end_time_class = this.props.Item.end_time_class;
      ClassObject.status = this.props.Item.status;
      ClassObject.object = this.props.Item.object;
      ClassObject.establishment_id = this.props.Item.establishment_id;
      ClassObject.virtual_class_status = this.props.Item.virtual_class_status;
      ClassObject.subject_id = this.props.Item.subject_id;
      ClassObject.class_id = this.props.Item.class_id;
      ClassObject.professor_id = this.props.Item.professor_id;
    }
  }

  render() {
    
    const { anchorEl, menuState } = this.state;
    const sys = Date.parse(new Date()) / 60000;
    const start =
      Date.parse(
        this.props.Item.date_virtual_class.slice(0, 10) +
          " " +
          moment(this.props.Item.start_time_class).format("HH:mm")
      ) / 60000;
    const end =
      Date.parse(
        this.props.Item.date_virtual_class.slice(0, 10) +
          " " +
          moment(this.props.Item.end_time_class).format("HH:mm")
      ) / 60000;

    const statusButtonStyle = "#3F51B5";
  
    return ( 
      <div className="card package bg-white shadow">
      <div className="package-header  lighten-1 text-white" style={{ backgroundColor: this.props.Item.subjectColor}}>
       
        <h3 className="letter-spacing-base text-uppercase mb-0"> <strong>{this.props.Item.virtual_class_name}</strong></h3>
      </div>

      <ul className="package-items package-items text-grey text-darken-3" style={{paddingLeft:"10%",paddingRight:"auto" ,paddingBottom:"10%",paddingTop:"auto"}}>
        <li>
         
          <div style={{  }}>
            <div>
              <h5
                style={{
                  color: this.props.Item.subjectColor,
                 
                }}
              >
                <strong> {this.props.Item.subjectName}</strong> &nbsp;
                {this.props.Item.classeName}
              </h5>{" "}
            </div>
            
          </div>
        </li>
        <li>
             <div
            
            style={{ display: "grid", gridTemplateColumns: "60% 100px" , color: "#9A9999"}}
          >
            <div style={{ fontSize: "13px" }}>
              {moment(this.props.Item.date_virtual_class).format("DD/MM/YYYY")}{" "}
            </div>
            <div style={{ fontSize: "13px" }}>
              {moment(this.props.Item.start_time_class).format("HH:mm")}  &nbsp; à &nbsp;
              {moment(this.props.Item.end_time_class).format("HH:mm")}
            </div>
          </div>

        </li>
        <li>
         
          <div style={{ display: "grid" }}>
           <div style={{ color: "#5B65A9" ,fontSize: "15px" }}>
              {this.props.userProfile.role_id === roleIdProfessor ? (
                ""
              ) : (
                <>
                  {this.props.Item.profName}&nbsp;{this.props.Item.profSurname}{" "}
                </>
              )}{" "}
            </div>
            <div
              style={{ color: " #A9A9A8", fontSize: "15px" }}
            >
              Mot de passe : {this.props.Item.password}{" "}
            </div>
          </div>
        </li>
        <li>
        <div
              className={` badge  ${
                start > sys
                  ? "bg-amber"
                  : end > sys
                  ? "text-white bg-success"
                  : "text-white bg-danger"
              }`}
              style={{ height: "20px" ,width:"80px",float:"left"}}
            >
              {start > sys ? (
                <IntlMessages id="status.classe.virtual.programmé" />
              ) : end > sys ? (
                <IntlMessages id="status.classe.virtual.progrés" />
              ) : (
                <IntlMessages id="status.classe.virtual.términé" />
              )}
            </div>
        </li>
      </ul>

      <div className="package-footer" style={{paddingLeft:"15%"}}>
           {this.props.Item.status ? (
            <div
              className="d-flex flex-row justify-content-around bd-highlight  "
              style={{ bottom: "0px", height: "30px" ,position: "absolute"}}
            >
              {end < sys ? (
                ""
              ) : (
                <div className=" bd-highlight">
                  <Button
                    style={{
                      backgroundColor: "#BFBFBE",
                      color: "white",
                      width: "80px",
                      height: "20px",
                    }}
                    target="_blank"
                  >
                    <span style={{ fontSize: "12px" }}>
                      <NavLink
                        to={`/app/e-learning/virtual_classes_details/${this.props.Item.id}/${this.props.Item.virtual_class_name}`}
                      >
                        <span className="nav-text">
                          <IntlMessages id="join.class.viruel" />
                        </span>
                      </NavLink>
                    </span>
                  </Button>
                </div>
              )}

              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="add-service"
                    yes={() => (
                      <>
                        {start > sys ? (
                          <div className=" bd-highlight">
                            <Button
                              style={{
                                backgroundColor: "white",
                                color: "#7C7C7C",
                                width: "50px",
                                height: "20px",
                              }}
                              // href={this.state.ClassVirtualObject.class_url}
                              onClick={(e) => {
                                this.setState({ menuState: false });
                                this.props.editClassShowModal(this.props.Item);
                              }}
                              target="_blank"
                            >
                              <span
                                style={{ fontSize: "12px", color: "#7C7C7C" }}
                              >
                                <IntlMessages id="button.modify" />
                              </span>
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}

                        {start > sys ? (
                          <div
                            className=" bd-highlight"
                            style={{
                              width: "20px",
                              height: "30px",
                            
                            }}
                          >
                            <IconButton
                              size="small"
                              className="icon-btn"
                              onClick={(e) => {
                                this.setState({ menuState: false });
                                this.props.handleDelete(this.props.Item);
                              }}
                            >
                              <i
                                className="zmdi zmdi-delete"
                                style={{ color: "#A3A3A3" }}
                              />
                            </IconButton>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  />
                )}
              </RoleContext.Consumer>
            </div>
          ) : (
            " "
          )}
      </div>
    </div>

      // <div className="card product-item mr-4">
      //   <div
      //     style={{
      //       height: "99px",
      //       width: "170px",
      //       backgroundColor: this.props.Item.subjectColor,
      //     }}
      //   >
      //     <div>
      //       <div
      //         style={{
      //           textAlign: "center",
      //           marginTop: "20%",
      //           marginBottom: "auto",
      //         }}
      //       >
      //         <h3 style={{ color: "white", fontWeight: "bold" }}>
      //           {this.props.Item.virtual_class_name}
      //         </h3>
      //       </div>
      //     </div>
      //   </div>

      //   {/* //body */}

      //   <div
      //     style={{
      //       height: "170px",
      //       width: "170px",
      //     }}
      //   >
      //     <div style={{ display: "grid", gridTemplateColumns: "80px 80px" }}>
      //       <div>
      //         <h5
      //           style={{
      //             color: this.props.Item.subjectColor,
      //             marginLeft: "5px",
      //             marginTop: "5px",
      //           }}
      //         >
      //           <strong> {this.props.Item.virtual_class_name}</strong>
      //           <br /> {this.props.Item.classeName}
      //         </h5>{" "}
      //       </div>
      //       <div
      //         className={` badge  ${
      //           start > sys
      //             ? "bg-amber"
      //             : end > sys
      //             ? "text-white bg-success"
      //             : "text-white bg-danger"
      //         }`}
      //         style={{ marginTop: "10%", height: "20px" }}
      //       >
      //         {start > sys ? (
      //           <IntlMessages id="status.classe.virtual.programmé" />
      //         ) : end > sys ? (
      //           <IntlMessages id="status.classe.virtual.progrés" />
      //         ) : (
      //           <IntlMessages id="status.classe.virtual.términé" />
      //         )}
      //       </div>
      //     </div>

      //     <div
      //       style={{
      //         display: "grid",
      //         float: "right",
      //         marginTop: "-12px",
      //         color: "#9A9999",
      //         marginRight: "15px",
      //       }}
      //     >
      //       <div style={{ fontSize: "12px" }}>
      //         {moment(this.props.Item.date_virtual_class).format("DD/MM/YYYY")}{" "}
      //       </div>
      //       <div style={{ fontSize: "12px" }}>
      //         {moment(this.props.Item.start_time_class).format("HH:mm")}à
      //         {moment(this.props.Item.end_time_class).format("HH:mm")}
      //       </div>
      //     </div>

      //     <div style={{ display: "grid", marginTop: "22%" }}>
      //       <div style={{ color: "#5B65A9", marginLeft: "3px" }}>
      //         {this.props.userProfile.role_id === roleIdProfessor ? (
      //           ""
      //         ) : (
      //           <>
      //             {this.props.Item.profName}&nbsp;{this.props.Item.profSurname}{" "}
      //           </>
      //         )}{" "}
      //       </div>
      //       <div
      //         style={{ color: " #A9A9A8", marginLeft: "3px", fontSize: "10px" }}
      //       >
      //         Mot de passe : {this.props.Item.password}{" "}
      //       </div>
      //     </div>

      //     {/* footer */}
      //     {this.props.Item.status ? (
      //       <div
      //         className="d-flex flex-row bd-highlight  "
      //         style={{ bottom: "0px", height: "20px", position: "absolute" }}
      //       >
      //         {end < sys ? (
      //           ""
      //         ) : (
      //           <div className=" bd-highlight">
      //             <Button
      //               style={{
      //                 backgroundColor: "#BFBFBE",
      //                 color: "white",
      //                 width: "80px",
      //                 height: "20px",
      //               }}
      //               target="_blank"
      //             >
      //               <span style={{ fontSize: "10px" }}>
      //                 <NavLink
      //                   to={`/app/e-learning/virtual_classes_details/${this.props.Item.id}/${this.props.Item.virtual_class_name}`}
      //                 >
      //                   <span className="nav-text">
      //                     <IntlMessages id="join.class.viruel" />
      //                   </span>
      //                 </NavLink>
      //               </span>
      //             </Button>
      //           </div>
      //         )}

      //         <RoleContext.Consumer>
      //           {({ role }) => (
      //             <Can
      //               role={role}
      //               perform="add-service"
      //               yes={() => (
      //                 <>
      //                   {start > sys ? (
      //                     <div className=" bd-highlight">
      //                       <Button
      //                         style={{
      //                           backgroundColor: "white",
      //                           color: "#7C7C7C",
      //                           width: "50px",
      //                           height: "20px",
      //                         }}
      //                         // href={this.state.ClassVirtualObject.class_url}
      //                         onClick={(e) => {
      //                           this.setState({ menuState: false });
      //                           this.props.editClassShowModal(this.props.Item);
      //                         }}
      //                         target="_blank"
      //                       >
      //                         <span
      //                           style={{ fontSize: "12px", color: "#7C7C7C" }}
      //                         >
      //                           <IntlMessages id="button.modify" />
      //                         </span>
      //                       </Button>
      //                     </div>
      //                   ) : (
      //                     ""
      //                   )}

      //                   {start > sys ? (
      //                     <div
      //                       className=" bd-highlight"
      //                       style={{
      //                         width: "20px",
      //                         height: "20px",
      //                         paddingRight: "20px",
      //                         paddingBottom: "20px",
      //                       }}
      //                     >
      //                       <IconButton
      //                         size="small"
      //                         className="icon-btn"
      //                         onClick={(e) => {
      //                           this.setState({ menuState: false });
      //                           this.props.handleDelete(this.props.Item);
      //                         }}
      //                       >
      //                         <i
      //                           className="zmdi zmdi-delete"
      //                           style={{ color: "#A3A3A3" }}
      //                         />
      //                       </IconButton>
      //                     </div>
      //                   ) : (
      //                     ""
      //                   )}
      //                 </>
      //               )}
      //             />
      //           )}
      //         </RoleContext.Consumer>
      //       </div>
      //     ) : (
      //       " "
      //     )}
      //   </div>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
  };
}

export default connect(mapStateToProps)(VitualClassListItems);
