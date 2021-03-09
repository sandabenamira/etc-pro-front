import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import { getNameFromID } from "../../../../../../actions/countriesAction";
/* eslint eqeqeq: "off" */
export default class LevelListItem extends Component {
  render() {   /* eslint eqeqeq: "off" */
    const { levelItem  } = this.props;
    return (
      <TableRow key={levelItem.id}>
        <TableCell>{levelItem.name}</TableCell>
        <TableCell>
          {getNameFromID(
            this.props.educationTypes,
            levelItem.fk_id_education_type_v4
          )}
        </TableCell>
        {this.props.archived===false ? (
          <TableCell>
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleEdit(levelItem, e)}
              value={levelItem.id}
            >
              <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | &nbsp;
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(levelItem, e)}
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
