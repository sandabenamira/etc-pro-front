import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
 import _ from "lodash";
import { getNameFromID } from "../../../../../../actions/countriesAction";

export default class CoursesAssignmentListListItem extends Component {
  render() {
    const { courseAssignment, educationTypes } = this.props;
    return (
      <TableRow key={courseAssignment.id}>

        <TableCell>
          {getNameFromID(
            this.props.ClassSettings,
            courseAssignment.fk_id_class_v4
          )}
        </TableCell>
        <TableCell>
          {getNameFromID(
            this.props.subjects,
            courseAssignment.fk_id_subject_v4
          )}
        </TableCell>
      
        <TableCell>
          <IconButton
            size="large"
            className="icon-btn"
           onClick={(e) => this.props.handleEdit(courseAssignment, e)}
          value={courseAssignment.id}
          >
            <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
          </IconButton>
          &nbsp; | &nbsp;
          <IconButton
            size="large"
            className="icon-btn"
         onClick={(e) => this.props.handleDelete(courseAssignment, e)}
          >
            <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}
