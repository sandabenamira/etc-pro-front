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
      certificate: false,
      trainingFormat: "",
      sessions: [
        {
          id: 0,
          startDate: '',
          endDate: '',
          start:'',
          end: ''
        },
      ],
      modules: [
        {
          id: 0,
          title: "",
          value:1
        },
      ],
      levelsModules:[
        {
          id:0,
          levelName:"",
          moduleName:""
        }
      ]
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
    this.setState({ [name]: event.target.value });
  };
  addNewChoice = (index, name) => {
    if (name === "modules") {
      let modules = [];
      this.state.modules.map((element) => {
        modules.push({
          id: element.id,
          title: element.title,
          value:element.value,
          isAdded: true,
        });
        return element;
      });
      modules.push({
        id: index,
        title: "",
        value:index+1,
        isAdded: false,
      });
      this.setState({ modules });
    } else if (name === "sessions") {
      let sessions = [];
      this.state.sessions.map((element) => {
        sessions.push({
          id: element.id,
          startDate: element.startDate,
          endDate: element.endDate,
          start:element.start,
          end: element.end,
          isAdded: true,
        });
        return element;
      });
      sessions.push({
        id: index,
        startDate: "",
        endDate: "",
        start:'',
        end: '',
        isAdded: false,
      });
      this.setState({ sessions });
    } else if (name === "levelsModules") {
      let levelsModules = [];
      this.state.levelsModules.map((element) => {
        levelsModules.push({
          id: element.id,
          levelName:element.levelName,
          moduleName:element.moduleName,
          isAdded: true,
        });
        return element;
      });
      levelsModules.push({
        id: index,
        levelName:"",
        moduleName:"",
        isAdded: false,
      });
      this.setState({ levelsModules });
    }
  };

  deleteChoice = (index, name) => {
    if (name === "modules") {
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
    }else if (name === "sessions") {
      let sessions = [];
      let newIndex = 0;
      this.state.sessions.map((element) => {
        if (element.id !== index) {
          sessions.push({
            ...element,
          });
          newIndex++;
        }
        return element;
      });
      this.setState({ sessions });
    }else if (name === "levelsModules") {
      let levelsModules = [];
      let newIndex = 0;
      this.state.levelsModules.map((element) => {
        if (element.id !== index) {
          levelsModules.push({
            ...element,
          });
          newIndex++;
        }
        return element;
      });
      this.setState({ levelsModules });
    }
  
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

  setDate(startDate, endDate, index) {

    let oldSession = this.state.sessions;
    let newSession = oldSession.map((objSession, i) =>
      i === index
        ? {
            ...objSession,
            startDate: startDate._d,
            endDate: endDate._d,
            start:startDate,
            end: endDate
          }
        : objSession
    );
    this.setState({
      sessions: newSession,
    });
  }

  handleChangeLevelsModules = (event, name, index) =>{
    let oldLevelsModules = this.state.levelsModules;
    let newLevelsModules = oldLevelsModules.map((objLevelModule, i) =>
      i === index
        ? {
            ...objLevelModule,
            [name]: event.target.value,
          }
        : objLevelModule
    );
    this.setState({
      levelsModules: newLevelsModules,
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
              setDate={this.setDate.bind(this)}
              handleChangeLevelsModules={this.handleChangeLevelsModules.bind(this)}
              
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
