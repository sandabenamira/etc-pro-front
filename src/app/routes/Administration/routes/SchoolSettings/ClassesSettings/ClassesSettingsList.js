import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import { connect } from "react-redux";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../../util/IntlMessages";
import ClassSettingsItem from "./ClassSettingsItem";
import DeleteClassSettings from "./DeleteClassSettings";
import EditClassSettings from "./EditClassSettings";
import {
  deleteClassSettings,
  editClassSettings,
} from "../../../../../../actions/ClassSettingsAction";
import _ from "lodash";
class ClassesSettingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      nameClassSettings: "",
      id: null,
      levelId: "",
      sectionId: "",
      sectionsByLevelId: [],
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteClassSettings = this.handleDeleteClassSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  handleChangeLevel = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
      sectionsByLevelId: this.props.sections,
    });
  };

  handleDeleteClassSettings = (event) => {
    event.preventDefault();
    this.props.deleteClassSettings(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false });
  }

  handleEdit = (item, event) => {
    event.preventDefault();
    let sectionsByLevelId = this.props.sections;
    this.setState({
      isOpen: true,
      item: item,
      nameClassSettings: item.name,
      id: item.id,
      levelId: item.fk_id_level_v4,
      sectionId: item.fk_id_section_v4,
      sectionsByLevelId,
    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleToggle() {
    this.handleCancel();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.nameClassSettings,
      fk_id_level_v4: this.state.levelId,
      fk_id_section_v4: this.state.sectionId,
    };
    this.props.editClassSettings(data, this.state.id);
    this.handleCancel();
  };
  render() {
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="component.classes.list" />
            </b>
          </h1>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {" "}
                <IntlMessages id="components.student.formadd.classe" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.note.niveau" />
              </TableCell>            
              <TableCell>
                <IntlMessages id="action.type.of.education" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.ClassSettings.map((Item, index) => {
              return (
                <ClassSettingsItem
                  archived={false}
                  key={index}
                  classItem={Item}
                  handleEdit={this.handleEdit}
                  levels={this.props.levels}
                  sections={this.props.sections}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditClassSettings
            moduleSubject={this.state.item}
            closeModal={this.handleCancel}
            values={this.state}
            handleAnnule={this.handleCancel}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
            levels={this.props.levels}
            handleChangeLevel={this.handleChangeLevel}
          />
        ) : (
          ""
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteClassSettings
            handleDeleteClassSettings={this.handleDeleteClassSettings}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  deleteClassSettings,
  editClassSettings,
})(ClassesSettingsList);
