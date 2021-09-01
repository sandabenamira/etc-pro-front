import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from '../../../../../util/IntlMessages';
import PermissionList from './PermissionList'



export class PermissionSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    
  }
  
  render() {
   
    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: '5%',
          marginRight: '10%',
        }}
      >
        <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
              <div className="p-2">
                <h1
                  style={{
                    color: "#4D5B95",
                    marginBottom: "5%",
                    fontSize: "30px",
                    
                  }}
                >
              <IntlMessages id="sidebar.components.permissionSetting" />
                </h1>
              </div>
            </div>
            <div className="d-flex flex-row p-2 col-lg-11 col-md-12 col-sm-12 ">
              <PermissionList  />
            </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(PermissionSetting);
