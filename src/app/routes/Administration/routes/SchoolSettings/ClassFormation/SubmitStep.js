import React, { Component } from "react";
import IntlMessages from "../../../../../../util/IntlMessages";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
/* eslint eqeqeq: "off" */
export default class SubmitStep extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <Dialog open={this.props.openConfirm} TransitionComponent={Slide}>
        <DialogContent>
          <DialogContentText>
          Êtes-vous sûr de confirmer cette étape ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleCancel} color="secondary">
            {<IntlMessages id="button.no" />}
          </Button>
          <Button onClick={this.props.handleSubmitStep} color="primary">
            {<IntlMessages id="button.yes" />}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
