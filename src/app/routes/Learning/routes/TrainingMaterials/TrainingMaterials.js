import React, { Component } from "react";
import { connect } from "react-redux";
import TraiingMaterialsList from "./TraiingMaterialsList";
import AddTraining from "./AddTrainingMaterial";
import IntlMessages from "../../../../../util/IntlMessages";

export class SupportCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenMaterial: false,
     
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
      isOpenMaterial: false,
    });
  }
 
  render() {
    return (
      <div className="app-wrapper">
        <div className="d-flex flex-column">
          <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px" }}>
          <IntlMessages id="e-Learning" /> &nbsp; - &nbsp; <IntlMessages id="training.materials" />
          </div>

          <div className="d-flex justify-content-center flex-row ">
            <div className="col-lg-11 col-md-11 col-sm-12 d-flex flex-wrap justify-content-center flex-row  ">

              <div className="col-lg-2 col-md-4 col-sm-10 d-flex flex-wrap flex-column m-2 justify-content-center align-items-center" style={{ backgroundColor: "#3F51B5", borderRadius: 10, height: "150px", paddingRight: "1rem", paddingLeft: "1rem" }}>
                <h1 style={{ color: "white", fontWeight: "bold", textAlign: "center" }}><IntlMessages id="total.supports" /></h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>200</h1>
              </div>

              <div className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column  justify-content-center align-items-center m-2" style={{ backgroundColor: "#3BBDD5", borderRadius: 10, height: "150px", paddingRight: "1rem", paddingLeft: "1rem" }}>
                <h1 style={{ color: "white", fontWeight: "bold", textAlign: "center" }}><IntlMessages id="supports.of.the.month" /></h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>25</h1>
              </div>

              <div className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center  align-items-center m-2" style={{ backgroundColor: "#F9972D", borderRadius: 10, height: "150px", paddingRight: "1rem", paddingLeft: "1rem" }}>
                <h1 style={{ color: "white", fontWeight: "bold", textAlign: "center" }}><IntlMessages id="downloads.number" /></h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>5200</h1>
              </div>

              <div className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center align-items-center m-2" style={{ backgroundColor: "#F15381", borderRadius: 10, height: "150px", paddingRight: "1rem", paddingLeft: "1rem" }}>
                <h1 style={{ color: "white", fontWeight: "bold", textAlign: "center" }}><IntlMessages id="views.number" /></h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>65</h1>
              </div>
            </div>
          </div>
          <div className="p-2">
            <TraiingMaterialsList openAddTraining={this.openAddTraining} />
          </div>
          {this.state.isOpen && (
            <AddTraining
              values={this.state}
              handleCancel={this.handleCancel}
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

export default connect(mapStateToProps)(SupportCours);
