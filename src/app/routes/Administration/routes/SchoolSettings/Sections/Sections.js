import React from "react";
import CardBox from "../../../../../../components/CardBox/index";
import AddSection from "./AddSection";
import { connect } from "react-redux";
import SectionsList from "./SectionsList";
import ArchiveSections from "./ArchiveSections";
import { UncontrolledAlert } from "reactstrap";
import {
  addSection,
  publishSection,
} from "../../../../../../actions/SectionsAction";
class Sections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerteFiltre: false,
      messageAlerte: "",
      open: false,
      nameSection: "",
      level_id:null,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handlePulish = this.handlePulish.bind(this);
  }
  handlePulish = (item, event) => {
    event.preventDefault();
    this.props.dispatch(publishSection(item));
  };
  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.nameSection,
      fk_id_school_year: this.props.userProfile.school_year_id,
      fk_id_establishment :this.props.userProfile.establishment_id,
       status: true,
    };
    this.props.dispatch(addSection(data));
    this.openAddModal();
    this.setState({ nameSection: "", level_id: null });
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
            <AddSection
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleArchive={this.handleArchive}
              openAddModal={this.openAddModal}
              values={this.state}
              levels={this.props.levels}
            />
          </CardBox>
        </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <SectionsList Sections={this.props.Sections} />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveSections
              archivedSection={this.props.archivedSection}
              levels={this.props.levels}
              handlePulish={this.handlePulish}
            ></ArchiveSections>
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
    Sections: state.SectionsReducer.Section,
    levels: state.levelsReducer.levels,
    archivedSection: state.SectionsReducer.archivedSection,
  };
};

export default connect(mapStateToProps)(Sections);
