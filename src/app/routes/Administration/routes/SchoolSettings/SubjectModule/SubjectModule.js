import React from "react";
import CardBox from "../../../../../../components/CardBox/index";
import { connect } from "react-redux";
import ArchiveSubjectModule from "./ArchiveSubjectModule";
import AddSubjectModule from "./AddSubjectModule";
import SubjectModulesList from "./SubjectModulesList";
import { UncontrolledAlert } from "reactstrap";
import { addSubjectModule } from "../../../../../../actions/SubjectModuleAction";

class SubjectModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      namesubjectModule: "",
      isOpenArchive:false
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.openArchiveModal = this.openArchiveModal.bind(this);
  }
  openArchiveModal() {
    this.setState((previousState) => ({
      isOpenArchive: !previousState.isOpenArchive
    }));
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
      name: this.state.namesubjectModule,
      fk_id_school_year: this.props.userProfile.school_year_id,
      fk_id_establishment: this.props.userProfile.establishment_id,
      status: true
    };
    this.props.dispatch(addSubjectModule(data));
    this.openAddModal();
    this.setState({ namesubjectModule: "" });
  }

  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: "5%",
          marginRight: "10%",
        }}
      >
        <div className="  d-flex flex-column mb-3">
          <div className="p-2 bd-highlight" style={{ marginLeft: "4%" }}>
          
          </div>
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
            <AddSubjectModule
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
              <SubjectModulesList 
              subjectModules={this.props.subjectModules} />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveSubjectModule  isOpenArchive={this.state.isOpenArchive}
            openArchiveModal={this.openArchiveModal}></ArchiveSubjectModule>
          </CardBox>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    subjectModules: state.subjectModuleReducer.subjectModules,
  };
};

export default connect(mapStateToProps)(SubjectModule);
 