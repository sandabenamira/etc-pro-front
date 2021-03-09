import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
/* eslint eqeqeq: "off" */
export default class SubjectModulesListItem extends Component {
  render() {   /* eslint eqeqeq: "off" */
    const { moduleSubject } = this.props;
    return (
      <TableRow key={moduleSubject.id}>
        <TableCell>{moduleSubject.name}</TableCell>

        {this.props.archived===false ? (
          <TableCell>
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleEdit(moduleSubject, e)}
              value={moduleSubject.id}
            >
              <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | &nbsp;
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(moduleSubject, e)}
            >
              <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
    );
  }
}
