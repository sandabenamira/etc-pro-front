import React from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../../util/IntlMessages";
import { connect } from "react-redux";
import TypeOfEducationItem from './TypeOfEducationItem';
import EditTypeOfEducation from './EditTypeOfEducation';
import { editTypeEducation, deleteEducationType } from '../../../../../../actions/estabTypeAction'

import DeleteTypeOfEducation from './DeleteTypeOfEducation';
export class TypeOfEducationList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      nameTypeEducation: "",
      id: null,
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteTypeEducation = this.handleDeleteTypeEducation.bind(this);


  }

  handleDeleteTypeEducation = (event) => {
    event.preventDefault();
    this.props.deleteEducationType(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleEdit = (item, event) => {
    event.preventDefault();
    this.setState({
      isOpen: true,
      item: item,
      nameTypeEducation: item.name,
      id: item.id,
    });
  };

  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false })
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.nameTypeEducation,
    };

    this.props.editTypeEducation(data, this.state.id);
    this.handleCancel();
  };


  render() {   /* eslint eqeqeq: "off" */

    let { educationTypes } = this.props
    return (
      <div className="table-responsive-material">
        <div >
          <h1>
            <b>
              <IntlMessages id="list.type.of.education" />
            </b>
          </h1>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>

              <TableCell> <IntlMessages id="sidebar.components.typeOfEducation" /></TableCell>
              <TableCell ><IntlMessages id="action.type.of.education" /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {educationTypes.map((educationType, index) => {
              return (
                < TypeOfEducationItem
                  key={index}
                  educationType={educationType}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete} />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditTypeOfEducation
            handleCancel={this.handleCancel}
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
          <DeleteTypeOfEducation
            handleDeleteTypeEducation={this.handleDeleteTypeEducation}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
            ""
          )}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    educationTypes: state.EstabTypes.educationTypes,
  };
};

export default connect(mapStateToProps, { editTypeEducation, deleteEducationType })(TypeOfEducationList);
