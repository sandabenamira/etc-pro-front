import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getNameFromID } from '../../../../../actions/countriesAction';


class Archive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
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
        >
          <DeleteOutlineIcon />
        </Fab>
      </div>
      <br />
      <Table className="default-table table-unbordered table table-sm table-hover">
        <TableHead className="th-border-b">
          <TableRow>
            <TableCell>
              {" "}
              <IntlMessages id="components.student.formadd.section" />
            </TableCell>
            <TableCell>
              {" "}
              <IntlMessages id="components.note.niveau" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.archivedSection.map((section) => {
            return (
              <TableRow key={section.id}>
                <TableCell>{section.name} </TableCell>
                <TableCell>{getNameFromID(this.props.levels, section.fk_id_level_v3 )}</TableCell>
              </TableRow>
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
    archivedSection:state.SectionsReducer.archivedSection,
  };
};

export default connect(mapStateToProps)(Archive);
