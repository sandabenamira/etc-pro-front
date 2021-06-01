import React from 'react';
import {connect} from 'react-redux';
class AgenceSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
        <h2>module Agence</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(AgenceSetting);
