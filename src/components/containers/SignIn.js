import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import ForgetPasswordModal from "./ForgetPasswordModal";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { hideMessage, userSignIn } from "../../store/actions/Auth";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
 import "react-toastify/dist/ReactToastify.css";
import Alert from "@material-ui/lab/Alert";

function SignIn(props) {
  const {
    showMessage,
    success,
    loader,
    alertMessage,
    errorAlert,
    succedAlert,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isopen, setIsopen] = useState(false);

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
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim("Champ obligatoire !")
        .email("Entrer une adresse e-mail valide  ")
        .required("Champ obligatoire !")
         .min(3, "Trop court! minimum 3"),

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
                    <div className="d-flex flex-column">
                      <div className="p-2">
                        <TextField
                          label={<IntlMessages id="appModule.username" />}
                          secureTextEntry={true}
                          autoCorrect={false}
                          {...formik.getFieldProps("email")}
                          defaultValue={initialValues.email}
                          name="email"
                          className="mt-1 my-sm-3"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="error" style={{ color: "red" }}>
                            <small>{formik.errors.email}</small>
                          </div>
                        ) : null}
                      </div>
                      <div className="p-2">
                        <FormControl className="mb-3">
                          <InputLabel htmlFor="password-1">
                            <IntlMessages id="appModule.password" />
                          </InputLabel>
                          <Input
                            id="password-1"
                            fullWidth
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
                      </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                       >
                        <span style={{ textTransform: "none" }}>Connecter</span>
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
                    {/* <div className="app-social-block my-1 my-sm-3">
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
                    </div> */}
                  </Form>
                </Formik>
              </div>
              {showMessage &&   <Alert severity="error">Valider votre adresse et mot de passe</Alert>}
            </div>
          </div>
          {loader && (
            <div className="loader-view">
              <CircularProgress />
            </div>
          )}
         
         
          {isopen === true ? (
            <ForgetPasswordModal
              isopen={isopen}
              handleCancel={handleCancel}
              alertMessage={alertMessage}
              success={success}
              errorAlert={errorAlert}
              succedAlert={succedAlert}
            />
          ) : (
            ""
          )}
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
    errorAlert,
    success,
    succedAlert,
  } = auth;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    errorAlert,
    succedAlert,
    success,
  };
};
export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
})(SignIn);
