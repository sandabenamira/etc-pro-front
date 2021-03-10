import React, { Component } from 'react';

import { connect } from 'react-redux';

import Loader from 'react-loader-spinner';

class LoaderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
     return (
      <div className="modal-backdrop d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <Loader type="Circles" color="#3F51B5" height={100} width={100} visible={this.props.moocsLoading===true ? true : false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moocsLoading: state.MoocsReducer.moocsLoading,
  };
};
export default connect(mapStateToProps)(LoaderModal);
