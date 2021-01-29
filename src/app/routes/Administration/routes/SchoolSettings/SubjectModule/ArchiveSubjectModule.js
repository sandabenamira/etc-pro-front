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
import SubjectModulesListItem from "./SubjectModulesListItem";

class ArchiveSubjectModule extends React.Component {
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
            //   onClick={this.openAddModal}
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
                <IntlMessages id="sidebar.components.subjectModule" />
              </TableCell>
              <TableCell>
                {" "}
         
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.archivedsubjectModules.map((moduleSubject,index) => {
              return (
                <SubjectModulesListItem
                archived={true}
                  moduleSubject={moduleSubject}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  key={index}
                />
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
    archivedsubjectModules: state.subjectModuleReducer.archivedsubjectModules,
  };
};

export default connect(mapStateToProps)(ArchiveSubjectModule);
