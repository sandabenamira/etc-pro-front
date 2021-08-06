import React, {Component} from 'react';
import {connect} from 'react-redux';
import OnlineTrainingList from "./OnlineTrainingList";




/* eslint eqeqeq: "off" */
export class OnlineTraining extends Component {
  constructor(props) {
  super(props);
  this.state = {};
}
render() {
/* eslint eqeqeq: "off" */
return (
  <div className="app-wrapper">
    <div className="d-flex flex-column">
      <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px", marginLeft:"15px" }}>
        E-Learning  -  Formations programmées en ligne 
      </div>
      <div className="container-fluid text-center text-md-left">
      <div className="d-flex flex-sm-wrap justify-content-around justify-content-center">
      <div className="row">
      <div className="col-lg-12 col-md-6 col-sm-3 d-flex justify-content-center flex-row " style={{}}>

        <div className="col-lg-3 col-md-6 col-sm-12 d-flex flex-column m-2 justify-content-center align-items-center" style={{ backgroundColor: "#3F51B5", borderRadius: 15, height: "150px", }}>
          <h1 style={{ color: "white"}}>Formations en ligne</h1>
          <h1 style={{ color: "white", fontWeight: "bold" }}>150</h1>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center m-2" style={{ backgroundColor: "#3BBDD5", borderRadius: 15 }}>
          <h1 style={{ color: "white"}}>Formations en ligne <br /> ce mois</h1>
          <h1 style={{ color: "white", fontWeight: "bold" }}>25</h1>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center m-2" style={{ backgroundColor: "#F9972D", borderRadius: 15 }}>
          <h1 style={{ color: "white"}}>Nb d'inscriptions</h1>
          <h1 style={{ color: "white", fontWeight: "bold" }}>7</h1>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center m-2" style={{ backgroundColor: "#F15381", borderRadius: 15 }}>
          <h1 style={{ color: "white"}}>Nb de personnes <br />  inscrites</h1>
          <h1 style={{ color: "white", fontWeight: "bold" }}>45</h1>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
    <div className=" d-flex justify-content-end align-items-center flex-row mt-4">
      <div className="p-2">
        <OnlineTrainingList openAddTraining={this.openAddTraining} />
      </div>
    </div>

  </div>

);
}
}
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(OnlineTraining);