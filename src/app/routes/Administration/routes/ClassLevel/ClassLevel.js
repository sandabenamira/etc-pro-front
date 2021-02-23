import React from "react";
import { connect } from "react-redux";
import AddLevel from "./AddLevel";
import LevelList from "./LevelList";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../../util/IntlMessages";
import Input from "@material-ui/icons/Input";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

class ClassLevel extends React.Component {
  constructor() {
    super();
    this.state = {
      addLevelModal: false,
      modal: false,
      classItem: "",
      levels: [],
    };
    this.cancelModal = this.cancelModal.bind(this);
    this.addLevel = this.addLevel.bind(this);
  }
  addLevel() {
    this.setState({ addLevelModal: true });
  }
  cancelModal() {
    this.setState({ modal: false, addLevelModal: false });
  }

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.submenu.classlevel" />}
        />
        <div className="col-md-12 text-right ">
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            onClick={this.addLevel}
          >
            <AddIcon />
          </Fab>
          &nbsp;&nbsp;&nbsp;
          <Fab size="small" color="primary">
            <Input />
          </Fab>
        </div>

        {this.state.addLevelModal ? (
          <AddLevel cancelModal={this.cancelModal} />
        ) : (
          ""
        )}
        <LevelList ClassLevels={this.props.ClassLevels} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ClassLevels: state.ClassLevels,
  };
};

export default connect(mapStateToProps)(ClassLevel);
