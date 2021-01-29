import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IntlMessages from '../../../../../util/IntlMessages';
import moment from 'moment';

class InitAppelDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.setState({ open: true });
  }

  handleRequestClose = () => {
    this.props.CancelDialogReset()
  };
  handleReset = (e) => {
    this.props.ResetStuListPresent()
  }



  render() {
    const { last_version, contextEvent } = this.props;
    return (
      <div>
        <Dialog open={this.state.open} TransitionComponent={Slide} onClose={this.handleRequestClose}>
          {last_version && contextEvent ? <DialogTitle>
            {<IntlMessages id="callRegister.reset.dialog.p1" />}
            {moment(last_version.context_event.start_lesson).format("D MMM")}
            {<IntlMessages id="callRegister.reset.dialog.p2" />} {moment(contextEvent.start_lesson).format("D MMM")}{<IntlMessages id="callRegister.reset.dialog.p3" />}
          </DialogTitle> : <DialogTitle>
              {<IntlMessages id="callRegister.reset.dialog.interval" />}
            </DialogTitle>}
          <DialogContent>
            <DialogContentText>
              {<IntlMessages id="callRegister.reset.accept" />}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleReset} color="secondary">
              {<IntlMessages id="button.init.callRegister" />}
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              {<IntlMessages id="button.keep.version.callRegister" />}
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}

export default InitAppelDialog;
