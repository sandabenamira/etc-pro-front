import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AgenceItem from './AgenceItem';

class ArchiveAgence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="d-flex justify-content-start align-items-center ">
          <h1>
            <b>
              {' '}
              <IntlMessages id="service.button.archive" />{' '}
            </b>
          </h1>{' '}
          &nbsp;&nbsp;&nbsp;
          <Fab size="small" color="secondary" aria-label="Add">
            <DeleteOutlineIcon />
          </Fab>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell> Agence</TableCell>
              <TableCell>Type Agence</TableCell>
              <TableCell>Gouvernorat</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Fax</TableCell>
              <TableCell>
                <IntlMessages id="user.phone.number" />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.props.agenceSettingsArchived.map((Item, index) => {
              return (
                <AgenceItem
                  archived={true}
                  key={index}
                  classItem={Item}
                  handleEdit={this.handleEdit}
                  levels={this.props.levels}
                  sections={this.props.sections}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(ArchiveAgence);
