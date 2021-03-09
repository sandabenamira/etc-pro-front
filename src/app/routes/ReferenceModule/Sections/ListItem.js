import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

export default class ListItem extends Component {
  render() {
    /* eslint eqeqeq: "off" */
    const { sectionItem } = this.props;
    var level = this.props.levelList.find((element) => element.id === sectionItem.fk_id_level_v3);

    return (
      <TableRow key={sectionItem.id}>
        <TableCell>{sectionItem.name}</TableCell>
        <TableCell>{level === undefined ? ' ' : level.name}</TableCell>

        <TableCell>
          <IconButton size="large" className="icon-btn" onClick={(e) => this.props.handleEdit(sectionItem, e)} value={sectionItem.id}>
            <i className="zmdi zmdi-edit " style={{ color: 'text-grey' }} />
          </IconButton>
          &nbsp; | &nbsp;
          <IconButton size="large" className="icon-btn" onClick={(e) => this.props.handleDelete(sectionItem, e)}>
            <i className="zmdi zmdi-delete" style={{ color: 'text-grey' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}
