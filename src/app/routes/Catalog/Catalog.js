import { sizeWidth } from "@material-ui/system";
import React, { Component } from "react";
import { connect } from "react-redux";
import CatalogList from "./CatalogList";

/* eslint eqeqeq: "off" */
export class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div className="app-wrapper">
        <div className="d-flex flex-column">
          <div className="p-2" style={{color:"#4C25B7", fontSize:"26px"}}>Catalogue des informations</div>
          <div className="p-2">
           <CatalogList />
          </div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Catalog);
