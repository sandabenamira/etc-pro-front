import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import { connect } from "react-redux";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
import AgenceItem from "./AgenceItem";
import {
  deleteAgence,
  editAgence,
} from "../../../../../actions/AgenceSettingsAction";
import EditAgence from "./EditAgence";
import DeleteAgence from "./DeleteAgence";

/* eslint eqeqeq: "off" */
class AgenceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      nameAgence: "",
      typeAgence: "",
      gouvernoratAgence: "",
      faxAgence: "",
      telAgence: "",
      emailAgence: "",
      adresseAgence: "",
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteAgence = this.handleDeleteAgence.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeFax = this.handleChangeFax.bind(this);
  }

  handleChangeLevel = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
      sectionsByLevelId: this.props.sections,
    });
  };

  handleDeleteAgence = (event) => {
    event.preventDefault();
    this.props.deleteAgence(this.state.deleteItem);
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
      id: item.id,
      nameAgence: item.name,
      typeAgence: item.agency_type,
      gouvernoratAgence: item.agency_gouvernorat,
      faxAgence: item.agency_fax===null ? "" : "+" + item.agency_fax,
      telAgence: item.agency_tel===null ? "" : "+" + item.agency_tel,
      emailAgence: item.agency_mail,
      adresseAgence: item.agency_address,
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
  handleChangePhone = (value) => {
    this.setState({ telAgence: value });
  };
  handleChangeFax = (value) => {
    this.setState({ faxAgence: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.nameAgence,
      agency_type: this.state.typeAgence,
      agency_gouvernorat: this.state.gouvernoratAgence,
      agency_fax: this.state.faxAgence,
      agency_tel: this.state.telAgence,
      agency_mail: this.state.emailAgence,
      agency_address: this.state.adresseAgence,
    };
    
    this.props.editAgence(data, this.state.id);
    this.handleCancel();
  };
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="component.agence.list" />
            </b>
          </h1>
        </div>
        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell> Agence</TableCell>
              <TableCell>Type Agence</TableCell>
              <TableCell>Gouvernorat</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Fax</TableCell>
              <TableCell>
                <IntlMessages id="user.phone.number" />
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.agenceSettings.map((Item, index) => {
              return (
                <AgenceItem
                  archived={false}
                  key={index}
                  agenceItem={Item}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditAgence
            agenceItem={this.state.item}
            closeModal={this.handleCancel}
            values={this.state}
            handleAnnule={this.handleCancel}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
            handleChangePhone={this.handleChangePhone}
            handleChangeFax={this.handleChangeFax}
          />
        ) : (
          ""
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteAgence
            handleDeleteAgence={this.handleDeleteAgence}
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
  deleteAgence,
  editAgence,
})(AgenceList);
