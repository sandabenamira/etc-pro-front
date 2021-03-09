import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../../../util/IntlMessages';
import EditCourseAssignment from './EditCourseAssignment';
import DeleteAssignment from './DeleteAssignment';
import _ from 'lodash';
import { connect } from 'react-redux';
import CoursesAssignmentListListItem from './CoursesAssignmentListItem';
import {
  deleteAssignementCourse,
  addAssignementCourse,
} from '../../../../../../actions/AssignementAction';

class CoursesAssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      deleteIsopen: false,
      deleteItem: {},
      itemIdEdit: null,
      classItemEdit: {},
      class_id: '',
      subjectsEdit: [],
      subjectsSelected: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
  }
  handleChangeClass = (selectedOption) => {
    this.setState({
      class_id: selectedOption.id,
      classItemEdit: selectedOption,
    });
  };
  handleChangeSubject = (selectedOption) => {
    if (selectedOption != null) {
      let subjectsSelected = selectedOption;
      this.setState({
        subjectsSelected,
      });
    } else {
      this.setState({
        subjectsSelected: [],
      });
    }
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let deletedSubjects = [];
    let newSubjects = [];

    deletedSubjects = _.differenceBy(this.state.subjectsEdit, this.state.subjectsSelected, 'id');
    newSubjects = _.differenceBy(this.state.subjectsSelected, this.state.subjectsEdit, 'id');
    let newData = newSubjects.map((element) => {
      return {
        assignment_date: new Date(),
        status: true,
        fk_id_class_v4: this.state.classItemEdit.id,
        fk_id_subject_v4: element.id,
        class: this.state.classItemEdit,
        subject: element,
        course: [],
      };
    });

    let deletedData = deletedSubjects.map((element) => {
      return {
        id: element.idAssignment,
        status: false,
      };
    });
    if(newData.length>0){
      this.props.addAssignementCourse(newData);
    }
    if(deletedData.length>0){
      this.props.deleteAssignementCourse(deletedData);

    }
    this.handleCancel();
  };
  handleDeleteAssignment = (event) => {
    event.preventDefault();
    this.props.deleteAssignementCourse(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleCancel() {
    this.setState({
      isOpen: false,
      deleteIsopen: false,
      deleteItem: {},
      itemIdEdit: null,
      classItemEdit: {},
      class_id: '',
      subjectsEdit: [],
      subjectsSelected: [],
    });
  }

  handleEdit = (item, event) => {
    event.preventDefault();
     let classItemEdit = { ...item.classItem, label: item.classItem.name };
    let subjectsEdit = item.subjects.map((element) => {
      return {
        ...element.subject,
        label: element.subject.name,
        value: element.subject.id,
        idAssignment: element.id,
      };
    });
    let subjectsSelected = item.subjects.map((element) => {
      return { ...element.subject, label: element.subject.name, value: element.subject.id };
    });
    this.setState({
      isOpen: true,
      itemIdEdit: item,
      classItemEdit,
      subjectsEdit,
      subjectsSelected,
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
              <IntlMessages id="sidebar.components.courseAssignmentList" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {' '}
                <IntlMessages id="components.note.class" />
              </TableCell>

              <TableCell>
                <IntlMessages id="components.note.subject" />
              </TableCell>

              <TableCell>
                <IntlMessages id="action.subject.module" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.courseAssignmentList.map((courseAssignment) => {
              return (
                <CoursesAssignmentListListItem
                  courseAssignment={courseAssignment}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditCourseAssignment
            handleCancel={this.handleCancel}
            isOpen={this.state.isOpen}
            values={this.state}
            handleSubmit={this.handleSubmit}
            ClassSettingsList={this.props.ClassSettingsList}
            subjectList={this.props.subjectList}
            handleChangeClass={this.handleChangeClass}
            handleChangeSubject={this.handleChangeSubject}
          />
        ) : (
          ''
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteAssignment
            handleDeleteAssignment={this.handleDeleteAssignment}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  deleteAssignementCourse,
  addAssignementCourse,
})(CoursesAssignmentList);
