import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
/* eslint eqeqeq: "off" */
export default class CoursesAssignmentListListItem extends Component {
  render() {   /* eslint eqeqeq: "off" */
    const { courseAssignment, educationTypes } = this.props;
    return (
      <TableRow key={courseAssignment.id}>
        <TableCell>{courseAssignment.classItem.name}</TableCell>
        <TableCell>
          {courseAssignment.subjects.map((element) => element.subject.name + ' , ')}
        </TableCell>
        <TableCell>
          <IconButton
            size="large"
            className="icon-btn"
            onClick={(e) => this.props.handleEdit(courseAssignment, e)}
            value={courseAssignment.id}
          >
            <i className="zmdi zmdi-edit " style={{ color: 'text-grey' }} />
          </IconButton>
          {/* &nbsp; | &nbsp;
          <IconButton
            size="large"
            className="icon-btn"
            onClick={(e) => this.props.handleDelete(courseAssignment, e)}
          >
            <i className="zmdi zmdi-delete" style={{ color: 'text-grey' }} />
          </IconButton> */}
        </TableCell>
      </TableRow>
    );
  }
}
