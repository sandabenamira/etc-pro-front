import React from "react";
import CardBox from "../../../../../../components/CardBox/index";
import { connect } from "react-redux";
import ArchiveSchoolSession from "./ArchiveSchoolSession";
import SchoolSessionList from "./SchoolSessionList";
import { UncontrolledAlert } from "reactstrap";
import {
  addSchoolSession,
  getSchoolSession,
} from "../../../../../../actions/SchoolSessionAction";
import AddSchoolSession from "./AddSchoolSession";
import { getEducationType } from "../../../../../../actions/estabTypeAction";

class SchoolSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      nameSchoolSession: "",
      start_date: new Date(),
      end_date: new Date(),
      isOpenArchive: false,
      educationTypeId: null,
      educationItem: {},
      sessionExist: false,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.openArchiveModal = this.openArchiveModal.bind(this);
    this.handleChangeEducationType = this.handleChangeEducationType.bind(this);
    this.handleChangeAlerte = this.handleChangeAlerte.bind(this);
  }
  handleChangeAlerte = (name) => {
    this.setState({
      sessionExist: true,
      messageAlerte: "Il existe déja une licence pour cet etablissement",
    });
    setTimeout(() => {
      this.setState({ sessionExist: false, messageAlerte: "" });
    }, 4000);
  };
  handleChangeEducationType = (name) => (event) => {
    let obj = JSON.parse(event.target.value);

    this.setState({ educationItem: obj, educationTypeId: obj.id });
  };
  openArchiveModal() {
    this.setState((previousState) => ({
      isOpenArchive: !previousState.isOpenArchive,
    }));
  }
  handleCancel() {
    this.setState({ isOpen: false });
  }
  openAddModal() {
    this.setState({ isOpen: true });
  }
  openAddModal() {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.nameSchoolSession,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      fk_id_school_year: this.props.userProfile.school_year_id,
      fk_id_education_type_v4: this.state.educationTypeId,
      status: true,
      educationType: this.state.educationItem,
    };
    let checkDoubleSession = this.props.schoolSessions.filter(
      (element) =>
        element.fk_id_education_type_v4 == this.state.educationTypeId &&
        element.name == this.state.nameSchoolSession
    );
    if (checkDoubleSession.length > 0) {
      this.setState({
        sessionExist: true,
        messageAlerte:
          "cette session scolaire déja existe pour cet etablissement",
      });
      setTimeout(() => {
        this.setState({ sessionExist: false, messageAlerte: "" });
      }, 4000);
    } else {
      this.props.addSchoolSession(data);
    }

    this.openAddModal();
    this.setState({
      nameSchoolSession: "",
      start_date: new Date(),
      end_date: new Date(),
      educationTypeId: null,
      educationItem: {},
    });
  }

  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeStartDate = (date) => {
    this.setState({ start_date: date });
  };
  handleChangeEndDate = (date) => {
    this.setState({ end_date: date });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.props.getEducationType(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      );
    }
  }
  UNSAFE_componentWillMount() {
    this.props.getEducationType(
      this.props.userProfile.establishment_id,
      this.props.userProfile.school_year_id
    );

    this.props.getSchoolSession(
      parseInt(this.props.userProfile.establishment_id, 10),
      parseInt(this.props.userProfile.school_year_id, 10)
    );
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
          {this.state.sessionExist ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-danger text-white shadow-lg">
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
              <AddSchoolSession
                openAddModal={this.openAddModal}
                handleCancel={this.handleCancel}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleArchive={this.handleArchive}
                handleChangeEducationType={this.handleChangeEducationType}
                handleChangeStartDate={this.handleChangeStartDate}
                handleChangeEndDate={this.handleChangeEndDate}
                values={this.state}
                educationTypes={this.props.educationTypes}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <SchoolSessionList
                schoolSessions={this.props.schoolSessions}
                educationTypes={this.props.educationTypes}
                handleChangeAlerte={this.handleChangeAlerte}
              />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveSchoolSession
              isOpenArchive={this.state.isOpenArchive}
              openArchiveModal={this.openArchiveModal}
            />
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
    schoolSessions: state.schoolSessionReducer.schoolSessions,
    educationTypes: state.EstabTypes.educationTypes,
  };
};

export default connect(mapStateToProps, {
  getSchoolSession,
  addSchoolSession,
  getEducationType,
})(SchoolSession);
