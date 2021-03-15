import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import { connect } from 'react-redux';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../../../util/IntlMessages';
import ClassSettingsItem from './ClassSettingsItem';
import DeleteClassSettings from './DeleteClassSettings';
import EditClassSettings from './EditClassSettings';
import { deleteClassSettings, editClassSettings } from '../../../../../../actions/ClassSettingsAction';
import { classService } from '../../../../../../_services/class.service';

/* eslint eqeqeq: "off" */
class ClassesSettingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      itemEdit: {},
      deleteIsopen: false,
      deleteItem: {},
      nameClassSettings: '',
      id: null,
      levelId: '',
      subjectId: '',
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteClassSettings = this.handleDeleteClassSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
  }

  handleChangeSubject = (name) => (selectedOption) => {
    this.setState({ [name]: selectedOption });
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
    this.setState({
      isOpen: true,
      itemEdit: item,
      nameClassSettings: item.class.name,
      id: item.id,
      levelId: this.props.levelList.find((element) => element.id === item.class.fk_id_level_v4),
      subjectId: { ...item.subject, label: item.subject.name },
    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
     let apiEndpoint =
      `/inscription_v4?access_token=${localStorage.token}&filter[where][and][0][status]=` +
      true +
      `&filter[where][and][1][fk_id_class_v4]=` +
      item.fk_id_class_v4;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        if (res.data.length > 0) {
          this.setState({ alerteDelete: 'il y a des collaborateurs associés à cette classe', possibleDelete: false });
        } else {
          this.setState({ alerteDelete: <IntlMessages id="message.confirm.modal" />, possibleDelete: true });
        }
        this.setState({ deleteIsopen: true, deleteItem: item });
      }
    });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...this.state.itemEdit,
      fk_id_subject_v4: this.state.subjectId.id,
      class: { ...this.state.itemEdit.class, name: this.state.nameClassSettings },
      subject: this.state.subjectId,
    };
    this.props.editClassSettings(data);
    this.handleCancel();
  };
  render() {

    /* eslint eqeqeq: "off" */
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
                {' '}
                <IntlMessages id="components.student.formadd.classe" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.note.niveau" />
              </TableCell>
              <TableCell>Formation</TableCell>
              <TableCell>
                <IntlMessages id="action.type.of.education" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.courseAssignment.map((Item, index) => {
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
            closeModal={this.handleCancel}
            values={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleChangeSubject={this.handleChangeSubject}
            subjectList={this.props.subjectList}
            levelList={this.props.levelList}
          />
        ) : (
          ''
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteClassSettings
            handleDeleteClassSettings={this.handleDeleteClassSettings}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
            alerteDelete={this.state.alerteDelete}
            possibleDelete={this.state.possibleDelete}
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
  deleteClassSettings,
  editClassSettings,
})(ClassesSettingsList);
