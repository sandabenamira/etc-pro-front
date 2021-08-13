import React, { Component } from "react";
import { connect } from "react-redux";
import RaportingFormationList from "./RaportingFormationList";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VerticalAlignBottomOutlinedIcon from "@material-ui/icons/VerticalAlignBottomOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";



export class RaportingFormation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {


    return (
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
          <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
            <div className="p2">
              <h1
                style={{
                  color: "#484cb4",
                  marginBottom: "5%",
                  fontSize: "26px",
                }}
              >
                Reporting financier
              </h1>
            </div>
            {/* -- ICONS --*/}
            <div className="ml-auto p-2 d-flex flex-row">
              <VerticalAlignBottomOutlinedIcon
                style={{
                  color: "#484cb4",
                  marginRight: "4%",
                  cursor: "pointer",
                }}
              ></VerticalAlignBottomOutlinedIcon>
              <PrintOutlinedIcon
                style={{
                  color: "#484cb4",
                  marginRight: "4%",
                  cursor: "pointer",
                }}
              ></PrintOutlinedIcon>
              <NearMeOutlinedIcon
                style={{ color: "#484cb4", cursor: "pointer" }}
              ></NearMeOutlinedIcon>
            </div>
          </div>
          <div className="d-flex flex-column col-lg-12 col-md-12 col-sm-12 mt-2">
            {/* -- CARDS (KPI) --*/}
            <div className="d-flex justify-content-center flex-row ">
              <div className="col-lg-11 col-md-11 col-sm-12 d-flex flex-wrap justify-content-center flex-row  ">
                <div
                  className="col-lg-2 col-md-4 col-sm-10 d-flex flex-wrap flex-column m-2 justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#3F51B5",
                    borderRadius: 15,
                    height: "120px",
                  }}
                >
                  <h2 style={{ color: "white" }}>Chiffre d'affiares</h2>
                  <h2 style={{ color: "white" }}>7 000 000</h2>
                </div>

                <div
                  className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column  justify-content-center align-items-center m-2"
                  style={{
                    backgroundColor: "#3BBDD5",
                    borderRadius: 15,
                    height: "120px",
                  }}
                >
                  <h2 style={{ color: "white" }}>Revenu Annuel</h2>
                  <h2 style={{ color: "white" }}>100 000</h2>
                </div>

                <div
                  className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center  align-items-center m-2"
                  style={{
                    backgroundColor: "#F9972D",
                    borderRadius: 15,
                    height: "120px",
                  }}
                >
                  <h2 style={{ color: "white" }}>Nombre de Participants</h2>
                  <h2 style={{ color: "white" }}>520</h2>
                </div>

                <div
                  className="col-lg-2 col-md-4  col-sm-10 d-flex flex-wrap flex-column justify-content-center align-items-center m-2"
                  style={{
                    backgroundColor: "#F15381",
                    borderRadius: 15,
                    height: "120px",
                  }}
                >
                  <h2 style={{ color: "white" }}>Dépences par An</h2>
                  <h2 style={{ color: "white" }}>6 500 000</h2>
                </div>
              </div>
            </div>
            {/* -- Bouttons "Filtrer par"/ "Rentabilité" --*/}
            <div className="d-flex justify-content-center flex-row mt-4 ">
              <div className="col-lg-11 col-md-11 col-sm-12 d-flex flex-wrap  flex-row  ">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "15px",
                    fontSize: "15px",
                    fontFamily: "Roboto",
                  }}
                >
                  Filtrer par
                  <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "15px",
                    fontSize: "15px",
                    marginLeft: "7%",
                    fontFamily: "Roboto",
                  }}
                >
                  Rentabilité
                  <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
                </Button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
            <RaportingFormationList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(RaportingFormation);
