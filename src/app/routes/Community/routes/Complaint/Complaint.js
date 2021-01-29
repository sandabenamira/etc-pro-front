import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddComplaint from './AddComplaint';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from '../../../../../util/IntlMessages';
import Fab from '@material-ui/core/Fab';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import CardBox from '../../../../../components/CardBox/index';
import AddIcon from '@material-ui/icons/Add';

class Complaint extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      type: '',
      isOpenAddModal: false,
      subject: '',
      message: '',
      complaintFile: null,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  openAddModal() {
    this.setState({ isOpenAddModal: !this.state.isOpenAddModal });
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
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
                    // value={this.state.type ? this.state.type : ''}
                    // onChange={this.handleChange('type')}
                    label={<IntlMessages id="choisir" />}
                    margin="normal"
                    fullWidth
                  >
                    {/* <MenuItem value="Reçues">
                      <IntlMessages id="Reclam.received" />
                    </MenuItem>
                    <MenuItem value="Envoyées">
                      <IntlMessages id="Reclam.sent" />
                    </MenuItem> */}
                  </TextField>
                </div>
              </div>
              <div className="col-md-2 text-right">
                <Fab size="small" color="primary" aria-label="Add" onClick={this.openAddModal}>
                  <AddIcon />
                </Fab>
              </div>
            </div>
          </CardBox>
          <div className="col-md-12 text-right ">
            <AddComplaint
              open={this.state.isOpenAddModal}
              subjectReply={''}
              emailReplay={''}
              onClose={this.openAddModal}
              handleChange={this.handleChange}
              values={this.state}
              // onMailSend={this.onReclamSend.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};
export default connect(mapStateToProps)(Complaint);
