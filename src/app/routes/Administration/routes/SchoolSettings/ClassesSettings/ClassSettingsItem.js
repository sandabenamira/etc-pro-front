import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
import { getNameFromID } from "../../../../../../actions/countriesAction";
export default class ClassSettingsItem extends Component {
  render() {
    const { classItem } = this.props;
    return (
      <TableRow key={classItem.id}>
        <TableCell>{classItem.name}</TableCell>
        <TableCell>
          {getNameFromID(this.props.levels, classItem.fk_id_level_v4)}
        </TableCell>
        <TableCell>
          {getNameFromID(this.props.sections, classItem.fk_id_section_v4)}
        </TableCell>
        {this.props.archived == false ? (
          <TableCell>
            <IconButton
              size="medium"
              className="icon-btn"
              onClick={(e) => this.props.handleEdit(classItem, e)}
              value={classItem.id}
            >
              <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | &nbsp;
            <IconButton
              size="medium"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(classItem, e)}
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