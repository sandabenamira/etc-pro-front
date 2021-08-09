import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListMoocs from "./ListMoocs";
//import AddIcon from "@material-ui/icons/Add";
//import Fab from "@material-ui/core/Fab";

//import { orange } from "@material-ui/core/colors";


/* eslint eqeqeq: "off" */
export class Moocs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div className="app-wrapper">
        <div className="d-flex flex-column">
          <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px" }}>
            E-Learning  - Moocs 
          </div>
          <div className="col-lg-10 col-lg-10 col-sm-12 d-flex justify-content-between flex-row  ">

<div className="col-lg-3 col-lg-3 col-sm-12 d-flex flex-column m-2 justify-content-center align-items-center" style={{ backgroundColor: "#3F51B5", borderRadius: 15, height: "150px" }}>
  <h1 style={{ color: "white", fontWeight: "bold" }}>Moocs en ligne</h1>
  <h1 style={{ color: "white", fontWeight: "bold" }}>200</h1>
</div>

<div className="col-lg-3 col-lg-3 col-sm-12 d-flex flex-column  justify-content-center align-items-center m-2" style={{ backgroundColor: "#3BBDD5", borderRadius: 15 }}>
  <h1 style={{ color: "white", fontWeight: "bold" }}>Moocs du mois</h1>
  <h1 style={{ color: "white", fontWeight: "bold" }}>25</h1>
</div>

<div className="col-lg-3 col-lg-3 col-sm-12 d-flex flex-column justify-content-center  align-items-center m-2" style={{ backgroundColor: "#F9972D", borderRadius: 15 }}>
  <h1 style={{ color: "white", fontWeight: "bold" }}>Nombre de vue</h1>
  <h1 style={{ color: "white", fontWeight: "bold" }}>5200</h1>
</div>

<div className="col-lg-3 col-lg-3 col-sm-12 d-flex flex-column justify-content-center align-items-center m-2" style={{ backgroundColor: "#F15381", borderRadius: 15 }}>
  <h1 style={{ color: "white", fontWeight: "bold" }}>Nombre de réaction</h1>
  <h1 style={{ color: "white", fontWeight: "bold" }}>65</h1>
</div>


</div>

</div>




<div className=" d-flex justify-content-end align-items-center flex-row mt-4">



          <div className="p-2">
            <ListMoocs openAddTraining={this.openAddTraining} />
          </div>
          
</div>

</div>

     
      

    );
  }
}
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Moocs);