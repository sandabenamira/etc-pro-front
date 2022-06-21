import React, { Component } from "react";
  import { orange } from "@material-ui/core/colors";
import TrainingMaterialsItem from "./TrainingMaterialsItem";
import IntlMessages from "../../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

export default class TraiingMaterialsList extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row flex-wrap">
          <div className="p-2 col-md-2 col-sm-1 col-lg-1">

          </div>
          <div className="p-2 ml-auto ">
            <div className="d-flex justify-content-start align-items-center">
              {/* <Fab
                size="small"
             
                aria-label="Add"
                onClick={this.props.openAddTraining}
              >
                {}
                <AddIcon style={{ color: orange[500] }} />
              </Fab> */}

              <Button
                    style={{ width: "400px", borderRadius: "50px" }}
                    onClick={this.props.openAddTraining}
                    >
                    <AddCircleOutlineOutlinedIcon
                      style={{ color: orange[500], marginRight: "20px" }}
                    />
                    <div
                      style={{
                        fontSize: "25px",
                        color: "orange",
                        marginRight: "40px",
                        textTransform: "none",
                      }}
                    >
                <IntlMessages id="training.materials.add.material" />
                    </div>
                  </Button>
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontSize: "25px", color: "orange" }}>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 price-tables row pt-default d-flex justify-content-start ">
          {[1, 2, 3, 4].map((element, index) => (
            <div className="col-md-6 col-lg-3 col-sm-6 " key={index}>
              <TrainingMaterialsItem key={index} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
