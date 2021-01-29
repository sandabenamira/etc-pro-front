import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
import moment from "moment";

export default class SchoolSessionListItem extends Component {
  render() {
    const { schoolSession } = this.props;
    return (
      <TableRow key={schoolSession.id}>
        <TableCell>{schoolSession.name}</TableCell>
        <TableCell>{schoolSession.educationType.name}</TableCell>

        <TableCell>
          {moment(schoolSession.start_date).format("DD/MM/YY")}
        </TableCell>
        <TableCell>
          {moment(schoolSession.end_date).format("DD/MM/YY")}
        </TableCell>
        <TableCell>
          <IconButton
            size="large"
            className="icon-btn"
            onClick={(e) => this.props.handleEdit(schoolSession, e)}
            value={schoolSession.id}
          >
            <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
          </IconButton>
          &nbsp; | &nbsp;
          <IconButton
            size="large"
            className="icon-btn"
            onClick={(e) => this.props.handleDelete(schoolSession, e)}
          >
            <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}
