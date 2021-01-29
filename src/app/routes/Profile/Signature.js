import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import IntlMessages from '../../../util/IntlMessages';
import { addSignature } from '../../../actions/stuppUserAction';
import { connect } from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../config/config';
import IconButton from '@material-ui/core/IconButton';

class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhotos: null,
      inputText: '',
      userId: 0,
      establishmentID: 0,
      uri: null
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop = e => {
    let file = e.target.files[0];
    this.setState({ userPhotos: file, inputText: file.name });
    var data = {};
    data.file = file;
    data.idItem = this.props.userProfile.user_id;
    data.establishmentID = this.props.userProfile.establishment_id;
    if (this.props.userProfile.user_id !== 0) {
      this.props.addSignature(data);
    } else {
      this.forceUpdate();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.userProfile !== this.props.userProfile ||
      prevProps.download !== this.props.download
    ) {
      this.setState({
        userId: this.props.userProfile.user_id,
        establishmentID: this.props.userProfile.establishment_id
      });
      axios
        .get(
          `${baseUrl.baseUrl}/users/` +
            this.props.userProfile.user_id +
            `?access_token=${localStorage.token}`
        )
        .then(res => {
          var signature = res.data.user_signature;
          if (res.data.user_signature !== null) {
            axios
              .get(
                `${baseUrl.baseUrl}/establishments/` +
                  this.props.userProfile.establishment_id +
                  `?access_token=${localStorage.token}`
              )
              .then(res => {
                this.setState({ uri: res.data.user_signature });
                this.setState({
                  uri:
                    `${baseUrl.baseUrl}/containers/` +
                    res.data.name +
                    '/download/' +
                    signature +
                    `?access_token=${localStorage.token}`
                });
              });
          }
        });
    }
    if (prevState.uri !== this.state.uri) {
      this.setState({
        uri: this.state.uri
      });
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userProfile.user_id,
      establishmentID: this.props.userProfile.establishment_id
    });
    axios
      .get(
        `${baseUrl.baseUrl}/users/` +
          localStorage.user_id +
          `?access_token=${localStorage.token}`
      )
      .then(res => {
        var signature = res.data.user_signature;
        if (res.data.user_signature !== null) {
          axios
            .get(
              `${baseUrl.baseUrl}/establishments/` +
                localStorage.establishment_id +
                `?access_token=${localStorage.token}`
            )
            .then(res => {
              this.setState({ uri: res.data.user_signature });
              this.setState({
                uri:
                  `${baseUrl.baseUrl}/containers/` +
                  res.data.name +
                  '/download/' +
                  signature +
                  `?access_token=${localStorage.token}`
              });
            });
        }
      });
  }

  render() {
    return (
      <div>
        <h4 className="card-title mb-0 ml-4 mb-2">
          {' '}
          <IntlMessages id="components.establishments.formadd.selectImageSignature" />
        </h4>
        <div className="media jr-featured-item ml-4">
          {this.state.uri ? (
            <div className="jr-featured-thumb ">
              <a className="icon-btn" href={this.state.uri} target="_blank">
                <IconButton className="icon-btn">
                  <i className="zmdi zmdi-eye" style={{ color: '#3F51B5' }} />
                </IconButton>{' '}
              </a>
            </div>
          ) : (
            <div className="jr-featured-thumb ">
              <a className="icon-btn">
                <IconButton className="icon-btn">
                  <i className="zmdi zmdi-eye" />
                </IconButton>
              </a>
            </div>
          )}

          <div className="media-body jr-featured-content">
            <div className="jr-featured-content-left">
              <br></br>
              <div className="row-flex">
                <div className="col-md-6">
                  <div className="form-group">
                    <div>
                      <label
                        htmlFor="files"
                        className="btn"
                        style={{
                          cursor: 'pointer',
                          color: 'white',
                          fontWeight: 'bold',
                          backgroundColor: '#4C19A9',
                          borderRadius: '4rem'
                        }}
                      >
                        <strong>
                          {
                            <IntlMessages id="components.establishments.formadd.selectImage" />
                          }
                        </strong>
                      </label>
                      <label htmlFor="files" className="btn">
                        {/* {values.inputText} */}
                      </label>
                      <input
                        id="files"
                        type="file"
                        style={{ visibility: 'hidden' }}
                        onChange={e => this.onDrop(e)}
                        accept=".jpg, .jpeg, .png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    download: state.stuppUsers.download
  };
}

export default connect(
  mapStateToProps,
  { addSignature }
)(Signature);
