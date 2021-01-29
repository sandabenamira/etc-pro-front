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
class ArchiveExamType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      mensuel: false,
      trimestriel: false,
      hebdomadaire: false,
      annuel: false,
      frequencyVal: "",
      daily: false,
      nameFrService: "",
      typeService: "",
      pathImgService: "",
      currency: [],
      idCurrency: 0,
      vatService: 0,
      otherVatService: 0,
      frequency: [],
      comment: "",
      priceService: 0,
      startDateService: "",
      endDateService: "",
      idFrequency: 0,
      frequencies1: [],
      currencies1: [],
    };
    this.openAddModal = this.openAddModal.bind(this);
  }

  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.frequency !== this.props.frequency &&
      this.props.frequency.length > 0
    ) {
      this.setState({
        frequencies1: this.props.frequency,
      });
    }
    if (
      prevProps.currency !== this.props.currency &&
      this.props.currency.length > 0
    ) {
      this.setState({
        currencies1: this.props.currency,
      });
    }
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
            onClick={this.openAddModal}
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
                <IntlMessages id="sidebar.components.type.exam" />
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="subject.coefficient" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.archivedexamTypes.map((examType) => {
              return (
                <TableRow key={examType.id}>
                  <TableCell>{examType.name} </TableCell>
                  <TableCell>{examType.coefficient} </TableCell>
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
    archivedexamTypes: state.ExamTypesReducer.archivedexamTypes,
  };
};

export default connect(mapStateToProps)(ArchiveExamType);
