import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { saveEstablishments } from "../../../../../actions/establishmentAction";
import { connect } from "react-redux";
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class ModalSchoolYears extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalSchoolYears: false,
    };
  }

  render() {
    const { historicStudent } = this.props
    return (
      <div className="container">
        <Auxiliary>
          <Modal isOpen={this.props.isOpenResetModalSchoolYears}>
            <ModalHeader
              toggle={this.props.closeModalSchoolYears}
              className="modal-box-header bg-primary text-white">
              <IntlMessages id="component.student.info.general" />
            </ModalHeader>
            <ModalBody>
              <Table className="default-table table-unbordered table table-sm table-hover">
                <TableHead className="th-border-b">
                  <TableRow>
                    <TableCell align="left"><IntlMessages id="filter.school.years" /></TableCell>
                    <TableCell align="left"><IntlMessages id="components.note.niveau" /> </TableCell>
                    <TableCell align=""><IntlMessages id="components.note.class" /> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historicStudent.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {student.school_year.name}
                      </TableCell>
                      <TableCell align="left">
                        {this.props.settings.languageId == "tunisia"
                          ? student.level.name_AR
                          : this.props.settings.languageId == "french"
                            ? student.level.name_FR
                            : student.level.name_EN}
                      </TableCell>
                      <TableCell align="left">
                      {this.props.settings.languageId == "tunisia"
                          ? student.classe.ar_name
                          : this.props.settings.languageId == "french"
                            ? student.classe.name
                            : student.classe.name}
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ModalBody>
          </Modal>
        </Auxiliary>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings.locale,
  };
}

export default connect(
  mapStateToProps,
  {
    saveEstablishments,
  }
)(ModalSchoolYears);
