import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import { getNameFromID } from "../../../../../../actions/countriesAction";
class SubjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { subjectModules, subject } = this.props;
    return (
      <>
        <TableRow key={subject.id}>
          <TableCell align="left">{subject.name}</TableCell>
          <TableCell align="left">{subject.wording}</TableCell>
          <TableCell align="left">
            {getNameFromID(
              subjectModules,
              this.props.subject.fk_id_subjects_module_v4
            )}
          </TableCell>
          <TableCell align="left">
            <input
              type="color"
              className="icon-btn"
              value={subject.color}
              disabled={true}
            />
          </TableCell>

          {this.props.archived == false ? (
            <TableCell align="center">
              <IconButton
                size="medium"
                className="icon-btn"
                onClick={(e) => this.props.handleEdit(subject, e)}
              >
                <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
              </IconButton>
              &nbsp; | &nbsp;
              <IconButton
                size="medium"
                className="icon-btn"
                onClick={(e) => this.props.handleDelete(subject, e)}
              >
                <i
                  className="zmdi zmdi-delete"
                  style={{ color: "text-grey" }}
                />
              </IconButton>
            </TableCell>
          ) : (
            <TableCell></TableCell>
          )}
        </TableRow>
      </>
    );
  }
}

export default SubjectItem;
