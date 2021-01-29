import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

export default class AlerteDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Dialog open={this.props.modal} TransitionComponent={Slide}>
        <DialogContent>
          <DialogContentText style={{ color: 'red' }}>{this.props.message}</DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}
