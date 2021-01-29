import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
export default class SectionListItem extends Component {
  render() {
    const { sectionItem } = this.props;
    return (
      <TableRow key={sectionItem.id}>
        <TableCell>{sectionItem.name}</TableCell>

        {this.props.archived == true ? (
          <TableCell>
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleEdit(sectionItem, e)}
              value={sectionItem.id}
            >
              <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | &nbsp;
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(sectionItem, e)}
            >
              <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell>

          </TableCell>
        )}
      </TableRow>
    );
  }
}
