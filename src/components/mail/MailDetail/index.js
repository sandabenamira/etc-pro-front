import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomScrollbars from '../../../util/CustomScrollbars';
import baseUrl from '../../../config/config';
import axios from 'axios';
import _ from 'lodash';
import ComposeMail from '../../mail/Compose/index';

var dateFormat = require('dateformat');
class MailDetail extends React.Component {
  state = {
    anchorEl: undefined,
    open: false,
    showDetail: false,
    senderInfo: '',
    receiverInfo: '',
    url: '',
    openCompose: false,
  };

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };
  onComposeMail = () => {
    this.setState({ openCompose: true, open: false });
  };
  handleRequestClose = () => {
    this.setState({ openCompose: false });
  };

  componentWillMount() {
    axios
      .get(
        `${baseUrl.baseUrl}/profiles/` +
          this.props.mail.sender_id +
          `/user?access_token=${localStorage.token}`
      )
      .then((res) => {
        const senderInfo = res.data;
        this.setState({ senderInfo });
      });
    axios
      .get(
        `${baseUrl.baseUrl}/profiles/` +
          this.props.mail.receiver_id +
          `/user?access_token=${localStorage.token}`
      )
      .then((res) => {
        const receiverInfo = res.data;
        this.setState({ receiverInfo });
      });
  }
  onMailSend(dataReply) {
    dataReply.sender_id = this.props.mail.receiver_id;
    dataReply.receiver_id = this.props.mail.sender_id;
    this.props.onMailSend(dataReply);
  }
  componentDidMount() {
    if (this.props.mail.files !== null) {
      var estblishmentId = localStorage.getItem('establishment_id');
      axios
        .get(
          `${baseUrl.baseUrl}/establishments/` +
            estblishmentId +
            `?access_token=${localStorage.token}`
        )
        .then((response) => {
          this.setState({
            establishmentName: response.data.name,
          });
          axios
            .get(
              `${baseUrl.baseUrl}/containers/checkFileExist/${response.data.name}?access_token=${localStorage.token}`
            )
            .then((response) => {
              let fileList = _.isEmpty(response.data.checkFile)
                ? null
                : response.data.checkFile.find(
                    (item) => item.name === this.props.mail.files
                  );
              const establishLogoUrl = _.isEmpty(fileList)
                ? null
                : `${baseUrl.baseUrl}/containers/` +
                  this.state.establishmentName +
                  '/download/' +
                  fileList.name +
                  `?access_token=${localStorage.token}`;
              if (establishLogoUrl !== null) {
                axios({
                  url: establishLogoUrl,
                  method: 'GET',
                  responseType: 'arraybuffer',
                })
                  .then((response) => {
                    var arr = response.data;
                    var data2 = new Uint8Array(arr);
                    var blob = new Blob([data2], { type: 'application/pdf' });
                    var url = URL.createObjectURL(blob);
                    this.setState({
                      url: url,
                    });
                  })
                  .catch((err) => {
                   });
              } else {
                this.setState({
                  url: null,
                });
              }
            });
        });
    }
  }

  render() {   /* eslint eqeqeq: "off" */
    const { mail, onStartSelect, onImportantSelect, width, user } = this.props;
    const { openCompose } = this.state;
    const options = ['Reply', 'Forward', 'Print'];
    return (
      <div className="module-detail mail-detail">
        <CustomScrollbars
          className="module-list-scroll scrollbar"
          style={{
            height:
              width >= 1200 ? 'calc(100vh - 315px)' : 'calc(100vh - 295px)',
          }}
        >
          {(() => {
            if (this.props.mail.files !== null) {
              return (
                <div className="mail-header">
                  <div className="mail-header-content col pl-0">
                    <div className="subject">{mail.subject}</div>
                  </div>
                  <div className="mail-header-actions">
                    <a
                      className="icon-btn"
                      href={this.state.url}
                      target="_blank"
                    >
                      <IconButton className="icon-btn">
                        <i
                          className="zmdi zmdi-eye"
                          style={{ color: '#3F51B5' }}
                        />
                      </IconButton>{' '}
                    </a>
                    <a className="icon-btn" href={this.state.url} download>
                      <IconButton className="icon-btn">
                        <i
                          className="zmdi zmdi-download"
                          style={{ color: '#3F51B5' }}
                        />
                      </IconButton>{' '}
                    </a>
                    <IconButton
                      type="button"
                      className="icon-btn"
                      onClick={() => {
                        onStartSelect(mail);
                      }}
                    >
                      {mail.starred ? (
                        <i className="zmdi zmdi-star" />
                      ) : (
                        <i className="zmdi zmdi-star-outline" />
                      )}
                    </IconButton>
                    <IconButton
                      type="button"
                      className="icon-btn"
                      onClick={() => {
                        onImportantSelect(mail);
                      }}
                    >
                      {mail.important ? (
                        <i className="zmdi zmdi-label-alt" />
                      ) : (
                        <i className="zmdi zmdi-label-alt-outline" />
                      )}
                    </IconButton>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="mail-header">
                  <div className="mail-header-content col pl-0">
                    <div className="subject">{mail.subject}</div>
                  </div>
                  <div className="mail-header-actions">
                    <IconButton
                      type="button"
                      className="icon-btn"
                      onClick={() => {
                        onStartSelect(mail);
                      }}
                    >
                      {mail.starred ? (
                        <i className="zmdi zmdi-star" />
                      ) : (
                        <i className="zmdi zmdi-star-outline" />
                      )}
                    </IconButton>
                    <IconButton
                      type="button"
                      className="icon-btn"
                      onClick={() => {
                        onImportantSelect(mail);
                      }}
                    >
                      {mail.important ? (
                        <i className="zmdi zmdi-label-alt" />
                      ) : (
                        <i className="zmdi zmdi-label-alt-outline" />
                      )}
                    </IconButton>
                  </div>
                </div>
              );
            }
          })()}
          <hr />
          <div className="mail-user-info">
            <div className="sender-name">
              {this.state.senderInfo.username + ': ' + mail.profile.user.email}
              <div className="send-to text-grey">to me</div>
            </div>
            <IconButton
              aria-label="More"
              aria-owns={this.state.open ? 'long-SidenavContent.js' : null}
              aria-haspopup
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              MenuListProps={{
                style: {
                  width: 200,
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={this.onComposeMail}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <ComposeMail
              open={openCompose}
              user={user}
              subjectReply={'Re ' + this.props.mail.subject}
              emailReplay={this.props.mail.profile.user.email}
              onClose={this.handleRequestClose}
              onMailSend={this.onMailSend.bind(this)}
            />
          </div>
          <div
            className="show-detail"
            onClick={() => {
              this.setState({ showDetail: !this.state.showDetail });
            }}
          >
            {this.state.showDetail ? 'Hide Detail' : 'Show Detail'}
          </div>
          {this.state.showDetail && (
            <div>
              <div>
                <strong>From: </strong>
                {this.state.senderInfo.username +
                  ': ' +
                  mail.profile.user.email}
              </div>
              <div>
                <strong> To: </strong>
                {this.state.receiverInfo.username}
              </div>
              <div>
                <strong>Date: </strong>
                {dateFormat(mail.date_hour_mail, 'dddd, mmmm dS, yyyy, HH:MM')}
              </div>
            </div>
          )}

          <br></br>
          <p className="message">
            <font size="+2"> {mail.message}</font>
          </p>

          {mail.hasAttachments && (
            <div className="attachment-block">
              <h3>Attachments ({mail.hasAttachments.length})</h3>
              <div className="row">
                {mail.attachments.map((attachment, index) => (
                  <div className="col-3" key={index}>
                    <img
                      className="size-100"
                      src={attachment.preview}
                      alt={attachment.fileName}
                    />
                    <div className="size">{attachment.size}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CustomScrollbars>
      </div>
    );
  }
}

export default MailDetail;
