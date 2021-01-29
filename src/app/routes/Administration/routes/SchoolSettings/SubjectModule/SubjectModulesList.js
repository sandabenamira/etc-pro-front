import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../../util/IntlMessages";
import EditSubjectModules from "./EditSubjectModules";
import _ from "lodash";
import SubjectModulesListItem from "./SubjectModulesListItem";
import DeleteSubject from "./DeleteSubject";
import { connect } from "react-redux";
import { editSubjectModules } from "../../../../../../actions/SubjectModuleAction";
import { deleteSubjectModules } from "../../../../../../actions/SubjectModuleAction";
class SubjectModulesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      namesubjectModule: "",
      id: null,
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteSubjectModule = this.handleDeleteSubjectModule.bind(this);
  }

  handleDeleteSubjectModule = (event) => {
    event.preventDefault();
    this.props.deleteSubjectModules(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false });
  }
  handleEdit = (item, event) => {
    event.preventDefault();
    this.setState({
      isOpen: true,
      item: item,
      namesubjectModule: item.name,
      id: item.id,
    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  handleAnnule() {
    this.handleCancel();
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
      name: this.state.namesubjectModule,
      id: this.state.id,
    };
    this.props.editSubjectModules(data);
    this.handleCancel();
  };

  render() {
     return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="list.subject.module" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow >
              <TableCell>
                {" "}
                <IntlMessages id="sidebar.components.subjectModule" />
              </TableCell>

              <TableCell>
                <IntlMessages id="action.subject.module" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.subjectModules.map((moduleSubject,index) => {
              return (
                <SubjectModulesListItem
                archived={false}
                  moduleSubject={moduleSubject}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  key={index}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditSubjectModules
            moduleSubject={this.state.item}
            closeModal={this.handleCancel}
            isOpen={this.state.isOpen}
            values={this.state}
            handleAnnule={this.handleAnnule}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
          />
        ) : (
          ""
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteSubject
            handleDeleteSubjectModule={this.handleDeleteSubjectModule}
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

export default connect(
  mapStateToProps,
  {
    deleteSubjectModules,
    editSubjectModules,
  }
)(SubjectModulesList);
