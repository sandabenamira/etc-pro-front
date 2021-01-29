import React from "react";
import CardBox from "../../../../../../components/CardBox/index";
import AddSubjectsSettings from "./AddSubjectsSettings";
import { connect } from "react-redux";
import SubjectsSettingsList from "./SubjectsSettingsList";
import ArchiveSubjectsSettings from "./ArchiveSubjectsSettings";
import { UncontrolledAlert } from "reactstrap";
import { addSubjectSetting } from "../../../../../../actions/subjectAction";

class SubjectsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSubject: "",
      wording: "",
      moduleSubjectId: null,
      isOpen: false,
      isError: false,
      codeColor:"#000"
    };

    this.handleChange = this.handleChange.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }
  handleColorChange = (hex) => {
    this.setState({
      codeColor:hex.hex
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.moduleSubjectId !== null) {
      let data = {
        name: this.state.nameSubject,
        wording: this.state.wording,
        fk_id_subjects_module_v4: this.state.moduleSubjectId,
        fk_id_school_year: this.props.userProfile.school_year_id,
        status: true,
        color:this.state.codeColor
      };

      this.props.dispatch(addSubjectSetting(data));
      this.openAddModal();
      this.setState({
        nameSubject: "",
        wording: "",
        moduleSubjectId: null,
        color:""
      });
    } else {
      this.setState({ isError: true });
    }
  }

  handleChange = (name) => (event) => {
    let subjectModules = this.props.subjectModules
    this.setState({ [name]: event.target.value,subjectModules });
    if (name === "moduleSubjectId") {
      this.setState({ isError: false });
    }
  };

  openAddModal() {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
    }));
  }

  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({
      nameSubject: "",
      wording: "",
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
              <AddSubjectsSettings
                subjectModules={this.props.subjectModules}
                values={this.state}
                handleChange={this.handleChange}
                openAddModal={this.openAddModal}
                handleSubmit={this.handleSubmit}
                handleArchive={this.handleArchive}
                handleColorChange={this.handleColorChange}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <SubjectsSettingsList
                subjects={this.props.subjects}
                levels={this.props.levels}
                sections={this.props.sections}
                subjectModules={this.props.subjectModules}
              />
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveSubjectsSettings></ArchiveSubjectsSettings>
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
    subjects: state.subject.subjects,
    subjectModules: state.subjectModuleReducer.subjectModules,
    levels: state.levelsReducer.levels,
    sections: state.SectionsReducer.Section,
  };
};

export default connect(mapStateToProps)(SubjectsSettings);
