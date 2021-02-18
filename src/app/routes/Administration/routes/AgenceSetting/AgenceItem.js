import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';
import { getNameFromID } from '../../../../../actions/countriesAction';
export default class AgenceItem extends Component {
  render() {
    const { agenceItem } = this.props;
    return (
      <TableRow key={agenceItem.id}>
        <TableCell>{agenceItem.name}</TableCell>
        <TableCell>{agenceItem.typeAgence}</TableCell>
        <TableCell>{agenceItem.gouvernoratAgence}</TableCell>
        <TableCell>{agenceItem.adresseAgence}</TableCell>
        <TableCell>{agenceItem.emailAgence}</TableCell>
        <TableCell>{agenceItem.faxAgence}</TableCell>
        <TableCell>{agenceItem.telAgence}</TableCell>
        {this.props.archived == false ? (
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
