import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
import { getNameFromID } from "../../../../../../actions/countriesAction";
export default class GroupesItem extends Component {
  render() {
    const { groupItem, educationTypes } = this.props;

    return (
      <TableRow key={groupItem.id}>
        <TableCell>
          {groupItem.group.map((element) => element.name + " , ")}
        </TableCell>
        <TableCell>{groupItem.name}</TableCell>
        {this.props.archived == false ? (
          <TableCell>
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleEdit(groupItem, e)}
              value={groupItem.id}
            >
              <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | &nbsp;
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(groupItem, e)}
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
