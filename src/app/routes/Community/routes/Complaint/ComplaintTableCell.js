import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';

export default class ComplaintTableCell extends Component {
  render() {
    const { index, item } = this.props;
    return (
      <>
        {" "}
        <TableRow key={index}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.lastName}</TableCell>
          <TableCell>{item.role}</TableCell>
          <TableCell>{item.lastName}</TableCell>
          <TableCell>{item.lastName}</TableCell>
          <TableCell>{item.dateHomwork}</TableCell>
          <TableCell>{item.dateHomwork}</TableCell>
          <TableCell>{item.role}</TableCell>

          <TableCell>
            <div
              className={` badge ${
                item.status === "Terminé"
                  ? "bg-success"
                  : item.status === "Reporté"
                  ? "bg-info"
                  : "bg-orange"
              } `}
              style={{ height: "20px", width: "80px", float: "left" }}
            >
              {item.status}
            </div>
          </TableCell>

          <TableCell align="justify">
            <div className="d-flex  flex-row align-items-right">
              <IconButton
                size="medium"
                className="icon-btn"
                // onClick={(e) => this.handleOpenDetails(e)}
              >
                <i className="zmdi zmdi-eye" style={{ color: "text-grey" }} />
              </IconButton>
              <span style={{marginTop:"10px"}}> &nbsp; | &nbsp;</span>
              <Button
                style={{
                  backgroundColor: "white",
                  color: "#7C7C7C",
                  width: "50px",
                  height: "20px",
                  marginTop:"10px"
                }}
                // onClick={(e) => {
                // this.props.handleEdit(user);
                // }}
                target="_blank"
              >
                <span style={{ fontSize: "12px", color: "#7C7C7C" }}>
                  <IntlMessages id="button.modify" />
                </span>
              </Button>
              <span style={{marginTop:"10px"}}> &nbsp; | &nbsp;</span>
             
              <IconButton
                size="medium"
                className="icon-btn"
                // onClick={(e) => this.props.handleDelete(cours)}
              >
                <i
                  className="zmdi zmdi-delete"
                  style={{ color: "text-grey" }}
                />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
      </>
    );
  }
}

// import React from "react";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import axios from "axios";
// import ComplaintChoiceMenu from "./ComplaintChoiceMenu";
// import baseUrl from "../../../config/config";
// import { connect } from "react-redux";
// import IntlMessages from "../../../util/IntlMessages";
// import { roleIdSuperAdmin } from "../../../config/config";
// import { roleIdAdmin } from "../../../config/config";
// import { roleIdProfessor } from "../../../config/config";
// import { roleIdParent } from "../../../config/config";
// import { roleIdStudent } from "../../../config/config";
// import { roleIdSupervisor } from "../../../config/config";
// import { roleIdDirector } from "../../../config/config";
// var options = {
//   weekday: "long",
//   year: "numeric",
//   month: "short",
//   day: "numeric",
// };
// var dateFormat = require("dateformat");

// class ComplaintTableCell extends React.Component {
//   onOptionMenuSelect = (event) => {
//     this.setState({ menuState: true, anchorEl: event.currentTarget });
//   };
//   handleRequestClose = () => {
//     this.setState({ menuState: false });
//   };

//   constructor() {
//     super();
//     this.state = {
//       anchorEl: undefined,
//       menuState: false,
//       receiverInfo: "",
//       receiverProfile: "",
//     };
//   }
//   _isMounted = false;

//   componentWillMount() {
//     this._isMounted = true;

//     axios
//       .get(
//         `${baseUrl.baseUrl}/profiles/` +
//           this.props.data.receiver_id +
//           `/user?access_token=${localStorage.token}`
//       )
//       .then((res) => {
//         if (this._isMounted) {
//           const receiverInfo = res.data;
//           this.setState({ receiverInfo });
//         }
//       });

//     axios
//       .get(
//         `${baseUrl.baseUrl}/profiles/` +
//           this.props.data.receiver_id +
//           `?access_token=${localStorage.token}`
//       )
//       .then((res) => {
//         if (this._isMounted) {
//           const receiverProfile = res.data;
//           this.setState({ receiverProfile });
//         }
//       });
//   }
//   getNameRole(id) {
//     if (this.props.settings.languageId === "tunisia") {
//       return id === roleIdSuperAdmin
//         ? "superadmin"
//         : id === roleIdAdmin
//         ? "مشرف"
//         : id === roleIdProfessor
//         ? "أستاذ"
//         : id === roleIdParent
//         ? "الولي"
//         : id === roleIdStudent
//         ? "تلميذ"
//         : id === roleIdDirector
//         ? "مشرف اول"
//         : id === roleIdDirector
//         ? "مدير"
//         : "";
//     } else if (this.props.settings.languageId === "english") {
//       return id === roleIdSuperAdmin
//         ? "Superadmin"
//         : id === roleIdAdmin
//         ? "Admin"
//         : id === roleIdProfessor
//         ? "Professor"
//         : id === roleIdParent
//         ? "Parent"
//         : id === roleIdStudent
//         ? "Student"
//         : id === roleIdSupervisor
//         ? "Superviseur"
//         : id === roleIdDirector
//         ? "Director"
//         : "";
//     } else {
//       return id === roleIdSuperAdmin
//         ? "superadmin"
//         : id === roleIdAdmin
//         ? "Administrateur"
//         : id === roleIdProfessor
//         ? "Professeur"
//         : id === roleIdParent
//         ? "Parent"
//         : id === roleIdStudent
//         ? "Élève"
//         : id === roleIdSupervisor
//         ? "Superviseur"
//         : id === roleIdDirector
//         ? "Directeur"
//         : "";
//     }
//   }
//   render() {
//     const { anchorEl, menuState } = this.state;
//     const {
//       id,
//       subject,

//       date_hour_reclamation,
//       status_complaint,
//     } = this.props.data;
//     const nameSender =
//       this.props.data.profile.user.name +
//       " " +
//       this.props.data.profile.user.surname;

//     const nameReceiver =
//       this.state.receiverInfo.name + " " + this.state.receiverInfo.surname;
//     const nameSender_AR =
//       this.props.data.profile.user.surname_ar +
//       " " +
//       this.props.data.profile.user.name_ar;
//     const nameReceiver_AR =
//       this.state.receiverInfo.surname_ar +
//       " " +
//       this.state.receiverInfo.name_ar;
//     const RoleSender = this.getNameRole(this.props.data.profile.role_id);
//     const RoleReceiver = this.getNameRole(this.state.receiverProfile.role_id);

//     const statusStyle = status_complaint.includes("non traitée")
//       ? "text-white bg-danger"
//       : status_complaint.includes("en cours")
//       ? "bg-amber"
//       : "text-white bg-success";
//     const statusComplaint = status_complaint.includes("non traitée") ? (
//       <IntlMessages id="Reclam.non.traité" />
//     ) : status_complaint.includes("en cours") ? (
//       <IntlMessages id="Reclam.encours" />
//     ) : (
//       <IntlMessages id="Reclam.Traité" />
//     );
//     return (
//       <tr tabIndex={-1} key={id}>
//         <td>
//           <div className="user-profile d-flex flex-row align-items-center">
//             <Avatar
//               align="left"
//               className="size-50"
//               alt="..."
//               src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png"
//             />
//             <div className="user-detail">
//               {this.props.type === "Reçues" ? (
//                 this.props.settings.languageId == "tunisia" &&
//                 nameSender_AR != "null null" ? (
//                   <h5 className="user-name">{nameSender_AR}</h5>
//                 ) : (
//                   <h5 className="user-name">{nameSender}</h5>
//                 )
//               ) : this.props.settings.languageId == "tunisia" &&
//                 nameReceiver_AR != "null null" ? (
//                 <h5 className="user-name">{nameReceiver_AR}</h5>
//               ) : (
//                 <h5 className="user-name">{nameReceiver}</h5>
//               )}
//             </div>
//           </div>
//         </td>
//         <td>{subject}</td>
//         <td>{this.props.type === "Reçues" ? RoleSender : RoleReceiver}</td>
//         <td>
//           {/* {dateFormat(date_hour_reclamation, "dddd, mmmm dS, yyyy, HH:MM")} */}
//           {this.props.settings.languageId === "tunisia"
//             ? new Date(date_hour_reclamation).toLocaleDateString(
//                 "ar-TN",
//                 options
//               )
//             : this.props.settings.languageId === "english"
//             ? new Date(date_hour_reclamation).toLocaleDateString(
//                 "en-US",
//                 options
//               )
//             : new Date(date_hour_reclamation).toLocaleDateString(
//                 "fr-FR",
//                 options
//               )}
//         </td>
//         <td>
//           {this.props.type === "Reçues" ? (
//             localStorage.roles_id == roleIdAdmin ? (
//               <div className={` badge text-uppercase ${statusStyle}`}>
//                 {statusComplaint}
//               </div>
//             ) : (
//               ""
//             )
//           ) : localStorage.roles_id != roleIdAdmin ? (
//             <div className={` badge text-uppercase ${statusStyle}`}>
//               {statusComplaint}
//             </div>
//           ) : (
//             ""
//           )}

//           {/* {this.props.type === "Reçues" ? (
//             ""
//           ) : (
//             <div className={` badge text-uppercase ${statusStyle}`}>
//               {statusComplaint}
//             </div>
//           )} */}
//         </td>
//         {/* <td className="status-cell text-right">
//           <div className={` badge text-uppercase ${statusStyle}`}>
//             {statusComplaint}
//           </div>
//         </td> */}
//         <td className="text-right">
//           <IconButton onClick={this.onOptionMenuSelect.bind(this)}>
//             <i className="zmdi zmdi-more-vert" />
//           </IconButton>
//           <ComplaintChoiceMenu
//             data={this.props.data}
//             type={this.props.type}
//             menuState={menuState}
//             anchorEl={anchorEl}
//             handleRequestClose={this.handleRequestClose.bind(this)}
//           />
//         </td>
//       </tr>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     settings: state.settings.locale,
//   };
// };

// export default connect(mapStateToProps)(ComplaintTableCell);
