import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
export default class ExamTypeListItem extends Component {
  render() {
    const { examType } = this.props;
    return (
      <TableRow key={examType.id}>
        <TableCell>{examType.name}</TableCell>
        <TableCell>{examType.coefficient}</TableCell>
        <TableCell>
          <IconButton
            size="large"
            className="icon-btn"
            onClick={(e) => this.props.handleEdit(examType, e)}
            value={examType.id}
          >
            <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
          </IconButton>
          &nbsp; | &nbsp;
          <IconButton
            size="large"
            className="icon-btn"
            onClick={(e) => this.props.handleDelete(examType, e)}
          >
            <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}
