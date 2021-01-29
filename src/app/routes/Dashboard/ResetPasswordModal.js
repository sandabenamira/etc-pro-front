import React, { Component } from 'react';
import IntlMessages from '../../../util/IntlMessages';
import Auxiliary from '../../../util/Auxiliary';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UncontrolledAlert } from 'reactstrap';
export default class ResetPasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Auxiliary>
        <Modal isOpen={this.props.values.isopen}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="initial.password" />}
          </ModalHeader>
          <br />
          {this.props.values.succedAlert === true ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {<IntlMessages id="reset.password.success.alert" />}
              </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          {this.props.values.errorAlert === true ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {<IntlMessages id="reset.password.failed.alert" />}
              </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          <ModalBody>
            <form autoComplete="off">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <TextField
                      variant="outlined"
                      type="password"
                      required
                      name="oldPassword"
                      id="oldPassword"
                      label={<IntlMessages id="reset.password.old.message" />}
                      value={this.props.values.oldPassword}
                      margin="normal"
                      fullWidth
                      onChange={this.props.handleChange('oldPassword')}
                    />
                    <TextField
                      variant="outlined"
                      type="password"
                      required
                      name="resetPassword"
                      id="resetPassword"
                      label={<IntlMessages id="new.password.reset" />}
                      value={this.props.values.resetPassword}
                      margin="normal"
                      fullWidth
                      onChange={this.props.handleChange('resetPassword')}
                    />
                    <TextField
                      variant="outlined"
                      type="password"
                      required
                      name="confirmresetPassword"
                      id="confirmresetPassword"
                      label={<IntlMessages id="confirm.new.password.reset" />}
                      value={this.props.values.confirmresetPassword}
                      margin="normal"
                      fullWidth
                      onChange={this.props.handleChange('confirmresetPassword')}
                      error={
                        this.props.values.confirmresetPassword !== this.props.values.resetPassword
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
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  disabled={
                    this.props.values.confirmresetPassword !== this.props.values.resetPassword ||
                    (this.props.values.confirmresetPassword.length === 0 &&
                      this.props.values.resetPassword.length === 0)
                  }
                  onClick={this.props.ResetPassword}
                >
                  {<IntlMessages id="button.save.registreAppel" />}
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.props.handleCancel}
                >
                  {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
