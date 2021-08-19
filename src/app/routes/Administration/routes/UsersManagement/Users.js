import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

import UsersList from "./UsersList";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { orange } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import IntlMessages from "../../../../../util/IntlMessages";
import {addTraining} from "../../../../../store/actions/Training"


export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      nbrDays: null,
      price: null,
      certificate: false,
      trainingFormat: "",
      userId: null,
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
    };
    this.openAddTraining = this.openAddTraining.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  openAddTraining() {
    this.setState({ isOpen: true });
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
      nbrDays: null,
      price: null,
      certificate: false,
      trainingFormat: "",
      userId: null,
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
  }

  handleChange = (name) => (event) => {
    console.log(name, event.target.value );
    this.setState({ [name]: event.target.value });
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
          isAdded: true,
        });
        return element;
      });
      programs.push({
        id: index,
        title: "",
        description: "",
        isAdded: false,
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
    console.log("handleSubmit");
    let data = {
      theme: this.state.theme,
      title: this.state.titleTraining,
      certificat: this.state.certificate,
      format: this.state.trainingFormat,
      description: this.state.descriptionTraining,
      link: this.state.linkTraining,
      former: this.state.userId,
      descriptionFormer: this.state.descriptionFormer,
      methodology: this.state.methodology,
      location: this.state.placeTraining,
      objective: this.state.goal,
      prerequiste: this.state.Prerequisites,
      numberDay: this.state.nbrDays,
      modules: this.state.modules,
      levels: [],
      program: this.state.levelsModules,
      price: this.state.price,
      sessions: this.state.sessions,
      fk_id_company: 1,
      creationDate: new Date(),
      fk_id_creator: 1,
    };
    console.log("data,", data);
    this.props.dispatch(addTraining(data))
    this.handleCancel()
  }

  render() {
    

    return (
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
          <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
            <div className="p-2">
              <h1
                style={{
                  color: "#484cb4",
                  marginBottom: "5%",
                  fontSize: "26px",
                }}
              >
                Gestion des Utilisateurs
              </h1>
            </div>
            
          </div>
          <div className="d-flex justify-content-around">
          <div className="p-2">
          <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "40px",
                    fontSize: "15px", fontFamily:"sans-serif",
                    fontWeight: "bold",width:"200px",height:"40px"

                  }}
                  
                >
                  
                  Tous les Roles

                  <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
                </Button>
                




          </div>


         
  <div className="p-2 justify-content-reverse  " >
  
  <div className="search-box  ">
  <div className="package-footer " >
  
          <IconButton  style={{color:"blue",}} >
          
        <SearchRoundedIcon  style={{color:"blue",borderColor: "coral"}}/>
         Recherche...
         
        </IconButton>
       
        
        
     </div>   
     
    
    </div>
   
  
             
                
             
              
            
            
  
  
  
  
  
  
  </div>




  <div className="p-2">
  <div className="d-flex ">
              
  <div className="p-2 ml-auto ">
            <div className="d-flex justify-content-start align-items-center">
              <Fab
                size="small"
                aria-label="Add"
                onClick={this.props.openAddTraining}
              >
                <AddIcon style={{ color: orange[500] }} />
              </Fab>
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontSize: "25px", color: "orange" }}>
                <IntlMessages id="add.formation" />
              </div>
            </div>
          </div>
            </div>



  </div>





          </div>
          <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
            <UsersList />
          </div>
          
          </div>
          <div className="d-flex flex-row-reverse p-2 col-lg-10 col-md-12 col-sm-12 mt-4">
          <div className="d-flex "style=
          {{color: "#A4A4A4", fontWeight: "bold", textAlign:"center",fontSize:"20px"}}>
            <IconButton aria-label="delete"  style={{color:"#A4A4A4",backgroundColor:"#FFFFFF",width:"40px",height:"40px"}}>
          <DeleteOutlineRoundedIcon backgroundColor="white"/>
        </IconButton>
                <div className="p-2">Archive (5)</div>
                </div>
              </div>
          </div>
        
     
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(User);
