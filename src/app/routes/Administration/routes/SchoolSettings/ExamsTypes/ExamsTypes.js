import React from "react";
import IntlMessages from "../../../../../../util/IntlMessages";
import CardBox from "../../../../../../components/CardBox/index";
import { connect } from "react-redux";
import ArchiveExamType from "./ArchiveExamType";
import AddExamType from "./AddExamType";
import ExamTypeList from "./ExamTypeList";
import { UncontrolledAlert } from "reactstrap";
import { addExamType } from "../../../../../../actions/ExamTypeAction";

class ExamsTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameExamType: "",
      coefficient: null,
      assignmentDate: new Date(),
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  handleCancel() {
    this.setState({ open: false });
  }
  openAddModal() {
    this.setState({ open: true });
  }
  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    let data = {
      assignment_date: this.state.assignmentDate,
      name: this.state.nameExamType,
      fk_id_school_year: this.props.userProfile.school_year_id,
      fk_id_establishment: this.props.userProfile.establishment_id,
      status: true,
      coefficient: this.state.coefficient,
    };
    this.props.dispatch(addExamType(data));
    this.openAddModal();
    this.setState({ nameExamType: "", coefficient: null });
  }

  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: "5%",
          marginRight: "10%",
        }}
      >
        <div className="  d-flex flex-column mb-3">
          {/* <div className="p-2 bd-highlight" style={{ marginLeft: "4%" }}>
            <h1>
              <b>
                <IntlMessages id="sidebar.components.examTypes" />
              </b>
            </h1>
          </div> */}
          {this.props.successStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
          {this.state.alerteFiltre ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {" "}
                {this.state.messageAlerte}{" "}
              </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <AddExamType
                openAddModal={this.openAddModal}
                handleCancel={this.handleCancel}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleArchive={this.handleArchive}
                values={this.state}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <ExamTypeList examTypes={this.props.examTypes} />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveExamType></ArchiveExamType>
          </CardBox>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    examTypes: state.ExamTypesReducer.examTypes,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};

export default connect(mapStateToProps)(ExamsTypes);
