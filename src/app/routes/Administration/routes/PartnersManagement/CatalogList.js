import React, { Component } from "react";
import CatalogItem from "../../../Catalog/CatalogItem";



export default class CatalogList extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="price-tables row pt-default d-flex justify-content-start " style={{padding:0}}>
          {[1, 2].map((element, index) => (
            <div className="col-md-6 col-lg-6 col-sm-6 " key={index}>
              <CatalogItem key={index} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
