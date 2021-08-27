import React, { Component } from "react";
import { connect } from "react-redux";
import ListMoocs from "./ListMoocs";
import AddMoocs from "./AddMoocs";

import IntlMessages from "../../../../../util/IntlMessages";
export class Moocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,

      levelsModules: [
        {
          id: 0,
          levelName: "",
          moduleName: "",
        },
      ],
    };
    this.openaddMoocs = this.openaddMoocs.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  openaddMoocs() {
    this.setState({ isOpen: true });
  }
  handleCancel() {
    this.setState({
      isOpen: false,

      sessions: [{}],
      modules: [
        {
          title: "",
          value: 1,
        },
      ],
      levelsModules: [
        {
          levelName: "",
          moduleName: "",
        },
      ],
      programs: [
        {
          title: "",
          description: "",
        },
      ],
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="d-flex flex-column">
          <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px" }}>
            <IntlMessages id="e-learning-moocs" />
          </div>
          <br />
          <br />
          <div className="d-flex justify-content-center flex-row ">
            <div className="col-lg-11 col-md-11 col-sm-12 d-flex flex-wrap justify-content-center flex-row bd-highlight ">
              <div
                className="col-lg-2 col-md-4 col-sm-10 d-flex flex-wrap flex-column m-2 justify-content-center align-items-center"
                style={{
                  backgroundColor: "#3F51B5",
                  borderRadius: 5,
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
                  <IntlMessages id="moocs.online" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>200</h1>
              </div>

              <div
                className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column  justify-content-center align-items-center m-2"
                style={{
                  backgroundColor: "#3BBDD5",
                  borderRadius: 5,
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
                  <IntlMessages id="Moocs.of.the.month" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>25</h1>
              </div>

              <div
                className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center  align-items-center m-2"
                style={{
                  backgroundColor: "#F9972D",
                  borderRadius: 5,
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
                  <IntlMessages id="Number.views" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>5200</h1>
              </div>

              <div
                className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center align-items-center m-2"
                style={{
                  backgroundColor: "#F15381",
                  borderRadius: 5,
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
                  <IntlMessages id="Number.of.reactions" />
                </h1>
                <h1 style={{ color: "white", fontWeight: "bold" }}>65</h1>
              </div>
            </div>
          </div>

          <div className="p-2">
            <ListMoocs openaddMoocs={this.openaddMoocs} />
          </div>
          {this.state.isOpen && (
            <AddMoocs values={this.state} handleCancel={this.handleCancel} />
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

export default connect(mapStateToProps)(Moocs);
