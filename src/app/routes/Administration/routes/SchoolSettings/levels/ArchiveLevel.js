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
import LevelListItem from "./LevelListItem"
class ArchiveLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    const { levelItem, educationTypes } = this.props;
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
          <Fab size="small" color="secondary" aria-label="Add">
            <DeleteOutlineIcon />
          </Fab>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {" "}
                <IntlMessages id="sidebar.components.levels" />
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="sidebar.components.typeOfEducation" />{" "}
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.archivedLevels.map((levelItem) => {
              return (
                <LevelListItem
                handleDearchiver={this.props.handleDearchiver}
                archived={true}
                levelItem={levelItem}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                educationTypes={this.props.educationTypes}
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
  return {
    archivedLevels: state.levelsReducer.archivedLevels,
  };
};

export default connect(mapStateToProps)(ArchiveLevel);
