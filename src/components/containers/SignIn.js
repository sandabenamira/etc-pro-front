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
  userSignIn,
  hideLicenceMessage,
} from "../../store/actions/Auth";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";

function SignIn(props) {
  //eye password
  const [showPassword, setShowPassword] = useState(false);
  //forget password
  const [isopen, setIsopen] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [succedAlert, setSuccedAlert] = useState(false);
  const {
    showMessage,
    loader,
    alertMessage,
    showLicenceMessage,
    alertLicenceMessage,
  } = props;
  let dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleClickShowPasssword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(userSignIn(values));
      // setAlert("Le formulaire est envoyé avec succès! ");
      // setSuccess("success");
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim("Champ obligatoire !")
        .email("Entrer une adresse e-mail valide  "),
      // .required("Champ obligatoire !")
      // .max(40, "Trop long ! maximum 40")
      // .min(3, "Trop court! minimum 3"),

      // password: Yup.string()
      //   .trim("Champ obligatoire !")
      //   .required("Champ obligatoire !")
      //   .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un nom valide")
      //   .max(40, "Trop long !")
      //   .min(2, "Trop court!"),
    }),
  });

  const handleCancel = () => {
    setIsopen(false);
  };

  if (props.authUser) {
    return <Redirect to={"/app/home"} />;
  } else {
    return (
      <div
        style={{
          backgroundColor: "#1a85b3",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "5%",
          paddingTop: "4%",
          minHeight: "1000px",
          width: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            top: "150px",
          }}
          className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3"
        >
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
                <Formik
                  initialValues={initialValues}
                  validationSchema
                  validateOnChange={false}
                  validateOnBlur={false}
                >
                  <Form onSubmit={formik.handleSubmit} noValidate>
                    <fieldset>
                      <TextField
                        label={<IntlMessages id="appModule.username" />}
                        secureTextEntry={true}
                        autoCorrect={false}
                        {...formik.getFieldProps("email")}
                        defaultValue={initialValues.email}
                        name="email"
                        className="mt-1 my-sm-3"
                      />
                      {/* {formik.touched.email && formik.errors.email ? (
                        <div className="error" style={{ color: "red" }}>
                          <small>{formik.errors.email}</small>
                        </div>
                      ) : null} */}
                      <FormControl className="mb-3">
                        <InputLabel htmlFor="password-1">
                          <IntlMessages id="appModule.password" />
                        </InputLabel>
                        <Input
                          id="password-1"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          {...formik.getFieldProps("password")}
                          defaultValue={initialValues.password}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPasssword}>
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                        
                          <span style={{ textTransform: "none" }}>
                            Connecter
                          </span>
                        </Button>
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
                  </Form>
                </Formik>
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
              errorAlert={errorAlert}
              succedAlert={succedAlert}
            />
          ) : (
            ""
          )}
          {/* <SweetAlert
            show={showLicenceMessage}
            title={alertLicenceMessage}
            //   onConfirm={this.onConfirm}
          ></SweetAlert> */}
        </div>
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
   // showLicenceMessage,
    alertLicenceMessage,
  } = auth;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
 //   showLicenceMessage,
    alertLicenceMessage,
  };
};
export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,

  hideLicenceMessage,
})(SignIn);
