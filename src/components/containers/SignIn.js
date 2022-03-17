import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "../../util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import ForgetPasswordModal from "./ForgetPasswordModal";
import SweetAlert from "react-bootstrap-sweetalert";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
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
} from "../../store/actions/Auth";
//  store/actions
import baseUrl from "../../config/config";
import axios from "axios";

function SignIn(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [succedAlert, setSuccedAlert] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCancel = () => {
    setIsopen(false);
  };

  const componentDidUpdate = () => {
    if (showMessage) {
      setTimeout(() => {
        props.hideMessage();
      }, 500);
    }
    if (props.authUser !== null) {
      props.history.push("/");
    }
  };
  const _handleKeyPress = (e) => {
    if (e.key === "Enter") {
      props.showAuthLoader();
      const login = setLogin.trim();
      const password = setPassword;
      props.userSignIn({ login, password });
    }
  };
  const handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasssword = () => {
    setShowPassword(!showPassword);
  };
  // const ResetPassword = () => {
  //   var email1 = forgotPassword;

  //   const params = {
  //     email: email1,
  //   };

  //   axios
  //     .post(`${baseUrl.baseUrl}/users/reset-user-password`, params, {
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     })
  //     // .then((response) => {
  //     //   if (response.data.existe === true) {
  //     //     setSuccedAlert(true),
  //     //       setForgotPassword(""),
  //     //       // setTimeout(
  //     //       //   function () {
  //     //       //     setSuccedAlert(false);
  //     //       //     setIsopen(false);
  //     //       //   },
  //     //       //   2000
  //     //       // );
  //     //   } else {
  //     //     setErrorAlert(true),
  //     //       setForgotPassword(""),
  //     //       setTimeout(
  //     //         function () {
  //     //           setErrorAlert(false);
  //     //         },
  //     //         2000
  //     //       );
  //     //   }
  //     // })
  //     // .catch((err) => {});
  // };
  const {
    showMessage,
    loader,
    alertMessage,
    showLicenceMessage,
    alertLicenceMessage,
  } = props;

  const onConfirm = () => {
    this.props.hideLicenceMessage();
  };

  return (
    // const { login, password } = this.state;
    <div
      style={{
        backgroundColor: "#1a85b3",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "5%",
        paddingTop: "4%",
        minHeight: "1000px",
        maxWidth: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      <div
        className="d-flex  flex-column col-lg-12 col-md-12 col-sm-12   "
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "40px 20px #125f80",
          maxWidth: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="app-login-main-content">
            <div className="app-logo-content d-flex align-items-center justify-content-center">
              <Link className="logo-lg" to="/" title="Educap Pro">
                <img
                  width={220}
                  src={require("../../assets/images/educapProLogo.png")}
                  alt="Educap Pro"
                  title="Educap Pro"
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
                      onChange={(event) => {
                        setLogin(event.target.value.trim);
                      }}
                      // defaultValue={email}
                      defaultValue={login}
                      margin="normal"
                      className="mt-1 my-sm-3"
                      onKeyPress={(event) => _handleKeyPress(event)}
                    />

                    <FormControl className="mb-3" fullWidth>
                      <InputLabel htmlFor="password-1">
                        <IntlMessages id="appModule.password" />
                      </InputLabel>
                      <Input
                        id="password-1"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value.trim())
                        }
                        onKeyPress={(event) => _handleKeyPress(event)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPasssword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
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
                          props.showAuthLoader();
                          props.userSignIn({ login, password });
                        }}
                        variant="contained"
                        color="primary"
                      ></Button>
                      <Link to=""></Link>

                      <Link
                        href="#"
                        onClick={() => {
                          setIsopen(true);
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
          {isopen === true ? (
            <ForgetPasswordModal
              isopen={isopen}
              handleCancel={handleCancel}
              handleChange={handleChange}
              // ResetPassword={ResetPassword}
              errorAlert={errorAlert}
              forgotPassword={forgotPassword}
              succedAlert={succedAlert}
            />
          ) : (
            ""
          )}
          <SweetAlert
            show={showLicenceMessage}
            title={alertLicenceMessage}
            //onConfirm={this.onConfirm}
          ></SweetAlert>
        </div>
      </div>
    </div>
  );
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
