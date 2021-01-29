import React from "react";
import IntlMessages from "../../../util/IntlMessages";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { deleteComplaint } from "../../../actions/complaintAction";

class DeleteComplaint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleDelete = (e) => {
    const complaintId = this.props.itemId;
    this.props.dispatch(deleteComplaint(complaintId));
    this.props.cancelModalDelete();
  };

  handleRequestClose = () => {
    this.props.cancelModalDelete();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Slide}
          onClose={this.handleRequestClose}
        >
          <DialogContent>
            <DialogContentText>
              {<IntlMessages id="message.confirm.modal" />}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="secondary">
              {<IntlMessages id="button.no" />}
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              {<IntlMessages id="button.yes" />}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(DeleteComplaint);
