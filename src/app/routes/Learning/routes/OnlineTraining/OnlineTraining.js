import React, {Component} from 'react';
import {connect} from 'react-redux';

/* eslint eqeqeq: "off" */
export class OnlineTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div className="app-wrapper"
        
        style={{
          marginLeft: '5%',
          marginRight: '10%',
        }}
      >
        <div className="d-flex flex-column">
          <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px" }}>
            E-Learning  -  Formations programmées en ligne 
          </div>
        
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(OnlineTraining);
