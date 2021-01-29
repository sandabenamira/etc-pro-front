import React, { Component } from "react";

import _ from "lodash";
import { connect } from "react-redux";

import VirtualClassListItems from "./VirtualClassListItems";

class ArchiveVirtualClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="col-md-12 col-lg-12  ">
        <div className="   price-tables row pt-default d-flex justify-content-start ">
          {!_.isEmpty(this.props.virtualClassesArchived) ? (
            this.props.virtualClassesArchived.map((element, index) => (
              <div className="col-md-6 col-lg-3 col-sm-6 ">
                <VirtualClassListItems
                  key={index}
                  index={index}
                  Item={element}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(ArchiveVirtualClass);
