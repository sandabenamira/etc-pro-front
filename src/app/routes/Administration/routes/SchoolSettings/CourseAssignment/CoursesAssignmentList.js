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
  editAssignementCourse,
} from '../../../../../../actions/AssignementAction';

class CoursesAssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      deleteIsopen: false,
      deleteItem: {},
      classId: 0,
      subjectId: 0,
      CoficientGlobal: 0,
      itemIdEdit: null,
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
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
      global_coefficient: this.state.CoficientGlobal,
      fk_id_class_v4: this.state.classId,
      fk_id_subject_v4: this.state.subjectId,
      id: this.state.itemIdEdit,
    };

    let checkDoubleAssignementCourse = this.props.courseAssignment.filter(
      (element) =>
        element.fk_id_class_v4 == this.state.classId &&
        element.fk_id_subject_v4 == this.state.subjectId &&
        element.id != this.state.itemIdEdit
    );
    if (checkDoubleAssignementCourse.length > 0) {
      this.props.handleChangeAlerte();
    } else {
      this.props.editAssignementCourse(data);
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
  handleAnnule() {
    this.handleCancel();
  }
  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false, item: {}, deleteItem: {} });
  }

  handleEdit = (item, event) => {
    event.preventDefault();

    this.setState({
      isOpen: true,
      itemIdEdit: item.id,
      CoficientGlobal: item.global_coefficient,
      classId: item.fk_id_class_v4,
      subjectId: item.fk_id_subject_v4,
    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  render() {
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
            {this.props.courseAssignment.map((courseAssignment) => {
              return (
                <CoursesAssignmentListListItem
                  courseAssignment={courseAssignment}
                  ClassSettings={this.props.ClassSettings}
                  subjects={this.props.subjects}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditCourseAssignment
            closeModal={this.handleCancel}
            isOpen={this.state.isOpen}
            values={this.state}
            handleAnnule={this.handleAnnule}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
            ClassSettings={this.props.ClassSettings}
            subjects={this.props.subjects}
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
  return {
    levels: state.levelsReducer.levels,
    ClassSettings: state.ClassSettingsReducer.classSettings,
    subjects: state.subject.subjects,
  };
}

export default connect(mapStateToProps, { deleteAssignementCourse, editAssignementCourse })(
  CoursesAssignmentList
);
