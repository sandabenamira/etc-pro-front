import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
export default class SubjectModulesListItem extends Component {
  render() {
    const { educationType } = this.props;
    return (
      <TableRow key={educationType.id}>
        <TableCell>{educationType.name}</TableCell>

        {educationType.status ? (
          <TableCell>
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleEdit(educationType, e)}
            >
              <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | &nbsp;
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(educationType, e)}
            >
              <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
            </IconButton>
          </TableCell>
        ) : (
          ""
        )}
      </TableRow>
    );
  }
}
