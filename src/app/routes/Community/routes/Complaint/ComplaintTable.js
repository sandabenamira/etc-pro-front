import React from "react";
import CardBox from "../../../../../components/CardBox/index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import ComplaintTableCell from "./ComplaintTableCell"
import PrintIcon from "@material-ui/icons/Print";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

class ComplaintTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       listHomework : [
        { name: "Sami",lastName:"YOUSSEF",role:"Parent", dateHomwork: "Oct 21", status: "Terminé" },
        { name: "Rami",lastName:"YOUSSEF",role:"Élève", dateHomwork: "Oct 23", status: "En cours" },
        { name: "Sami",lastName:"YOUSSEF",role:"Parent", dateHomwork: "Oct 27", status: "Reporté" },
        { name: "Rami",lastName:"YOUSSEF",role:"Élève", dateHomwork: "Oct 28", status: "Terminé" },
      ]
    };
  }

  render() {
    return (

      <div className="table-responsive-material">
            <div>
              <h1>
                <b>
                  <IntlMessages id="list.complaint" />
                 
                </b>
              </h1>
              <div className="d-flex flex-row-reverse ">
            &nbsp;&nbsp;&nbsp;
            <PrintIcon
              style={{
                fontSize: "35",
              }}
              color="inherit"
            />
            &nbsp;&nbsp;&nbsp;
            <PictureAsPdfIcon
              style={{
                fontSize: "35",
              }}
              color="inherit"
            />
          </div>
            </div>
            <Table className="default-table table-unbordered table table-sm table-hover">
              <TableHead className="th-border-b">
                <TableRow>
             
                  <TableCell>
                  <IntlMessages id="components.student.formadd.name" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="complaint.lastName" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="complaint.role" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="appModule.email" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="compalint.phone" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="compalint.motif" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="complaint.date" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="complaint.hour" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="complaint.status" />
                  </TableCell>
                  <TableCell>
                  <IntlMessages id="complaint.action" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.listHomework.map((item, index)=> {
                  return (
                    <ComplaintTableCell
                      key={index}
                      item={item}
                    />
                  );
                })}
              </TableBody>
            </Table>
            
          </div>


    );
  }
}

export default ComplaintTable;

// import React, { Component } from "react";
// import ComplaintTableCell from "./ComplaintTableCell";
// import IntlMessages from "../../../util/IntlMessages";
// import CardBox from "../../../components/CardBox/index";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import { roleIdAdmin } from "../../../config/config";

// class ComplaintTable extends Component {
//   getData(type) {
//     if (type === "Reçues") {
//       if (localStorage.roles_id == roleIdAdmin) {
//         let reclam_Admin_Recues = this.props.Recues.filter(
//           (element) => element.status
//         );
//         return reclam_Admin_Recues;
//       } else {
//         return this.props.Recues;
//       }
//     } else {
//       if (localStorage.roles_id == roleIdAdmin) {
//         let reclam_Admin_Envoyées = this.props.Envoyées.filter(
//           (element) => element.status
//         );
//         return reclam_Admin_Envoyées;
//       } else {
//         return this.props.Envoyées;
//       }
//     }
//   }

//   render() {
//     const data = this.getData(this.props.type);
//     return (
//       <CardBox styleName="col-lg-12">
//         {data.length == 0 ? (
//           <h1 align="center">
//             <IntlMessages id="complaint.no.réclamation" />
//           </h1>
//         ) : (
//           <div className="table-responsive-material">
//             <Table className="default-table table-unbordered table table-sm table-hover">
//               <TableHead className="th-border-b">
//                 <TableRow>
//                   {this.props.type === "Reçues" ? (
//                     <TableCell align="left">
//                       <IntlMessages id="complaint.expéditeur" />
//                     </TableCell>
//                   ) : (
//                     <TableCell align="left">
//                       <IntlMessages id="complaint.destinataire" />
//                     </TableCell>
//                   )}

//                   <TableCell align="right">
//                     <IntlMessages id="complaint.Sujet" />
//                   </TableCell>
//                   <TableCell align="right">
//                     <IntlMessages id="stuppUser.formadd.role" />
//                   </TableCell>
//                   <TableCell align="center">
//                     <IntlMessages id="complaint.date" />
//                   </TableCell>
//                   {this.props.type === "Reçues" ? (
//                     localStorage.roles_id == roleIdAdmin ? (
//                       <TableCell
//                         align="center"
//                         className="status-cell text-right"
//                       >
//                         <IntlMessages id="complaint.statut" />
//                       </TableCell>
//                     ) : (
//                       ""
//                     )
//                   ) : localStorage.roles_id != roleIdAdmin ? (
//                     <TableCell
//                       align="center"
//                       className="status-cell text-right"
//                     >
//                       <IntlMessages id="complaint.statut" />
//                     </TableCell>
//                   ) : (
//                     ""
//                   )}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {data.map((data) => {
//                   return (
//                     <ComplaintTableCell
//                       key={data.id}
//                       data={data}
//                       type={this.props.type}
//                     />
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardBox>
//     );
//   }
// }

// export default ComplaintTable;
