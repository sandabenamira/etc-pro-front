import React, { Component } from "react";
import { connect } from "react-redux";
import OnlineTrainingList from "./OnlineTrainingList";
import AddOnlineTraining from "./AddOnlineTraining";
import { getUsers } from "../../../../../store/actions/User";
import { addTraining } from "../../../../../store/actions/Training";
import IntlMessages from "../../../../../util/IntlMessages";

export class OnlineTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      theme: "",
      titleTraining: "",
      descriptionTraining: "",
      placeTraining: "",
      linkTraining: "",
       descriptionFormer: "",
      goal: "",
      methodology: "",
      Prerequisites: "",
      nbrDays: 1,
      price: null,
      certificate: false,
      trainingFormat: "",
      trainer: null,
      sessions: [
        {
          id: 0,
          startDate:"",
          endDate: "",
          start: "",
          end: "",
        },
      ],
      modules: [
        {
          id: 0,
          title: "",
          value: 1,
        },
      ],
      levelsModules: [
        {
          id: 0,
          levelName: "",
          moduleName: "",
        },
      ],
      programs: [
        {
          id: 0,
          title: "",
          description: "",
        },
      ],
    };
    this.openAddTraining = this.openAddTraining.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(getUsers());
  }

  openAddTraining() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  handleCancel() {
    this.setState({
      isOpen: false,
      theme: "",
      titleTraining: "",
      descriptionTraining: "",
      placeTraining: "",
      linkTraining: "",
      formerId: null,
      descriptionFormer: "",
      goal: "",
      methodology: "",
      Prerequisites: "",
      nbrDays: 1,
      price: null,
      certificate: false,
      trainingFormat: "",
      trainer: null,
      sessions: [
        {
          id: 0,
          startDate: "",
          endDate: "",
          start: "",
          end: "",
        },
      ],
      modules: [
        {
          id: 0,
          title: "",
          value: 1,
        },
      ],
      levelsModules: [
        {
          id: 0,
          levelName: "",
          moduleName: "",
        },
      ],
      programs: [
        {
          id: 0,
          title: "",
          description: "",
        },
      ],
    });
    this.openAddTraining();
  }

  handleChange = (name) => (event) => {
    if (name === "nbrDays") {
      if (
        this.state.programs[event.target.value - 2].title.trim() !== "" &&
        this.state.programs[event.target.value - 2].description.trim() !== ""
      ) {
        this.addNewChoice(event.target.value - 1, "programs");
        this.setState({ [name]: event.target.value });
      } else {
      }
    }
    if (name !== "nbrDays") {
      this.setState({ [name]: event.target.value });
    }
  };
  addNewChoice = (index, name) => {
    if (name === "modules") {
      let modules = [];
      this.state.modules.map((element) => {
        modules.push({
          id: element.id,
          title: element.title,
          value: element.value,
          isAdded: true,
        });
        return element;
      });
      modules.push({
        id: index,
        title: "",
        value: index + 1,
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
          start: element.start,
          end: element.end,
          isAdded: true,
        });
        return element;
      });
      sessions.push({
        id: index,
        startDate: "",
        endDate: "",
        start: "",
        end: "",
        isAdded: false,
      });
      this.setState({ sessions });
    } else if (name === "levelsModules") {
      let levelsModules = [];
      this.state.levelsModules.map((element) => {
        levelsModules.push({
          id: element.id,
          levelName: element.levelName,
          moduleName: element.moduleName,
          isAdded: true,
        });
        return element;
      });
      levelsModules.push({
        id: index,
        levelName: "",
        moduleName: "",
        isAdded: false,
      });
      this.setState({ levelsModules });
    } else if (name === "programs") {
      let programs = [];
      this.state.programs.map((element) => {
        programs.push({
          id: element.id,
          title: element.title,
          description: element.description,
          // isAdded: true,
        });
        return element;
      });
      programs.push({
        id: index,
        title: "",
        description: "",
        // isAdded: false,
      });
      this.setState({ programs });
    }
  };

  deleteChoice = (index, name) => {
    if (name === "modules") {
      let modules = [];
      this.state.modules.map((element) => {
        if (element.id !== index) {
          modules.push({
            ...element,
          });
        }
        return element;
      });
      this.setState({ modules });
    } else if (name === "sessions") {
      let sessions = [];
      this.state.sessions.map((element) => {
        if (element.id !== index) {
          sessions.push({
            ...element,
          });
        }
        return element;
      });
      this.setState({ sessions });
    } else if (name === "levelsModules") {
      let levelsModules = [];
      this.state.levelsModules.map((element) => {
        if (element.id !== index) {
          levelsModules.push({
            ...element,
          });
        }
        return element;
      });
      this.setState({ levelsModules });
    } else if (name === "programs") {
      let programs = [];
      this.state.programs.map((element) => {
        if (element.id !== index) {
          programs.push({
            ...element,
          });
        }
        return element;
      });
      this.setState({ programs });
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
            start: startDate,
            end: endDate,
          }
        : objSession
    );
    this.setState({
      sessions: newSession,
    });
  }

  handleChangeLevelsModules = (event, name, index) => {
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

  handleChangePrograms = (event, name, index) => {
    let oldPrograms = this.state.programs;
    let newPrograms = oldPrograms.map((objProgram, i) =>
      i === index
        ? {
            ...objProgram,
            [name]: event.target.value,
          }
        : objProgram
    );
    this.setState({ programs: newPrograms });
  };

  handleSubmit(e) {
    e.preventDefault();
     let data = {
      theme: this.state.theme,
      title: this.state.titleTraining,
      certificate: this.state.certificate,
      format: this.state.trainingFormat,
      description: this.state.descriptionTraining,
      link: this.state.linkTraining,
      trainer: this.state.trainer,
      descriptionFormer: this.state.descriptionFormer,
      methodology: this.state.methodology,
      location: this.state.placeTraining,
      objective: this.state.goal,
      prerequiste: this.state.Prerequisites,
      numberDay: this.state.nbrDays,
      modules: this.state.modules,
      levelsModules: this.state.levelsModules,
      program: this.state.levelsModules,
      price: this.state.price,
      sessions: this.state.sessions,
      fk_id_company: 1,
      creationDate: "",
      fk_id_creator: 1,
    };
     this.props.dispatch(addTraining(data));
    this.handleCancel();
  }

//user=props.users.filter(({ name }) => name === "Formateurs");

  render() {

    return (
      <div className="app-wrapper">
        <div className="d-flex flex-column">
          <div
            className="p-2"
            style={{ color: "#3f51b5", fontSize: "24px", fontWeight: "bold" }}
          >
            <IntlMessages id="e-Learning" /> &nbsp; - &nbsp;
            {/* <IntlMessages id="scheduled.online.training" /> */}
            Catalogue de formations
          </div>
          <div className="d-flex justify-content-center flex-row ">
            {/* <div className="col-lg-11 col-md-11 col-sm-12 d-flex flex-wrap justify-content-center flex-row  ">
              <div
                className="col-lg-2 col-md-4 col-sm-10 d-flex flex-wrap flex-column m-2 justify-content-center align-items-center"
                style={{
                  backgroundColor: "#3F51B5",
                  borderRadius: 10,
                  height: "150px",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                }}
              >
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <IntlMessages id="online.training" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>150</h1>
              </div>

              <div
                className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column  justify-content-center align-items-center m-2"
                style={{
                  backgroundColor: "#3BBDD5",
                  borderRadius: 10,
                  height: "150px",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                }}
              >
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <IntlMessages id="online.training.this.month" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>25</h1>
              </div>

              <div
                className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center  align-items-center m-2"
                style={{
                  backgroundColor: "#F9972D",
                  borderRadius: 10,
                  height: "150px",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                }}
              >
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <IntlMessages id="registrations.number" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>7</h1>
              </div>

              <div
                className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center align-items-center m-2"
                style={{
                  backgroundColor: "#F15381",
                  borderRadius: 10,
                  height: "150px",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                }}
              >
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <IntlMessages id="registered.people.number" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>45</h1>
              </div>
            </div> */}
          </div>

          <div className="p-2">
            <OnlineTrainingList openAddTraining={this.openAddTraining} />
          </div>
          {this.state.isOpen && (
            <AddOnlineTraining
              values={this.state}
              handleCancel={this.handleCancel}
              handleChange={this.handleChange.bind(this)}
              addNewChoice={this.addNewChoice.bind(this)}
              deleteChoice={this.deleteChoice.bind(this)}
              handleChangeModules={this.handleChangeModules.bind(this)}
              setDate={this.setDate.bind(this)}
              handleChangeLevelsModules={this.handleChangeLevelsModules.bind(
                this
              )}
              handleChangePrograms={this.handleChangePrograms.bind(this)}
              users={this.props.users}
              handleSubmit={this.handleSubmit.bind(this)}
              openAddTraining={this.openAddTraining}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps)(OnlineTraining);
