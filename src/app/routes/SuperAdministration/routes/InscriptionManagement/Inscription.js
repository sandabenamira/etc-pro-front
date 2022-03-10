import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      archived: false,
    };
  }

  render() {
    return <>Inscription</>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Inscription);
