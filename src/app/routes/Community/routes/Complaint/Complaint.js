import React, { Component } from "react";
import CardBox from "../../../../../components/CardBox/index";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
 import AddComplaint from "./AddComplaint";
 import ComplaintTable from "./ComplaintTable";
// import ReservationList from "./ReservationList";
// import AddAffectation from "./AddAffectation";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import IntegrationAutosuggest from "./IntegrationAutosuggest.js";

export default class Complaint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenAddModal: false,
      isOpenReservationModal: false,
      isOpenAddAffectation: false,
    };
  }
  openAddModal() {
    this.setState({ isOpenAddModal: true });
  }
  openReservationModal() {
    this.setState({ isOpenReservationModal: true });
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-wrap flex-column bd-highlight mb-3">
          <div className="p-3  " style={{ color: "blue", fontSize: "20px" }}>
            <IntlMessages id={`Réclamations`} />
          </div>
          <div className="p-3 ">
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="add-service"
                  yes={() => (
                    <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
                      <div className="p-2 bd-highlight col-lg-1 col-md-5 col-sm-8">
                        <TextField
                          id="Role"
                          name="Role"
                          select
                          // value={this.state.filterClassId}
                          // onChange={this.handleChangeFilter('filterClassId')}
                          SelectProps={{}}
                          label={<IntlMessages id={`complaint.role`} />}
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {/* {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )} */}
                        </TextField>
                      </div>

                      <div className="pt-5 ">|</div>
                      <div className="p-2 bd-highlight col-lg-1 col-md-5 col-sm-2">
                        <TextField
                          id="status"
                          name="status"
                          select
                          // value={this.state.filterClassId}
                          // onChange={this.handleChangeFilter('filterClassId')}
                          SelectProps={{}}
                          label={<IntlMessages id={`complaint.status`} />}
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {/* {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )} */}
                        </TextField>
                      </div>
                      <div className="pt-5 ">|</div>

                      <div className="pt-5  bd-highlight col-lg-1 col-md-5 col-sm-6">
                        <IntlMessages id={`components.todo.date`} />
                      </div>

                      <div
                        className=" bd-highlight col-lg-3 col-md-6 col-sm-2"
                        style={{ paddingTop: "27px" }}
                      >
                        <IntegrationAutosuggest />
                      </div>
                    </div>
                  )}
                />
              )}
            </RoleContext.Consumer>
          </div>
          <div className="p-2 ">
            <CardBox styleName="col-lg-12 col-md-12">
              <div className="d-flex flex-wrap flex-row  ">
                <div className="p-3 bd-highlight">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="Add"
                    onClick={this.openAddModal.bind(this)}
                  >
                    {this.state.isOpenAddModal ? (
                      <RemoveSharpIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </Fab>
                  &nbsp;&nbsp; <IntlMessages id={`New.book`} />
                </div>
                <div className="p-3 bd-highlight">
                  <Fab
                    size="small"
                    aria-label="Add"
                    style={{
                      backgroundColor: "#ffbb33",
                      color: "#ffffff",
                    }}
                    // onClick={this.openArchive}
                  >
                    <DeleteOutlineIcon />
                  </Fab>
                  &nbsp;&nbsp; <IntlMessages id="icon.archives" />
                </div>
              </div>
            </CardBox>
          </div>

        {this.state.isOpenAddModal && (
             <div className="" >
            <CardBox styleName="col-lg-12 col-md-12" >
              <AddComplaint />
            </CardBox>
            </div>
          )}

          <div className=" bd-highlight" style={{ width: "100%" }}>
            <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
              <ComplaintTable />
            </CardBox>
          </div>

         
        </div>
      </div>
    );
  }
}

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import AddComplaint from './AddComplaint';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import IntlMessages from '../../../../../util/IntlMessages';
// import Fab from '@material-ui/core/Fab';
// import ContainerHeader from '../../../../../components/ContainerHeader/index';
// import CardBox from '../../../../../components/CardBox/index';
// import AddIcon from '@material-ui/icons/Add';

// class Complaint extends Component {
//   constructor() {
//     super();

//     this.state = {
//       anchorEl: null,
//       type: '',
//       isOpenAddModal: false,
//       subject: '',
//       message: '',
//       complaintFile: null,
//     };
//     this.openAddModal = this.openAddModal.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   openAddModal() {
//     this.setState({ isOpenAddModal: !this.state.isOpenAddModal });
//   }
//   handleChange = (name) => (event) => {
//     this.setState({ [name]: event.target.value });
//   };
//   render() {
//     return (
//       <div>
//         <div className="app-wrapper">
//           <ContainerHeader
//             match={this.props.match}
//             title={<IntlMessages id="Reclam.Reclambox" />}
//           />
//           <CardBox styleName="col-lg-12 text-primary">
//             <div className="d-flex justify-content-between  align-items-center col-md-12 col-lg-12">
//               <div className="col-md-2 ">
//                 <div className="form-group">
//                   <TextField
//                     select
//                     // value={this.state.type ? this.state.type : ''}
//                     // onChange={this.handleChange('type')}
//                     label={<IntlMessages id="choisir" />}
//                     margin="normal"
//                     fullWidth
//                   >
//                     {/* <MenuItem value="Reçues">
//                       <IntlMessages id="Reclam.received" />
//                     </MenuItem>
//                     <MenuItem value="Envoyées">
//                       <IntlMessages id="Reclam.sent" />
//                     </MenuItem> */}
//                   </TextField>
//                 </div>
//               </div>
//               <div className="col-md-2 text-right">
//                 <Fab size="small" color="primary" aria-label="Add" onClick={this.openAddModal}>
//                   <AddIcon />
//                 </Fab>
//               </div>
//             </div>
//           </CardBox>
//           <div className="col-md-12 text-right ">
//             <AddComplaint
//               open={this.state.isOpenAddModal}
//               subjectReply={''}
//               emailReplay={''}
//               onClose={this.openAddModal}
//               handleChange={this.handleChange}
//               values={this.state}
//               // onMailSend={this.onReclamSend.bind(this)}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     userProfile: state.auth.userProfile,
//     successStatus: state.alert.success,
//     errorStatus: state.alert.error,
//     message: state.alert.message,
//   };
// };
// export default connect(mapStateToProps)(Complaint);
