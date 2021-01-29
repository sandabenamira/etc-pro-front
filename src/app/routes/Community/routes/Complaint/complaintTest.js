import React, { Component } from 'react';
import ComplaintTable from './ComplaintTable';
import { connect } from 'react-redux';
import Reclamer from './reclamer';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../util/IntlMessages';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { UncontrolledAlert } from 'reactstrap';
import ContainerHeader from '../../../components/ContainerHeader/index';
import { roleIdAdmin } from '../../../config/config';
import CardBox from '../../../components/CardBox/index';

import {
  handleReclamRequestClose,
  onComposeReclam,
  onReclamSend,
  getReclams_Recues,
  getReclams_Envoyées,
  onChangeStatusClose,
} from '../../../actions/complaintAction';

class Complaint extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      type: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  _isMounted = false;
  componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.props.getReclams_Recues();
      this.props.getReclams_Envoyées();
      if (localStorage.roles_id == roleIdAdmin) {
        this.setState({ type: 'Reçues' });
      } else {
        this.setState({ type: 'Envoyées' });
      }
    }
  }

  handleChange = (name) => (event) => {
    if (this._isMounted) {
      setTimeout(() => {
        this.setState({ type: event.target.value });
      }, 500);
    }
  };
  handleRequestClose = () => {
    this.props.handleReclamRequestClose();
  };

  onReclamSend(data) {
    this.props.onReclamSend(data);
  }

  render() {
    const {
      locale,
      alertMessageAR,
      showMessage,
      composeReclam,
      folderReclamRecues,
      alertMessage,
      folderReclamEnvoyées,
      alertMessageEN,
    } = this.props;

    return (
      <div>
        <div className="app-wrapper">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="Reclam.Reclambox" />}
          />
          <CardBox styleName="col-lg-12 text-primary">
            <div className="d-flex justify-content-between  align-items-center col-md-12 col-lg-12">
              <div className="col-md-2 ">
                <div className="form-group">
                  <TextField
                    select
                    value={this.state.type ? this.state.type : ''}
                    onChange={this.handleChange('type')}
                    label={<IntlMessages id="choisir" />}
                    margin="normal"
                    fullWidth
                  >
                    <MenuItem value="Reçues">
                      <IntlMessages id="Reclam.received" />
                    </MenuItem>
                    <MenuItem value="Envoyées">
                      <IntlMessages id="Reclam.sent" />
                    </MenuItem>
                  </TextField>
                </div>
              </div>
              <div className="col-md-2 text-right">
                <Fab
                  size="small"
                  color="primary"
                  aria-label="Add"
                  onClick={() => {
                    this.props.onComposeReclam();
                  }}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
          </CardBox>
          {showMessage ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {locale.languageId === 'tunisia'
                  ? alertMessageAR
                  : locale.languageId === 'english'
                  ? alertMessageEN
                  : alertMessage}
              </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          <div className="col-md-12 text-right ">
            {this.state.type == 'Reçues' ? (
              folderReclamRecues.length == 0 ? (
                <h1 align="center">
                  <IntlMessages id="complaint.no.réclamation" />
                </h1>
              ) : (
                <ComplaintTable
                  Recues={folderReclamRecues}
                  Envoyées={folderReclamEnvoyées}
                  type={this.state.type}
                />
              )
            ) : folderReclamEnvoyées.length == 0 ? (
              <h1 align="center">
                <IntlMessages id="complaint.no.réclamation" />
              </h1>
            ) : (
              <ComplaintTable
                Recues={folderReclamRecues}
                Envoyées={folderReclamEnvoyées}
                type={this.state.type}
              />
            )}
            <Reclamer
              open={composeReclam}
              subjectReply={''}
              emailReplay={''}
              onClose={this.handleRequestClose.bind(this)}
              onMailSend={this.onReclamSend.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ complaint, settings }) => {
  //const { width } = settings;
  const {
    composeReclam,
    folderReclamEnvoyées,
    folderReclamRecues,
    showMessage,
    alertMessage,
    alertMessageAR,
    alertMessageEN,
  } = complaint;
  const { locale } = settings;
  return {
    locale,
    showMessage,
    alertMessage,
    alertMessageAR,
    composeReclam,
    folderReclamEnvoyées,
    folderReclamRecues,
    alertMessageEN,
  };
};

export default connect(mapStateToProps, {
  handleReclamRequestClose,
  onComposeReclam,
  onReclamSend,
  getReclams_Recues,
  getReclams_Envoyées,
  onChangeStatusClose,
})(Complaint);
