import React, { Component } from "react";
import CardBox from "../../../../../../components/CardBox/index";
import { connect } from "react-redux";
import ArchiveGroupes from "./ArchiveGroupes";
import AddGroupes from "./AddGroupes";
import GroupesList from "./GroupesList";
import { UncontrolledAlert } from "reactstrap";
import { addGroup, getGroup } from "../../../../../../actions/GroupsAction";
import { getEducationType } from "../../../../../../actions/estabTypeAction";

class Groupes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      group: "",
      classId: "",
      classItem: "",
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleArchive = this.handleArchive.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    // this.handleArchive = this.handleArchive.bind(this);
    // this.handleDearchiver=this.handleDearchiver.bind(this)
  }

  openAddModal = () => {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  };

  handleSubmit(event) {
    event.preventDefault();
    let dataClass = this.state.classItem;
    let data = {
      status: true,
      name: this.state.group,
      fk_id_class: this.state.classId,
    };
    this.props.dispatch(addGroup(data, dataClass));
    this.setState({
      open: false,
      group: "",
      classId: "",
      classItem: {},
    });
  }

  //   handleArchive(event) {
  //     event.preventDefault();
  //     this.openAddModal();
  //     this.setState({});
  //   }

  handleChange = (name) => (event) => {
    if (name == "classId") {
      let obj = JSON.parse(event.target.value);
      this.setState({ [name]: obj.id, classItem: obj });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };
  handleCancel() {
    this.setState({ open: false });
  }
  openAddModal() {
    this.setState({ open: true });
  }
  //   handleArchive(event) {
  //     event.preventDefault();
  //     this.openAddModal();
  //     this.setState({});
  //   }

  //   UNSAFE_componentWillMount() {
  //     this.props.dispatch(
  //       getEducationType(
  //         this.props.userProfile.establishment_id,
  //         this.props.userProfile.school_year_id
  //       )
  //     );
  //   }
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.props.dispatch(
        getGroup(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id
        )
      );
    }
  }
  componentDidMount() {
    this.props.dispatch(
      getGroup(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      )
    );
  }
  handleDearchiver = (item, event) => {};
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
              <AddGroupes
                openAddModal={this.openAddModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                //   handleArchive={this.handleArchive}
                handleCancel={this.handleCancel}
                values={this.state}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <GroupesList groupsList={this.props.groupsList} />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveGroupes groupsList={this.props.archivedgroupsList} />
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
    ClassSettings: state.ClassSettingsReducer.classSettings,
    groupsList: state.GroupsReducer.groupsList,
    archivedgroupsList: state.GroupsReducer.archivedgroupsList,
  };
};

export default connect(mapStateToProps)(Groupes);
