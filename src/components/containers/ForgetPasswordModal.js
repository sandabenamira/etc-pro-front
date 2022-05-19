import IntlMessages from "../../util/IntlMessages";
import Auxiliary from "../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UncontrolledAlert } from "reactstrap";
import { isEmail } from "../../constants/validationFunctions";
export default function ForgetPasswordModal(props) {
  const ResetPassword = () => {
    // var email1 = forgotPassword;
    // const params = {
    //   email: email1,
    // };
    // axios.post(`${baseUrl.baseUrl}/users/reset-user-password`, params, {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // });
    // .then((response) => {
    //   if (response.data.existe === true) {
    //     setSuccedAlert(true),
    //       setForgotPassword(""),
    //       // setTimeout(
    //       //   function () {
    //       //     setSuccedAlert(false);
    //       //     setIsopen(false);
    //       //   },
    //       //   2000
    //       // );
    //   } else {
    //     setErrorAlert(true),
    //       setForgotPassword(""),
    //       setTimeout(
    //         function () {
    //           setErrorAlert(false);
    //         },
    //         2000
    //       );
    //   }
    // })
    // .catch((err) => {});
  };
  return (
    <Auxiliary>
      <Modal isOpen={props.isopen}>
        <ModalHeader
          toggle={props.handleCancel}
          className="modal-box-header bg-primary text-white"
        >
          {<IntlMessages id="recover.password" />}
        </ModalHeader>
        <br />
        {props.succedAlert === true ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {<IntlMessages id="recover.password.succed.alert" />}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {props.errorAlert === true ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {<IntlMessages id="recover.password.failed.alert" />}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        <ModalBody>
          <form autoComplete="off" onSubmit={props.ResetPassword}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <TextField
                    variant="outlined"
                    required
                    name="forgotPassword"
                    id="forgotPassword"
                    label={<IntlMessages id="appModule.email" />}
                    // value={forgotPassword}
                    margin="normal"
                    fullWidth
                    onChange={props.handleChange("forgotPassword")}
                    error={
                      isEmail(props.forgotPassword) === false ? true : false
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 text-left ">
              <br />
              <br />
              <Button
                type="submit"
                variant="contained"
                className="jr-btn bg-indigo text-white "
              >
                {<IntlMessages id="button.send.message" />}
              </Button>
              <Button
                variant="contained"
                className="jr-btn bg-grey text-white "
                onClick={props.handleCancel}
              >
                {
                  <IntlMessages id="components.establishments.formadd.buttonCancel" />
                }
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </Auxiliary>
  );
}
