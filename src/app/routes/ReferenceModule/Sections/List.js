import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import SectionListItem from "./SectionListItem";
import DeleteSectionItem from "./DeleteSectionItem";
import EditSections from "./EditSections";
import { connect } from "react-redux";
import {
  deleteSection,
  editSection,
} from "../../../../../actions/SectionsAction";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      nameSection: "",
      level_id: "",
      deleteIsopen: false,
      itemIdEdit: "",
      deleteItem: {},
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteSection = this.handleDeleteSection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleSubmitEdit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.nameSection,
      fk_id_level_v3: this.state.level_id,
      id: this.state.itemIdEdit,
    };
    this.props.editSection(data);
    this.handleCancel();
  };

  handleDeleteSection = (event) => {
    event.preventDefault();
    this.props.deleteSection(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleCancel() {
    this.setState({
      isOpen: false,
      deleteIsopen: false,
      nameSection: "",
      level_id: "",
      itemIdEdit: "",
    });
  }

  handleEdit = (item, event) => {
    event.preventDefault();
    this.setState({
      isOpen: true,
      nameSection: item.name,
      level_id: item.fk_id_level_v3,
      itemIdEdit: item.id,
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
              <IntlMessages id="component.sections.list" />
            </b>
          </h1>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {" "}
                <IntlMessages id="components.student.formadd.section" />
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
            {this.props.Sections.map((sectionItem, index) => {
              return (
                <SectionListItem
                  key={index}
                  sectionItem={sectionItem}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  levelList={this.props.levels}
                />
              );
            })}
          </TableBody>
        </Table>

        {this.state.isOpen ? (
          <EditSections
            values={this.state}
            closeModal={this.handleCancel}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmitEdit}
            isOpen={this.state.isOpen}
            levelList={this.props.levels}
          />
        ) : (
          ""
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteSectionItem
            handleDeleteSection={this.handleDeleteSection}
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
  {
    deleteSection,
    editSection,
  }
)(List);
