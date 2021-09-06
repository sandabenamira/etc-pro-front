import React, { Component } from "react";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";
import ListMoocsItem from "./ListMoocsItem";
import IntlMessages from "../../../../../util/IntlMessages";
import MoocsDetails from "./MoocsDetails";

export default class ListMoocs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDetails: false,
    };
  }
  handleOpenDetails = () => {
    this.setState({
      openDetails: !this.state.openDetails,
    });
  };
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row flex-wrap">
          <div className="p-2 col-md-2 col-sm-1 col-lg-1"></div>

          <div className="p-2 ml-auto ">
            <div className="d-flex justify-content-start align-items-center">
              <Fab
                size="small"
                aria-label="Add"
                onClick={this.props.openaddMoocs}
              >
                <AddIcon style={{ color: orange[500] }} />
              </Fab>
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontSize: "25px", color: "orange" }}>
                <IntlMessages id="add.moocs" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 price-tables row pt-default d-flex justify-content-start ">
          {[1, 2, 3, 4, 5].map((element, index) => (
            <div className="col-md-6 col-lg-3 col-sm-6 " key={index}>
              <ListMoocsItem
                key={index}
                handleOpenDetails={this.handleOpenDetails}
              />
            </div>
          ))}
        </div>
        {this.state.openDetails === true ? (
          <MoocsDetails
            values={this.state}
            handleOpenDetails={this.handleOpenDetails}
          />
        ) : null}
      </div>
    );
  }
}
