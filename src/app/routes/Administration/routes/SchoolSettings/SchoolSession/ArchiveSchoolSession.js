import React from "react";
import IntlMessages from "../../../../../../util/IntlMessages";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";

class ArchiveSchoolSession extends React.Component {
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
              {" "}
              <IntlMessages id="service.button.archive" />{" "}
            </b>
          </h1>{" "}
          &nbsp;&nbsp;&nbsp;
          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={this.props.openArchiveModal}
          >
            <DeleteOutlineIcon />
          </Fab>
        </div>
        <br />
        {this.props.isOpenArchive ? (
          <Table className="default-table table-unbordered table table-sm table-hover">
            <TableHead className="th-border-b">
              <TableRow>
                <TableCell>
                  {" "}
                  <IntlMessages id="sidebar.components.schoolSession" />
                </TableCell>
                <TableCell>
                  <IntlMessages id="components.class.formadd.startdate" />
                </TableCell>{" "}
                <TableCell>
                  <IntlMessages id="components.class.formadd.enddate" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.archivedSchoolSessions.map((moduleSubject) => {
                return (
                  <TableRow key={moduleSubject.id}>
                    <TableCell>{moduleSubject.name} </TableCell>
                    <TableCell>
                      {" "}
                      {moment(moduleSubject.start_date).format("DD/MM/YY")}{" "}
                    </TableCell>
                    <TableCell>
                      {moment(moduleSubject.end_date).format("DD/MM/YY")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    archivedSchoolSessions: state.schoolSessionReducer.archivedSchoolSessions,
  };
};

export default connect(mapStateToProps)(ArchiveSchoolSession);