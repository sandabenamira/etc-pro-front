import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import baseUrl from '../../../../../config/config';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import * as moment from 'moment';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';

class AddComplaint extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      receiver_id: '',
      receiverID: 0,
      message: '',
      professorsList: [],
      professorsListNew: [],
      date_hour_mail: '2019-07-18T13:07:42.438Z',
      sender_id: '',
      usersData: [],
      inputText: '',
      Reclam_File: null,
      subject_Specifique: '',
    };

    this.onDrop = this.onDrop.bind(this);
  }
  _isMounted = false;

  onDrop = (e) => {
    let file = e.target.files[0];
    this.setState({ Reclam_File: file, inputText: file.name });
  };
  render() {
    const typesSubjects = ['transport', 'cantine', 'maltraitance', 'niveau educatif', 'autre'];
    const { onClose, values, handleChange } = this.props;
    console.log(values, 'valuuuues');
    const {
      receiver_id,
      receiverID,
      subject,
      message,
      sender_id,
      date_hour_mail,
      Reclam_File,
      subject_Specifique,
    } = this.state;

    if (this.props.receiverID !== undefined && this.state.usersData.length > 0) {
      var nameReciver = this.state.usersData.find((element) => element.id == this.props.receiverID);
    }

    return (
      <Modal
        className="modal-box modal-box-mail"
        toggle={onClose}
        isOpen={this.props.open}
        style={{ zIndex: 2600 }}
      >
        <ModalHeader className="modal-box-header bg-primary text-white">
          <IntlMessages id="Reclam.rédiger" />
          <IconButton className="text-white" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <div className="modal-box-content d-flex flex-column">
          <div>
            <Autocomplete
              name="receiver_id"
              id="receiver_id"
              disableClearable
              value={
                this.props.receiverID === undefined
                  ? this.state.usersData[
                      _.findIndex(this.state.usersData, {
                        id: receiverID,
                      })
                    ]
                  : this.state.usersData[
                      _.findIndex(this.state.usersData, {
                        id: this.props.receiverID,
                      })
                    ]
              }
              options={this.props.receiverID === undefined ? this.state.usersData : []}
              onChange={(event, newValue) => {
                this.setState({ receiverID: newValue.id });
              }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label={<IntlMessages id="reciver.message" />} />
              )}
            />
          </div>
          <br></br>
          <TextField
            required
            id="subject"
            label={<IntlMessages id="subject.message" />}
            onChange={handleChange('subject')}
            select
            value={values.subject}
          >
            {this.props.subjectReply === '' ? (
              typesSubjects.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={subject}>{subject}</MenuItem>
            )}
          </TextField>
          {values.subject === 'autre' ? (
            <TextField
              id="subject"
              label={<IntlMessages id="subject.specifiq.subject" />}
               
              variant="outlined"
              value={subject_Specifique ? subject_Specifique : ''}
              multiline
              rowsMax="4"
              margin="normal"
            />
          ) : (
            ''
          )}

          <TextField
            id="required"
            label={<IntlMessages id="message" />}
            onChange={handleChange('message')}
            value={values.message}
            multiline
            rowsMax="4"
            margin="normal"
          />
        </div>

        <div className="modal-box-footer">
          <InputLabel htmlFor="name-multiple">vous pouvez ajouter des piéces jointes</InputLabel>
          <br />
          <label
            htmlFor="files"
            className="btn"
            style={{
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: '#4B58B9',
              borderRadius: '4rem',
            }}
          >
            <strong>{<IntlMessages id="Choisir un fichier" />}</strong>
          </label>
          <label>{this.state.inputText}</label>
          <input
            id="files"
            type="file"
            style={{ visibility: 'hidden' }}
            onChange={(e) => this.onDrop(e)}
            accept="application/pdf,image/*"
          />
          <br />
          <br />
          <div align="right" className="col-sm-12">
            <Button
              disabled={
                receiverID == '' ||
                subject == '' ||
                receiverID == '' ||
                (subject == 'autre' && subject_Specifique === '')
              }
              variant="contained"
              color="primary"
              onClick={() => {
                let reclamSubject = '';
                if (subject === 'autre' && subject_Specifique !== '') {
                  reclamSubject = subject_Specifique;
                } else {
                  reclamSubject = subject;
                }
                // onClose();
                // onMailSend({
                //   sender_id: sender_id,
                //   receiver_id: receiverID,
                //   subject: reclamSubject,
                //   message: message,
                //   date_hour_mail: date_hour_mail,
                //   read: false,
                //   starred: false,
                //   important: false,
                //   hasAttachments: false,
                //   folder: 1,
                //   selected: false,
                //   labels: [],
                //   establishmentId: this.props.userProfile.establishment_id,
                //   file: Reclam_File,
                // });
                this.setState({
                  subject: '',
                  receiver_id: '',
                  message: '',
                  professorsList: [],
                  professorsListNew: [],
                  date_hour_mail: '2019-07-18T13:07:42.438Z',
                  Reclam_File: null,

                  subject_Specifique: '',
                  receiverID: '',
                });
              }}
            >
              <i className="zmdi zmdi-mail-send mr-2" />
              {<IntlMessages id="button.send.message" />}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps)(AddComplaint);
