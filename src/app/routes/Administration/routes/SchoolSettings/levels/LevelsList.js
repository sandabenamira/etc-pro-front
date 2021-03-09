import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import EditLevel from "./EditLevel";
import LevelListItem from "./LevelListItem";
import DeleteLevel from "./DeleteLevel";
import { connect } from "react-redux";
import { editLevel } from "../../../../../../actions/LevelAction";
import { deletelevel } from "../../../../../../actions/LevelAction";
class LevelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      namelevel: "",
      fk_id_education_type_v4:'',
      id: null,
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteLevel = this.handleDeleteLevel.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleToggle() {
    this.handleCancel();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.namelevel,
      id: this.state.id,
      fk_id_education_type_v4:this.state.fk_id_education_type_v4
    };
    this.props.editLevel(data);
    this.handleCancel();
  };
  handleDeleteLevel = (event) => {
    event.preventDefault();
    this.props.deletelevel(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };
  handleAnnule() {
    this.handleCancel();
  }
  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false });
  }

  handleEdit = (item, event) => {
    event.preventDefault();
    this.setState({
      isOpen: true,
      namelevel: item.name,
      id: item.id,
      item: item,
      fk_id_education_type_v4:item.fk_id_education_type_v4
      

    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="list.levels" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {" "}
                <IntlMessages id="sidebar.components.levels" />
              </TableCell>

              <TableCell>
                <IntlMessages id="sidebar.components.typeOfEducation" />
              </TableCell>
              <TableCell>
                <IntlMessages id="action.subject.module" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.levels.map((levelItem) => {
              return (
                <LevelListItem
                archived={false}
                  levelItem={levelItem}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  educationTypes={this.props.educationTypes}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditLevel
            levels={this.state.item}
            closeModal={this.handleCancel}
            isOpen={this.state.isOpen}
            values={this.state}
            educationTypes={this.props.educationTypes}
            handleAnnule={this.handleAnnule}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
          />
        ) : (
          ""
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteLevel
            handleDeleteLevel={this.handleDeleteLevel}
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
  return {
    levels: state.levelsReducer.levels,
  };
}

export default connect(
  mapStateToProps,
  { editLevel, deletelevel }
)(LevelsList);
