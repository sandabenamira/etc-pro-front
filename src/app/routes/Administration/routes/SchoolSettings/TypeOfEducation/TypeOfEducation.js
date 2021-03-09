import React from "react";
import CardBox from "../../../../../../components/CardBox/index";
import AddTypeOfEducation from "./AddTypeOfEducation";
import { connect } from "react-redux";
import TypeOfEducationList from "./TypeOfEducationList";
import ArchiveTypeOfEducation from "./ArchiveTypeOfEducation";
import { UncontrolledAlert } from "reactstrap";
import { getEducationType } from "../../../../../../actions/estabTypeAction";
import { addEducationType } from "../../../../../../actions/estabTypeAction";

class TypeOfEducation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      nameTypeEducation: "",
      isOpenArchive: false,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.openArchiveModal = this.openArchiveModal.bind(this);
  }
  openArchiveModal() {
    this.setState((previousState) => ({
      isOpenArchive: !previousState.isOpenArchive,
    }));
  }
  openAddModal() {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.nameTypeEducation,
      fk_id_establishment: this.props.userProfile.establishment_id,
      fk_id_school_year: this.props.userProfile.school_year_id,
      status: true,
    };

    this.props.dispatch(addEducationType(data));
    this.openAddModal();
    this.setState({
      nameTypeEducation: "",
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

  UNSAFE_componentWillMount() {
    this.props.dispatch(
      getEducationType(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      )
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.props.dispatch(
        getEducationType(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id
        )
      );
    }
  }
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
          {this.props.errorStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <AddTypeOfEducation
                openAddModal={this.openAddModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleArchive={this.handleArchive}
                values={this.state}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <TypeOfEducationList educationTypes={this.props.educationTypes} />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveTypeOfEducation
              isOpenArchive={this.state.isOpenArchive}
              openArchiveModal={this.openArchiveModal}
            ></ArchiveTypeOfEducation>
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
    educationTypes: state.EstabTypes.educationTypes,
  };
};

export default connect(mapStateToProps)(TypeOfEducation);
