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
import { getNameFromID } from "../../../../../../actions/countriesAction";

class ArchiveClassesSettings extends React.Component {
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
                  <IntlMessages id="components.note.class" />
                </TableCell>
                <TableCell>
                  <IntlMessages id="components.note.subject" />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.archivedCourseAssignment.map((courseAssignment) => {
                return (
                  <TableRow key={courseAssignment.id}>
                    <TableCell>
                      {getNameFromID(
                        this.props.ClassSettings,
                        courseAssignment.fk_id_class_v4
                      )}
                    </TableCell>
                    <TableCell>
                      {getNameFromID(
                        this.props.subjects,
                        courseAssignment.fk_id_subject_v4
                      )}
                    </TableCell>
                    <TableCell>
                      {courseAssignment.global_coefficient}{" "}
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
    archivedCourseAssignment: state.AssignementReducer.archivedCourseAssignment,
  };
};

export default connect(mapStateToProps)(ArchiveClassesSettings);
