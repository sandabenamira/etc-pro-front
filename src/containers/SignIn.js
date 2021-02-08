import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "../util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import ForgetPasswordModal from "./ForgetPasswordModal";
import SweetAlert from "react-bootstrap-sweetalert";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn,
  hideLicenceMessage,
} from "../actions/Auth";

import baseUrl from "../config/config";
import axios from "axios";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      forgotPassword: "",
      errorAlert: false,
      succedAlert: false,
      isopen: false,
      showPassword: false,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this);
  }
  handleCancel() {
    this.setState({
      isopen: false,
    });
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 500);
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }
  _handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.showAuthLoader();
      const login = this.state.login;
      const password = this.state.password;
      this.props.userSignIn({ login, password });
    }
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };


  ResetPassword() {
    var email1 = this.state.forgotPassword;

    const params = {
      email: email1,
    };

    axios
      .post(`${baseUrl.baseUrl}/users/reset-user-password`, params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.existe === true) {
          this.setState({
            succedAlert: true,
            forgotPassword: "",
          });
          setTimeout(
            function() {
              this.setState({ succedAlert: false, isopen: false });
            }.bind(this),
            2000
          );
        } else {
          this.setState({
            errorAlert: true,
            forgotPassword: "",
          });
          setTimeout(
            function() {
              this.setState({ errorAlert: false });
            }.bind(this),
            2000
          );
        }
      })
      .catch((err) => {});
  }
  onConfirm = () => {
    this.props.hideLicenceMessage();
  };

  render() {
    const {
      login,
      password,
    } = this.state;
    const {
      showMessage,
      loader,
      alertMessage,
      showLicenceMessage,
      alertLicenceMessage,
    } = this.props;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="STUPP">
              <img
                width={220}
                src={require("../assets/images/educapProLogo.png")}
                alt="STUPP"
                title="STUPP"
              />
            </Link>
          </div>
          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1>
                <IntlMessages id="appModule.log" />
              </h1>
            </div>
            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={<IntlMessages id="appModule.username" />}
                    fullWidth
                    // onChange={(event) => this.setState({ email: event.target.value })}
                    onChange={(event) =>
                      this.setState({ login: event.target.value })
                    }
                    // defaultValue={email}
                    defaultValue={login}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    onKeyPress={(event) => this._handleKeyPress(event)}
                  />
                  {/* <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    onChange={(event) => this.setState({ password: event.target.value })}
                    defaultValue={password}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    onKeyPress={(event) => this._handleKeyPress(event)}
                  /> */}
                  <FormControl className="mb-3" fullWidth>
                    <InputLabel htmlFor="password-1">
                      <IntlMessages id="appModule.password" />
                    </InputLabel>
                    <Input
                      id="password-1"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.state.password}
                      onChange={(event) => this.setState({ password: event.target.value })}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.handleClickShowPasssword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button
                      onClick={() => {
                        this.props.showAuthLoader();
                        this.props.userSignIn({ login, password });
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <IntlMessages id="appModule.signIn" />
                    </Button>
                    <Link to=""></Link>

                    <Link
                      href="#"
                      onClick={() => {
                        this.setState({ isopen: true });
                      }}
                      color="inherit"
                    >
                      <IntlMessages id="forgot.password" />
                    </Link>
                  </div>
                  <div className="app-social-block my-1 my-sm-3">
                    <Link to="">
                      <IntlMessages id="signIn.connectWith" />
                    </Link>

                    <ul className="social-link">
                      <li>
                        <IconButton className="icon">
                          <i className="zmdi zmdi-facebook" />
                        </IconButton>
                      </li>

                      <li>
                        <IconButton className="icon">
                          <i className="zmdi zmdi-twitter" />
                        </IconButton>
                      </li>

                      <li>
                        <IconButton className="icon">
                          <i className="zmdi zmdi-google-plus" />
                        </IconButton>
                      </li>
                      <li>
                        <IconButton className="icon">
                          <i className="zmdi zmdi-github" />
                        </IconButton>
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        {loader && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
        {this.state.isopen === true ? (
          <ForgetPasswordModal
            isopen={this.state.isopen}
            handleCancel={this.handleCancel}
            handleChange={this.handleChange}
            ResetPassword={this.ResetPassword}
            errorAlert={this.state.errorAlert}
            forgotPassword={this.state.forgotPassword}
            succedAlert={this.state.succedAlert}
          />
        ) : (
          ""
        )}
        <SweetAlert
          show={showLicenceMessage}
          title={alertLicenceMessage}
          onConfirm={this.onConfirm}
        ></SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    loader,
    alertMessage,
    showMessage,
    authUser,
    showLicenceMessage,
    alertLicenceMessage,
  } = auth;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    showLicenceMessage,
    alertLicenceMessage,
  };
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn,
  hideLicenceMessage,
})(SignIn);
