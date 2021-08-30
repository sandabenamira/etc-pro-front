import React from 'react';
import { connect } from 'react-redux';
import AgenceList from './AgenceList';
import AddAgence from './AddAgence';
import ArchiveIcon from '@material-ui/icons/Archive';
import ArchiveAgence from './ArchiveAgence';
import IconButton from '@material-ui/core/IconButton';
import IntlMessages from "../../../../../util/IntlMessages";

export class AgenceSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenMaterial: false,
      archived: false
    };
    this.openAddAgence = this.openAddAgence.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.OpenArchive = this.OpenArchive.bind(this)
  }

  OpenArchive() {
    this.setState({ archived: !this.state.archived });
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
    if (this.state.archived !== true) {
      return (
        <div className="app-wrapper"
          style={{

          }}
        >
          <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px", marginBottom: "1.5rem" }}>
            <IntlMessages id="gestion.agence.agency.management" />
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
          <div className="d-flex flex-row-reverse p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
            <div
              className="d-flex justify-content-start align-items-center "
              style={{
                color: "#616A6B",
                textAlign: "center",
                
              }}
            >
              <IconButton
                aria-label="delete"
                style={{
                   color: "#616A6B"
                }}
                onClick={this.OpenArchive}
              >
                <ArchiveIcon onClick={this.props.OpenArchive} backgroundColor="white" />
              </IconButton>
              <div style={{ fontSize: "19px", color: "#616A6B" }}>
                <IntlMessages id="gestion.agence.archive" /> (2)
              </div>
            </div>
          </div>
        </div>

      );
    }
    else {
      return <ArchiveAgence openArchive={this.openArchive} />
    }
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(AgenceSetting);