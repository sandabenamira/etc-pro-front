import React from 'react';
import IntlMessages from '../../../../../../util/IntlMessages';
 import { connect } from 'react-redux';
 import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GroupesItem from './GroupesItem';
class ArchiveGroupes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    const { groupsList } = this.props;
    return (
      <div>
        <div>
          <h1>
            <b>
              <IntlMessages id="service.button.archive" />
            </b>
          </h1>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {' '}
                <IntlMessages id="sidebar.components.groupes" />
              </TableCell>
              <TableCell>
                {' '}
                <IntlMessages id="sidebar.components.class" />{' '}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupsList.map((groupItem) => {
              return <GroupesItem archived={true} groupItem={groupItem} />;
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

export default connect(mapStateToProps)(ArchiveGroupes);
