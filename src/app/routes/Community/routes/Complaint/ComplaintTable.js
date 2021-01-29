import React, { Component } from "react";
import ComplaintTableCell from "./ComplaintTableCell";
import IntlMessages from "../../../util/IntlMessages";
import CardBox from "../../../components/CardBox/index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { roleIdAdmin } from "../../../config/config";

class ComplaintTable extends Component {
  getData(type) {
    if (type === "Reçues") {
      if (localStorage.roles_id == roleIdAdmin) {
        let reclam_Admin_Recues = this.props.Recues.filter(
          (element) => element.status
        );
        return reclam_Admin_Recues;
      } else {
        return this.props.Recues;
      }
    } else {
      if (localStorage.roles_id == roleIdAdmin) {
        let reclam_Admin_Envoyées = this.props.Envoyées.filter(
          (element) => element.status
        );
        return reclam_Admin_Envoyées;
      } else {
        return this.props.Envoyées;
      }
    }
  }

  render() {
    const data = this.getData(this.props.type);
    return (
      <CardBox styleName="col-lg-12">
        {data.length == 0 ? (
          <h1 align="center">
            <IntlMessages id="complaint.no.réclamation" />
          </h1>
        ) : (
          <div className="table-responsive-material">
            <Table className="default-table table-unbordered table table-sm table-hover">
              <TableHead className="th-border-b">
                <TableRow>
                  {this.props.type === "Reçues" ? (
                    <TableCell align="left">
                      <IntlMessages id="complaint.expéditeur" />
                    </TableCell>
                  ) : (
                    <TableCell align="left">
                      <IntlMessages id="complaint.destinataire" />
                    </TableCell>
                  )}

                  <TableCell align="right">
                    <IntlMessages id="complaint.Sujet" />
                  </TableCell>
                  <TableCell align="right">
                    <IntlMessages id="stuppUser.formadd.role" />
                  </TableCell>
                  <TableCell align="center">
                    <IntlMessages id="complaint.date" />
                  </TableCell>
                  {this.props.type === "Reçues" ? (
                    localStorage.roles_id == roleIdAdmin ? (
                      <TableCell
                        align="center"
                        className="status-cell text-right"
                      >
                        <IntlMessages id="complaint.statut" />
                      </TableCell>
                    ) : (
                      ""
                    )
                  ) : localStorage.roles_id != roleIdAdmin ? (
                    <TableCell
                      align="center"
                      className="status-cell text-right"
                    >
                      <IntlMessages id="complaint.statut" />
                    </TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data) => {
                  return (
                    <ComplaintTableCell
                      key={data.id}
                      data={data}
                      type={this.props.type}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardBox>
    );
  }
}

export default ComplaintTable;
