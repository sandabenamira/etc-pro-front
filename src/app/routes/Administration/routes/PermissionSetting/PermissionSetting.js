import React, { Component } from 'react';
import { connect } from 'react-redux';

 /* eslint eqeqeq: "off" */
export class PermissionSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    
  }
  
  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: '5%',
          marginRight: '10%',
        }}
      >
        <h2>module Permission</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(PermissionSetting);
