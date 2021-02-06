import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Auxiliary from "../../../../../util/Auxiliary";
import TextField from "@material-ui/core/TextField";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Row, Col } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from "../../../../../config/config";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

export class ModalDetailsUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userItem } = this.props;
    return (
      <Auxiliary>
        <Modal isOpen={this.props.handleOpenDetailsUsernamePassword}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            <IntlMessages id="user.details.connexion" />
            <IconButton className="text-white">
              <CloseIcon
                onClick={this.props.handleCancelDetailsUsernamePassword}
              />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <form>
              <div className="d-flex flex-row col-md-12 col-lg-12 col-sm-12">
                <div className="form-group col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="userNameModal">
                    {" "}
                    <IntlMessages id="user.user.name" />
                  </label>
                  <input
                    disabled={true}
                    type="userNameModal"
                    className="form-control"
                    id="userNameModal"
                    value={userItem.login}
                  />
                </div>
                <div className="form-group col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="password">
                    <IntlMessages id="user.password" />
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="password"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex flex-row col-md-12 col-lg-12 col-sm-12">
                <div className="form-group col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="userMAil">
                    {" "}
                    <IntlMessages id="user.mail" />
                  </label>
                  <input
                    disabled={true}
                    type="userMAil"
                    className="form-control"
                    id="userMAil"
                    value={userItem.email}
                  />
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

export default ModalDetailsUser;
