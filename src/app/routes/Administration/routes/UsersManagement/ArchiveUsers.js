import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import UsersListItem from "./UsersListItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class ArchiveUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="users.list.archive" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {" "}
                <IntlMessages id="user.photo" />
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="user.id" />
              </TableCell>
              <TableCell>
                <IntlMessages id="user.name" />
              </TableCell>{" "}
              <TableCell>
                <IntlMessages id="user.last.name" />
              </TableCell>
              <TableCell>
                <IntlMessages id="role.user" />
              </TableCell>
              <TableCell>
                <IntlMessages id="user.mail" />
              </TableCell>
              <TableCell>
                <IntlMessages id="user.phone.number" />
              </TableCell>
              <TableCell>
                <IntlMessages id="user.options" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4].map(() => {
              return (
                <UsersListItem
                  archived={true}
                  onClick={this.props.openArchive}
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

export default connect(mapStateToProps)(ArchiveUsers);
