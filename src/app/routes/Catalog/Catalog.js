import React, { Component } from "react";
import { connect } from "react-redux";
import CatalogList from "./CatalogList";
import AddTraining from "./AddTraining";

export class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      theme: "",
      titleTraining: "",
      descriptionTraining: "",
      PlaceTraining: "",
      linkTraining: "",
      formerId: null,
      descriptionFormer: "",
      goal: "",
      methodology: "",
      Prerequisites: "",
      nbrDays: null,
      price: null,
      sessions: [
        {
          id: 0,
          startDate: "",
          endDate: "",
        },
      ],
      modules: [
        {
          id: 0,
          title: "",
        },
      ],
    };
    this.openAddTraining = this.openAddTraining.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  openAddTraining() {
    this.setState({ isOpen: true });
  }
  handleCancel() {
    this.setState({ isOpen: false });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.values });
  };
  addNewChoice = (index) => {
    let modules = [];
    this.state.modules.map((element) => {
      modules.push({
        id: element.id,
        title: element.title,
        isAdded: true,
      });
      return element;
    });
    modules.push({
      id: index,
      title: "",
      isAdded: false,
    });
    this.setState({ modules });
  };

  deleteChoice = (index) => {
    let modules = [];
    let newIndex = 0;
    this.state.modules.map((element) => {
      if (element.id !== index) {
        modules.push({
          ...element,
        });
        newIndex++;
      }
      return element;
    });
    this.setState({ modules });
  };

  handleChangeModules = (event, name, index) => {
    let oldModules = this.state.modules;
    let newModules = oldModules.map((objModule, i) =>
      i === index
        ? {
            ...objModule,
            [name]: event.target.value,
          }
        : objModule
    );
    this.setState({
      modules: newModules,
    });
  };

  render() {
    return (
      <div className="app-wrapper">
        <div className="d-flex flex-column">
          <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px" }}>
            Catalogue des informations
          </div>
          <div className="p-2">
            <CatalogList openAddTraining={this.openAddTraining} />
          </div>
          {this.state.isOpen && (
            <AddTraining
              values={this.state}
              handleCancel={this.handleCancel}
              handleChange={this.handleChange.bind(this)}
              addNewChoice={this.addNewChoice.bind(this)}
              deleteChoice={this.deleteChoice.bind(this)}
              handleChangeModules={this.handleChangeModules.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Catalog);
