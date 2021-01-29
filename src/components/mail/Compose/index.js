import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import baseUrl from '../../../config/config';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import * as moment from 'moment';
import IntlMessages from '../../../util/IntlMessages';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';

class ComposeMail extends React.Component {
  constructor() {
    super();
    this.state = {
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      receiver_id: '',
      receiverID: 0,
      message: '',
      professorsList: [],
      professorsListNew: [],
      date_hour_mail: '2019-07-18T13:07:42.438Z',
      sender_id: '',
      usersData: [],
      fileList: null,
      inputText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop = e => {
    let file = e.target.files[0];
    this.setState({
      fileList: file,
      inputText: file.name
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  componentDidMount() {
    this.setState({ subject: this.props.subjectReply });
    this.setState({ receiver_id: this.props.emailReplay });
    axios
      .get(
        `${baseUrl.baseUrl}/profiles/fetchMailReceivers/` +
          localStorage.profileId +
          `?access_token=${localStorage.token}`
      )
      .then(res => {
        const usersData = res.data.receiverData[0];
        this.setState({ usersData });
        this.setState({ sender_id: localStorage.profileId });
      });
  }

  handleChange = e => {
    if (e.target.value != 'noMail') {
      const found = this.state.usersData.find(
        element => element.email === e.target.value
      );
      this.setState({ receiver_id: e.target.value });
      this.setState({ receiverID: found.id });
    }
  };
  render() {
    const { onMailSend, onClose, user } = this.props;
    const {
      receiver_id,
      receiverID,
      subject,
      message,
      date_hour_mail,
      sender_id,
      fileList
    } = this.state;

    return (
      <Modal
        className="modal-box modal-box-mail"
        toggle={onClose}
        isOpen={this.props.open}
        style={{ zIndex: 2600 }}
      >
        <ModalHeader className="modal-box-header bg-primary text-white">
          {<IntlMessages id="add.new.message" />}
          <IconButton className="text-white" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <div className="modal-box-content d-flex flex-column">
          <div>
            <div>
              <TextField
                required
                id="receiver_id"
                label={<IntlMessages id="reciver.message" />}
                onChange={this.handleChange}
                select
                value={receiver_id}
                SelectProps={{}}
                defaultValue={'receiver_id'}
                margin="normal"
                fullWidth
              >
                {this.state.usersData.map((userInfo, index) => (
                  <MenuItem key={index} value={userInfo.email}>
                    {userInfo.classeName} {userInfo.name} {userInfo.surname}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <TextField
            required
            id="subject"
            label={<IntlMessages id="subject.message" />}
            onChange={event => this.setState({ subject: event.target.value })}
            value={subject}
            margin="normal"
          />
          <TextField
            id="required"
            label={<IntlMessages id="message" />}
            onChange={event =>
              this.setState({
                message: event.target.value,
                date_hour_mail: moment()
              })
            }
            value={message}
            multiline
            rowsMax="4"
            margin="normal"
          />
        </div>

        <div className="modal-box-footer">
          <InputLabel htmlFor="name-multiple">
            {<IntlMessages id="components.establishments.formadd.task" />}
          </InputLabel>{' '}
          <br />
          <label
            htmlFor="files"
            className="btn"
            style={{
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: '#4B58B9',
              borderRadius: '4rem'
            }}
          >
            <strong>{<IntlMessages id="Choisir un fichier" />}</strong>
          </label>{' '}
          <label htmlFor="files" className="btn">
            {this.state.inputText}
          </label>
          <input
            id="files"
            type="file"
            style={{ visibility: 'hidden' }}
            onChange={e => this.onDrop(e)}
            accept="application/pdf"
          />
          <br />
          <br />
          <Button
            disabled={!(receiver_id !== '' && subject !== '')}
            variant="contained"
            color="primary"
            onClick={() => {
              onClose();
              onMailSend({
                id: '15453a06c08fb021776',
                from: {
                  name: user.name,
                  avatar: user.avatar,
                  email: user.email
                },
                sender_id: sender_id,
                receiver_id: receiverID,
                subject: subject,
                message: message,
                date_hour_mail: date_hour_mail,
                read: false,
                starred: false,
                important: false,
                hasAttachments: false,
                folder: 1,
                selected: false,
                labels: [],
                establishmentId: this.props.userProfile.establishment_id,
                file: fileList
              });
              this.setState({
                to: '',
                cc: '',
                bcc: '',
                subject: '',
                receiver_id: '',
                message: '',
                professorsList: [],
                professorsListNew: [],
                date_hour_mail: '2019-07-18T13:07:42.438Z',
                sender_id: sender_id,
                fileList: null
              });
            }}
          >
            <i className="zmdi zmdi-mail-send mr-2" />
            {<IntlMessages id="button.send.message" />}
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.auth.userProfile
  };
};

export default connect(mapStateToProps)(ComposeMail);
