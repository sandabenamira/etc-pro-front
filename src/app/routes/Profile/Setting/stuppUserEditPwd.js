import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { editPassword } from "../../../../actions/stuppUserAction";
import React from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Spinner from "./Spinner";
import "./style.css";
import IntlMessages from "../../../../util/IntlMessages";
import Auxiliary from "../../../../util/Auxiliary";

class StuppUserEditPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      userPassword: "",
      currentPass: "",
      newPass: "",
      confirmPass: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleToggle() {
    this.props.cancelModal();
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleCancel() {
    this.setState({
      previewVisible: false,
    });
    this.props.cancelModal();
  }
  _handleSubmit = ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
  }) => {
    // fake async login
    const data = { currentPass, newPass };
    this.props.dispatch(editPassword(data));
    setTimeout(async () => {
      setSubmitting(false);
      this.setState(() => ({
        previewVisible: false,
      }));

      resetForm();
    }, 1);
    this.props.cancelModal();
  };
  render() {
    return (
      <Auxiliary>
        <Modal isOpen={this.state.previewVisible} style={{ width: 400 }}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.editPassword" />}
          </ModalHeader>
          <ModalBody className="bd-highlight text-center">
            <Formik
              initialValues={{
                currentPass: "",
                newPass: "",
                confirmPass: "",
              }}
              validationSchema={object().shape({
                currentPass: string().required(
                  "Le mot de passe actuel est demandé"
                ),
                newPass: string().required(
                  "Le nouveau mot de passe est requis"
                ),
                confirmPass: string()
                  .oneOf(
                    [ref("newPass")],
                    "Les mots de passe ne correspondent pas"
                  )
                  .required("Le mot de passe est demandé"),
              })}
              onSubmit={(
                { currentPass, newPass, confirmPass },
                { setSubmitting, resetForm }
              ) =>
                this._handleSubmit({
                  currentPass,
                  newPass,
                  confirmPass,
                  setSubmitting,
                  resetForm,
                })
              }
              render={(props) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                  isSubmitting,
                } = props;
                return isSubmitting ? (
                  <Spinner />
                ) : (
                  <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-12 col-sm-12 col-12">
                      <FormControl fullWidth margin="dense">
                        <InputLabel
                          htmlFor={
                            <IntlMessages id="reset.password.old.message" />
                          }
                          error={Boolean(
                            touched.currentPass && errors.currentPass
                          )}
                        >
                          {" "}
                          {
                            <IntlMessages id="reset.password.old.message" />
                          }{" "}
                        </InputLabel>{" "}
                        <Input
                          id="password-current"
                          name="currentPass"
                          type="password"
                          value={values.currentPass}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.currentPass && errors.currentPass
                          )}
                          margin="normal"
                          fullWidth={true}
                        />{" "}
                        <FormHelperText
                          error={Boolean(
                            touched.currentPass && errors.currentPass
                          )}
                        >
                          {" "}
                          {touched.currentPass && errors.currentPass
                            ? errors.currentPass
                            : ""}{" "}
                        </FormHelperText>{" "}
                      </FormControl>{" "}
                    </div>{" "}
                    <div className="col-md-12 col-12">
                      <FormControl
                        fullWidth
                        margin="dense"
                        error={Boolean(touched.newPass && errors.newPass)}
                      >
                        <InputLabel
                          htmlFor={<IntlMessages id="new.password.reset" />}
                          error={Boolean(touched.newPass && errors.newPass)}
                        >
                          {" "}
                          {<IntlMessages id="new.password.reset" />}{" "}
                        </InputLabel>{" "}
                        <Input
                          id="password-new"
                          name="newPass"
                          type="password"
                          value={values.newPass}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.newPass && errors.newPass)}
                          margin="normal"
                          fullWidth
                        />{" "}
                        <FormHelperText
                          error={Boolean(touched.newPass && errors.newPass)}
                        >
                          {" "}
                          {touched.newPass && errors.newPass
                            ? errors.newPass
                            : ""}{" "}
                        </FormHelperText>{" "}
                      </FormControl>{" "}
                    </div>
                    <div className="col-md-12 col-12">
                      <FormControl
                        fullWidth
                        margin="dense"
                        error={Boolean(
                          touched.confirmPass && errors.confirmPass
                        )}
                      >
                        <InputLabel
                          htmlFor={
                            <IntlMessages id="confirm.new.password.reset" />
                          }
                          error={Boolean(
                            touched.confirmPass && errors.confirmPass
                          )}
                        >
                          {" "}
                          {
                            <IntlMessages id="confirm.new.password.reset" />
                          }{" "}
                        </InputLabel>
                        <Input
                          id="password-confirm"
                          name="confirmPass"
                          type="password"
                          value={values.confirmPass}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.confirmPass && errors.confirmPass
                          )}
                          margin="normal"
                          fullWidth
                        />{" "}
                        <FormHelperText
                          error={Boolean(
                            touched.confirmPass && errors.confirmPass
                          )}
                        >
                          {" "}
                          {touched.confirmPass && errors.confirmPass
                            ? errors.confirmPass
                            : ""}{" "}
                        </FormHelperText>{" "}
                      </FormControl>{" "}
                    </div>{" "}
                    {""}
                    {""}
                    <div className="col-md-12 text-left ">
                      <Button
                        variant="contained"
                        className="jr-btn bg-indigo text-white "
                        type="submit"
                        disabled={Boolean(!isValid || isSubmitting)}
                      >
                        {
                          <IntlMessages id="components.establishments.formModify.buttonModify" />
                        }
                      </Button>
                      <Button
                        variant="contained"
                        className="jr-btn bg-grey text-white "
                        onClick={this.handleCancel}
                      >
                        {
                          <IntlMessages id="components.establishments.formadd.buttonCancel" />
                        }
                      </Button>
                    </div>
                  </form>
                );
              }}
            />
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

export default connect()(StuppUserEditPwd);
