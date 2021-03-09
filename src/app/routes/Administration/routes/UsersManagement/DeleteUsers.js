import React, { Component } from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
export default class DeleteUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <Dialog open={this.props.deleteIsopen} TransitionComponent={Slide}>
        <DialogContent>
          <DialogContentText>
            {<IntlMessages id="message.confirm.modal" />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleCancel} color="secondary">
            {<IntlMessages id="button.no" />}
          </Button>
          <Button
            onClick={this.props.handleDeleteSchoolSession}
            color="primary"
          >
            {<IntlMessages id="button.yes" />}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
