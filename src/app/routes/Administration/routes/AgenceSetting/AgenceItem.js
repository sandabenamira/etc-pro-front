import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
/* eslint eqeqeq: "off" */
  export default class AgenceItem extends Component {
  render() {   /* eslint eqeqeq: "off" */
    const { agenceItem } = this.props;
    return (
      <TableRow key={agenceItem.id}>
        <TableCell>{agenceItem.name}</TableCell>
        <TableCell>{agenceItem.agency_type}</TableCell>
        <TableCell>{agenceItem.agency_gouvernorat}</TableCell>
        <TableCell>{agenceItem.agency_address}</TableCell>
        <TableCell>{agenceItem.agency_mail}</TableCell>
        <TableCell>{agenceItem.agency_fax}</TableCell>
        <TableCell>{agenceItem.agency_tel}</TableCell>
        {this.props.archived===false ? (
          <TableCell>
            <IconButton
              size="medium"
              className="icon-btn"
              onClick={(e) => this.props.handleEdit(agenceItem, e)}
              value={agenceItem.id}
            >
              <i className="zmdi zmdi-edit " style={{ color: 'text-grey' }} />
            </IconButton>
            &nbsp; | &nbsp;
            <IconButton
              size="medium"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(agenceItem, e)}
            >
              <i className="zmdi zmdi-delete" style={{ color: 'text-grey' }} />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
    );
  }
}
