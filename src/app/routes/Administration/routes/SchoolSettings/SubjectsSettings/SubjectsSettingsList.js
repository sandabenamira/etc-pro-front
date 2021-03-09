import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../../util/IntlMessages";
import SubjectItem from "./SubjectItem";
import DeleteSubjectSetting from "./DeleteSubjectSetting";
import {
  deleteSubjectSetting,
  editSubjectSetting,
 } from "../../../../../../actions/subjectAction";
import { connect } from "react-redux";
import EditSubjectSetting from "./EditSubjectSetting";
import _ from "lodash";
class SubjectsSettingsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenEdit: false,
      deleteIsopen: false,
      deleteItem: {},
      item: {},
      nameSubject: "",
      wording: "",
      moduleSubjectId: null,
      id: null,
      isOpenAssignment: false,
      sections: [],
      listOfAssignment: [
        {
          id: 0,
          levelId: null,
          sectionId: null,
          sectionDisabled: true,
          isChecked: false,
          isLevelDisabled: false,
        },
      ],
      codeColor: "#000",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDeleteSubject = this.handleDeleteSubject.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAssignment = this.handleAssignment.bind(this);
    this.handleChangeAssignment = this.handleChangeAssignment.bind(this);
    this.addNewAssignment = this.addNewAssignment.bind(this);
    this.handleChangeListSubjects = this.handleChangeListSubjects.bind(this);
    this.handleChangeListSubjectsSection = this.handleChangeListSubjectsSection.bind(
      this
    );
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleChangeAssignment(event, name, index) {
    let levelsIds = _.map(this.props.levels, "id");
    let newListSubjects = [];
    levelsIds.forEach((levelId) => {
      let sections = this.props.sections.filter(
        (element) => element.fk_id_level_v3 === levelId
      );
      this.setState({ sections });
      if (!_.isEmpty(sections)) {
        let sectionsIds = _.map(sections, "id");
        sectionsIds.forEach((sectionId) => {
          newListSubjects.push({
            levelId: levelId,
            sectionId: sectionId,
            [name]: event.target.checked,
            sectionDisabled: false,
            isLevelDisabled: !event.target.checked,
          });
        });
      } else {
        newListSubjects.push({
          levelId: levelId,
          sectionId: null,
          [name]: event.target.checked,
          sectionDisabled: true,
          isLevelDisabled: !event.target.checked,
        });
      }
    });
    this.setState({ listOfAssignment: newListSubjects });
  }

  handleChangeListSubjects(event, name, index) {
    let sections = [];
    if (name === "levelId") {
      sections = this.props.sections.filter(
        (element) => element.fk_id_level_v4 === event.target.value
      );
      this.setState({ sections });
    }
    let newListSubjects = this.state.listOfAssignment.map((objSubject) =>
      name === "levelId" && !_.isEmpty(sections) && objSubject.id === index
        ? {
            ...objSubject,
            [name]: event.target.value,
            sectionDisabled: false,
            sectionId: null,
          }
        : objSubject.id === index
        ? { ...objSubject, [name]: event.target.value, sectionDisabled: true }
        : objSubject
    );

    this.setState({ listOfAssignment: newListSubjects });
  }

  handleChangeListSubjectsSection(event, name, index) {
    let newListSubjects = this.state.listOfAssignment.map((objSubject) =>
      objSubject.id === index
        ? { ...objSubject, [name]: event.target.value, sectionDisabled: false }
        : objSubject
    );
    this.setState({ listOfAssignment: newListSubjects });
  }

  addNewAssignment = (index) => {
    this.setState((prevState) => ({
      listOfAssignment: [
        ...prevState.listOfAssignment,
        {
          id: index,
          levelId: null,
          sectionId: null,
          sectionDisabled: true,
          isChecked: false,
          isLevelDisabled: false,
        },
      ],
    }));
  };
  handleAssignment = (item, event) => {
    event.preventDefault();
    this.setState({ isOpenAssignment: true, id: item.id });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.nameSubject,
      wording: this.state.wording,
      fk_id_subjects_module: this.state.moduleSubjectId,
      color: this.state.codeColor,
    };
    this.props.editSubjectSetting(data, this.state.id);
    this.handleCancel();
  };

  handleEdit = (item, event) => {
    event.preventDefault();
    this.setState({
      isOpenEdit: true,
      item: item,
      nameSubject: item.name,
      wording: item.wording,
      moduleSubjectId: item.fk_id_subjects_module_v4,
      id: item.id,
      codeColor: item.color,
    });
  };

  handleDeleteSubject = (event) => {
    event.preventDefault();
    this.props.deleteSubjectSetting(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };
  handleCancel() {
    this.setState({
      deleteIsopen: false,
      isOpenEdit: false,
      isOpenAssignment: false,
      listOfAssignment: [
        {
          id: 0,
          levelId: null,
          sectionId: null,
          sectionDisabled: true,
          isChecked: false,
          isLevelDisabled: false,
        },
      ],
    });
  }
  handleColorChange = (e) => {
    this.setState({
      codeColor: e.target.value,
    });
  };
  render() {   /* eslint eqeqeq: "off" */
    let { subjects, subjectModules } = this.props;
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="list.all.subject" />
            </b>
          </h1>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {" "}
                <IntlMessages id="subjects" />
              </TableCell>
              <TableCell>
                <IntlMessages id="room.description" />
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="sidebar.components.subjectModule" />
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="sidebar.components.couleur" />
              </TableCell>
              <TableCell align="center">
                <IntlMessages id="action.type.of.education" />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {subjects.map((subject, index) => {
              return (
                <SubjectItem
                  archived={false}
                  key={index}
                  subject={subject}
                  subjectModules={subjectModules}
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit}
                  handleAssignment={this.handleAssignment}
                />
              );
            })}
          </TableBody>
        </Table>

        {this.state.isOpenEdit === true ? (
          <EditSubjectSetting
            item={this.state.item}
            handleCancel={this.handleCancel}
            subjectModules={subjectModules}
            values={this.state}
            handleEdit={this.handleEdit}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleColorChange={this.handleColorChange}
          />
        ) : (
          ""
        )}

        {this.state.deleteIsopen === true ? (
          <DeleteSubjectSetting
            handleDeleteSubject={this.handleDeleteSubject}
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
  deleteSubjectSetting,
  editSubjectSetting,
})(SubjectsSettingsList);
