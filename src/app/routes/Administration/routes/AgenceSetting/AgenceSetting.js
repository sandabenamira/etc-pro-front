import React from "react";
import CardBox from "../../../../../components/CardBox/index";
import AddAgence from "./AddAgence";
import { connect } from "react-redux";
import AgenceList from "./AgenceList";
import ArchiveAgence from "./ArchiveAgence";
import { UncontrolledAlert } from "reactstrap";
import { addAgence } from "../../../../../actions/AgenceSettingsAction";
import moment from "moment";

class ClassesSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameAgence: "",
      typeAgence: "",
      gouvernoratAgence: "",
      faxAgence: "",
      telAgence: "",
      emailAgence: "",
      adresseAgence: "",
      alerteFiltre: false,
      messageAlerte: "",
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeFax = this.handleChangeFax.bind(this);
  }
  handleChangePhone = (value) => {
    this.setState({ telAgence: value });
  };
  handleChangeFax = (value) => {
    this.setState({ faxAgence: value });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      fk_id_establishment: parseInt(this.props.userProfile.establishment_id),
      status: true,
      creation_date: moment(new Date()).format(),
      name: this.state.nameAgence,
      agency_type: this.state.typeAgence,
      agency_gouvernorat: this.state.gouvernoratAgence,
      agency_fax: this.state.faxAgence,
      agency_tel: this.state.telAgence,
      agency_mail: this.state.emailAgence,
      agency_address: this.state.adresseAgence,
    };
    this.props.dispatch(addAgence(data));
    this.openAddModal();
    this.setState({
      nameAgence: "",
      typeAgence: "",
      gouvernoratAgence: "",
      faxAgence: "",
      telAgence: "",
      emailAgence: "",
      adresseAgence: "",
    });
  }
  handleArchive(event) {
    event.preventDefault();

    this.openAddModal();
    this.setState({
      nameClassSettings: "",
    });
  }

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
              <AddAgence
                openAddModal={this.openAddModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleArchive={this.handleArchive}
                values={this.state}
                levels={this.props.levels}
                handleChangePhone={this.handleChangePhone}
                handleChangeFax={this.handleChangeFax}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <AgenceList agenceSettings={this.props.agenceSettings} />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveAgence
              agenceSettingsArchived={this.props.archivedAgenceSettings}
            />
          </CardBox>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agenceSettings: state.AgenceReducer.agenceSettings,
    archivedAgenceSettings: state.AgenceReducer.archivedAgenceSettings,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    userProfile: state.auth.userProfile,
  };
};
export default connect(mapStateToProps)(ClassesSettings);
