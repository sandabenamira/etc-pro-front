import React from 'react';
import IntlMessages from '../../../util/IntlMessages';

class HealthMonitoring extends React.Component {

  render() {
    return (
      <div className="app-wrapper">
      <br/>
        <div className="d-flex justify-content-center">
          <h1><IntlMessages id="sidebar.components.health-monitiring"/></h1>
        </div>

      </div>
    );
  }
}

export default HealthMonitoring;