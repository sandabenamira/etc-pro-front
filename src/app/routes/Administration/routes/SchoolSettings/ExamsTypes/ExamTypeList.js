import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import EditExamType from "./EditExamType";
 import ExamTypeListItem from "./ExamTypeListItem";
import DeleteExamTypeItem from "./DeleteExamTypeItem";
import { connect } from "react-redux";
import { editExamType } from "../../../../../../actions/ExamTypeAction";
import { deleteExamType } from "../../../../../../actions/ExamTypeAction";
import _ from "lodash";

class ExamTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      nameExamType: "",
      coefficient:0,
      id: null,
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteTypeExam = this.handleDeleteTypeExam.bind(this);
  }

  handleDeleteTypeExam = (event) => {
    event.preventDefault();
    this.props.deleteExamType(this.state.deleteItem);
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
      nameExamType: item.name,
      coefficient: item.coefficient,
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
      name: this.state.nameExamType,
      id: this.state.item.id,
      assignment_date: this.state.item.assignment_date,
      coefficient: this.state.coefficient,
      fk_id_establishment: this.state.item.fk_id_establishment,
      fk_id_school_year: this.state.item.fk_id_school_year,
      status: true
      
    };
    this.props.editExamType(data);
    this.handleCancel();
  };

  render() {
     return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="list.type.exam" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow >
              <TableCell>
                {" "}
                <IntlMessages id="sidebar.components.type.exam" />
              </TableCell>
              <TableCell>
                <IntlMessages id="subject.coefficient" />
              </TableCell>
              <TableCell>
                <IntlMessages id="action.subject.module" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(this.props.examTypes).map((examType,index) => {
              return (
                <ExamTypeListItem
                  examType={examType}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  key={index}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditExamType
          examType={this.state.item}
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
          <DeleteExamTypeItem
            handleDeleteTypeExam={this.handleDeleteTypeExam}
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
    deleteExamType,
    editExamType,
  }
)(ExamTypeList);
