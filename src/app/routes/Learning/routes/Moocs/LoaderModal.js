import React, { Component } from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import CardBox from "../../../../../components/CardBox/index";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { UncontrolledAlert } from "reactstrap";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { TimePicker } from "@material-ui/pickers";
import { connect } from "react-redux";
import { subjectsByLevelBySection } from "../../../../../actions/subjectAction";
import moment from "moment";
import { roleIdProfessor } from "../../../../../config/config";
import _ from "lodash";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import FormHelperText from "@material-ui/core/FormHelperText";
import Loader from "react-loader-spinner";

const accessibilityList = [
  {
    value: true,
    name: "Publique",
  },
  {
    value: false,
    name: "Privé",
  },
];

class LoaderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 

  render() {
    const {} = this.props;
    return (
      <div
        className="modal-backdrop d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <Loader
          type="Circles"
          color="#3F51B5"
          height={100}
          width={100}
          visible={this.props.moocsLoading == true ? true : false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moocsLoading: state.MoocsReducer.moocsLoading,
  };
};
export default connect(mapStateToProps)(LoaderModal);
