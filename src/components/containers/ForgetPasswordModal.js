import React, { Component } from "react";
import IntlMessages from "../../util/IntlMessages";
import Auxiliary from "../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UncontrolledAlert } from "reactstrap";
export default class ForgetPasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  isemail(value) {
    if (value.length > 0)
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    else return true;
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <Auxiliary>
        <Modal isOpen={this.props.isopen}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="recover.password" />}
          </ModalHeader>
          <br />
          {this.props.succedAlert === true ? (
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
          {this.props.errorAlert === true ? (
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
            <form autoComplete="off" onSubmit={this.props.ResetPassword}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <TextField
                      variant="outlined"
                      required
                      name="forgotPassword"
                      id="forgotPassword"
                      label={<IntlMessages id="appModule.email" />}
                      value={this.props.forgotPassword}
                      margin="normal"
                      fullWidth
                      onChange={this.props.handleChange("forgotPassword")}
                      error={
                        this.isemail(this.props.forgotPassword) === false
                          ? true
                          : false
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
                  onClick={this.props.handleCancel}
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
}
