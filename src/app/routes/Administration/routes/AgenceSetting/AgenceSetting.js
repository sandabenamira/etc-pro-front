import React from 'react';
import { connect } from 'react-redux';
import AgenceList from './AgenceList';
import AddAgence from './AddAgence';

import IntlMessages from "../../../../../util/IntlMessages";

export class AgenceSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenMaterial: false,
    };
    this.openAddAgence = this.openAddAgence.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  openAddAgence() {
    this.setState({ isOpen: true });
  }

  handleCancel() {
    this.setState({
      isOpen: false,
      isOpenMaterial: false,
    });
  }

  render() {
    return (
      <div
        className="app-wrapper"
        style={{

        }}
      >
        <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px", marginBottom: "1.5rem" }}>
          <IntlMessages id="agency.management" />
        </div>
        <div className="p-2">
          <AgenceList openAddAgence={this.openAddAgence} />
        </div>
        {this.state.isOpen && (
          <AddAgence
            values={this.state}
            handleCancel={this.handleCancel}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(AgenceSetting);