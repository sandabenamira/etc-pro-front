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
      return (
      <Auxiliary>
        <Modal isOpen={this.props.openDetails}>
          <ModalHeader className="modal-box-header bg-primary text-white">
          <IntlMessages id="user.details.connexion" />
            <IconButton className="text-white">
              <CloseIcon onClick={this.props.handleCancelDetails} />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <form>
              <div class="d-flex flex-row col-md-12 col-lg-12 col-sm-12">
                <div class="form-group col-md-6 col-lg-3 col-sm-12">
                  <label for="gender">
                    {" "}
                    <IntlMessages id="user.gender" />
                  </label>
                  <input
                    disabled={true}
                    type="gender"
                    class="form-control"
                    id="gender"
                    value={""}
                  />
                </div>
                <div class="form-group col-md-6 col-lg-3 col-sm-12">
                  <label for="birthdaydate">
                    <IntlMessages id="user.birthday.date" />
                  </label>
                  <input
                    disabled={true}
                    type="date"
                    class="form-control"
                    id="birthdaydate"
                    value={""}
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
