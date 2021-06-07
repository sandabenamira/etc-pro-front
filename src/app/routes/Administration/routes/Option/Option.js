import React from 'react';
import {connect} from 'react-redux';

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <h2>module Options</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Option);
