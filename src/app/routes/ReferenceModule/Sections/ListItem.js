import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";

export default class ListItem extends Component {
  render() {
    const { sectionItem } = this.props;
    var level = this.props.levelList.find(
      (element) => element.id == sectionItem.fk_id_level_v3
    );

    return (
      <TableRow key={sectionItem.id}>
        <TableCell>{sectionItem.name}</TableCell>
        <TableCell>{level == undefined ? " " : level.name}</TableCell>

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
      </TableRow>
    );
  }
}
