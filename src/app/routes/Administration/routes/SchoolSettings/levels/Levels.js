import React from "react";
import CardBox from "../../../../../../components/CardBox/index";
import { connect } from "react-redux";
import ArchiveLevel from "./ArchiveLevel";
import AddLevel from "./AddLevel";
import LevelsList from "./LevelsList";
import { UncontrolledAlert } from "reactstrap";
import { addlevel, getLevel } from "../../../../../../actions/LevelAction";
import { getEducationType } from "../../../../../../actions/estabTypeAction";

class Levels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameLevel: "",
      fk_id_education_type_v4: 0,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleDearchiver=this.handleDearchiver.bind(this)
  }

  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.nameLevel,
      status: true,
      fk_id_education_type_v4: this.state.educationTypeId,
      fk_id_school_year: this.props.userProfile.school_year_id,
    };
    this.props.dispatch(addlevel(data));
    this.openAddModal();
    this.setState({ nameLevel: "", open: false });
  }

  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }

  handleChange = (name) => (event) => {
    let educationsTypes = this.props.educationTypes
    this.setState({ [name]: event.target.value,educationsTypes });
  };
  handleCancel() {
    this.setState({ open: false });
  }
  openAddModal() {
    this.setState({ open: true });
  }
  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }

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
        getLevel(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id
        )
      );
    }
  }
  handleDearchiver= (item, event) => {
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
            <AddLevel
              openAddModal={this.openAddModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleArchive={this.handleArchive}
              handleCancel={this.handleCancel}
              values={this.state}
            />
          </CardBox>
        </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <LevelsList educationTypes={this.props.educationTypes} />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveLevel
              values={this.state}
              educationTypes={this.props.educationTypes}
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
    levels: state.levelsReducer.levels,
    educationTypes: state.EstabTypes.educationTypes,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};

export default connect(mapStateToProps)(Levels);
